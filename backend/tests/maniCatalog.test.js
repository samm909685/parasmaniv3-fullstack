const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const {buildCatalog}=require('../utils/maniCatalog');
const cats=[{id:4,slug:'mani',status:1},{id:7,slug:'bangles',status:1}];
const types=[{id:11,category_id:4,name:'Plain Mani',slug:'plain-mani',status:1,display_order:0},{id:12,category_id:4,name:'Spot Mani',slug:'spot-mani',status:1,display_order:1}];
const product=(changes={})=>({id:1,category_id:4,mani_type_id:11,status:1,name:'Plain 01',featured_image:'one.jpg',...changes});
const origin='https://api.example.com';
function load(relative,dependencies){const module={exports:{}};vm.runInNewContext(fs.readFileSync(path.join(root,relative),'utf8'),{module,exports:module.exports,require:name=>{if(name in dependencies)return dependencies[name];throw new Error('Unexpected import '+name);},process:{env:{}},console:{error(){},log(){}}});return module.exports;}
function validator(category={id:4,slug:'mani'},type=types[0]){return load('utils/validateManiType.js',{'../models/categoryModel':{getById:(id,cb)=>cb(null,category?[category]:[])},'../models/maniTypeModel':{getById:(id,cb)=>cb(null,type?[type]:[])},'./maniCatalog':require('../utils/maniCatalog')}).validateProductType;}
test('Only products in category Mani and their assigned type are shown',()=>{
 const result=buildCatalog(cats,[product(),product({id:2,category_id:7}),product({id:3,mani_type_id:null}),product({id:4,status:0})],types,origin);
 assert.equal(result.length,2);assert.equal(result[0].products.length,1);assert.equal(result[1].products.length,0);
});
test('New admin-created type appears without a code change',()=>{
 const extra={id:13,category_id:4,name:'Custom Mani',slug:'custom-mani',status:'true',display_order:2};
 const result=buildCatalog(cats,[product({mani_type_id:13})],[...types,extra],origin);
 assert.equal(result[2].name,'Custom Mani');assert.equal(result[2].products.length,1);
});
test('Inactive categories and types remain hidden',()=>{
 assert.equal(buildCatalog([{...cats[0],status:'0'}],[product()],types,origin).length,0);
 assert.equal(buildCatalog(cats,[product()],types.map(t=>({...t,status:false})),origin).length,0);
});
test('Cover uses type image then assigned product image',()=>{
 assert.equal(buildCatalog(cats,[product()],[{...types[0],image:'cover.jpg'}],origin)[0].cover_image,origin+'/uploads/mani-types/cover.jpg');
 assert.equal(buildCatalog(cats,[product()],types,origin)[0].cover_image,origin+'/uploads/products/one.jpg');
});
test('Product names and old category names never determine their type',()=>{
 assert.equal(buildCatalog(cats,[product({mani_type_id:null,name:'Spot Mani'})],types,origin)[1].products.length,0);
 assert.equal(buildCatalog([{id:4,slug:'plain-mani',status:1}],[product()],types,origin).length,0);
});
test('Valid type is accepted',async()=>assert.equal(await validator()(4,'11'),11));
test('A type from a different category is rejected',async()=>await assert.rejects(validator(undefined,{...types[0],category_id:7})(4,11),/does not belong/));
test('Unrelated category cannot receive a Mani type',async()=>await assert.rejects(validator({id:7,slug:'bangles'})(7,11),/Mani category only/));
test('Switching away from Mani clears the assignment',async()=>assert.equal(await validator({id:7,slug:'bangles'})(7,'',{category_id:4,mani_type_id:11}),null));
test('Omitted field preserves the existing valid type',async()=>assert.equal(await validator()(4,undefined,{category_id:4,mani_type_id:11}),11));
test('Existing unassigned products stay unassigned',async()=>assert.equal(await validator()(4,undefined,{category_id:4,mani_type_id:null}),null));
test('Inactive type can be retained but cannot be newly assigned',async()=>{
 const validate=validator(undefined,{...types[0],status:0});
 await assert.rejects(validate(4,11),/inactive/);
 assert.equal(await validate(4,11,{category_id:4,mani_type_id:11}),11);
});
test('Product model saves category and type as separate SQL parameters',()=>{
 let captured;const db={query:(sql,values)=>{captured={sql,values};}};
 const model=load('models/productModel.js',{'../config/db':db});
 model.create({category_id:4,mani_type_id:11,name:'Plain 01'},()=>{});
 assert.equal(captured.values[0],4);assert.equal(captured.values[1],11);assert.match(captured.sql,/mani_type_id/);
 model.update(9,{category_id:7,mani_type_id:null},()=>{});assert.equal(captured.values[1],null);assert.equal(captured.values.at(-1),9);
});
test('Type management routes authenticate before reading or writing',()=>{
 const calls=[];const auth=()=>{};const router={use:fn=>calls.push(['auth',fn]),get:()=>calls.push(['get']),post:()=>calls.push(['post']),put:()=>calls.push(['put'])};
 load('routes/maniTypeRoutes.js',{'express':{Router:()=>router},'../middleware/authMiddleware':auth,'../config/maniTypeUpload':{single:()=>{}},'../controllers/maniTypeController':{}});
 assert.equal(calls[0][0],'auth');assert.equal(calls[0][1],auth);
});
test('Type admin validates names and returns duplicate slug errors',async()=>{
 const noopModel={getAll:cb=>cb(null,cats),getById:(id,cb)=>cb(null,[]),create:(data,cb)=>cb({code:'ER_DUP_ENTRY'})};
 const controller=load('controllers/maniTypeController.js',{'../models/maniTypeModel':noopModel,'../models/categoryModel':noopModel,'../utils/maniCatalog':require('../utils/maniCatalog'),'fs/promises':{unlink:async()=>{}}});
 const res=()=>({code:200,status(n){this.code=n;return this;},json(body){this.body=body;return this;}});
 let r=res();await controller.create({body:{name:'',slug:'bad slug'}},r);assert.equal(r.code,400);
 r=res();await controller.create({body:{name:'Plain Mani',slug:'plain-mani',status:'true'}},r);assert.equal(r.code,409);
});
