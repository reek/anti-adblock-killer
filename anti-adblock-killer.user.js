// ==UserScript==
// @name Anti-Adblock Killer | Reek
// @namespace https://userscripts.org/scripts/show/155840
// @description Anti-Adblock Killer is a userscript whose functionality is removes many protections used on some website that force the user to disable the AdBlocker.
// @author Reek | reeksite.com
// @version 7.8
// @license Creative Commons BY-NC-SA
// @encoding utf-8
// @homepage https://github.com/reek/anti-adblock-killer#anti-adblock-killer--reek
// @twitter https://twitter.com/antiadbkiller
// @updateURL https://raw.githubusercontent.com/reek/anti-adblock-killer/master/anti-adblock-killer.user.js
// @downloadURL https://raw.githubusercontent.com/reek/anti-adblock-killer/master/anti-adblock-killer.user.js
// @supportURL https://github.com/reek/anti-adblock-killer/issues
// @contributionURL https://github.com/reek/anti-adblock-killer#donate
// @icon https://raw.github.com/reek/anti-adblock-killer/master/anti-adblock-killer-icon.png
// @include http*://*
// @exclude http*://*.google.*
// @exclude http*://*.yahoo.*/*
// @exclude http*://*.youtube.com/*
// @exclude http*://*.facebook.com/*
// @exclude http*://*.chromeactions.com/*
// @exclude http*://*.imgbox.com/*
// @exclude http*://*.imgur.com/*
// @exclude http*://*.reddit.com/*
// @exclude http*://*.baidu.com/*
// @exclude http*://*.wikipedia.org/*
// @exclude http*://*.linkedin.com/*
// @exclude http*://*.amazon.*/*
// @exclude http*://*.bing.com/*
// @exclude http*://*.ebay.com/*
// @exclude http*://*.pinterest.com/*
// @exclude http*://*.ask.com/*
// @exclude http*://*.live.com/*
// @exclude http*://*.msn.com/*
// @exclude http*://*.tumblr.com/*
// @exclude http*://*.microsoft.com/*
// @exclude http*://*.paypal.com/*
// @exclude http*://*.imdb.com/*
// @exclude http*://*.apple.com/*
// @exclude http*://*.ghacks.net/*
// @exclude http*://*.yandex.ru/*
// @exclude http*://*.qq.com/*
// @exclude http*://*.flickr.com/*
// @exclude http*://*.chatango.com/*
// @exclude http*://chatango.com/*
// @exclude http*://vimeo.com/*
// @exclude http*://360.cn/*
// @exclude http*://mail.ru/*
// @exclude http*://jsbin.com/*
// @exclude http*://jsfiddle.net/*
// @exclude http*://flattr.com/*
// @exclude http*://instagram.com/*
// @exclude http*://stackoverflow.com/*
// @exclude http*://youtu.be/*
// @exclude http*://twitter.com/*
// @exclude http*://t.co/*
// @exclude http*://reeksite.com/*
// @exclude http*://preloaders.net/*
// @exclude http*://tampermonkey.net/*
// @exclude http*://bufferapp.com/*
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
  Mike Howard, Shunjou, Charmine, Kierek93, George Barnard, Henry Young, Seinhor9, ImGlodar, Ivanosevitch, HomeDipo, Roy Martin, DrFiZ, Tippy, Brian Rohner, Piotr Kozica, Minesh Patel, W4rell, Tscheckoff, AdBlock Polska, AVENIR INTERNET, coolNAO, Ben

Collaborators:
  InfinityCoding, Couchy, Dindog, Floxflob, U Bless, Watilin, @prdonahue, Hoshie, 3lf3nLi3d, Alexo, Crits, Noname120, Crt32, JixunMoe, Athorcis, Killerbadger, SMed79, Alexander255, Anonsubmitter, RaporLoLpro

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

