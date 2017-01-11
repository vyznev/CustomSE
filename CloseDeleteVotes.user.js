// ==UserScript==
// @name        Indicate Close and Delete votes
// @namespace   https://github.com/normalhuman/CustomSE
// @description Changes the background of close and delete options if you already voted. (Delete works only on hover.)    
// @match       *://*.askubuntu.com/questions/*
// @match       *://*.mathoverflow.net/questions/*
// @match       *://*.serverfault.com/questions/*
// @match       *://*.stackapps.com/questions/*
// @match       *://*.stackexchange.com/questions/*
// @match       *://*.stackoverflow.com/questions/*
// @match       *://*.superuser.com/questions/*
// @grant       none
// @run-at      document-end
// @version     15.8.1
// ==/UserScript==

var h = window.location.href.split('/');
if (h[3]=='questions') {
  var d = document.getElementById('delete-post-'+h[4]);
  if (d) {
    var observer = new MutationObserver(function(mutations) {
      if (d.title.charAt(0)=='Y') {
        d.style.backgroundColor = '#dddddd';
        observer.disconnect();
      }
    });
    observer.observe(d, {attributes: true});
  }
  var c = document.querySelector('.close-question-link');
  if (c && c.title.charAt(0)=='Y') {
    c.style.backgroundColor = '#dddddd';
  }
}
