import{a as E,S as C,i as w}from"./assets/vendor-09d7c26e.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const I="43249978-ed8444d52eae2c923645cb9a6";async function p(t,r=1,o=15){const n=new URLSearchParams({key:I,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:o});try{return(await E.get(`https://pixabay.com/api/?${n}`)).data}catch(e){throw console.error("Error searching images:",e),e}}function g(t){const r=document.getElementById("gallery");if(t.length===0){b();return}const o=new C(".image-card a");t.forEach(n=>{const e=L(n);r.appendChild(e)}),o.refresh()}function L(t){const r=document.createElement("div");r.classList.add("image-card");const o=document.createElement("a");o.href=t.largeImageURL;const n=document.createElement("img");n.src=t.webformatURL,n.alt=t.tags;const e=document.createElement("div");e.classList.add("details");const s=c("Likes:",t.likes),a=c("Views:",t.views),f=c("Comments:",t.comments),y=c("Downloads:",t.downloads);return o.appendChild(n),r.appendChild(o),e.appendChild(s),e.appendChild(a),e.appendChild(f),e.appendChild(y),r.appendChild(e),r}function c(t,r){const o=document.createElement("div");o.classList.add("detail");const n=document.createElement("div");n.classList.add("detail-label"),n.textContent=t;const e=document.createElement("div");return e.classList.add("detail-value"),e.textContent=r,o.appendChild(n),o.appendChild(e),o}function b(){w.error({title:"Sorry!",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}const v=document.getElementById("search-form"),l=document.getElementById("load-more-btn"),d=document.getElementById("loader"),B=document.getElementById("end-of-results-message");let i=1,h="",m=0,u=0;async function x(){try{i++;const t=await p(h,i);if(!t){console.error("Error loading next images: response is undefined");return}m=t.totalHits,g(t.hits),i*15>=m&&(l.style.display="none",B.style.display="block");const r=document.getElementById("gallery");r?(u=r.firstElementChild.getBoundingClientRect().height,window.scrollBy(0,u*2)):console.error('Element with id "gallery" not found')}catch(t){console.error("Error loading next images:",t)}}l.addEventListener("click",x);v.addEventListener("submit",async function(t){t.preventDefault();const o=document.getElementById("search-input").value.trim();if(o===""){iziToast.warning({title:"Warning!",message:"Please enter a search query",position:"topCenter"});return}i=1,h=o,d.style.display="block";try{const n=await p(o,i);if(!n){console.error("Error searching images: response is undefined");return}const e=n.hits;g(e),l.style.display=e.length===15?"block":"none"}catch(n){console.error("Error searching and rendering images:",n)}finally{d.style.display="none"}});
//# sourceMappingURL=commonHelpers.js.map