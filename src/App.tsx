import{useState}from'react'
  interface Shadow{x:number;y:number;blur:number;spread:number;color:string;inset:boolean;opacity:number}
  const mk=():Shadow=>({x:4,y:4,blur:12,spread:0,color:"#000000",inset:false,opacity:0.25})
  const uid=()=>Math.random().toString(36).slice(2,6)
  export default function App(){
    const[shadows,setShadows]=useState<(Shadow&{id:string})[]>([{...mk(),id:uid()},{x:-4,y:-4,blur:12,spread:0,color:"#ffffff",inset:false,opacity:0.1,id:uid()}])
    const[bg,setBg]=useState("#1e293b")
    const[cp,setCp]=useState(false)
    const toCss=(s:Shadow)=>{const{r,g,b}=[0,2,4].map(i=>parseInt(s.color.slice(i+1,i+3),16));return`${s.inset?"inset ":""}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px rgba(${r},${g},${b},${s.opacity})`}
    const cssVal=shadows.map(toCss).join(",\n  ")
    const cssCode=`.element {\n  box-shadow: ${cssVal};\n}`
    const copy=()=>{navigator.clipboard.writeText(cssCode);setCp(true);setTimeout(()=>setCp(false),2000)}
    const upd=(id:string,key:keyof Shadow,val:unknown)=>setShadows(s=>s.map(x=>x.id===id?{...x,[key]:val}:x))
    return(
      <div style={{minHeight:"100vh",display:"flex",fontFamily:"Inter,system-ui,sans-serif",color:"#e2e8f0"}}>
        <div style={{width:340,borderRight:"1px solid #1e293b",padding:"1.5rem",display:"flex",flexDirection:"column",gap:"1rem",background:"#111827",overflowY:"auto",flexShrink:0}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <h1 style={{fontWeight:800,fontSize:"1.3rem",color:"#f8fafc"}}>🌑 Box Shadow</h1>
            <button onClick={()=>setShadows(s=>[...s,{...mk(),id:uid()}])} style={{padding:"0.3rem 0.75rem",background:"#0ea5e9",color:"#fff",border:"none",borderRadius:6,cursor:"pointer",fontWeight:700,fontSize:"0.8rem"}}>+ Layer</button>
          </div>
          {shadows.map((s,i)=>(
            <div key={s.id} style={{background:"#0f172a",border:"1px solid #334155",borderRadius:8,padding:"0.75rem"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.75rem"}}>
                <span style={{color:"#38bdf8",fontWeight:700,fontSize:"0.82rem"}}>Layer {i+1}</span>
                <div style={{display:"flex",gap:"0.5rem"}}>
                  <label style={{display:"flex",alignItems:"center",gap:"0.3rem",color:"#94a3b8",fontSize:"0.75rem",cursor:"pointer"}}>
                    <input type="checkbox" checked={s.inset} onChange={e=>upd(s.id,"inset",e.target.checked)} style={{accentColor:"#38bdf8"}}/>Inset
                  </label>
                  {shadows.length>1&&<button onClick={()=>setShadows(sh=>sh.filter(x=>x.id!==s.id))} style={{background:"none",border:"none",color:"#475569",cursor:"pointer",fontSize:"1rem"}}>×</button>}
                </div>
              </div>
              {[{l:"X Offset",k:"x",min:-50,max:50},{l:"Y Offset",k:"y",min:-50,max:50},{l:"Blur",k:"blur",min:0,max:100},{l:"Spread",k:"spread",min:-20,max:50}].map(({l,k,min,max})=>(
                <div key={k} style={{marginBottom:"0.5rem"}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:"0.75rem",marginBottom:"0.2rem"}}>
                    <span style={{color:"#475569"}}>{l}</span><span style={{color:"#94a3b8",fontFamily:"monospace"}}>{(s as any)[k]}px</span>
                  </div>
                  <input type="range" min={min} max={max} value={(s as any)[k]} onChange={e=>upd(s.id,k as keyof Shadow,+e.target.value)} style={{width:"100%",accentColor:"#38bdf8"}}/>
                </div>
              ))}
              <div style={{display:"flex",gap:"0.5rem",alignItems:"center"}}>
                <input type="color" value={s.color} onChange={e=>upd(s.id,"color",e.target.value)} style={{width:32,height:32,border:"none",background:"none",cursor:"pointer"}}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:"0.75rem",color:"#475569",marginBottom:"0.2rem"}}>Opacity {s.opacity}</div>
                  <input type="range" min={0} max={1} step={0.05} value={s.opacity} onChange={e=>upd(s.id,"opacity",+e.target.value)} style={{width:"100%",accentColor:"#38bdf8"}}/>
                </div>
              </div>
            </div>
          ))}
          <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
            <span style={{color:"#94a3b8",fontSize:"0.8rem"}}>Card BG:</span>
            <input type="color" value={bg} onChange={e=>setBg(e.target.value)} style={{width:32,height:32,border:"none",background:"none",cursor:"pointer"}}/>
          </div>
          <pre style={{background:"#0f172a",border:"1px solid #1e293b",borderRadius:8,padding:"0.75rem",fontSize:"0.72rem",fontFamily:"JetBrains Mono,monospace",color:"#86efac",overflowX:"auto",whiteSpace:"pre-wrap"}}>{cssCode}</pre>
          <button onClick={copy} style={{padding:"0.65rem",background:cp?"#166534":"#0ea5e9",color:"#fff",border:"none",borderRadius:8,cursor:"pointer",fontWeight:700}}>{cp?"✓ Copied!":"Copy CSS"}</button>
        </div>
        <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",background:"#0f172a"}}>
          <div style={{width:200,height:200,background:bg,borderRadius:16,boxShadow:shadows.map(toCss).join(","),transition:"box-shadow 0.2s",display:"flex",alignItems:"center",justifyContent:"center",color:"#94a3b8",fontSize:"0.85rem"}}>Preview</div>
        </div>
      </div>
    )
  }