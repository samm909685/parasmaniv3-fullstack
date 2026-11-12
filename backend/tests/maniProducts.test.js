const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs/promises'),path=require('node:path'),os=require('node:os');
const {buildProducts}=require('../utils/maniCatalog');
const {planConversion,safeImage,preparePhoto}=require('../scripts/convert-mani-types');
const cats=[{id:4,slug:'mani',status:1},{id:7,slug:'bangles',status:1}];
const product=(v={})=>({id:1,name:'Nakshi Mani',category_id:4,status:1,featured_image:'nakshi.jpg',...v});
const type=(v={})=>({id:11,category_id:4,name:'Nakshi Mani',slug:'nakshi-mani',image:'photo.jpg',...v});
test('Mani category products appear without a type, with a legacy type, or with an inactive legacy type',()=>{
 const result=buildProducts(cats,[product({id:1,mani_type_id:null}),product({id:2,mani_type_id:11}),product({id:3,mani_type_id:99})],'https://api.example.com/');
 assert.deepEqual(result.map(p=>p.id),[3,2,1]);assert.equal(result[0].featured_image,'https://api.example.com/uploads/products/nakshi.jpg');
});
test('Inactive products, other categories and inactive Mani category are excluded',()=>{
 assert.equal(buildProducts(cats,[product({status:0}),product({category_id:7})],'https://a').length,0);
 assert.equal(buildProducts([{...cats[0],status:0}],[product()],'https://a').length,0);
 assert.equal(buildProducts([{...cats[0],slug:'plain-mani'}],[product()],'https://a').length,0);
});
test('Display order is respected and missing images remain empty',()=>{
 const result=buildProducts(cats,[product({id:1,display_order:2}),product({id:2,display_order:1,featured_image:null})],'https://a');
 assert.deepEqual(result.map(p=>p.id),[2,1]);assert.equal(result[0].featured_image,null);
});
test('Conversion creates only unrepresented types and skips already imported ones',()=>{
 assert.equal(planConversion([type()],[],4)[0].action,'create');
 assert.equal(planConversion([type()],[product({slug:'mani-import-11',mani_type_id:11})],4)[0].action,'already-converted');
 assert.equal(planConversion([type({category_id:7})],[],4).length,0);
});
test('Existing linked designs and name/slug collisions require review',()=>{
 assert.equal(planConversion([type()],[product({mani_type_id:11})],4)[0].action,'review-existing-products');
 assert.equal(planConversion([type()],[product()],4)[0].action,'review-name-conflict');
 assert.equal(planConversion([type()],[product({name:'Other',slug:'mani-import-11'})],4)[0].action,'review-name-conflict');
});
test('Unsafe filenames cannot escape the upload directory',()=>{
 for(const name of ['../secret','..\\secret','/tmp/file','.','..','']) assert.equal(safeImage(name),false);
 assert.equal(safeImage('photo.jpg'),true);
});
test('Dry run does not copy photos; apply preserves source and is repeatable',async()=>{
 const dir=await fs.mkdtemp(path.join(os.tmpdir(),'mani-test-'));
 try {
  await fs.mkdir(path.join(dir,'mani-types'));await fs.writeFile(path.join(dir,'mani-types/photo.jpg'),'original-photo');
  const name=await preparePhoto(type(),dir,false);await assert.rejects(fs.access(path.join(dir,'products',name)));
  assert.equal(await preparePhoto(type(),dir,true),name);assert.equal(await preparePhoto(type(),dir,true),name);
  assert.equal(await fs.readFile(path.join(dir,'mani-types/photo.jpg'),'utf8'),'original-photo');
  assert.equal(await fs.readFile(path.join(dir,'products',name),'utf8'),'original-photo');
  await assert.rejects(preparePhoto(type({image:'missing.jpg'}),dir,false));
  await fs.writeFile(path.join(dir,'products',name),'different');await assert.rejects(preparePhoto(type(),dir,true),/collision/);
 } finally {await fs.rm(dir,{recursive:true,force:true});}
});
