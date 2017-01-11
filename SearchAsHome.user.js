// ==UserScript==
// @name        SE search as home page
// @namespace   https://github.com/normalhuman/CustomSE
// @description Minimal navigation: search box and several quick links
// @match       *://*.askubuntu.com/*
// @match       *://*.mathoverflow.net/*
// @match       *://*.serverfault.com/*
// @match       *://*.stackapps.com/*
// @match       *://*.stackexchange.com/*
// @match       *://*.stackoverflow.com/*
// @match       *://*.superuser.com/*
// @exclude     *://area51.*
// @exclude     *://discuss.area51.*
// @exclude     *://stackexchange.*
// @grant       none
// @run-at      document-end
// @version     16.2.3
// ==/UserScript==

var host = window.location.hostname, metahost, chathost;

if (/^meta\.stackexchange/.test(host)) {
  metahost = host;
}
else if (/^meta\./.test(host)) {
  metahost = host;
  host = host.slice(5);
}
else {
  metahost = 'meta.'+host;
}

switch (host) {
  case 'meta.stackexchange.com':
    chathost = 'chat.meta.stackexchange.com';
    break;
  case 'stackoverflow.com':
    chathost = 'chat.stackoverflow.com';
    break;
  default:
    chathost = 'chat.stackexchange.com';
}

if (/^chat\./.test(window.location.hostname)) {
  redirect(document.querySelector('#footer-logo a'));
}
else {
  redirectLinks();
  if (window.location.pathname == '/search') {
    formInterface();
  }
}


function redirectLinks() {
  redirect(document.querySelector('#hlogo a'));
  var mySites = document.querySelectorAll('.my-sites a');
  for (var i=0; i<mySites.length; i++) {
    if (!/area51/.test(mySites[i].href)) {
      redirect(mySites[i]);
    }
  }
  var footerSites = document.querySelectorAll('#footer-sites a');
  for (i=0; i<footerSites.length; i++) {
    if (!/(area51|careers)\./.test(footerSites[i].href) && !footerSites[i].classList.contains('more')) {
      redirect(footerSites[i]);
    }
  }
  var t, links = document.getElementsByTagName('a');
  for (i=0; i<links.length; i++) {
    if (!links[i].classList.contains('comment-user')) {
      t = links[i].href;
      if (/\/users\/[-\d]/.test(t) && !/chat\.|\?|\/stackexchange\.com/.test(t)) {
        links[i].href = t+'?tab=topactivity';
      }
    }
  }
}


function redirect(elem) {
  if (elem) {
    elem.href = elem.href + 'search';
  }
}


function formInterface() {
  var main = document.querySelector('.search-header');
  clear(main,0);  
  var list = document.createElement('div');

  list.appendChild(listItem('Main: ', [
    {title: 'new qa', url: '//'+host+'/search?tab=newest&pagesize=50&q=is%3A'},
    {title: 'new q', url: '//'+host+'/search?tab=newest&pagesize=50&q=is%3Aq'},
    {title: 'new q/tags', url: '//'+host+'/search?tab=newest&pagesize=50&q=is%3Aq%20intags%3Amine'},
    {title: 'new a', url: '//'+host+'/search?tab=newest&pagesize=50&q=is%3aa'},
    {title: 'new a<=0', url: '//'+host+'/search?tab=newest&pagesize=50&q=is%3aa%20score%3a..0%20isaccepted:0'},
    {title: 'active q', url: '//'+host+'/search?tab=active&pagesize=50&q=is%3Aq'},
    {title: '30d no a', url: '//'+host+'/search?tab=newest&pagesize=50&q=created%3a..30d%20score%3a0%20answers%3a0%20'},
    {title: 'new tags', url: '//'+host+'/tags?tab=new'},
    {title: '10k', url: '//'+host+'/tools'}   
  ]));

  var opts = [
    {title: 'new', url: '//'+host+'/search?tab=newest&pagesize=50&q=is%3Aq%20answers%3A0+closed%3A0+score%3A0..+intags%3Amine'}
  ];
  for (var day = 1; day < 11; day++) {
    var opt = {};
    opt.title = day + (day<=1 ? 'd ago' : 'd');
    opt.url = '//'+host+'/search?tab=votes&pagesize=50&q=is%3Aq%20answers%3A0+closed%3A0+score%3A0..+intags%3Amine%20created%3A' + day + 'd';
    opts.push(opt);
  }
  opts.push({title: 'rnd', url: '//'+host+'/search?tab=votes&pagesize=50&q=is%3Aq%20answers%3A0+closed%3A0+score%3A0..+intags%3Amine%20created%3A' + Math.floor(1000*Math.random()+1) + 'd' });
  list.appendChild(listItem('Unanswered/tags: ', opts));

  list.appendChild(listItem('Meta/Chat: ', [
    {title: 'new qa', url: '//'+metahost+'/search?tab=newest&pagesize=50&q=is%3A'},
    {title: 'active qa', url: '//'+metahost+'/search?tab=active&pagesize=50&q=is%3A'},
    {title: 'new q', url: '//'+metahost+'/search?tab=newest&pagesize=50&q=is%3Aq'},
    {title: 'comments', url: '', call: function() {getComments(metahost);} },
    {title: 'site chat', url: '//'+chathost+'?tab=site&sort=active&host='+host},        
    {title: 'fav chat', url: '//'+chathost+'/chats/join/favorite'}    
  ]));

  main.appendChild(list);
}


