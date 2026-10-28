import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiArrowDown, FiMapPin, FiShield, FiUsers, FiGlobe } from "react-icons/fi";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import SEO from "../components/SEO/SEO";
import craft from "../assets/ourcraft.png";

const chapters = [
  { number: "01", label: "First generation", title: "Where it all began.", people: [
    { name: "Sha Amichandji Shankarji Rathod", text: "Our journey began in Kolhapur with Sha Amichandji Shankarji Rathod, who laid the foundation of our family business. His beginnings marked the first chapter of a legacy that successive generations continue to carry forward." }
  ] },
  { number: "02", label: "Second generation", title: "A vision that grew.", people: [
    { name: "Narendra Amichandji Rathod & Rajendra Amichandji Rathod", text: "Building on that foundation, Narendra Amichandji Rathod and Rajendra Amichandji Rathod led the business through a period of substantial expansion. Their contribution strengthened its market presence and created opportunities for the generations that followed." }
  ] },
  { number: "03", label: "Third generation", title: "New ideas. The same values.", people: [
    { name: "Nilesh Narendraji Oswal", text: "Nilesh Narendraji Oswal took the lead in moving the business forward, introducing new ideas and expanding its reach. His contribution brought innovation to the family enterprise while continuing its commitment to trusted relationships." },
    { name: "Tejas Rajendra Oswal", text: "Joining the business a few years ago, Tejas Rajendra Oswal brought a fresh perspective and a focus on changing market expectations. His efforts centre on strengthening our market presence and helping the business grow with a new generation of customers." }
  ] },
  { number: "04", label: "Fourth generation", title: "A legacy, connected.", people: [
    { name: "Sayam Nilesh Oswal", text: "Joining the family business a year ago, Sayam Nilesh Oswal is bringing the Parasmani legacy into the digital world. He develops the website and manages the brand's social media, helping more people discover its craftsmanship and story.", more: "Alongside these responsibilities, he assists with everyday tasks and learns the business from his family. His journey is just beginning, with a focus on contributing fresh ideas while understanding the trust and traditions built by the generations before him." }
  ] }
];

