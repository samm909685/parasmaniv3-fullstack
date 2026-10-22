import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const SITE_URL = "https://parasmanijewelers.in";
const API_URL = "https://api.parasmanijewelers.in/api";
const outputDirectory = fileURLToPath(new URL("../dist/", import.meta.url));
const defaultImage = `${SITE_URL}/parasmani-jewellery-og.png`;

async function loadItems(endpoint) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) {
      console.warn(`SEO build could not load ${endpoint} (HTTP ${response.status}); static output will include core pages only.`);
      return [];
    }

    const result = await response.json();
    if (!Array.isArray(result.data)) {
      console.warn(`SEO build received no ${endpoint} list; static output will omit those routes.`);
      return [];
    }
    return result.data;
  } catch (error) {
    console.warn(`SEO build could not reach ${endpoint}; static output will omit those routes.`, error.message);
    return [];
  }
}

function isActive(item) {
  return item.status === true || item.status === 1 || item.status === "1" || item.status === "true";
}

function isSafeSlug(value) {
  return typeof value === "string" && /^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(value);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function escapeXml(value) {
  return String(value).replace(/[<>&"']/g, (character) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;",
  })[character]);
}

function upsertHeadTag(html, pattern, tag) {
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace("</head>", `  ${tag}\n  </head>`);
}

function pageHtml(template, page) {
  const canonicalRoute = page.route === "/" ? "/" : `${page.route.replace(/\/+$/, "")}/`;
  const canonicalUrl = `${SITE_URL}${canonicalRoute}`;
  const image = page.image || defaultImage;
  let html = template;

  html = upsertHeadTag(html, /<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(page.title)}</title>`);
  html = upsertHeadTag(html, /<meta\s+name="description"[^>]*>/i, `<meta name="description" content="${escapeHtml(page.description)}" />`);
  const robotsContent = page.noIndex
    ? "noindex, follow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  html = upsertHeadTag(html, /<meta\s+name="robots"[^>]*>/i, `<meta name="robots" content="${robotsContent}" />`);
  html = upsertHeadTag(html, /<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`);
  html = upsertHeadTag(html, /<meta\s+property="og:type"[^>]*>/i, `<meta property="og:type" content="${page.product ? "product" : "website"}" />`);
  html = upsertHeadTag(html, /<meta\s+property="og:title"[^>]*>/i, `<meta property="og:title" content="${escapeHtml(page.title)}" />`);
  html = upsertHeadTag(html, /<meta\s+property="og:description"[^>]*>/i, `<meta property="og:description" content="${escapeHtml(page.description)}" />`);
  html = upsertHeadTag(html, /<meta\s+property="og:url"[^>]*>/i, `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`);
  html = upsertHeadTag(html, /<meta\s+property="og:image"[^>]*>/i, `<meta property="og:image" content="${escapeHtml(image)}" />`);
  html = upsertHeadTag(html, /<meta\s+property="og:image:alt"[^>]*>/i, '<meta property="og:image:alt" content="Jewellery from Parasmani Jewellers" />');
  html = upsertHeadTag(html, /<meta\s+name="twitter:card"[^>]*>/i, '<meta name="twitter:card" content="summary_large_image" />');
  html = upsertHeadTag(html, /<meta\s+name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`);
  html = upsertHeadTag(html, /<meta\s+name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`);
  html = upsertHeadTag(html, /<meta\s+name="twitter:image"[^>]*>/i, `<meta name="twitter:image" content="${escapeHtml(image)}" />`);

  if (page.product) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: page.product.name,
      description: page.product.description || undefined,
      image: page.product.featured_image || undefined,
      sku: page.product.product_code || undefined,
      category: page.product.category_name || undefined,
      url: canonicalUrl,
      brand: {
        "@type": "Brand",
        name: "Parasmani Jewellers",
      },
    };
    const schemaTag = `<script id="parasmani-page-structured-data" type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>`;
    html = html.replace("</head>", `  ${schemaTag}\n  </head>`);
  }

  return html;
}

