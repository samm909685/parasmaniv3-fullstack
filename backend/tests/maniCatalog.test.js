const test = require("node:test");
const assert = require("node:assert/strict");
const { buildCatalog } = require("../utils/maniCatalog");
const origin = "https://api.example.com";
test("Only active products in the matching active category are returned", () => {
  const result = buildCatalog([{id:7, slug:"pokal-mani", status:1}], [
    {id:1, category_id:"7", status:"1", name:"Active"},
    {id:2, category_id:7, status:"0"}, {id:3, category_id:8, status:1}
  ], origin);
  assert.deepEqual(result[0].products.map(item => item.id), [1]);
});
test("Hidden categories hide all their products; similar names do not match", () => {
  const result = buildCatalog([{id:1,slug:"wax-mani",status:0},{id:2,slug:"wax-necklace",status:1}], [{id:1,category_id:1,status:1}], origin);
  assert.equal(result.some(item => item.slug === "wax-mani"), false);
  assert.equal(result.flatMap(item => item.products).length, 0);
});
test("Cover prefers category photo, then active product photo", () => {
  const cat = {id:1,slug:"bhariv-mani",status:true,image:"cover photo.jpg"};
  const products = [{id:4,category_id:1,status:true,featured_image:"mani.jpg"}];
  assert.equal(buildCatalog([cat],products,origin)[1].cover_image, origin + "/uploads/categories/cover%20photo.jpg");
  assert.equal(buildCatalog([{...cat,image:null}],products,origin)[1].cover_image, origin + "/uploads/products/mani.jpg");
});
test("No seeded products or invented imagery; malformed image paths rejected", () => {
  const result = buildCatalog([{id:1,slug:"pokal-mani",status:true,image:"../secret"}],[],origin);
  assert.equal(result[0].cover_image,null);
  assert.equal(result.length,3);
  assert.equal(result.flatMap(item => item.products).length,0);
});
test("Products respect display order and absolute image URLs", () => {
  const result = buildCatalog([{id:1,slug:"pokal-mani",status:"true"}], [
    {id:1,category_id:1,status:1,display_order:3},
    {id:2,category_id:1,status:1,display_order:0,featured_image:"https://images.example.com/mani.jpg"},
  ],origin);
  assert.deepEqual(result[0].products.map(item => item.id),[2,1]);
  assert.equal(result[0].cover_image,"https://images.example.com/mani.jpg");
});