const css = `
.pm-story { --ink:#203b34; --gold:#a37b3d; --paper:#faf5eb; --line:#dfd3bc; background:var(--paper); color:var(--ink); }
.pm-story main, .pm-story main * { box-sizing:border-box; }
.pm-story main { font-family:Arial,Helvetica,sans-serif; }
.pm-story main h1,.pm-story main h2,.pm-story main h3,.pm-story main h4,.pm-story main p { margin:0; }
.pm-story main h1,.pm-story main h2,.pm-story main h3,.pm-story main h4 { font-family:Georgia,'Times New Roman',serif; font-weight:400; }
.pm-story main a { text-decoration:none; }
.pm-story main img { display:block; max-width:100%; }
.pm-story .ps-wrap { width:min(1200px,calc(100% - 80px)); margin-inline:auto; }
.pm-story .ps-kicker { display:flex; align-items:center; gap:12px; color:#86632f; font-size:10px; font-weight:600; line-height:1.6; letter-spacing:.2em; text-transform:uppercase; }
.pm-story .ps-kicker::before { content:''; width:28px; height:1px; background:currentColor; flex:none; }
.pm-story .ps-btn { display:inline-flex; align-items:center; justify-content:center; gap:22px; border:1px solid var(--ink); border-radius:999px; padding:15px 24px; min-height:52px; color:var(--paper); background:var(--ink); font-size:13px; line-height:1.5; transition:background .2s; }
.pm-story .ps-btn svg { width:18px; height:18px; flex:none; }
.pm-story .ps-btn:hover { background:#35574b; }
.pm-story .ps-btn-light { background:transparent; color:var(--ink); }
.pm-story .ps-btn-light:hover { background:#eae1d1; }
.pm-story main a:focus-visible { outline:3px solid #bd914e; outline-offset:5px; }
.pm-story .ps-hero { padding-block:64px 72px; display:grid; grid-template-columns:1.05fr 1fr; align-items:center; gap:72px; }
.pm-story .ps-hero h1 { font-size:clamp(48px,5.2vw,76px); line-height:1.08; letter-spacing:-.045em; margin:24px 0; }
.pm-story .ps-hero h1 em { color:#987139; font-weight:400; }
.pm-story .ps-lead { max-width:460px; font-size:15px; line-height:1.9; color:#5e6b61; }
.pm-story .ps-hero-actions { display:flex; gap:24px; flex-wrap:wrap; align-items:center; margin-top:30px; }
.pm-story .ps-location { display:inline-flex; align-items:center; gap:8px; font-size:12px; color:#6c7065; }
.pm-story .ps-visual { position:relative; padding:14px; border:1px solid #c8b48e; border-radius:220px 220px 12px 12px; }
.pm-story .ps-visual img { width:100%; height:490px; object-fit:cover; object-position:46% center; border-radius:210px 210px 5px 5px; }
.pm-story .ps-image-label { position:absolute; bottom:35px; left:34px; right:34px; padding:20px; text-align:center; color:#fff6df; background:#203b34f2; border:1px solid #bba27480; }
.pm-story .ps-image-label strong { display:block; font-family:Georgia,serif; font-weight:400; font-size:25px; }
.pm-story .ps-image-label span { display:block; font-size:9px; letter-spacing:.18em; text-transform:uppercase; margin-top:9px; line-height:1.6; }
.pm-story .ps-ribbon { border-block:1px solid var(--line); }
.pm-story .ps-ribbon-inner { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); padding-block:24px; }
.pm-story .ps-ribbon-inner p { text-align:center; color:#6e7569; font-size:10px; letter-spacing:.16em; text-transform:uppercase; line-height:1.6; padding:0 12px; }
.pm-story .ps-ribbon-inner p + p { border-left:1px solid var(--line); }
.pm-story .ps-ribbon-inner strong { display:block; color:var(--ink); font:26px/1.3 Georgia,serif; letter-spacing:0; text-transform:none; margin-bottom:5px; }
.pm-story .ps-family { display:grid; grid-template-columns:260px minmax(0,1fr); gap:70px; padding-block:90px; align-items:start; }
.pm-story .ps-family-intro { position:sticky; top:112px; }
.pm-story .ps-family-intro h2 { font-size:42px; line-height:1.17; letter-spacing:-.03em; margin-top:20px; }
.pm-story .ps-family-intro > p:last-of-type { margin-top:22px; color:#667064; font-size:14px; line-height:1.9; }
.pm-story .ps-index { display:flex; gap:10px; margin-top:28px; }
.pm-story .ps-index a { display:grid; place-items:center; width:42px; height:42px; border:1px solid #cdbb99; border-radius:50%; font:14px Georgia,serif; color:var(--ink); }
.pm-story .ps-index a:hover { background:#eae1d1; }
.pm-story .ps-chapters { list-style:none; margin:0; padding:0; }
.pm-story .ps-chapter { scroll-margin-top:110px; padding:32px 0 38px; border-top:1px solid #cdbb99; display:grid; grid-template-columns:54px minmax(0,1fr); gap:22px; }
.pm-story .ps-chapter:last-child { border-bottom:1px solid #cdbb99; }
.pm-story .ps-number { font:40px/1 Georgia,serif; color:#bba16f; }
.pm-story .ps-chapter h3 { font-size:31px; line-height:1.22; letter-spacing:-.025em; margin-top:10px; }
.pm-story .ps-person { margin-top:24px; }
.pm-story .ps-person + .ps-person { padding-top:22px; border-top:1px solid var(--line); }
.pm-story .ps-person h4 { font-size:21px; line-height:1.45; overflow-wrap:anywhere; }
.pm-story .ps-person p { font-size:14px; color:#626e62; line-height:1.95; margin-top:12px; }
.pm-story .ps-meaning { background:var(--ink); color:#f8f0df; padding-block:68px; }
.pm-story .ps-meaning-grid { display:grid; grid-template-columns:1fr 1fr; gap:90px; align-items:center; }
.pm-story .ps-meaning .ps-kicker { color:#d9bb80; }
.pm-story .ps-meaning h2 { font-size:clamp(34px,4vw,49px); line-height:1.2; margin-top:20px; letter-spacing:-.03em; }
.pm-story .ps-meaning h2 em { color:#d9bb80; }
.pm-story .ps-meaning-copy { border-left:1px solid #c8af7a66; padding-left:40px; }
.pm-story .ps-meaning-copy p { color:#e0e2d6; font-size:15px; line-height:1.95; }
.pm-story .ps-stone { width:55px; height:55px; color:#d9bb80; margin-bottom:24px; }
.pm-story .ps-craft { padding-block:90px; display:grid; grid-template-columns:1fr 1fr; gap:70px; align-items:center; }
.pm-story .ps-craft-image { position:relative; }
.pm-story .ps-craft-image img { width:100%; aspect-ratio:1.05; object-fit:cover; border-radius:8px; }
.pm-story .ps-craft-image::after { content:''; position:absolute; inset:15px; border:1px solid #fff8df99; border-radius:3px; pointer-events:none; }
.pm-story .ps-craft h2 { font-size:clamp(34px,4vw,49px); line-height:1.15; margin-top:20px; letter-spacing:-.03em; }
.pm-story .ps-craft-copy > p:not(.ps-kicker) { color:#626e62; font-size:14px; line-height:1.95; margin-top:22px; }
.pm-story .ps-specialities { margin-top:28px; padding:0; list-style:none; }
.pm-story .ps-specialities li { display:flex; justify-content:space-between; gap:16px; padding:16px 0; border-top:1px solid var(--line); font:20px Georgia,serif; }
.pm-story .ps-specialities li:last-child { border-bottom:1px solid var(--line); }
.pm-story .ps-specialities span { font:11px/1.8 Arial,sans-serif; color:#9b7944; }
.pm-story .ps-trust { border-top:1px solid var(--line); padding-block:70px; }
.pm-story .ps-trust-heading { display:flex; justify-content:space-between; gap:36px; align-items:end; margin-bottom:38px; }
.pm-story .ps-trust-heading h2 { font-size:clamp(34px,4vw,46px); line-height:1.2; margin-top:18px; letter-spacing:-.03em; max-width:550px; }
.pm-story .ps-trust-heading > p { max-width:320px; color:#626e62; font-size:14px; line-height:1.9; }
.pm-story .ps-values { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:20px; }
.pm-story .ps-value { padding:30px; border:1px solid var(--line); border-radius:8px; background:#fffaf2; }
.pm-story .ps-value > svg { width:25px; height:25px; color:#9b7944; stroke-width:1.3; margin-bottom:24px; }
.pm-story .ps-value h3 { font-size:24px; line-height:1.25; }
.pm-story .ps-value p { color:#626e62; font-size:13px; line-height:1.95; margin-top:14px; }
.pm-story .ps-end { padding:55px 40px; margin-bottom:70px; border:1px solid #cdbb99; text-align:center; background:#f0e7d7; border-radius:10px; }
.pm-story .ps-end .ps-kicker { justify-content:center; }
.pm-story .ps-end h2 { font-size:clamp(34px,4vw,50px); line-height:1.2; margin:18px 0; letter-spacing:-.03em; }
.pm-story .ps-end > p:not(.ps-kicker) { font-size:14px; line-height:1.9; color:#626e62; }
.pm-story .ps-end-actions { display:flex; justify-content:center; gap:14px; flex-wrap:wrap; margin-top:28px; }
@media (min-width:768px) and (max-width:1100px) {
 .pm-story .ps-wrap { width:calc(100% - 56px); }
 .pm-story .ps-hero { gap:35px; padding-block:46px 55px; }
 .pm-story .ps-visual img { height:400px; }
 .pm-story .ps-hero h1 { font-size:54px; }
 .pm-story .ps-family { grid-template-columns:210px minmax(0,1fr); gap:36px; padding-block:65px; }
 .pm-story .ps-family-intro h2 { font-size:35px; }
 .pm-story .ps-chapter { grid-template-columns:40px minmax(0,1fr); gap:16px; }
 .pm-story .ps-meaning-grid { gap:38px; }
 .pm-story .ps-craft { gap:35px; padding-block:65px; }
 .pm-story .ps-values { gap:14px; }
 .pm-story .ps-value { padding:24px; }
}
@media (max-width:900px) {
 .pm-story .ps-family { grid-template-columns:minmax(0,1fr); gap:36px; }
 .pm-story .ps-family-intro { position:static; }
 .pm-story .ps-family-intro > p:last-of-type { max-width:600px; }
 .pm-story .ps-trust-heading { align-items:start; flex-direction:column; gap:20px; }
 .pm-story .ps-trust-heading > p { max-width:600px; }
 .pm-story .ps-values { grid-template-columns:minmax(0,1fr); }
 .pm-story .ps-value { display:grid; grid-template-columns:34px minmax(0,1fr); column-gap:18px; }
 .pm-story .ps-value > svg { grid-row:1 / 3; margin-bottom:0; }
}
@media (max-width:767px) {
 .pm-story .ps-wrap { width:calc(100% - 40px); }
 .pm-story .ps-hero { grid-template-columns:minmax(0,1fr); gap:36px; padding-block:38px 42px; }
 .pm-story .ps-hero h1 { font-size:clamp(44px,10vw,68px); max-width:600px; margin:20px 0; }
 .pm-story .ps-lead { max-width:600px; font-size:14px; }
 .pm-story .ps-hero-actions { gap:20px; margin-top:24px; }
 .pm-story .ps-visual { max-width:480px; width:100%; margin-inline:auto; padding:10px; border-radius:190px 190px 10px 10px; }
 .pm-story .ps-visual img { height:360px; border-radius:180px 180px 4px 4px; }
 .pm-story .ps-image-label { bottom:28px; left:26px; right:26px; padding:17px; }
 .pm-story .ps-image-label strong { font-size:23px; }
 .pm-story .ps-ribbon-inner { padding-block:20px; }
 .pm-story .ps-ribbon-inner p { font-size:8px; letter-spacing:.08em; padding-inline:8px; }
 .pm-story .ps-ribbon-inner strong { font-size:20px; }
 .pm-story .ps-family { padding-block:50px; }
 .pm-story .ps-family-intro h2 { font-size:36px; max-width:460px; }
 .pm-story .ps-chapter { grid-template-columns:36px minmax(0,1fr); gap:16px; padding-block:26px 30px; }
 .pm-story .ps-number { font-size:30px; }
 .pm-story .ps-chapter h3 { font-size:28px; }
 .pm-story .ps-person h4 { font-size:21px; }
 .pm-story .ps-meaning { padding-block:44px; }
 .pm-story .ps-meaning-grid { grid-template-columns:minmax(0,1fr); gap:28px; }
 .pm-story .ps-meaning-copy { border-left:0; border-top:1px solid #c8af7a66; padding:26px 0 0; }
 .pm-story .ps-craft { grid-template-columns:minmax(0,1fr); gap:32px; padding-block:50px; }
 .pm-story .ps-craft-image img { aspect-ratio:1.3; }
 .pm-story .ps-trust { padding-block:45px; }
 .pm-story .ps-value { padding:24px; }
 .pm-story .ps-end { padding:36px 22px; margin-bottom:45px; }
 .pm-story .ps-end-actions { flex-direction:column; max-width:320px; margin-inline:auto; }
 .pm-story .ps-btn { min-height:50px; }
}
@media (max-width:380px) {
 .pm-story .ps-wrap { width:calc(100% - 28px); }
 .pm-story .ps-kicker { font-size:9px; letter-spacing:.13em; gap:9px; }
 .pm-story .ps-hero h1 { font-size:43px; }
 .pm-story .ps-visual img { height:310px; }
 .pm-story .ps-chapter { grid-template-columns:28px minmax(0,1fr); gap:12px; }
 .pm-story .ps-person h4 { font-size:20px; }
 .pm-story header .header-logo { gap:6px; }
 .pm-story header .header-logo-image { width:38px; height:38px; }
 .pm-story header .header-logo h1 { font-size:16px; }
 .pm-story header .header-logo p { font-size:8px; }
 .pm-story header .header-icon-button,.pm-story header .header-icon-link { width:30px; }
 .pm-story footer h2 { font-size:24px; }
}
@media (prefers-reduced-motion:reduce) { .pm-story .ps-btn { transition:none; } }
`;

