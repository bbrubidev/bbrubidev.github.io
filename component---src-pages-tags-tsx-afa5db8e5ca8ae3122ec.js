(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{JYtQ:function(e,t,n){},"l/wD":function(e,t,n){},uP4m:function(e,t,n){"use strict";var a=n("KQm4"),r=n("FdF9"),l=n("Wbzz"),u=n("LvDl");n("l/wD");t.a=function(e){var t=e.posts,n=Object(r.useState)(10),o=n[0],i=n[1],c=Object(r.useState)([]),s=c[0],f=c[1],d=Object(r.useMemo)((function(){return t.sort((function(e,t){var n=e.node.frontmatter,a=t.node.frontmatter,r=new Date(n.update.includes("0001")?n.date:n.update),l=new Date(a.update.includes("0001")?a.date:a.update);return r<l?1:r>l?-1:0})),t}),[t]),m=Object(r.useCallback)(Object(u.throttle)((function(){window.outerHeight>document.querySelector(".post-list").getBoundingClientRect().bottom&&i((function(e){return e>=d.length?e:e+10}))}),250),[d]),p=Object(r.useCallback)((function(e){var t=e.map((function(e){var t=e.node,n=t.excerpt,a=t.fields,u=t.frontmatter,o=a.slug,i=u.date,c=u.title,s=u.tags,f=u.update;1===Number(f.split(",")[1])&&(f=null);var d=s.map((function(e){if("undefined"!==e)return r.createElement("div",{key:o+"-"+e,className:"tag"},r.createElement("span",null,r.createElement(l.Link,{to:"/tags#"+e},"#"+e)))}));return r.createElement("li",{key:o,className:"post"},r.createElement("article",null,r.createElement("h2",{className:"title"},r.createElement(l.Link,{to:o},c)),r.createElement("div",{className:"info"},r.createElement("div",{className:"date-wrap"},r.createElement("span",{className:"date"},i),f?r.createElement("span",{className:"update"}," ","(Updated: "+f+")"):null),s.length&&"undefined"!==s[0]?r.createElement("span",{className:"info-dot"},"·"):null,r.createElement("ul",{className:"tag-list"},d)),r.createElement("span",{className:"excerpt"},r.createElement(l.Link,{to:o},n))))}));f((function(e){return[].concat(Object(a.a)(e),Object(a.a)(t))}))}),[]);return Object(r.useEffect)((function(){o>0&&10!==o&&p(d.slice(s.length,o))}),[o]),Object(r.useEffect)((function(){return s.length&&f([]),i((function(e){return 10===e&&p(d.slice(0,10)),10})),window.addEventListener("scroll",m),function(){window.removeEventListener("scroll",m)}}),[d]),r.createElement("div",{className:"post-list"},r.createElement("ul",null,s))}},xSjX:function(e,t,n){"use strict";n.r(t),n.d(t,"pageQuery",(function(){return c}));var a=n("FdF9"),r=n("VXBa"),l=n("H8eV"),u=(n("JYtQ"),n("uP4m"));function o(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return i(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return i(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var a=0;return function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(n=e[Symbol.iterator]()).next.bind(n)}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var c="127053785";t.default=function(e){var t=e.data.allMarkdownRemark.group,n=Object(a.useState)(0),i=n[0],c=n[1],s=Object(a.useState)(),f=s[0],d=s[1],m=Object(a.useState)([]),p=m[0],b=m[1];t.sort((function(e,t){var n=e.fieldValue.toLocaleLowerCase(),a=t.fieldValue.toLocaleLowerCase();return n<a?-1:a<n?1:0}));var v=t.map((function(e){var t;return a.createElement("li",{key:e.fieldValue},a.createElement("span",{className:"tag-text",style:{fontSize:"undefined"!==e.fieldValue?(t=Math.round(50/(i/e.totalCount)).toString(),t.length<=1&&(t="0"+t),Number(t)/100+.9+"rem"):"0.9rem",opacity:e.fieldValue===f?"0.9":"0.5",fontWeight:e.fieldValue===f?"bold":"normal"},onClick:function(){d(e.fieldValue)}},a.createElement("a",{href:"#"+e.fieldValue},e.fieldValue)))})),g=Object(a.useCallback)((function(){return t.filter((function(e){return e.fieldValue===f})).length?t.filter((function(e){return e.fieldValue===f}))[0].edges:t.filter((function(e){return"undefined"===e.fieldValue})).length?t.filter((function(e){return"undefined"===e.fieldValue}))[0].edges:[]}),[f]);return Object(a.useEffect)((function(){var e;d((null===(e=location)||void 0===e?void 0:e.hash)?location.hash.split("#")[1]:"undefined");for(var n,a=0,r=o(t);!(n=r()).done;){var l=n.value;"undefined"!==l.fieldValue&&l.totalCount>a&&(a=l.totalCount)}c(a)}),[]),Object(a.useEffect)((function(){f&&b(g())}),[f]),a.createElement(r.a,null,a.createElement(l.a,{title:"Tags"}),a.createElement("div",{id:"tags"},a.createElement("div",{className:"tag-list-wrap"},a.createElement("ul",null,v)),a.createElement(u.a,{posts:p.length?p:[]})))}}}]);
//# sourceMappingURL=component---src-pages-tags-tsx-afa5db8e5ca8ae3122ec.js.map