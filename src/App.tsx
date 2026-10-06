import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

const PRODUCT = 'https://shop.merch.google/product/google-wellfleet-womens-1-2-zip-ggoegxxx2633'
const IMAGE = `${import.meta.env.BASE_URL}assets/wellfleet.png`
const moments = [
  { time: '08:30 AM', name: 'The coffee run.', text: 'Your favorite denim. A fresh coffee. A navy layer that makes getting out the door the easy part.', tag: 'OFF-DUTY, PUT TOGETHER', style: 'Denim + sneakers', color: 'blue' },
  { time: '01:00 PM', name: 'The workday.', text: 'Pair it with tailored trousers for a relaxed office look. Zip up the collar or leave it open over a simple tee.', tag: 'FROM DESK TO DOWNTOWN', style: 'Trousers + a white tee', color: 'yellow' },
  { time: '05:30 PM', name: 'The long way home.', text: 'Take the scenic route. An easy layer for waterfront walks and the plans that happen after your plans.', tag: 'A LITTLE MORE OUTSIDE', style: 'Leggings + walking shoes', color: 'green' },
]
export default function App() {
  const [menu, setMenu] = useState(false)
  const [moment, setMoment] = useState(0)
  const reduce = useReducedMotion()
  const reveal = { initial: { opacity: 0, y: reduce ? 0 : 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: reduce ? 0 : .6 } }
  return <>
    <a className="skip" href="#main">Skip to content</a>
    <div className="announcement">A fresh perspective on your everyday layer. <span>Meet the Wellfleet ↗</span></div>
    <header>
      <a className="brand" href="#main" aria-label="Wellfleet home"><span className="dots"><i/><i/><i/><i/></span>wellfleet<span className="brand-period">.</span></a>
      <nav aria-label="Main navigation" className={menu ? 'open' : ''}>
        <a href="#details" onClick={()=>setMenu(false)}>The half-zip</a><a href="#everyday" onClick={()=>setMenu(false)}>Your everyday</a><a href="#story" onClick={()=>setMenu(false)}>The details</a>
      </nav>
      <a className="nav-shop" href={PRODUCT} target="_blank" rel="noreferrer">Shop on Google <span>↗</span></a>
      <button className="menu-toggle" onClick={()=>setMenu(!menu)} aria-expanded={menu} aria-label={menu ? 'Close navigation' : 'Open navigation'}>{menu ? '✕' : '☰'}</button>
    </header>
    <main id="main">
      <section className="hero" id="details">
        <motion.div className="hero-copy" {...reveal}>
          <p className="eyebrow"><span className="little-line"/> THE WELLFLEET EDIT · NEW YORK, EVERY DAY</p>
          <h1>Big city.<br/>Full calendar.<br/><span>One easy layer.</span></h1>
          <p className="intro">For coffee runs, workdays, and whatever comes next. Meet the Google Wellfleet Women’s 1/2 Zip—your navy goes-with-everything.</p>
          <div className="hero-actions"><a className="button" href={PRODUCT} target="_blank" rel="noreferrer">Meet your everyday half-zip <span>↗</span></a><span className="price">$79 <small>USD</small></span></div>
          <p className="micro">Original navy. Signature white Google logo.</p>
          <div className="hero-bottom"><span>01 / EVERYDAY, RECONSIDERED</span><a href="#everyday" aria-label="Explore ways to wear it">SCROLL TO EXPLORE <span>↓</span></a></div>
        </motion.div>
        <motion.div className="hero-image" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.7}}>
          <div className="image-top"><span>GOOGLE WELLFLEET</span><span>WOMEN’S 1/2 ZIP</span></div>
          <span className="giant-word" aria-hidden="true">everyday</span>
          <img src={IMAGE} alt="Original Google Wellfleet Women's half-zip in navy with a white Google logo" fetchPriority="high" width="1500" height="1500"/>
          <div className="image-bottom"><span><i className="navy-dot"/> NAVY / THE ORIGINAL</span><span className="image-note">Less outfit planning.<br/>More living.</span></div>
          <span className="orbit" aria-hidden="true">MAKE IT<br/><strong>your day.</strong><span>↗</span></span>
        </motion.div>
      </section>
      <div className="benefit-strip"><span>75% recycled polyester</span><b>✳</b><span>A little stretch. A lot of possibility.</span><b>✳</b><span>One layer, on repeat.</span></div>
      <section className="everyday section" id="everyday">
        <motion.div className="section-heading" {...reveal}><p className="eyebrow">02 / DRESS FOR YOUR WHOLE DAY</p><div><h2>New York doesn’t slow down.<br/><em>Your outfit can keep up.</em></h2><p>The best pieces earn their place in your rotation.<br/>Here are three ways to make this one yours.</p></div></motion.div>
        <div className="day-grid">
          <div className="day-tabs" role="tablist" aria-label="Ways to style the Wellfleet">{moments.map((m,i)=><button key={m.time} id={`day-tab-${i}`} role="tab" aria-selected={moment===i} aria-controls="day-panel" tabIndex={moment===i ? 0 : -1} onClick={()=>setMoment(i)} onKeyDown={e=>{if(e.key==='ArrowDown'||e.key==='ArrowRight'||e.key==='ArrowUp'||e.key==='ArrowLeft'){e.preventDefault();const next=(i+(e.key==='ArrowDown'||e.key==='ArrowRight'?1:2))%3;setMoment(next);document.getElementById(`day-tab-${next}`)?.focus()}}} className={moment===i?'active':''}><span className="time">{m.time}</span><span>{m.name}</span><b>↗</b></button>)}</div>
          <motion.div key={moment} initial={{opacity:.4}} animate={{opacity:1}} transition={{duration:reduce?0:.3}} className={`day-panel ${moments[moment].color}`} role="tabpanel" id="day-panel" aria-labelledby={`day-tab-${moment}`}><span className="eyebrow">{moments[moment].tag}</span><h3>{moments[moment].style}</h3><p>{moments[moment].text}</p><span className="panel-arrow" aria-hidden="true">↗</span><div className="palette" aria-label="Suggested outfit palette"><i/><i/><i/></div></motion.div>
        </div>
      </section>
      <section className="detail-section" id="story">
        <div className="detail-photo"><img src={IMAGE} alt="A closer look at the Wellfleet half-zip collar and white Google logo" loading="lazy" width="1500" height="1500"/><span>THE BEAUTY IS IN THE EVERYDAY DETAILS.</span></div>
        <motion.div className="detail-copy" {...reveal}><p className="eyebrow">03 / MORE THAN A GOOD LOOK</p><h2>Simple on the outside.<br/><em>Thoughtful throughout.</em></h2><div className="feature"><span>01</span><div><h3>Room to move</h3><p>A spacer-knit blend with 7% spandex brings stretch to a full day of getting around.</p></div></div><div className="feature"><span>02</span><div><h3>Ready for your daily rotation</h3><p>Odor-fighting fabric and ribbed cuffs and hem give this everyday layer practical details.</p></div></div><div className="feature"><span>03</span><div><h3>A considered composition</h3><p>Made with 75% recycled polyester, 18% rayon, and 7% spandex. A familiar favorite with a thoughtful fabric blend.</p></div></div><a className="text-link" href={PRODUCT} target="_blank" rel="noreferrer">Explore full product details <span>↗</span></a></motion.div>
      </section>
      <section className="closer section">
        <motion.div {...reveal}><p className="eyebrow">LESS “WHAT SHOULD I WEAR?”</p><h2>More <em>“I’m on my way.”</em></h2><p>One navy half-zip. So many ways to make it your own.<br/>Start with the original Google Wellfleet Women’s 1/2 Zip.</p><a className="button" href={PRODUCT} target="_blank" rel="noreferrer">Shop the Wellfleet · $79 <span>↗</span></a><p className="micro">Continue to the Google Merchandise Store for sizes, availability, and current pricing.</p></motion.div>
      </section>
      <section className="project-notes section" aria-label="Relaunch strategy">
        <details><summary><span>Behind the relaunch</span><span>THE MARKETING STRATEGY <b>+</b></span></summary><div className="strategy-grid"><div><p className="eyebrow">THE STARTING POINT</p><h3>A product worth another look.</h3><p>The supplied ecommerce report recorded $0 item revenue and 0 purchases. Two possible barriers: a $79 price that needs a clearer value story, and plain product presentation that doesn’t show how the piece fits into everyday life. These are hypotheses, not proven causes.</p></div><div><p className="eyebrow">THE CUSTOMER</p><h3>A full life in the Northeast.</h3><p><strong>Geographic:</strong> New York and the Northeast.<br/><strong>Demographic:</strong> Women ages 25–34.<br/><strong>Behavioral:</strong> Chrome users who browse online.<br/><strong>Benefits sought:</strong> Versatile styling and everyday comfort.</p><p>Our focus: a woman around 30 living in New York who wants an easy layer for her workday and time off. Chrome usage is a channel clue; versatility is the reason to buy.</p></div><div><p className="eyebrow">THE NEW POSITION</p><h3>Same product. A clearer purpose.</h3><p>Reframe the simple navy design as versatile, communicate the verified material details, and show three styling occasions to make its value tangible. Color lives in the website’s presentation; the garment and its white logo stay original.</p></div></div></details>
      </section>
    </main>
    <footer><a className="brand" href="#main">wellfleet.</a><span>An independent student marketing concept.<br/>Google trademarks and product imagery belong to their respective owners.</span><a href={PRODUCT} target="_blank" rel="noreferrer">Original product & details ↗</a><a href="#main">Back to top ↑</a></footer>
  </>
}
