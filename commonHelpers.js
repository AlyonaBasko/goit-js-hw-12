import{a as y,S as E,i as C}from"./assets/vendor-09d7c26e.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const L="43249978-ed8444d52eae2c923645cb9a6";async function u(t,o=1,r=15){const n=new URLSearchParams({key:L,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:r});try{return(await y.get(`https://pixabay.com/api/?${n}`)).data}catch(e){throw console.error("Error searching images:",e),e}}function p(t){console.log(t);const o=document.getElementById("gallery");if(t.length===0){I();return}const r=new E(".image-card a");t.forEach(n=>{const e=w(n);o.appendChild(e)}),r.refresh()}function w(t){const o=document.createElement("div");o.classList.add("image-card");const r=document.createElement("a");r.href=t.largeImageURL;const n=document.createElement("img");n.src=t.webformatURL,n.alt=t.tags;const e=document.createElement("div");e.classList.add("details");const s=i("Likes:",t.likes),a=i("Views:",t.views),h=i("Comments:",t.comments),f=i("Downloads:",t.downloads);return r.appendChild(n),o.appendChild(r),e.appendChild(s),e.appendChild(a),e.appendChild(h),e.appendChild(f),o.appendChild(e),o}function i(t,o){const r=document.createElement("div");r.classList.add("detail");const n=document.createElement("div");n.classList.add("detail-label"),n.textContent=t;const e=document.createElement("div");return e.classList.add("detail-value"),e.textContent=o,r.appendChild(n),r.appendChild(e),r}function I(){C.error({title:"Sorry!",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}const b=document.getElementById("search-form"),l=document.getElementById("load-more-btn"),d=document.getElementById("loader"),v=document.getElementById("end-of-results-message");let c=1,g="",m=0;async function x(){try{c++;const t=await u(g,c);if(!t){console.error("Error loading next images: response is undefined");return}m=t.totalHits;const o=t.hits;p(o),gallery.childElementCount>=m&&(l.style.display="none",v.style.display="block")}catch(t){console.error("Error loading next images:",t)}}l.addEventListener("click",x);b.addEventListener("submit",async function(t){t.preventDefault();const r=document.getElementById("search-input").value.trim();if(r===""){iziToast.warning({title:"Warning!",message:"Please enter a search query",position:"topCenter"});return}c=1,g=r,d.style.display="block";try{const n=await u(r,c);if(!n){console.error("Error searching images: response is undefined");return}const e=n.hits;p(e),l.style.display=e.length===15?"block":"none"}catch(n){console.error("Error searching and rendering images:",n)}finally{d.style.display="none"}});
//# sourceMappingURL=commonHelpers.js.map
