import{a as E,S as w,i as C}from"./assets/vendor-09d7c26e.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const I="43249978-ed8444d52eae2c923645cb9a6";async function g(t,r=1,o=15){const n=new URLSearchParams({key:I,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:o});try{return(await E.get(`https://pixabay.com/api/?${n}`)).data}catch(e){throw console.error("Error searching images:",e),e}}function h(t){const r=document.getElementById("gallery");if(t.length===0){v();return}const o=new w(".image-card a");t.forEach(n=>{const e=L(n);r.appendChild(e)}),o.refresh()}function L(t){const r=document.createElement("div");r.classList.add("image-card");const o=document.createElement("a");o.href=t.largeImageURL;const n=document.createElement("img");n.src=t.webformatURL,n.alt=t.tags;const e=document.createElement("div");e.classList.add("details");const s=l("Likes:",t.likes),i=l("Views:",t.views),y=l("Comments:",t.comments),f=l("Downloads:",t.downloads);return o.appendChild(n),r.appendChild(o),e.appendChild(s),e.appendChild(i),e.appendChild(y),e.appendChild(f),r.appendChild(e),r}function l(t,r){const o=document.createElement("div");o.classList.add("detail");const n=document.createElement("div");n.classList.add("detail-label"),n.textContent=t;const e=document.createElement("div");return e.classList.add("detail-value"),e.textContent=r,o.appendChild(n),o.appendChild(e),o}function v(){C.error({title:"Sorry!",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}const b=document.getElementById("search-form"),c=document.getElementById("load-more-btn"),d=document.getElementById("loader");let a=1,p="",u=0,m=0;async function B(){try{a++;const t=await g(p,a,15);if(!t){console.error("Error loading next images: response is undefined");return}if(u=t.totalHits,t.hits.length===0&&a===1){x(),showNoImagesMessage();return}if(h(t.hits),t.hits.length<15||a*15>=u||a>=500/15){c.style.display="none",showEndOfResultsMessage().then(()=>console.log("We're sorry, but you've reached the end of search results.")).catch(o=>console.error("Error displaying end of results message:",o));return}const r=document.getElementById("gallery");r?(m=r.firstElementChild.getBoundingClientRect().height,window.scrollBy(0,m*2)):console.error('Element with id "gallery" not found')}catch(t){console.error("Error loading next images:",t)}}function x(){const t=document.getElementById("gallery");t&&(t.innerHTML="")}c.addEventListener("click",B);b.addEventListener("submit",async function(t){t.preventDefault();const r=document.getElementById("gallery");r.innerHTML="";const n=document.getElementById("search-input").value.trim();if(n===""){iziToast.warning({title:"Warning!",message:"Please enter a search query",position:"topCenter"});return}a=1,p=n,d.style.display="block";try{const e=await g(n,a);if(!e){console.error("Error searching images: response is undefined");return}const s=e.hits;h(s),c.style.display=s.length===15?"block":"none"}catch(e){console.error("Error searching and rendering images:",e)}finally{d.style.display="none"}});
//# sourceMappingURL=commonHelpers.js.map
