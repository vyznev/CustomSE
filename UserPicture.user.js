// ==UserScript==
// @name        Larger user picture
// @namespace   https://github.com/normalhuman/CustomSE
// @description On user profile pages, user picture becomes linked to a larger version of it
// @match       *://*.askubuntu.com/users/*
// @match       *://*.mathoverflow.net/users/*
// @match       *://*.serverfault.com/users/*
// @match       *://*.stackapps.com/users/*
// @match       *://*.stackexchange.com/users/*
// @match       *://*.stackoverflow.com/users/*
// @match       *://*.superuser.com/users/*
// @version     15.7.2
// @grant       none
// @run-at      document-end
// ==/UserScript==

var u = window.location.href;
var id = parseInt(u.split('/')[4],10);
var adiv, gdiv, imlink, newlink;
if (id>0) {
  adiv = document.querySelector('.avatar');
  if (!adiv) {
    adiv = document.querySelector('.user-gravatar-mini');
  }
  if (!adiv) {
    adiv = document.querySelector('.gravatar');
  }

  if (adiv) {
    gdiv = adiv.firstElementChild;
    imlink = gdiv.querySelector('img').getAttribute('src');
    if (imlink.indexOf('imgur') != -1) {
      newlink = imlink.split('?')[0];
    }
    else {
      newlink = imlink.replace(/s=\d+(?=(&|$))/,'s=728');
      newlink = newlink.replace(/sz=\d+(?=(&|$))/,'sz=728');
    }
    gdiv.setAttribute('href', newlink);
  }
}
