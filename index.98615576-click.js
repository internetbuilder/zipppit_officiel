(function(){const r=document.createElement("link").relList;
if(r&&r.supports&&r.supports("modulepreload"))return;
for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};
return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=o(e);
  fetch(e.href,t)}})();function s(n){let r=0;const o=i=>{r=i,n.innerHTML=`You are real ?`};n.addEventListener("click",()=>o(r+1)),o(0)}document.querySelector("#app").innerHTML=`
  <div>
   
    <div class="card">
    <a href="https://bit.ly/zipppit-clickout" target="">
    <button id="counter" type="button"></button>
  </a>

    </div>

   
    
  </div>
`;s(document.querySelector("#counter"));
