// ==UserScript==
// @name Anti-Adblock Killer | Reek
// @namespace https://userscripts.org/scripts/show/155840
// @description Anti-Adblock Killer is a userscript whose functionality is removes many protections used on some website that force the user to disable the AdBlocker. So you can continue to visit this website without having to disable your Adblocker.
// @author Reek | http://reeksite.com/
// @version 7.1
// @license Creative Commons BY-NC-SA
// @encoding utf-8
// @homepage https://github.com/reek/anti-adblock-killer
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
// @run-at document-start
// ==/UserScript==
/*=====================================================
  Thanks
=======================================================

Collaborators:
	InfinityCoding, Couchy, Dindog, Floxflob, U Bless, Watilin, @prdonahue, Hoshie, 3lf3nLi3d, Alexo, Crits, noname120

Donors:
	Mike Howard, Shunjou, Charmine, Kierek93, George Barnard, Henry Young, Seinhor9, ImGlodar, Ivanosevitch

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
  if (this.indexOf(str) != -1) {
    return true;
  } else {
    return false;
  }
};

Aak = {
  scriptid : 'gJWEp0vB',
  homeURL : 'https://github.com/reek/anti-adblock-killer',
  changelogURL : 'https://github.com/reek/anti-adblock-killer',
  reportURL : 'https://github.com/reek/anti-adblock-killer/wiki/Report-Guide',
  downloadURL : 'https://raw.githubusercontent.com/reek/anti-adblock-killer/master/anti-adblock-killer.user.js',
  filtersSubscribe : 'abp:subscribe?location=https://raw.github.com/reek/anti-adblock-killer/master/anti-adblock-killer-filters.txt&title=Anti-Adblock%20Killer%20|%20Filters%20for%20Adblockers',
  filtersURL : "https://raw.githubusercontent.com/reek/anti-adblock-killer/master/anti-adblock-killer-filters.txt",
  iconURL : 'https://raw.github.com/reek/anti-adblock-killer/master/anti-adblock-killer-icon.png',
  init : function () {
    // Debug
    Aak.debug();

    // Add Command in Greasemonkey Menu
    Aak.registerMenuCommand();

    // Detect Filters
    Aak.once(30, 'aak-last-detectfilters', Aak.detectFilters);

    // Detect Update
    Aak.once(5, 'aak-last-checkupdate', Aak.update.checkAuto);
  },
  debug : function () {

      if (window.top != window.self)
        return; // stop if iframe
		
      /*		
      console.log('loading', document.readyState);
      document.onreadystatechange = function () {
          switch (document.readyState) {
          case "loading":
            console.log('loading');
          case "interactive":
            console.log("interactive");
          case "complete":
            console.log("complete");
            break;
          }
      }

      // Returns "loading" while the Document is loading, "interactive" once it is finished parsing but still loading sub-resources, and "complete" once it has loaded.
      https://developer.mozilla.org/en-US/docs/Web/API/document.readyState

      // alternative to DOMContentLoaded
      document.onreadystatechange = function () {
      if (document.readyState == "interactive") {
      initApplication();
      }
      }

      // alternative to load event
      document.onreadystatechange = function () {
      if (document.readyState == "complete") {
      initApplication();
      }
      }
      */
	  
	  //GM_deleteValue('aak-last-checkupdate');
      //Aak.update.checkAuto();

      //console.info('Anti-Adblock Killer on ' + Aak.getScriptManager() + ' in ' + Aak.getBrowser(), Aak.getUUID());

      /*
      console.info('GM_API', (typeof GM_API != 'undefined') ? true : false);
      console.info('GM_info', (typeof GM_info != 'undefined') ? true : false);
      console.info('GM_Metadata', (typeof GM_Metadata != 'undefined') ? true : false);
      console.info('GM_deleteValue', (typeof GM_deleteValue != 'undefined') ? true : false);
      console.info('GM_getValue', (typeof GM_getValue != 'undefined') ? true : false);
      console.info('GM_listValues', (typeof GM_listValues != 'undefined') ? true : false);
      console.info('GM_setValue', (typeof GM_setValue != 'undefined') ? true : false);
      console.info('GM_getResourceText', (typeof GM_getResourceText != 'undefined') ? true : false);
      console.info('GM_getResourceURL', (typeof GM_getResourceURL != 'undefined') ? true : false);
      console.info('GM_addStyle', (typeof GM_addStyle != 'undefined') ? true : false);
      console.info('GM_log', (typeof GM_log != 'undefined') ? true : false);
      console.info('GM_openInTab', (typeof GM_openInTab != 'undefined') ? true : false);
      console.info('GM_registerMenuCommand', (typeof GM_registerMenuCommand != 'undefined') ? true : false);
      console.info('GM_setClipboard', (typeof GM_setClipboard != 'undefined') ? true : false);
      console.info('GM_xmlhttpRequest', (typeof GM_xmlhttpRequest != 'undefined') ? true : false);
       */
  },
  getBrowser : function () {
    if (navigator.userAgent.contains('Firefox')) {
      return "Mozilla Firefox";
    } else if (navigator.userAgent.contains('MSIE')) {
      return "Internet Explorer";
    } else if (navigator.userAgent.contains('Opera')) {
      return "Opera";
    } else if (navigator.userAgent.contains('Chrome')) {
      return "Google Chrome";
    } else if (navigator.userAgent.contains('Safari')) {
      return "Apple Safari";
    } else {
      return navigator.userAgent;
    }
  },
  getVersion : function () {
    // Greasemonkey or Tampermonkey
    if (typeof GM_info != 'undefined') {
      return Number(GM_info.script.version);
    }// Scriptish
    else if (typeof GM_getMetadata != 'undefined') {
      return Number(GM_getMetadata('version'));
    } else {
      console.warn('No supprted GM_info && GM_Metadata');
      return false;
    }
  },
  getScriptManager : function () {
    if (typeof GM_info != 'undefined') {
      // Greasemonkey
      if (typeof GM_info.uuid != 'undefined') {
        return 'Greasemonkey';
      } // Tampermonkey
      else if (typeof GM_info.scriptHandler != 'undefined') {
        return 'Tampermonkey';
      } // Scriptish
    } else if (typeof GM_getMetadata != 'undefined') {
      return 'Scriptish';
    } // NinjaKit
    else if (typeof GM_info != 'undefined' && Aak.getBrowser() == 'Safari') {
      return 'NinjaKit';
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
    console.info('Anti-Adblock Killer: ' + text);
  },
  once : function (day, store, callback) {

    var time = new Date().getTime();

    // 
    if (isNaN(GM_getValue(store))) {
      GM_setValue(store, 0);
    }

    // 
    if (Number(GM_getValue(store)) < time) {
      GM_setValue(store, (time + (day * 24 * 60 * 60 * 1000)).toString());
	  callback();
    } else {
      return; // stop execution
    }
  },
  registerMenuCommand : function () {
  
    // Scriptish
    // Note: No menu command is created when the user script is run in a iframe window.
    // https://github.com/scriptish/scriptish/wiki/GM_registerMenuCommand
    if (window.top != window.self) return; // stop if iframe

    if (typeof GM_registerMenuCommand != 'undefined') {
      GM_registerMenuCommand("Anti-AdBlock Killer: Homepage", function () {
        location.href = Aak.homeURL;
      });
	  GM_registerMenuCommand("Anti-AdBlock Killer: Check Update", Aak.update.check);
    }
  },
  notification : function (message, delay) {
    
    if (window.top != window.self) return; // stop if iframe

    // Style notification
    Aak.addStyle('#aak-notification { color:#000 !important; background-color: #fff !important; display:block !important; width:100% !important; position:fixed !important; z-index: 99999 !important; left: 0; top: 0;  text-align: left; vertical-align:middle; margin:0 !important; font-size:14px !important; font-family:arial !important; border-bottom:3px solid #000 !important; line-height:1.2 !important; font-variant:small-caps;}');

    // Style notification Menu
    Aak.addStyle('#aak-notification-menu { padding:0px 10px 0px 112px !important; background-color: #000 !important; }');
    Aak.addStyle('#aak-notification-menu a { padding:5px !important; color: #fff !important; display:inline-block; text-decoration: none; }');
    Aak.addStyle('#aak-notification-menu a:hover { color: #000 !important; background-color: #fff !important; }');
    Aak.addStyle('#aak-notification-close { padding:5px !important; color: #fff !important; background-color: #c00 !important; display:inline-block; text-decoration: none; }');

    // Style notification Content height:72px;
    Aak.addStyle('#aak-notification-content { padding:10px 0px 10px 112px !important;  background-image:url("' + Aak.iconURL + '"); background-repeat:no-repeat; background-position:20px 10px; background-size:72px; min-height:72px;}');
    Aak.addStyle('#aak-notification-content a { color: #c00 !important; text-decoration: none; }');
    Aak.addStyle('#aak-notification-content a:hover { text-decoration: underline; }');

    // Create notification
    var node = document.createElement('div');
    node.id = 'aak-notification';
    node.innerHTML = '<div id="aak-notification-menu"><a title="Visit Homepage." href="' + Aak.homeURL + '">Homepage</a> | <a title="Report new site, fix site or bug." href="' + Aak.reportURL + '">Report</a> | <a title="See changes" href="' + Aak.changelogURL + '">Changelog</a> | <a title="Make a donation to support the project." href="' + Aak.homeURL + '">Donate</a> | <a title="Submit a new feature." href="http://userscripts.org/scripts/discuss/155840">Suggest Features</a> | <a title="Close" href="javascript:void(0);" id="aak-notification-close">Close</a></div><div id="aak-notification-content"><div style="font-size: 20px;">Anti-Adblock Killer v' + Aak.getVersion() + '</div>' + message + '</div>';

    // Append notification
    document.documentElement.appendChild(node);

    // Manually Close notification
    node.onclick = function () {
      Aak.removeElement('#aak-notification');
    }

    // Automatically Close notification
    setTimeout(function () {
      Aak.removeElement('#aak-notification');
    }, delay);
  },
  detectFilters : function () {
    window.addEventListener('load', function () {
      if (window.top != window.self)
        return; // stop if iframe

      var elem = document.createElement("div");
      elem.id = "k2Uw7isHrMm5JXP1Vwdxc567ZKc1aZ4I";
      elem.innerHTML = "<br/>";
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

	  if(!Aak.getVersion()) return;
	  if (window.top != window.self) return; // stop if iframe

      Aak.notification('<b>Userscript: </b><i id="aak-update-script">Checking...</i><br/><b>Filters: </b><i id="aak-update-filters">Checking...</i>', 60000);
	  
	  setTimeout(function () {
	    Aak.update.getLatestVerScript();
		Aak.update.getLatestVerFilters();
	  },2000);
	  
    },
    checkAuto : function () {
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
          //console.log(res, status, json);
 
          if (status == 200 && typeof json == 'object' && json.update) {
            Aak.update.check();
          }
        }
      });
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
              var message = 'New v' + verLatest + ' available, <a title="Install latest version" href="' + Aak.downloadURL + '" target="_blank">Install</a>';
            } else {
              var message = 'Latest version already installed. &#10004;';
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
              var message = 'New v' + verLatest + ' available, <a title="Install latest version" id="aak-subscribe" href="' + Aak.filtersSubscribe + '" target="_blank">Install</a>';
			  
            } else {
              var message = 'Latest version already installed. &#10004;';
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
  confirmLeave : function () {
    window.onbeforeunload = function () {
      return '';
    };
  },
  stopScript : function (e) {
    e.preventDefault();
    e.stopPropagation();
  },
  innerScript : function (e) {
    return e.target.innerHTML;
  },
  addScript : function (s) {
    if (/\.js$/.test(s)) { // External
      document.head.appendChild(document.createElement('script')).src = s;
    } else { // inline
      document.head.appendChild(document.createElement('script')).innerHTML = s.toString().replace(/^function.*{|}$/g, '');
    }
  },
  addElement : function (id) {
    Aak.addScript('function() { document.documentElement.appendChild(document.createElement("div")).id = "' + id + '"; }');
  },
  removeElement : function (o) {
    if (typeof o === "object") {
      return o.parentNode.removeChild(o);
    } else if (typeof o === "string") {
      var elem = document.querySelectorAll(o);
      for (var i = 0; i < elem.length; i++) {
        //Aak.log("Remove ", elem[i]);
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
  player : function (file, width, height) {
    if (/^streamer/.test(file)) {
      var flashvars = file;
    } else {
      var flashvars = "file=" + file;
    }
    // Create player  // 480x270
    var player = document.createElement("object");
    player.setAttribute("data", "http://player.longtailvideo.com/player5.9.swf");
    player.setAttribute("height", height);
    player.setAttribute("width", width);
    player.setAttribute("type", "application/x-shockwave-flash");
    player.setAttribute("id", 'Aak-jwPlayer');
    player.setAttribute('allowscriptaccess', 'always');
    player.setAttribute("allowfullscreen", 'true'); ;
    player.setAttribute("bgcolor", "#000000");
    player.setAttribute("wmode", "opaque");
    player.setAttribute("seamlesstabbing", "true");
    player.setAttribute("flashvars", flashvars);
    return player;
  },
  rules : { // Rules
    // ----------------------------------------------------
    // Specific
    // ----------------------------------------------------
    uptobox : {
      Host : ['uptobox.com'],
      Inject : function () {
        // Solution 1
        var id = location.pathname.match(/[0-9a-z]{12}/);
        if (id != null) {
          Aak.addStyle("#" + id[0] + " { height: 12px !important; }");
        }
        // Solution 2
        Aak.addStyle("div.ad-leader > div[id] { height: 12px !important; }");
      },
      Loaded : function () {
        // https://developer.mozilla.org/fr/docs/DOM/element.clientHeight
        /*
        console.log(document.getElementById("rhcqzrc20ogq").clientHeight);
        console.log(document.getElementById("rhcqzrc20ogq").style.height);
        console.log(document.getElementById("rhcqzrc20ogq").style.position);
         */
      },
      BeforeFix : function () {},
      Before : function (e) {
        if (Aak.innerScript(e).contains('window.location = "/pages/adblock.html"')) {
          Aak.stopScript(e);
        }
      }
    },
    elahmad : {
      Host : ['elahmad.com'],
      Inject : function () {
        Aak.addStyle("#adblock { height: 1px !important; }");
      }
    },
    multiup : {
      Host : ['multiup.org', 'streamupload.org'],
      Inject : function () {
        Aak.addStyle("#crazy { height: 3px !important; }");
      }
    },
    mrtzcmp3 : {
      Host : ['mrtzcmp3.net'],
      Inject : function () {
        Aak.addStyle(".rtm_ad { height: 1px !important; }");
      }
    },
    go4up : {
      Host : ['go4up.com'],
      Inject : function () {
        Aak.addStyle(".myTestAd { height: 1px !important; }");
      }
    },
    bggledaitv : {
      Host : ['bg-gledai.tv'],
      Inject : function () {
        Aak.addStyle(".myAd { height: 1px !important; }");
      }
    },
    thepcspy : { // http://thepcspy.com/read/how_to_block_adblock/
      Host : ['thepcspy.com'],
      Inject : function () {
        Aak.addStyle(".myTestAd { height: 1px !important; }");
        Aak.addStyle(".blocked { display: none !important; }");
      },
      Loaded : function () {
        Aak.removeElement('.blocked');
      }
    },
    automobilesportive : {
      Host : ['automobile-sportive.com'],
      Inject : function () {
        Aak.addStyle(".myTestAd { height: 51px !important; display: none !important; }");
      }
    },
    snswus : {
      Host : ['snsw.us'],
      Inject : function () {
        Aak.addStyle("#ad_1 { height: 1px !important; }");
      }
    },
    interfans : { // http://www.interfans.org/forum/
      Host : ['interfans.org'],
      Inject : function () {
        Aak.addStyle(".ad_global_header { height: 1px !important; display: none !important; }");
      }
    },
    maxdebrideur : {
      Host : ['maxdebrideur.com'],
      Inject : function () {
        Aak.addStyle(".clear + div[id] { height: 12px !important; }");
      }
    },
    topzone : {
      Host : ['topzone.lt'],
      Inject : function () {
        Aak.addStyle(".forumAd { height: 1px !important; display: none !important; }");
      }
    },
    tweaktown : {
      Host : ['tweaktown.com'],
      Inject : function () {
        Aak.addStyle("#div-gpt-ad-1378071706813-0, #div-gpt-ad-1378150878492-1 { height: 3px !important; display: none !important; }");
      }
    },
    debrideurstream : {
      Host : ['debrideurstream.fr'],
      Inject : function () {
        Aak.addStyle("#content div[id][align=center] { height: 12px !important; }");
      }
    },
    preemlinks : {
      Host : ['preemlinks.com'],
      Inject : function () {
        Aak.addStyle("#divads { height: 1px !important; }");
      }
    },
    hentaito : {
      Host : ['hentai.to'],
      Inject : function () {
        Aak.addStyle("#hentaito123 { height: 11px !important; }");
      }
    },
    prototurk : {
      Host : ['prototurk.com'],
      Inject : function () {
        Aak.addStyle("#reklam { height: 1px !important; }");
      }
    },
    watcharab : {
      Host : ['watcharab.com'],
      Inject : function () {
		// + adp rule watcharab.com#@##adblock
        Aak.addStyle("#adblock { height: 5px !important; }");
      }
    },
    freedomip : {
      Host : ['freedom-ip.com'],
      Inject : function () {
        Aak.addStyle(".pub_vertical ins, .pub_vertical div { height: 11px !important; }");
      }
    },
    wakanim : {
      Host : ['wakanim.tv'],
      Inject : function () {
        Aak.addStyle("#detector { display: none !important; }");
        Aak.addStyle("#nopub { display: block !important; }");
      }
    },
    divIdZdXd : { // packed function eval
      Host : ['picstwist.com', 'pornblogy.com', 'imgboo.me', 'urlgalleries.net', 'camelstyle.net', 'filmovizija.com', 'imgleech.com', 'hqpdb.com'],
      Inject : function () {
        Aak.addStyle("#zd, #xd { height: 1px !important; visibility: visible !important;  display: block  !important; }");
        Aak.addElement('zd');
        Aak.addElement('xd');
      }
    },
    divIdWdGd : { // packed function eval
      Host : ['onlyteensx.net'],
      Inject : function () {
        Aak.addStyle("#wd, #gd { height: 1px !important; visibility: visible !important;  display: block  !important; }");
        Aak.addElement('wd');
        Aak.addElement('gd');
      }
    },
    divIdTester : {
      Host : ['osoarcade.com', 'd3brid4y0u.info', 'fileice.net', 'filmovizija.com', 'nosteam.ro', 'openrunner.com', 'chine-informations.com', 'easybillets.com', 'spox.fr', 'yovoyages.com', 'tv3.co.nz', 'freeallmusic.info', 'putlocker.com', 'sockshare.com', 'dramapassion.com'],
      Inject : function () {
        Aak.addElement('tester');
      }
    },
    divIdAdd : {
      Host : ['filecom.net', 'upshare.org', 'skippyfile.com', 'mwfiles.net', 'up-flow.org'],
      // @@||filecom.net/advertisement.js
      // document.write('<div id="add"></div>');
      Inject : function () {
        Aak.addElement('add');
      }
    },
    freegamehosting : {
      Host : ['freegamehosting.nl'],
      Inject : function () {
        Aak.addElement('adtest');
      }
    },
    theweatherspace : {
      Host : ['theweatherspace.com'],
      Inject : function () {
        Aak.addElement('ab-bl-advertisement');
      }
    },
    leaguesecretary : {
      // @@||teknogods.com/advert.js
      // <div id="adpbtest">;
      Host : ['leaguesecretary.com', 'teknogods.com'],
      Inject : function () {
        Aak.addElement('adpbtest');
      }
    },
    primeshare : {
      Host : ['primeshare.tv'],
      Inject : function () {
        Aak.addElement('adblock');
      }
    },
    freesportsbet : {
      Host : ['freesportsbet.com'],
      Inject : function () {
        Aak.addElement('ad-tester');
      }
    },
    jkanime : {
      Host : ['jkanime.net'],
      // @@||jkanime.net/assets/js/advertisement2.js
      Inject : function () {
        Aak.addElement('reco');
      }
    },
    _720pmkv : {
      Host : ['720pmkv.com'],
      Inject : function () {
        Aak.addElement('advert');
      }
    },
    eventhubs : {
      Host : ['eventhubs.com'],
      Inject : function () {
        Aak.addElement('blahyblaci1');
        unsafeWindow.clearInterval(tid);
      },
      Loaded : function () {
        unsafeWindow.clearInterval(tid);
      }
    },
    kissanime : {
      Host : ['kissanime.com'],
      Loaded : function () {

        if (/id=[\d]+$/.test(location.href)) {
          setTimeout(function () {

            // All Players [flashvars*="googlevideo.com"][id]
            var players = document.querySelectorAll('embed');
            console.log(players);

            // Clear document
            if (players.length > 0) {
              document.head.innerHTML = "";
              document.body.innerHTML = "";

              // Insert Players
              for (var v = 0; v < players.length; v++) {
                //player[v].src = "http://www.youtube.com/get_player?enablejsapi=1&modestbranding=1&autohide=1";

                players[v].style.display = "block";
                document.documentElement.appendChild(players[v]);
              }
            }

          }, 3000);
        }

      },
      BeforeFix : function () {},
      Before : function (e) {

        var code = Aak.innerScript(e);
        if (/id=[\d]+$/.test(location.href) &&
          /(adblock|ad block|adblocker|adblockers|ad blocker|ad blockers)/i.test(code) &&
          /setTimeout\(/i.test(code) &&
          /\.getScript\(/i.test(code) &&
          /\.load\(function/i.test(code) &&
          /\.hide\(\)/i.test(code) &&
          /\.html\(/i.test(code) &&
          /\.length/i.test(code)) {
          Aak.stopScript(e);
        }

      }
    },
    antennesport : {
      Host : ['antennesport.com', 'serverhd.eu'],
      Loaded : function () { // for antennesport
        // Remove Pub
        Aak.removeElement("#pub .pubclose");
        // Redirect to Player
        document.querySelector("#pub .embed iframe").src = "/embed/embed.php";
      },
      Before : function (e) { // for serverhd
        if (Aak.innerScript(e).contains('http://xaxa.juanantoniogonza.netdna-cdn.com/noadsblock.html')) {
          Aak.stopScript(e);
        }
      }
    },
    disableWindowAlert : {
      Host : ['drivearabia.com', 'putlocker.com', 'doatoolsita.altervista.org', 'sockshare.com', 'free-movie-home.com', 'pc.online143.com', 'pregen.net', 'kooora.com', 'str3amtv.co.nr', 'str3amtv.altervista.org', 'str3am.altervista.org'],
      Inject : function () {
        unsafeWindow.alert = false;
      }
    },
    vgunetwork : {
      Host : ['vgunetwork.com'],
      Loaded : function () {
        Aak.setCookie('stopIt', 1);
        var close = Aak.getElement('#some_ad_block_key_close');
        if (close)
          close.click();
      }
    },
    seekingalpha : {
      Host : ['seekingalpha.com'],
      Loaded : function () {
        unsafeWindow.SA.Pages.Article.is_gnikcolbda = function () {
          return false;
        }
      }
    },
    anisearch : { // solution on filter list
      Host : ['anisearch.com'],
      Loaded : function () {
        //unsafeWindow.is_loaded = true;
        //Aak.removeElement('.box-error');
      }
    },
    userscripts : {
      Host : ['userscripts.org'],
      Loaded : function () {
        if (/155840$/.test(location.pathname)) {
          if (Aak.getElement('#install_script')) {
            document.querySelector('#install_script').innerHTML = '<a class="userjs" href="http://bc.vc/NRzHOf" title="Anti-Adblock Killer | Userscript">Install</a><a class="userjs" href="http://bc.vc/jGFxOb" title="Anti-Adblock Killer | Filters for Adblockers">Subscribe</a>';
          }
        }
      }
    },
    openuserjs : { 
      Host : ['openuserjs.org'],
      Loaded : function () {
        if (/Anti-Adblock_Killer_Reek$/.test(location.pathname)) {
          Aak.getReadme('div.content-box');
        }
      }
    },	
    greasyfork : { 
      Host : ['greasyfork.org'],
      Loaded : function () {
        if (/-anti-adblock-killer-reek$/.test(location.pathname)) {
          Aak.getReadme('section#script-info');
        }
      }
    },	
    aidemu : {
      Host : ['aidemu.fr'],
      Inject : function () {
        Aak.setCookie('adblockPopup', true);
      }
    },
    eami : {
      Host : ['eami.in'],
      Inject : function () {
        Aak.setCookie('ad_locked', 1);
      },
      Loaded : function () {
        Aak.setCookie('ad_locked', 1);
      }
    },
    ilive : {
      Host : ['ilive.to'],
      Loaded : function () { // just remove ad
        //Aak.removeElement('#ad_overlay');
      }
    },
    bitcoiner : {
      Host : ['bitcoiner.net'],
      Loaded : function () {
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
      Host : ['bigdownloader.com'],
      Loaded : function () {
        Aak.removeElement('#anti_adblock');
      }
    },
    gametrailers : {
      Host : ['gametrailers.com'],
      Loaded : function () {
        Aak.removeElement('#ad_blocking');
      }
    },
    filmovizija : {
      Host : ['filmovizija.com'],
      Loaded : function () {
        Aak.removeElement('#jebi-se-adblock');
      }
    },
    debrastagi : {
      Host : ['debrastagi.com'],
      Loaded : function () {
        Aak.removeElement('#stp-main');
        Aak.removeElement('#stp-bg');
      }
    },
    rapidebrideur : {
      Host : ['rapidebrideur.com'],
      Inject : function () {
        Aak.addStyle("html body div.container-fluid div.row-fluid div.span9 div div[id] { height: 12px !important;  display: block  !important; }");
      },
      BeforeFix : function () {},
      Before : function (e) {
        if (Aak.innerScript(e).contains('window.location = "../pages/adblock.html";')) {
          Aak.stopScript(e);
        }
      }
    },
    blockblockA : { // Solution was also added to AAK-Filters
      // http://sport-show.fr/js/advertisement-AdBlock.js
      // http://www.2site.me/advertisement-AdBlock.js
      Host : ['sport-show.fr', 'vipflash.net', '2site.me'],
      Inject : function () {
        Aak.addStyle("#blockblockA {visibility:invisible!important;display:none!important;}#blockblockA td {visibility:invisible!important;display:none!important;}#blockblockA td p {visibility:invisible!important;display:none!important;}#blockblockB {visibility:visible!important;display:block!important;}");
      }
    },
    megadebrid : {
      Host : ['mega-debrid.eu'],
      Inject : function () {
        unsafeWindow.alert = false;
      },
      Loaded : function () {
        // Activate button debrid
        var realbutton = Aak.getElement('.realbutton');
        if (realbutton) {
          realbutton.setAttribute('onclick', '');
          realbutton.setAttribute('type', 'submit');
        }
      }
    },
    bokepspot : {
      Host : ['bokepspot.com'],
      Inject : function () {
        // Hide Disclaimer
        Aak.setCookie('hideDialog', 'hide');
      },
      Loaded : function () {
        // Remove Disable AdBlock
        Aak.removeElement('#tupiklan');
      }
    },
    picload : {
      Host : ['picload.org'],
      Inject : function () {
        // No AdBlocker
        Aak.setCookie('pl_adblocker', false);
      }
    },
    freezedownload : {
      Host : ['freezedownload.com'],
      Loaded : function () {
        if (/freezedownload.com\/download\//.test(location.href)) {
          Aak.removeElement('body > div[id]');
        }
      }
    },
    rapid8 : {
      Host : ['rapid8.com'],
      Loaded : function () {
        Aak.removeElement('div.backk + #blcokMzg');
        Aak.removeElement('div.backk');
      }
    },
    adfly : {
      Host : ['adf.ly', 'q.gs', 'j.gs', 'u.bb', '9.bb', 'go.phpnulledscripts.com'],
      Loaded : function () {

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
      Host : ['tvdez.com', 'casadossegredos.tv', 'estadiofutebol.com', 'televisaofutebol.com'],
      Inject : function () {
        Aak.addStyle("#pubfooter, #pub2 { height: 30px !important; display: block !important; }");
        Aak.setCookie("adblock", null, 0);
      },
      BeforeFix : function () {
        /* solved with filter list */
      },
      Before : function (e) {
        if (Aak.innerScript(e).contains("location.href = 'adblock.php';")) {
          Aak.stopScript(e);
        }
      }
    },
    tekdomains : {
      Host : ['tek.no', 'hardware.no', 'akam.no', 'teknojobb.no', 'amobil.no', 'gamer.no', 'teknofil.no'],
      Loaded : function () {
        unsafeWindow.Tek = false;
        localStorage.clear();
        sessionStorage.clear();
      }
    },
    livesoccerhq : {
      Host : ['livesoccerhq.com', 'lvshd.altervista.org'],
      Loaded : function () {
        if ("http://livesoccerhq.com/" == location.href) {
          location.href = 'http://livesoccerhq.com/programacao.php';
        } else {
          var matches = location.href.match(/link=([\w]+)/i);
          if (matches[1]) {
            console.log(atob(matches[1]));
            location.href = atob(matches[1]);
          }
        }
      }
    },
    privateinsta : {
      Host : ['privateinsta.com'],
      Loaded : function () {
        // AdScendMedia
        unsafeWindow.unscroll = false;
        Aak.removeElement("#gw_overlay");
      }
    },
    str3amtv : { // remove ads
      Host : ['altervista.org'],
      Loaded : function () {
        Aak.removeElement('div[id^="floatLayer"]');
      }
    },
    risikogesundheit : {
      Host : ['risiko-gesundheit.de'],
      Loaded : function (e) {
        setTimeout(function () {
          window.stop();
        }, 5000);
      }
    },	
    prozik : {
      Host : ['pro-zik.ws', 'pro-tect.ws', 'pro-ddl.ws', 'pro-sport.ws'],
      Inject : function () {
        Aak.setCookie('visitedf', true);
        Aak.setCookie('visitedh', true);
      }
    },	
    // ----------------------------------------------------
    // Specific & Players
    // ----------------------------------------------------
    videobug : {
      Host : ['videobug.net'],
      Inserted : function (insertedNode) {
        if (insertedNode.nextSibling.id == 'flowplayer_api' && insertedNode.style && insertedNode.innerHTML.contains('Please dont use A.dblock, its very expensive to maintain video hosting. Thank you')) {
          //console.log(insertedNode);
          Aak.removeElement(insertedNode);
        }
      }
    }, 
    abola : {
      Host : ['miragens.abola.pt'],
      Loaded : function () {
        //http://www.miragens.abola.pt/videosdetalhe.aspx?id=19695
        //http://www.miragens.abola.pt/vabolaoffice/uploads/19/69/5/19695.flv

        // video
        if (location.pathname !== '/videosdetalhe.aspx') {
          return false;
        }
        var videoid = location.href.match(/videosdetalhe.aspx[\?]id=([\d]+)/)[1];
        var videodir = videoid.match(/.{1,2}/g).join('/');
        var videofile = 'http://www.miragens.abola.pt/vabolaoffice/uploads/' + videodir + '/' + videoid + '.flv';
        var oldPlayer = document.querySelector("#flvplayerIE");
        var newPlayer = Aak.player(videofile, '500', '281');
        var divPlayer = oldPlayer.parentNode;

        // replace player
        divPlayer.replaceChild(newPlayer, oldPlayer);

      }
    },
    voxnow : {
      Host : ['voxnow.de', 'rtl-now.rtl.de', 'rtl2now.rtl2.de', 'n-tvnow.de', 'superrtlnow.de', 'rtlnitronow.de'],
      Loaded : function () {

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
      Host : ['playtv.fr'],
      Inject : function () {},
      Loaded : function () {

        document.body.onclick = function () {
          // request user confirmation
          window.onbeforeunload = false;
          setTimeout(Aak.confirmLeave, 2000);
        }

        var container = document.querySelector(".notice-adb-container");
        var player = document.querySelector("#player");
        container.appendChild(player);
		
		//Aak.addStyle('#cboxOverlay, #cboxWrapper { display:none;}');

        // Solution using mobile webpage
        //if ("playtv.fr" == location.host) {
        //  location.href = 'http://m.playtv.fr/';
        //}

      },
      Before : function (e) {
	    // http://playtv.fr/assets/scripts/main.1399905958517.js
        //if (/scripts\/main\.\d+\.js$/.test(e.target.src)) {
          //Aak.stopScript(e);
		  //console.log(e.target.src);
        //}
      }
    },
    myspass : {
      Host : ['myspass.de'],
      Loaded : function () {

        var videoid = location.pathname.match(/\/(\d+)\/$/)[1];

        if (!videoid)
          return false;

        GM_xmlhttpRequest({
          method : "GET",
          url : 'http://www.myspass.de/myspass/includes/apps/video/getvideometadataxml.php?id=' + videoid,
          headers : {
            'User-agent' : navigator.userAgent,
            'Content-Type' : 'application/xml',
          },
          onload : function (result) {
            var res = result.responseText;
            //console.log(res);

            // parser xml
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(res, "application/xml");

            // video
            var videofile = xmlDoc.getElementsByTagName("url_flv").item(0).textContent;
            var oldPlayer = document.querySelector('embed#player');
            var newPlayer = Aak.player(videofile, '640', '360');
            var divPlayer = document.querySelector('div#player');

            // replace
            divPlayer.innerHTML = '';
            divPlayer.appendChild(newPlayer);
            //divVideo.replaceChild(newPlayer, oldVideo);

          }
        });

      }
    },
    ilive : {
      Host : ['ilive.to'],
      Loaded : function () {
        if (/^\/embedplayer.php/i.test(location.pathname)) {

          var close = setInterval(function () {
              document.querySelector("#ad_overlay_close").click();
            }, 1000);

          setTimeout(function () {
            clearInterval(close);
          }, 5000);

        }
      }
    },
    sharecast : {
      Host : ['sharecast.to'],
      Loaded : function () {
        if (/^\/embed.php/i.test(location.pathname)) {

          //setInterval(function(){ // remove event
          //  unsafeWindow.document.body.onclick = false;
          //},0);

          var oldPlayer = document.querySelector("object#container");
          var flashvars = oldPlayer.querySelector('param[name="flashvars"]').value;
          var flashvars = flashvars.replace("&stretching=uniform&controlbar.position=over", "");
          var newPlayer = Aak.player(flashvars, '600', '400');
          var divPlayer = oldPlayer.parentNode;

          // remove head
          document.querySelector('head').innerHTML = '';

          // replace player
          divPlayer.replaceChild(newPlayer, oldPlayer);
        }
      },
      Before : function (e) {
        if (Aak.innerScript(e).contains('function popundrInit()')) {
          Aak.stopScript(e);
        }
      }
    },
    kingofplayers : {
      Host : ['kingofplayers.com66'],
      Loaded : function () {
        if (/^\/stream[\d]+.html/i.test(location.pathname)) {

          var oldPlayer = document.querySelector("object#playerflash");
          var flashvars = oldPlayer.querySelector('param[name="flashvars"]').value;
          var flashvars = flashvars.replace("&stretching=uniform&controlbar.position=over", "");
          var newPlayer = Aak.player(flashvars, '600', '400');
          var divPlayer = oldPlayer.parentNode;

          // remove head
          document.querySelector('head').innerHTML = '';

          // replace player
          divPlayer.replaceChild(newPlayer, oldPlayer);
        }
      }
    },
    flowplayer : {
      Host : ['videofun.me', 'play44.net'],
      Loaded : function () {

        if (/^\/embed/i.test(location.pathname)) {
          setTimeout(function () {

            var player = document.querySelector("#flowplayer_api");
            console.log(location.pathname);
            var parent = player.parentNode;
            var clone = player.cloneNode(true);
            clone.querySelector('param[name="allowfullscreen"]').value = true;

            // replace player
            parent.replaceChild(clone, player);

          }, 1000);
        }
      }
    },
    // ----------------------------------------------------
    // Specific & Firefox
    // ----------------------------------------------------
     gamespowerita : {
      Host : ['gamespowerita.com'],
      BeforeFix : function () {
        /* solved with filter list */
      },
      Before : function (e) {
        if (Aak.innerScript(e).contains('(document.getElementById("test" + id_2).style.height < 1)') || Aak.innerScript(e).contains('if(typeof(window.google_jobrunner)=="undefined" || document.getElementById("test" + id_2).style.height < 1)') || Aak.innerScript(e).contains('if(typeof(window.google_jobrunner)=="undefined")')) {
          Aak.stopScript(e);
        }
      }
    },
    sporttvdireto : {
      Host : ['sporttvdireto.com', 'tvdesporto.com'],
      Inject : function () {
        // this solution dont works
        // document.getElementById('ads1').clientHeight < 20
        Aak.addElement('ads1');
        Aak.addStyle("#ads1 { height: 30px !important; }");
      },
      Before : function (e) {
        if (Aak.innerScript(e).contains('location.href = \'http://tvdesporto.com/chorar.php\';')) {
          Aak.stopScript(e);
        }
      }
    },
    zeb89 : {
      Host : ['zeb89.altervista.org'],
      // greasemonkey/addons4.js
      BeforeFix : function () {
        // No need for Chrome, Opera, Safari
      },
      Before : function (e) {
        if (Aak.innerScript(e).contains('typeof GM_addonsStartup !== "undefined"')) {
          Aak.stopScript(e);
        }
      }
    },
    sawlive : { // to check
      Host : ['sawlive.tv'],
      Before : function (e) {
        // Find timer and proceed
        if (Aak.innerScript(e).contains('function closeMyAd(){')) {
          Aak.stopScript(e);

          document.getElementById("sawdiv").innerHTML = "";
          document.getElementById("sawdiv").style.display = "none";
          document.getElementById("splay").style.visibility = "visible";
          document.getElementById("sloading").innerHTML = "";
          unsafeWindow.active = 1;
          unsafeWindow.so.write("jwplayer1");
        }
      }
    },
    dinozap : { // to check
      Host : ['dinozap.tv'],
      Before : function (e) {
        if (Aak.innerScript(e).contains('window.location = "http://www.dinozap.tv/noadsblock.html"') || Aak.innerScript(e).contains('window.location = "http://cache.hdcastream.com/noadsblock.html"')) {
          Aak.stopScript(e);
        }
      }
    },
    // ----------------------------------------------------
    // Generic
    // ----------------------------------------------------
    generic : {
      Host : ['.*?'],
      Inject : function () {
        // Adunblock - http://adunblock.com/
        Aak.setCookie("adblock", 0);
        unsafeWindow.adblock_antib = false;
        unsafeWindow.adblock = !1;
      },
      Loaded : function () {
        // Adunblock - http://adunblock.com/
        Aak.setCookie("adblock", 0);
        unsafeWindow.adblock_antib = false;
        unsafeWindow.adblock = !1;

        // Better Stop Adblock
        //unsafeWindow.audio_file = false;

        // Unknow Anti AdBlock system
        if (Aak.getElement('#blockdiv') && Aak.getElement('#blockdiv').innerHTML.contains('disable ad blocking or use another browser without any adblocker when you visit')) {
          Aak.removeElement('#blockdiv');
        }

        // Antiblock - http://antiblock.org/
        localStorage.antiblockId = false;
        var styles = document.querySelectorAll('style');
        for (var i in styles) {
          var style = styles[i];
          //console.log(currStyle); 
          if (typeof style == "object") {
            var css = style.innerHTML.replace(/[\n\r\t\s]+/g, "");
            var matches = css.match(/#([0-9a-z]{4,10})\{.*position:fixed\!important;.+document\.documentElement.scrollTop\?document\.documentElement\.scrollTop:document\.body\.scrollTop.+\}#/i);
            if (matches != null && matches.length == 2) {
              //console.log(matches);
              localStorage.antiblockId = matches[1];
            }
          }
        }
      },
      Inserted : function (insertedNode) {

        // All Nodes
        //console.log(insertedNode);

        // Adunblock - http://adunblock.com/
        var reId = /^[a-z]{8}$/;
        var reClass = /^[a-z]{8} [a-z]{8}$/;
        var reStyle = /top: -?[\d]+px; opacity: [\d]; visibility: visible;/;
        var reBg = /^[a-z]{8}-bg$/;
        var reMessage = /Il semblerait que vous utilisiez un bloqueur de publicité !/;

        // Full Screen Message (Premium)
        if (insertedNode.id &&
          insertedNode.className &&
          insertedNode.style &&
          reId.test(insertedNode.id) &&
          reClass.test(insertedNode.className) &&
          reStyle.test(insertedNode.style.cssText) &&
          reMessage.test(insertedNode.innerHTML) &&
          insertedNode.nextSibling.nodeName == 'DIV' &&
          insertedNode.nextSibling.className &&
          reBg.test(insertedNode.nextSibling.className)) {

          // Remove Message
          Aak.log("Remove AdUnBlock.com (Premium)");
          Aak.removeElement(insertedNode.nextSibling);
          Aak.removeElement(insertedNode);
        }
        // Top bar Message (Free)
        else if (insertedNode.id &&
          reId.test(insertedNode.id) &&
          reMessage.test(insertedNode.innerHTML)) {

          // Remove Message
          Aak.log("Remove AdUnBlock.com (Free)");
          Aak.removeElement(insertedNode);
        }

        // Antiblock - http://antiblock.org/
        var reId = /^[a-z0-9]{4,10}$/i;
        var reName1 = /(div|span|b|i|font|strong|center)/i;
        var reName2 = /[abisuqp]{1}/i;
        var reWords1 = /ad blocker|ad block|ad-block|adblocker|ad-blocker|adblock|bloqueur|bloqueador|Werbeblocker|adblockert|آدبلوك بلس/i;
        var reWords2 = /disable|désactivez|désactiver|desactivez|desactiver|desative|desactivar|desactive|desactiva|deaktiviere|disabilitare|απενεργοποίηση|запрещать|állítsd le/i;
        var reImg = /data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAA|data:image\/gif;base64,R0lGODlhMwLKAPcAAAAAAIAAAACAAICAAAAA|filmovizija.com\/kodee.png|dbzog.de\/Bilder\/dbzogb1.png/;

        // Communs
        if (insertedNode.id &&
          insertedNode.style &&
          insertedNode.firstChild &&
          reId.test(insertedNode.id) &&
          reName1.test(insertedNode.nodeName) &&
          reName2.test(insertedNode.firstChild.nodeName)) {
          //console.log(insertedNode);


          // Better Stop Adblock
          if (/Better Stop Adblock/.test(insertedNode.innerHTML) &&
            insertedNode.id.length == 10) {

            var nodes = document.body.childNodes;
            for (var i = 0; i < nodes.length; i++) {
              if (nodes[i].nodeName == 'DIV' && nodes[i].id && nodes[i].className) {
                nodes[i].style.display = "block";
                //console.log(nodes[i]);
              }
            }
            // Remove
            Aak.removeElement(insertedNode);
            Aak.log("Remove Better Stop Adblock");
          }

          // Antiblock.org v2
          else if (reWords1.test(insertedNode.innerHTML) &&
            reWords2.test(insertedNode.innerHTML)) {

            // Remove
            Aak.log("Remove Antiblock.org v2");
            Aak.removeElement(insertedNode);
            //console.log(insertedNode);
          }
          // Antiblock.org v3
          else if (insertedNode.firstChild.firstChild &&
            insertedNode.firstChild.firstChild.nodeName == "IMG" &&
            reImg.test(insertedNode.firstChild.firstChild.src)) {

            // Remove
            Aak.log("Remove Antiblock.org v3");
            Aak.removeElement(insertedNode);
            //console.log(insertedNode);
          }
          // Alternative solution to disable all versions
          else if (localStorage.antiblockId != false &&
            insertedNode.id == localStorage.antiblockId) {

            // Remove
            Aak.log("Remove Antiblock.org v2 & v3");
            Aak.removeElement(insertedNode);
            //console.log(insertedNode);
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
  Run
======================================================*/

// Initialize
Aak.init();

// Detect & Kill
for (var i in Aak.rules) {
  
  // Current
  currRule = Aak.rules[i];
  
  // RegExp Host
  var reHost = new RegExp(currRule.Host.join('|'), 'i');
  // If domains is
  if (reHost.test(location.host)) {
    // Add Js / Css / Cookie
    if (currRule.Inject) {
      currRule.Inject();
    }
    // Cancel Js Script
    if (currRule.Before) {
      // Mozilla Firefox
      if ('onbeforescriptexecute' in window) {
        window.addEventListener('beforescriptexecute', currRule.Before);
      }
      // Others Browsers
      else if (currRule.BeforeFix) {
        currRule.BeforeFix();
      }
      // Alert just solution for Firefox
      else if (currRule.Host != '.*?') {
        Aak.notification('This protection can not be neutralized by using the browser Mozilla Firefox.', 5000);
      }
    }
    // When Window Load
    if (currRule.Loaded) { // DOMContentLoaded
      window.addEventListener('DOMContentLoaded', currRule.Loaded);
    }
    // When DOM Elements are Insered in Document
    if (currRule.Inserted) {

      // Mutation Observer
	  // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
	  // http://caniuse.com/mutationobserver 
      if (typeof window.MutationObserver != 'undefined' ||
        typeof WebKitMutationObserver != 'undefined') {

        // Mutation Observer
        var MutationObserver = window.MutationObserver || WebKitMutationObserver;

        // Create an observer instance
        var obs = new MutationObserver(function (mutations) {
            // We can safely use `forEach` because we already use mutation
            // observers that are more recent than `forEach`. (source: MDN)
            mutations.forEach(function (mut) {
              // we want only added nodes
              if (!mut.addedNodes) {
                return;
              }
              Array.prototype.forEach.call(mut.addedNodes, function (addedNode) {

                //console.log(addedNode);
                currRule.Inserted(addedNode);

              });
            });
          });
        // Observer
        obs.observe(document, {
          childList : true,
          subtree : true
        });
      }
      // Mutation Events (Alternative Solution)
      // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Mutation_events
      else {
        window.addEventListener("DOMNodeInserted", function (e) {
          currRule.Inserted(e.target);
        }, false);
      }
    }
  }
}


