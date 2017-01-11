// ==UserScript==
// @name        Formatted links in posts
// @namespace   https://github.com/normalhuman/CustomSE
// @description Paste a link to a question or answer in a post, preceding it by f (as in f http://stack...)
// @description It gets formatted as "title" by "user" on "site"
// @match       *://*.stackexchange.com/*
// @match       *://*.mathoverflow.net/*
// @match       *://*.stackoverflow.com/*
// @match       *://*.superuser.com/*
// @match       *://*.serverfault.com/*
// @match       *://*.askubuntu.com/*
// @match       *://*.stackapps.com/*
// @exclude     *://chat.stackexchange.com/*
// @exclude     *://chat.stackoverflow.com/*
// @exclude     *://chat.meta.stackexchange.com/*
// @grant       none
// @run-at      document-end
// @version     16.5.1
// ==/UserScript==

(function() {
  'use strict';

  var syntax = /\bf\s+(http\S+)/i;
  var replacing = false;

  watchAreas();

  function watchAreas() {
    var a = document.getElementsByTagName('textarea');
    for (var i=0; i<a.length; i++) {
      if (!a[i].classList.contains('watchingForLinks')) {
        a[i].addEventListener('input', function (e) {convertInput(e.target);});
        a[i].classList.add('watchingForLinks');
      }
    }
    window.setTimeout(watchAreas, 1000);
  }


  function convertInput(target) {
    var command, parts, id, site, hash, i;
    var matches = target.value.match(syntax);
    if (matches) {
      command = matches[0];
      parts = command.split('/');
      site = parts[2];
      if (/^[qa]/.test(parts[3])) {
        id = parseInt(parts[4],10);
        i = command.indexOf('#');
        if (i>-1) {
          id = parseInt(command.slice(i+1),10);
        }
        if (site && id>0 && !replacing) {
          replacing = true;
          niceLink(site, id, target);
        }
      }
    }
  }


  function niceLink(site, id, target) {
    var apiKey = '1gtS)lKgyVceC11VlgjyQw((';
    var filter = '!iC9ulls4nEIRFJfXM.Rp8o';
    var request = '//api.stackexchange.com/2.2/posts/'+id+'?pagesize=1&order=desc&sort=creation&site='+site+'&filter='+filter+'&key='+apiKey;
    $.getJSON(request, function(data) {
      var q, name, formatted, matches, current;
      current = target.value;
      if (data.items) {
        q = data.items[0];
        formatted = '[' + htmlDecode(q.title) + '](' + q.share_link + ')';
        target.value = current.replace(syntax, formatted);
      }
      else {
        matches = current.match(syntax);
        target.value = current.replace(syntax, matches[1]);  // removing "f" to avoid repeated invalid API requests if link validation fails
      }
      replacing = false;
    });
  }


  function htmlDecode(input){
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.textContent;
  }

})();
