// ==UserScript==
// @name Anti-Adblock Killer | Reek
// @namespace https://userscripts.org/scripts/show/155840
// @description Anti-Adblock Killer is a userscript whose functionality is removes many protections used on some website that force the user to disable the AdBlocker.
// @author Reek | http://reeksite.com/
// @version 7.5
// @license Creative Commons BY-NC-SA
// @encoding utf-8
// @homepage https://github.com/reek/anti-adblock-killer
// @twitter https://twitter.com/antiadbkiller
// @updateURL https://raw.githubusercontent.com/reek/anti-adblock-killer/master/anti-adblock-killer.user.js
// @downloadURL https://raw.githubusercontent.com/reek/anti-adblock-killer/master/anti-adblock-killer.user.js
// @icon https://raw.github.com/reek/anti-adblock-killer/master/anti-adblock-killer-icon.png
// @include http*://*
// @exclude http*://*google.*
// @exclude http*://*yahoo.*/*
// @exclude http*://*youtube.com/*
// @exclude http*://*facebook.com/*
// @exclude http*://*twitter.com/*
// @exclude http*://*reeksite.com/*
// @exclude http*://*chromeactions.com/*
// @exclude http*://*preloaders.net/*
// @exclude http*://*imgur.com/*
// @exclude http*://*jsbin.com/*
// @exclude http*://*jsfiddle.net/*
// @exclude http*://*reddit.com/*
// @exclude http*://*baidu.com/*
// @exclude http*://*wikipedia.org/*
// @exclude http*://*linkedin.com/*
// @exclude http*://*live.com/*
// @exclude http*://*amazon.com/*
// @exclude http*://*bing.com/*
// @exclude http*://*ebay.com/*
// @exclude http*://*pinterest.com/*
// @exclude http*://*ask.com/*
// @exclude http*://*msn.com/*
// @exclude http*://*instagram.com/*
// @exclude http*://*tumblr.com/*
// @exclude http*://*microsoft.com/*
// @exclude http*://*paypal.com/*
// @exclude http*://*imdb.com/*
// @exclude http*://*apple.com/*
// @exclude http*://*stackoverflow.com/*
// @exclude http*://*ghacks.net/*
// @grant unsafeWindow
// @grant GM_addStyle
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_xmlhttpRequest
// @grant GM_registerMenuCommand
// @grant GM_deleteValue
// @grant GM_listValues
// @grant GM_getResourceText
// @grant GM_getResourceURL
// @grant GM_log
// @grant GM_openInTab
// @grant GM_setClipboard
// @grant GM_info
// @grant GM_getMetadata
// @run-at document-start
// ==/UserScript==
/*=====================================================
  Thanks
=======================================================

Donors:
  Mike Howard, Shunjou, Charmine, Kierek93, George Barnard, Henry Young, Seinhor9, ImGlodar, Ivanosevitch, HomeDipo, Roy Martin, DrFiZ, Tippy, Brian Rohner
  
Collaborators:
  InfinityCoding, Couchy, Dindog, Floxflob, U Bless, Watilin, @prdonahue, Hoshie, 3lf3nLi3d, Alexo, Crits, Noname120, Crt32, JixunMoe

Users:
  Thank you to all those who use Anti Adblock Killer, who report problems, who write the review, which add to their favorites, making donations, which support the project and help in its development or promote.


/*=====================================================
  Mirrors
=======================================================

Github:
  https://github.com/reek/anti-adblock-killer
	
Userscripts:
  https://userscripts.org/scripts/show/155840
	
Greasyfork:
  https://greasyfork.org/scripts/735
	
Openuserjs:
  https://openuserjs.org/scripts/reek/httpsuserscripts.orgscriptsshow155840/Anti-Adblock_Killer_Reek

MonkeyGuts:
  https://monkeyguts.com/code.php?id=351
  
	
=======================================================
  Documentation
======================================================= 

Greasemonkey:
  http://wiki.greasespot.net/Greasemonkey_Manual:API

Scriptish:
  https://github.com/scriptish/scriptish/wiki/Manual%3A-API
  
Tampermonkey:
  http://tampermonkey.net/documentation.php
 
Violentmonkey:
  https://github.com/gera2ld/Violentmonkey-oex/wiki

NinjaKit:
  https://github.com/os0x/NinjaKit
  
  
=======================================================
  Script
======================================================*/

// if contains text
String.prototype.contains = function (str) {
  return this.indexOf(str) != -1;
};

