import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import useManiCatalog from "../../hooks/useManiCatalog";

const styles = `
.pm-mani { --mm-teal:#123f43; --mm-ivory:#f8f0e3; --mm-gold:#c8a45d; --mm-border:#c8a45d66; color:var(--mm-ivory); background:var(--mm-teal); }
.pm-mani .mm-wrap,.pm-mani .mm-wrap * { box-sizing:border-box; }
.pm-mani .mm-wrap { width:min(1200px,calc(100% - 64px)); margin-inline:auto; }
.pm-mani .mm-eyebrow { margin:0; font:500 10px/1.8 Arial,sans-serif; text-transform:uppercase; letter-spacing:.23em; color:#e2c58d; }
.pm-mani .mm-heading { text-align:center; max-width:780px; margin:0 auto 34px; }
.pm-mani .mm-title { font-family:Cinzel,Georgia,serif; font-weight:400; font-size:clamp(30px,4.3vw,54px); line-height:1.2; text-wrap:balance; margin:12px 0 0; color:var(--mm-ivory); }
.pm-mani .mm-divider { display:flex; align-items:center; justify-content:center; gap:12px; margin:18px 0; color:var(--mm-gold); }
.pm-mani .mm-divider::before,.pm-mani .mm-divider::after { content:''; width:55px; height:1px; background:var(--mm-gold); }
.pm-mani .mm-heading p:not(.mm-eyebrow) { font:14px/1.9 Arial,sans-serif; color:#e1e5db; margin:0; }
.pm-mani .mm-preview { padding-block:60px; }
.pm-mani .mm-types { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:24px; }
.pm-mani .mm-type { display:block; border:1px solid var(--mm-border); border-radius:13px; color:var(--mm-ivory); text-decoration:none; overflow:hidden; background:#0e363a; transition:border-color .2s,transform .2s; }
.pm-mani .mm-type:hover { border-color:var(--mm-gold); transform:translateY(-3px); }
.pm-mani .mm-photo { width:100%; aspect-ratio:1.2; background:#f0e7d7; position:relative; overflow:hidden; }
.pm-mani .mm-photo img { width:100%; height:100%; display:block; object-fit:cover; transition:transform .35s; }
.pm-mani .mm-type:hover img { transform:scale(1.035); }
.pm-mani .mm-photo-empty { height:100%; display:grid; place-content:center; justify-items:center; gap:14px; background:radial-gradient(ellipse at center,#faf4e7,#e7dac1); color:#8d713c; font:12px/1.6 Arial,sans-serif; text-align:center; padding:20px; }
.pm-mani .mm-photo-empty svg { width:88px; height:56px; }
.pm-mani .mm-type-body { padding:22px 18px; text-align:center; }
.pm-mani .mm-type h3 { margin:0; font:400 clamp(20px,2vw,27px)/1.35 Cinzel,Georgia,serif; color:var(--mm-ivory); }
.pm-mani .mm-type-cta { display:flex; align-items:center; justify-content:center; gap:12px; margin-top:12px; font:13px/1.6 Arial,sans-serif; color:#e2c58d; }
.pm-mani .mm-footer { margin-top:34px; text-align:center; }
.pm-mani .mm-button { display:inline-flex; align-items:center; justify-content:center; gap:16px; border:1px solid var(--mm-ivory); border-radius:999px; min-height:50px; padding:13px 25px; background:var(--mm-ivory); color:var(--mm-teal); font:14px/1.5 Arial,sans-serif; text-decoration:none; cursor:pointer; max-width:100%; }
.pm-mani .mm-button:hover { background:#eadfc9; }
.pm-mani .mm-footer > p { font:12px/1.8 Arial,sans-serif; margin:16px 0 0; color:#e1e5db; }
.pm-mani a:focus-visible,.pm-mani button:focus-visible { outline:3px solid #e2c58d; outline-offset:5px; }
.pm-mani .mm-status { border:1px solid var(--mm-border); border-radius:12px; padding:30px; text-align:center; font:14px/1.9 Arial,sans-serif; }
.pm-mani .mm-status .mm-button { margin-top:16px; }
.pm-mani .mm-status p { margin:0; }
.pm-mani .mm-skeleton { aspect-ratio:.9; border:1px solid var(--mm-border); border-radius:12px; background:#ffffff08; }
.pm-mani .mm-page-hero { padding-block:60px 48px; border-bottom:1px solid var(--mm-border); }
.pm-mani .mm-back { color:#e2c58d; font:12px Arial,sans-serif; display:inline-block; margin-bottom:36px; text-decoration:none; }
.pm-mani .mm-page-hero .mm-heading { margin-bottom:0; }
.pm-mani .mm-page-intro { max-width:720px; margin:24px auto 0; font:14px/1.9 Arial,sans-serif; text-align:center; color:#e1e5db; }
.pm-mani .mm-shop { padding-block:45px 64px; }
.pm-mani .mm-filter-bar { display:flex; flex-wrap:wrap; gap:10px; margin-bottom:26px; }
.pm-mani .mm-filter { display:inline-flex; align-items:center; min-height:46px; padding:11px 20px; border:1px solid var(--mm-border); border-radius:999px; color:var(--mm-ivory); font:13px/1.5 Arial,sans-serif; text-decoration:none; }
.pm-mani .mm-filter[aria-current=page] { background:var(--mm-ivory); color:var(--mm-teal); border-color:var(--mm-ivory); }
.pm-mani .mm-shop-title { font:400 30px/1.3 Cinzel,Georgia,serif; color:var(--mm-ivory); margin:0 0 14px; }
.pm-mani .mm-count { font:12px/1.8 Arial,sans-serif; color:#e1e5db; margin:0 0 28px; }
.pm-mani .mm-products { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:28px 22px; }
.pm-mani .mm-product { min-width:0; }
.pm-mani .mm-product-image { display:block; border-radius:10px; overflow:hidden; border:1px solid var(--mm-border); }
.pm-mani .mm-product .mm-photo { aspect-ratio:1; }
.pm-mani .mm-product h3 { font:400 18px/1.5 Cinzel,Georgia,serif; margin:12px 0 6px; overflow-wrap:anywhere; color:var(--mm-ivory); }
.pm-mani .mm-product h3 a { color:inherit; text-decoration:none; }
.pm-mani .mm-product-code { font:10px/1.8 Arial,sans-serif; letter-spacing:.1em; color:#e2c58d; margin:14px 0 0; }
.pm-mani .mm-product-details { display:inline-flex; align-items:center; gap:9px; color:#e2c58d; font:12px/1.6 Arial,sans-serif; min-height:44px; text-decoration:none; }
.pm-mani .mm-note { padding:30px; border:1px solid var(--mm-border); border-radius:12px; margin-top:45px; display:flex; align-items:center; justify-content:space-between; gap:25px; }
.pm-mani .mm-note h2 { font:400 26px/1.4 Cinzel,Georgia,serif; margin:0 0 8px; color:var(--mm-ivory); }
.pm-mani .mm-note p { margin:0; font:13px/1.9 Arial,sans-serif; color:#e1e5db; }
@media(min-width:700px) and (max-width:1023px) { .pm-mani .mm-types { grid-template-columns:repeat(2,minmax(0,1fr)); } .pm-mani .mm-wrap { width:calc(100% - 48px); } .pm-mani .mm-types { gap:16px; } .pm-mani .mm-type-body { padding:20px 10px; } .pm-mani .mm-type h3 { font-size:20px; } .pm-mani .mm-products { grid-template-columns:repeat(3,minmax(0,1fr)); gap:22px 16px; } }
@media(max-width:699px) { .pm-mani .mm-wrap { width:calc(100% - 36px); } .pm-mani .mm-preview { padding-block:42px; } .pm-mani .mm-types { grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px; } .pm-mani .mm-photo { aspect-ratio:1; } .pm-mani .mm-type h3 { font-size:clamp(14px,3.8vw,21px); overflow-wrap:anywhere; } .pm-mani .mm-type-body { padding:15px 9px; } .pm-mani .mm-type-cta { font-size:11px; gap:5px; min-height:28px; } .pm-mani .mm-footer .mm-button { width:100%; max-width:360px; } .pm-mani .mm-page-hero { padding-block:34px; } .pm-mani .mm-back { margin-bottom:28px; } .pm-mani .mm-shop { padding-block:32px 45px; } .pm-mani .mm-products { grid-template-columns:repeat(2,minmax(0,1fr)); gap:24px 12px; } .pm-mani .mm-product h3 { font-size:15px; } .pm-mani .mm-filter { padding:10px 15px; font-size:12px; } .pm-mani .mm-note { flex-direction:column; align-items:start; padding:24px; } .pm-mani .mm-note .mm-button { width:100%; } .pm-mani .mm-status { padding:24px 18px; } }
@media(max-width:380px) { .pm-mani .mm-wrap { width:calc(100% - 28px); } .pm-mani .mm-eyebrow { letter-spacing:.15em; font-size:9px; } .pm-mani header .header-logo { gap:6px; } .pm-mani header .header-logo-image { width:38px; height:38px; } .pm-mani header .header-logo h1 { font-size:16px; } .pm-mani header .header-logo p { font-size:8px; } .pm-mani header .header-icon-button,.pm-mani header .header-icon-link { width:30px; } .pm-mani footer h2 { font-size:24px; } }
@media(prefers-reduced-motion:reduce) { .pm-mani .mm-type,.pm-mani .mm-photo img { transition:none; } .pm-mani .mm-type:hover,.pm-mani .mm-type:hover img { transform:none; } }
`;
export function ManiStyles() { return <style>{styles}</style>; }
export function ManiPhoto({ src, alt }) {
  const [failedSource, setFailedSource] = useState(null);
  return <div className="mm-photo">{src && src !== failedSource ? <img src={src} alt={alt} loading="lazy" onError={() => setFailedSource(src)} /> : <div className="mm-photo-empty"><svg viewBox="0 0 100 60" fill="none" aria-hidden="true"><path d="M0 30h100" stroke="currentColor" /><circle cx="20" cy="30" r="12" stroke="currentColor" /><circle cx="50" cy="30" r="20" stroke="currentColor" /><circle cx="80" cy="30" r="12" stroke="currentColor" /><ellipse cx="50" cy="30" rx="8" ry="20" stroke="currentColor" /></svg><span>{alt}</span></div>}</div>;
}
export function ManiStatus({ loading, error, retry }) {
  if (loading) return <div role="status" aria-live="polite"><p className="mm-count">Loading our Mani collection...</p><div className="mm-types" aria-hidden="true">{[0,1,2].map(i => <div className="mm-skeleton" key={i} />)}</div></div>;
  if (error) return <div className="mm-status" role="alert"><p>{error}</p><button className="mm-button" onClick={retry} type="button">Try again</button></div>;
  return null;
}
export default function WorldOfMani() {
  const catalog = useManiCatalog();
  return <section className="pm-mani" aria-labelledby="world-mani-heading"><ManiStyles /><div className="mm-preview mm-wrap"><div className="mm-heading"><p className="mm-eyebrow">Our signature speciality</p><h2 id="world-mani-heading" className="mm-title">The World of Mani</h2><div className="mm-divider" aria-hidden="true">&#10023;</div><p>A family speciality, shaped by generations of craft.</p></div><ManiStatus {...catalog} />{!catalog.loading && !catalog.error && <>{catalog.products.length ? <div className="mm-types">{catalog.products.map(product => <Link className="mm-type" key={product.id} to={`/product/${product.id}`}><ManiPhoto src={product.featured_image} alt={product.name} /><div className="mm-type-body"><h3>{product.name}</h3><span className="mm-type-cta">View Design <FiArrowUpRight aria-hidden="true" /></span></div></Link>)}</div> : <div className="mm-status"><p>Discover our Mani speciality. Contact us for the latest designs.</p></div>}<div className="mm-footer"><Link className="mm-button" to="/mani">Explore All Mani <FiArrowUpRight aria-hidden="true" /></Link><p>Tradition in every detail.</p></div></>}</div></section>;
}
