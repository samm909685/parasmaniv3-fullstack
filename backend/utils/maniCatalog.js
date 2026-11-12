const active = value => value === true || value === 1 || value === "1" || value === "true";
function imageUrl(value, folder, origin) {
  if (typeof value !== "string" || !value.trim()) return null;
  const image=value.trim();
  if (/^https?:\/\//i.test(image)) return image;
  if (image.includes("/") || image.includes("\\") || image === "." || image === "..") return null;
  return `${origin.replace(/\/+$/,"")}/uploads/${folder}/${encodeURIComponent(image)}`;
}
function buildCatalog(categories,products,types,origin) {
  const category=categories.find(item=>item.slug === "mani" && active(item.status));
  if(!category) return [];
  return types.filter(type=>active(type.status) && String(type.category_id)===String(category.id))
    .sort((a,b)=>(Number(a.display_order)||0)-(Number(b.display_order)||0)||Number(a.id)-Number(b.id))
    .map(type=>{
      const selected=products.filter(p=>active(p.status) && String(p.category_id)===String(category.id) && String(p.mani_type_id)===String(type.id))
        .sort((a,b)=>(Number(a.display_order)||0)-(Number(b.display_order)||0)||Number(b.id)-Number(a.id))
        .map(p=>({id:p.id,name:p.name,product_code:p.product_code||"",description:p.description||"",weight:p.weight||"",purity:p.purity||"",featured_image:imageUrl(p.featured_image,"products",origin)}));
      return {id:type.id,slug:type.slug,name:type.name,description:type.description||"",cover_image:imageUrl(type.image,"mani-types",origin)||selected.find(p=>p.featured_image)?.featured_image||null,products:selected};
    });
}
module.exports={buildCatalog,active,imageUrl};

/** Flat public product catalog. Legacy grouping above remains for cached clients. */
function buildProducts(categories, products, origin) {
  const category = categories.find(item => item.slug === "mani" && active(item.status));
  if (!category) return [];
  return products.filter(p => active(p.status) && String(p.category_id) === String(category.id))
    .sort((a,b) => (Number(a.display_order)||0)-(Number(b.display_order)||0) || Number(b.id)-Number(a.id))
    .map(p => ({
      id:p.id, name:p.name, slug:p.slug||"", product_code:p.product_code||"",
      description:p.description||"", weight:p.weight||"", purity:p.purity||"",
      featured_image:imageUrl(p.featured_image,"products",origin)
    }));
}
module.exports.buildProducts = buildProducts;
