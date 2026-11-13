import{u as ue,r as i,b as pe,j as e,C as me,L as M,d as he,G as ge}from"./index-NRokkdJn.js";import{P as ye,g as X,a as xe,b as fe,C as Pe,c as be,d as _e,m as D,i as Se,p as we}from"./LanguagePanelProgress-Cun_wevs.js";import{g as ke}from"./lessonContent-BIT4wYO7.js";import"./square-Bb86kPPJ.js";import"./check-BHP4gTIJ.js";import"./save-1odb0pDW.js";import"./circle-check-BfkoUJMf.js";import"./lightbulb-B_RNJt4X.js";import"./file-search-BwZaGQYi.js";const A=[{id:"grid-movement",title:{uz:"Katakli xaritada harakat",en:"Grid movement and bounds"},summary:{uz:"O‘yinchi koordinatasini xarita chegarasida saqlang.",en:"Keep player coordinates inside a bounded game grid."},code:`width, height = 5, 4
player = {"x": 1, "y": 1}

def move(dx, dy):
    player["x"] = min(width - 1, max(0, player["x"] + dx))
    player["y"] = min(height - 1, max(0, player["y"] + dy))

move(2, 1)
move(8, 0)  # Chegaramizdan tashqariga chiqmaydi
print(player["x"], player["y"])`,expectedOutput:"4 2"},{id:"health-damage",title:{uz:"Hayot va zararni hisoblash",en:"Health and damage"},summary:{uz:"Salomatlikni noldan pastga tushirmasdan yangilang.",en:"Update health without allowing it to fall below zero."},code:`player_health = 35
enemy_health = 12
player_health = max(0, player_health - 18)
enemy_health = max(0, enemy_health - 20)
print(player_health)
print(enemy_health)`,expectedOutput:`17
0`},{id:"aabb-collision",title:{uz:"To‘rtburchak to‘qnashuvi",en:"Rectangle collision"},summary:{uz:"Ikki o‘yin obyektining chegaralari kesishishini tekshiring.",en:"Check whether two game-object rectangles overlap."},code:`def overlaps(a, b):
    return (a["x"] < b["x"] + b["w"] and
            a["x"] + a["w"] > b["x"] and
            a["y"] < b["y"] + b["h"] and
            a["y"] + a["h"] > b["y"])

player = {"x": 1, "y": 1, "w": 2, "h": 2}
near_coin = {"x": 2, "y": 2, "w": 1, "h": 1}
far_coin = {"x": 8, "y": 8, "w": 1, "h": 1}
print(overlaps(player, near_coin))
print(overlaps(player, far_coin))`,expectedOutput:`True
False`},{id:"cooldown",title:{uz:"Qobiliyat sovish vaqti",en:"Ability cooldown"},summary:{uz:"Har bir yangilash qadamida qolgan vaqtni kamaytiring.",en:"Reduce the remaining cooldown on each update step."},code:`remaining = 3.0
delta_time = 1.25
for _ in range(3):
    remaining = max(0.0, remaining - delta_time)
    print(f"{remaining:.2f}")

can_use_ability = remaining == 0.0
print(can_use_ability)`,expectedOutput:`1.75
0.50
0.00
True`},{id:"turn-based-combat",title:{uz:"Navbatma-navbat jang",en:"Turn-based combat"},summary:{uz:"Cheklangan hujumlar bilan dushman holatini yangilang.",en:"Update an enemy state with a finite number of attacks."},code:`enemy_health = 15
player_attack = 7
while enemy_health > 0:
    enemy_health = max(0, enemy_health - player_attack)
    print(enemy_health)`,expectedOutput:`8
1
0`}],u="kiberustoz-python-panel-v1",Ne="allow-scripts",$="https://cdn.jsdelivr.net/pyodide/v0.27.7/full/",W=3e4,Y=4e3,Le=8e3,Ee=8e3,ve=6e4,Te=String.raw`
import contextlib
import io
import json
import sys
import traceback


def __cyber_run(source, stdin_text):
    out = io.StringIO()
    err = io.StringIO()
    previous_stdin = sys.stdin
    namespace = {"__name__": "__main__"}
    source = str(source)
    stdin_text = str(stdin_text)
    try:
        compiled = compile(source, "<learner>", "exec")
    except SyntaxError as exc:
        return json.dumps({
            "ok": False,
            "category": "syntax",
            "message": f"{type(exc).__name__}: {exc.msg}",
            "line": exc.lineno,
            "stdout": "",
            "stderr": "",
        }, ensure_ascii=False)

    try:
        sys.stdin = io.StringIO(stdin_text)
        with contextlib.redirect_stdout(out), contextlib.redirect_stderr(err):
            exec(compiled, namespace, namespace)
        return json.dumps({
            "ok": True,
            "category": "success",
            "message": "Python code finished successfully.",
            "line": None,
            "stdout": out.getvalue(),
            "stderr": err.getvalue(),
        }, ensure_ascii=False)
    except Exception as exc:
        frames = traceback.extract_tb(exc.__traceback__)
        user_frame = next((frame for frame in reversed(frames) if frame.filename == "<learner>"), None)
        return json.dumps({
            "ok": False,
            "category": "runtime",
            "message": f"{type(exc).__name__}: {exc}",
            "line": user_frame.lineno if user_frame else None,
            "stdout": out.getvalue(),
            "stderr": err.getvalue(),
        }, ensure_ascii=False)
    finally:
        sys.stdin = previous_stdin
`,je=`
importScripts(${JSON.stringify(`${$}pyodide.js`)});
const CHANNEL = ${JSON.stringify(u)};
const BRIDGE = ${JSON.stringify(Te)};
const MAX_SOURCE_LENGTH = ${W};
const MAX_INPUT_LENGTH = ${Y};
const MAX_OUTPUT_LENGTH = ${Le};
let pyodide = null;

function send(type, extra = {}) {
  self.postMessage({ channel: CHANNEL, type, ...extra });
}

function clipped(value) {
  const text = String(value || "");
  return text.length > MAX_OUTPUT_LENGTH ? text.slice(0, MAX_OUTPUT_LENGTH) + "\\n… output truncated …" : text;
}

self.onmessage = async (event) => {
  const data = event.data || {};
  if (data.channel !== CHANNEL || data.type !== "run") return;
  try {
    const source = typeof data.code === "string" ? data.code : "";
    const stdin = typeof data.stdin === "string" ? data.stdin : "";
    if (source.length > MAX_SOURCE_LENGTH) throw new Error("Code is longer than the safety limit.");
    if (stdin.length > MAX_INPUT_LENGTH) throw new Error("Sample input is longer than the safety limit.");
    send("status", { status: "runtime-loading" });
    pyodide = await loadPyodide({ indexURL: ${JSON.stringify($)} });
    await pyodide.runPythonAsync(BRIDGE);
    pyodide.globals.set("__cyber_source", source);
    pyodide.globals.set("__cyber_stdin", stdin);
    send("status", { status: "running" });
    const resultText = pyodide.runPython("__cyber_run(__cyber_source, __cyber_stdin)");
    const result = JSON.parse(resultText);
    result.stdout = clipped(result.stdout);
    result.stderr = clipped(result.stderr);
    result.message = String(result.message || "Python runtime error").slice(0, 700);
    send("result", { result });
  } catch (error) {
    send("runtime-error", { message: error instanceof Error ? error.message.slice(0, 700) : "Python runtime error" });
  }
};
`,Ie=`
(() => {
  const CHANNEL = ${JSON.stringify(u)};
  const workerSource = ${JSON.stringify(je)};
  const status = document.getElementById("status");
  let worker = null;
  let workerUrl = null;
  let runtimeTimeout = 0;
  let executionTimeout = 0;

  function send(type, extra = {}) {
    window.parent.postMessage({ channel: CHANNEL, type, ...extra }, "*");
  }

  function cleanup() {
    window.clearTimeout(runtimeTimeout);
    window.clearTimeout(executionTimeout);
    if (worker) worker.terminate();
    worker = null;
    if (workerUrl) URL.revokeObjectURL(workerUrl);
    workerUrl = null;
  }

  function fail(message, category = "runtime") {
    cleanup();
    status.textContent = String(message).slice(0, 700);
    send("result", { result: { ok: false, category, message: String(message).slice(0, 700), line: null, stdout: "", stderr: "" } });
  }

  window.addEventListener("message", (event) => {
    if (event.source !== window.parent || !event.data || event.data.channel !== CHANNEL) return;
    const data = event.data;
    if (data.type === "stop") {
      cleanup();
      status.textContent = "Stopped";
      send("status", { status: "stopped" });
      return;
    }
    if (data.type !== "run") return;

    cleanup();
    const code = typeof data.code === "string" ? data.code : "";
    const stdin = typeof data.stdin === "string" ? data.stdin : "";
    if (code.length > ${W} || stdin.length > ${Y}) {
      fail("Code or sample input is longer than the safety limit.", "limit");
      return;
    }

    workerUrl = URL.createObjectURL(new Blob([workerSource], { type: "text/javascript" }));
    worker = new Worker(workerUrl);
    worker.onerror = (event) => fail(String(event.message || "Python runtime could not start"));
    worker.onmessage = (messageEvent) => {
      const message = messageEvent.data || {};
      if (message.channel !== CHANNEL) return;
      if (message.type === "status") {
        status.textContent = String(message.status || "Working");
        if (message.status === "running") {
          window.clearTimeout(runtimeTimeout);
          executionTimeout = window.setTimeout(() => fail("Python code exceeded the 8-second execution limit. Stop it or simplify the loop."), ${Ee});
        }
        send("status", { status: message.status });
      } else if (message.type === "result") {
        window.clearTimeout(executionTimeout);
        cleanup();
        send("result", { result: message.result });
      } else if (message.type === "runtime-error") {
        fail(String(message.message || "Python runtime error"));
      }
    };
    status.textContent = "Loading Python";
    runtimeTimeout = window.setTimeout(() => fail("Python runtime did not load. Check your connection and try again."), ${ve});
    worker.postMessage({ channel: CHANNEL, type: "run", code, stdin });
    send("status", { status: "loading" });
  });

  window.addEventListener("pagehide", cleanup);
  status.textContent = "Isolated Python runner ready";
  send("ready");
})();
`;function Ce(){return`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' 'wasm-unsafe-eval' https://cdn.jsdelivr.net; connect-src https://cdn.jsdelivr.net; worker-src blob:; style-src 'unsafe-inline'; img-src data: blob:; object-src 'none'; base-uri 'none'; form-action 'none'">
<style>html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#081115;color:#9bb3af;font:12px ui-monospace,monospace}#status{padding:8px}</style>
</head>
<body><div id="status" role="status">Preparing isolated Python runtime…</div><script>${Ie}<\/script></body>
</html>`}function F(a){const n=a.match(/^For input ([^:]+):\s*([\s\S]*)$/),s=n?.[2]??a,y=n?.[1]??"",o=!!s.trim()&&!/\(current folder name\)|\b20\d{2}-\d{2}-\d{2}\b/i.test(s);return{expected:s,sampleInput:y,checkable:o}}const k=pe.find(a=>a.slug==="python"),f=k.lessons.uz.map((a,n)=>`python-lesson-${n+1}`),Oe=Ce(),U="kiberustoz-python-panel-draft-v1",J=3e4;function K(a,n){return ke(k,a,n)}function Q(a,n){const s=K(a,n),y=F(s.expectedOutput??"");return{code:s.code??(n==="uz"?'print("Salom, Python!")':'print("Hello, Python!")'),stdin:y.sampleInput,gameExampleId:null,securityLabSelection:null}}function B(a,n){const s=Q(a,n);try{const y=localStorage.getItem(`${U}-${a}`);if(!y)return s;const o=JSON.parse(y);return{code:typeof o.code=="string"&&o.code.length<=J?o.code:s.code,stdin:typeof o.stdin=="string"&&o.stdin.length<=4e3?o.stdin:s.stdin,gameExampleId:typeof o.gameExampleId=="string"&&A.some(p=>p.id===o.gameExampleId)?o.gameExampleId:null,securityLabSelection:Se(o.securityLabSelection,"python")?o.securityLabSelection:null}}catch{return s}}function O(a){return a.replace(/\r\n/g,`
`).trim()}function Ae(){try{return typeof window>"u"?[]:we(localStorage.getItem(X("python")),f)}catch{return[]}}function Be(){const{language:a}=ue(),n=a==="uz",[s,y]=i.useState(0),o=i.useMemo(()=>K(s,a),[s,a]),p=i.useMemo(()=>F(o.expectedOutput??""),[o.expectedOutput]),[E]=i.useState(()=>B(0,"uz")),[P,b]=i.useState(()=>E.code),[N,L]=i.useState(()=>E.stdin),[_,v]=i.useState(()=>E.gameExampleId??null),[S,T]=i.useState(()=>E.securityLabSelection??null),[j,G]=i.useState(Ae),V=A.find(t=>t.id===_),Z=ye.find(t=>t.id===S?.slice(0,S.lastIndexOf(":"))),[H,ee]=i.useState(!1),[te,c]=i.useState("idle"),[I,m]=i.useState(null),[ne,h]=i.useState(!1),g=i.useRef(null),x=i.useRef(null),z=i.useRef({expected:p.expected,checkable:p.checkable,sampleInput:p.sampleInput,lessonId:f[s]});z.current={expected:p.expected,checkable:p.checkable,sampleInput:p.sampleInput,lessonId:f[s]},i.useEffect(()=>{const t=B(s,a);b(t.code),L(t.stdin),v(t.gameExampleId??null),T(t.securityLabSelection??null),c("idle"),m(null),h(!1)},[s]),i.useEffect(()=>{try{localStorage.setItem(`${U}-${s}`,JSON.stringify({code:P,stdin:N,gameExampleId:_,securityLabSelection:S}))}catch{}},[s,P,N,_,S]),i.useEffect(()=>{try{localStorage.setItem(X("python"),JSON.stringify({version:1,completed:j}))}catch{}},[j]),i.useEffect(()=>{const t=r=>{if(!(r.source!==g.current?.contentWindow||!r.data||r.data.channel!==u)){if(r.data.type==="ready")ee(!0),c("ready");else if(r.data.type==="status")r.data.status==="runtime-loading"?c("runtime-loading"):r.data.status==="running"?c("running"):r.data.status==="stopped"&&c("stopped");else if(r.data.type==="result"&&r.data.result){const l=r.data.result,d=x.current;x.current=null;const C=String(l.category??"runtime"),R=!!(d&&l.ok===!0&&C==="success"&&d.checkable&&(O(String(l.stdout??""))===O(d.expected)||d.sampleInput&&O(String(l.stdout??"")).endsWith(O(d.expected))));R&&d&&G(de=>D(de,d.lessonId,f));const w={category:C,message:d&&l.ok===!0&&C==="success"&&!R?n?"Natija darsdagi kutilgan javobga mos emas. Kodni tekshiring.":"The output does not match this lesson's expected result. Check your code.":String(l.message??(n?"Python runtime xatosi.":"Python runtime error.")).slice(0,700),line:Number.isInteger(l.line)?l.line:null,stdout:String(l.stdout??"").slice(0,8e3),stderr:String(l.stderr??"").slice(0,8e3),checked:!!(d&&l.ok===!0&&C==="success"&&d.checkable),matched:R};m(w),c(w.category==="syntax"||w.category==="runtime"||w.category==="limit"?"error":w.checked&&!w.matched?"wrong":"success")}}};return window.addEventListener("message",t),()=>{window.removeEventListener("message",t),g.current?.contentWindow?.postMessage({channel:u,type:"stop"},"*")}},[n]);function ae(t){H&&(x.current=t?{...z.current}:null,m(null),c("loading"),g.current?.contentWindow?.postMessage({channel:u,type:"run",code:P,stdin:N},"*"))}function se(t){const r=f[t];r&&G(l=>D(l,r,f))}function oe(){x.current=null,g.current?.contentWindow?.postMessage({channel:u,type:"stop"},"*"),c("stopped"),m({category:"stopped",message:n?"Python bajarilishi to‘xtatildi.":"Python execution was stopped.",line:null,stdout:""})}function re(){x.current=null,g.current?.contentWindow?.postMessage({channel:u,type:"stop"},"*");const t=Q(s,a);b(t.code),L(t.stdin),v(null),T(null),c("idle"),m(null),h(!1)}function q(t){!Number.isInteger(t)||t<0||t>=k.lessons.uz.length||(x.current=null,g.current?.contentWindow?.postMessage({channel:u,type:"stop"},"*"),y(t))}function ie(t){const r=A.find(l=>l.id===t);r&&(x.current=null,g.current?.contentWindow?.postMessage({channel:u,type:"stop"},"*"),b(r.code),L(""),v(r.id),T(null),c("ready"),m(null),h(!1))}function le(t,r,l){x.current=null,g.current?.contentWindow?.postMessage({channel:u,type:"stop"},"*"),b(l),L(""),v(null),T(`${t}:${r}`),c("ready"),m(null),h(!1)}function ce(){try{localStorage.setItem(`${U}-${s}`,JSON.stringify({code:P,stdin:N,gameExampleId:_,securityLabSelection:S})),h(!0),window.setTimeout(()=>h(!1),2200)}catch{m({category:"runtime",message:n?"Brauzerda saqlash o‘chiq. Kodingizni nusxalab oling.":"Browser storage is unavailable. Copy your code before leaving.",line:null,stdout:""})}}return e.jsxs("main",{"data-loc":"client/src/pages/PythonPanel.tsx:218",className:"container game-lab-wrap language-panel-wrap",children:[e.jsxs("header",{"data-loc":"client/src/pages/PythonPanel.tsx:219",className:"page-hero game-lab-hero language-panel-hero",children:[e.jsxs("div",{"data-loc":"client/src/pages/PythonPanel.tsx:220",className:"eyebrow",children:[e.jsx(me,{"data-loc":"client/src/pages/PythonPanel.tsx:220",size:14}),n?"PYTHON · UMUMIY DASTURLASH PANELI":"PYTHON · GENERAL PROGRAMMING PANEL"]}),e.jsx("h1",{"data-loc":"client/src/pages/PythonPanel.tsx:221",children:n?"Python kodini yozing va tekshiring":"Write and check Python code"}),e.jsx("p",{"data-loc":"client/src/pages/PythonPanel.tsx:222",children:n?"Asoslar, built-in funksiyalar, data structure, funksiyalar, xatolar va boshqa Python mavzularini o‘rganing. Bu mustaqil kod muhiti; Python Game Lab esa o‘yin yasash uchun alohida qoladi.":"Study fundamentals, built-ins, data structures, functions, errors and more. This is a general coding workbench; the Python Game Lab remains a separate place for game projects."}),e.jsxs("div",{"data-loc":"client/src/pages/PythonPanel.tsx:223",className:"game-lab-path-links",children:[e.jsx(M,{"data-loc":"client/src/pages/PythonPanel.tsx:223",href:"/courses/python",children:n?"To‘liq Python kursi":"Full Python course"}),e.jsx(M,{"data-loc":"client/src/pages/PythonPanel.tsx:223",href:"/lua",children:"Lua Panel"}),e.jsx(M,{"data-loc":"client/src/pages/PythonPanel.tsx:223",href:"/games",children:"Python Game Lab"})]})]}),e.jsxs("section",{"data-loc":"client/src/pages/PythonPanel.tsx:226",className:"language-panel-toolbar","aria-label":n?"Python darsini tanlash":"Select a Python lesson",children:[e.jsxs("label",{"data-loc":"client/src/pages/PythonPanel.tsx:227",htmlFor:"python-lesson-select",children:[e.jsx("span",{"data-loc":"client/src/pages/PythonPanel.tsx:227",children:n?"DARSNI TANLANG":"SELECT A LESSON"}),e.jsx("select",{"data-loc":"client/src/pages/PythonPanel.tsx:228",id:"python-lesson-select",value:s,onChange:t=>q(Number(t.target.value)),children:k.lessons[a].map((t,r)=>e.jsxs("option",{"data-loc":"client/src/pages/PythonPanel.tsx:228",value:r,children:[String(r+1).padStart(2,"0")," · ",t]},`${r}-${t}`))})]}),e.jsxs("span",{"data-loc":"client/src/pages/PythonPanel.tsx:230",className:"language-panel-count",children:[s+1," / ",k.lessons[a].length," · Python 3"]})]}),e.jsx(xe,{"data-loc":"client/src/pages/PythonPanel.tsx:233",language:a,title:n?"Python mashqlari":"Python practice",completedIds:j,lessonIds:f}),e.jsxs("section",{"data-loc":"client/src/pages/PythonPanel.tsx:235",className:"language-game-examples","aria-labelledby":"python-game-examples-title",children:[e.jsxs("div",{"data-loc":"client/src/pages/PythonPanel.tsx:236",className:"language-game-examples-heading",children:[e.jsxs("div",{"data-loc":"client/src/pages/PythonPanel.tsx:236",children:[e.jsx("span",{"data-loc":"client/src/pages/PythonPanel.tsx:236",children:n?"AMALIY O‘YIN MANTIQI":"PRACTICAL GAME LOGIC"}),e.jsx("h2",{"data-loc":"client/src/pages/PythonPanel.tsx:236",id:"python-game-examples-title",children:n?"Python o‘yin mantiqi namunalari":"Python game-logic examples"})]}),e.jsx("p",{"data-loc":"client/src/pages/PythonPanel.tsx:236",children:n?"Namuna muharrirga yuklangach, kod avtomatik bajarilmaydi. Tekshirib, Run tugmasini o‘zingiz bosing.":"Loading a sample never runs it. Review the code and press Run yourself."})]}),e.jsx("div",{"data-loc":"client/src/pages/PythonPanel.tsx:237",className:"language-game-examples-grid",children:A.map(t=>e.jsxs("article",{"data-loc":"client/src/pages/PythonPanel.tsx:238",className:"language-game-example-card",children:[e.jsx("h3",{"data-loc":"client/src/pages/PythonPanel.tsx:239",children:t.title[a]}),e.jsx("p",{"data-loc":"client/src/pages/PythonPanel.tsx:239",children:t.summary[a]}),e.jsxs("details",{"data-loc":"client/src/pages/PythonPanel.tsx:240",children:[e.jsx("summary",{"data-loc":"client/src/pages/PythonPanel.tsx:240",children:n?"Kodni ko‘rish":"View code"}),e.jsx("pre",{"data-loc":"client/src/pages/PythonPanel.tsx:240",children:e.jsx("code",{"data-loc":"client/src/pages/PythonPanel.tsx:240",children:t.code})}),e.jsxs("span",{"data-loc":"client/src/pages/PythonPanel.tsx:240",children:[n?"Kutilgan chiqish":"Expected output",": ",e.jsx("code",{"data-loc":"client/src/pages/PythonPanel.tsx:240",children:t.expectedOutput})]})]}),e.jsx("button",{"data-loc":"client/src/pages/PythonPanel.tsx:241",type:"button",className:"button button-outline",onClick:()=>ie(t.id),children:_===t.id?n?"Tanlangan namuna":"Example loaded":n?"Muharrirga yuklash":"Load into editor"})]},t.id))})]}),e.jsx(fe,{"data-loc":"client/src/pages/PythonPanel.tsx:246",panel:"python",language:a,onLoadCode:le}),e.jsxs("div",{"data-loc":"client/src/pages/PythonPanel.tsx:248",className:"language-panel-grid",children:[e.jsx(Pe,{"data-loc":"client/src/pages/PythonPanel.tsx:249",language:a,title:o.title,count:s+1,objective:o.objective,explanation:o.explanation,steps:o.steps,exercise:o.exercise,question:o.checkQuestion,options:o.options,answer:o.answer,feedback:o.feedback,completed:j.includes(f[s]),onComplete:()=>se(s),onNext:s<k.lessons.uz.length-1?()=>q(s+1):void 0},`${s}-${a}`),e.jsxs("div",{"data-loc":"client/src/pages/PythonPanel.tsx:250",className:"language-panel-workbench",children:[e.jsx(be,{"data-loc":"client/src/pages/PythonPanel.tsx:251",language:a,filename:"main.py",runtimeName:"Python 3 · Pyodide 0.27.7",code:P,maxCodeLength:J,status:te,result:I,onCodeChange:t=>{b(t),h(!1)},onRun:ae,onStop:oe,onReset:re,onSave:ce,saveLabel:ne?n?"Saqlandi":"Saved":n?"Saqlash":"Save draft",checkable:p.checkable&&_===null&&S===null,inputValue:N,onInputChange:t=>{L(t),h(!1)},inputLabel:n?"input() uchun namuna qiymat":"Sample value for input()",securityNote:n?"Run faqat shu brauzerda bajariladi. Kod AI’ga faqat yordam so‘raganingizda yuboriladi va saqlanmaydi.":"Run executes in this browser. Code is sent to the AI only when you ask for help and is not stored.",frameReady:H}),e.jsx(_e,{"data-loc":"client/src/pages/PythonPanel.tsx:252",panel:"python",language:a,lessonTitle:Z?.title[a]??V?.title[a]??o.title,code:P,runtimeError:I&&["syntax","runtime","limit"].includes(I.category)?I.message:"",onApplyCode:t=>{b(t),h(!1),m(null)}}),e.jsx("iframe",{"data-loc":"client/src/pages/PythonPanel.tsx:253",ref:g,className:"code-panel-runtime-frame",title:n?"Ajratilgan Python bajarish muhiti":"Isolated Python execution runtime",srcDoc:Oe,sandbox:Ne,referrerPolicy:"no-referrer","aria-hidden":"true",tabIndex:-1}),e.jsxs("div",{"data-loc":"client/src/pages/PythonPanel.tsx:254",className:"language-panel-security",children:[e.jsx(he,{"data-loc":"client/src/pages/PythonPanel.tsx:254",size:17}),e.jsx("p",{"data-loc":"client/src/pages/PythonPanel.tsx:254",children:n?"Pyodide 0.27.7 Run bosilganda pin qilingan CDN’dan yuklanadi. Kod opaque-origin iframe va Worker ichida bajariladi; sayt DOM’i, sessiya, Admin/profil/API/DB yoki runtime CDN’dan boshqa tarmoqlarga kira olmaydi.":"Pyodide 0.27.7 loads from a pinned CDN on Run. Code runs in an opaque-origin iframe and Worker; it cannot access the site DOM, session, Admin/profile/APIs/database, or networks beyond the runtime CDN."})]}),e.jsxs("div",{"data-loc":"client/src/pages/PythonPanel.tsx:255",className:"language-panel-api",children:[e.jsx(ge,{"data-loc":"client/src/pages/PythonPanel.tsx:255",size:15}),e.jsx("p",{"data-loc":"client/src/pages/PythonPanel.tsx:255",children:n?"O‘yin yaratish uchun alohida Python Game Lab’dan foydalaning: unda o‘yin preview, Bike Dodge, Snake va Tetris shablonlari bor.":"Use the separate Python Game Lab for games; it has a live preview and Bike Dodge, Snake and Tetris templates."})]})]})]})]})}export{Be as default};
