import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import SEO from "../components/SEO/SEO";
import { ManiStyles, ManiPhoto, ManiStatus } from "../components/WorldOfMani/WorldOfMani";
import useManiCatalog from "../hooks/useManiCatalog";

const styles = `
.pm-mani .md-main { min-height:65vh; padding-block:40px 64px; }
.pm-mani .md-back { display:inline-flex; align-items:center; gap:10px; min-height:44px; margin-bottom:28px; }
.pm-mani .md-detail { display:grid; grid-template-columns:minmax(0,1.1fr) minmax(0,1fr); gap:clamp(28px,5vw,70px); align-items:center; }
.pm-mani .md-image { min-width:0; overflow:hidden; border:1px solid var(--mm-border); border-radius:16px; }
.pm-mani .md-image .mm-photo { aspect-ratio:1; }
.pm-mani .md-image .mm-photo img { object-fit:contain; }
.pm-mani .md-copy { min-width:0; padding-block:20px; }
.pm-mani .md-copy .mm-title { overflow-wrap:anywhere; }
.pm-mani .md-description { font:15px/1.95 Arial,sans-serif; color:#e1e5db; white-space:pre-line; overflow-wrap:anywhere; margin:26px 0; }
.pm-mani .md-meta { border-block:1px solid var(--mm-border); padding-block:20px; margin:28px 0; font:14px/1.8 Arial,sans-serif; }
.pm-mani .md-meta div { display:flex; flex-wrap:wrap; gap:20px; }
.pm-mani .md-meta dt { color:#e2c58d; }
.pm-mani .md-meta dd { margin:0; }
.pm-mani .md-note { font:12px/1.8 Arial,sans-serif; color:#e1e5db; margin:18px 0 0; }
.pm-mani .md-enquire { background:var(--mm-gold); border-color:var(--mm-gold); }
.pm-mani .md-enquire:hover { background:#dfc38e; }
@media(max-width:850px) { .pm-mani .md-detail { grid-template-columns:minmax(0,1fr); gap:20px; } .pm-mani .md-image { width:100%; max-width:620px; margin-inline:auto; } }
@media(max-width:699px) { .pm-mani .md-main { padding-block:24px 44px; } .pm-mani .md-back { margin-bottom:18px; } .pm-mani .md-description { font-size:14px; } .pm-mani .md-enquire { width:100%; } }
`;

export default function Mani() {
  const catalog = useManiCatalog();
  const [params] = useSearchParams();
  const requested = params.get("type");
  const isDetail = Boolean(requested && requested !== "all");
  const selected = catalog.types.find(type => type.slug === requested);
  useEffect(() => { window.scrollTo(0, 0); }, [requested]);

  return <div className="pm-mani">
    <ManiStyles /><style>{styles}</style>
    <SEO title={selected ? `${selected.name} | Parasmani Jewellers` : "The World of Mani | Parasmani Jewellers"} canonicalPath="/mani" description={selected?.description || "Explore the World of Mani at Parasmani Jewellers, Kolhapur."} />
    <Header />
    <main className="mm-wrap md-main">
      <Link className="mm-back md-back" to={isDetail ? "/mani" : "/"}><FiArrowLeft aria-hidden="true" />{isDetail ? "Back to Mani" : "Back to Home"}</Link>
      <ManiStatus {...catalog} />
      {!catalog.loading && !catalog.error && (isDetail ? (
        selected ? <article className="md-detail" aria-labelledby="mani-name">
          <div className="md-image"><ManiPhoto src={selected.cover_image} alt={selected.name} /></div>
          <div className="md-copy">
            <p className="mm-eyebrow">Mani collection</p>
            <h1 className="mm-title" id="mani-name">{selected.name}</h1>
            {selected.description && <p className="md-description">{selected.description}</p>}
            <dl className="md-meta"><div><dt>Category</dt><dd>Mani</dd></div></dl>
            <Link className="mm-button md-enquire" to="/contact">Enquire about {selected.name}<FiArrowUpRight aria-hidden="true" /></Link>
            <p className="md-note">Contact our team for available sizes, specifications and further details.</p>
          </div>
        </article> : <section className="mm-status"><h1 className="mm-shop-title">Mani unavailable</h1><p>This Mani is currently unavailable. Please explore the collection or contact our team.</p><Link className="mm-button" to="/mani">Explore Mani</Link></section>
      ) : <>
        <div className="mm-heading"><p className="mm-eyebrow">Our signature speciality</p><h1 className="mm-title">The World of Mani</h1><div className="mm-divider" aria-hidden="true">&#10023;</div><p>A family speciality, shaped by generations of craft.</p></div>
        {catalog.types.length ? <div className="mm-types">{catalog.types.map(type => <Link className="mm-type" key={type.id || type.slug} to={`/mani?type=${encodeURIComponent(type.slug)}`} aria-label={`View ${type.name}`}><ManiPhoto src={type.cover_image} alt={type.name} /><div className="mm-type-body"><h3>{type.name}</h3></div></Link>)}</div> : <div className="mm-status"><p>Our Mani collection is being prepared. Contact us for available options.</p><Link className="mm-button" to="/contact">Contact Parasmani</Link></div>}
      </>)}
    </main>
    <Footer />
  </div>;
}
