import { useEffect, useRef, useState } from 'react'
import type { ModelViewerElement } from '@google/model-viewer'

const productPath = import.meta.env.BASE_URL + 'product/'
type Handoff = {
  camera: { position: number[], target: number[], fov: number }
  dimensions: { height: number }
  files: { model: string }
  modelName: string
}

export default function JerseyHero() {
  const mount = useRef<HTMLDivElement>(null)
  const viewer = useRef<ModelViewerElement | null>(null)
  const home = useRef('')
  const [status, setStatus] = useState<'loading'|'ready'|'static'>('loading')

  useEffect(() => {
    const container = mount.current!
    let active = true
    let element: ModelViewerElement | undefined
    const fail = () => {
      if (active) {
        active = false
        clearTimeout(timer)
        setStatus('static')
        element?.remove()
        viewer.current = null
      }
    }
    const timer = window.setTimeout(fail, 35000)
    async function load() {
      const probe = document.createElement('canvas').getContext('webgl2')
      if (!probe) { fail(); return }
      probe.getExtension('WEBGL_lose_context')?.loseContext()
      const [, manifest] = await Promise.all([
        import('@google/model-viewer'),
        fetch(productPath + 'model-manifest.json').then(async response => {
          if (!response.ok) throw Error('Model metadata unavailable')
          return await response.json() as Handoff
        }),
      ])
      if (!active) return
      const camera = manifest.camera
      const [x,y,z] = camera.position.map((n,i) => n-camera.target[i])
      const radius = Math.hypot(x,y,z)
      // Retain the confirmed angle and frame the jersey for the hero's taller crop.
      const distance = manifest.dimensions.height * 1.28 / (2*Math.tan(camera.fov*Math.PI/360))
      home.current = `${Math.atan2(x,z)}rad ${Math.acos(y/radius)}rad ${distance}m`
      element = document.createElement('model-viewer') as ModelViewerElement
      const attributes = {
        src: productPath + manifest.files.model, alt: manifest.modelName+' with two lime collarbone panels',
        'camera-controls':'', 'disable-pan':'', 'touch-action':'pan-y',
        'interaction-prompt':'none', 'camera-target':camera.target.map(n=>n+'m').join(' '),
        'camera-orbit':home.current, 'field-of-view':camera.fov+'deg',
        'min-camera-orbit':`auto 10deg ${distance*.65}m`, 'max-camera-orbit':`auto 165deg ${distance*1.6}m`,
        'min-field-of-view':camera.fov+'deg', 'max-field-of-view':camera.fov+'deg',
        'environment-image':'neutral','shadow-intensity':'.65','shadow-softness':'.9',
        'interpolation-decay':matchMedia('(prefers-reduced-motion: reduce)').matches?'0':'60',
        loading:'eager',
      }
      for (const [name,value] of Object.entries(attributes)) element.setAttribute(name,value)
      element.addEventListener('error', fail)
      element.addEventListener('load', () => {
        if (!active || !element?.isConnected) return
        clearTimeout(timer)
        setStatus('ready')
      })
      viewer.current = element
      container.append(element)
    }
    load().catch(fail)
    return () => { active=false; clearTimeout(timer); viewer.current=null; element?.remove() }
  }, [])

  function reset() {
    if (!viewer.current) return
    viewer.current.cameraOrbit=home.current
    viewer.current.jumpCameraToGoal()
  }
  return <div className="jersey-product" data-state={status}>
    {status !== 'ready' && <img className="jersey-poster" src={productPath+'preview.png'} alt="Confirmed CLAV jersey concept with graphite fabric and two lime collarbone panels"/>}
    <div className="jersey-stage" ref={mount}/>
    <div className="jersey-controls">
      <span role="status">{status==='ready'?'Drag to rotate':status==='loading'?'Loading 3D view…':'Static product preview'}</span>
      {status==='ready' && <><button aria-label="Zoom out" onClick={()=>viewer.current?.zoom(-1)}>−</button><button aria-label="Zoom in" onClick={()=>viewer.current?.zoom(1)}>＋</button><button onClick={reset}>Reset</button></>}
    </div>
  </div>
}
