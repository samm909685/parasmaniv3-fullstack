import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://parasmanijewelers.in";
const DEFAULT_IMAGE = `${SITE_URL}/parasmani-jewellery-og.png`;

function setMeta(attribute, key, value) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", value);
}

function SEO({
  title,
  description,
  image,
  canonicalPath,
  noIndex = false,
  structuredData,
}) {
  const location = useLocation();

  useEffect(() => {
    const path = canonicalPath ?? location.pathname;
    const normalizedPath = path === "/"
      ? "/"
      : `/${path.replace(/^\/+|\/+$/g, "")}/`;
    const canonicalUrl = `${SITE_URL}${normalizedPath}`;
    const pageTitle = title || "Parasmani Jewellers | Traditional Gold Jewellery in Kolhapur";
    const pageDescription = description || "Discover handcrafted traditional Maharashtrian jewellery at Parasmani Jewellers in Kolhapur.";
    const pageImage = image || DEFAULT_IMAGE;

    document.title = pageTitle;
    setMeta("name", "description", pageDescription);
    setMeta("name", "robots", noIndex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    setMeta("property", "og:type", structuredData?.["@type"] === "Product" ? "product" : "website");
    setMeta("property", "og:site_name", "Parasmani Jewellers");
    setMeta("property", "og:title", pageTitle);
    setMeta("property", "og:description", pageDescription);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", pageImage);
    setMeta("property", "og:image:alt", "Jewellery from Parasmani Jewellers");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", pageTitle);
    setMeta("name", "twitter:description", pageDescription);
    setMeta("name", "twitter:image", pageImage);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const schemaId = "parasmani-page-structured-data";
    let schema = document.getElementById(schemaId);
    if (structuredData) {
      if (!schema) {
        schema = document.createElement("script");
        schema.id = schemaId;
        schema.type = "application/ld+json";
        document.head.appendChild(schema);
      }
      schema.textContent = JSON.stringify(structuredData).replace(/</g, "\\u003c");
    } else {
      schema?.remove();
    }
  }, [canonicalPath, description, image, location.pathname, noIndex, structuredData, title]);

  return null;
}

export default SEO;