export default function About() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="pm-story">
      <style>{css}</style>
      <SEO title="Our Legacy | Parasmani Jewellers" canonicalPath="/about" description="Four generations. One commitment. Discover the family behind Parasmani Jewellers, our Kolhapur roots, Mani craftsmanship and lasting relationships." />
      <Header />
      <main>
        <section className="ps-hero ps-wrap" aria-labelledby="ps-title">
          <div>
            <p className="ps-kicker">The Parasmani story</p>
            <h1 id="ps-title">Some things<br />grow more precious<br /><em>with generations.</em></h1>
            <p className="ps-lead">Rooted in Kolhapur. Shaped by craftsmanship. Carried forward by a family whose most treasured legacy is your trust.</p>
            <div className="ps-hero-actions"><a className="ps-btn" href="#our-generations">Discover our legacy <FiArrowDown aria-hidden="true" /></a><span className="ps-location"><FiMapPin aria-hidden="true" /> Kolhapur, Maharashtra</span></div>
          </div>
          <div className="ps-visual"><img src={craft} alt="Intricately crafted gold Mani necklace" width="1606" height="979" fetchPriority="high" /><div className="ps-image-label"><strong>Four generations. One commitment.</strong><span>Craftsmanship &middot; Family &middot; Trust</span></div></div>
        </section>
        <div className="ps-ribbon"><div className="ps-ribbon-inner ps-wrap"><p><strong>Kolhapur</strong>Our beginnings</p><p><strong>Four generations</strong>Our family legacy</p><p><strong>Mani</strong>Our signature craft</p></div></div>
        <section id="our-generations" className="ps-family ps-wrap" aria-labelledby="ps-family-title">
          <div className="ps-family-intro"><p className="ps-kicker">The people behind the name</p><h2 id="ps-family-title">A family story.<br />Still being written.</h2><p>Every generation brings something new. Together, we carry forward the craftsmanship, shared responsibility and relationships that define Parasmani.</p><nav className="ps-index" aria-label="Jump to a generation">{chapters.map(c => <a key={c.number} href={'#generation-' + c.number} aria-label={c.label}>{c.number}</a>)}</nav></div>
          <ol className="ps-chapters">{chapters.map(c => <li className="ps-chapter" id={'generation-' + c.number} key={c.number}><span className="ps-number" aria-hidden="true">{c.number}</span><article><p className="ps-kicker">{c.label}</p><h3>{c.title}</h3>{c.people.map(person => <div className="ps-person" key={person.name}><h4>{person.name}</h4><p>{person.text}</p>{person.more && <p>{person.more}</p>}</div>)}</article></li>)}</ol>
        </section>
        <section className="ps-meaning" aria-labelledby="ps-meaning-title"><div className="ps-meaning-grid ps-wrap"><div><svg className="ps-stone" viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M16 14h32l12 18-28 28L4 32l12-18ZM4 32h56M16 14l16 46 16-46M16 14l16 18 16-18" stroke="currentColor" strokeWidth="1.2" /><path d="M32 2v6M58 8l-4 5M6 8l4 5" stroke="currentColor" /></svg><p className="ps-kicker">More than a name</p><h2 id="ps-meaning-title">The touch that<br /><em>creates value.</em></h2></div><div className="ps-meaning-copy"><p>The name &ldquo;Parasmani&rdquo; draws inspiration from the legendary stone believed to transform iron into gold with a touch. For our family, it represents the value we create through craftsmanship, care, and trust &mdash; values we carry forward with every generation.</p></div></div></section>
        <section className="ps-craft ps-wrap" aria-labelledby="ps-craft-title"><div className="ps-craft-image"><img src={craft} alt="Detailed gold Mani beads in a traditional necklace" width="1606" height="979" loading="lazy" /></div><div className="ps-craft-copy"><p className="ps-kicker">Our signature speciality</p><h2 id="ps-craft-title">Many forms.<br />One art. <em>Mani.</em></h2><p>Mani holds a special place in our identity. With a long-standing background in Mani manufacturing, our family has helped introduce and develop these products in the market.</p><p>Our craft brings together knowledge passed down through generations and the care to keep evolving with our customers.</p><ul className="ps-specialities"><li>Pokal Mani <span>01</span></li><li>Bhariv Mani <span>02</span></li><li>Wax Mani <span>03</span></li></ul></div></section>
        <section className="ps-trust ps-wrap" aria-labelledby="ps-trust-title"><div className="ps-trust-heading"><div><p className="ps-kicker">What we value most</p><h2 id="ps-trust-title">Our finest work is the<br />trust we earn.</h2></div><p>We believe in working together, dealing openly and building relationships that last beyond a single transaction.</p></div><div className="ps-values"><article className="ps-value"><FiShield aria-hidden="true" /><h3>Transparency, always.</h3><p>Wax Mani requires confidence in the manufacturer. We earn that confidence through transparent dealings and care in the way we work.</p></article><article className="ps-value"><FiUsers aria-hidden="true" /><h3>A familiar voice.</h3><p>Some relationships have begun with a simple phone call, before an in-person meeting, because our family and our work were already known and trusted.</p></article><article className="ps-value"><FiGlobe aria-hidden="true" /><h3>Beyond borders.</h3><p>From Kolhapur to international trade in cities such as Dubai, our journey has grown through relationships and the reputation built across generations.</p></article></div></section>
        <section className="ps-end ps-wrap" aria-labelledby="ps-end-title"><p className="ps-kicker">The story continues with you</p><h2 id="ps-end-title">A legacy you can hold.</h2><p>Explore the craftsmanship that brings our family story to life.</p><div className="ps-end-actions"><Link className="ps-btn" to="/collections">Explore our collection <FiArrowUpRight aria-hidden="true" /></Link><Link className="ps-btn ps-btn-light" to="/contact">Get in touch <FiArrowUpRight aria-hidden="true" /></Link></div></section>
      </main>
      <Footer />
    </div>
  );
}
