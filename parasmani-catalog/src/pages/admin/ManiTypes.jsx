import { useEffect, useRef, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { getManiTypes, saveManiType } from "../../services/maniTypesService";

const blank = () => ({name:"",slug:"",description:"",status:true,display_order:0});
const enabled=value=>[true,1,"1","true"].includes(value);
export default function ManiTypes(){
 const [rows,setRows]=useState([]),[loading,setLoading]=useState(true),[error,setError]=useState("");
 const [revision,setRevision]=useState(0),[editing,setEditing]=useState(null),[form,setForm]=useState(blank);
 const [file,setFile]=useState(null),[saving,setSaving]=useState(false),[message,setMessage]=useState("");
 const fileInput=useRef(null),nameInput=useRef(null);
 useEffect(()=>{
  const controller=new AbortController();
  getManiTypes(controller.signal).then(data=>{if(!controller.signal.aborted){setRows(data);setLoading(false);setError("");}})
   .catch(err=>{if(!controller.signal.aborted){setError(err.message);setLoading(false);}});
  return ()=>controller.abort();
 },[revision]);
 const change=(key,value)=>setForm(current=>({...current,[key]:value}));
 const reset=()=>{setEditing(null);setForm(blank());setFile(null);if(fileInput.current)fileInput.current.value="";};
 const edit=row=>{setEditing(row);setForm({name:row.name,slug:row.slug,description:row.description||"",status:enabled(row.status),display_order:row.display_order||0});setFile(null);setMessage("");if(fileInput.current)fileInput.current.value="";nameInput.current?.focus();};
 const submit=async event=>{
  event.preventDefault();setMessage("");
  if(file&&file.size>8*1024*1024){setMessage("Choose an image smaller than 8 MB.");return;}
  const body=new FormData();Object.entries(form).forEach(([key,value])=>body.append(key,value));if(file)body.append("image",file);
  try{setSaving(true);await saveManiType(editing?.id,body);reset();setMessage("Saved. This type is now managed under the Mani category.");setLoading(true);setRevision(n=>n+1);}
  catch(err){setMessage(err.message);}finally{setSaving(false);}
 };
 return <AdminLayout><style>{`
 .mt-admin { color:#18322f; }
 .mt-admin * { box-sizing:border-box; }
 .mt-admin h1 { font:400 clamp(28px,4vw,40px)/1.3 Cinzel,Georgia,serif; margin:0; }
 .mt-admin h2 { font:400 24px/1.4 Georgia,serif; margin:0 0 20px; }
 .mt-admin .mt-layout { display:grid; grid-template-columns:minmax(280px,390px) minmax(0,1fr); gap:26px; margin-top:26px; align-items:start; }
 .mt-admin .mt-panel { background:white; border:1px solid #dfd3bc; border-radius:14px; padding:24px; min-width:0; }
 .mt-admin label { display:block; font-size:14px; margin-bottom:7px; }
 .mt-admin input:not([type=checkbox]),.mt-admin textarea { display:block; width:100%; padding:11px 12px; border:1px solid #ccc; border-radius:8px; font:14px/1.6 Arial,sans-serif; background:white; }
 .mt-admin .mt-field { margin-bottom:18px; }
 .mt-admin .mt-button { border:1px solid #18322f; background:#18322f; color:white; padding:12px 18px; border-radius:9px; cursor:pointer; min-height:44px; font-size:13px; }
 .mt-admin .mt-button:disabled { opacity:.6; cursor:wait; }
 .mt-admin .mt-secondary { background:white; color:#18322f; }
 .mt-admin .mt-actions { display:flex; flex-wrap:wrap; gap:10px; }
 .mt-admin .mt-help { font-size:12px; line-height:1.8; color:#666; margin-top:8px; }
 .mt-admin .mt-row { display:grid; grid-template-columns:70px minmax(0,1fr) auto; gap:16px; align-items:center; padding:18px 0; border-bottom:1px solid #eee; }
 .mt-admin .mt-row:last-child { border-bottom:0; }
 .mt-admin .mt-row img { width:70px; height:70px; object-fit:cover; border-radius:8px; }
 .mt-admin .mt-placeholder { width:70px; height:70px; display:grid; place-items:center; border-radius:8px; background:#f2eadc; font-size:12px; }
 .mt-admin .mt-row p { font-size:12px; line-height:1.7; color:#666; overflow-wrap:anywhere; margin:4px 0; }
 .mt-admin .mt-row strong { font-size:15px; overflow-wrap:anywhere; }
 .mt-admin .mt-message { padding:14px; border:1px solid #c8a45d; background:#fff9ec; border-radius:8px; margin-top:18px; font-size:14px; line-height:1.7; }
 .mt-admin button:focus-visible,.mt-admin input:focus-visible,.mt-admin textarea:focus-visible { outline:3px solid #c8a45d; outline-offset:3px; }
 @media(max-width:1100px){.mt-admin .mt-layout {grid-template-columns:minmax(0,1fr);}}
 @media(max-width:500px){.mt-admin .mt-panel{padding:18px;}.mt-admin .mt-row{grid-template-columns:55px minmax(0,1fr);gap:12px;}.mt-admin .mt-row img,.mt-admin .mt-placeholder{width:55px;height:55px;}.mt-admin .mt-row .mt-button{grid-column:2;justify-self:start;}}
 `}</style><div className="mt-admin"><h1>Mani Types</h1><p className="mt-help">Mani is the category. Plain Mani, Spot Mani, Nakshi Mani and your other designs are its types.</p>
 {message&&<p className="mt-message" role="status">{message}</p>}
 <div className="mt-layout"><form className="mt-panel" onSubmit={submit}><h2>{editing?"Edit Mani Type":"Add Mani Type"}</h2>
 <div className="mt-field"><label htmlFor="mt-name">Type name</label><input ref={nameInput} id="mt-name" required maxLength={120} value={form.name} onChange={e=>{const value=e.target.value;setForm(current=>({...current,name:value,...(!editing?{slug:value.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}: {})}));}} placeholder="Plain Mani" /></div>
 <div className="mt-field"><label htmlFor="mt-slug">Slug</label><input id="mt-slug" required maxLength={140} pattern="[a-z0-9]+(-[a-z0-9]+)*" value={form.slug} onChange={e=>change("slug",e.target.value)} placeholder="plain-mani" /><p className="mt-help">The link name. Use lowercase letters, numbers and hyphens.</p></div>
 <div className="mt-field"><label htmlFor="mt-description">Description</label><textarea id="mt-description" rows={3} maxLength={10000} value={form.description} onChange={e=>change("description",e.target.value)} /></div>
 <div className="mt-field"><label htmlFor="mt-image">Type cover photo</label><input ref={fileInput} id="mt-image" type="file" accept="image/jpeg,image/png,image/webp" onChange={e=>setFile(e.target.files?.[0]||null)} /><p className="mt-help">JPG, PNG or WebP, up to 8 MB. Your existing photo is kept unless you choose another.</p>{editing?.image_url&&<img src={editing.image_url} alt={editing.name} width="90" height="90" style={{objectFit:"cover",borderRadius:8,marginTop:12}} />}</div>
 <div className="mt-field"><label htmlFor="mt-order">Display order</label><input id="mt-order" type="number" min="0" max="1000000" step="1" required value={form.display_order} onChange={e=>change("display_order",e.target.value)} /></div>
 <div className="mt-field"><label htmlFor="mt-active" style={{display:"flex",alignItems:"center",gap:10}}><input id="mt-active" type="checkbox" checked={form.status} onChange={e=>change("status",e.target.checked)} />Active on website</label><p className="mt-help">Uncheck to hide this type and its products from The World of Mani. Products are retained.</p></div>
 <div className="mt-actions"><button className="mt-button" type="submit" disabled={saving}>{saving?"Saving...":editing?"Save Changes":"Add Mani Type"}</button>{editing&&<button className="mt-button mt-secondary" type="button" onClick={reset} disabled={saving}>Cancel Edit</button>}</div></form>
 <section className="mt-panel" aria-labelledby="mt-list"><h2 id="mt-list">Your Mani Types</h2>{loading?<p role="status">Loading types...</p>:error?<div role="alert"><p className="mt-help">{error}</p><button type="button" className="mt-button mt-secondary" onClick={()=>{setLoading(true);setRevision(n=>n+1);}}>Try Again</button></div>:rows.length?rows.map(row=><article className="mt-row" key={row.id}>{row.image_url?<img src={row.image_url} alt={row.name} />:<div className="mt-placeholder">Photo</div>}<div><strong>{row.name}</strong><p>{row.slug}</p><p>{enabled(row.status)?"Active":"Hidden"} &middot; {row.product_count||0} products &middot; Order {row.display_order}</p></div><button className="mt-button mt-secondary" type="button" onClick={()=>edit(row)}>Edit</button></article>):<p className="mt-help">No types yet. Add your first Mani type using the form.</p>}</section></div></div></AdminLayout>;
}