function routeFile(route) {
  const segments = route.split("/").filter(Boolean);
  return path.join(outputDirectory, ...segments, "index.html");
}

const [categories, products, template] = await Promise.all([
  loadItems("categories"),
  loadItems("products"),
  readFile(path.join(outputDirectory, "index.html"), "utf8"),
]);

const pages = [
  {
    route: "/collections",
    title: "Traditional Gold Jewellery Collections | Parasmani Jewellers",
    description: "Explore Parasmani Jewellers' traditional Maharashtrian jewellery collections, including Thushi, Kolhapuri Saaj, mangalsutra, earrings and bangles.",
  },
  {
    route: "/contact",
    title: "Contact Parasmani Jewellers | Kolhapur",
    description: "Contact Parasmani Jewellers in Kolhapur for jewellery enquiries, store details and assistance with our traditional collections.",
  },
  {
    route: "/request-design",
    title: "Request a Custom Jewellery Design | Parasmani Jewellers",
    description: "Share your jewellery design idea with Parasmani Jewellers. Request a handcrafted design inspired by traditional Maharashtrian artistry.",
  },
  {
    route: "/favorites",
    title: "My Favorites | Parasmani Jewellers",
    description: "Your saved jewellery designs from Parasmani Jewellers.",
    noIndex: true,
  },
  ...[
    "login",
    "dashboard",
    "categories",
    "products",
    "media",
    "design-requests",
    "settings",
  ].map((page) => ({
    route: `/admin/${page}`,
    title: "Admin | Parasmani Jewellers",
    description: "Parasmani Jewellers administration page.",
    noIndex: true,
  })),
];

const routes = new Set([
  "/",
  ...pages.filter((page) => !page.noIndex).map((page) => page.route),
]);

for (const category of categories) {
  if (!isActive(category) || !isSafeSlug(category.slug)) continue;

  const route = `/collections/${category.slug}`;
  const categoryName = category.name || category.slug.replace(/-/g, " ");
  routes.add(route);
  pages.push({
    route,
    title: `${categoryName} Jewellery in Kolhapur | Parasmani Jewellers`,
    description: `Explore ${categoryName} jewellery inspired by Maharashtrian tradition at Parasmani Jewellers in Kolhapur.`,
  });
}

for (const product of products) {
  if (!isActive(product) || !(product.slug || product.id)) continue;

  const productPath = isSafeSlug(product.slug) ? product.slug : String(product.id);
  if (!/^[0-9]+$/.test(productPath) && !isSafeSlug(productPath)) continue;
  const route = `/product/${productPath}`;
  routes.add(route);
  pages.push({
    route,
    title: `${product.name} | Parasmani Jewellers`,
    description: product.description || `Explore ${product.name}, a handcrafted ${product.category_name || "jewellery"} design from Parasmani Jewellers in Kolhapur.`,
    image: product.featured_image || defaultImage,
    product,
  });
}

await Promise.all(pages.map(async (page) => {
  const destination = routeFile(page.route);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, pageHtml(template, page), "utf8");
}));

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...[...routes].sort().map((route) => {
    const canonicalRoute = route === "/" ? "/" : `${route.replace(/\/+$/, "")}/`;
    return `  <url><loc>${escapeXml(`${SITE_URL}${canonicalRoute}`)}</loc></url>`;
  }),
  "</urlset>",
  "",
].join("\n");

const robots = [
  "User-agent: *",
  "Allow: /",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
  "",
].join("\n");

await Promise.all([
  writeFile(path.join(outputDirectory, "robots.txt"), robots, "utf8"),
  writeFile(path.join(outputDirectory, "sitemap.xml"), sitemap, "utf8"),
]);

console.log(`Generated metadata for ${pages.length} routes; the sitemap lists ${routes.size} public URLs.`);
