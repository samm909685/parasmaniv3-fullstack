const API_BASE=(import.meta.env.VITE_API_BASE_URL||"https://api.parasmanijewelers.in/api").replace(/\/+$/,"");
async function request(path,options={}){
 const token=localStorage.getItem("parasmani_admin_token");
 const response=await fetch(`${API_BASE}${path}`,{...options,headers:{Authorization:`Bearer ${token||""}`,...options.headers}});
 let body;try{body=await response.json();}catch{throw new Error("The server did not return valid data. Check the API connection.");}
 if(!response.ok||!body.success)throw new Error(body.message||"Unable to save Mani type.");
 return body;
}
export const getManiTypes=signal=>request("/mani-types",{signal}).then(body=>body.data);
export const saveManiType=(id,form)=>request(`/mani-types${id?`/${id}`:""}`,{method:id?"PUT":"POST",body:form});