Aak = {
  name : 'Anti-Adblock Killer',
  version : '7.8',
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
  uw: unsafeWindow || window  || false,
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
    //Aak.player.dom();
    //Aak.listValues();
    //localStorage.clear();
    //Aak.log(localStorage);
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
  contains : function (string, search) {
    return string.indexOf(search) != -1;
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
          Aak.log(list[i], GM_getValue(list[i]));
        }
      }
    }
  },
  getBrowser : function () {
    var ua = navigator.userAgent;
    if (Aak.contains(ua, 'Firefox')) {
      return "Firefox";
    } else if (Aak.contains(ua, 'MSIE')) {
      return "IE";
    } else if (Aak.contains(ua, 'Opera')) {
      return "Opera";
    } else if (Aak.contains(ua, 'Chrome')) {
      return "Chrome";
    } else if (Aak.contains(ua, 'Safari')) {
      return "Safari";
    } else if (Aak.contains(ua, 'Konqueror')) {
      return "Konqueror";
    } else if (Aak.contains(ua, 'PaleMoon')) {
      return "PaleMoon"; // fork firefox
    } else if (Aak.contains(ua, 'Cyberfox')) {
      return "Cyberfox"; // fork firefox
    } else if (Aak.contains(ua, 'SeaMonkey')) {
      return "SeaMonkey"; // fork firefox
    } else if (Aak.contains(ua, 'Iceweasel')) {
      return "Iceweasel"; // fork firefox
    } else {
      return ua;
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
    if (typeof console.log === 'undefined') {
      unsafeWindow.console.log(text);
    } else {
      console.log(text);
    }
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
              Aak.log(res, status, json);

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
          //Aak.log(status, res);

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
          //Aak.log(status, res);

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
            //Aak.log(res, status);
          }
        });
      } else {
        //Aak.log('Already reported !');
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
        //Aak.log(readme);
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
        // On all statements
        if (current.onAlways) {
		  current.onAlways();// loading
		  window.addEventListener('DOMContentLoaded', current.onAlways); // interactive
		  window.addEventListener('load', current.onAlways); // complete
        }
        // Add Js / Css / Cookie
        if (current.onStart) {
          current.onStart();
        }
        // When Before Script Executed
        if (current.onBeforeScript) {
          if ('onbeforescriptexecute' in document) { // Mozilla Firefox
            window.addEventListener('beforescriptexecute', current.onBeforeScript);
          }
		  // Opera
		  // Doc: http://www.opera.com/docs/userjs/specs/
        } // When After Script Executed
        if (current.onAfterScript) {
          if ('onafterscriptexecute' in document) { // Mozilla Firefox
            window.addEventListener('afterscriptexecute', current.onAfterScript);
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
                    //Aak.log(addedNodes);
                    Array.prototype.forEach.call(mutation.addedNodes, function (addedNode) {
                      //Aak.log(addedNode);
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
                    //Aak.log(mutation.removedNodes);
                    Array.prototype.forEach.call(mutation.removedNodes, function (removedNode) {
                      //Aak.log(removedNode);
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
    if (Aak.contains(str, '.')) {
      var str = str.replace('.', ':className:');
    } else if (Aak.contains(str, '#')) {
      var str = str.replace('#', ':id:');
    }
    var arr = str.split(':');
    Aak.addScript('function() { document.documentElement.appendChild(document.createElement("' + arr[0] + '")).' + arr[1] + ' = "' + arr[2] + '"; document.querySelector("' + arr[0] + '").innerHTML = "<br>"; }');
  },
  removeElement : function (o) {
    if (o instanceof HTMLElement) {
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
    var elem = document.querySelector(selector) || false;
    if (elem) {
      return elem;
    } else {
      return false;
    }
  },
  setElement : function (selector, props) {
    var elem = Aak.getElement(selector);
    if (elem) {
      for (p in props) {
        elem.setAttribute(p, props[p]);
      }
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
  decodeURI : function (str) {
    return decodeURIComponent(str);
  },
  encodeURI : function (str) {
    return encodeURIComponent(str);
  },
  encodeHTML : function (str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  },
  decodeHTML : function (str) {
    return String(str).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
  },
  uniqid : function () {
    return 'Aak-' + Math.random().toString(36).substring(4);
  },
  allowfullscreen : function (elem, boolen) {
    var boolen = (boolen) ? boolen : true;
    if (typeof elem == 'string') {
      var elem = document.querySelector(elem);
    }

    var parent = elem.parentNode;
    var clone = elem.cloneNode(true);
    var params = clone.querySelector('param[name="allowfullscreen"]') || false;

    if (params) {
      params.value = boolen;
    }
    if (typeof clone.allowfullscreen != 'undefined') {
      clone.allowfullscreen = boolen;
    }

    // Replace
    parent.replaceChild(clone, elem);
  },
  player : { // http://tinyurl.com/pb6fthj
    in : {
      node : null,
      html : null,
      tag : null,
      parent : null
    },
    out : {
      node : null,
      html : null,
      tag : null,
      parent : null
    },
    nameplayer : 'custom',
    swfvars : null,
    options : {
      method : 'replace',
      output : 'embed'
    },
    flashvars : {
      str : null,
      obj : {}
    },
    attributes : {
      wmode : 'opaque',
      quality : 'high',
      bgcolor : '#000000',
      type : 'application/x-shockwave-flash',
      pluginspage : 'http://www.adobe.com/go/getflash',
      allowscriptaccess : 'always', // never / always
      allowfullscreen : true
    },
    dom : function () {
      GM_registerMenuCommand(Aak.name + ' ' + Aak.getVersion() + ' swfobjects', function () {
        var elems = document.querySelectorAll('embed,object');
        for (var i = 0; i < elems.length; i++) {
          this.custom(elems[i]);
          this.log();
        }
      });
    },
    get : function (element) {

      if (element instanceof HTMLElement) {
        this.in.node = element;
      } else if (typeof element == 'string') {
        if (/^[#\.]/.test(element)) {
          this.in.node = document.querySelector(element);
        } else {
          this.in.node = document.getElementById(element);
        }
      } else {
        throw 'Not object or embed player or invalid selector';
      }

      this.in.html = this.getHtml(this.in.node);
      this.in.parent = this.in.node.parentNode;
      this.in.tag = this.in.node.tagName;

      this.attributes.id = this.attributes.name = Aak.uniqid();
      this.attributes.height = this.in.node.height || this.in.node.clientHeight || '100%';
      this.attributes.width = this.in.node.width || this.in.node.clientWidth || '100%';

      if (/^(object|embed)$/i.test(this.in.tag)) {

        //
        this.attributes.src = this.in.node.src || this.in.node.data || false;
        this.flashvars.str = this.in.node.flashvars || this.in.node.querySelector('param[name="flashvars"]') && this.in.node.querySelector('param[name="flashvars"]').value || false;
        var swfvars = !this.flashvars.str && this.in.node.data && this.in.node.data.split('?', 2) || false;

        //
        if (swfvars) {
          this.attributes.src = swfvars[0];
          this.flashvars.str = swfvars[1];
        }

        this.splitVars();
        this.joinVars();
      }
      //Aak.log(this);
    },
    custom : function (element, attributes, flashvars, options) {

      //
      this.get(element);

      //
      if (typeof attributes == 'object') {
        this.mergeObj(this.attributes, attributes);
      }

      //
      if (typeof flashvars == 'object') {
        if (flashvars.set) {
          this.setVars(flashvars.set);
        }
        if (flashvars.remove) {
          this.removeVars(flashvars.remove);
        }
      }

      //
      if (typeof options == 'object') {
        if (options.method) {
          this.options.method = options.method;
        }
        if (options.output) {
          this.options.output = options.output;
        }
      }

      this.insert();
      //Aak.log(this);
    },
    log : function (a) {
      var a = (a) ? a : '';
      Aak.log('Aak.player ' + a + ' --> ', this);
    },
    addDownloadBtn : function () {
      var btn = document.createElement("p");
      btn.innerHTML = '<strong>Video: </strong> <a href="' + this.attributes.src + '" download>Download</a>';
      this.out.node.parentNode.insertBefore(btn, this.out.node);
    },
    mergeObj : function (obj1, obj2) {
      for (var prop in obj2) {
        obj1[prop] = obj2[prop];
      }
    },
    setVars : function (flashvars) {
      if (typeof flashvars == 'string') {
        this.flashvars.str = flashvars;
        this.splitVars();
        this.joinVars();
      } else if (typeof flashvars == 'object') {
        this.mergeObj(this.flashvars.obj, flashvars);
        this.joinVars();
        this.splitVars();
      }
    },
    removeVars : function (str) {
      var obj = this.flashvars.obj;
      var splits = str.split(',');
      for (var i = 0; i < splits.length; i++) {
        var k = splits[i];
        if (k in obj)
          delete obj[k];
      }
      this.flashvars.obj = obj;
      this.joinVars();
    },
    splitVars : function () {
      var str = Aak.decodeHTML(this.flashvars.str);
      var arr = str.split('&');
      var obj = {};
      for (var i = 0; i < arr.length; i++) {
        var k = arr[i];
        if (k != '' && k.split('=')) {
          var s = k.split('=');
          obj[s[0]] = Aak.decodeURI(s[1]);
        }
      }
      this.flashvars.obj = obj;
    },
    joinVars : function () {
      var obj = this.flashvars.obj;
      var arr = [];
      for (k in obj) {
        arr.push(k + '=' + Aak.encodeURI(obj[k])); // encodeURIComponent
      }
      this.flashvars.str = arr.join('&'); // &amp;
    },
    insert : function () {

      //
      this.swfvars = [this.attributes.src, this.flashvars.str].join('?');

      //
      switch (this.options.output) {
      case 'iframe':
        this.out.node = document.createElement('iframe');
        this.out.node.setAttribute('src', this.swfvars);
        this.out.node.setAttribute('width', this.attributes.width);
        this.out.node.setAttribute('height', this.attributes.height);
        this.out.node.setAttribute('frameborder', 0);
        this.out.node.setAttribute('scrolling', 'no');
        break;
      case 'tab':
        this.log();
        return GM_openInTab(this.swfvars);
        break;
      case 'html5':
        this.out.node = document.createElement('video');
        this.out.node.innerHTML = '<strong>Video not playing ? <a href="' + this.attributes.src + '" download>Download file</a> instead.</strong>';
		for (k in this.attributes) {
		  if (k == 'autoplay') { // fix bug duplicate playing on firefox
		    this.out.node.onloadstart = function () {
		      this.play();
		    }
		  } else {
		    this.out.node.setAttribute(k, this.attributes[k]);
		  }
		}
		this.out.node.onerror = function () { // switch to plugin player
		  Aak.player.plugin(this, {file:Aak.player.attributes.src});
		};
        break;
      default:
        this.out.node = document.createElement('embed');
        for (k in this.attributes) {
          this.out.node.setAttribute(k, this.attributes[k]);
        }
        if (this.flashvars.str) {
          this.out.node.setAttribute('flashvars', this.flashvars.str);
        }
      }

      //
      this.out.html = this.getHtml(this.out.node);
      this.out.tag = this.out.node.tagName;

      //
      if (this.options.output == 'inner') {
        this.in.node.innerHTML = this.out.html;
      } else { // replace
        this.in.parent.replaceChild(this.out.node, this.in.node);
      }
      //this.addDownloadBtn();
      this.log('done');
    },
    getHtml : function (node) {
      var tmp = document.createElement('div');
      tmp.appendChild(node.cloneNode(true))
      return tmp.innerHTML;
    },
    getMime : function (file) {
      var mime = file.match(/\.(flv|mp4|webm|ogv|ogg|mp3|mpeg|mpg|mkv|avi|mov)$/);
      if (mime && mime.length == 2) {
        return 'video/' + mime[1];
      } else {
        return 'video/mp4';
      }
    },
    jwplayer5 : function (id, setup) {
      // Jwplayer 5 (flash)
	  // Support http://tinyurl.com/mjavxdr: mp4, m4v, f4v, mov, flv, webm, aac, mp3, vorbis, hls, rtmp, youtube, aac, m4a, f4a, mp3, ogg, oga

      this.get(id);
      this.nameplayer = 'jwplayer5';
      this.attributes.src = "http://player.longtailvideo.com/player5.9.swf"; // v5.9
      this.attributes.src = "http://player.longtailvideo.com/player.swf"; // v5.10
      this.attributes.height = setup.height || this.in.node.clientHeight || "100%";
      this.attributes.width = setup.width || this.in.node.clientWidth || "100%";

      setup.abouttext = 'Anti-Adblock Killer';
      setup.aboutlink = 'https://github.com/reek/anti-adblock-killer';
      this.mergeObj(this.flashvars.obj, setup);
      this.flashvars.obj.controlbar = 'over';
      if (setup.skin) {
        this.flashvars.obj.skin = 'http://www.longtailvideo.com/files/skins/' + setup.skin + '/5/' + setup.skin + '.zip';
      }
      this.joinVars();
	  this.options.output = 'embed';
      this.insert();
    },
    flow : function (id, setup) {
      // Flowplayer (flash)
	  // Support: mp4, flv, f4v, m4v, mov
      // Config: http://tinyurl.com/na7vy7b

      this.get(id);
      this.nameplayer = 'flowplayer';
      this.attributes.src = "http://releases.flowplayer.org/swf/flowplayer-3.2.18.swf";
      this.attributes.height = setup.clip && setup.clip.height || this.in.node.clientHeight || "100%";
      this.attributes.width = setup.clip && setup.clip.width || this.in.node.clientWidth || "100%";

      setup.autoPlay = setup.clip && setup.clip.autostart;
      setup.url = setup.clip && setup.clip.file;

      this.flashvars.obj = {
        config : JSON.stringify(setup)
      };
      this.flashvars.str = 'config=' + JSON.stringify(setup);
	  this.options.output = 'embed';
      this.insert();
    },
    videojs : function (id, setup) {
      //http://tinyurl.com/pcgx2ob
      //http://tinyurl.com/nscztmm
      //http://jsfiddle.net/N8Zs5/18/

      this.get(id);
      this.nameplayer = 'videoJs';

      setup.height = setup.height || this.attributes.height;
      setup.width = setup.width || this.attributes.width;
      setup.type = this.getMime(setup.file || setup.src);

      var html = '<html><head><link href="http://vjs.zencdn.net/4.8/video-js.css" rel="stylesheet"><script src="http://vjs.zencdn.net/4.8/video.js"></script></head><body><video id="my_video_1" class="video-js vjs-default-skin" controls preload="auto" width="' + setup.width + '" height="' + setup.height + '"></video><script>videojs("my_video_1",{techOrder:["flash","html5"],autoplay:true,sources:[{type:"' + setup.type + '",src:"' + setup.file + '"}]})</script></body></html>';
      this.attributes.src = "data:text/html;charset=utf-8," + escape(html);
      this.options.output = 'iframe';
      this.insert();
    },
    jwplayer6 : function (id, setup) {
      // Jwplayer 6 (flash)
      // Config: http://tinyurl.com/lcygyu9
      // http://stackoverflow.com/questions/8240101/set-content-of-iframe

      this.get(id);
      this.nameplayer = 'jwplayer6';

      setup.primary = 'flash';
      setup.height = setup.height || this.attributes.height;
      setup.width = setup.width || this.attributes.width;

      var html = '<html><head><script src="http://jwpsrv.com/library/5V3tOP97EeK2SxIxOUCPzg.js"></script></head><body><div id="myElement"></div><script>jwplayer("myElement").setup(' + JSON.stringify(setup) + ');</script></body></html>';
      this.attributes.src = "data:text/html;charset=utf-8," + escape(html);
      this.options.output = 'iframe';
      this.insert();
    },
    external : function (nameplayer, id, setup) {

      this.get(id);
      this.nameplayer = 'external';

      setup.height = setup.height || this.attributes.height;
      setup.width = setup.width || this.attributes.width;

      var encoded = btoa(JSON.stringify(setup));
      this.attributes.src = 'http://reeksite.com/player/player.php?' + nameplayer + '=' + encoded;
      this.options.output = 'iframe';
      this.insert();
    },
    plugin : function (id, setup) {
      // Web Player (plugin)
      // VLC : http://tinyurl.com/omlzp39
      // WMP :
      // QT :

      this.get(id);
      this.nameplayer = 'plugin';
      this.attributes.autoplay = setup.autostart || setup.autoplay || false;
      this.attributes.src = setup.file || setup.src;
      this.attributes.height = setup.height || this.in.node.clientHeight || "100%";
      this.attributes.width = setup.width || this.in.node.clientWidth || "100%";

      // Plugins
      var plugins = [];
      if (navigator.plugins && (navigator.plugins.length > 0)) {
        for (var i = 0; i < navigator.plugins.length; i++) {
          plugins.push(navigator.plugins[i].name);
        }
        var plugins = plugins.join('|');
        if (Aak.contains(plugins, 'Windows Media Player')) {
          this.attributes.type = "application/x-mplayer2";
          this.attributes.pluginspage = 'http://www.microsoft.com/Windows/MediaPlayer/';
        } else if (Aak.contains(plugins, 'VLC Web Plugin')) {
          this.attributes.type = "application/x-vlc-plugin";
          this.attributes.pluginspage = "http://www.videolan.org";
        } else if (Aak.contains(plugins, 'QuickTime Plug-in')) {
          this.attributes.type = "video/quicktime";
          this.attributes.pluginspage = "http://www.apple.com/quicktime/download/";
        } else {
          Aak.notification('You need install VLC Web Plugin ! <a href="http://www.videolan.org/vlc/" target="_blank">Install</a>', 30000);
          return false;
        }
      }
      this.options.output = 'embed';
      this.insert();
    },
    html5 : function (id, setup) {

      //  Video Tag (html5)
      /* Note:
      https://html5rocks.com/en/tutorials/video/basics/
      http://www.w3schools.com/tags/tag_video.asp

      // Test video
      https://www.joomlacontenteditor.net/images/big_buck_bunny.flv
      http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4
      http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm
      http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv
       */

      this.get(id);
      //this.attributes = {};
      this.attributes.id = this.attributes.name = Aak.uniqid();
      this.attributes.height = setup.height || this.in.node.clientHeight || "100%";
      this.attributes.width = setup.width || this.in.node.clientWidth || "100%";
      this.attributes.src = setup.file || setup.src;
      this.attributes.type = this.getMime(this.attributes.src);
      this.attributes.controls = 'controls';
      //this.attributes.preload = 'none';
      if (setup.autostart || setup.autoplay) {
        this.attributes.autoplay = 'autoplay';
      }
      this.options.output = 'html5';
      this.insert();
    }
  },
  rules : { // Rules
    // --------------------------------------------------------------------------------------------
    // Specific
    // --------------------------------------------------------------------------------------------
    blogspot : { // No Country Redirect (NCR)
      host : ['.blogspot.'],
      onStart : function () {
        // Doc: http://tinyurl.com/odncet7
        var blog = location.host.split(".");
        if (blog[blog.length - 1] != "com") {
          var ncr = "http://" + blog[0] + ".blogspot.com/ncr";
          location.replace(ncr + location.pathname);
        }
      }
    },
    blogspot_knowlet3389 : {
      host : ['knowlet3389.blogspot.'],
      onStart : function () {
	    // + abp rule solution
        Aak.addStyle("#gAds { height: 1px !important;width: 1px !important; }");
      }
    },
    uptobox_uptostream : {
      host : ['uptobox.com','uptostream.com'],
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
      onBeforeScript : function (e) {
        if (Aak.contains(Aak.innerScript(e), 'window.location = "http://uptobox.com/?op=adblock";')) {
          Aak.stopScript(e);
        }
      }
    },
    notre_planete_info : {
      host : ['notre-planete.info'],
      onStart : function () {
        Aak.addStyle("#testpub { height: 51px !important; }");
        Aak.addStyle("#pub_meh { height: 51px !important; }");
      },
      onLoad : function () {
        /* + abp rule
        var pub --> pagead2.googlesyndication.com
         */
        //Aak.log(Aak.uw.pub, document.getElementById("pub_meh").clientHeight, Aak.uw.largeur)
      }
    },
    anisubsia_com : {
      host : ['anisubsia.com'],
      onStart : function () {
        // + abp rule #@#.adsantilok
        Aak.addStyle(".adsantilok { height: 5px !important; }");
      },
      onLoad : function () {
        Aak.uw.jAntiBlock = function () {};
        Aak.uw.CekBlok = function () {};
      }
    },
    elahmad_com : {
      host : ['elahmad.com'],
      onStart : function () {
        Aak.addStyle("#adblock { height: 1px !important; }");
      }
    },
    multiup_org : {
      host : ['multiup.org', 'streamupload.org'],
      onStart : function () {
        Aak.addStyle("#crazy { height: 3px !important; }");
      }
    },
    mrtzcmp3_net : {
      host : ['mrtzcmp3.net'],
      onStart : function () {
        Aak.addStyle(".rtm_ad { height: 1px !important; }");
      }
    },
    go4up_com : {
      host : ['go4up.com'],
      onStart : function () {
        Aak.addStyle(".myTestAd { height: 1px !important; }");
      }
    },
    bg_gledai_tv : {
      host : ['bg-gledai.tv'],
      onStart : function () {
        Aak.addStyle(".myAd { height: 1px !important; }");
      }
    },
    thepcspy_com : { // http://thepcspy.com/read/how_to_block_adblock/
      host : ['thepcspy.com'],
      onStart : function () {
        Aak.addStyle(".myTestAd { height: 1px !important; }");
        Aak.addStyle(".blocked { display: none !important; }");
      },
      onLoad : function () {
        Aak.removeElement('.blocked');
      }
    },
    automobile_sportive_com : {
      host : ['automobile-sportive.com'],
      onStart : function () {
        Aak.addStyle(".myTestAd { height: 51px !important; display: none !important; }");
      }
    },
    snsw_us : {
      host : ['snsw.us'],
      onStart : function () {
        Aak.addStyle("#ad_1 { height: 1px !important; }");
      }
    },
    urlchecker_net : {
      host : ['urlchecker.net'],
      onStart : function () {
        Aak.addStyle("#adchecker { height: 20px !important; }");
      }
    },
    skiplimite_tv : {
      host : ['skiplimite.tv'],
      onStart : function () {
        Aak.addStyle("div.addthis_native_toolbox + div[id] { height: 12px !important; }");
      }
    },	
    filecore_co_nz : {
      host : ['filecore.co.nz'],
      onStart : function () {
        Aak.addStyle(".adsense { height: 5px !important; }");
      }
    },
    interfans_org : { // http://www.interfans.org/forum/
      host : ['interfans.org'],
      onStart : function () {
        Aak.addStyle(".ad_global_header { height: 1px !important; display: none !important; }");
      }
    },
    maxdebrideur_com : {
      host : ['maxdebrideur.com'],
      onStart : function () {
        Aak.addStyle(".clear + div[id] { height: 12px !important; }");
      }
    },
    topzone_it : {
      host : ['topzone.lt'],
      onStart : function () {
        Aak.addStyle(".forumAd { height: 1px !important; display: none !important; }");
      }
    },
    nana10_co_il : {
      host : ['.nana10.'],
      onLoad : function () {
        Aak.addStyle("#advert-tracker { height: 1px !important; }");
      }
    },
    eveskunk_com : {
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
        Aak.uw.trackAdBlocking = function () {};
      }
    },
    tweaktown_com : {
      host : ['tweaktown.com'],
      onStart : function () {
        Aak.addStyle("#div-gpt-ad-1378071706813-0, #div-gpt-ad-1378150878492-1 { height: 3px !important; display: none !important; }");
      }
    },
    debrideurstream_fr : {
      host : ['debrideurstream.fr'],
      onStart : function () {
        Aak.addStyle("#content div[id][align=center] { height: 12px !important; }");
      }
    },
    preemlinks_com : {
      host : ['preemlinks.com'],
      onStart : function () {
        Aak.addStyle("#divads { height: 1px !important; }");
      }
    },
    hentai_to : {
      host : ['hentai.to'],
      onStart : function () {
        Aak.addStyle("#hentaito123 { height: 11px !important; }");
      }
    },
    prototurk_com : {
      host : ['prototurk.com'],
      onStart : function () {
        Aak.addStyle("#reklam { height: 1px !important; }");
      }
    },
    mufa_de : {
      host : ['mufa.de'],
      onStart : function () {
        Aak.addStyle("#leaderboard { height: 5px !important; }");
        Aak.addStyle("#large-rectangle { height: 5px !important; }");
        Aak.addStyle("#ad-header-468x60 { height: 5px !important; }");
      }
    },
    watcharab_com : {
      host : ['watcharab.com'],
      onStart : function () {
        // + adp rule watcharab.com#@##adblock
        Aak.addStyle("#adblock { height: 5px !important; }");
      }
    },
    freedomip_com : {
      host : ['freedom-ip.com'],
      onStart : function () {
        Aak.addStyle(".pub_vertical ins, .pub_vertical div { height: 11px !important; }");
      }
    },
    wakanim_tv : {
      host : ['wakanim.tv'],
      onStart : function () {
        Aak.addStyle("#detector { display: none !important; }");
        Aak.addStyle("#nopub { display: block !important; }");
      }
    },
    tzetze_it : {
      host : ['tzetze.it'],
      onStart : function () {
        // + abp rule
        Aak.addStyle('#TzeTze_728x90 { height: 5px !important;}');
      }
    },
    manga9_com : {
      host : ['manga9.com','mangabee.co'],
      onStart : function () {
        Aak.addStyle(".adblock { height: 31px !important; }");
      }
    },	
    onemanga2_com : {
      host : ['onemanga2.com'],
      onStart : function () {
        Aak.addStyle(".afs_ads { height: 5px !important; }");
      }
    },	
    mangabird_com : {
      host : ['mangabird.com'],
      onStart : function () {
        Aak.addStyle(".afs_ads { height: 5px !important; }");
      }
    },	
    add_tester : {
      host : ['osoarcade.com', 'd3brid4y0u.info', 'fileice.net', 'nosteam.ro', 'openrunner.com', 'easybillets.com', 'spox.fr', 'yovoyages.com', 'tv3.co.nz', 'freeallmusic.info', 'putlocker.com', 'sockshare.com', 'dramapassion.com', 'yooclick.com', 'filmovizija.com', 'filmovizija.net'],
      onStart : function () {
        Aak.addElement('div#tester');
      }
    },
    add_add : {
      host : ['filecom.net', 'upshare.org', 'skippyfile.com', 'mwfiles.net', 'up-flow.org'],
      // @@||filecom.net/advertisement.js
      // document.write('<div id="add"></div>');
      onStart : function () {
        Aak.addElement('div#add');
      }
    },
    add_adpbtest : {
      // @@||teknogods.com/advert.js
      // <div id="adpbtest">;
      host : ['leaguesecretary.com', 'teknogods.com', 'hellsmedia.com'],
      onStart : function () {
        Aak.addElement('div#adpbtest');
      }
    },
    add_adtester : {
      host : ['freesportsbet.com', 'sportsplays.com'],
      onStart : function () {
        Aak.addElement('div#ad-tester');
      }
    },
    freegamehosting_nl : {
      host : ['freegamehosting.nl'],
      onStart : function () {
        Aak.addElement('div#adtest');
      }
    },
    theweatherspace_com : {
      host : ['theweatherspace.com'],
      onStart : function () {
        Aak.addElement('div#ab-bl-advertisement');
      }
    },
    primeshare_tv : {
      host : ['primeshare.tv'],
      onStart : function () {
        Aak.addElement('div#adblock');
      }
    },
    jkanime_net : {
      host : ['jkanime.net'],
      // @@||jkanime.net/assets/js/advertisement2.js
      onStart : function () {
        Aak.addElement('div#reco');
      }
    },
    _720pmkv_com : {
      host : ['720pmkv.com'],
      onStart : function () {
        Aak.addElement('div#advert');
      }
    },
    paidverts_com : {
      host : ['paidverts.com'],
      onStart : function () {
        Aak.addElement('div.afs_ads');
      }
    },
    referencemega_com : {
      host : ['totaldebrid.org', 'referencemega.com'],
      onStart : function () {
        Aak.addElement('div.afs_ads');
      },
      onEnd : function () {
        Aak.removeElement('#dialog');
      }
    },
    chrissmoove_com : {
      host : ['chrissmoove.com'],
      onStart : function () {
        //Aak.addElement('div#adserver');
      }
    },
    eventhubs_com : {
      host : ['eventhubs.com'],
      onStart : function () {
        Aak.addElement('div#blahyblaci1');
      }
    },
    forum_pac_rom_com : {
      host : ['forum.pac-rom.com'],
      onStart : function () {
        Aak.addElement('div.banner_ads');
      }
    },
    antennesport_com : {
      host : ['antennesport.com', 'serverhd.eu'],
      onLoad : function () { // for antennesport
        // Remove Pub
        Aak.removeElement("#pub .pubclose");
        // Redirect to Player
        Aak.setElement('#pub .embed iframe', {
          src : '/embed/embed.php'
        });
      },
      onBeforeScript : function (e) { // for serverhd
        if (Aak.contains(Aak.innerScript(e), 'http://xaxa.juanantoniogonza.netdna-cdn.com/noadsblock.html')) {
          Aak.stopScript(e);
        }
      }
    },
    disableAlertbox : {
      host : ['drivearabia.com', 'putlocker.com', 'doatoolsita.altervista.org', 'sockshare.com', 'free-movie-home.com', 'pc.online143.com', 'pregen.net', 'kooora.com', 'str3amtv.co.nr', 'str3amtv.altervista.org', 'str3am.altervista.org', 'filecom.net', 'pipocas.tv', 'generatupremium.biz', 'mega-debrid.eu', 'premiumst0re.blogspot.com','dl-protect.com'],
      onAlways : function () {
        Aak.uw.alert = false;
      }
    },	
    planetatvonlinehd_blogspot : {
      host : ['planetatvonlinehd.blogspot.'],
      onAlways : function () {
        Aak.uw.jQAntiAdsBlock = function () {return false};
      }
    },	
    anizm_com : {
      host : ['anizm.com'],
      onAlways : function () {
        Aak.uw.stopAdBlock = {};
      }
    },
    pipocas_tv : {
      host : ['pipocas.tv'],
      onStart : function () {
        // Also added in disableAlertbox
        // No popup
        Aak.setCookie('popup_user_login', 'yes');
      }
    },
    linkbucks_com : {
      host : ['referencemega.com', 'fpabd.com', 'crackacc.com'],
      onStart : function () {
        // Skip visitScript when site use CloudFlare Rocket Script
        Aak.setCookie('_lbGatePassed', true);
      }
    },	
    vgunetwork_com : {
      host : ['vgunetwork.com'],
      onLoad : function () {
        Aak.setCookie('stopIt', 1);
        var close = Aak.getElement('#some_ad_block_key_close');
        if (close) {
          close.click();
        }
      }
    },
    seekingalpha_com : {
      host : ['seekingalpha.com'],
      onAlways : function () {
        Aak.uw.SA.Pages.Article.is_gnikcolbda = function () {
          return false;
        }
      }
    },
    anisearch_com : { // solved with abp rule
      host : ['anisearch.com'],
      onLoad : function () {
        //Aak.uw.is_loaded = true;
        //Aak.removeElement('.box-error');
      }
    },
    linkcrypt_ws : {
      host : ['linkcrypt.ws'],
      onLoad : function () {
        Aak.setElement('#ad_cont', {
          id : '',
          style : 'display:block;'
        });
        Aak.setElement('#container_check', {
          style : 'display:none;'
        });
      }
    },
    eventosppv_me : {
      host : ['eventosppv.me'],
      onLoad : function () {
        Aak.removeElement('#nf37');
      }
    },
    luxyad_com : { // skip redirect myanimes.li
      host : ['luxyad.com'],
      onLoad : function () {
        if ('/Information.php' == location.pathname) {
          var href = location.href;
          location.href = href.substr(href.indexOf('url=') + 4, href.length);
        }
      }
    },
    userscripts_domains : { // Redirect to Github
      host : ['userscripts.org', 'userscripts.org:8080', 'userscripts-mirror.org'],
      onStart : function () {
        if (/155840$/.test(location.pathname)) {
          location.href = Aak.homeURL;
        }
      }
    },
    openuserjs_org : {
      host : ['openuserjs.org'],
      onLoad : function () {
        var element = Aak.getElement('a[href$="/issues"]');
        if (/Anti-Adblock_Killer_Reek/.test(location.pathname) && element) {
          Aak.confirmReport(element);
        }
      }
    },
    greasyfork_org : {
      host : ['greasyfork.org'],
      onLoad : function () {
        var element = Aak.getElement('a[href$="/feedback"]');
        if (/-anti-adblock-killer-reek/.test(location.pathname) && element) {
          Aak.confirmReport(element);
        }
      }
    },
    monkeyguts_com : {
      host : ['monkeyguts.com'],
      onLoad : function () {
        var element = Aak.getElement('a[href*="code.php?nav=forum"]');
        if (/monkeyguts.com\/code.php\?id=351/.test(location.href) && element) {
          Aak.confirmReport(element);
        }
      }
    },
    aidemu_fr : {
      host : ['aidemu.fr'],
      onStart : function () {
        Aak.setCookie('adblockPopup', true);
      }
    },
    eami_in : {
      host : ['eami.in'],
      onStart : function () {
        Aak.setCookie('ad_locked', 1);
      },
      onLoad : function () {
        Aak.setCookie('ad_locked', 1);
      }
    },
    bigdownloader_com : {
      host : ['bigdownloader.com'],
      onLoad : function () {
        Aak.removeElement('#anti_adblock');
      }
    },
    gametrailers_com : {
      host : ['gametrailers.com'],
      onLoad : function () {
        Aak.removeElement('#ad_blocking');
      }
    },
    scanmx_com : {
      host : ['scan-mx.com'],
      onAlways : function () {
        Aak.uw.ad_block_test = function () {};
      },
      onLoad : function () {
        Aak.setElement('#yop', {
          id : ''
        });
      }
    },
	// Bitcoins
	bitcoinker_com : {
	  host : ['bitcoinker.com'],
	  onLoad : function () {
	    Aak.removeElement('#AdBlocked');
	  }
	},
    moondoge_co_in : {
      host : ['moondoge.co.in', 'moonliteco.in', 'moonbit.co.in', 'faucet.bitcoinzebra.com'],
      onLoad : function () {
        Aak.removeElement('#AB');
      }
    },
    bitcoiner_net : {
      host : ['bitcoiner.net'],
      onLoad : function () {
        // Remove notice
        Aak.removeElement('#adblock-info');
        // Skip timer
        Aak.setElement('#submit', {
          disabled : false,
          value : 'Send!'
        });
      }
    },
    bitcoins_nx_tc : {
      host : ['freebitcoins.nx.tc', 'getbitcoins.nx.tc'],
      onAlways : function () {
        Aak.uw.ad_block_test = function () {return false};
      }
    },	
    freecoins4_me : {
      host : ['freecoins4.me'],
      onAlways : function () {
        Aak.uw.check = function () {return false};
      }
    },
    canalplus_fr : {
      host : ['canalplus.fr'],
      onEnd : function () {
	  
	  //<meta content="http://player.canalplus.fr/embed/flash/CanalPlayerEmbarque.swf?vid=1179576" itemprop="embedURL">
	  /*
              Aak.player.custom('#CanalPlayerEmbarque', {
                src : 'http://playercanal2.kakimediadesign.com/CanalPlayerEmbarque.swf'
              }, {
                set : {
                  videoId : 1179576,
                  controls : 'controls'
                }
              });	  
	  */
	  
	  Aak.uw.CANAL.useVideoplaza=false;
	  /*
	  setInterval(function() {
	    var CANAL=Aak.uw.CANAL;
        Aak.log(CANAL) // = function () {return false};
		CANAL.options.adServer="";
		CANAL.players.CanalPlayerEmbarque.adServer="";
		CANAL.players.CanalPlayerEmbarque.adServerUrl="";
      },0);
	  */
	  }
    },	
    dailybitcoins_org : {
      host : ['dailybitcoins.org'],
      onLoad : function () {
        Aak.removeElement('.ad-img');
      }
    },
    psarips_com : {
      host : ['psarips.com'],
      onStart : function () {
        Aak.addElement('div#advert');
      }
    },	
    online_dramacafe_in : { // skip viral locker
      host : ['online.dramacafe.in'],
      onEnd : function () {
        // <input type="hidden" name="bin-rating-uniq_id" value="aff7bfc00">
        var vid = Aak.getElement('input[name="bin-rating-uniq_id"]');
        if (vid) {
          GM_xmlhttpRequest({
            method : "GET",
            url : 'http://www.online.dramacafe.in/ajax.php?p=video&do=getplayer&vid='+vid.value+'&aid=4&player=detail',
            onload : function (response) {
              var res = response.responseText;
              //Aak.log(res);
              document.querySelector('#preroll_placeholder').innerHTML = res;
            }
          });
        }
      }
    },
    filmovizija_domains : { // many changes
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
    clubedohardware_com_br : { // two antiadblock
      host : ['clubedohardware.com.br'],
      onStart : function () {
        if (Aak.contains(location.host, 'forum')) {
          // Solution 1
          Aak.addStyle("#banner, script { height: 51px !important; }");
          Aak.addElement('div#banner');
        } else { // Website
          // Solution 1
          Aak.addElement('div.banner_topo');
        }
      },
      onLoad : function () {
        if (Aak.contains(location.host, 'forum')) {
          // Solution 2
          Aak.uw.addBlocking.hide();
          Aak.uw.addBlocking.kill();
        } else { // Website
          // Solution 2
          document.body.id = '';
          Aak.removeElement('.adblock');
        }
      }
    },
    debrastagi_com : {
      host : ['debrastagi.com'],
      onLoad : function () {
        Aak.removeElement('#stp-main');
        Aak.removeElement('#stp-bg');
      }
    },
    ddlfrench_org : {
      host : ['ddlfrench.org'],
      onLoad : function () {
        // Fix bug display content
        Aak.setElement('#dle-content .d-content', {
          'class' : ''
        });
        Aak.setElement('#content', {
          'id' : ''
        });
      }
    },	
    rapidebrideur_com : {
      host : ['rapidebrideur.com'],
      onStart : function () {
        Aak.addStyle("html body div.container-fluid div.row-fluid div.span9 div div[id] { height: 12px !important;  display: block  !important; }");
      },
      onBeforeScript : function (e) {
        if (Aak.contains(Aak.innerScript(e), 'window.location = "../pages/adblock.html";')) {
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
    megadebrid_eu : {
      host : ['mega-debrid.eu'],
      onLoad : function () {
        // Activate button debrid
        Aak.setElement('.realbutton', {
          'onclick' : '',
          'type' : 'submit'
        });
      }
    },
    bokepspot_com : {
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
    picload_com : {
      host : ['picload.org'],
      onStart : function () {
        Aak.setCookie('pl_adblocker', false);
      },
      onLoad : function () {
        Aak.uw.ads_loaded = true;
        Aak.uw.imageAds = false;
        Aak.removeElement('div[oncontextmenu="return false;"]');
      }
    },
    freezedownload_com : {
      host : ['freezedownload.com'],
      onLoad : function () {
        if (/freezedownload.com\/download\//.test(location.href)) {
          Aak.removeElement('body > div[id]');
        }
      }
    },
    rapid8_com : {
      host : ['rapid8.com'],
      onLoad : function () {
        Aak.removeElement('div.backk + #blcokMzg');
        Aak.removeElement('div.backk');
      }
    },
    turkdown_com : {
      host : ['turkdown.com'],
      onLoad : function () {
		// remove facebook box
        Aak.removeElement('#duyuru');
      }
    },	
    adf_domains : {
      host : ['adf.ly', 'q.gs', 'j.gs', 'u.bb', '9.bb', 'go.phpnulledscripts.com'],
      onLoad : function () {

        // Disable onbeforeunload
        Aak.uw.onbeforeunload = false;
        Aak.uw.onunload = false;

        var continueBtn = Aak.getElement('button[id=abC]');
        var skipBtn = Aak.getElement('#skip_button');

        var skip = function () {
          if (continueBtn) {
            continueBtn.click();
          }
          if (skipBtn && skipBtn.href) {
            window.clearInterval(runSetInt)
            window.location.href = skipBtn.href;
          }
        };
        setInterval(skip, 0);
      }
    },
    tvdez_domains : {
      // (document.getElementById('pubfooter').clientHeight < 20)
      host : ['tvdez.com', 'casadossegredos.tv', 'estadiofutebol.com', 'televisaofutebol.com'],
      onStart : function () {
        Aak.addStyle("#pubfooter, #pub2 { height: 30px !important; display: block !important; }");
        Aak.setCookie("adblock", null, 0);
      },
      onBeforeScript : function (e) {
        if (Aak.contains(Aak.innerScript(e), "location.href = 'adblock.php';")) {
          Aak.stopScript(e);
        }
      }
    },
    tek_domains : {
      host : ['tek.no', 'hardware.no', 'akam.no', 'teknojobb.no', 'amobil.no', 'gamer.no', 'teknofil.no'],
      onLoad : function () {
        Aak.uw.Tek = false;
        localStorage.clear();
        sessionStorage.clear();
      }
    },
    wowhq_domains : {
      host : ['livesoccerhq.com', 'lvshd.altervista.org', 'wowhq.ws', 'futeonline.altervista.org'],
      onLoad : function () {
        if ("http://wowhq.ws/" == location.href) {
          //location.href = 'http://futeonline.altervista.org/programacao2.php';
        } else {
          var matches = location.href.match(/link=([\w]+)/i);
          if (matches != null) {
            Aak.log(atob(matches[1]));
            location.href = atob(matches[1]);
          }
        }
      }
    },
    privateinsta_com : {
      host : ['privateinsta.com'],
      onLoad : function () {
        // + abp rule
        Aak.uw.dont_scroll = false;
        Aak.removeElement("#overlay_div");
        Aak.removeElement("#overlay_main_div");
      }
    },
    risikogesundheit_de : {
      host : ['risiko-gesundheit.de'],
      onLoad : function () {
        setTimeout(function () {
          window.stop();
        }, 5000);
      }
    },
    oneplaylist_eu_pn : {
      host : ['oneplaylist.eu.pn'],
      onLoad : function () {
        // kill popunder
        Aak.uw.makePopunder = false;
      }
    },
    _4shared_com : {
      host : ['4shared.com'],
      onLoad : function () {
        // Hide "Disable AdBlodk" messages
        document.querySelector('body').classList.remove("jsBlockDetect");
      }
    },
    pro_domains : {
      host : ['pro-zik.ws', 'pro-tect.ws', 'pro-ddl.ws', 'pro-sport.ws'],
      onStart : function () {
        Aak.setCookie('visitedf', true);
        Aak.setCookie('visitedh', true);
      }
    },
    comptoirhardware_com : {
      host : ['comptoir-hardware.com'],
      onAlways : function () {
        Aak.uw.adblock = 'non';
      }
    },
    lachainemeteo_com : {
      host : ['lachainemeteo.com'],
      onAlways : function () {
		// Solution 1
		// + abp rule
        //Aak.uw.showscript = function (){};
		
		// Solution 2
		Aak.uw.js_loaded = true;
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
        if (Aak.contains(path, '/widget_adblock.php') && !Aak.contains(ref.host, host)) {
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
        if (Aak.contains(path, '/help/removeAB.php') && !Aak.contains(ref.host, host)) {
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
        //Aak.log(iframes.length,iframes);

        if (iframes.length) {

          // Neutralize Survey functions
          for (i in Aak.uw) {
            var fn = Aak.uw[i];
            // Parse all no native functions
            if (typeof fn == 'function' &&
              !/native/.test(fn.toString())) {

              // Disable dynamic functions
              if (/_\d+$/.test(i)) {
                //Aak.log(i);
                Aak.uw[i] = function () {};
              }
              // Disable the functions that prevents the removal of the iframe
              else if (/location.reload/.test(fn.toString())) {
                //Aak.log(i);
                Aak.uw[i] = function () {};
              } // Disable static functions
              else if (/^(mscrollToTop|scrollToTop|gLoad_split_|gLoad|LockPage|noScrollIE|noScrollNS)$/.test(i)) {
                //Aak.log(i);
                Aak.uw[i] = function () {};
              }
            }
          }

          // Unlock page
          Aak.uw.onbeforeunload = "";
          document.body.scroll = "yes";
          document.body.style.overflow = 'scroll'

            // Remove Survey Elements
            for (var i = 0; i < iframes.length; i++) {
              var iframe = iframes[i];
              var container = iframe.parentNode;
              var overlay = container.previousSibling;
              //Aak.log(i, iframe, container, overlay);

              Aak.removeElement(overlay);
              Aak.removeElement(container);
            }
        }
      }
    },
    fuckAdBlock : {
      host : ['kooralive.info', 'miniup.com'],
      onAlways : function () {
        Aak.uw.fuckAdBlock = 1;
      }
    },
    // --------------------------------------------------------------------------------------------
    // Players
    // --------------------------------------------------------------------------------------------
    kissanime_com : { // fixed 2014.08.11
      host : ['kissanime.com'],
      onStart : function () {
        // Solution 1
        Aak.uw.DoDetect2 = null;
      },
      onLoad : function () {

        // Solution 3 abp rule
        // @@||kissanime.com^$elemhide

        var divContentVideo = document.querySelector('#divContentVideo');

        // Solution 1
        if (Aak.uw.DoDetect2) {
          Aak.uw.DoDetect2 = null;
          Aak.uw.CheckAdImage = null;
          Aak.removeElement('iframe[id^="adsIfrme"], .divCloseBut');
          Aak.log('1');
        } //Solution 2
        else if (divContentVideo) {

          var divDownload = document.querySelector('#divDownload').cloneNode(true);
          //Aak.log(divDownload,divContentVideo);

          setTimeout(function () {
            divContentVideo.innerHTML = '';
            Aak.uw.DoHideFake();
            divContentVideo.appendChild(divDownload);
            Aak.removeElement('iframe[id^="adsIfrme"], .divCloseBut');
            Aak.log('2');
          }, 5500);
        }
      }
    },
    an1me_se : {
      host : ['an1me.se'],
      onLoad : function () {
        setTimeout(function () {
          Aak.uw.isBlockAds2 = false;
        }, 10000);
      }
    },
    channel4_com : { // research solution
      host : ['channel4.com'],
      onLoad : function () {
        /*
        var player = document.querySelector("#catchUpPlayer");

         */
        //  Aak.log(Aak.getElement('#catchUpPlayer param[name="flashvars"]'));

      }
    },
    cbs_com : { // research solution
      host : ['cbs.com'],
      onStart : function () {
        // + abp rule
        //Aak.setCookie('ad-block-counter', 0);
      },
      onLoad : function () {
        /*
        setTimeout(function () {
        var player = document.querySelector("#rcpHolder");
        }, 3000);
         */
      }
    },
    tvcatchup_com : { // research solution
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
    hqq_tv : { // putlocker.is
      host : ['hqq.tv'],
      onLoad : function () {
        // + abp rule
        // http://hqq.tv/player/embed_player.php?vid=R3DGHG3GKXX7&autoplay=no
        if ('/player/embed_player.php' == location.pathname) {
          document.querySelector('form[id^="form-"]').submit();
        }
      }
    },
    // Poland
    wrzuta_domains : {
      host : ['.wrzuta.pl', 'pudelek.tv', 'komediowo.pl', 'sfora.pl', 'autokrata.pl', 'sportfan.pl', 'wawalove.pl', 'hotmoney.pl'],
      onEnd : function () {
        var timeout = (Aak.getBrowser() == 'Firefox') ? 1000 : 6000;
        setTimeout(function () {

          var fn = function (mid, channel, element) {
            GM_xmlhttpRequest({
              method : "GET",
              url : 'http://' + channel + '.wrzuta.pl/npp/embed/' + channel + '/' + mid,
              onload : function (result) {
                var res = result.responseText;
                Aak.log(1, res);

                // Get video
                var obj = JSON && JSON.parse(res);
                //Aak.log(obj);

                // New player
                // Using an external flash player is impossible because protected by crossdomain.xml
				//Aak.player.options.insert = 'inner';
                Aak.player.html5(element.parentNode, {
                  autostart : true,
                  file : obj.url[1].url // Medium Quality
                });
              }
            });
          }
          //http://www.wrzuta.pl/embed_video.js?key=0RkwUOxAmt0&login=jabulanix&width=600&height=499&autoplay=true
          var elements = document.querySelectorAll('script[src*="/embed_video.js"]');
          Aak.log(elements);
          if (elements.length) {
            for (var i = 0; i < elements.length; i++) {
              var element = elements[i];
              var src = element.src;
              var mid = src.match(/key=(\w+)/)[1];
              var channel = src.match(/login=(\w+)/)[1];
              //Aak.log(element, mid, channel);
              fn(mid, channel, element);
            }
          }
        }, timeout);
      }
    },
    wp_domains : {
      host : ['.wp.tv', '.wp.pl', 'biztok.pl'],
      onEnd : function () {
        var timeout = (Aak.getBrowser() == 'Firefox') ? 1000 : 6000;
        setTimeout(function () {

          //
          Aak.removeElement('#Player1');

          //
          var obj = Aak.uw.Config || Aak.uw.o || false;
          var player = document.querySelector('#Player0') || false;
          Aak.log(Aak.uw, obj, player);

          //
          if (obj && player) {
            // clip != null
            // http://tinyurl.com/kue99ow
            if (typeof obj.clip == 'object') {
              // New player
              Aak.player('video', 'Player0', {
                autostart : true,
                file : obj.clip.url[0].url
              });
            } else {
              // config != null
              // http://tinyurl.com/nafxruy
              if (typeof obj.data == 'object') {
                var mid = obj.data.startMid;
              } else {
                // url != null
                // http://tinyurl.com/o949u8m
                var mid = obj.url.match(/mid=([\d]+)/)[1];
                //Aak.log(mid);
              }
              GM_xmlhttpRequest({
                timeout : 10000, // 10s
                method : "GET",
                url : 'http://wp.tv/mid,' + mid + ',embed.json',
                onload : function (result) {
                  var res = result.responseText;
                  //Aak.log(res);

                  // Get video
                  var obj = JSON.parse(res);
                  Aak.log(obj);

                  // New player
                  // get.wp.tv/?f=2886223.1409731997972.h.mp4
                  Aak.player.html5('Player0', {
                    autostart : true,
                    file : obj.clip.url[0].url
                  });
                }
              });
            }
          }
        }, timeout);
      }
    },
    tvn_pl : { // http://tinyurl.com/mcwtz27
      host : ['tvn.pl', 'tvn24.pl', 'player.pl'],
      onStart : function () {

        // Start EventListener
        window.addEventListener('DOMNodeInserted', function (e) {

          var player = e.target;
          if (player && player.data && /adServerURL/.test(player.data)) {

            Aak.player.custom(player, {
              src : 'http://admin.brightcove.com/viewer/us20140807.1543/BrightcoveBootloader.swf'
            }, {
              set : {
                autoStart : true
              },
              remove : 'adServerURL,description,linkBaseURL,title,viralPlayerAd,debuggerID,startTime,htmlFallback,viralPlayerWidth,viralPlayerVideoId,viralPlayerUrl,viralPlayerShareUrl,viralPlayerID,templateLoadHandler,viralPlayerCustomPackage,viralPlayerGstream,viralPlayerHeight,exParam1'
            }, {
              output : 'iframe'
            });

          }

        }, false);
      }
    },
    // France
    playtv_fr : {
      host : ['play.tv', 'playtv.fr'],
      onEnd : function () {

        // Aak.uw.ppl.vars.redirect = function () {};
        Aak.log(Aak.uw);

        //return false;
        var channel = Aak.uw.ptv.Data.Remote.channel;

        if (typeof channel == 'object' && Aak.contains(location.pathname, channel.alias)) {

          // When pathname change
          setInterval(function () {
            if (!Aak.contains(location.pathname, channel.alias)) {
              location.reload();
            } else if (Aak.contains(location.pathname, 'adblock')) {
              window.stop();
            }
          }, 1000);

          var timestamp = new Date().getTime();
          var rand = Math.random().toString().slice(2, 18);
          var container = document.querySelector(".notice-adb");
          var url = 'http://tvplayer.play.tv/config/?callback=jQuery' + rand + '_' + timestamp + '&id=' + channel.tvplayer_id + '&appzone=desktop.playtv&_=' + timestamp;
          Aak.log(channel, url, timestamp, rand);

          GM_xmlhttpRequest({
            method : "GET",
            url : url,
            headers : {
              "User-Agent" : navigator.userAgent
            },
            onload : function (response) {
              var res = response.responseText;
              Aak.log('ajax ', res);

              //
              var json = res.substring(res.indexOf('{'), res.lastIndexOf('}') + 1);
              var obj = JSON && JSON.parse(json);
              Aak.log(res, json, obj);

              var a = obj && obj.flashVars.a || res.match(/"fa":"([a-z0-9]+)/)[1];
              var b = obj && obj.flashVars.b || res.match(/"bf":"([a-z0-9]+)/)[1];
              //Aak.log(a, b);

              // http://tvplayer.play.tv/swf/tvplayer259.swf // dead
              // http://tvplayer.playtv.fr/swf/tvplayer301.swf // dead
              // http://tvplayer.playtv.fr/swf/tvplayer302.swf

              Aak.player.custom(container, {
                src : 'http://tvplayer.playtv.fr/swf/tvplayer302.swf',
                id : channel.tvplayer_id,
                name : channel.tvplayer_id,
                width : 610,
                height : 384
              }, {
                set : {
                  controls : 1,
                  caching : true,
                  a : a,
                  b : b
                }
              });

              /*
              container.innerHTML = '<embed title="ree-' + channel.alias + '" width="610" height="384" id="' + channel.tvplayer_id + '" name="' + channel.tvplayer_id + '" type="application/x-shockwave-flash" src="http://tvplayer.playtv.fr/swf/tvplayer301.swf" flashvars="controls=1&amp;background=1579032&amp;volume_cookie=true&amp;caching=true&amp;a=' + a + '&amp;b=' + b + '" allowfullscreen="true" allowscriptaccess="always" bgcolor="#000000"/>';
               */
            }
          });

        }
      }
    },
    rmcsportbfmtv_com : { // webradio
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

        Aak.uw.swfobject.embedSWF("/swf/RMCLIVE.swf", "liveplayer", "70", "90", "10.0.0", "", flashvars, params);

      }
    },
    eclypsia_com : {
      host : ['eclypsia.com'],
	  onAlways : function () {
	    // Solution 1
		// abp rules
		
		// Solution 2
	    Aak.uw.isABActivated = function () {return false;}; // Kill antiadblock
	    Aak.uw.refresh_iframe = function () {}; // Stop ads to be loaded
	  },
      onEnd : function () {
	    //Aak.log(Aak.uw.OA_show, Aak.uw.isABActivated());

	    // Solution 3
        //http://www.dailymotion.com/swf/video/x1tayy1
        var element = document.querySelector('div[id^="webtv_iframe_"]');
        if (element != null) {
          var videoId = element.id.split('_')[2];
          setTimeout(function () {
            element.innerHTML = '<iframe frameborder="0" width="812" height="500" src="http://www.dailymotion.com/embed/video/' + videoId + '?logo=0&autoPlay=1&autoMute=0"></iframe>';
          }, 1000);
        }
      }
    },
    gamingroom_tv : {
      host : ['gamingroom.tv'],
      onAlways : function () {
        Aak.uw.adblock_detect = function () {};
        Aak.uw.GR_adblock_hide_video = function () {};
        Aak.uw.adblock_video_msg_start = function () {};
        Aak.uw.adblock_video_msg_stop = function () {};
        Aak.uw.disable_chat = function () {};
      }
    },
    // Germany
    sat1_de : { //
      host : ['sat1.de', 'sat1.ch'],
      onStart : function () {
        /*
        setInterval(function () {
        Aak.uw.SIMAD.hideAds();
        Aak.uw.SIMAD_CONFIG=true;
        },0);
         */
      },
      onEnd : function () {
        /*

        Bad
        gp_adBlockStatus emptyAd
        abView 1
        abView_X empty
        noAbView empty
        noAbView_X empty

        OK
        No gp_adBlockStatus
        abView empty
        abView_X empty
        noAbView 1
        noAbView_X empty

        Sitemap: http://www.sat1.de/sitemaps/sitemap-videos.xml
        Disallow: /videos
        http://video.sevenoneintermedia.de/clips/mp4-840/2447000/2447529-840-148668.mp4
        http://www.sat1.de/dynamic/thumbnails/full/2447000/2447529-full-52_88-original.jpg
        http://www.sat1.de/tv/die-strengsten-eltern-der-welt/video/58-schlaege-und-make-up-clip


        Aak.log(Aak.uw);
         */
      }
    },
    now_domains : { // http://tinyurl.com/ozqlcky
      host : ['voxnow.de', 'rtl-now.rtl.de', 'rtl2now.rtl2.de', 'n-tvnow.de', 'superrtlnow.de', 'rtlnitronow.de'],
      onLoad : function () {

        //
        Aak.player.custom('#videoplayer', null, {
          remove : 'abcheck_enabled,adcall,adclasses,adconfig,admeta,adslog'
        });

      }
    },
    myspass_de : { // http://tinyurl.com/lto9pyd
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
              //Aak.log(res);

              // Get video
              var parser = new DOMParser();
              var dom = parser.parseFromString(res, "application/xml");
              var file = dom.getElementsByTagName("url_flv").item(0).textContent;

              // Remove elements
              Aak.removeElement('div.loadingGif');

              // Replace player
              Aak.player.jwplayer5('player', {
                autostart : true,
                file : file
              });

              /*
              // Replace player
              Aak.player.flow('player', {
              clip : {
              autoPlay : true,
              url : file
              }
              });
               */

              /*
              // Replace player
              Aak.player.jwplayer6('player', {
              autostart : true,
              file : file
              });
               */

              /*
              // Replace player
              Aak.player.plugin('player', {
              autostart : true,
              file : file
              });
               */

              /*
              // Replace player
              Aak.player.html5('player', {
              autostart : true,
              file : file
              });
               */

              /*
              // Replace player
              Aak.player.videojs('player', {
              autostart : true,
              file : file
              });
               */

              /*
              // Replace player
              Aak.player.external('jwplayer6','player', {
              autostart : true,
              //  skin: 'lulu',
              file : file
              });
               */

            }
          });
        }
      }
    },
	// Nederland
    rtlxl_nl : { // http://tinyurl.com/l2zkv3d
      host : ['rtlxl.nl','rtlnieuws.nl'],
      onEnd : function () {
        // 
        Aak.player.custom('#_rtlosmf0', null, {
          set : {
            adblock : false
          }
        });
      }
    },
    // Portugal
    abola_pt : {
      host : ['miragens.abola.pt'],
      onEnd : function () {
        // miragens.abola.pt/media.aspx?id=20390&op=2&p=1
        // miragens.abola.pt/MiragensBO/uploads/20/39/0/20390.mp4

        /* protected by crossdomain.xml
        // Fix: 9.6.2014 (new player)
        if ('/media.aspx' == location.pathname) {
        var id = location.href.match(/media.aspx[?]id=([\d]+)/)[1];
        var path = id.match(/.{1,2}/g).join('/');
        var file = 'http://www.miragens.abola.pt/MiragensBO/uploads/' + path + '/' + id + '.mp4';

        // Replace player
        Aak.player.jwplayer5('player', {
        autostart : true,
        file : file
        });
        }
         */
      }
    },
    // Italy
    rai_tv : {
      host : ['rai.tv'],
      onStart : function () {},
      onLoad : function () {}
    },
    vvvvid_it : {
      host : ['vvvvid.it'],
      onEnd : function () {
          Aak.uw.vvvvid.onAdBlock = function() {};
      }
    },
    // TV Stream
    ilive_domains : {
      host : ['ilive.to', 'streamlive.to'],
      onEnd : function () {
        if (/^\/embedplayer.php/i.test(location.pathname)) {
          setTimeout(function () {
		    // Skip timer
            Aak.uw.removeOverlayHTML();
          }, 1000);
        }
      }
    },
    micast_tv : {
      host : ['micast.tv'],
      onEnd : function () {
        if (/^\/gen\d+.php/.test(location.pathname)) {
          setTimeout(function () {
		    // Skip timer and close ads
            Aak.uw.removeOverlayHTML();
          }, 1000);
        }
      }
    },
    pxstream_tv : {
      host : ['pxstream.tv'],
      onEnd : function () {
        if (/^\/embedrouter.php/.test(location.pathname)) {
          setTimeout(function () {
		    // Skip timer and close ads
            Aak.uw.closeAd();
          }, 1000);
        }
      }
    },
    sawlive_tv : {
      host : ['sawlive.tv'],
      onLoad : function () {
        if (/^\/embed\/watch\//i.test(location.pathname)) {
          // Skip timer and close ads
          Aak.uw.display = false;
          Aak.uw.closeMyAd();
        }
      }
    },
    sharecast_to : {
      host : ['sharecast.to'],
      onLoad : function () {
        if (/^\/embed.php/i.test(location.pathname)) {

          // Disable popunders
          var interval = setInterval(function () {
              Aak.setCookie('vid_main', true);
              Aak.setCookie('vid_sub', 2);
              Aak.setCookie('vid_delay', true);
            }, 100);

          setTimeout(function () {
            clearInterval(interval);
          }, 5000);

          // Remove transparent overlay
          Aak.removeElement('#table1');
        }
      },
      onBeforeScript : function (e) {
        if (Aak.contains(Aak.innerScript(e), 'popundrOpenCloseWindow()')) {
          Aak.stopScript(e);
        }
      }
    },
    flowplayer : {
      host : ['videofun.me', 'videobug.net', 'video44.net', 'play44.net', 'byzoo.org'],
      onLoad : function () {
        // + abp rule for hide antiadblock message
        // http://tinyurl.com/psfq56y
        if (/^\/embed/.test(location.pathname)) {
          setTimeout(function () {
            Aak.allowfullscreen("#flowplayer_api", true);
          }, 1000);
        }
      }
    },
    str3amtv_domains : { // remove ads + popupwindow
      host : ['str3amtv.com','futstr3am.2fh.co'],
      onLoad : function () {
        Aak.removeElement('div[id^="floatLayer"]');
        var anchors = document.querySelectorAll('a[onclick^="window.open"]');
        for (i in anchors) {
          var fn = anchors[i].onclick.toString();
		  var re = new RegExp("http://"+location.host+"/[a-z0-9-]+\.php");  
          var link = fn.match(re);
          var link = link && link[0] || null;
          //Aak.log(link);
          anchors[i].onclick = null;
          anchors[i].href = link;
          anchors[i].target = '_self';
        }
      }
    },
    // --------------------------------------------------------------------------------------------
    // Firefox
    // --------------------------------------------------------------------------------------------
    yellowbridge_com : {
      host : ['yellowbridge.com'],
      onAlways : function () {
        Aak.uw.finalizePage = function () {
          return;
        };
      },
      onBeforeScript : function (e) {
        if (Aak.contains(Aak.innerScript(e), 'finalizePage()')) {
          Aak.stopScript(e);
        }
      }
    },
    gamespowerita_com : {
      host : ['gamespowerita.com'],
      onBeforeScript : function (e) {
        if (Aak.contains(Aak.innerScript(e), '(document.getElementById("test" + id_2).style.height < 1)') || Aak.contains(Aak.innerScript(e), 'if(typeof(window.google_jobrunner)=="undefined" || document.getElementById("test" + id_2).style.height < 1)') || Aak.contains(Aak.innerScript(e), 'if(typeof(window.google_jobrunner)=="undefined")')) {
          Aak.stopScript(e);
        }
      }
    },
    sporttvdireto_com : { // bug auto redirect loop
      host : ['sporttvdireto.com', 'tvdesporto.com'],
      onStart : function () {
        // this solution dont works
        // document.getElementById('ads1').clientHeight < 20
        Aak.addElement('div#ads1');
        Aak.addStyle("#ads1 { height: 30px !important; }");
      },
      onBeforeScript : function (e) {
        if (Aak.contains(Aak.innerScript(e), 'location.href = \'http://tvdesporto.com/chorar.php\';')) {
          Aak.stopScript(e);
        }
      }
    },
    altervista_zeb89 : {
      host : ['zeb89.altervista.org'],
      onBeforeScript : function (e) {
        // greasemonkey/addons4.js
        if (Aak.contains(Aak.innerScript(e), 'typeof GM_addonsStartup !== "undefined"')) {
          Aak.stopScript(e);
        }
      }
    },
    // --------------------------------------------------------------------------------------------
    // Generic
    // --------------------------------------------------------------------------------------------
    generic : {
      host : ['.*?'],
      //onRemove : function (removedNode) {Aak.log(removedNode);},
      //onSubtreeModified : function (e) {Aak.log(e.target);},
      onStart : function () {
        // do nothing
      },
      onLoad : function () {

        /* Alternative solution
        // AntiAdblock (Packer) only Zdxd
        if (typeof Aak.uw.k == 'function' &&
        typeof Aak.uw.h == 'function' &&
        typeof Aak.uw.ShowAdbblock == 'function' &&
        Aak.contains(Aak.uw.ShowAdbblock.toString(), 'warningMessage.innerHTML=text_detected()')) {

        // Disable
        Aak.uw.ShowAdbblock = function () {return;};
        Aak.uw.k = function () {return;};
        Aak.uw.h = function () {return;};
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
        //Aak.uw.audio_file = false;
		
        // Adbuddy
        if (typeof Aak.uw.closeAdbuddy === 'function') {
          //Aak.log(typeof Aak.uw.closeAdbuddy);
		  Aak.uw.closeAdbuddy();
          Aak.autoReport('Adbuddy');
        }

        // AdBlock Alerter (WP) Fix 10.12.2014
        if (Aak.getElement('div.adb_overlay > div.adb_modal_img')) {
          // Remove Alert + Allow Scroll
          Aak.removeElement('div.adb_overlay');
          Aak.addStyle('html,body {height:auto !important; overflow: auto !important;}');
          Aak.autoReport('AdBlockAlerter');
        }

        // Unknow Anti AdBlock system
        if (Aak.getElement('#blockdiv') && Aak.contains(Aak.getElement('#blockdiv').innerHTML, 'disable ad blocking or use another browser without any adblocker when you visit')) {
          Aak.removeElement('#blockdiv');
        }

        // Antiblock - http://antiblock.org/
        localStorage.antiblockId = false;
        var styles = document.querySelectorAll('style');
        for (var i in styles) {
          var style = styles[i];
          //Aak.log(style);
          if (typeof style == "object") {
            var css = style.innerHTML.replace(/[\n\r\t\s]+/g, "");
            var matches = css.match(/#([0-9a-z]{4,10})\{.*position:fixed\!important;.+document\.documentElement.scrollTop\?document\.documentElement\.scrollTop:document\.body\.scrollTop.+\}#/i);
            if (matches != null && matches.length == 2) {
              //Aak.log(matches);
              localStorage.antiblockId = matches[1];
            }
          }
        }

        // Anti-Adblockers
        var systems = {
          // Plugins WordPress
          'NoAdblock' : '(/plugins/no-adblock/|/blockBlock/blockBlock.jquery.js)',
          'WordPressAdBlockBlocker' : '/plugins/wordpress-adblock-blocker/',
          'AntiBlockBukssaAyman' : '/plugins/anti-block/',
          'BlockAlyzer' : '/plugins/blockalyzer-adblock-counter/',
          'AdBlockingDetector' : '/plugins/ad-blocking-detector/',
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
          'jQueryAntiAdsBlock' : '/jquery.antiadsblock.js',
          'Adbuddy' : '/js/adbuddy.min.js',
          'AntiADsBlocker' : '/aadb/script.js'
        }
        var scripts = document.scripts;
        for (var i = 0; i < scripts.length; i++) {
          var script = scripts[i];
          if (script.src) {
            for (key in systems) {
              if (new RegExp(systems[key], 'i').test(script.src)) {
                //Aak.log(key, location.host, script.src);
                Aak.autoReport(key, location.host, script.src);
                break;
              }
            }
          }
        }

      },
      onInsert : function (insertedNode) {

        // All Nodes
        //Aak.log(insertedNode);
		
		
		// No-Adblock - http://www.no-adblock.com/
		if (insertedNode.id &&
		  insertedNode.id.length == 4 &&
		  /^[a-z0-9]{4}$/.test(insertedNode.id) &&
		  insertedNode.nodeName == 'DIV' &&
		  insertedNode.firstChild &&
		  insertedNode.firstChild.id &&
		  insertedNode.firstChild.id == insertedNode.id &&
		  Aak.contains(insertedNode.innerHTML, 'no-adblock.com')) {
		  // Remove
		  Aak.autoReport('No-Adblock', false, location.href);
		  Aak.removeElement(insertedNode);
		  //Aak.log(insertedNode);
		}		
		
		
		// StopAdblock - http://stopadblock.org/downloads/
		if (insertedNode.id &&
		  insertedNode.id.length == 7 &&
		  /^a[a-z0-9]{6}$/.test(insertedNode.id) &&
		  insertedNode.nodeName == 'DIV' &&
		  insertedNode.parentNode &&
		  insertedNode.parentNode.id &&
		  insertedNode.parentNode.id == insertedNode.id + '2' &&
		  Aak.contains(insertedNode.innerHTML, 'stopadblock.org')) {
		  // Remove
		  Aak.autoReport('StopAdBlock', false, location.href);
		  Aak.removeElement(insertedNode);
		  //Aak.log(insertedNode);
		}

		
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
          //Aak.log(insertedNode);
          Aak.removeElement(insertedNode);
        }

        // Adunblock - http://adunblock.com/
        var reId = /^[a-z]{8}$/;
        var reClass = /^[a-z]{8} [a-z]{8}$/;
        var reBg = /^[a-z]{8}-bg$/;
        var reStyle = /top: -?[\d]+px; opacity: [\d]; visibility: visible;/;
        var reMessage = /Il semblerait que vous utilisiez un bloqueur de publicité !/;

        // Communs
        if (typeof Aak.uw.vtfab != 'undefined' &&
          typeof Aak.uw.adblock_antib != 'undefined' &&
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
        var reWords1 = /ad blocker|ad block|ad-block|adblocker|ad-blocker|adblock|bloqueur|bloqueador|Werbeblocker|adblockert|&#1570;&#1583;&#1576;&#1604;&#1608;&#1603; &#1576;&#1604;&#1587;/i;
        var reWords2 = /kapat|disable|désactivez|désactiver|desactivez|desactiver|desative|desactivar|desactive|desactiva|deaktiviere|disabilitare|&#945;&#960;&#949;&#957;&#949;&#961;&#947;&#959;&#960;&#959;&#943;&#951;&#963;&#951;|&#1079;&#1072;&#1087;&#1088;&#1077;&#1097;&#1072;&#1090;&#1100;|állítsd le/i;

        // Communs
        if (insertedNode.parentNode &&
          insertedNode.id &&
          insertedNode.style &&
          insertedNode.firstChild &&
          !insertedNode.firstChild.id &&
          !insertedNode.firstChild.className &&
          reId.test(insertedNode.id) &&
          reTag1.test(insertedNode.nodeName) &&
          reTag2.test(insertedNode.firstChild.nodeName)) {
          //Aak.log(insertedNode);
		  
          // Kill audio message
          var audio = insertedNode.querySelector("audio[loop]") || false;
          if (audio) {
		    Aak.log('Antiblock(audio)');
            audio.pause();
            Aak.removeElement(audio);
          }
		  
          // Antiblock.org v3 + Fork
          if (insertedNode.firstChild.firstChild &&
            insertedNode.firstChild.firstChild.nodeName == "IMG" &&
            typeof Aak.uw[insertedNode.id] == 'object' &&
            typeof Aak.uw[insertedNode.id].displayMessage == 'function') {

            // Better Stop Adblock
            // Demo: http://codeclan.altervista.org/
            if (typeof Aak.uw[insertedNode.id].toggle == 'function') {
              var childs = document.body.childNodes;
              for (var i = 0; i < childs.length; i++) {
                var child = childs[i];
                if (child.nodeType == 1 && child.style.display == 'none') {
                  child.style.display = ''; // show
                  //Aak.log(node);
                }
              }
              Aak.autoReport('BetterStopAdblock');
            }
            // Antiblock.org v3
            else {
              Aak.autoReport('Antiblock3');
            }
            // Disable
            //Aak.log(insertedNode, Aak.uw[insertedNode.id]);
            Aak.removeElement(insertedNode);
            Aak.uw[insertedNode.id] = false;
          }
          // Antiblock.org v3 + v2 (Alternative Solution)
          else if (localStorage.antiblockId != false &&
            insertedNode.id == localStorage.antiblockId) {
            // V3
            if (typeof Aak.uw[insertedNode.id] == 'object') {
              Aak.uw[insertedNode.id] = false;
              Aak.autoReport("Antiblock3");
            } else { // V2
              Aak.autoReport("Antiblock2");
            }
            // Disable
            //Aak.log(insertedNode);
            Aak.removeElement(insertedNode);
          }
          // Antiblock.org v2
          else if (reWords1.test(insertedNode.innerHTML) &&
            reWords2.test(insertedNode.innerHTML)) {
            // Disable
            //Aak.log(insertedNode);
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
