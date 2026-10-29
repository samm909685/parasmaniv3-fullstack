const router=require("express").Router();
const auth=require("../middleware/authMiddleware");
const upload=require("../config/maniTypeUpload");
const controller=require("../controllers/maniTypeController");
router.use(auth);
const photo=(req,res,next)=>upload.single("image")(req,res,error=>{
 if(error) return res.status(400).json({success:false,message:error.code==="LIMIT_FILE_SIZE"?"Image must be smaller than 8 MB.":error.message});
 next();
});
router.get("/",controller.list);
router.post("/",photo,controller.create);
router.put("/:id",(req,res,next)=>/^\d+$/.test(req.params.id)?next():res.status(400).json({success:false,message:"Invalid type ID."}),photo,controller.update);
module.exports=router;
