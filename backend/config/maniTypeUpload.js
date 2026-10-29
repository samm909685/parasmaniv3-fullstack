const multer=require("multer");
const path=require("path");
const fs=require("fs");
const {randomUUID}=require("crypto");
const extensions={"image/jpeg":".jpg","image/png":".png","image/webp":".webp"};
const storage=multer.diskStorage({
 destination(req,file,cb){const dir=path.join(process.env.UPLOAD_ROOT||path.join(__dirname,"../uploads"),"mani-types");fs.mkdir(dir,{recursive:true},err=>cb(err,dir));},
 filename(req,file,cb){cb(null,randomUUID()+extensions[file.mimetype]);}
});
module.exports=multer({storage,limits:{fileSize:8*1024*1024,files:1},fileFilter(req,file,cb){cb(extensions[file.mimetype]?null:new Error("Use a JPG, PNG or WebP image."),Boolean(extensions[file.mimetype]));}});
