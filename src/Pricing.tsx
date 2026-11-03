import type { ReactNode } from 'react'
import { product } from './product'

export default function Pricing({ illustration }: { illustration: ReactNode }) {
  return <div className="pricing-page">
    <section className="pricing-intro section">
      <a className="pricing-back" href="./">← Back to CLAV</a>
      <p className="eyebrow">CLAV / PRODUCT & PRICING</p>
      <h1>A focused first layer.<br/><span>A clear price.</span></h1>
      <p className="intro">{product.description}</p>
    </section>
    <section className="pricing-product" aria-labelledby="product-name">
      <div className="pricing-art">
        <div className="image-top"><span>CLAV / UNDERSHIRT CONCEPT</span><span>FRONT VIEW</span></div>
        <span className="pricing-watermark" aria-hidden="true">first layer.</span>
        {illustration}
        <div className="image-bottom"><span>CONCEPT ILLUSTRATION</span><span>Design in development</span></div>
      </div>
      <div className="pricing-offer">
        <span className="pricing-status"><i/> CONCEPT / IN DEVELOPMENT</span>
        <h2 id="product-name">{product.name}</h2>
        <div className="public-price"><strong>${product.price}</strong><span>{product.currency}<br/>per {product.pricing_unit}</span></div>
        <p className="pricing-payment">{product.pricing_model} · No subscription</p>
        <div className="pricing-features">
          <div><span>01</span><p>Clavicle-focused pad placement</p></div>
          <div><span>02</span><p>Compression-style fit</p></div>
          <div><span>03</span><p>One shirt · No optional add-ons</p></div>
        </div>
        <p className="pricing-caveat">Concept only; performance and fit unvalidated. Not available for purchase.</p>
        <a className="button" href="./#everyday">Explore the design <span>↗</span></a>
        <a className="pricing-secondary" href="./#explore">Explore your sport & priorities →</a>
      </div>
    </section>
    <section className="pricing-questions section" aria-labelledby="pricing-questions">
      <div><p className="eyebrow">THE DETAILS, UP FRONT</p><h2 id="pricing-questions">Before you<br/><em>take the next step.</em></h2><p>One product concept.<br/>Room to understand it.</p></div>
      <div className="pricing-faqs">
        <details><summary>What does the $59 price cover?<span aria-hidden="true">+</span></summary><p>The listed price is ${product.price} {product.currency} per {product.pricing_unit}, as a one-time purchase. No optional add-ons or subscription are included.</p></details>
        <details><summary>Can I order a shirt now?<span aria-hidden="true">+</span></summary><p>The undershirt is still a concept and is not available for purchase. This page presents the product and its price; it does not accept orders or payments.</p></details>
        <details><summary>What is established about the design?<span aria-hidden="true">+</span></summary><p>{product.features}</p><a href="./#everyday">See the concept details ↗</a></details>
      </div>
    </section>
    <section className="pricing-next"><p className="eyebrow">START WITH THE DETAILS</p><h2>Get to know <em>your first layer.</em></h2><a className="button" href="./#explore">Explore the concept <span>↗</span></a></section>
  </div>
}