function listItem(text, objArray) {
  var item = newElem('p','','',text);
  for (var i=0; i<objArray.length; i++) {
    var link = newLink(objArray[i].url, objArray[i].title);
    if (objArray[i].url === '') {
      link.onclick = objArray[i].call;
    }
    item.appendChild(link);
    if (i<objArray.length - 1) {
      item.appendChild(document.createTextNode(' | '));
    }
  }
  item.style['margin-bottom'] = '5px';
  return item;
}


function clear(elem, keep) {
  while (elem.children[keep]) {
    elem.removeChild(elem.children[keep]);
  }
}


function newElem(eType,eId,eClass,eText) {
  var e = document.createElement(eType);
  if (eId.length>0) {e.id = eId;}
  if (eClass.length>0) {e.classList.add(eClass);}
  if (eText.length>0) {e.textContent = eText;}
  return e;
}


function newLink(href,eText) {
  var e = document.createElement('a');
  if (href.length>0) {e.href = href;}
  e.textContent = eText;
  e.style.margin = '0px 3px';
  return e;
}


function getComments(site) {
  var callUrl = '//api.stackexchange.com/2.2/comments?order=desc&sort=creation&site='+site+'&filter=!.Fjs-H6J376m9aetgaQZH08nWrXrl&key=Av*EXI9lCxn2GVGuusoMvA((';
  getJSON(callUrl, function(e) { grabPosts(e.currentTarget.response.items, site); });
}


function grabPosts(comments, site) {
  var i, posts=[];
  for (i = 0; i<comments.length; i++) {
    posts.push(comments[i].post_id);
  }
  var callUrl = '//api.stackexchange.com/2.2/posts/'+posts.join(';')+'?site='+site+'&filter=!0S26ZGcmktzDMF_Kc3b54OP(P&key=Av*EXI9lCxn2GVGuusoMvA((';
  getJSON(callUrl, function(e) { insertComments(e.currentTarget.response.items, comments); });
}


function insertComments(posts, comments) {
  var i, c, owner, title = {}, comment;
  var mainbar = document.getElementById('mainbar');
  clear(mainbar, 2);
  var space = newElem('div', 'commentSpace', '', '');
  space.appendChild(newElem('h3', '', '', 'Comments'));  
  for (i=0; i<posts.length; i++) {
    title[posts[i].post_id] = posts[i].title;
  }
  for (i=0; i<comments.length; i++) {
    c = comments[i];
    owner = c.owner;
    comment = newElem('div','','inserted-comment','');
    comment.innerHTML = '<a href="'+owner.link+'">'+owner.display_name+'</a>: '+c.body+'<br>Re: <a href="'+c.link+'">'+title[c.post_id]+'</a>';
    comment.style.margin = '10px 0';
    comment.style.color = '#333';
    space.appendChild(comment);
  }
  mainbar.appendChild(space);    
  window.setTimeout(function(){renderTeX('commentSpace')},500);
}


function getJSON(theUrl,listener) {
  var req = new XMLHttpRequest();
  req.responseType = 'json';
  req.onload = listener;
  req.open("GET", theUrl, true);
  req.send();
}


function renderTeX(elemId) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.textContent = 'try {MathJax.Hub.Queue(["Typeset",MathJax.Hub,'+elemId+'])} catch(e){}';
  document.body.appendChild(script);
}
