const TYPES = [
  { slug: "pokal-mani", name: "Pokal Mani", description: "Explore our Pokal Mani designs, part of our family's long-standing speciality." },
  { slug: "bhariv-mani", name: "Bhariv Mani", description: "Discover Bhariv Mani designs and the details that give each piece its character." },
  { slug: "wax-mani", name: "Wax Mani", description: "Explore our Wax Mani collection, backed by generations of knowledge and trust." },
];
const active = value => value === true || value === 1 || value === "1" || value === "true";
function imageUrl(value, folder, origin) {
  if (typeof value !== "string" || !value.trim()) return null;
  const image = value.trim();
  if (/^https?:\/\//i.test(image)) return image;
  if (image.includes("/") || image.includes("\\") || image === "." || image === "..") return null;
  return `${origin.replace(/\/+$/, "")}/uploads/${folder}/${encodeURIComponent(image)}`;
}
function buildCatalog(categories, products, origin) {
  return TYPES.flatMap(type => {
    const category = categories.find(item => item.slug === type.slug);
    // Missing categories are empty previews; explicitly disabled ones stay hidden.
    if (category && !active(category.status)) return [];
    const selected = category ? products
      .filter(item => active(item.status) && String(item.category_id) === String(category.id))
      .sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0) || Number(b.id) - Number(a.id))
      .map(item => ({
        id: item.id, name: item.name, product_code: item.product_code || "",
        description: item.description || "", weight: item.weight || "", purity: item.purity || "",
        featured_image: imageUrl(item.featured_image, "products", origin),
      })) : [];
    return [{
      ...type, description: category?.description?.trim() || type.description,
      cover_image: imageUrl(category?.image, "categories", origin) || selected.find(item => item.featured_image)?.featured_image || null,
      products: selected,
    }];
  });
}
module.exports = { buildCatalog };
