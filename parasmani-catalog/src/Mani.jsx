import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import SEO from "../components/SEO/SEO";
import { ManiStyles, ManiPhoto, ManiStatus } from "../components/WorldOfMani/WorldOfMani";
import useManiCatalog from "../hooks/useManiCatalog";

export default function Mani() {
  const catalog = useManiCatalog();
  const products = catalog.products;
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return <div className="pm-mani"><ManiStyles /><SEO title="The World of Mani | Parasmani Jewellers" canonicalPath="/mani" description="Explore Plain Mani, Spot Mani, Nakshi Mani and other Mani products from Parasmani Jewellers in Kolhapur. Discover a family speciality shaped by generations of craft." /><Header /><main>
    <section className="mm-page-hero" aria-labelledby="mani-title"><div className="mm-wrap"><Link className="mm-back" to="/">Home / The World of Mani</Link><div className="mm-heading"><p className="mm-eyebrow">Parasmani Jewellers</p><h1 className="mm-title" id="mani-title">The World of Mani</h1><div className="mm-divider" aria-hidden="true">&#10023;</div><p>A family speciality, shaped by generations of craft.</p></div><p className="mm-page-intro">From Plain and Spot Mani to Nakshi Mani and more, discover the designs at the heart of our family business. Explore the collection and connect with us for details about the pieces that interest you.</p></div></section>
    <section className="mm-shop mm-wrap" aria-labelledby="mani-designs"><ManiStatus {...catalog} />{!catalog.loading && !catalog.error && <>
      <h2 className="mm-shop-title" id="mani-designs">Our Mani products</h2>
      <p className="mm-count" aria-live="polite">{products.length} {products.length === 1 ? "design" : "designs"}</p>
      {products.length ? <div className="mm-products">{products.map(product => <article className="mm-product" key={product.id}><Link className="mm-product-image" to={`/product/${product.id}`} aria-label={`View ${product.name}`}><ManiPhoto src={product.featured_image} alt={product.name} /></Link>{product.product_code && <p className="mm-product-code">Design No. {product.product_code}</p>}<h3><Link to={`/product/${product.id}`}>{product.name}</Link></h3><Link className="mm-product-details" to={`/product/${product.id}`}>View details <FiArrowUpRight aria-hidden="true" /></Link></article>)}</div> : <div className="mm-status"><p>Our latest designs are being prepared for display. Contact us to explore the available Mani options.</p><Link className="mm-button" to="/contact">Enquire about Mani <FiArrowUpRight aria-hidden="true" /></Link></div>}
    </>}
    <aside className="mm-note"><div><h2>Let us help you choose.</h2><p>Looking for a particular Mani design or manufacturing requirement? Speak with our team.</p></div><Link className="mm-button" to="/contact">Contact Parasmani <FiArrowUpRight aria-hidden="true" /></Link></aside></section>
  </main><Footer /></div>;
}