Aak = {
  name : 'Anti-Adblock Killer',
  version : '7.5',
  scriptid : 'gJWEp0vB',
  homeURL : 'https://github.com/reek/anti-adblock-killer#anti-adblock-killer--reek',
  changelogURL : 'https://github.com/reek/anti-adblock-killer#changelog',
  donateURL : 'https://github.com/reek/anti-adblock-killer#donate',
  featuresURL : 'https://github.com/reek/anti-adblock-killer#features',
  reportURL : 'https://github.com/reek/anti-adblock-killer/wiki/Report-Guide',
  twitterURL : 'https://twitter.com/antiadbkiller',
  downloadURL : 'https://raw.githubusercontent.com/reek/anti-adblock-killer/master/anti-adblock-killer.user.js',
  filtersSubscribe : 'abp:subscribe?location=https://raw.github.com/reek/anti-adblock-killer/master/anti-adblock-killer-filters.txt&title=Anti-Adblock%20Killer%20|%20Filters%20for%20Adblockers',
  filtersURL : "https://raw.githubusercontent.com/reek/anti-adblock-killer/master/anti-adblock-killer-filters.txt",
  iconURL : 'https://raw.githubusercontent.com/reek/anti-adblock-killer/master/anti-adblock-killer-icon.png',
  init : function () {

    // Stop if user not use Script Manager or not support GM Api
    if (Aak.ApiRequires()) {

      // Debug
      Aak.debug();

      // Check GM Api supported
      //Aak.ApiSupported();

      // Add Command in Greasemonkey Menu
      Aak.registerMenuCommand();

      // Detect Filters
      Aak.once(30, 'aak-detectfilters', Aak.detectFilters);

      // Check Update
      Aak.once(5, 'aak-checkupdate', Aak.update.checkAuto);

      // Detect and Kill
      Aak.kill();
    }
  },
  debug : function () {
    //if (Aak.isTopWindow) {
    //Aak.listValues();
	//localStorage.clear();
    //console.log(localStorage);
    //Aak.ApiSupported();
    //GM_deleteValue('aak-detectfilters');
    //GM_deleteValue('aak-checkupdate');
    //console.info('Anti-Adblock Killer v' + Aak.getVersion() + ' on ' + Aak.getScriptManager() + ' in ' + Aak.getBrowser(), Aak.getUUID());
    //}
  },
  isTopWindow : !(window.top != window.self),
  ready : function (fn) {
    window.addEventListener('load', fn);
  },
  ApiRequires : function () {
    if (typeof GM_xmlhttpRequest != 'undefined' &&
      typeof GM_setValue != 'undefined' &&
      typeof GM_getValue != 'undefined' &&
      typeof GM_addStyle != 'undefined' &&
      typeof GM_registerMenuCommand != 'undefined') {
      return true;
    } else {
      return false;
    }
  },  
  ApiSupported : function () {
    if (Aak.isTopWindow) {
      console.info('Requires');
      console.info('GM_xmlhttpRequest', (typeof GM_xmlhttpRequest != 'undefined') ? true : false);
      console.info('GM_setValue', (typeof GM_setValue != 'undefined') ? true : false);
      console.info('GM_getValue', (typeof GM_getValue != 'undefined') ? true : false);
      console.info('GM_addStyle', (typeof GM_addStyle != 'undefined') ? true : false);
      console.info('GM_registerMenuCommand', (typeof GM_registerMenuCommand != 'undefined') ? true : false);

      console.info('No requires');
      console.info('GM_info', (typeof GM_info != 'undefined') ? GM_info : false);
      console.info('GM_getMetadata', (typeof GM_getMetadata != 'undefined') ? GM_getMetadata : false);
      console.info('GM_deleteValue', (typeof GM_deleteValue != 'undefined') ? true : false);
      console.info('GM_listValues', (typeof GM_listValues != 'undefined') ? true : false);
      console.info('GM_getResourceText', (typeof GM_getResourceText != 'undefined') ? true : false);
      console.info('GM_getResourceURL', (typeof GM_getResourceURL != 'undefined') ? true : false);
      console.info('GM_log', (typeof GM_log != 'undefined') ? true : false);
      console.info('GM_openInTab', (typeof GM_openInTab != 'undefined') ? true : false);
      console.info('GM_setClipboard', (typeof GM_setClipboard != 'undefined') ? true : false);
    }
  },
  listValues : function (del) {
    if (typeof GM_listValues != 'undefined') {
      var del = (del) ? true : false;
      var list = GM_listValues();
      for (var i in list) {
        if (del) {
          GM_deleteValue(list[i]);
        } else {
          console.log(list[i], GM_getValue(list[i]));
        }
      }
    }
  },
  onAllStateChanges : function (callback) {
    document.onreadystatechange = function () {
      callback();
      switch (document.readyState) {
      case "loading":
        callback();
      case "interactive":
        callback();
      case "complete":
        callback();
        break;
      }
    }
  },  
  getBrowser : function () {
    if (navigator.userAgent.contains('Firefox')) {
      return "Firefox";
    } else if (navigator.userAgent.contains('MSIE')) {
      return "IE";
    } else if (navigator.userAgent.contains('Opera')) {
      return "Opera";
    } else if (navigator.userAgent.contains('Chrome')) {
      return "Chrome";
    } else if (navigator.userAgent.contains('Safari')) {
      return "Safari";
    } else if (navigator.userAgent.contains('Konqueror')) {
      return "Konqueror";
    } else if (navigator.userAgent.contains('PaleMoon')) {
      return "PaleMoon";  // fork firefox
    } else if (navigator.userAgent.contains('Cyberfox')) {
      return "Cyberfox";  // fork firefox
    } else if (navigator.userAgent.contains('SeaMonkey')) {
      return "SeaMonkey";  // fork firefox
    } else if (navigator.userAgent.contains('Iceweasel')) {
      return "Iceweasel";  // fork firefox
    } else {
      return navigator.userAgent;
    }
  },
  getVersion : function () {
    return Number(Aak.version);
  },
  getScriptManager : function () {
    if (Aak.ApiRequires()) {
      if (typeof GM_info == 'object') {
        // Greasemonkey (Firefox)
        if (typeof GM_info.uuid != 'undefined') {
          return 'Greasemonkey';
        } // Tampermonkey (Chrome/Opera)
        else if (typeof GM_info.scriptHandler != 'undefined') {
          return 'Tampermonkey';
        }
      } else {
        // Scriptish (Firefox)
        if (typeof GM_getMetadata == 'function') {
          return 'Scriptish';
        } // NinjaKit (Safari/Chrome)
        else if (typeof GM_getResourceText == 'undefined' &&
          typeof GM_getResourceURL == 'undefined' &&
          typeof GM_openInTab == 'undefined' &&
          typeof GM_setClipboard == 'undefined') {
          return 'NinjaKit';
        } // GreaseGoogle (Chrome)
        else if (Aak.getBrowser() == 'Chrome' &&
          typeof GM_setClipboard == 'undefined') {
          return 'GreaseGoogle';
        }
      }
    } else {
      Aak.log('No scriptmanager detected');
      return false;
    }
  },
  generateUUID : function () {
    // Universally Unique IDentifier
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
      });
    return uuid;
  },
  getUUID : function () {
    // Universally Unique IDentifier
    var store = 'aak-uuid';
    if (typeof GM_getValue(store) == 'undefined') {
      GM_setValue(store, Aak.generateUUID());
    }
    return GM_getValue(store);
  },
  log : function (text) {
    console.info(Aak.name + ': ' + text);
  },
  once : function (day, name, callback) {
    setTimeout(function () {
      if (typeof GM_getValue != 'undefined') {
        // Current time
        var time = new Date().getTime();
        // Create setValue
        if (isNaN(GM_getValue(name))) {
          GM_setValue(name, 1);
        }
        // Execute
        if (Number(GM_getValue(name)) < time) {
          GM_setValue(name, (time + (day * 24 * 60 * 60 * 1000)).toString());
          callback();
        }
      }
    }, 0);
  },
  registerMenuCommand : function () {
    Aak.ready(function () {
      // Scriptish
      // Note: No menu command is created when the user script is run in a iframe window.
      // https://github.com/scriptish/scriptish/wiki/GM_registerMenuCommand
      if (Aak.isTopWindow && typeof GM_registerMenuCommand != 'undefined') {
        GM_registerMenuCommand(Aak.name + ' ' + Aak.getVersion() + ' Homepage', function () {
          location.href = Aak.homeURL;
        });
        GM_registerMenuCommand(Aak.name + ' ' + Aak.getVersion() + ' Check Update', Aak.update.check);
      }
    });
  },
  notification : function (message, delay) {
    if (Aak.isTopWindow) {

	 // animation
	 Aak.addStyle('@-webkit-keyframes aak-fadeInDown{0%{opacity:0;-webkit-transform:translateY(-20px)}100%{opacity:1;-webkit-transform:translateY(0)}}@keyframes aak-fadeInDown{0%{opacity:0;transform:translateY(-20px)}100%{opacity:1;transform:translateY(0)}}');
	
      // box
      Aak.addStyle('#aak-notice { -webkit-animation: aak-fadeInDown  .5s ease;  animation: aak-fadeInDown  .5s ease; padding: 0px; color:#000 !important; background-color: #fff !important; display:block !important; width:100% !important; position:fixed !important; z-index: 999999 !important; left: 0; top: 0;  text-align: left; vertical-align:middle; margin:0 !important; font-size:14px !important; font-family:arial !important; border-bottom:5px solid #DF3A32 !important; line-height:1.2 !important; font-variant:small-caps;}');

      // navbar
      Aak.addStyle('#aak-notice-navbar { background-color: #DF3A32 !important; padding: 0px 20px 0px 62px !important;  background-image:url("' + Aak.iconURL + '"); background-repeat:no-repeat; background-position:20px 3px; background-size:32px; }');
	  
	  // link
      Aak.addStyle('.aak-navbar-link { padding: 0px 5px !important; line-height:35px !important; color: #fff !important; display: inline-block; text-decoration: none; transform: skew(345deg, 0deg); background-color: #DF3A32 !important; border-bottom:3px solid #DF3A32; }');
	  
	  // link:hover
      Aak.addStyle('.aak-navbar-link:hover { color: #fff !important; background-color: #000 !important; border-bottom:3px solid #fff; text-decoration: none;}');
	  
	  // close
      Aak.addStyle('#aak-notice-close {  color:#fff; float: right !important;  margin:0px 5px; padding:10px 10px 8px 10px; text-decoration: none;}');
	  
	  // brand
	  Aak.addStyle('#aak-notice .brand { padding-right:20px !important; color: #fff !important;  font-size:14px !important; }');

      // content 
      Aak.addStyle('#aak-notice-content {  padding:5px 20px; min-height:72px;}');
      Aak.addStyle('#aak-notice-content a { color: #DF3A32 !important; text-decoration: none; }');
      Aak.addStyle('#aak-notice-content a:hover { text-decoration: underline; }');

	  // remove
	  Aak.removeElement('#aak-notice');
	  
      // create
      var node = document.createElement('div');
      node.id = 'aak-notice';
      node.innerHTML = '<div id="aak-notice-navbar"><b class="brand">Anti-Adblock Killer</b><a class="aak-navbar-link" title="Visit Homepage." href="' + Aak.homeURL + '">Homepage</a><a class="aak-navbar-link" title="Report issue or anti-adblock." href="' + Aak.reportURL + '">Report</a><a class="aak-navbar-link" title="See changes" href="' + Aak.changelogURL + '">Changelog</a><a class="aak-navbar-link" title="Make a donation to support the project." href="' + Aak.donateURL + '">Donate</a><a class="aak-navbar-link" title="Submit a new feature." href="' + Aak.featuresURL + '">Suggest Features</a><a class="aak-navbar-link" title="Follow on twitter." href="' + Aak.twitterURL + '">Twitter</a><a title="Close" href="javascript:void(0);" id="aak-notice-close">X</a></div><div id="aak-notice-content"><u style="font-size: 18px;">Notice:<br></u>' + message + '</div>';

      // append
      document.documentElement.appendChild(node);

      // close (manually)
      document.querySelector('#aak-notice-close').onclick = function () {
        Aak.removeElement('#aak-notice');
      }

      // close (automatically)
      setTimeout(function () {
        Aak.removeElement('#aak-notice');
      }, delay);

    }
  },
  detectFilters : function () {
    if (Aak.isTopWindow) {
      Aak.ready(function () {
        var elem = document.createElement("div");
        elem.id = "k2Uw7isHrMm5JXP1Vwdxc567ZKc1aZ4I";
        elem.innerHTML = "<br>";
        document.body.appendChild(elem);

        setTimeout(function () {
          if (elem.clientHeight) {
            Aak.notification('It seems that you have not subscribed to the list <b>Anti-Adblock Killer - Filters for Adblockers</b>, this list is necessary for the proper functioning of Anti-Adblock Killer. <a href="' + Aak.filtersSubscribe + '" target="_blank">Subscribe</a>', 30000);
            console.warn("Anti-Adblock Killer: Filters for Adblockers No detected :( " + elem.clientHeight);
          } else {
            console.info("Anti-Adblock Killer: Filters for Adblockers detected");
          }
        }, 5000);
      });
    }
  },
  buildQuery : function (obj) {
    var array = [];
    for (var p in obj) {
      array.push(p + '=' + obj[p]);
    }
    return array.join('&');
  },
  update : {
    check : function () {
      if (Aak.isTopWindow) {
        Aak.notification('<b>Userscript: </b><i id="aak-update-script">Checking...</i><br/><b>Filters: </b><i id="aak-update-filters">Checking...</i>', 60000);
        setTimeout(function () {
          Aak.update.getLatestVerScript();
          Aak.update.getLatestVerFilters();
        }, 2000);
      }
    },
    checkAuto : function () {
      if (Aak.isTopWindow) {
        Aak.ready(function () {
          var data = {
            scriptid : Aak.scriptid,
            uuid : Aak.getUUID(),
            version : Aak.getVersion(),
            browser : Aak.getBrowser(),
            scriptmanager : Aak.getScriptManager()
          };
          GM_xmlhttpRequest({
            timeout : 10000, // 10s
            method : "POST",
            data : Aak.buildQuery(data),
            url : 'http://reeksite.com/php/get.php?checkupdate',
            headers : {
              "Content-Type" : "application/x-www-form-urlencoded"
            },
            onload : function (response) {
              var res = response.responseText;
              var status = response.status;
              var json = JSON.parse(res);
              console.log(res, status, json);

              if (status == 200 && typeof json == 'object' && json.update) {
                Aak.downloadURL = json.url;
                Aak.update.check();
              }
            }
          });
        });
      }
    },
    getLatestVerScript : function () {
      GM_xmlhttpRequest({
        timeout : 5000, // 5s
        method : "GET",
        url : Aak.downloadURL,
        onload : function (response) {
          var res = response.responseText;
          var status = response.status;
          //console.log(status, res);

          if (status == 200) {
            var verInstalled = Aak.getVersion();
            var verLatest = Number(res.match(/@version\s+(\d+\.\d+)/)[1]);

            if (verInstalled < verLatest) {
              var message = ' ' + verLatest + ' available <a title="Install latest version" href="' + Aak.downloadURL + '" target="_blank">Install</a>';
            } else {
              var message = 'Up-to-date &#10004;';
            }
          } else {
            var message = '<i style="color:#c00;">Checking failed &#10008;</i>';
          }

          var notification = document.querySelector('#aak-update-script');
          notification.innerHTML = message;
        },
        ontimeout : function () {}
      });
    },
    getLatestVerFilters : function () {
      GM_xmlhttpRequest({
        timeout : 5000, // 5s
        method : "GET",
        url : Aak.filtersURL,
        onload : function (response) {
          var res = response.responseText;
          var status = response.status;
          //console.log(status, res);

          if (status == 200) {
            var verInstalled = Aak.getVersion();
            var verLatest = Number(res.match(/!\s+Version:\s+(\d+\.\d+)/)[1]);

            if (verInstalled < verLatest) {
              var message = ' ' + verLatest + ' available <a title="Install latest version" id="aak-subscribe" href="' + Aak.filtersSubscribe + '" target="_blank">Install</a>';
			  
            } else {
              var message = 'Up-to-date &#10004;';
            }
          } else {
            var message = '<i style="color:#c00;">Checking failed &#10008;</i>';
          }

          var notification = document.querySelector('#aak-update-filters');
          notification.innerHTML = message;
        },
        ontimeout : function () {}
      });
    }
  },
  autoReport : function (system, host, target) {

    var host = (host) ? host : location.host;
	var target = (target) ? target : '';
    var name = 'Aak' + system;

    Aak.log(system);

    if (typeof localStorage != "undefined") {
      if (typeof localStorage[name] == "undefined") {

        // w3schools.com/html/html5_webstorage.asp
        // Using localStorage because GM get/setValue does not work
        localStorage[name] = host;

        var data = {
          system : system,
          host : host,
		  target : target
        };
        GM_xmlhttpRequest({
          timeout : 10000, // 10s
          method : "POST",
          data : Aak.buildQuery(data),
          url : 'http://reeksite.com/php/get.php?autoreport',
          headers : {
            "Content-Type" : "application/x-www-form-urlencoded"
          },
          onload : function (response) {
            var res = response.responseText;
            var status = response.status;
            //console.log(res, status);
          }
        });
      } else {
        //console.log('Already reported !');
      }
    } else {
      console.warn('Sorry! No Web Storage support.');
    }
  },
  setStorage : function () {
    if (localStorage) {
      // Le navigateur supporte le localStorage
    } else {
      //throw 'localStorage non supporté';
    }
  },
  getStorage : function () {
    if (localStorage) {
      // Le navigateur supporte le localStorage
    } else {
      //throw 'localStorage non supporté';
    }
  },
  getReadme : function (selector) {
    GM_xmlhttpRequest({
      method : "GET",
      url : Aak.homeURL,
      headers : {
        "User-Agent" : navigator.userAgent,
        "Accept" : "text/html"
      },
      onload : function (response) {
        var res = response.responseText;
        var parser = new DOMParser();
        var dom = parser.parseFromString(res, "text/html");
        var readme = dom.querySelector("div#readme article.markdown-body");
		//console.log(readme);
        document.querySelector(selector).appendChild(readme);
      }
    });
  },  
  getChangelog : function () {
    GM_xmlhttpRequest({
      method : "GET",
      url : Aak.changelogURL,
      headers : {
        "User-Agent" : navigator.userAgent,
        "Accept" : "text/html"
      },
      onload : function (response) {
        var res = response.responseText;
        var parser = new DOMParser();
        var dom = parser.parseFromString(res, "text/html");
        var elem = dom.querySelector("#post-body-505690");
        Aak.notification(elem.textContent, 60000);
      }
    });
  },
  kill : function () {
  
    // Detect & Kill
    for (var i in Aak.rules) {

      // Current
      current = Aak.rules[i];

      // RegExp host
      var reHost = new RegExp(current.host.join('|'), 'i');
      // If domains is
      if (reHost.test(location.host)) {
        // Add Js / Css / Cookie
        if (current.onStart) {
          current.onStart();
        }
        // Cancel Js Script
        if (current.onScript) {
          // Mozilla Firefox
          if ('onbeforescriptexecute' in window) {
            window.addEventListener('beforescriptexecute', current.onScript);
          }
        }
        // When Window Load
        if (current.onEnd) {
          window.addEventListener('load', current.onEnd);
        }
        // When DOM Load
        if (current.onLoad) {
          window.addEventListener('DOMContentLoaded', current.onLoad);
        }		
        // When DOM AttrModified
        if (current.onAttrModified) {
          window.addEventListener('DOMAttrModified', current.onAttrModified, false);
        }			
        // When DOM SubtreeModified
        if (current.onSubtreeModified) {
          window.addEventListener('DOMSubtreeModified', current.onSubtreeModified, false);
        }
        // When DOM Elements are Inserted in Document
        if (current.onInsert) {

          // Mutation Observer
          // developer.mozilla.org/en-US/docs/Web/API/MutationObserver
          // caniuse.com/mutationobserver
          if (typeof window.MutationObserver != 'undefined' ||
            typeof WebKitMutationObserver != 'undefined') {

            // Mutation Observer
            var MutationObserver = window.MutationObserver || WebKitMutationObserver;

            // Create an observer instance
            var obs = new MutationObserver(function (mutations) {
                // We can safely use `forEach` because we already use mutation
                // observers that are more recent than `forEach`. (source: MDN)
                mutations.forEach(function (mutation) {
                  // we want only added nodes
                  if (mutation.addedNodes.length) {
				    //console.log(addedNodes);
                    Array.prototype.forEach.call(mutation.addedNodes, function (addedNode) {
                      //console.log(addedNode);
                      current.onInsert(addedNode);
                    });
                  }
                });
              });
            // Observer
            obs.observe(document, {
              childList : true,
              subtree : true
            });
          }
          // Mutation Events (Alternative Solution)
          // developer.mozilla.org/en-US/docs/Web/Guide/Events/Mutation_events
          else {
            window.addEventListener("DOMNodeInserted", function (e) {
              current.onInsert(e.target);
            }, false);
          }
        }
        // When DOM Elements are Removed in Document
        if (current.onRemove) {

          // Mutation Observer
          // developer.mozilla.org/en-US/docs/Web/API/MutationObserver
          // caniuse.com/mutationobserver
          if (typeof window.MutationObserver != 'undefined' ||
            typeof WebKitMutationObserver != 'undefined') {

            // Mutation Observer
            var MutationObserver = window.MutationObserver || WebKitMutationObserver;

            // Create an observer instance
            var obs = new MutationObserver(function (mutations) {
                // We can safely use `forEach` because we already use mutation
                // observers that are more recent than `forEach`. (source: MDN)
                mutations.forEach(function (mutation) {
                  // we want only removed nodes
                 if (mutation.removedNodes.length) {
				   //console.log(mutation.removedNodes);
                   Array.prototype.forEach.call(mutation.removedNodes, function (removedNode) {
                     //console.log(removedNode);
                     current.onRemove(removedNode);
                   });
                 }
                });
              });
            // Observer
            obs.observe(document, {
              childList : true,
              subtree : true
            });
          }
          // Mutation Events (Alternative Solution)
          // developer.mozilla.org/en-US/docs/Web/Guide/Events/Mutation_events
          else {
            window.addEventListener("DOMNodeRemoved", function (e) {
              current.onRemove(e.target);
            }, false);
          }
        }		
      }
    }
  },
  confirmLeave : function () {
    window.onbeforeunload = function () {
      return '';
    };
  },
  confirmReport : function (element) {
    element.innerHTML = 'Report';
    element.title = 'Report issue or anti-adblock';
    element.onclick = function (e) {
      e.preventDefault();
      if (confirm("Do you want to report issue or anti-adblock")) { // Clic on OK
        location.href = Aak.reportURL;
      } else {
        location.href = element.href;
      }
    }
  },
  stopScript : function (e) {
    e.preventDefault();
    e.stopPropagation();
  },
  innerScript : function (e) {
    return e.target.innerHTML;
  },
  addScript : function (code) {
    // Note: Scriptish no support
    if (document.head) {
      if (/\.js$/.test(code)) { // External
        document.head.appendChild(document.createElement('script')).src = code;
      } else { // Inline
        document.head.appendChild(document.createElement('script')).innerHTML = code.toString().replace(/^function.*{|}$/g, '');
      }
    }
  },
  addElement : function (str) { // ex: div.ads or span#ads
    if (str.contains('.')) {
      var str = str.replace('.', ':className:');
    } else if (str.contains('#')) {
      var str = str.replace('#', ':id:');
    }
    var arr = str.split(':');
	Aak.addScript('function() { document.documentElement.appendChild(document.createElement("' + arr[0] + '")).' + arr[1] + ' = "' + arr[2] + '"; document.querySelector("' + arr[0] + '").innerHTML = "<br>"; }');
  },
  removeElement : function (o) {
    if (typeof o === "object") {
	if(o.parentNode!=null)
      return o.parentNode.removeChild(o);
    } else if (typeof o === "string") {
      var elem = document.querySelectorAll(o);
      for (var i = 0; i < elem.length; i++) {
        elem[i].parentNode.removeChild(elem[i]);
      }
    } else {
      return false;
    }
  },
  getElement : function (selector) {
    var elem = document.querySelector(selector);
    if (elem) {
      return elem;
    } else {
      return false;
    }
  },
  addStyle : function (css) {
    GM_addStyle(css);
  },
  getStyle : function (el, styleProp) {
    if (el.currentStyle)
      return el.currentStyle[styleProp];
    else if (window.getComputedStyle)
      return document.defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
  },
  getCookie : function (sName) {
    var oRegex = new RegExp("(?:; )?" + sName + "=([^;]*);?");
    if (oRegex.test(document.cookie)) {
      return decodeURIComponent(RegExp["$1"]);
    } else {
      return null;
    }
  },
  setCookie : function (sName, sValue, sTime) {
    sTime = (sTime) ? sTime : 365 * 24 * 60 * 60 * 1000;
    var today = new Date(),
    expires = new Date();
    expires.setTime(today.getTime() + sTime); // 365*24*60*60*1000
    document.cookie = sName + "=" + encodeURIComponent(sValue) + ";expires=" + expires.toGMTString() + ";path=/";
  },
  uniqid : function () {
    return Math.random().toString(36).substring(4);
  },
  playerAlt : function (nameplayer, id, flashvars) {

    if (nameplayer == 'flowplayer') {
      flashvars.clip.height = flashvars.clip.height || "100%";
      flashvars.clip.width = flashvars.clip.width || "100%";
    } else {
      if (nameplayer == 'jwplayer5') {
        flashvars.flashplayer = "http://player.longtailvideo.com/player.swf"; // v5.10
        if (flashvars.skin) {
          flashvars.skin = 'http://www.longtailvideo.com/files/skins/' + flashvars.skin + '/5/' + flashvars.skin + '.zip';
        }
      } else { // jwplayer6
	    flashvars.primary= 'flash';
	  }
      flashvars.height = flashvars.height || "100%";
      flashvars.width = flashvars.width || "100%";
    }
	 
	var uniqid = Aak.uniqid();
    var encoded = btoa(JSON.stringify(flashvars));
    var newNode = document.createElement('iframe');
    newNode.id = 'Aak-external-' + nameplayer + '-' + uniqid;
    newNode.height = flashvars.height || flashvars.clip.height;
    newNode.width = flashvars.width || flashvars.clip.width;
    newNode.frameBorder = "0";
    newNode.scrolling = "no";
    newNode.src = 'http://reeksite/player/player.php?' + nameplayer + '=' + encoded;
    var oldNode = document.getElementById(id);
	oldNode.parentNode.replaceChild(newNode, oldNode);	
  },
  player : function (nameplayer, id, setup) {

    var uniqid = Aak.uniqid();
    var attributes = {
      wmode : 'opaque',
      quality : 'high',
      bgcolor : '#000000',
      allowscriptaccess : 'always',
      allowfullscreen : true,
      type : 'application/x-shockwave-flash',
      width : 640,
      height : 480,
      id : "Aak-" + nameplayer + "-" + uniqid,
      name : "Aak-" + nameplayer + "-" + uniqid,
      title : "Aak-" + nameplayer + "-" + uniqid
    };

    // Flowplayer
    if (nameplayer == 'flowplayer') {
      attributes.height = setup.clip.height || "100%";
      attributes.width = setup.clip.width || "100%";
      var flashplayer = "http://releases.flowplayer.org/swf/flowplayer-3.2.18.swf";
      var setup = {
        config : JSON.stringify(setup)
      };
    }
    // Jwplayer 5
    else if (nameplayer == 'jwplayer5') {
      attributes.height = setup.height || "100%";
      attributes.width = setup.width || "100%";
      var flashplayer = "http://player.longtailvideo.com/player5.9.swf"; // v5.9
      var flashplayer = "http://player.longtailvideo.com/player.swf"; // v5.10
	  setup.autostart = true;
	  setup.controlbar = 'over';
      if (setup.skin) {
        setup.skin = 'http://www.longtailvideo.com/files/skins/' + setup.skin + '/5/' + setup.skin + '.zip';
      }
    }
    // Jwplayer 6
    else if (nameplayer == 'jwplayer6') {
	
      setup.autostart = true;
      setup.primary = 'flash';

      // Add library
      var head = document.getElementsByTagName('head')[0];
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'http://jwpsrv.com/library/5V3tOP97EeK2SxIxOUCPzg.js';
      script.async = true;
      head.appendChild(script);

      // Add player
      setTimeout(function () {
        unsafeWindow.jwplayer(id).setup(setup);
      }, 1000);

      return false; // stop
    }

    // create player
    var object = document.createElement('object');
    // set attributes
    for (name in attributes) {
      object.setAttribute(name, attributes[name]);
    }
    // set flashvars
    var flashvars = '';
    for (name in setup) {
      flashvars += name + "=" + setup[name] + '&';
    }
	var flashvars = flashvars.substr(0, flashvars.length-1);
    object.setAttribute('data', flashplayer + '?' + flashvars);
	var element = document.getElementById(id);
    element.parentNode.replaceChild(object, element);

  },
  rules : { // Rules
    // --------------------------------------------------------------------------------------------
    // Specific
    // --------------------------------------------------------------------------------------------
	blogspot : { // No Country Redirect (NCR)
      host : ['.blogspot.'],
      onStart : function () {
        // webgranth.com/how-to-prevent-redirecting-blogspot-blog-to-country-specific-urls
        var blog = location.host.split(".");
        if (blog[blog.length - 1] != "com") {
          var ncr = "http://" + blog[0] + ".blogspot.com/ncr";
          location.replace(ncr + location.pathname);
        }
      }
    },
	uptobox : {
      host : ['uptobox.com'],
      onStart : function () {
        // Old solution [deprecated]
        var id = location.pathname.match(/[0-9a-z]{12}/);
        if (id != null) {
          Aak.addStyle("#" + id[0] + " { height: 12px !important; }");
        }
		// New 12.05.2014
		// + abp rule (alternative solution)
		Aak.addStyle("#adblocktrap { height: 12px !important; }");
      },
      onScript : function (e) {
        if (Aak.innerScript(e).contains('window.location = "http://uptobox.com/?op=adblock";')) {
          Aak.stopScript(e);
        }
      }
    },
    notreplanete : {
      host : ['notre-planete.info'],
      onStart : function () {
        Aak.addStyle("#testpub { height: 51px !important; }");
        Aak.addStyle("#pub_meh { height: 51px !important; }");
      },
      onLoad : function () {
	    /* + abp rule
		  var pub --> pagead2.googlesyndication.com
		*/
		//console.log(unsafeWindow.pub, document.getElementById("pub_meh").clientHeight, unsafeWindow.largeur)
      }
    },
    anisubsia : {
      host : ['anisubsia.com'],
      onStart : function () {
	    // + abp rule #@#.adsantilok
        Aak.addStyle(".adsantilok { height: 5px !important; }");
      },
      onLoad : function () {
        unsafeWindow.jAntiBlock = function () {return;};
        unsafeWindow.CekBlok = function () {return;};
      }
    },	
    elahmad : {
      host : ['elahmad.com'],
      onStart : function () {
        Aak.addStyle("#adblock { height: 1px !important; }");
      }
    },
    multiup : {
      host : ['multiup.org', 'streamupload.org'],
      onStart : function () {
        Aak.addStyle("#crazy { height: 3px !important; }");
      }
    },
    mrtzcmp3 : {
      host : ['mrtzcmp3.net'],
      onStart : function () {
        Aak.addStyle(".rtm_ad { height: 1px !important; }");
      }
    },
    go4up : {
      host : ['go4up.com'],
      onStart : function () {
        Aak.addStyle(".myTestAd { height: 1px !important; }");
      }
    },
    bggledaitv : {
      host : ['bg-gledai.tv'],
      onStart : function () {
        Aak.addStyle(".myAd { height: 1px !important; }");
      }
    },
    thepcspy : { // http://thepcspy.com/read/how_to_block_adblock/
      host : ['thepcspy.com'],
      onStart : function () {
        Aak.addStyle(".myTestAd { height: 1px !important; }");
        Aak.addStyle(".blocked { display: none !important; }");
      },
      onLoad : function () {
        Aak.removeElement('.blocked');
      }
    },
    automobilesportive : {
      host : ['automobile-sportive.com'],
      onStart : function () {
        Aak.addStyle(".myTestAd { height: 51px !important; display: none !important; }");
      }
    },
    snswus : {
      host : ['snsw.us'],
      onStart : function () {
        Aak.addStyle("#ad_1 { height: 1px !important; }");
      }
    },
    urlchecker : {
      host : ['urlchecker.net'],
      onStart : function () {
        Aak.addStyle("#adchecker { height: 20px !important; }");
      }
    },	
    interfans : { // http://www.interfans.org/forum/
      host : ['interfans.org'],
      onStart : function () {
        Aak.addStyle(".ad_global_header { height: 1px !important; display: none !important; }");
      }
    },
    maxdebrideur : {
      host : ['maxdebrideur.com'],
      onStart : function () {
        Aak.addStyle(".clear + div[id] { height: 12px !important; }");
      }
    },
    topzone : {
      host : ['topzone.lt'],
      onStart : function () {
        Aak.addStyle(".forumAd { height: 1px !important; display: none !important; }");
      }
    },
    eveskunk : {
      host : ['eveskunk.com'],
      onStart : function () {
		// Disable Antiblock 1
		//Aak.addElement('div.adsbygoogle'); // dont work
		// + abp rule eveskunk.com#@#.adsbygoogle
        Aak.addStyle(".adsbygoogle { height: 5px !important; }");
		// Disable Antiblock 2
		Aak.addStyle(".container .row .col-lg-12 div[id] { height: 35px !important; }");
      },
      onLoad : function () {
		// Disable Antiblock 1
        document.querySelector('.adsbygoogle').innerHTML = '<br>';
		// Disable Antiblock 2
		unsafeWindow.trackAdBlocking = function () {};
      }
    },	
    tweaktown : {
      host : ['tweaktown.com'],
      onStart : function () {
        Aak.addStyle("#div-gpt-ad-1378071706813-0, #div-gpt-ad-1378150878492-1 { height: 3px !important; display: none !important; }");
      }
    },
    debrideurstream : {
      host : ['debrideurstream.fr'],
      onStart : function () {
        Aak.addStyle("#content div[id][align=center] { height: 12px !important; }");
      }
    },
    preemlinks : {
      host : ['preemlinks.com'],
      onStart : function () {
        Aak.addStyle("#divads { height: 1px !important; }");
      }
    },
    hentaito : {
      host : ['hentai.to'],
      onStart : function () {
        Aak.addStyle("#hentaito123 { height: 11px !important; }");
      }
    },
    prototurk : {
      host : ['prototurk.com'],
      onStart : function () {
        Aak.addStyle("#reklam { height: 1px !important; }");
      }
    },
    mufa : {
      host : ['mufa.de'],
      onStart : function () {
        Aak.addStyle("#leaderboard { height: 5px !important; }");
		Aak.addStyle("#large-rectangle { height: 5px !important; }");
		Aak.addStyle("#ad-header-468x60 { height: 5px !important; }");
      }
    },	
    watcharab : {
      host : ['watcharab.com'],
      onStart : function () {
        // + adp rule watcharab.com#@##adblock
        Aak.addStyle("#adblock { height: 5px !important; }");
      }
    },
    freedomip : {
      host : ['freedom-ip.com'],
      onStart : function () {
        Aak.addStyle(".pub_vertical ins, .pub_vertical div { height: 11px !important; }");
      }
    },
    wakanim : {
      host : ['wakanim.tv'],
      onStart : function () {
        Aak.addStyle("#detector { display: none !important; }");
        Aak.addStyle("#nopub { display: block !important; }");
      }
    },
    divIdTester : {
      host : ['osoarcade.com', 'd3brid4y0u.info', 'fileice.net', 'nosteam.ro', 'openrunner.com', 'easybillets.com', 'spox.fr', 'yovoyages.com', 'tv3.co.nz', 'freeallmusic.info', 'putlocker.com', 'sockshare.com', 'dramapassion.com', 'yooclick.com', 'filmovizija.com', 'filmovizija.net'],
      onStart : function () {
        Aak.addElement('div#tester');
      }
    },
    divIdAdd : {
      host : ['filecom.net', 'upshare.org', 'skippyfile.com', 'mwfiles.net', 'up-flow.org'],
      // @@||filecom.net/advertisement.js
      // document.write('<div id="add"></div>');
      onStart : function () {
        Aak.addElement('div#add');
      }
    },
    freegamehosting : {
      host : ['freegamehosting.nl'],
      onStart : function () {
        Aak.addElement('div#adtest');
      }
    },
    theweatherspace : {
      host : ['theweatherspace.com'],
      onStart : function () {
        Aak.addElement('div#ab-bl-advertisement');
      }
    },
    leaguesecretary : {
      // @@||teknogods.com/advert.js
      // <div id="adpbtest">;
      host : ['leaguesecretary.com', 'teknogods.com', 'hellsmedia.com'],
      onStart : function () {
        Aak.addElement('div#adpbtest');
      }
    },
    primeshare : {
      host : ['primeshare.tv'],
      onStart : function () {
        Aak.addElement('div#adblock');
      }
    },
    freesportsbet : {
      host : ['freesportsbet.com', 'sportsplays.com'],
      onStart : function () {
        Aak.addElement('div#ad-tester');
      }
    },
    jkanime : {
      host : ['jkanime.net'],
      // @@||jkanime.net/assets/js/advertisement2.js
      onStart : function () {
        Aak.addElement('div#reco');
      }
    },
    _720pmkv : {
      host : ['720pmkv.com'],
      onStart : function () {
        Aak.addElement('div#advert');
      }
    },
    chrissmoove : {
      host : ['chrissmoove.com'],
      onStart : function () {
        //Aak.addElement('div#adserver');
      }
    },	
    eventhubs : {
      host : ['eventhubs.com'],
      onStart : function () {
        Aak.addElement('div#blahyblaci1');
        unsafeWindow.clearInterval(tid);
      },
      onLoad : function () {
        unsafeWindow.clearInterval(tid);
      }
    },
    antennesport : {
      host : ['antennesport.com', 'serverhd.eu'],
      onLoad : function () { // for antennesport
        // Remove Pub
        Aak.removeElement("#pub .pubclose");
        // Redirect to Player
        document.querySelector("#pub .embed iframe").src = "/embed/embed.php";
      },
      onScript : function (e) { // for serverhd
        if (Aak.innerScript(e).contains('http://xaxa.juanantoniogonza.netdna-cdn.com/noadsblock.html')) {
          Aak.stopScript(e);
        }
      }
    },
    disableAlertbox : {
      host : ['drivearabia.com', 'putlocker.com', 'doatoolsita.altervista.org', 'sockshare.com', 'free-movie-home.com', 'pc.online143.com', 'pregen.net', 'kooora.com', 'str3amtv.co.nr', 'str3amtv.altervista.org', 'str3am.altervista.org','filecom.net', 'pipocas.tv', 'generatupremium.biz'],
      onStart : function () {
        if (typeof exportFunction == 'function') {
		  // Doc: http://tinyurl.com/k6qphme
          exportFunction(function () {}, unsafeWindow, {defineAs : "alert"});
        } else {
          unsafeWindow.alert = function () {};
        }
      }
    },
    pipocas : {
      host : ['pipocas.tv'],
      onStart : function () {
        // Also added in disableAlertbox
        // No popup
        Aak.setCookie('popup_user_login', 'yes');
      }
    },
    vgunetwork : {
      host : ['vgunetwork.com'],
      onLoad : function () {
        Aak.setCookie('stopIt', 1);
        var close = Aak.getElement('#some_ad_block_key_close');
        if (close)
          close.click();
      }
    },
    seekingalpha : {
      host : ['seekingalpha.com'],
      onLoad : function () {
        unsafeWindow.SA.Pages.Article.is_gnikcolbda = function () {
          return false;
        }
      }
    },
    anisearch : { // solved with abp rule
      host : ['anisearch.com'],
      onLoad : function () {
        //unsafeWindow.is_loaded = true;
        //Aak.removeElement('.box-error');
      }
    },
    luxyad : { // skip redirect myanimes.li
      host : ['luxyad.com'],
      onLoad : function () {
        if ('/Information.php' == location.pathname) {
          var href = location.href;
          location.href = href.substr(href.indexOf('url=') + 4, href.length);
        }
      }
    },
    userscripts : { // Redirect to Github
      host : ['userscripts.org', 'userscripts.org:8080', 'userscripts-mirror.org'],
      onStart : function () {
        if (/155840$/.test(location.pathname)) {
          location.href = Aak.homeURL;
        }
      }
    },
    openuserjs : { 
      host : ['openuserjs.org'],
      onLoad : function () {
        var element = Aak.getElement('a[href$="/issues"]');
        if (/Anti-Adblock_Killer_Reek/.test(location.pathname) && element) {
          Aak.confirmReport(element);
        }
      }
    },
    greasyfork : { 
      host : ['greasyfork.org'],
      onLoad : function () {
        var element = Aak.getElement('a[href$="/feedback"]');
        if (/-anti-adblock-killer-reek/.test(location.pathname) && element) {
          Aak.confirmReport(element);
        }
      }
    },
    monkeyguts : { 
      host : ['monkeyguts.com'],
      onLoad : function () {
        var element = Aak.getElement('a[href*="code.php?nav=forum"]');
        if (/monkeyguts.com\/code.php\?id=351/.test(location.href) && element) {
          Aak.confirmReport(element);
        }
      }
    },
    aidemu : {
      host : ['aidemu.fr'],
      onStart : function () {
        Aak.setCookie('adblockPopup', true);
      }
    },
    eami : {
      host : ['eami.in'],
      onStart : function () {
        Aak.setCookie('ad_locked', 1);
      },
      onLoad : function () {
        Aak.setCookie('ad_locked', 1);
      }
    },
    bitcoiner : {
      host : ['bitcoiner.net'],
      onLoad : function () {
        // Remove notice
        Aak.removeElement('#adblock-info');
        // Skip timer
        var btSend = Aak.getElement('#submit');
        if (btSend) {
          btSend.setAttribute('disabled', false);
          btSend.setAttribute('value', 'Send!');
        }
      }
    },
    bigdownloader : {
      host : ['bigdownloader.com'],
      onLoad : function () {
        Aak.removeElement('#anti_adblock');
      }
    },
    gametrailers : {
      host : ['gametrailers.com'],
      onLoad : function () {
        Aak.removeElement('#ad_blocking');
      }
    },
    raitv : {
      host : ['rai.tv'],
      onStart : function () {},
      onLoad : function () {}
    },
    filmovizija : { // many changes
      host : ['filmovizija.com', 'filmovizija.net'],
      onStart : function () {
	    // code are obfuscated
        Aak.setCookie('ipsos', 0);
      },
      onLoad : function () {
        Aak.setCookie('ipsos', 0);
		//Aak.removeElement('body div[style*="position: fixed"]');
      }
    },
    clubedohardware : { // two antiadblock
      host : ['clubedohardware.com.br'],
      onStart : function () {
        if (location.host.contains('forum')) {
          // Solution 1
		  Aak.addStyle("#banner, script { height: 51px !important; }");
          Aak.addElement('div#banner');
        } else { // Website
          // Solution 1
          Aak.addElement('div.banner_topo');
        }
      },
      onLoad : function () {
        if (location.host.contains('forum')) {
          // Solution 2
          unsafeWindow.addBlocking.hide();
          unsafeWindow.addBlocking.kill();
        } else { // Website
          // Solution 2
          document.body.id = '';
          Aak.removeElement('.adblock');
        }
      }
    },
    debrastagi : {
      host : ['debrastagi.com'],
      onLoad : function () {
        Aak.removeElement('#stp-main');
        Aak.removeElement('#stp-bg');
      }
    },
    rapidebrideur : {
      host : ['rapidebrideur.com'],
      onStart : function () {
        Aak.addStyle("html body div.container-fluid div.row-fluid div.span9 div div[id] { height: 12px !important;  display: block  !important; }");
      },
      onScript : function (e) {
        if (Aak.innerScript(e).contains('window.location = "../pages/adblock.html";')) {
          Aak.stopScript(e);
        }
      }
    },
    blockblockA : { // Solution was also added to AAK-Filters
      // http://sport-show.fr/js/advertisement-AdBlock.js
      // http://www.2site.me/advertisement-AdBlock.js
      host : ['sport-show.fr', 'vipflash.net', '2site.me'],
      onStart : function () {
        Aak.addStyle("#blockblockA {visibility:invisible!important;display:none!important;}#blockblockA td {visibility:invisible!important;display:none!important;}#blockblockA td p {visibility:invisible!important;display:none!important;}#blockblockB {visibility:visible!important;display:block!important;}");
      }
    },
    megadebrid : {
      host : ['mega-debrid.eu'],
      onStart : function () {
        unsafeWindow.alert = false;
      },
      onLoad : function () {
        // Activate button debrid
        var realbutton = Aak.getElement('.realbutton');
        if (realbutton) {
          realbutton.setAttribute('onclick', '');
          realbutton.setAttribute('type', 'submit');
        }
      }
    },
    bokepspot : {
      host : ['bokepspot.com'],
      onStart : function () {
        // Hide Disclaimer
        Aak.setCookie('hideDialog', 'hide');
      },
      onLoad : function () {
        // Remove Disable AdBlock
        Aak.removeElement('#tupiklan');
      }
    },
    picload : {
      host : ['picload.org'],
      onStart : function () {
        Aak.setCookie('pl_adblocker', false);
      },
      onLoad : function () {
        unsafeWindow.ads_loaded = true;
        unsafeWindow.imageAds = false;
        Aak.removeElement('div[oncontextmenu="return false;"]');
      }
    },
    freezedownload : {
      host : ['freezedownload.com'],
      onLoad : function () {
        if (/freezedownload.com\/download\//.test(location.href)) {
          Aak.removeElement('body > div[id]');
        }
      }
    },
    rapid8 : {
      host : ['rapid8.com'],
      onLoad : function () {
        Aak.removeElement('div.backk + #blcokMzg');
        Aak.removeElement('div.backk');
      }
    },
    adfly : {
      host : ['adf.ly', 'q.gs', 'j.gs', 'u.bb', '9.bb', 'go.phpnulledscripts.com'],
      onLoad : function () {

        // Disable onbeforeunload
        unsafeWindow.onbeforeunload = false;
        unsafeWindow.onunload = false;

        var btContinue = Aak.getElement('button[id=abC]');
        var btSkip = Aak.getElement('#skip_button');

        var forcing = function () {
          if (btContinue) {
            btContinue.click();
          }
          if (btSkip && btSkip.href) {
            window.clearInterval(runSetInt)
            window.location.href = btSkip.href;
          }
        };
        var runSetInt = setInterval(forcing, 0);
        runSetInt;
      }
    },
    tvdez : {
      // (document.getElementById('pubfooter').clientHeight < 20)
      host : ['tvdez.com', 'casadossegredos.tv', 'estadiofutebol.com', 'televisaofutebol.com'],
      onStart : function () {
        Aak.addStyle("#pubfooter, #pub2 { height: 30px !important; display: block !important; }");
        Aak.setCookie("adblock", null, 0);
      },
      onScript : function (e) {
        if (Aak.innerScript(e).contains("location.href = 'adblock.php';")) {
          Aak.stopScript(e);
        }
      }
    },
    tekdomains : {
      host : ['tek.no', 'hardware.no', 'akam.no', 'teknojobb.no', 'amobil.no', 'gamer.no', 'teknofil.no'],
      onLoad : function () {
        unsafeWindow.Tek = false;
        localStorage.clear();
        sessionStorage.clear();
      }
    },
    wowhq : {
      host : ['livesoccerhq.com', 'lvshd.altervista.org', 'wowhq.ws', 'futeonline.altervista.org'],
      onLoad : function () {
        if ("http://wowhq.ws/" == location.href) {
          //location.href = 'http://futeonline.altervista.org/programacao2.php';
        } else {
          var matches = location.href.match(/link=([\w]+)/i);
          if (matches != null) {
            console.log(atob(matches[1]));
            location.href = atob(matches[1]);
          }
        }
      }
    },
    privateinsta : {
      host : ['privateinsta.com'],
      onLoad : function () {
		// + abp rule
		unsafeWindow.dont_scroll = false;
        Aak.removeElement("#overlay_div");
		Aak.removeElement("#overlay_main_div");
      }
    },
    str3amtv : { // remove ads + popupwindow
      host : ['str3amtv.com', 'futhd[0-9].blogspot.com', 'futstream[0-9].altervista.org'],
      onLoad : function () {
	    // Remove float ads
        Aak.removeElement('div[id^="floatLayer"]');
        // Open in new tab no in new window
		var anchors = document.querySelectorAll('a[onclick^="window.open"]');
		for (i in anchors) {
		  var anchor = anchors[i];
		  var code = anchor.onclick.toString();
		  var href = code.substring(code.indexOf("'") + 1, code.indexOf(",") - 1);
		  console.log(href);
		  anchor.href = href;
		  anchor.onclick = null;
		  anchor.target = '_blank';
		}
      }
    },
    risikogesundheit : {
      host : ['risiko-gesundheit.de'],
      onLoad : function (e) {
        setTimeout(function () {
          window.stop();
        }, 5000);
      }
    },	
    prozik : {
      host : ['pro-zik.ws', 'pro-tect.ws', 'pro-ddl.ws', 'pro-sport.ws'],
      onStart : function () {
        Aak.setCookie('visitedf', true);
        Aak.setCookie('visitedh', true);
      }
    },	
    adscendmedia : {
      host : ['adscendmedia.com'],
      onStart : function () {
        // adscendmedia - https://www.adscendmedia.com/
		var ref = document.createElement('a');
              ref.href = document.referrer;
		var host = location.host;
		var path = location.pathname;
        if (path.contains('/widget_adblock.php') && !ref.host.contains(host)) {
          // Auto report
          Aak.autoReport('Adscendmedia', ref.host, host);
		  // Notification
		  Aak.notification('You must subscribe to Anti-Adblock Killer - Filters for Adblockers. <a href="' + Aak.filtersSubscribe + '" target="_blank">Subscribe Now !</a>, ', 20000);
        }
      }
    },	
    adworkmedia : {
      host : ['adworkmedia.com', 'loxtk.com', 'contentlockingnetworks.com'],
      onStart : function () {
        // AdWorkMedia - https://www.adworkmedia.com/
		var ref = document.createElement('a');
              ref.href = document.referrer;
		var host = location.host;
		var path = location.pathname;
        if (path.contains('/help/removeAB.php') && !ref.host.contains(host)) {
          // Auto report
          Aak.autoReport('Adworkmedia', ref.host, host);
		  // Notification
		  Aak.notification('You must subscribe to Anti-Adblock Killer - Filters for Adblockers. <a href="' + Aak.filtersSubscribe + '" target="_blank">Subscribe Now !</a>, ', 20000);
        }
      }
    },
    adworkmediasurvey : { // experimental
      host : ['phone-track.net', 'netflixaccount.org', 'watchmovies.just4umedia.com', 'mol.cheatsplanet.net', 'vinestown.com', 'xtreme-downloads.com', 'freevps-hosting.com', 'oneplusoneinvite.blogspot.com', 'fullmovieshd.org', 'timepasss.com', 'miningbeast.com', 'broadcastpuma.co', 'thehyphy.com', 'download-site.org', 'mymobileappz.com', 'garena.cheatsplanet.net', 'full-software-downloads.info', 'amazing-web-host.com', 'watchtvserieonlinehd.blogspot.com', 'watch-latest-movies-online-daily.blogspot.com', 'thecompletewebs.info', 'xpango.com-cheat.in', 'yourepeat.net', 'fullsoftwaredownload.info', 'mypcgamesfreedownload.blogspot.com', 'b-books.info', 'freeudidregistration.com'],
      onLoad : function () {
        /*
        Dont work:
        debrideurgratuit.org, ndsroms.altervista.org, pickcrackpasswords.blogspot.com, codespsngratuits.com

		http://www.rushinformation.com/how-to-bypass-surveys-online/
		
		They allow survey bypass for all the major hosts like Sharecash,Fileice,Cleanfiles,cash-file,Adwork media,File fire,File flare,Dengee and uploadable
         */

        // Survey 
        var iframes = document.querySelectorAll('iframe[src*="/gTemplate.php"]');
        //console.log(iframes.length,iframes);

        if (iframes.length) {

          // Neutralize Survey functions
          for (i in unsafeWindow) {
            var fn = unsafeWindow[i];
            // Parse all no native functions
            if (typeof fn == 'function' &&
              !/native/.test(fn.toString())) {

              // Disable dynamic functions
              if (/_\d+$/.test(i)) {
                //console.log(i);
                unsafeWindow[i] = function () {};
              }
              // Disable the functions that prevents the removal of the iframe
              else if (/location.reload/.test(fn.toString())) {
                //console.log(i);
                unsafeWindow[i] = function () {};
              } // Disable static functions
              else if (/^(mscrollToTop|scrollToTop|gLoad_split_|gLoad|LockPage|noScrollIE|noScrollNS)$/.test(i)) {
                //console.log(i);
                unsafeWindow[i] = function () {};
              }
            }
          }

          // Unlock page
          unsafeWindow.onbeforeunload = "";
          document.body.scroll = "yes";
          document.body.style.overflow = 'scroll'

            // Remove Survey Elements
            for (var i = 0; i < iframes.length; i++) {
              var iframe = iframes[i];
              var container = iframe.parentNode;
              var overlay = container.previousSibling;
              //console.log(i, iframe, container, overlay);

              Aak.removeElement(overlay);
              Aak.removeElement(container);
            }
        }
      }
    },
    // --------------------------------------------------------------------------------------------
    // Players
    // --------------------------------------------------------------------------------------------
    kissanime : { // fixed 2014.08.11
      host : ['kissanime.com'],
      onStart : function () {
        // Solution 2
        unsafeWindow.DoDetect2 = null;
      },
      onLoad : function () {

        // Solution 3 abp rule
        // @@||kissanime.com^$elemhide

        if (/id=[\d]+$/.test(location.href)) {

          var divContentVideo = document.querySelector('#divContentVideo');

          // Solution 1
          if (unsafeWindow.DoDetect2) {
            unsafeWindow.DoDetect2 = null;
            Aak.removeElement('iframe[id^="adsIfrme"], .divCloseBut');
            console.log('1');
          } //Solution 2
          else if (divContentVideo) {

            var divDownload = document.querySelector('#divDownload').cloneNode(true);
            //console.log(divDownload,divContentVideo);

            setTimeout(function () {
              divContentVideo.innerHTML = '';
              unsafeWindow.DoHideFake();
              divContentVideo.appendChild(divDownload);
              Aak.removeElement('iframe[id^="adsIfrme"], .divCloseBut');
              console.log('2');
            }, 5500);
          }
        }
      }
    },	
	rmcsportbfmtv : { // webradio
      host : ['rmcsport.bfmtv.com'],
      onLoad : function () {

        var flashvars = {
          urlRadio : "http://mp3lg4.tdf-cdn.com/10160/rmc.mp3",
          nom : "live",
          categorie : "live",
          urlSmart : "" // set empty to remove audio ad
        };
        var params = {
          wmode : "transparent"
        };

        unsafeWindow.swfobject.embedSWF("/swf/RMCLIVE.swf", "liveplayer", "70", "90", "10.0.0", "", flashvars, params);

      }
    },
    eclypsia : {
      host : ['eclypsia.com'],
      onLoad : function () {
	  /*
        //http://www.dailymotion.com/swf/video/x1tayy1
        var element = document.querySelector('div[id^="webtv_iframe_"]');
        if (element) {
          var videoId = element.id.split('_')[2];
		  setTimeout(function () {
          element.innerHTML = '<iframe frameborder="0" width="812" height="500" src="http://www.dailymotion.com/embed/video/' + videoId + '?logo=0&autoPlay=1&autoMute=0"></iframe>';
        }
		},1000);
	  */
      }
    },
    channel4 : { // research solution
      host : ['channel4.com'],
      onLoad : function () {
    /*
        var player = document.querySelector("#catchUpPlayer");
        var parent = player.parentNode;
        var clone = player.cloneNode(true);

        // change flashvars
        var flashvars = clone.querySelector('param[name="flashvars"]');
        //flashvars.value = flashvars.value.replace(/true/g, false);
        //flashvars.value = 'preSelectAsset=3719760&amp;overRideIA=true';
        // replace player
        //parent.replaceChild(clone, player);

		document.querySelector("#catchUpPlayer").parentNode.innerHTML='<object width="600" height="500" type="application/x-shockwave-flash" id="catchUpPlayer" data="/static/programmes-flash/swf/4odplayer-11.81.swf"><param name="align" value="top"><param name="scale" value="noscale"><param name="salign" value="lt"><param name="allowFullScreen" value="true"><param name="bgcolor" value="#000000"><param name="allowScriptAccess" value="always"><param name="wmode" value="opaque"><param name="flashvars" value="preSelectAsset=3730066&amp;overRideIA=false&amp;extrasContractIDs=53083&amp;afterLogin=C4.My4oD.Controller.onFlashLogin&amp;lst=1"></object>';
		*/
      //  console.log(Aak.getElement('#catchUpPlayer param[name="flashvars"]'));

      }
    },	
	abola : {
      host : ['miragens.abola.pt'],
      onLoad : function () {
        // miragens.abola.pt/media.aspx?id=20390&op=2&p=1
        // miragens.abola.pt/MiragensBO/uploads/20/39/0/20390.mp4

        // Fix: 9.6.2014 (new player)
        if ('/media.aspx' == location.pathname) {
          var id = location.href.match(/media.aspx[?]id=([\d]+)/)[1];
          var path = id.match(/.{1,2}/g).join('/');
          var file = 'http://www.miragens.abola.pt/MiragensBO/uploads/' + path + '/' + id + '.mp4';

          Aak.player('jwplayer5', 'videoplayer', {
            skin : 'lulu',
            file : file,
            autostart : true,
            width : 554,
            height : 311
          });

        }
      }
    },
    tvcatchup : { // research solution
      host : ['tvcatchup.com'],
      onStart : function () {
	    // + abp rule
        //Aak.setCookie('ad-block-counter', 0);
      },
      onLoad : function () {
        //Aak.setCookie('ad-block-counter', 0);
/*
		var ch = {
		'1':'bbcone',
		'2':'bbctwo',
		'3':'itvone',
		'4':'chan4',
		'5':'five'		
		}
		
		var number = location.pathname.split('/')[2];

		var setup = { // jwv6 rtmp
		  file : "http://tvcatchup-live.hls.adaptive.level3.net/tvcatchup-201/smil:"+ch[number]+"_desk_wifi.smil/playlist.m3u8",
		  autostart : true,
		  live: true,
		  primary : 'flash'
		};
*/

      }
    },
    hqqtv : { // putlocker.is
      host : ['hqq.tv'],
      onLoad : function () {
       // + abp rule
       // http://hqq.tv/player/embed_player.php?vid=R3DGHG3GKXX7&autoplay=no
	   if ('/player/embed_player.php' == location.pathname) {
          document.querySelector('form[id^="form-"]').submit();
        }
      }
    },
    voxnow : {
      host : ['voxnow.de', 'rtl-now.rtl.de', 'rtl2now.rtl2.de', 'n-tvnow.de', 'superrtlnow.de', 'rtlnitronow.de'],
      onLoad : function () {

        var player = document.querySelector("#videoplayer");
        var parent = player.parentNode;
        var clone = player.cloneNode(true);

        // change flashvars
        var flashvars = clone.querySelector('param[name="flashvars"]');
        flashvars.value = flashvars.value.replace('abcheck_enabled=1', 'abcheck_enabled=0');

        // replace player
        parent.replaceChild(clone, player);

      }
    },
    playtv : {
      host : ['play.tv', 'playtv.fr'],
      onLoad : function () {

        unsafeWindow.ppl.vars.redirect = function () {};

        var channel = unsafeWindow.ptv.Data.Remote.channel;

        if (typeof channel == 'object' && location.pathname.contains(channel.alias)) {

          // When pathname change
          setInterval(function () {
            if (!location.pathname.contains(channel.alias)) {
              location.reload();
            } else if (location.pathname.contains('adblock')) {
              window.stop();
            }
          }, 1000);

          var timestamp = new Date().getTime();
          var rand = Math.random().toString().slice(2, 18);
          var container = document.querySelector(".notice-adb-container");
          var url = 'http://tvplayer.play.tv/config/?callback=jQuery' + rand + '_' + timestamp + '&id=' + channel.tvplayer_id + '&appzone=desktop.playtv&_=' + timestamp;
          console.log(channel, url, timestamp, rand);

          GM_xmlhttpRequest({
            method : "GET",
            url : url,
            headers : {
              "User-Agent" : navigator.userAgent
            },
            onload : function (response) {
              var res = response.responseText;
              //console.log(response);

              /* Dont works :(
              var json = res.substr(res.indexOf('{'), res.lastIndexOf('}'));
              console.log(json);
              var obj = JSON.parse(json);
              console.log(obj);
               */

              var a = res.match(/"a":"([a-z0-9]+)/)[1];
              var b = res.match(/"b":"([a-z0-9]+)/)[1];
              //console.log(a, b);

              container.innerHTML = '<object title="' + channel.alias + '" width="610" height="384" id="' + channel.tvplayer_id + '" name="' + channel.tvplayer_id + '" type="application/x-shockwave-flash" data="http://tvplayer.play.tv/swf/tvplayer259.swf"><param name="allowfullscreen" value="true"><param name="allowscriptaccess" value="always"><param name="quality" value="high"><param name="wmode" value="transparent"><param name="flashvars" value="controls=1&amp;background=1579032&amp;esms=playtv.fr&amp;report=http://play.tv/aide/support/&amp;bwt=/aide/bandwidth/&amp;volume_cookie=true&amp;caching=true&amp;a=' + a + '&amp;b=' + b + '&amp;islow=0&amp;iefa=1"></object>';
            }
          });
        }
      }
    },
    myspass : {
      host : ['myspass.de'],
      onLoad : function () {

        var videoid = location.pathname.match(/\/(\d+)\/$/);

        if (videoid != null) {

          GM_xmlhttpRequest({
            method : "GET",
            url : 'http://www.myspass.de/myspass/includes/apps/video/getvideometadataxml.php?id=' + videoid[1],
            headers : {
              'User-agent' : navigator.userAgent,
              'Content-Type' : 'application/xml',
            },
            onload : function (result) {
              var res = result.responseText;
              //console.log(res);
			  
			  // Get video
              var parser = new DOMParser();
              var dom = parser.parseFromString(res, "application/xml");
              var file = dom.getElementsByTagName("url_flv").item(0).textContent;

			  // Remove elements
              Aak.removeElement('div.loadingGif');
			  
			  // New player
              Aak.player('jwplayer5', 'player', {
			    skin: 'lulu',
                file : file,
                autostart : true,
                width : 640,
                height : 360
              });

            }
          });
        }
      }
    },
    tvn24 : {
      host : ['tvn24.pl'],
      onEnd : function () {
	    // + abp rules
        setTimeout(function () {
          var players = document.querySelectorAll('object[data*="adServerURL"]');
          //console.log(players);
		  
          if (typeof players != 'undefined') {
            for (var i = 0; i < players.length; i++) {
              var player = players[i];
              var parent = player.parentNode;
              var clone = player.cloneNode(true);
              // change flashvars
              clone.data = clone.data.replace('adServerURL', 'fakeURL');
              // replace player
              parent.replaceChild(clone, player);
            }
          }
        }, 2000);
      }
    },	
    ilive : {
      host : ['ilive.to'],
      onLoad : function () {
        if (/^\/embedplayer.php/i.test(location.pathname)) {
		  // Skip timer
          var close = setInterval(function () {
              document.querySelector("#ad_overlay_close").click();
            }, 1000);

          setTimeout(function () {
            clearInterval(close);
          }, 5000);
        }
      }
    },
    sawlive : {
      host : ['sawlive.tv'],
      onLoad : function () {
        if (/^\/embed\/watch\//i.test(location.pathname)) {
          // Skip timer and close ads
          unsafeWindow.display = false;
          unsafeWindow.closeMyAd();
        }
      }
    },
    sharecast : {
      host : ['sharecast.to'],
      onLoad : function () {
        if (/^\/embed.php/i.test(location.pathname)) {
          
		  // Disable popunders
          var interval = setInterval(function () {
              Aak.setCookie('vid_main', true);
              Aak.setCookie('vid_sub', true);
              Aak.setCookie('vid_delay', true);
            }, 100);

          setTimeout(function () {
            clearInterval(interval);
          }, 5000);

		  // Remove transparent overlay
		  Aak.removeElement('#table1');
        }
      }
    },
    flowplayer : {
      host : ['videofun.me', 'videobug.net', 'video44.net', 'play44.net', 'byzoo.org'],
      onLoad : function () {
	    // + abp rule for hide antiadblock message
		// http://videofun.me/embed/f471ef96b0247884bc1c6fda2d37c4da?w=790&h=410
        if (/^\/embed/.test(location.pathname)) {
		  setTimeout(function () {
            var player = document.querySelector("#flowplayer_api");
            var parent = player.parentNode;
            var clone = player.cloneNode(true);
            clone.querySelector('param[name="allowfullscreen"]').value = true;

            // Replace player
            parent.replaceChild(clone, player);
          }, 1000);
        }
      }
    },
    // --------------------------------------------------------------------------------------------
    // Firefox
    // --------------------------------------------------------------------------------------------
    yellowbridge : {
      host : ['yellowbridge.com'],
      onStart : function () {
        unsafeWindow.finalizePage = function () {return;};
      },
      onLoad : function () {
        unsafeWindow.finalizePage = function () {return;};
      },
      onScript : function (e) {
        if (Aak.innerScript(e).contains('finalizePage()')) {
          Aak.stopScript(e);
        }
      }
    },
    gamespowerita : {
      host : ['gamespowerita.com'],
      onScript : function (e) {
        if (Aak.innerScript(e).contains('(document.getElementById("test" + id_2).style.height < 1)') || Aak.innerScript(e).contains('if(typeof(window.google_jobrunner)=="undefined" || document.getElementById("test" + id_2).style.height < 1)') || Aak.innerScript(e).contains('if(typeof(window.google_jobrunner)=="undefined")')) {
          Aak.stopScript(e);
        }
      }
    },
    sporttvdireto : { // bug auto redirect loop
      host : ['sporttvdireto.com', 'tvdesporto.com'],
      onStart : function () {
        // this solution dont works
        // document.getElementById('ads1').clientHeight < 20
        Aak.addElement('div#ads1');
        Aak.addStyle("#ads1 { height: 30px !important; }");
      },
      onScript : function (e) {
        if (Aak.innerScript(e).contains('location.href = \'http://tvdesporto.com/chorar.php\';')) {
          Aak.stopScript(e);
        }
      }
    },
    zeb89 : {
      host : ['zeb89.altervista.org'],
      // greasemonkey/addons4.js
      onScript : function (e) {
        if (Aak.innerScript(e).contains('typeof GM_addonsStartup !== "undefined"')) {
          Aak.stopScript(e);
        }
      }
    },
    // --------------------------------------------------------------------------------------------
    // Generic
    // --------------------------------------------------------------------------------------------
    generic : {
      host : ['.*?'],
      //onRemove : function (removedNode) {console.log(removedNode);},
	  //onSubtreeModified : function (e) {console.log(e.target);},
      onStart : function () {
         // do nothing
      },
      onLoad : function () {

        /* Alternative solution
		// AntiAdblock (Packer) only Zdxd
		if (typeof unsafeWindow.k == 'function' &&
		  typeof unsafeWindow.h == 'function' &&
		  typeof unsafeWindow.ShowAdbblock == 'function' &&
		  unsafeWindow.ShowAdbblock.toString().contains('warningMessage.innerHTML=text_detected()')) {

		  // Disable
		  unsafeWindow.ShowAdbblock = function () {return;};
		  unsafeWindow.k = function () {return;};
		  unsafeWindow.h = function () {return;};
		  Aak.autoReport('AntiAdblockPackerZdxd)');
		}
		*/
		
		/*
		// Adunblock - http://adunblock.com/
	    if (Aak.getCookie('adblock') == 1) {
		  Aak.setCookie('adblock', 0);
		  Aak.setCookie('bar_closed', 1);
		}
	   */
	  
        // Better Stop Adblock
        //unsafeWindow.audio_file = false;
		
		
		// AdBlock Alerter (WP)
		if (Aak.getElement('div.adb_overlay') &&
		  Aak.getElement('div.adb_modal') &&
		  Aak.getElement('p.adb_detected')) {
		  // Remove Alert + Allow Scroll
		  Aak.removeElement('div.adb_overlay');
		  Aak.addStyle('html,body {height:auto !important; overflow: scroll !important;}');
		  Aak.autoReport('AdBlockAlerter');
		}


		// Unknow Anti AdBlock system
		if (Aak.getElement('#blockdiv') && Aak.getElement('#blockdiv').innerHTML.contains('disable ad blocking or use another browser without any adblocker when you visit')) {
		  Aak.removeElement('#blockdiv');
		}


        // Antiblock - http://antiblock.org/
        localStorage.antiblockId = false;
        var styles = document.querySelectorAll('style');
        for (var i in styles) {
          var style = styles[i];
          //console.log(style); 
          if (typeof style == "object") {
            var css = style.innerHTML.replace(/[\n\r\t\s]+/g, "");
            var matches = css.match(/#([0-9a-z]{4,10})\{.*position:fixed\!important;.+document\.documentElement.scrollTop\?document\.documentElement\.scrollTop:document\.body\.scrollTop.+\}#/i);
            if (matches != null && matches.length == 2) {
              //console.log(matches);
              localStorage.antiblockId = matches[1];
            }
          }
        }
		
        // Anti-Adblockers
		var systems = {
		  // Plugins WordPress
          'NoAdblock' : '(/plugins/no-adblock/|/blockBlock/blockBlock.jquery.js)',
		  'WordPressAdBlockBlocker':'/plugins/wordpress-adblock-blocker/', 
		  'AntiBlockBukssaAyman':'/plugins/anti-block/',
		  'BlockAlyzer':'/plugins/blockalyzer-adblock-counter/',
		  'AdBlockingDetector':'/plugins/ad-blocking-detector/',
		  // Plugins Website
		  'Adworkmedia' : '(adworkmedia|loxtk|contentlockingnetworks).com/gLoader.php',
		  'Adscendmedia' : 'adscendmedia.com/gwjs.php',
		  'FuckAdBlock' : '/fuckadblock.js',
		  'jQueryAdblock' : '/jquery.adblock.js',
		  'jQueryAdblockDetector' : '/jquery.adblock-detector.js',
		  'AdvertisementJs' : '/advertisement.js',
		  'AdvertisementJsMin' : '/advert.js',
		  'AdvertisementJsSuffix' : '/advertisement([0-9]+|[\-._][a-z0-9]+)\.js',
		  'AdframeJs' : '/adframe.js',
		  'AntiAdBuster' : '/anti-ad-buster.js',
		  'RTKAntiAdblock' : '/blockcake.js',
		  'AdblockDetector' : '/AdblockDetector/handler.min.js',
		  'jQueryAntiAdsBlock': '/jquery.antiadsblock.js',
		  'Adbuddy' : '/js/adbuddy.min.js',
		  'AntiADsBlocker' : '/aadb/script.js'
		}
		var scripts = document.scripts;
		for (var i = 0; i < scripts.length; i++) {
		  var script = scripts[i];
		  if (script.src) {
		    for (key in systems) {
		      if (new RegExp(systems[key],'i').test(script.src)) {
		        //console.log(key, location.host, script.src);
				Aak.autoReport(key, location.host, script.src);
				break;
		      }
		    }
		  }
		}
		
      },
      onInsert : function (insertedNode) {

        // All Nodes
        //console.log(insertedNode);

        // AntiAdblock (Packer)
        var reIframeId = /^(zd|wd)$/;
        var reImgId = /^(xd|gd)$/;
        var reImgSrc = /\/ads\/banner.jpg/;
        var reIframeSrc = /(\/adhandler\/|\/adimages\/)/;

        // Communs
        if (insertedNode.id &&
          reImgId.test(insertedNode.id) &&
          insertedNode.nodeName == 'IMG' &&
          reImgSrc.test(insertedNode.src) ||
          insertedNode.id &&
          reIframeId.test(insertedNode.id) &&
          insertedNode.nodeName == 'IFRAME' &&
          reIframeSrc.test(insertedNode.src)) {

          // Variant 1
          if (insertedNode.id == 'xd') {
            Aak.autoReport('AntiAdblockPackerZdxd', false, location.href);
          } // Variant 2
		  else if (insertedNode.id == 'gd') {
            Aak.autoReport('AntiAdblockPackerWdgd', false, location.href);
          }
          // Remove
		  //console.log(insertedNode);
          Aak.removeElement(insertedNode);
        }

		
        // Adunblock - http://adunblock.com/
        var reId = /^[a-z]{8}$/;
        var reClass = /^[a-z]{8} [a-z]{8}$/;
		var reBg = /^[a-z]{8}-bg$/;
        var reStyle = /top: -?[\d]+px; opacity: [\d]; visibility: visible;/;
        var reMessage = /Il semblerait que vous utilisiez un bloqueur de publicité !/;

		// Communs
		if (typeof unsafeWindow.vtfab != 'undefined' &&
		  typeof unsafeWindow.adblock_antib != 'undefined' &&
		  insertedNode.parentNode &&
		  insertedNode.parentNode.nodeName == 'BODY' &&
		  insertedNode.id &&
		  reId.test(insertedNode.id) &&
		  insertedNode.nodeName == 'DIV' &&
		  insertedNode.nextSibling &&
		  insertedNode.nextSibling.className &&
		  insertedNode.nextSibling.nodeName == 'DIV') {

		  // Full Screen Message (Premium)
		  // <div id="lfyhsvdq" class="tvwnoqdf svonexrk" style="top: 100px; opacity: 1; visibility: visible;">
		  // <div class="tvwnoqdf-bg" style="display: block;"></div>
		  if (insertedNode.className &&
		    reClass.test(insertedNode.className) &&
		    reBg.test(insertedNode.nextSibling.className) &&
		    insertedNode.nextSibling.style &&
		    insertedNode.nextSibling.style.display != 'none') {

		    // Remove Message
		    Aak.autoReport("AdUnBlockPremium");
		    Aak.removeElement(insertedNode.nextSibling); // overlay
		    Aak.removeElement(insertedNode); // box
		  }
		  // Top bar Message (Free)
		  // <div id="vixmgrly">
		  // <div id="mfnhaiyx" class="lkrnvbyt">
		  else if (insertedNode.nextSibling.id &&
		    reId.test(insertedNode.nextSibling.id) &&
		    reMessage.test(insertedNode.innerHTML)) {

		    // Remove Message
		    Aak.autoReport("AdUnBlockFree");
		    Aak.removeElement(insertedNode);
		  }
		}
		

        // Antiblock - http://antiblock.org/
        var reId = /^[a-z0-9]{4,10}$/i;
        var reTag1 = /(div|span|b|i|font|strong|center)/i;
        var reTag2 = /[abisuqp]{1}/i;
        var reWords1 = /ad blocker|ad block|ad-block|adblocker|ad-blocker|adblock|bloqueur|bloqueador|Werbeblocker|adblockert|آدبلوك بلس/i;
        var reWords2 = /disable|désactivez|désactiver|desactivez|desactiver|desative|desactivar|desactive|desactiva|deaktiviere|disabilitare|απενεργοποίηση|запрещать|állítsd le/i;
		

        // Communs
        if (insertedNode.parentNode &&
		  insertedNode.parentNode.nodeName == 'BODY' &&
		  insertedNode.id &&
          insertedNode.style &&
          insertedNode.firstChild &&
		  !insertedNode.firstChild.id &&
		  !insertedNode.firstChild.className &&
          reId.test(insertedNode.id) &&
          reTag1.test(insertedNode.nodeName) &&
          reTag2.test(insertedNode.firstChild.nodeName)) {
          //console.log(insertedNode);

		  
          // Antiblock.org v3 + Fork
           if (insertedNode.firstChild.firstChild &&
            insertedNode.firstChild.firstChild.nodeName == "IMG" &&
            typeof unsafeWindow[insertedNode.id] == 'object' &&
            typeof unsafeWindow[insertedNode.id].displayMessage == 'function') {

            // Better Stop Adblock
            // Demo: http://codeclan.altervista.org/
            if (typeof unsafeWindow[insertedNode.id].toggle == 'function') {
			  var childs = document.body.childNodes;
              for (var i = 0; i < childs.length; i++) {
                var child = childs[i];
                if (child.nodeType == 1 && child.style.display == 'none') {
                  child.style.display = ''; // show
                  //console.log(node);
                }
              }
			  Aak.autoReport('BetterStopAdblock');
            }
			// Antiblock.org v3
			else { 
			  Aak.autoReport('Antiblock3');
            }
			// Disable
            //console.log(insertedNode, unsafeWindow[insertedNode.id]);
            Aak.removeElement(insertedNode);
            unsafeWindow[insertedNode.id] = false;
          }
          // Antiblock.org v3 + v2 (Alternative Solution)
          else if (localStorage.antiblockId != false &&
            insertedNode.id == localStorage.antiblockId) {
            // V3
            if (typeof unsafeWindow[insertedNode.id] == 'object') {
              unsafeWindow[insertedNode.id] = false;
              Aak.autoReport("Antiblock3");
            } else { // V2
              Aak.autoReport("Antiblock2");
            }
            // Disable
            //console.log(insertedNode);
            Aak.removeElement(insertedNode);
          }
          // Antiblock.org v2
          else if (reWords1.test(insertedNode.innerHTML) &&
            reWords2.test(insertedNode.innerHTML)) {
            // Disable
            //console.log(insertedNode);
            Aak.autoReport("Antiblock2");
            Aak.removeElement(insertedNode);
          }
          //  Many false positive
          else {
            //Aak.removeElement(insertedNode);
          }
        }
      }
    }
  }
};


/*=====================================================
  Start
======================================================*/

  // Initialize
  Aak.init();



