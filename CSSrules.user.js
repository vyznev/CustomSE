// ==UserScript==
// @name        Custom SE styles
// @namespace   https://github.com/normalhuman/CustomSE
// @description Several rules that hide annoying features 
// @match       *://*.askubuntu.com/*
// @match       *://*.mathoverflow.net/*
// @match       *://*.serverfault.com/*
// @match       *://*.stackapps.com/*
// @match       *://*.stackexchange.com/*
// @match       *://*.stackoverflow.com/*
// @match       *://*.superuser.com/*
// @exclude     *://area51.*
// @exclude     *://discuss.area51.*
// @exclude     *://chat.*
// @grant       GM_addStyle
// @run-at      document-start
// @version     17.2.1
// ==/UserScript==

GM_addStyle('.topbar, #header, .so-header, #hireme, #explore-tags, #hot-network-questions, #newsletter-ad, #ignored-footer, .bottom-notice, .adzerk-vote  {display: none;} .icon-achievements, .icon-flag, .cite-link {  display: none !important; }  .downvoted-answer { opacity: 1 !important; } div.tagged-interesting {  background-color: #fff !important; }');

if (/^math\./.test(window.location.hostname)) {
  GM_addStyle('.result-link a:visited {color: #507070 !important;}');
}

if (/\/users\//.test(window.location.pathname)) {
  GM_addStyle('.text-muted, .placeholder {display: none !important;}');
}
