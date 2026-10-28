const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const { buildCatalog } = require("../utils/maniCatalog");
function handler(categories, products, failure) {
  const module = { exports: {} };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname,"../controllers/maniController.js"),"utf8"), {
    exports:module.exports, module, process:{env:{PUBLIC_API_URL:"https://api.example.com"}}, console:{error(){}},
    require(name) {
      if(name.includes("categoryModel")) return {getAll: cb => cb(failure || null,categories)};
      if(name.includes("productModel")) return {getAll: cb => cb(null,products)};
      if(name.includes("maniCatalog")) return {buildCatalog};
      throw new Error("Unexpected dependency");
    }
  });
  return module.exports.getManiCatalog;
}
function response() { return {code:200,body:null,status(code){this.code=code;return this;},json(body){this.body=body;return this;}}; }
test("Controller supplies active catalogue to the public response",async()=>{
  const res=response();
  await handler([{id:1,slug:"pokal-mani",status:1}], [{id:7,category_id:1,status:1,name:"Pokal design",featured_image:"7.jpg"}])({},res);
  assert.equal(res.code,200); assert.equal(res.body.success,true);
  assert.equal(res.body.data[0].products[0].featured_image,"https://api.example.com/uploads/products/7.jpg");
});
test("Database failure returns a useful error without database internals",async()=>{
  const res=response();
  await handler([],[],new Error("private connection details"))({},res);
  assert.equal(res.code,500); assert.equal(res.body.success,false);
  assert.equal(JSON.stringify(res.body).includes("private"),false);
});
