// ==UserScript==
// ==UserScript==
// @name Anti-Adblock Killer | Reek
// @namespace https://userscripts.org/scripts/show/155840
// @description Anti-Adblock Killer is a userscript aiming to circumvent many protections used on some websites that force the user to disable AdBlockers.
// @author Reek | reeksite.com
// @version 9.1
// @encoding utf-8
// @license https://creativecommons.org/licenses/by-nc-sa/4.0/
// @icon https://raw.github.com/reek/anti-adblock-killer/master/anti-adblock-killer-icon.png
// @homepage http://reek.github.io/anti-adblock-killer/
// @twitterURL https://twitter.com/antiadbkiller
// @contactURL http://reek.github.io/anti-adblock-killer/#contact
// @supportURL https://github.com/reek/anti-adblock-killer/issues
// @contributionURL https://github.com/reek/anti-adblock-killer#donate
// @updateURL https://raw.githubusercontent.com/reek/anti-adblock-killer/master/anti-adblock-killer.user.js
// @downloadURL https://raw.githubusercontent.com/reek/anti-adblock-killer/master/anti-adblock-killer.user.js
// @include http*://*
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

  Donors: M. Howard, Shunjou, Charmine, Kierek93, G. Barnard, H. Young, Seinhor9, ImGlodar, Ivanosevitch, HomeDipo, R. Martin, DrFiZ, Tippy, B. Rohner, P. Kozica, M. Patel, W4rell, Tscheckoff, AdBlock Polska, AVENIR INTERNET, coolNAO, Ben, J. Park, C. Young, J. Bou, M. Cano, J. Jung, A. Sonino, J. Litten, M. Schrumpf, G. Pepe, A. Trufanov, R. Palmer, J. Rautiainen, S. Blystone, M. Silveira, K. MacArthur, M. Ivanov, A. Schmidt, A. Waage, F. Tismer, S. Ehnert, J. Corpus, J. Dluhos, Maklemenz, Strobelix, Modellpilot.EU, 	E. Benedetti, V. Venditti, Shakos, A. Eliason

  Collaborators: InfinityCoding, Couchy, Dindog, Floxflob, U Bless, Watilin, @prdonahue, Hoshie, 3lf3nLi3d, Alexo, Crits, Noname120, Crt32, JixunMoe, Athorcis, Killerbadger, SMed79, Alexander255, Anonsubmitter, RaporLoLpro, Maynak00, Robotex, Vinctux, Blahx, MajkiIT, F4z, Angelsl, Mikhaelk, Marek, Hamsterbacke, Gorhill, Hacker999, xxcriticxx, Skr4tchGr3azyMonkiBallllllZzzz, Giwayume

  Users: Thank you to all those who use Anti Adblock Killer, who report problems, who write the review, which add to their favorites, making donations, which support the project and help in its development or promote.

=======================================================
  Mirrors
=======================================================

  Github: http://tinyurl.com/mcra3dn
  Greasyfork: http://tinyurl.com/pbbdnh6
  Openuserjs: http://tinyurl.com/nnqje32
  MonkeyGuts: http://tinyurl.com/ka5fcqm
  Userscripts: http://tinyurl.com/q8xcejl

=======================================================
  Documentation
=======================================================

  Greasemonkey: http://tinyurl.com/yeefnj5
  Scriptish: http://tinyurl.com/cnd9nkd
  Tampermonkey: http://tinyurl.com/pdytfde
  Violentmonkey: http://tinyurl.com/n34wn6j
  NinjaKit: http://tinyurl.com/pkkm9ug

=======================================================
  Script
======================================================*/

Aak = {
  name : 'Anti-Adblock Killer',
  version : '9.1',
  scriptid : 'gJWEp0vB',
  homeURL : 'http://reek.github.io/anti-adblock-killer/',
  changelogURL : 'https://github.com/reek/anti-adblock-killer#changelog',
  donateURL : 'https://github.com/reek/anti-adblock-killer#donate',
  featuresURL : 'https://github.com/reek/anti-adblock-killer#features',
  reportURL : 'https://github.com/reek/anti-adblock-killer/wiki/Report-Guide',
  contactURL : 'http://reek.github.io/anti-adblock-killer/#contact',
  settingsURL : 'http://reek.github.io/anti-adblock-killer/#settings',
  twitterURL : 'https://twitter.com/antiadbkiller',
  downloadURL : 'https://raw.githubusercontent.com/reek/anti-adblock-killer/master/anti-adblock-killer.user.js',
  subscribeURL : 'http://reek.github.io/anti-adblock-killer/#filterlist',
  listURL : "https://raw.githubusercontent.com/reek/anti-adblock-killer/master/anti-adblock-killer-filters.txt",
  iconURL : 'https://raw.githubusercontent.com/reek/anti-adblock-killer/master/anti-adblock-killer-icon.png',
  imgBait : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1wUNCDsIxR/nKAAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAAANklEQVRYw+3OMQEAIAwDsA41+FeDmyJjT6Igk+S2fVkybbPpZJmAgICAgICAgICAgICAwHrgA+mMBzm8q/ebAAAAAElFTkSuQmCCCiAJICAJIAo=',
  initialize : function () {
  
    // Define settings
    Aak.registerSettings();
  
    // Script Manager
    if (Aak.opts.useGM && Aak.GM) {
      Aak.registerCommands();
      Aak.update.automatic();
      Aak.listDetect();
    } else { // Native
      Aak.warn('Executed on Native');
    }
	
	// Kill anti-adblocks
	Aak.blockDetect();
  },
  uw : unsafeWindow,
  $ : unsafeWindow.$ || unsafeWindow.jQuery,
  GM : typeof GM_getValue != 'undefined' ? true : false,
  noframe : !(window.top != window.self),
  opts : {},
  options : {
    useGM : {
      group : 'general',
      type : 'checkbox',
      value : true,
      label : 'Use Greasemonkey API.',
      info : ''
    },
    videoPlay : {
      group : 'general',
      type : 'checkbox',
      value : false,
      label : 'Play video automatically. *',
      info : ''
    },
    videoHD : {
      group : 'general',
      type : 'checkbox',
      value : false,
      label : 'Play video in HD quality. **',
      info : ''
    },
    videoPlugin : {
      group : 'general',
      type : 'checkbox',
      value : false,
      label : 'Play video with plugin. *',
      info : ''
    },
    videoDownload : {
      group : 'general',
      type : 'checkbox',
      value : false,
      label : 'Add "Download video" button. *',
      info : ''
    },
    checkList : {
      group : 'general',
      type : 'checkbox',
      value : true,
      label : 'Check AakList subscription.',
      info : ''
    },
    checkVersion : {
      group : 'general',
      type : 'checkbox',
      value : true,
      label : 'Check newer script version.',
      info : ''
    },
    debug : {
      group : 'debug',
      type : 'checkbox',
      value : true,
      label : 'Enable debug mode.',
      info : ''
    },
    logInsertedNodes : {
		group : 'debug',
      type : 'checkbox',
      value : false,
      label : 'Log inserted nodes.',
      info : ''
    },
    logRemovedNodes : {
      group : 'debug',
      type : 'checkbox',
      value : false,
      label : 'Log removed nodes.',
      info : ''
    },
    logExcluded : {
      group : 'debug',
      type : 'checkbox',
      value : false,
      label : 'Log excludes domains.',
      info : ''
    },
    logXhr : {
      group : 'debug',
      type : 'checkbox',
      value : false,
      label : 'Log xmlhttprequest',
      info : ''
    },
    logPlayer : {
      group : 'debug',
      type : 'checkbox',
      value : false,
      label : 'Log player.',
      info : ''
    },
    logDetected : {
      group : 'debug',
      type : 'checkbox',
      value : true,
      label : 'Log detected anti-adblocks.',
      info : ''
    }
	},
  registerSettings : function () {
    for (var key in Aak.options) {
      Aak.opts[key] = Aak.getValue(key) != null  ? Aak.getValue(key) : Aak.options[key].value;
    };
  },
  listCommands : [{
      caption : 'Homepage',
      exec : function () {
        Aak.go(Aak.homeURL);
      }
    }, {
      caption : 'Settings',
      exec : function () {
        Aak.go(Aak.settingsURL);
      }
    }, {
      caption : 'Update',
      exec : function () {
        Aak.update.manual();
      }
    }
  ],
  pushCommands : function (cmd) {
    Aak.listCommands.push(cmd);
  },
  registerCommands : function () {
    Aak.ready(function () {
      // Scriptish
      // note: No menu command is created when the user script is run in a iframe window.
      // doc: http://tinyurl.com/kvvv7yt
      if (typeof GM_registerMenuCommand != 'undefined' && Aak.noframe) {
        // register commands on script handler
        Aak.listCommands.forEach(function (cmd) {
          GM_registerMenuCommand([Aak.name, Aak.getVersion(), cmd.caption].join(' '), cmd.exec);
        });
      }
    });
  },
  go : function (url) {
    window.location.href = url;
  },
  refresh : function () {
    window.location.href = location.href;
  },
  reload : function () {
    window.location.reload(true);
  },
  ready : function (callback) {
    if (window.addEventListener !== undefined) {
      window.addEventListener('load', callback, false);
    } else {
      window.attachEvent('onload', callback);
    }
  },
  contains : function (string, search) {
    return string.indexOf(search) != -1;
  },
  log : function () {
    if (Aak.opts.debug) {
      console = console || unsafeWindow.console || {};
      console.log('Aak' + Aak.getVersion(), location.host, arguments);
    }
  },
  info : function () {
    if (Aak.opts.debug) {
      console = console || unsafeWindow.console || {};
      console.info('Aak' + Aak.getVersion(), location.host, arguments);
    }
  },
  warn : function () {
    if (Aak.opts.debug) {
      console = console || unsafeWindow.console;
      console.warn('Aak' + Aak.getVersion(), location.host, arguments);
    }
  },
  error : function () {
    if (Aak.opts.debug) {
      console = console || unsafeWindow.console;
      console.error('Aak' + Aak.getVersion(), location.host, arguments);
    }
  },
  detected : function () {
    if (Aak.opts.debug && Aak.opts.logDetected) {
      console = console || unsafeWindow.console;
      console.info('Aak' + Aak.getVersion(), location.host, arguments);
    }
  },
  GMapiSupported : function () {
    if (Aak.noframe) {
      // GM API - http://tinyurl.com/yeefnj5
      return {
        GM_xmlhttpRequest : typeof GM_xmlhttpRequest != 'undefined',
        GM_setValue : typeof GM_setValue != 'undefined',
        GM_getValue : typeof GM_getValue != 'undefined',
        GM_addStyle : typeof GM_addStyle != 'undefined',
        GM_registerMenuCommand : typeof GM_registerMenuCommand != 'undefined',
        GM_info : typeof GM_info != 'undefined',
        GM_getMetadata : typeof GM_getMetadata != 'undefined',
        GM_deleteValue : typeof GM_deleteValue != 'undefined',
        GM_listValues : typeof GM_listValues != 'undefined',
        GM_getResourceText : typeof GM_getResourceText != 'undefined',
        GM_getResourceURL : typeof GM_getResourceURL != 'undefined',
        GM_log : typeof GM_log != 'undefined',
        GM_openInTab : typeof GM_openInTab != 'undefined',
        GM_setClipboard : typeof GM_setClipboard != 'undefined'
      }
    }
  },
  getBrowser : function () {
    var ua = navigator.userAgent;
    if (Aak.contains(ua, 'Firefox')) {
      return "Firefox";
    } else if (Aak.contains(ua, 'MSIE')) {
      return "IE";
    } else if (Aak.contains(ua, 'Opera') || Aak.contains(ua, 'OPR')) {
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
    if (Aak.opts.useGM && typeof GM_info == 'object') {
      // Greasemonkey (Firefox)
      if (Aak.opts.useGM && typeof GM_info.uuid != 'undefined') {
        return 'Greasemonkey';
      } // Tampermonkey (Chrome/Opera)
      else if (Aak.opts.useGM && typeof GM_info.scriptHandler != 'undefined') {
        return 'Tampermonkey';
      }
    } else {
      // Scriptish (Firefox)
      if (Aak.opts.useGM && typeof GM_getMetadata == 'function') {
        return 'Scriptish';
      } // NinjaKit (Safari/Chrome)
      else if (Aak.opts.useGM && typeof GM_setValue != 'undefined' &&
        typeof GM_getResourceText == 'undefined' &&
        typeof GM_getResourceURL == 'undefined' &&
        typeof GM_openInTab == 'undefined' &&
        typeof GM_setClipboard == 'undefined') {
        return 'NinjaKit';
      } else { // Native
        return 'Native';
      }
    }
  },
  generateID : function (len) {
    var str = '';
    var len = len || 10;
    var charset = "abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = 0; i < len; ++i) {
      str += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return str;
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
    var name = 'aak-uuid';
    if (Aak.getValue(name) == null) {
      Aak.setValue(name, Aak.generateUUID());
    }
    return Aak.getValue(name);
  },
  once : function (day, name, callback) {
    setTimeout(function () {
      var later = isNaN(Aak.getValue(name)) ? 1 : Number(Aak.getValue(name));
      var now = new Date().getTime();
      if (later < now) {
        Aak.setValue(name, (now + (day * 24 * 60 * 60 * 1000)).toString());
        callback();
      }
    }, 1e3);
  },
  notification : function (message, delay) {
    if (Aak.noframe) {
	
      // remove old notification
      Aak.removeElement('#aak-notice-frame');

      // add new notification
      Aak.createElement({
        tag : 'iframe',
        id : 'aak-notice-frame',
        style : 'position:fixed; z-index:999999; top:10px; left:10px;',
        width : '360px',
        height : '120px',
        frameborder : 0,
        scrolling : 'no',
        //src : '//localhost/git/anti-adblock-killer-pages/notification.html#' + btoa(message),
        src : '//reek.github.io/anti-adblock-killer/notification.html#' + btoa(message),
        append : 'body',
        callback : function (self) {

          // manually remove
          window.addEventListener("message", function (event) {
            if (event.data == "removeNotification") {
              self.remove();
            }
          }, false);

          // automatically remove
          setTimeout(function () {
            self.remove();
          }, delay || 15e3);
        }
      });

    }
  },
  listDetect : function () {
    if (Aak.opts.checkList && Aak.noframe) {
      Aak.ready(function () {
        if (typeof Aak.getValue('listDetect') == 'undefined') {
          Aak.createElement({
            tag : 'img',
            id : 'k2Uw7isHrMm5JXP1Vwdxc567ZKc1aZ4I',
            src : Aak.imgBait,
            append : 'body',
            event : {
              load : function () {
                if (this.clientHeight) {
                  Aak.warn('AakList: UnSubscribed');
                  Aak.notification('It seems that you have not subscribed to <b>AakList (Anti-Adblock Killer )</b> <a href="' + Aak.subscribeURL + '" target="_blank">Subscribe</a>');
                } else {
                  Aak.info('AakList: Subscribed');
				  Aak.setValue('listDetect', true);
                }
                this.remove();
              }
            }
          });
        }
      });
    }
  },
  update : {
    manual : function () {
      if (Aak.noframe) {
        Aak.update.getRemote(true);
      }
    },
    automatic : function () {
    if (Aak.opts.checkVersion && Aak.noframe) {
        Aak.ready(function () {
          Aak.once(7, 'nextcheckupdate', function () {
            Aak.update.getRemote(false);
          });
        });
      }
    },
    getRemote : function (AlertNoUpdate) {
      Aak.request({
        url : Aak.downloadURL,
        onload : function (response) {
          var res = response.responseText;
          var status = response.status;
          if (status == 200) {
            var local = Aak.getVersion();
            var remote = Number(res.match(/@version\s+(\d+\.\d+)/)[1]);
            if (local < remote) {
              Aak.notification('Anti-Adblock Killer v' + remote + ' is available <a target="_blank" href="' + Aak.downloadURL + '">Install</a>.');
            } else if (AlertNoUpdate) {
              Aak.notification('No update found.');
            }
          }
        }
      });
    }
  },
  openInTab : function (url) {
    if (Aak.opts.useGM && typeof GM_openInTab != 'undefined') {
      GM_openInTab(url);
    } else {
      var newWindow = window.open(url, "_blank");
      newWindow.focus();
    }
  },
  request : function (settings) {
    settings.url = settings.url || '';
    settings.method = settings.method || 'GET';
    settings.headers = settings.headers || {};
    settings.timeout = settings.timeout || 2e4; // 20s
    if (settings.data || settings.method == 'POST') {
      settings.method = 'POST';
      settings.data = Aak.serialize(settings.data || {});
      settings.headers = Aak.setProperty(settings.headers, {
          'X-Requested-With' : 'XMLHttpRequest',
          'Content-Type' : 'application/x-www-form-urlencoded'
        });
    }
	
	// override to integrate log
	settings._onload = settings.onload;
	settings.onload = function (xhr) {
	  if (Aak.opts.logXhr) {
	    Aak.log(Aak.getScriptManager() + ' xhr', xhr);
	  }
	  settings._onload(xhr);
	}
	
    if (Aak.opts.useGM && typeof GM_xmlhttpRequest != 'undefined') {
	  // Request with GM API
	  // doc: http://tinyurl.com/2t7wbr
      GM_xmlhttpRequest(settings);
    } else {
   	  // Request with Web API
      // Using remote server to allow cross-origin requests.
      // doc: http://tinyurl.com/odz664a
      // doc: http://tinyurl.com/p9zruzn
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://reeksite.com/public/xhr.php', true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.onload = function () {
        var res = xhr.responseText;
        var json = JSON && JSON.parse(res);
        Object.defineProperty(xhr, "responseText", {
          enumerable : false,
          configurable : false,
          writable : false,
          value : json.response
        });
        settings.onload(xhr);
      };
      xhr.send(Aak.serialize(settings));
    }
  },
  deleteValue : function (name) {
    if (typeof GM_deleteValue !== "undefined" && !name) {
      var vals = GM_listValues();
      for (var i in vals) {
        GM_deleteValue(vals[i]);
      }
    } else if (typeof GM_deleteValue !== "undefined") {
      GM_deleteValue(name);
    } else {
      Aak.warn("Sorry! No GM Storage support.");
    }
  },
  setValue : function (name, value) {
    if (typeof GM_setValue !== "undefined") {
      GM_setValue(name, value);
    } else {
      Aak.warn("Sorry! No GM Storage support.");
    }
  },
  getValue : function (name) {
    if (typeof GM_listValues !== "undefined" && !name) {
      var list = {};
      var vals = GM_listValues();
      for (var i in vals) {
        list[vals[i]] = GM_getValue(vals[i]);
      }
      return list;
    } else if (typeof GM_getValue !== "undefined") {
      return GM_getValue(name);
    } else {
      Aak.warn("Sorry! No GM Storage support.");
	  return null;
    }
  },
  setLocal : function (name, value) {
    // SecurityError: The operation is insecure.
    // doc: http://tinyurl.com/8peqwvd
    if (typeof localStorage !== "undefined") {
      localStorage[name] = value;
    } else {
	  Aak.warn("Sorry! No Web Storage support.");
    }
  },
  getLocal : function (name) {
    if (typeof localStorage !== "undefined") {
      return localStorage[name];
    } else {
	  Aak.warn("Sorry! No Web Storage support.");
      return null;
    }
  },
  setSession : function (name, value) {
    // Doc: http://tinyurl.com/8peqwvd
    if (typeof sessionStorage !== "undefined") {
      sessionStorage[name] = value;
    } else {
      Aak.warn("Sorry! No Web Storage support.");
    }
  },
  getSession : function (name) {
    if (typeof sessionStorage !== "undefined") {
      return sessionStorage[name] || 'undefined';
    } else {
	  Aak.warn("Sorry! No Web Storage support.");
      return null;
    }
  },
  setCookie : function (name, value, time, path) {
    var path = (path) ? path : '/';
    var time = (time) ? time : 365 * 24 * 60 * 60 * 1000; // 1 year
    var expires = new Date();
    expires.setTime(new Date().getTime() + time);
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + expires.toGMTString() + ";path=" + path;
  },
  getCookie : function (name) {
    var oRegex = new RegExp("(?:; )?" + name + "=([^;]*);?");
    if (oRegex.test(document.cookie)) {
      return decodeURIComponent(RegExp["$1"]);
    }
  },
  stopRedirect : function () {
    if ('watch' in window) {
      Aak.uw.watch("location", function () {});
      Aak.uw.location.watch("href", function () {});
    } else {
      Aak.uw.location = "#";
      throw 'Stop Redirect';
    }
  },
  confirmLeave : function () {
    window.onbeforeunload = function () {
      return '';
    };
  },
  confirmReport : function (elem) {
    elem.innerHTML = 'Report';
    elem.title = 'Report issue or anti-adblock';
    elem.onclick = function (e) {
      e.preventDefault();
      if (confirm("Do you want to report issue or anti-adblock ?")) { // Clic on OK
        Aak.go(Aak.reportURL);
      } else {
        Aak.go(elem.href);
      }
    }
  },
  unpackScript : function (code) {
    // support: pac+ked, pac+ker, mun+ged 
	// note: "Exception 403008" concatenating strings for bypass greasefork malware filter
	var code = code.trim();
    return (/function[(][pm],[au],[cn],[kg],[e],[dr][)]/.test(code)) ? eval(code.replace('eval(', '(').replace(';return p}', ';return p;}')) : false; 
  },
  getScript : function (contains, doc) {
    // by: Watilin
    return Array.prototype.filter.call(
      doc && doc.scripts || document.scripts,
      function ($script) {
      var source = $script.innerHTML;
      return source && source.indexOf(contains) != -1;
    })[0];
  },
  stopScript : function (e) {
    e.preventDefault();
    e.stopPropagation();
  },
  innerScript : function (e) {
    return e.target.innerHTML;
  },
  addScript : function (code) {
    var script = document.createElement('script');
    script.innerHTML = (typeof code === 'function') ? Aak.toText(code) : code.toString();
    document.head.appendChild(script);
    document.head.removeChild(script);
  },
  addExternalScript : function (src) {
    var script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);
    document.head.removeChild(script);
  },
  toText : function (entry) {
    if (typeof entry === 'function') {
      var str = entry.toString();
      var first = str.indexOf("{") + 1;
      var last = str.lastIndexOf("}");
      return str.substr(first, last - first).trim();
    } else if (typeof entry === 'object') {
      return JSON.stringify(entry);
    } else { // array or string
      return entry.toString();
    }
  },
  onElement : function (element, callback, repeat) {
    var repeat = repeat || 10;
    var loop = setInterval(function () {
        var elem = Aak.getElement(element);
        if (elem) {
          callback();
          clearInterval(loop);
        }
        repeat = (repeat) ? repeat - 1 : clearInterval(loop);
      }, 1e3);
  },
  removeElement : function (elem) {
    if (elem instanceof HTMLElement) {
      return elem.parentNode.removeChild(elem);
    } else if (typeof elem === "string") {
      var elem = document.querySelectorAll(elem);
      for (var i = 0; i < elem.length; i++) {
        elem[i].parentNode.removeChild(elem[i]);
      }
    } else {
      Aak.error('Error ' + elem + ' not removed !');
    }
  },
  getElement : function (elem) {
    if (typeof elem == 'string') {
      return document.querySelector(elem) || false;
    } else if (elem instanceof HTMLElement) {
      return elem;
    } else {
      return false;
      //throw 'Not object or invalid selector';
    }
  },
  createElement : function (props) {
    var node = {};
    for (var name in props) {
      switch (name) {
      case "tag":
        var node = document.createElement(props[name]);
        break;
      case "text":
        var text = ('innerText' in document) ? 'innerText' : 'textContent';
        node[text] = props[name];
        break;
      case "html":
        node.innerHTML = props[name];
        break;
      case "class":
        node.className = props[name];
        break;
      case "append":
        var elem = Aak.getElement(props[name]);
        elem.appendChild(node);
        break;
      case "prepend":
        var elem = Aak.getElement(props[name]);
        if (elem.childNodes.length) {
          elem.insertBefore(node, elem.childNodes[0]);
        } else {
          elem.appendChild(node);
        }
        break;
      case "before":
        var elem = Aak.getElement(props[name]);
        elem.parentNode.insertBefore(node, elem);
        break;
      case "after":
        var elem = Aak.getElement(props[name]);
        elem.parentNode.insertBefore(node, elem.nextSibling);
        break;
      case "replace":
        var elem = Aak.getElement(props[name]);
        elem.parentNode.replaceChild(node, elem);
        break;
      case "event":
        for (var evName in props.event) {
          node.addEventListener(evName, props.event[evName]);
        }
        break;
      case "callback":
        props[name](node);
        break;
      default:
        node.setAttribute(name, props[name]);
      }
    }
    return node;
  },
  addBaitElement : function (strOpts) { // ex: div.ads or span#ads@
    var opts = strOpts.replace('.', ':className:').replace('#', ':id:').split(':');
    var bait = document.createElement(opts[0]);
    bait.setAttribute(opts[1], opts[2]);
    bait.innerHTML = "<br>";
    document.documentElement.appendChild(bait);
    return bait;
  },
  replaceElement : function (oldNode, newNode) {
    oldNode.parentNode.replaceChild(newNode, oldNode);
  },
  setElement : function (selector, props) {
    var node = Aak.getElement(selector);
    if (node) {
      for (var name in props) {
        switch (name) {
        case "text":
          var text = ('innerText' in document) ? 'innerText' : 'textContent';
          node[text] = props[name];
          break;
        case "html":
          node.innerHTML = props[name];
          break;
        case "class":
          node.className = props[name];
          break;
        default:
          node.setAttribute(name, props[name]);
        }
      }
    }
  },
  addStyle : function (css) {
    var css = css.replace(/;/g, ' !important;');
    if (Aak.opts.useGM && typeof GM_addStyle != 'undefined') {
      GM_addStyle(css);
    } else {
      document.head.appendChild(document.createElement('style')).innerHTML = css;
    }
  },
  getStyle : function (selector, prop) {
    var elem = Aak.getElement(selector);
    if (elem.currentStyle) {
      return elem.currentStyle[prop];
    } else if (window.getComputedStyle) {
      return document.defaultView.getComputedStyle(elem, null).getPropertyValue(prop);
    }
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
  serialize : function (data) {
    if (typeof data == 'object') {
      var arr = [];
      for (var name in data) {
        arr.push(name + '=' + Aak.encodeURI(data[name]));
      }
      return arr.join('&');
    }
    return data;
  },
  unserialize : function (str) {
    var str = Aak.decodeHTML(str);
    var arr = str.split('&');
    var obj = {};
    arr.forEach(function (entry) {
      if (entry != '' && entry.split('=')) {
        var splits = entry.split('=');
        obj[splits[0]] = Aak.decodeURI(splits[1]);
      }
    });
    return obj;
  },
  delProperty : function (obj, props) {
    var props = (typeof props == 'string') ? props.split(',') : props;
    for (var i = 0; i < props.length; i++) {
      var prop = props[i];
      if (obj.hasOwnProperty(prop)) {
        delete obj[prop];
      }
    }
    return obj;
  },
  setProperty : function (obj1, obj2) {
    for (var prop in obj2) {
      obj1[prop] = obj2[prop];
    }
    return obj1;
  },
  fixProtocolURL : function (url) {
    if (/^http/.test(url)) { // absolute
      return url;
    } else if (/^\/\//.test(url)) { // relative
      return 'http:' + url;
    } else { // none
      return 'http://' + url;
    }
  },
  fakeFuckAdBlock : function (instanceName, className) {

      // inject fake fuckadbluck
      Aak.addScript(Aak.toText(function () {

          var __CLASSNAME__ = function () {
            var self = this;
			var callNotDetected = false;
            this.debug = {
              set : function (a) {
                return self;
              },
              get : function () {
                return false;
              }
            };
            this.onDetected = function (callback) {
              this.on(true, callback);
              return this;
            };
            this.onNotDetected = function (callback) {
              this.on(false, callback);
              return this;
            };
            this.on = function (detected, callback) {
              if (!detected) {
			    callNotDetected = callback;
                setTimeout(callback, 1);
              }
			  console.info('FuckAdBlock');
              return this;
            };
            this.setOption = function (options, value) {
              return this;
            };
            this.options = {
              set : function (options) {
                return this;
              },
              get : function () {
                return this;
              }
            };
            this.check = function (plugins, options) {
              callNotDetected && callNotDetected();
            };
            this.emitEvent = function (detected) {
              return this;
            };
            this.clearEvent = function () {};
          };

          Object.defineProperties(window, {
            __CLASSNAME__ : {
              value : __CLASSNAME__,
              writable : false
            }
          });

          Object.defineProperties(window, {
            __INSTANCENAME__ : {
              value : new __CLASSNAME__(),
              writable : false
            }
          });

        }).replace(/__INSTANCENAME__/g, instanceName || 'fuckAdBlock')
		   .replace(/__CLASSNAME__/g, className || 'FuckAdBlock'));

  },
  editSWF : function (so, opts) {
    Aak.onElement(so, function () {
      var original = Aak.getElement(so);
      var clone = original.cloneNode(true);
      if (opts.setAttributes) {
        var obj = opts.setAttributes;
        for (var p in obj) {
          if (clone.querySelector('param[name="' + p + '"]')) {
            clone.querySelector('param[name="' + p + '"]').value = obj[p];
          } else if (clone.getAttribute(p)) {
            clone.setAttribute(p, obj[p]);
          }
        }
      }
      if (opts.delAttributes) {
        var obj = opts.delAttributes;
        for (var p in obj) {
          if (clone.querySelector('param[name="' + p + '"]')) {
            Aak.removeElement(clone.querySelector('param[name="' + p + '"]'));
          } else if (clone.getAttribute(p)) {
            delete obj[p];
          }
        }
      }

      if (opts.setFlashvars || opts.delFlashvars) {
        if (clone.querySelector('param[name="flashvars"]')) {
          var param = clone.querySelector('param[name="flashvars"]');
          var sFlashvars = param.value;
        } else if (clone.getAttribute('flashvars')) {
          var sFlashvars = clone.getAttribute('flashvars');
        } else if (clone.getAttribute('data') && clone.getAttribute('data').indexOf('?') >= 0) {
          var splits = clone.getAttribute('data').split('?', 2);
          var swf = splits[0];
          var sFlashvars = splits[1];
        }

        var oFlashvars = Aak.unserialize(sFlashvars);
        Aak.log(oFlashvars);
        if (opts.setFlashvars) {
          oFlashvars = Aak.setProperty(oFlashvars, opts.setFlashvars);
        }
        if (opts.delFlashvars) {
          oFlashvars = Aak.delProperty(oFlashvars, opts.delFlashvars);
        }
        var sFlashvars = Aak.serialize(oFlashvars);

        if (param) {
          param.value = sFlashvars;
        } else if (swf) {
          clone.setAttribute('data', swf + '?' + sFlashvars);
        } else {
          clone.setAttribute('flashvars', sFlashvars);
        }
      }
      // replace
      Aak.replaceElement(original, clone);
    });
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
    get : function (element) {

      if (Aak.getElement(element)) {
        this.in.node = Aak.getElement(element);
      } else {
        throw 'Not object or embed player or invalid selector';
      }

      this.in.html = this.getHtml(this.in.node);
      this.in.parent = this.in.node.parentNode;
      this.in.tag = this.in.node.tagName;

      this.attributes.id = this.attributes.name = Aak.generateID();
      this.attributes.height = this.in.node.height || this.in.node.clientHeight || '100%';
      this.attributes.width = this.in.node.width || this.in.node.clientWidth || '100%';	  

      if (/^(object|embed)$/i.test(this.in.tag)) {
        this.attributes.src = this.in.node.src || this.in.node.data || false;
        this.flashvars.str = this.in.node.flashvars || this.in.node.querySelector('param[name="flashvars"]') && this.in.node.querySelector('param[name="flashvars"]').value || false;
        var swfvars = !this.flashvars.str && this.in.node.data && this.in.node.data.split('?', 2) || false;
        if (swfvars) {
          this.attributes.src = swfvars[0];
          this.flashvars.str = swfvars[1];
        }
        this.splitVars();
        this.joinVars();
      }
	  
	  if (Aak.opts.logPlayer) {
	    Aak.log('get', this);
	  }
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
      for (var k in obj) {
        arr.push(k + '=' + Aak.encodeURI(obj[k])); // encodeURIComponent
      }
      this.flashvars.str = arr.join('&'); // &amp;
    },
    insert : function () {
      this.swfvars = [this.attributes.src, this.flashvars.str].join('?');
      switch (this.options.output) {
      case 'iframe':
        this.out.node = document.createElement('iframe');
        this.out.node.setAttribute('src', this.swfvars);
        this.out.node.setAttribute('width', this.attributes.width);
        this.out.node.setAttribute('height', this.attributes.height);
        this.out.node.setAttribute('style', 'height:' + this.attributes.height + 'px; width:' + this.attributes.width + 'px;');
        this.out.node.setAttribute('frameborder', 0);
        this.out.node.setAttribute('scrolling', 'no');
        this.out.node.setAttribute('allowfullscreen', true); // http://tinyurl.com/oyyehab
        // allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen
        break;
      case 'tab':
        return Aak.openInTab(this.swfvars);
        break;
      case 'html5':
        this.out.node = document.createElement('video');
        for (var name in this.attributes) {
          this.out.node.setAttribute(name, this.attributes[name]);
        }
		
        if (this.attributes.autoplay) { // fix bug duplicate playing on firefox/chrome
          this.out.node.onloadstart = function () {
            //this.play();
          }
        };
       
        this.out.node.onerror = function () { // switch to plugin player
          setTimeout(function () {
            Aak.player.plugin(this, {
              file : Aak.player.attributes.src
            }, 3e3);
          });
        };
		
        break;
      default:
        this.out.node = document.createElement('embed');
        for (var name in this.attributes) {
          this.out.node.setAttribute(name, this.attributes[name]);
        }
        if (this.flashvars.str) {
          this.out.node.setAttribute('flashvars', this.flashvars.str);
        }
      }

      this.out.html = this.getHtml(this.out.node);
      this.out.tag = this.out.node.tagName;

      if (this.options.output == 'inner') {
        this.in.node.innerHTML = this.out.html;
      } else { // replace
        this.in.parent.replaceChild(this.out.node, this.in.node);
      }
	  
	  // add download button
	  if (Aak.opts.videoDownload) {
	    var btn = document.createElement('a');
	    btn.innerHTML = 'Download video (Save As)';
		btn.setAttribute('download','');
	    btn.href = this.attributes.dl;
	    this.out.node.parentNode.insertBefore(btn, this.out.node.nextSibling);
	  }
	  
	  if (Aak.opts.logPlayer) {
	    Aak.log('insert', this);
	  }
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
      // support: http://tinyurl.com/mjavxdr, mp4, m4v, f4v, mov, flv, webm, aac, mp3, vorbis, hls, rtmp, youtube, aac, m4a, f4a, mp3, ogg, oga

	  if (Aak.opts.videoPlugin) {
        Aak.player.plugin(id, setup);
		return false;
	  }
      this.get(id);
      this.nameplayer = 'jwplayer5';
      this.attributes.src = setup.src || "http://player.longtailvideo.com/player.swf"; // v5.10
      this.attributes.height = setup.height || this.in.node.clientHeight || "100%";
      this.attributes.width = setup.width || this.in.node.clientWidth || "100%";
      this.attributes.dl = setup.file;
	  
      this.mergeObj(this.flashvars.obj, setup);
      this.flashvars.obj.controlbar = 'over';
      if (setup.skin) {
        this.flashvars.obj.skin = 'http://www.longtailvideo.com/files/skins/' + setup.skin + '/5/' + setup.skin + '.zip';
      }
      this.joinVars();
      this.options.output = 'embed';
      this.insert();
    },
    flowplayer : function (id, setup) {
      // Flowplayer (flash)
      // support: mp4, flv, f4v, m4v, mov
      // config: http://tinyurl.com/na7vy7b

      if (Aak.opts.videoPlugin) {
        Aak.player.plugin(id, setup);
        return false;
      }
      this.get(id);
      this.nameplayer = 'flowplayer';
      this.attributes.src = "http://releases.flowplayer.org/swf/flowplayer-3.2.18.swf";
      this.attributes.height = setup.height || this.in.node.clientHeight || "100%";
      this.attributes.width = setup.width || this.in.node.clientWidth || "100%";

      setup.autoPlay = setup.autostart || setup.autoplay || Aak.opts.videoPlay || false;
      setup.url = this.attributes.dl = setup.file;

	  var config = JSON.stringify({
	    clip : setup
	  });
      this.flashvars.obj = {
        config : config
      };
      this.flashvars.str = 'config=' + config;
      this.options.output = 'embed';
      this.insert();
    },
    videojs : function (id, setup) {
	  // VideoJs (flash/html5)
      // setup: http://tinyurl.com/pcgx2ob
      // playback: http://tinyurl.com/nscztmm
      // demo: http://jsfiddle.net/N8Zs5/18/
	  // plugins: https://github.com/videojs/video.js/wiki/Plugins

	  if (Aak.opts.videoPlugin) {
        Aak.player.plugin(id, setup);
		return false;
	  }
      this.get(id);
      this.nameplayer = 'videojs';
      setup.type = this.getMime(setup.file || setup.src);
      setup.id = setup.id || Aak.generateID();
      this.attributes.dl = setup.file || setup.src;
      this.attributes.height = setup.height || this.in.node.clientHeight || "100%";
      this.attributes.width = setup.width || this.in.node.clientWidth || "100%";
	  var vjsSetup = JSON.stringify({
	      controls : true,
	      preload : 'auto',
	      width : this.attributes.width,
	      height : this.attributes.height,
	      techOrder : ["html5", "flash"],
	      autoplay : setup.autostart || setup.autoplay || Aak.opts.videoPlay || false,
	      sources : [{
	          type : setup.type,
	          src : setup.file || setup.src
	        }
	      ]
	    });
      var html = '<html><head><link href="http://vjs.zencdn.net/4.12/video-js.css" rel="stylesheet"><script src="http://vjs.zencdn.net/4.12/video.js"></script><style type="text/css">html, body{padding:0; margin:0;}.vjs-default-skin{color:#eee}.vjs-default-skin .vjs-play-progress,.vjs-default-skin .vjs-volume-level{background-color:#eee}.vjs-default-skin .vjs-big-play-button,.vjs-default-skin .vjs-control-bar{background:rgba(0,0,0,.2)}.vjs-default-skin .vjs-slider{background:rgba(0,0,0,.3)}</style></head><body><video id="' + setup.id + '" class="video-js vjs-default-skin vjs-big-play-centered"></video><script>videojs("'+ setup.id +'", '+vjsSetup+')</script></body></html>';
      this.attributes.src = "data:text/html;charset=utf-8," + encodeURIComponent(html);
      this.options.output = 'iframe';
      this.insert();
    },
    jwplayer6 : function (id, setup) {
      // Jwplayer 6 (flash)
      // config: http://tinyurl.com/lcygyu9
      // iframe: http://tinyurl.com/86agg68
	  
	  if (Aak.opts.videoPlugin) {
        Aak.player.plugin(id, setup);
		return false;
	  }
      this.get(id);
      this.nameplayer = 'jwplayer6';

      setup.primary = 'flash';
      setup.height = setup.height || this.attributes.height;
      setup.width = setup.width || this.attributes.width;
      this.attributes.dl = setup.file || setup.src;
	  
      var html = '<html><head><script src="http://jwpsrv.com/library/5V3tOP97EeK2SxIxOUCPzg.js"></script><style type="text/css">html, body{padding:0; margin:0;}</style></head><body><div id="' + setup.id + '"></div><script>jwplayer("' + setup.id + '").setup(' + JSON.stringify(setup) + ');</script></body></html>';
      this.attributes.src = "data:text/html;charset=utf-8," + encodeURIComponent(html);
      this.options.output = 'iframe';
      this.insert();
    },
    plugin : function (id, setup) {
      // Web Player (plugin)
      // VLC: http://tinyurl.com/omlzp39
      // WMP: 
      // QT: 

      this.get(id);
      this.nameplayer = 'plugin';
      this.attributes.autoplay = setup.autostart || setup.autoplay || Aak.opts.videoPlay || false;
      this.attributes.src = this.attributes.dl = setup.file || setup.src;
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
          Aak.notification('You need install VLC Web Plugin <a href="http://www.videolan.org/vlc/" target="_blank">Install</a>');
          return false;
        }
      }
      this.options.output = 'embed';
      this.insert();
    },
    html5 : function (id, setup) {
      // Video Tag (html5)
      // basics: https://html5rocks.com/en/tutorials/video/basics/
      // tag: http://www.w3schools.com/tags/tag_video.asp
      // support: mp4, webm, ogg
	  // test: http://www.quirksmode.org/html5/tests/video.html

	  if (Aak.opts.videoPlugin) {
        Aak.player.plugin(id, setup);
		return false;
	  }
      this.get(id);
      this.attributes = {};
      this.attributes.src = this.attributes.dl = setup.file || setup.src;
      this.attributes.id = this.attributes.name = Aak.generateID();
      this.attributes.height = setup.height || this.in.node.clientHeight || "100%";
      this.attributes.width = setup.width || this.in.node.clientWidth || "100%";
      this.attributes.type = this.getMime(this.attributes.src);
      this.attributes.controls = 'controls';
      this.attributes.preload = 'none';
      if (setup.autostart || setup.autoplay || Aak.opts.videoPlay) {
        this.attributes.autoplay = 'autoplay';
      }
      this.options.output = 'html5';
      this.insert();
    }
  },
  rules : {
    // --------------------------------------------------------------------------------------------
    // Anti-Adblock Killer
    // --------------------------------------------------------------------------------------------
    settings : {
      host : ['localhost', 'reek.github.io', 'reeksite.com'],
      onIdle : function () {

        if (/\/anti-adblock-killer(-pages)?\/$/.test(location.pathname)) {
          var settingsBox = Aak.getElement('#aak-settings-box')
            var settingsNotice = Aak.getElement('#aak-settings-notice')
            if (settingsBox && settingsNotice) {

              settingsNotice.style.display = 'none';
              settingsBox.style.display = 'block';
              Aak.info('Stored', Aak.getValue());
              Aak.info('Defined:', Aak.opts);
              Aak.info('GMapiSupported:', Aak.GMapiSupported());

              // user config
              Aak.createElement({
                tag : 'div',
                html : 'Version: ' + Aak.getVersion() + ' <br>List: <span id="k2Uw7isHrMm5JXP1Vwdxc567ZKc1aZ4I">No </span>Subscribed<br>Run: ' + Aak.getScriptManager() + ' <br>Browser: ' + Aak.getBrowser(),
                append : '#aak-settings-config'
              });

              // create checkboxes
              for (key in Aak.options) {
                var setting = Aak.options[key];
                var checked = Aak.opts[key] == true ? "checked" : '';
                Aak.createElement({
                  tag : 'div',
                  html : '<input id="' + key + '" class="css-checkbox" ' + checked + ' type="' + setting.type + '"/><label for="' + key + '" title="' + setting.info + '" class="css-label">' + setting.label + '</label>',
                  append : '#aak-settings-' + setting.group
                });
              }

              // add event save button
              document.getElementById("aak-settings-save").addEventListener("click", function () {
                var elems = document.querySelectorAll('.css-checkbox');
                for (i = 0; i < elems.length; i++) {
                  var el = elems[i];
                  if (el.checked) {
                    Aak.setValue(el.id, true);
                  } else {
                    Aak.setValue(el.id, false);
                  }
                }
                alert('Saved !');
              });

              // Clear GM storage
              Aak.pushCommands({
                caption : 'Clear GM storage',
                exec : function () {
                  Aak.deleteValue();
				  alert('Cleared !');
                }
              });
			  
            } 
        }

      }
    },
    userscripts_domains : { // Redirect to Github
      host : ['userscripts.org', 'userscripts.org:8080', 'userscripts-mirror.org'],
      onStart : function () {
        if (/155840$/.test(location.pathname)) {
          Aak.go(Aak.homeURL);
        }
      }
    },
    openuserjs_org : {
      host : ['openuserjs.org'],
      onIdle : function () {
        var element = Aak.getElement('a[href$="/issues"]');
        if (/Anti-Adblock_Killer_Reek/.test(location.pathname) && element) {
          Aak.confirmReport(element);
        }
      }
    },
    greasyfork_org : {
      host : ['greasyfork.org'],
      onIdle : function () {
        var element = Aak.getElement('a[href$="/feedback"]');
        if (/-anti-adblock-killer-reek/.test(location.pathname) && element) {
          Aak.confirmReport(element);
        }
      }
    },
    monkeyguts_com : {
      host : ['monkeyguts.com'],
      onIdle : function () {
        var element = Aak.getElement('a[href*="code.php?nav=forum"]');
        if (/monkeyguts.com\/code.php\?id=351/.test(location.href) && element) {
          Aak.confirmReport(element);
        }
      }
    },	
    // --------------------------------------------------------------------------------------------
    // Specific
    // --------------------------------------------------------------------------------------------
    blogspot : {
	  // No Country Redirect (NCR)
	  // Prevent Blogger from Redirecting to Country-Specific Domains
      // doc: http://tinyurl.com/7rm34jo
	  // issue: https://greasyfork.org/fr/forum/discussion/5953
      // issue: https://github.com/reek/anti-adblock-killer/issues/490
	  // test: http://tinyurl.com/nomcxkc
      host : ['.blogspot.'],
      onStart : function () {
        if (Aak.noframe) { // fix rediretion loop
          var blog = location.host.replace('www.', '').split(".");
          if (blog[blog.length - 1] != "com") {
            var path = location.href.split("/").slice(3).join('/');
            Aak.go("http://" + blog[0] + ".blogspot.com/ncr/" + path);
          }
        }
      }
    },
    blogspot_knowlet3389 : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/83
      host : ['knowlet3389.blogspot.'],
      onStart : function () {
        // + abp rule solution
        Aak.addStyle("#gAds { height: 1px; width: 1px; }");
      }
    },
    uptobox_uptostream : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/351
      host : ['uptobox.com', 'uptostream.com'],
      onStart : function () {
        // Old solution [deprecated]
        var id = location.pathname.match(/[0-9a-z]{12}/);
        if (id != null) {
          Aak.addStyle("#" + id[0] + " { height: 12px; }");
        }
        // New 12.05.2014
        // + abp rule (alternative solution)
        Aak.addStyle("#adblocktrap { height: 12px; }");
      },
      onIdle : function () {
        // remove ads
        Aak.removeElement('*[src^="http://ads.uptobox.com/"],*[href^="http://ads.uptobox.com/"]');
      },
      onBeforeScript : function (e) {
        if (Aak.contains(Aak.innerScript(e), 'window.location = "http://uptobox.com/?op=adblock";')) {
          Aak.stopScript(e);
        }
      }
    },
    anisubsia_com : {
      host : ['anisubsia.com'],
      onStart : function () {
        // + abp rule #@#.adsantilok
        Aak.addStyle(".adsantilok { height: 5px; }");
      },
      onIdle : function () {
        Aak.uw.jAntiBlock = function () {};
        Aak.uw.CekBlok = function () {};
      }
    },
    elahmad_com : {
      host : ['elahmad.com'],
      onStart : function () {
        Aak.addStyle("#adblock { height: 1px; }");
      }
    },
    mrtzcmp3_net : {
      host : ['mrtzcmp3.net'],
      onStart : function () {
        Aak.addStyle(".rtm_ad { height: 1px; }");
      }
    },
    go4up_com : {
      host : ['go4up.com'],
      onStart : function () {
        Aak.addStyle(".myTestAd { height: 1px; }");
      }
    },
    bknime_com : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/291
      host : ['bknime.com'],
      onStart : function () {
        Aak.addStyle("#myTestAd { height: 1px; }");
      }
    },
    bg_gledai_tv : {
      host : ['bg-gledai.tv'],
      onStart : function () {
        Aak.addStyle(".myAd { height: 1px; }");
      }
    },
    thepcspy_com : { // http://thepcspy.com/read/how_to_block_adblock/
      host : ['thepcspy.com'],
      onStart : function () {
        Aak.addStyle(".myTestAd { height: 1px; }");
        Aak.addStyle(".blocked { display: none; }");
      },
      onIdle : function () {
        Aak.removeElement('.blocked');
      }
    },
    vg_e24_no : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/292
      host : ['vg.no', 'e24.no'],
      onStart : function () {
	    // Add this rule, because EasyList allow all hidden elements.
        Aak.addStyle(".ad { display: none; }");
      },
    },
    automobile_sportive_com : {
      host : ['automobile-sportive.com'],
      onStart : function () {
        Aak.addStyle(".myTestAd { height: 51px; display: none; }");
      }
    },
    snsw_us : {
      host : ['snsw.us'],
      onStart : function () {
        Aak.addStyle("#ad_1 { height: 1px; }");
      }
    },
    urlchecker_net : {
      host : ['urlchecker.net'],
      onStart : function () {
        Aak.addStyle("#adchecker { height: 20px; }");
      }
    },
    skiplimite_tv : {
      host : ['skiplimite.tv'],
      onStart : function () {
        Aak.addStyle("div.addthis_native_toolbox + div[id] { height: 12px; }");
      }
    },
    filecore_co_nz : {
      host : ['filecore.co.nz'],
      onStart : function () {
        Aak.addStyle(".adsense { height: 5px; }");
      }
    },
    interfans_org : {
      // test: http://www.interfans.org/forum/
      host : ['interfans.org'],
      onStart : function () {
        Aak.addStyle(".ad_global_header { height: 1px; display: none; }");
      }
    },
    maxdebrideur_com : {
      host : ['maxdebrideur.com'],
      onStart : function () {
        Aak.addStyle(".clear + div[id] { height: 12px; }");
      }
    },
    topzone_it : {
      host : ['topzone.lt'],
      onStart : function () {
        Aak.addStyle(".forumAd { height: 1px; display: none; }");
      }
    },
    nana10_co_il : {
      host : ['.nana10.'],
      onStart : function () {
        Aak.addStyle("#advert-tracker { height: 1px; }");
      }
    },
    plej_tv : {
      host : ['plej.tv'],
      onStart : function () {
        Aak.addStyle(".advert_box { height: 1px; }");
      }
    },
    tweaktown_com : {
      host : ['tweaktown.com'],
      onStart : function () {
        Aak.addStyle("#div-gpt-ad-1378071706813-0, #div-gpt-ad-1378150878492-1 { height: 3px; display: none; }");
      }
    },
    debrideurstream_fr : {
      host : ['debrideurstream.fr'],
      onStart : function () {
        Aak.addStyle("#content div[id][align=center] { height: 12px; }");
      }
    },
    preemlinks_com : {
      host : ['preemlinks.com'],
      onStart : function () {
        Aak.addStyle("#divads { height: 1px; }");
      }
    },
    hentai_to : {
      host : ['hentai.to'],
      onStart : function () {
        Aak.addStyle("#hentaito123 { height: 11px; }");
      }
    },
    prototurk_com : {
      host : ['prototurk.com'],
      onStart : function () {
        Aak.addStyle("#reklam { height: 1px; }");
      }
    },
    mufa_de : {
      host : ['mufa.de'],
      onStart : function () {
        Aak.addStyle("#leaderboard { height: 5px; }");
        Aak.addStyle("#large-rectangle { height: 5px; }");
        Aak.addStyle("#ad-header-468x60 { height: 5px; }");
      }
    },
    watcharab_com : {
      host : ['watcharab.com'],
      onStart : function () {
        // + adp rule watcharab.com#@##adblock
        Aak.addStyle("#adblock { height: 5px; }");
      }
    },
    freedomip_com : {
      host : ['freedom-ip.com'],
      onStart : function () {
        Aak.addStyle(".pub_vertical ins, .pub_vertical div { height: 11px; }");
      }
    },
    wakanim_tv : {
      host : ['wakanim.tv'],
      onStart : function () {
        Aak.addStyle("#detector { display: none; }");
        Aak.addStyle("#nopub { display: block; }");
      }
    },
    simply_debrid_com : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/332
      host : ['simply-debrid.com'],
      onStart : function () {
        // + abp rule
        Aak.addStyle('#adsense { height: 5px;}');
      }
    },
    manga9_com : {
      host : ['manga9.com', 'mangabee.co'],
      onStart : function () {
        Aak.addStyle(".adblock { height: 31px; }");
      }
    },
    onemanga2_com : {
      host : ['onemanga2.com'],
      onStart : function () {
        Aak.addStyle(".afs_ads { height: 5px; }");
      }
    },
    mangabird_com : {
      host : ['mangabird.com'],
      onStart : function () {
        Aak.addStyle(".afs_ads { height: 5px; }");
      }
    },
    forbes_com : {
	  // by: Giwayume
	  // issue: https://github.com/reek/anti-adblock-killer/issues/865
      host : ['forbes.com'],
      onStart : function () {
        if (window.location.pathname.indexOf('/welcome') > -1) {
          Aak.setCookie('welcomeAd', 'true', 86400000, '/');
          Aak.setCookie('dailyWelcomeCookie', 'true', 86400000, '/');
          window.location = Aak.getCookie('toUrl') || 'http://www.forbes.com/';
        }
      }
    },
    bait_adsbygoogle : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/547
      host : ['bitcoinaliens.com'],
      onStart : function () {
        Aak.addBaitElement('ins.adsbygoogle');
      }
    },
    bait_tester : {
      host : ['osoarcade.com', 'd3brid4y0u.info', 'fileice.net', 'nosteam.ro', 'openrunner.com', 'easybillets.com', 'spox.fr', 'yovoyages.com', 'tv3.co.nz', 'freeallmusic.info', 'putlocker.com', 'sockshare.com', 'dramapassion.com', 'yooclick.com', 'online.ua'],
      onStart : function () {
        Aak.addBaitElement('div#tester');
      }
    },
    bait_add : {
      host : ['filecom.net', 'upshare.org', 'skippyfile.com', 'mwfiles.net', 'up-flow.org'],
      onStart : function () {
        Aak.addBaitElement('div#add');
      }
    },
    bait_adpbtest : {
      host : ['leaguesecretary.com', 'teknogods.com', 'hellsmedia.com'],
      onStart : function () {
        Aak.addBaitElement('div#adpbtest');
      }
    },
    bait_adtester : {
      host : ['freesportsbet.com', 'sportsplays.com'],
      onStart : function () {
        Aak.addBaitElement('div#ad-tester');
      }
    },
    tgo_tv_com : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/303
      host : ['tgo-tv.com'],
      onStart : function () {
        Aak.addStyle("#adb, #bannerad1, .load_stream { display: none; }");
        Aak.addBaitElement('div#tester');
      },
      onEnd : function () {
        Aak.uw.threshold = 1000;
        Aak.removeElement('.chat_frame'); // bug reload iframe
      }
    },
    freegamehosting_nl : {
      host : ['freegamehosting.nl'],
      onStart : function () {
        Aak.addBaitElement('div#adtest');
      }
    },
    theweatherspace_com : {
      host : ['theweatherspace.com'],
      onStart : function () {
        Aak.addBaitElement('div#ab-bl-advertisement');
      }
    },
    cleodesktop_com : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/711
      host : ['cleodesktop.com'],
      onStart : function () {
        Aak.addBaitElement('div#myTestAd');
      }
    },
    imageraider_com : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/826
      host : ['imageraider.com'],
      onStart : function () {
        Aak.addBaitElement('div#myGContainer');
      }
    },
    farmet_info : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/889
      host : ['farmet.info'],
      onStart : function () {
        Aak.addStyle("#adsframe { height: 151px; }");
        //Aak.addBaitElement('div#adsframe');
        Aak.addScript(function () {
          window.onload = function () {
            document.querySelector("#remove-over").click();
          };
        });
      }
    },
    prem_link : {
	  // issue: https://github.com/reek/anti-adblock-killer/issues/918
	  // issue: https://github.com/reek/anti-adblock-killer/issues/794
      // issue: https://github.com/reek/anti-adblock-killer/issues/692
      // issue: https://github.com/reek/anti-adblock-killer/issues/572
      // issue: https://github.com/reek/anti-adblock-killer/issues/541
      host : ['prem.link'],
      onStart : function () {
	    Aak.uw.detectadblock = function (){};
		if (Aak.getSession('baitId')) {
		  Aak.addBaitElement('div#' + Aak.getSession('baitId'));
		}
      },
      onIdle : function () {
        var script = Aak.getScript('(iframe != null && is_adframe)');
        if (script) {
          var content = script.innerHTML;
          var id = content.match(/var iframe = document.getElementById\("(\w+)"\);/)[1];
          if (Aak.getSession('baitId') != id) {
            Aak.setSession('baitId', id);
            Aak.refresh();
          }
        }
      }
    },
    cubeupload_com : {
      // issue: https://greasyfork.org/en/forum/discussion/5919
      host : ['cubeupload.com'],
      onStart : function () {
        Aak.createElement({
          tag : 'iframe',
          name : 'iframe',
          src : 'about:blank',
          style : 'display:none;',
          append : document.documentElement
        });
      }
    },
    stream4free_eu : {
      host : ['stream4free.eu'],
      onStart : function () {
        // +abp alt solution
        Aak.addBaitElement('div#jpayday');
        Aak.uw.jpayday_alert = 1;
      }
    },
    _3dnews_ru : {
      // issue: https://greasyfork.org/ru/forum/discussion/5750
      host : ['3dnews.ru'],
      onStart : function () {
        Aak.setCookie('adblockwarn', 1);
        Aak.addStyle("#earAds { width: 401px; }");
        Aak.addBaitElement('div#earAds');
        Aak.uw.__AT_detected = true;
      }
    },
    rmprepusb_com : {
      host : ['rmprepusb.com'],
      onStart : function () {
        Aak.setCookie('jot_viewer', 3);
      }
    },
    primeshare_tv : {
      host : ['primeshare.tv'],
      onStart : function () {
        Aak.addBaitElement('div#adblock');
      }
    },
    bluesatoshi_com : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/873
      host : ['bluesatoshi.com'],
      onStart : function () {
        Aak.addStyle("#test { height: 280px; }");
        Aak.addBaitElement('div#test');
      }
    },
    razercrypt_com : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/870
      host : ['razercrypt.com'],
      onStart : function () {
        Aak.addStyle("#test { height: 280px; }");
        Aak.addBaitElement('div#test');
      }
    },	
    satoshiempire_com : {
	  // issue: https://github.com/reek/anti-adblock-killer/issues/872
      host : ['satoshiempire.com'],
      onStart : function () {
        Aak.addStyle("#test { height: 250px; }");
        Aak.addBaitElement('div#test');
      }
    },
    oneadfaucet_com : {
	  // issue: https://github.com/reek/anti-adblock-killer/issues/871
      host : ['oneadfaucet.com'],
      onStart : function () {
        Aak.addStyle("#test { height: 250px; }");
        Aak.addBaitElement('div#test');
      }
    },	
    jkanime_net : {
      host : ['jkanime.net'],
      // @@||jkanime.net/assets/js/advertisement2.js
      onStart : function () {
        Aak.addBaitElement('div#reco');
      }
    },
    _720pmkv_com : {
      host : ['720pmkv.com'],
      onStart : function () {
        Aak.addBaitElement('div#advert');
      }
    },
    paidverts_com : {
      host : ['paidverts.com'],
      onStart : function () {
        Aak.addBaitElement('div.afs_ads');
      }
    },
    italiatv_org : {
      host : ['italiatv.org'],
      onStart : function () {
        Aak.addBaitElement('div#fab13');
      }
    },	
    totaldebrid_org : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/580
      host : ['totaldebrid.org', '37.187.173.205'],
      onStart : function () {
		Aak.addBaitElement('div#my_ad_div');
      }
    },
    chrissmoove_com : {
      host : ['chrissmoove.com'],
      onStart : function () {
        //Aak.addBaitElement('div#adserver');
      }
    },
    eventhubs_com : {
      host : ['eventhubs.com'],
      onStart : function () {
        Aak.addBaitElement('div#blahyblaci1');
      }
    },
    forum_pac_rom_com : {
      host : ['forum.pac-rom.com'],
      onStart : function () {
        Aak.addBaitElement('div.banner_ads');
      }
    },
    leveldown_fr : {
	  // issue: https://github.com/reek/anti-adblock-killer/issues/595
      host : ['leveldown.fr'],
      onStart : function () {
        Aak.addBaitElement('div#adblock');
		Aak.addBaitElement('div#adblocktest');
      }
    },
    globeslot_com : {
	  // issue: https://github.com/reek/anti-adblock-killer/issues/924
      host : ['globeslot.com'],
      onStart : function () {
        Aak.addBaitElement('div#add');
		Aak.addBaitElement('div#add1');
      }
    },
    antennesport_com : {
      host : ['antennesport.com', 'serverhd.eu'],
      onIdle : function () { // for antennesport
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
      host : ['drivearabia.com', 'putlocker.com', 'doatoolsita.altervista.org', 'sockshare.com', 'free-movie-home.com', 'pc.online143.com', 'kooora.com', 'str3amtv.co.nr', 'str3amtv.altervista.org', 'str3am.altervista.org', 'filecom.net', 'pipocas.tv', 'generatupremium.biz', 'mega-debrid.eu', 'premiumst0re.blogspot.com', 'dl-protect.com'],
      onAlways : function () {
        Aak.uw.alert = function () {};
      }
    },
    generatupremium_biz : {
      host : ['generatupremium.biz'],
      onStart : function () {
        // Disable Confirm Box
        //Aak.uw.confirm = function (){};
        Aak.setCookie('genera', false);
      }
    },
    adswizz_com : {
	  // by: Skr4tchGr3azyMonkiBallllllZzzz
      // issue: https://github.com/reek/anti-adblock-killer/issues/809
      host : ['yes.fm'],
      onStart : function () {
        Aak.addScript(function () {
          com_adswizz_synchro_initialize = function () {};
        });
      }
    },
    derstandard_at : {
        // by: Alexander255
        // patch: http://pastebin.com/raw.php?i=r7Q4DrfB
        // issue: https://github.com/reek/anti-adblock-killer/issues/105
        host : ['derstandard.at'],
        onStart : function () {

          var makeISOTimestampUTC = function () {
            var pad = function (amount, width) {
              var padding = "";
              while (padding.length < width - 1 && amount < Math.pow(10, width - padding.length - 1)) {
                padding += "0";
              }
              return padding + amount.toString();
            }

            var date = new Date();
            return pad(date.getUTCFullYear(), 4)
             + "-" + pad(date.getUTCMonth() + 1, 2)
             + "-" + pad(date.getUTCDate(), 2)
             + "T" + pad(date.getUTCHours(), 2)
             + ":" + pad(date.getUTCMinutes(), 2)
             + ":" + pad(date.getUTCSeconds(), 2);
          }

          document.cookie.split('; ').forEach(function (cookie) {
            // Find main storage cookie
            if (cookie.substr(0, 6) == "MGUID=") {
              // Decompose information from main storage cookie
              var values = {};
              cookie.substr(6).split("&").forEach(function (assignment) {
                var pos = assignment.indexOf('=');
                if (pos > -1) {
                  values[assignment.substr(0, pos)] = assignment.substr(pos + 1);
                }
              });

              // Update "first viewed" timestamp
              values["Timestamp"] = makeISOTimestampUTC();

              // Recompose information in main storage cookie
              cookie = "MGUID=";
              for (var name in values) {
                if (values.hasOwnProperty(name)) {
                  cookie += name + "=" + values[name] + "&";
                }
              }
              cookie = cookie.substr(0, (cookie.length - 1));

              // Update cookie
              document.cookie = cookie;
            }
          });
        }
      },
    tek_domains : {
      // by: Alexander255
	  // issue: https://github.com/reek/anti-adblock-killer/issues/788
      // issue: https://github.com/reek/anti-adblock-killer/issues/512
      host : ['tek.no', 'gamer.no', 'teknofil.no', 'insidetelecom.no', 'prisguide.no', 'diskusjon.no', 'teknojobb.no', 'akam.no', 'hardware.no', 'amobil.no'],
      onIdle : function () {
	  
	    /*
        var ad_frame = document.createElement("iframe");
        ad_frame.name = "_frame";
		ad_frame.style.display = "none";
        document.body.appendChild(ad_frame);
		ad_frame.contentWindow.wrappedJSObject.inFIF = true;
		*/

		// fix 27.11.2015
        Aak.createElement({
          tag : 'div',
          id : 'google_ads_iframe_',
          html : '<p></p>',
          append : 'body'
        });
		
      }
    },
    planetatvonlinehd_blogspot : {
      host : ['planetatvonlinehd.blogspot.'],
      onAlways : function () {
        Aak.uw.jQAntiAdsBlock = function () {
          return false
        };
      }
    },
    beta_speedtest_net : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/628
      // issue: https://github.com/reek/anti-adblock-killer/issues/562
      // issue: https://github.com/reek/anti-adblock-killer/issues/484
      // code: http://paste2.org/53ymghX1
      host : ['beta.speedtest.net'],
      onAlways : function () {
        Aak.uw.adsOoklaComReachable = true;
        Aak.uw.scriptsLoaded = function () {};
      }
    },
    binbucks_com : {
      // by: Alexander255
      // issue: https://github.com/reek/anti-adblock-killer/issues/545
      host : ['binbucks.com'],
      onIdle : function () {
        Aak.uw.testJuicyPay = true;
        Aak.uw.testSensePay = true;
      }
    },
    megogo_net : {
      // issue: PM
      // source1: http://pastebin.com/ccHQg3hn
      // source2: http://pastebin.com/gk0vEQHN
	  // note: two adblock check
      host : ['megogo.net'],
      onStart : function () {
        Object.defineProperty(Aak.uw, "adBlock", {
          writable : false,
          value : false
        });
        Object.defineProperty(Aak.uw, "showAdBlockMessage", {
          writable : false,
          value : function () {}
        });
      }
    },
    cloudwebcopy_com : {
	  // issue: https://github.com/reek/anti-adblock-killer/issues/714
      host : ['cloudwebcopy.com'],
      onStart : function () {
        var setTimeoutClone = Aak.uw.setTimeout;
        Aak.uw.setTimeout = null;
        setTimeout(function () {
          Aak.uw.setTimeout = setTimeoutClone;
        }, 5000);
      },
      onBeforeScript : function (e) {
		// uBlock rule
        // cloudwebcopy.com##script:contains(location.href = "http://sh.st/v6JPD";)
        if (Aak.contains(Aak.innerScript(e), 'location.href = "http://sh.st/v6JPD";')) {
          Aak.stopScript(e);
        }
      }
    },
    narkive_com : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/569
      host : ['narkive.com'],
      onAlways : function () {
        Aak.uw.adblock_status = function (bool) {
          return false;
        };
      }
    },
    pregen_net : {
      host : ['pregen.net'],
      onStart : function () {
        // skip page info
        Aak.setCookie('pgn', 1);
      }
    },
    phys_org : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/768
      host : ['phys.org'],
      onAlways : function () {
        Aak.uw.chkAB = function () {};
      }
    },
    onvasortir_com : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/338
      // issue: https://github.com/reek/anti-adblock-killer/issues/333
      // issue: https://github.com/reek/anti-adblock-killer/issues/330
      // issue: https://github.com/reek/anti-adblock-killer/issues/91
      // issue: https://github.com/reek/anti-adblock-killer/issues/89
      host : ['onvasortir.com'],
      onAlways : function () {
        // +abp rule alt solution
        Aak.uw.sas = {};
      }
    },
    ville_ideale_com : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/258
      // code: http://pastebin.com/16mnmeMc
      host : ['ville-ideale.com'],
      onAlways : function () {
        // +abp rule alt solution
        Aak.uw.execsp = function () {};
      }
    },
    notre_planete_info : {
      // issue: 
      // code: http://pastebin.com/qrS6QGGE
      host : ['notre-planete.info'],
      onAlways : function () {
        // +abp rule alt solution
        Aak.uw.pubpop = function () {};
      }
    },
    apkmirror_com : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/378
      // issue: https://github.com/reek/anti-adblock-killer/issues/224
      // issue: https://github.com/reek/anti-adblock-killer/issues/78
      host : ['apkmirror.com'],
      onAlways : function () {
        Aak.uw.doCheck = function () {};
      }
    },
    anizm_com : {
      // issue: 
      host : ['anizm.com'],
      onAlways : function () {
        Aak.uw.stopAdBlock = {};
      }
    },
    mangasproject_com : {
      // issue: https://greasyfork.org/fr/forum/discussion/4132
      host : ['mangasproject.com'],
      onAlways : function () {
        Aak.uw.jLoader.Leitor.data.adBlock = false;
      }
    },
    pipocas_tv : {
      // issue: 
      host : ['pipocas.tv'],
      onStart : function () {
        // Also added in disableAlertbox
        // No popup
        Aak.setCookie('popup_user_login', 'yes');
      }
    },
    linkbucks_com : {
      // issue: 
      host : ['referencemega.com', 'fpabd.com', 'crackacc.com'],
      onStart : function () {
        // Skip visitScript when site use CloudFlare Rocket Script
        Aak.setCookie('_lbGatePassed', true);
      }
    },
    _15min_lt : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/432
      // code: http://pastebin.com/0cqV8LTY
      host : ['15min.lt'],
      onAlways : function () {
        Aak.uw.ado = {};
      }
    },
    vgunetwork_com : {
      // issue: 
      host : ['vgunetwork.com'],
      onIdle : function () {
        Aak.setCookie('stopIt', 1);
        var close = Aak.getElement('#some_ad_block_key_close');
        if (close) {
          close.click();
        }
      }
    },
    seekingalpha_com : {
      // issue: 
      host : ['seekingalpha.com'],
      onAlways : function () {
        Aak.uw.SA.Pages.Article.is_gnikcolbda = function () {
          return false;
        }
      }
    },
    linkcrypt_ws : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/286
      // issue: https://github.com/reek/anti-adblock-killer/pull/67
      host : ['linkcrypt.ws'],
      onIdle : function () {
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
      // issue: 
      host : ['eventosppv.me'],
      onIdle : function () {
        Aak.removeElement('#nf37');
      }
    },
    bolor_toli_com : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/552
      host : ['bolor-toli.com'],
      onEnd : function () {
        var ads = document.getElementsByClassName('banner');
        for (var i = 0; i < ads.length; i++) {
          var ad = ads[i];
          ad.innerHTML = '<br>';
          ad.style.height = '1px';
        }
      }
    },	
    vivo_sx : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/280
      host : ['vivo.sx'],
      onEnd : function () {
        var alert = Aak.getElement('#alert-throttle');
        if (alert) {
          Aak.removeElement(alert);
        }
        var button = Aak.getElement('button#access');
        if (button) {
          button.removeAttribute('id');
          button.removeAttribute('disabled');
          button.innerHTML = 'Continue to video';
        }
        setTimeout(function () {
          var input = Aak.getElement('input[name="throttle"]');
          if (input) {
            Aak.removeElement(input);
          }
        }, 1000);
      }
    },
    vvvvid_it : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/205
      // issue: https://github.com/reek/anti-adblock-killer/issues/205
      host : ['vvvvid.it'],
      onEnd : function () {
        Aak.uw.vvvvid.onAdBlock = function () {};
      }
    },
    luxyad_com : { // skip redirect myanimes.li
      // issue: 
      host : ['luxyad.com'],
      onIdle : function () {
        if ('/Information.php' == location.pathname) {
          var href = location.href;
          location.href = href.substr(href.indexOf('url=') + 4, href.length);
        }
      }
    },
    aidemu_fr : {
      // issue: 
      host : ['aidemu.fr'],
      onStart : function () {
        Aak.setCookie('adblockPopup', true);
      }
    },
    eami_in : {
      // issue: 
      host : ['eami.in'],
      onAlways : function () {
        Aak.setCookie('ad_locked', 1);
      }
    },
    bigdownloader_com : {
      // issue: 
      host : ['bigdownloader.com'],
      onIdle : function () {
        Aak.removeElement('#anti_adblock');
      }
    },
    freeskier_com : {
      // by: Gorhill
      // issue: https://github.com/reek/anti-adblock-killer/issues/639
      // note: also added list rule
      host : ['freeskier.com'],
      onIdle : function () {
        var el = document.getElementById("adb-not-enabled");
        if (el !== null) {
          el.style.removeProperty("display");
        }
        el = document.getElementById("videoContainer");
        if (el !== null) {
          el.style.removeProperty("display");
        }
      }
    },
    gametrailers_com : {
      // issue: 
      host : ['gametrailers.com'],
      onIdle : function () {
        Aak.removeElement('#ad_blocking');
      }
    },
    scan_onepiece_naruto_mx : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/582
      // issue: https://github.com/reek/anti-adblock-killer/issues/279
      host : ['scan-mx.com', 'onepiece-mx.net', 'naruto-mx.net'],
      onAlways : function () {
        Aak.uw.ad_block_test = function () {};
      },
      onIdle : function () {
        Aak.setElement('#yop', {
          id : ''
        });
      }
    },
    // Bitcoins
    bitcoinker_com : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/230
      host : ['bitcoinker.com'],
      onStart : function () {
        Aak.uw.claim = function () {
          return true;
        }
      },
      onIdle : function () {
        Aak.removeElement('#E33FCCcX2fW');
      }
    },
    moondoge_co_in : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/384
      // issue: https://github.com/reek/anti-adblock-killer/issues/232
      // issue: https://github.com/reek/anti-adblock-killer/issues/233
      // issue: https://github.com/reek/anti-adblock-killer/issues/236
      host : ['moondoge.co.in', 'moonliteco.in', 'moonbit.co.in', 'bitcoinzebra.com'],
      onIdle : function () {
        Aak.removeElement('#AB, #E442Dv, #eCC5h');
      }
    },
    bitcoiner_net : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/349
      host : ['bitcoiner.net', 'litecoiner.net'],
      onStart : function () {
        Aak.addBaitElement('div#tester');
        Aak.addBaitElement('div#ad-top');
      }
    },
    bitcoins_nx_tc : {
      // issue: 
      host : ['freebitcoins.nx.tc', 'getbitcoins.nx.tc'],
      onAlways : function () {
        Aak.uw.ad_block_test = function () {
          return false
        };
      }
    },
    freecoins4_me : {
      // issue: 
      host : ['freecoins4.me'],
      onAlways : function () {
        Aak.uw.check = function () {
          return false
        };
      }
    },
    torrent_tv_ru : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/537
      host : ['torrent-tv.ru'],
      onAlways : function () {
        Aak.uw.c_Oo_Advert_Shown = true;
      }
    },
    cwtv_com : {
	  // by: Kalbasit
	  // pull: https://github.com/reek/anti-adblock-killer/pull/763
      // issue: https://github.com/reek/anti-adblock-killer/issues/340
      // issue: https://github.com/reek/anti-adblock-killer/issues/762
      host : ['cwtv.com'],
      onAlways : function () {
        Aak.uw.CWTVIsAdBlocking = undefined;
      },
      onBeforeScript : function (e) {
        if (Aak.contains(Aak.innerScript(e), 'CWTVIsAdBlocking(c)')) {
          Aak.stopScript(e);
        }
      }
    },
    bild_de : {
      // by: hacker999
      // issue: https://github.com/reek/anti-adblock-killer/issues/664
      host : ['bild.de'],
      onStart : function () {
        //Aak.uw.de = cloneInto({}, Aak.uw);
        //Aak.uw.de.bild = {};
        //Aak.stopRedirect();
      }
    },
    inn_co_il : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/532
      host : ['inn.co.il'],
      onStart : function () {
        Aak.addScript(function () {
          TRC = {};
          TRC.blocker = {
            states : {
              ABP_DETECTION_DISABLED : -2,
              ABP_NOT_DETECTED : 0,
              ABP_DETECTED : 1
            },
            createBlockDetectionDiv : function (a) {
              var c = b.createElement("div");
              return c.className = '',
              c.appendChild(b.createTextNode(".")),
              b.documentElement.appendChild(c),
              c
            },
            isBlockDetectedOnDiv : function (a) {
              return 0;
            },
            isBlockDetectedOnClassNames : function (a) {
              return 0;
            },
            getBlockedState : function (a) {
              return 0;
            }
          }
        });
      }
    },
    turkanime_tv : {
	  // issue: https://github.com/reek/anti-adblock-killer/issues/446
      // issue: https://github.com/reek/anti-adblock-killer/issues/139
      // issue: https://greasyfork.org/tr/forum/discussion/4282/
      host : ['turkanime.tv'],
      onAlways : function () {
        Aak.uw.adblockblock = function () {};
		Aak.uw.BlokKontrol = {};
      }
    },
    wtfbit_ch : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/407
      host : ['wtfbit.ch'],
      onAlways : function () {
        Aak.uw.writeHTMLasJS = function () {};
      }
    },
    bitvisits_com : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/266
      host : ['bitvisits.com'],
      onAlways : function () {
        Aak.uw.blockAdblockUser = function () {};
      }
    },
    exrapidleech_info : {
	  // by: Alexander255
	  // patch: http://pastebin.com/Q664diQ2
	  // issue: https://github.com/reek/anti-adblock-killer/issues/830
	  // issue: https://github.com/reek/anti-adblock-killer/issues/777
      // issue: https://github.com/reek/anti-adblock-killer/issues/745
      // issue: https://github.com/reek/anti-adblock-killer/issues/729
      // issue: https://github.com/reek/anti-adblock-killer/issues/573
      host : ['exrapidleech.info'],
      onStart : function () {
	  
		// 2015.12.07: http://pastebin.com/aEJ0rGtj
        Object.defineProperty(unsafeWindow, 'dec_pid', {
          value : 383865
        });

        Object.defineProperty(unsafeWindow, 'bdvbnr_pid', {
          value : 383865
        });

        Aak.addScript(function () {
          var frame;
          frame = document.createElement('iframe');
          frame.src = '//tinyurl.com/pxqkfwf';
          frame.id = 'bdv';
		  frame.style = 'position:absolute; top:-9999px;';
          document.documentElement.appendChild(frame);
        });
		
      }
    },
    vipleague_domains : {
	  // issue: https://github.com/reek/anti-adblock-killer/issues/765
	  // issue: https://github.com/reek/anti-adblock-killer/issues/598
	  // issue: https://github.com/reek/anti-adblock-killer/issues/326
      // issue: https://github.com/reek/anti-adblock-killer/issues/322
      // issue: https://github.com/reek/anti-adblock-killer/issues/301
	  // issue: https://github.com/reek/anti-adblock-killer/issues/297
      // issue: https://github.com/reek/anti-adblock-killer/issues/290
      // issue: https://github.com/reek/anti-adblock-killer/issues/273
      // issue: https://github.com/reek/anti-adblock-killer/issues/271
      // +abp rule alt solution
      host : ['vipleague.ws', 'vipleague.tv', 'vipleague.se', 'vipleague.me', 'vipleague.co', 'vipleague.sx', 'vipleague.ch', 'vipbox.tv', 'vipbox.co', 'vipbox.sx', 'vipboxsa.co', 'vipbox.biz', 'strikeout.co', 'homerun.re', 'vipboxtv.co', 'vipapp.me', 'vipapp.me', 'vipbox.eu', 'vipbox.so'],
      onStart : function () {
        // Solution 1
        Aak.uw.iExist = true;
        Aak.addStyle(".vip_052x003 { height: 250px; }");
        Aak.addStyle(".vip_09x827 { height: 26px; }");
      },
      onAlways : function () {
        // Solution 2
        Aak.uw.showmsgblock = function () {};
      }
    },
    vg_no : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/292
      // +abp rule
      host : ['vg.no', 'e24.no'],
      onAlways : function () {
        Aak.uw.__AB__ = function () {};
      }
    },
    sahadan_com : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/630
      host : ['sahadan.com'],
      onAlways : function () {
        Aak.uw.AdmostClient = 1;
		Aak.uw._amw1 = 1;
      }
    },
    canalplus_fr : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/110
      host : ['canalplus.fr'],
      onEnd : function () {}
    },
    dailybitcoins_org : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/107
      host : ['dailybitcoins.org'],
      onIdle : function () {
        Aak.removeElement('.ad-img');
      }
    },
    kozaczek_zeberka : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/414
      host : ['kozaczek.pl', 'zeberka.pl'],
      onStart : function () {
        Aak.setCookie('ablc', 1);
        Aak.setCookie('cookie_policy', 1);
      }
    },
    spankwire_sites : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/887
      // source: http://pastebin.com/TFB1dtgb
      host : ['spankwire.com', 'keezmovies.com', 'extremetube.com', 'mofosex.com'],
      onStart : function () {
        Aak.setCookie("abClosed", "true");
		Aak.setCookie("hide_ad_msg", "1");
      }
    },
    youporn : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/887
      // source: http://pastebin.com/TFB1dtgb
      host : ['youporn.com', 'youporngay.com'],
      onStart : function () {
        Aak.setCookie("adblock_message", "closed");
      }
    },
    pornhub_com : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/887
      // source: http://pastebin.com/TFB1dtgb
      host : ['pornhub.com'],
      onStart : function () {
        Aak.uw.abp1 = 1;
        Aak.uw.abp2 = 1;
      }
    },
    psarips_com : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/153
      host : ['psarips.com'],
      onStart : function () {
        Aak.addBaitElement('div#advert');
      }
    },
    extratorrent_domains : {
      host : ['extratorrent.cc', 'extratorrent.com'],
      onStart : function () {
        // prevent popup
        // code are obfuscated in external js
        Aak.setCookie('ppu_delay', 1);
        Aak.setCookie('ppu_main', 1);
        Aak.setCookie('ppu_sub', 1);
        Aak.setCookie('ppu_show_on', 1);
      }
    },
    tny_cz : {
      host : ['tny.cz', 'pasted.co'],
      onStart : function () {
        // prevent popup
        Aak.setCookie('__.popunderCap', 1);
        Aak.setCookie('__.popunder', 1);
      }
    },
    clubedohardware_com_br : { // two antiadblock
      host : ['clubedohardware.com.br'],
      onStart : function () {
        if (Aak.contains(location.host, 'forum')) {
          // Solution 1
          Aak.addStyle("#banner, script { height: 51px; }");
          Aak.addBaitElement('div#banner');
        } else { // Website
          // Solution 1
          Aak.addBaitElement('div.banner_topo');
        }
      },
      onIdle : function () {
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
      onIdle : function () {
        Aak.removeElement('#stp-main');
        Aak.removeElement('#stp-bg');
      }
    },
    ddlfrench_org : {
      host : ['ddlfrench.org'],
      onIdle : function () {
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
        Aak.addStyle("html body div.container-fluid div.row-fluid div.span9 div div[id] { height: 12px;  display: block ; }");
      },
      onBeforeScript : function (e) {
        if (Aak.contains(Aak.innerScript(e), 'window.location = "../pages/adblock.html";')) {
          Aak.stopScript(e);
        }
      }
    },
    blockblockA : { // Solved by aaklist
      // http://sport-show.fr/js/advertisement-AdBlock.js
      // http://www.2site.me/advertisement-AdBlock.js
      host : ['sport-show.fr', 'vipflash.net', '2site.me'],
      onStart : function () {
        Aak.addStyle("#blockblockA {visibility:invisible!important;display:none!important;}#blockblockA td {visibility:invisible!important;display:none!important;}#blockblockA td p {visibility:invisible!important;display:none!important;}#blockblockB {visibility:visible!important;display:block!important;}");
      }
    },
    megadebrid_eu : {
      host : ['mega-debrid.eu'],
      onEnd : function () {
        // Activate button debrid
        Aak.setElement('.realbutton', {
          'onclick' : '',
          'type' : 'submit'
        });
      }
    },
    slideplayer_com : {
      // by: Alexander255
      // issue: https://github.com/reek/anti-adblock-killer/issues/515
	  // issue: https://github.com/reek/anti-adblock-killer/issues/296
      host : ['slideplayer.fr', 'slideplayer.com', 'slideplayer.org'],
      onEnd : function () {
        // Disable anti-adblocker
        unsafeWindow.force_remove_ads = true;

        // Circumvent "share to download" rule
        var page_callback = function () {
          var slide_id = get_current_slide_id();
          var slide_srv = document.getElementById("player_frame").src.split("/")[3];
          var time = 86400 + Math.floor(Date.now() / 1000);
          var secret = encodeURIComponent(strtr(MD5.base64("secret_preved slideplayer never solved " + time + slide_id + ".ppt"), "+/", "- "));

          var url = "http://player.slideplayer.org/download/" + slide_srv + "/" + slide_id + "/" + secret + "/" + time + "/" + slide_id + ".ppt";
          var links = document.querySelectorAll("a.download_link");
          for (var i = 0; i < links.length; i++) {
            /* Remove original "share to download" popup event listener */
            var events = $._data(links[i]).events.click;
            events.splice(0, events.length);

            /* Set normal link href instead */
            links[i].href = url;
          };
        }
        window.location.href = "javascript:(" + page_callback.toString() + ")()";
      }
    },
    bokepspot_com : {
      host : ['bokepspot.com'],
      onStart : function () {
        // Hide Disclaimer
        Aak.setCookie('hideDialog', 'hide');
      },
      onIdle : function () {
        // Remove Disable AdBlock
        Aak.removeElement('#tupiklan');
      }
    },
    gamestar_de : {
      // by: hamsterbacke
      // pull: https://github.com/reek/anti-adblock-killer/pull/467
      host : ['gamestar.de'],
      onIdle : function () {
        setTimeout(function () {
          Aak.removeElement('body > div.centeredDiv > div[style="display: inline-block;"]');
          window.stop();
        }, 2500);
      }
    },
    picload_com : {
      host : ['picload.org'],
      onStart : function () {
        Aak.setCookie('pl_adblocker', false);
      },
      onIdle : function () {
        Aak.uw.ads_loaded = true;
        Aak.uw.imageAds = false;
        Aak.removeElement('div[oncontextmenu="return false;"]');
      }
    },
    freezedownload_com : {
      host : ['freezedownload.com'],
      onIdle : function () {
        if (/freezedownload.com\/download\//.test(location.href)) {
          Aak.removeElement('body > div[id]');
        }
      }
    },
    rapid8_com : {
      host : ['rapid8.com'],
      onIdle : function () {
        Aak.removeElement('div.backk + #blcokMzg');
        Aak.removeElement('div.backk');
      }
    },
    turkdown_com : {
      host : ['turkdown.com'],
      onIdle : function () {
        // remove facebook box
        Aak.removeElement('#duyuru');
      }
    },
    filmovizija_domains : {
      host : ['filmovizija.me', 'filmovizija.com', 'filmovizija.in', 'filmovizija.net'],
      onIdle : function () {
	    /*
        var d = new Date();
        var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var n = weekday[d.getDay()];
        Aak.setElement('#' + n, {
          html : ''
        });
		Aak.removeElement('#' + n);
		*/
      }
    },
    cityam_com : {
	  // issue: https://github.com/reek/anti-adblock-killer/issues/884
      host : ['cityam.com'],
      onStart : function () {
        Object.defineProperty(Aak.uw, '_r3z', {
          value : {}
        });
      }
    },
    hackintosh_zone : {
      // by: Alexander255
      // issue: https://github.com/reek/anti-adblock-killer/issues/559
      // issue: https://github.com/reek/anti-adblock-killer/issues/427
      // issue: https://github.com/reek/anti-adblock-killer/issues/187
      // issue: https://github.com/reek/anti-adblock-killer/pull/114
      // code: http://paste2.org/DnB9Oj4f
      host : ['hackintosh.zone'],
      onStart : function () {
        Aak.setCookie('ips4_lastvisit', 0, false, location.pathname);
      },
      onIdle : function () {

        var head = document.getElementsByTagName("head")[0];
        // Fake Google ad frame content
        var ad1 = document.createElement("ins");
        ad1.className = "adsbygoogle";
        ad1.appendChild(document.createTextNode("AAK"));
        head.insertBefore(ad1, head.childNodes[0]);

        /*
        // Fake CleanMyMac ad frame size
        var ad2 = document.createElement("div");
        ad2.id  = "nycuhevgqi";
        Object.defineProperty(ad2.wrappedJSObject, 'clientHeight', {value: 1});
        head.insertBefore(ad2, head.childNodes[0]);
         */

        var elems = document.querySelectorAll('.adsensegrey');
        for (var i = 0; i < elems.length; i++) {
          var node = document.createElement("img");
          node.src = Aak.imgBait;
          elems[i].appendChild(node);
        }

      },
      onBeforeScript : function (e) {
        if (Aak.contains(Aak.innerScript(e), "disable ADBlock completely")) {
          Aak.stopScript(e);
        }
      }
    },
    kingmaker_news : {
      // by: Alexander255
      // issue: https://github.com/reek/anti-adblock-killer/issues/561
      host : ['kingmaker.news'],
      onIdle : function () {
        Aak.uw.google_jobrunner = true;
      }
    },
    tvdez_domains : {
      // (document.getElementById('pubfooter').clientHeight < 20)
      host : ['tvdez.com', 'casadossegredos.tv', 'estadiofutebol.com', 'televisaofutebol.com'],
      onStart : function () {
        Aak.addStyle("#pubfooter, #pub2 { height: 30px; display: block; }");
        Aak.setCookie("adblock", null, 0);
      },
      onBeforeScript : function (e) {
        if (Aak.contains(Aak.innerScript(e), "location.href = 'adblock.php';")) {
          Aak.stopScript(e);
        }
      }
    },
    wowhq_domains : {
      host : ['livesoccerhq.com', 'lvshd.altervista.org', 'wowhq.ws', 'futeonline.altervista.org'],
      onIdle : function () {
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
      onIdle : function () {
        // + abp rule
        Aak.uw.dont_scroll = false;
        Aak.removeElement("#overlay_div");
        Aak.removeElement("#overlay_main_div");
      }
    },
    risikogesundheit_de : {
      host : ['risiko-gesundheit.de'],
      onIdle : function () {
        setTimeout(function () {
          window.stop();
        }, 5000);
      }
    },
    oneplaylist_eu_pn : {
      host : ['oneplaylist.eu.pn'],
      onIdle : function () {
        // kill popunder
        Aak.uw.makePopunder = false;
      }
    },
    semprot_com : {
      // issue: https://greasyfork.org/forum/discussion/7663
	  // source: http://pastebin.com/gvXMsHwY
      host : ['semprot.com'],
      onAlways : function () {
        Aak.uw.semprot_show_ads = true;
      }
    },
    turbodebrideur_com : {
	  // issue: https://github.com/reek/anti-adblock-killer/issues/599
      // issue: https://github.com/reek/anti-adblock-killer/issues/563
      // issue: https://github.com/reek/anti-adblock-killer/issues/526
      host : ['turbodebrideur.com'],
      onIdle : function () {
        Aak.createElement({
          tag : 'div',
          id : 'pubdirecte',
          html : '<img  src="' + Aak.imgBait + '"/><a  href="#">&nbsp;</a>',
          append : 'body'
        });
      }
    },
    _4shared_com : {
      host : ['4shared.com'],
      onIdle : function () {
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
    bakersfield_com : {
	  // issue: https://github.com/reek/anti-adblock-killer/issues/657
	  // note: also solution to AakList
      host : ['bakersfield.com'],
      onAlways : function () {
        Aak.uw.AD_SLOT_RENDERED = true;
      }
    },	
    lachainemeteo_com : {
	  // issue: https://github.com/reek/anti-adblock-killer/issues/590
      // issue: https://github.com/reek/anti-adblock-killer/issues/245
      // issue: https://github.com/reek/anti-adblock-killer/issues/215
      host : ['lachainemeteo.com'],
      onAlways : function () {
        // Solution 1
        // + abp rule
		
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
          Aak.detected('Adscendmedia', ref.host, host);
          // Notification
          Aak.notification('You must subscribe to <b>AakList (Anti-Adblock Killer )</b> <a href="' + Aak.subscribeURL + '" target="_blank">Subscribe</a>');
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
          Aak.info('Adworkmedia', ref.host, host);
          // Notification
          Aak.notification('You must subscribe to <b>AakList (Anti-Adblock Killer )</b> <a href="' + Aak.subscribeURL + '" target="_blank">Subscribe</a>');
        }
      }
    },
    adworkmediasurvey : { // experimental
      host : ['phone-track.net', 'netflixaccount.org', 'watchmovies.just4umedia.com', 'mol.cheatsplanet.net', 'vinestown.com', 'xtreme-downloads.com', 'freevps-hosting.com', 'oneplusoneinvite.blogspot.com', 'fullmovieshd.org', 'timepasss.com', 'miningbeast.com', 'broadcastpuma.co', 'thehyphy.com', 'download-site.org', 'mymobileappz.com', 'garena.cheatsplanet.net', 'full-software-downloads.info', 'amazing-web-host.com', 'watchtvserieonlinehd.blogspot.com', 'watch-latest-movies-online-daily.blogspot.com', 'thecompletewebs.info', 'xpango.com-cheat.in', 'yourepeat.net', 'fullsoftwaredownload.info', 'mypcgamesfreedownload.blogspot.com', 'b-books.info', 'freeudidregistration.com'],
      onIdle : function () {
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
          for (var i in Aak.uw) {
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
    // --------------------------------------------------------------------------------------------
    // Players
    // --------------------------------------------------------------------------------------------
    kissanime_com : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/451
      // issue: https://github.com/reek/anti-adblock-killer/issues/381
      // issue: https://github.com/reek/anti-adblock-killer/issues/302
      // issue: https://github.com/reek/anti-adblock-killer/issues/257
      // issue: https://github.com/reek/anti-adblock-killer/issues/178
      // issue: https://github.com/reek/anti-adblock-killer/issues/196
      // issue: https://github.com/reek/anti-adblock-killer/issues/56
      host : ['kissanime.com', 'kissanime.to', 'kissasian.com'],
      onStart : function () {
        // Masking ads
        Aak.addStyle('iframe[id^="adsIfrme"], .divCloseBut { display:none; }');
        // Solution 1
        Aak.uw.DoDetect2 = null;
      },
      onIdle : function () {

        // Solution 1 abp rule
        // @@||kissanime.com^$elemhide

        var divContentVideo = document.querySelector('#divContentVideo');

        // Solution 2
        if (Aak.uw.DoDetect2) {
          Aak.uw.DoDetect2 = null;
          Aak.uw.CheckAdImage = null;
          Aak.info('Solution 2');
        } //Solution 3
        else if (divContentVideo) {

          var divDownload = document.querySelector('#divDownload').cloneNode(true);

          setTimeout(function () {
            divContentVideo.innerHTML = '';
            Aak.uw.DoHideFake();
            divContentVideo.appendChild(divDownload);
            Aak.removeElement('iframe[id^="adsIfrme"], .divCloseBut');
            Aak.info('Solution 3');
          }, 5500);
        }
      }
    },
    Kisscartoon_me : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/488
      host : ['kisscartoon.me'],
      onAlways : function () {
        Aak.uw.xaZlE = function () {};
      },
      onIdle : function () {
        Aak.removeElement('iframe[id^="adsIfrme"]');
      }
    },
    openload_domains : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/475
      host : ['openload.co', 'openload.io', 'openload.tv'],
      onStart : function () {
        Aak.uw.adblock = false;
		Aak.uw.adblock2 = false;
        Aak.uw.popAdsLoaded = true;
        // hide fake play button used to open popunder
        //Aak.addStyle('#videooverlay { display:none; }')
      }
    },
    youwatch_org : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/308
      // issue: https://github.com/reek/anti-adblock-killer/issues/529
      // issue: https://github.com/reek/anti-adblock-killer/issues/535
      // test: http://youwatch.org/embed-59p7i3cdkse0-453x320.html
      // test: http://youwatch.org/59p7i3cdkse0
      host : ['youwatch.org'],
      onStart : function () {
        // Hide player ads allowed by easylist
        Aak.addStyle('#player_img, #iframe2, #iframe3, .video_ad { display:none; }');
        // Skip antiblock
        Aak.uw.jwplayer = function () {};
		// I tried to add jwlib, but without success.
        //Aak.addExternalScript('http://cdn.jsdelivr.net/jwplayer/5.10/jwplayer.js');
      },
      onIdle : function () {

        // main
        var iframe = document.querySelector('iframe[src*="/embed-"]');
        if (iframe) {
		  var size = iframe.src.match(/([0-9]+)x([0-9]+)\.html/);
          var width = size && size[1] || iframe.width || iframe.clientWidth;
          var height = size && size[2] || iframe.height || iframe.clientHeight;
          Aak.request({
            url : iframe.src,
            headers : {
              "Referer" : iframe.src
            },
            onload : function (result) {
              var res = result.responseText;
              var parser = new DOMParser();
              var doc = parser.parseFromString(res, "text/html");
              var script = Aak.getScript('jwplayer("vplayer").setup', doc);
              if (script) {
                var content = script.innerHTML;
                var videoURL = content.match(/file:\s*"(http:\/\/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\/[0-9a-z]+\/v.mp4)",/)[1];
                Aak.player.videojs(iframe, {
                  width : width,
                  height : height,
                  file : videoURL
                });
              }
            }
          });
        }
		
      }
    },	
    exashare_com : {
      // by: Watilin
      // pull: https://github.com/reek/anti-adblock-killer/pull/519
	  // issue: https://github.com/reek/anti-adblock-killer/issues/624
      // issue: https://github.com/reek/anti-adblock-killer/issues/486
      // issue: https://github.com/reek/anti-adblock-killer/issues/506
	  // test:  http://exashare.com/galw2ge2kzsv
      host : ['exashare.com'],
      onEnd : function () {
        
	    // fix countdown
		var btn_download = Aak.getElement('#btn_download');
		if (!Aak.$ && btn_download) {
		  var countDown = function () {
		    var cxc = Aak.getElement('#cxc');
			var countdown_str = Aak.getElement('#countdown_str');
		    num = parseInt(cxc.innerHTML) - 1;
		    if (num <= 0) {
		      btn_download.removeAttribute('disabled');
		      countdown_str.style.visibility = 'hidden';
		    } else {
		      cxc.innerHTML = num;
		      setTimeout(countDown, 1000);
		    }
		  }

		  // disable btn download and run countdown
		  btn_download.setAttribute('disabled', '');
		  setTimeout(countDown, 1000);
		}
		
	  
        // replace player
        if (/\/embed-[0-9a-z]+-[0-9]+x[0-9]+.html$/.test(location.pathname)) {
          var iframe = document.querySelector('iframe');
		  var size = iframe.src.match(/([0-9]+)x([0-9]+)\.html/);
          Aak.request({
            url : iframe.src,
            headers : {
              "Referer" : iframe.src
            },
            onload : function (result) {
              var res = result.responseText;
              var parser = new DOMParser();
              var doc = parser.parseFromString(res, "text/html");
              var script = Aak.getScript('jwplayer("vplayer").setup', doc);
              if (script) {
                // http://fs9.exashare.com:8777/lkxkaiu6zam56odwtz6opw7mvwd27ai7maa2sfqeyvwjnae7bquxznkw5mfq/v.mp4
                var videoURL = script.innerHTML.match(/file:\s*"(http:\/\/fs[0-9]+.exashare.com:[0-9]+\/[0-9a-z]+\/v.mp4)",/)[1];
                Aak.player.videojs(iframe, {
                  width : size[1],
                  height : size[2],
                  file : videoURL
                });
              }
            }
          });
        }
		
      }
    },
    an1me_se : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/190
      host : ['an1me.se'],
      onIdle : function () {
        setTimeout(function () {
          Aak.uw.isBlockAds2 = false;
        }, 10000);
      }
    },
    mangahost_com : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/558
      host : ['mangahost.com'],
      onStart : function () {
        Aak.uw.adsbygoogle = cloneInto([], Aak.uw);
        Aak.uw.adsbygoogle.loaded = true;
        Aak.addStyle('.ads { display:none; }');
      }
    },
    channel4_com : { // research solution
      // issue:
      host : ['channel4.com'],
      onIdle : function () {}
    },
    cbs_com : { // research solution
      // issue:
      host : ['cbs.com'],
      onStart : function () {
        // + abp rule
        //Aak.setCookie('ad-block-counter', 0);
      },
      onIdle : function () {
        /*
        setTimeout(function () {
        var player = document.querySelector("#rcpHolder");
        }, 3000);
         */
      }
    },
    tvcatchup_com : { // research solution
      // issue:
      host : ['tvcatchup.com'],
      onStart : function () {
        // + abp rule
        //Aak.setCookie('ad-block-counter', 0);
      },
      onIdle : function () {
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
      onIdle : function () {
        // + abp rule
        // http://hqq.tv/player/embed_player.php?vid=R3DGHG3GKXX7&autoplay=no
        if ('/player/embed_player.php' == location.pathname) {
          document.querySelector('form[id^="form-"]').submit();
        }
      }
    },	
    // Poland
    wp_domains : {
	  // issue: https://github.com/reek/anti-adblock-killer/issues/905
      // issue: https://github.com/reek/anti-adblock-killer/issues/300
      host : ['biztok.pl', 'wp.tv', 'wp.pl', 'sportowefakty.pl', 'kafeteria.tv', '.wrzuta.pl', 'pudelek.tv', 'komediowo.pl', 'sfora.pl', 'autokrata.pl', 'sportfan.pl', 'wawalove.pl', 'hotmoney.pl', 'aleseriale.pl', 'babol.pl', 'snobka.pl', 'nocoty.pl', 'money.pl', 'abczdrowie.pl', 'gadzetomania.pl', 'autokult.pl'],
      onIdle : function () {
        //Aak.dumpDOM(3000);
        setTimeout(function () {

          var replacePlayerWP = function (mid, player) {
            /* Request
            http://get.wp.tv/?mid=1661056
            http://wp.tv/player/mid,1661056,embed.json
            http://get.wp.tv/?f=2896462.1426329056904.l.webm&rnd=1
            https://wp.tv/player/mid,1747117,embed.json
             */
            Aak.request({
              url : 'http://wp.tv/player/mid,' + mid + ',embed.json',
              onload : function (result) {
                try {
                  var res = result.responseText;
                  var obj = JSON.parse(res);
                  Aak.log(obj)
                  Aak.player.videojs(player, {
                    file : Aak.fixProtocolURL(obj.clip.url[0].url)
                  });
                } catch (e) {
                  Aak.error(result, player);
                }
              }
            });
          }

          var replacePlayerWrzuta = function (key, channel, elem, autostart) {
            Aak.request({
              // http://www.wrzuta.pl/npp/embed/wolnapolska2/0I0HQ2mutJc
              url : 'http://www.wrzuta.pl/npp/embed/' + channel + '/' + key,
              onload : function (result) {
                try {
                  var res = result.responseText;
                  var obj = JSON.parse(res);
				  Aak.log(obj)
                  Aak.player.videojs(elem, {
                    file : Aak.fixProtocolURL(obj.url[0].url)
                  });
                } catch (e) {
                  Aak.error(result, player);
                }
              }
            });
          }

          var replacePlayerlivestream = function (lid, elem, autostart) {
            Aak.request({
              // http://wp.tv/player/lid,1354,ts,1432569945076,livestream.json
              url : 'http://wp.tv/player/lid,' + lid + ',ts,' + Date.now() + ',livestream.json',
              onload : function (result) {
                try {
                  var res = result.responseText;
                  var obj = JSON.parse(res);
                  Aak.player.videojs(elem, {
                    file : Aak.fixProtocolURL(obj.clip.url[0].url[0])
                  });
                } catch (e) {
                  Aak.error('error', player);
                }
              }
            });
          }

          // Using an external flash player is impossible because protected by crossdomain.xml
          var players = document.querySelectorAll('.wp-player'); //  #Player0, #Player1, #mainPlayer
          if (players.length) {
            // fixbug gm_xhr loop request - http://tinyurl.com/pqa9htq
            for (var i = 0; i < players.length; i++) {
              var player = players[i];
              var parent = player.parentNode;
              var script = player.previousSibling;
              var titles = document.querySelectorAll('.wp-player .titleCont a.title');
              var embedvideos = document.querySelectorAll('script[src*="/embed_video.js"]');
              Aak.log(player, parent, script, titles)

              if (embedvideos.length) {
                // pudelek.wrzuta.pl: http://tinyurl.com/l8jo5v2
                // pudelek.tv: http://tinyurl.com/klyzh6r
                // pudelek.tv (triple): http://tinyurl.com/n9b27o2
                // film.wp.pl: http://tinyurl.com/q7k5bxp
                var script = embedvideos[i];
                var key = /key=(\w+)/.exec(script.src)[1];
                var channel = /login=(\w+)/.exec(script.src)[1];
                var autostart = /autoplay/.test(script.src);
                replacePlayerWrzuta(key, channel, player, autostart);
                Aak.log('embed_video.js')
              } else if (script && /lid=/.test(script.innerHTML)) {
                // wiadomosci.wp.pl: http://tinyurl.com/pdwx7na
                // http://wp.tv/player/lid,1354,ts,1432569945076,livestream.json
                // http://get.wp.tv/?lid=1354
                var lid = script.innerHTML.match(/lid[=,]([0-9]+)/);
                replacePlayerlivestream(lid, player, true);
                Aak.log('livestream lid');
              } else if (titles.length && /mid/.test(titles.href)) {
                // sportowefakty.pl: http://tinyurl.com/l6zabcx
                var mid = titles[i].href.match(/mid[=,]([0-9]+)/);
                Aak.log('title.href')
              } else if (parent.id) {
                if (parent.dataset.url) {
                  // wp.tv: http://tinyurl.com/pzde29t
                  var mid = parent.dataset.url.match(/mid[=,]([0-9]+)/);
                  Aak.log('parent.dataset.url')
                } else {
                  // kafeteria.tv: http://tinyurl.com/nofp58a
                  var mid = parent.innerHTML.match(/mid[=,]([0-9]+)/);
                  Aak.log('parent.innerHTML')
                }
              } else if (script && script.tagName == 'SCRIPT') {
                // film.wp.pl: http://tinyurl.com/mh9onfw
                // pudelek.tv (double): http://tinyurl.com/lefvwtx
                var mid = script.innerHTML.match(/mid[=,]([0-9]+)/);
                Aak.log('script.innerHTML')
              }
              if (mid != null && mid.length == 2) {
                replacePlayerWP(mid[1], player);
              }
            }
          }

        }, 5e3);
      }
    },
    bitzfree_com : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/314
      host : ['bitzfree.com'],
      onEnd : function () {
        /* fixed by rules
        setTimeout(function () {
        var elems = document.querySelectorAll('.btc_adresi');
        if (elems.length) {
        for (var i = 0; i < elems.length; i++) { // VU2RmhJMkRKSQ
        var elem = elems[i];
        Aak.createElement({
        tag : 'span',
        html : '<input type="submit" name="' + Aak.generateID(13) + '" value="Activate Double Mining!" class="btn btn-primary btn-block btn_bilgi">',
        replace : elem
        });
        }
        }
        }, 1e3);
         */
      }
    },
    tvn_pl : {
      // by: Marek
	  // solution: http://tinyurl.com/ohbvz4r
	  // issue: https://github.com/reek/anti-adblock-killer/issues/581
	  // issue: https://github.com/reek/anti-adblock-killer/issues/510
	  // issue: https://github.com/reek/anti-adblock-killer/issues/293
      // issue: https://github.com/reek/anti-adblock-killer/issues/192
      // test: http://tinyurl.com/o6d9h66
      // proxy: http://www.proxy.xmc.pl
      host : ['tvn.pl', 'tvn24.pl', 'player.pl'],
      onEnd : function () {
        Aak.onElement('#detailEpisode', function () {
          
          var parts = document.location.href.split(/[.,]/);
          var id = parts[parts.length - 2];
		  var url = ['http://www.proxy.xmc.pl/index.php?hl=3e5&q=','http://player.pl/api/?platform=ConnectedTV&terminal=Samsung&format=json&v=2.0&authKey=ba786b315508f0920eca1c34d65534cd&type=episode&id=' + id + '&sort=newest&m=getItem&deviceScreenHeight=1080&deviceScreenWidth=1920'];

		  if (Aak.getCookie('country_code')) {
		    Aak.request({
		      url : Aak.getCookie('country_code') != 'PL' ? url[0] + Aak.encodeURI(url[1]) : url[1],
		      onload : function (result) {
		        var res = result.responseText;
		        var o = JSON.parse(res);
		        var standardURL = o.item.videos.main.video_content[Number(Aak.opts.videoHD)].url;
		        Aak.request({
		          url : standardURL.replace('http://tvnplayer.pl/', 'http://player.pl/'),
		          onload : function (result) {
		            var videoURL = result.responseText;
		            Aak.player.videojs('#detailEpisode', {
		              file : videoURL
		            });
		          }
		        });
		      }
		    });
		  } else {
		    Aak.request({
		      url : 'https://freegeoip.net/json/',
		      onload : function (response) {
		        var res = response.responseText;
		        var json = JSON.parse(res);
		        Aak.setCookie('country_code', json['country_code']);
		        Aak.refresh();
		      }
		    });
		  }
        });
      }
    },
    ipla_tv : {
      // by: Marek
      // solution: http://tinyurl.com/ptb4ybg
      // issue. https://github.com/reek/anti-adblock-killer/issues/522
      // test1: http://tinyurl.com/pcey4nz
      // test2: http://tinyurl.com/prsurdb
      host : ['ipla.tv'],
      onEnd : function () {
        Aak.onElement('#vod-player', function () {
          Aak.request({
            url : '/VOD/play-in-ipla/' + location.href.match(/\/vod-(\d+)/)[1],
            onload : function (result) {
              var res = result.responseText;
              var idn = res.match(/ipla:\/\/playvod-1\|([a-z0-9]+)/)[1];
			  Aak.log(idn)
              Aak.request({
                url : 'http://getmedia.redefine.pl/vods/get_vod/?cpid=1&ua=mipla/23&media_id=' + idn,
                onload : function (result) {
                  var res = result.responseText;
                  var o = JSON.parse(res);
                  console.log(o)
                  if (o.vod.video_hd)
                    var videoURL = o.vod.video_hd;
                  else if (o.vod.video) {
                    var videoURL = o.vod.video;
                  } else {
                    var videoURL = o.vod.copies[0].url
                  }
                  Aak.player.videojs('#vod-player', {
                    file : videoURL
                  });
                }
              });
            }
          });
        });
      }
    },
    koscian_net : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/914
      // source: http://pastebin.com/yGSPBRqe
      host : ['koscian.net'],
      onIdle : function () {
        var elems = document.querySelectorAll('.ban');
        for (var i = 0; i < elems.length; i++) {
		  elems[i].remove();
          //elems[i].innerHTML = '<br>';
        }
      }
    },
    // France
    playtv_fr : { // research solution
      host : ['play.tv', 'playtv.fr'],
      onAlways : function () {},
      onEnd : function () {

      }
    },
    rmcsportbfmtv_com : { // webradio
      host : ['rmcsport.bfmtv.com'],
      onIdle : function () {

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
        Aak.uw.isABActivated = function () {
          return false;
        }; // Kill antiadblock
        Aak.uw.refresh_iframe = function () {}; // Stop ads to be loaded
      },
      onEnd : function () {
        // Solution 3
        var element = document.querySelector('div[id^="webtv_iframe_"]');
        if (element != null) {
          var videoId = element.id.split('_')[2];
          setTimeout(function () {
            element.innerHTML = '<iframe frameborder="0" width="812" height="500" src="http://www.dailymotion.com/embed/video/' + videoId + '?logo=0&autoPlay=1&autoMute=0"></iframe>';
          }, 1000);
        }
      }
    },
    m6web_fr : {
	  // issue: https://github.com/reek/anti-adblock-killer/issues/461
      host : ['m6web.fr'],
      onEnd : function () {
        var player = document.querySelector('object[id$="_flash_api"]');
        var config = document.body.innerHTML.match(/M6.Player.config = ({.+});/);
        Aak.log(config);
        if (player != null && config != null) {
          var config = JSON.parse(config[1]);
          // Replace player
          Aak.player.videojs(player, {
            file : config.sources[1].src
          });
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
    now_domains : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/336
      // test: http://tinyurl.com/peeobou
      // test: http://jsbin.com/vucobejofo
      host : ['voxnow.de', 'rtl-now.rtl.de', 'rtl2now.rtl2.de', 'n-tvnow.de', 'superrtlnow.de', 'rtlnitronow.de', 'nowtv.de'],
      onIdle : function () {
        /*
        Aak.editSWF('#videoplayer', {
        delFlashvars : 'abcheck_enabled,adcall,adclasses,adconfig,admeta,adslog,agof,ama,angebot,as,asparts,breakad,connectioncheck,cslog,dev,dimmer,errorlog,feedback,fmsident,gtv,highlights,ivw,ivw_play,js,js_event_function,logo,logo_basewidth,logopos,nielsen,ord,osmf,svm,tile,videoplaza,videoplaza_base_url,videoplaza_share,videoplaza_tag,vpEnvironmentURL,xl'
        });
         */
      }
    },
    myspass_de : {
	  // issue: https://github.com/reek/anti-adblock-killer/issues/76
	  // test: http://tinyurl.com/lto9pyd
      host : ['myspass.de'],
      onIdle : function () {
        var videoid = location.pathname.match(/\/(\d+)\/$/);

        if (videoid != null) {
          Aak.request({
            url : 'http://www.myspass.de/myspass/includes/apps/video/getvideometadataxml.php?id=' + videoid[1],
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
              Aak.player.videojs('#player', {
                file : file
              });

            }
          });
        }
      }
    },
    // Nederland
    rtlxl_nl : {
      // test: http://tinyurl.com/l2zkv3d
      host : ['rtlxl.nl', 'rtlnieuws.nl'],
      onEnd : function () {
        Aak.editSWF('#_rtlosmf0', {
          setFlashvars : {
            adblock : false
          }
        });
      }
    },
    // Norway
    vgtv_no : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/367
      // test: http://tinyurl.com/nwp85t
      host : ['vgtv.no'],
      onEnd : function () {
        var prevHash = location.hash;
        var regexHash = /#\!\/video\/(\d+)\//;
        setInterval(function () {
          if (location.hash != prevHash && regexHash.test(location.hash)) {
            var prevHash = location.hash;
            var id = prevHash.match(regexHash)[1];
            var player = Aak.getElement('object[id^="OoFlash"]');
            Aak.removeElement('div.loader-container');
            Aak.request({
              url : 'http://svp.vg.no/svp/api/v1/vgtv/assets/' + id + '?additional=settings|chapters|cuePoints|externalId|barrels|externalCategoryId|nextAsset&appName=vgtv-website',
              onload : function (result) {
                var res = result.responseText;
                var obj = JSON.parse(res);
                Aak.log(player, obj.streamUrls.mp4)
                Aak.player.videojs(player, {
                  file : obj.streamUrls.mp4
                });
              }
            });
          }
        }, 1e3);
      }
    },
    // Italy
    rai_tv : { // research solution
      host : ['rai.tv'],
      onStart : function () {},
      onIdle : function () {}
    },
    // TV Stream
    allmyvideos_net : {
      host : ['allmyvideos.net'],
      onAlways : function () {
        Aak.uw.adblocktest = {
          present : 0,
          sent : 1
        };
      }
    },
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
      onStart : function () {
        // prevent popunder
        Aak.setCookie('vid_main', true);
        Aak.setCookie('vid_sub', true);
        // remove overlay
        Aak.addScript(function () {
          window.onload = function () {
            removeOverlayHTML && removeOverlayHTML();
          }
        });
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
      onIdle : function () {
        if (/^\/embed\/watch\//i.test(location.pathname)) {
          // Skip timer and close ads
          Aak.uw.display = false;
          Aak.uw.closeMyAd();
        }
      }
    },
    goodcast_co : {
      host : ['goodcast.co'],
      onIdle : function () {
        if (/^\/stream.php/.test(location.pathname)) {
          // remove ads allowed by easylist
          Aak.uw.$(".advertisement").hide();
          Aak.uw.$('.adsky iframe').attr("src", "about:blank");
        }
      }
    },
    showsport_tv_com : {
      host : ['showsport-tv.com'],
      onIdle : function () {
        if (/^\/ch.php/.test(location.pathname)) {
          // remove ads allowed by easylist
          Aak.removeElement('#advertisement, .advertisement');
        }
      }
    },
    sharecast_to : {
      host : ['sharecast.to'],
      onIdle : function () {
        if (/^\/embed.php/.test(location.pathname)) {

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
    flowplayer_antiadblock : {
      host : ['videofun.me', 'videobug.net', 'video44.net', 'play44.net', 'byzoo.org', 'playbb.me', 'videowing.me', 'videozoo.me', 'easyvideo.me', 'playpanda.net'],
      onIdle : function () {
        /*
        http://www.animetoon.tv/black-lagoon-episode-1
        http://videowing.me/embed?w=718&h=438&video=ongoing/yu-gi-oh_arc-v_-_53.mp4
        http://playbb.me/embed.php?w=718&h=438&vid=at/nw/yu-gi-oh_arc-v_-_53.mp4
        http://videozoo.me/embed.php?w=718&h=438&vid=at/nw/yu-gi-oh_arc-v_-_53.mp4
        http://www.easyvideo.me/gogo/?w=718&h=438&file=yu-gi-oh_arc-v_-_53.mp4&sv=1
        http://playpanda.net/embed.php?w=718&h=438&vid=at/nw/yu-gi-oh_arc-v_-_53.mp4
         */

        // allow fullscreen when abp is enabled and remove ad layer
        // ads blocked by abp rule
        if (/^\/(embed|gogo|gplus)/.test(location.pathname)) {
          Aak.editSWF('#flowplayer_api', {
            setAttributes : {
              allowfullscreen : true
            }
          });
        }
      }
    },
    str3amtv_domains : { // remove ads + popupwindow
      host : ['str3amtv.com', 'futstr3am.2fh.co'],
      onIdle : function () {
        Aak.removeElement('div[id^="floatLayer"]');
        var anchors = document.querySelectorAll('a[onclick^="window.open"]');
        for (var i in anchors) {
          var fn = anchors[i].onclick.toString();
          var re = new RegExp("http://" + location.host + "/[a-z0-9-]+\.php");
          var link = fn.match(re);
          var link = link && link[0] || null;
          //Aak.log(link);
          anchors[i].onclick = null;
          anchors[i].href = link;
          anchors[i].target = '_self';
        }
      }
    },
    blockadblock_com : {
      // site: blockadblock.com
      // note: random variable name
      host : ['blockadblock.com'],
      onAlways : function () {
        Aak.uw.pnZNzcHfsOis = null;
      }
    },
    linkdrop_net : {
      // site: blockadblock.com
      // note: random variable name
	  // issue: https://greasyfork.org/forum/discussion/7625
      host : ['linkdrop.net'],
      onAlways : function () {
        Aak.uw.JgeWYypahyis = null;
      }
    },	
    revclouds_com : {
      // site: blockadblock.com
      // note: random variable name
	  // issue: https://github.com/reek/anti-adblock-killer/issues/909
      host : ['revclouds.com'],
      onAlways : function () {
        Aak.uw.noUWgzeSrsis = null;
      }
    },
    qnimate_com : {
	  // issue: https://github.com/reek/anti-adblock-killer/issues/739
	  // issue: https://github.com/reek/anti-adblock-killer/issues/705
	  // note: fuckadblock customized
      host : ['qnimate.com'],
      onAlways : function () {
        Aak.uw.adBlockDetected = function () {};
      }  
    },	
    eurotransport_de : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/858
      // note: fuckadblock with custom instance name
      host : ['eurotransport.de'],
      onStart : function () {
        Aak.fakeFuckAdBlock('antiAdBlock');
      }
    },
    beppegrillo_it : { 
      // by: Skr4tchGr3azyMonkiBallllllZzzz
      // issue: https://github.com/reek/anti-adblock-killer/issues/784
      // note: fuckadblock with custom instance name
      host : ['tzetze.it', 'beppegrillo.it'],
      onStart : function () {
        Aak.fakeFuckAdBlock('cadetect');
      }
    },
    agario_sx : { 
      // by: Skr4tchGr3azyMonkiBallllllZzzz
      // issue: https://github.com/reek/anti-adblock-killer/issues/784
      // note: fuckadblock with custom instance name
      host : ['agario.sx'],
      onStart : function () {
        Aak.fakeFuckAdBlock('agarioSXads');
      }
    },
    phoenix_by_goyavelab : { // script anti-adblock obfuscated
      // issue: https://github.com/reek/anti-adblock-killer/issues/
	  // doc: http://tinyurl.com/gl3ghq2
	  // source: http://pastebin.com/hsAmdSuf
      host : ['dpstream.net', 'gum-gum-streaming.com', 'jeu.info'],
      onAlways : function () {
        var win = Aak.uw;
        for (var prop in win) {
          try {
            if (/^_[\$][0-9]/.test(prop)) {
              win[prop] = null;
            }
          } catch (e) {}
        }
      }
    },
    an_scripts_adblock_notify : {
	  // by: Skr4tchGr3azyMonkiBallllllZzzz
      // issue: https://github.com/reek/anti-adblock-killer/issues/592
      // issue: https://github.com/reek/anti-adblock-killer/issues/813
      host : ['gametransfers.com', 'winandmac.com'],
      onAlways : function () {
        Aak.setCookie('anCookie', true);
      }
    },
    ad_defend_uabp : {
      // source: http://pastebin.com/cFQCp80W
      host : ['tvspielfilm.de', 'finanzen.ch'],
      onAlways : function () {
        Aak.uw.UABPInject = function () {};
        Aak.uw.UABPDetect = function () {};
      },
      onBeforeScript : function (e) {
        var target = e.target || e.srcElement;
        var text = target.text;
        if (Aak.contains(text, 'function UABPInject')) {
          Aak.stopScript(e);
          Aak.log('Ad Defend UABPDetect');
        }
      }
    },
    ad_defend_uab : {
      // userscript: https://openuserjs.org/scripts/schwarztee/AdDefend_Klatsche
      // userscript: https://gist.github.com/anonymous/a9b9956baf1d59a107c5
      // source: http://pastebin.com/BaZvJau3
      // issue: https://github.com/reek/anti-adblock-killer/issues/832
      // issue: https://github.com/reek/anti-adblock-killer/issues/733
      // issue: https://github.com/reek/anti-adblock-killer/issues/710
      // issue: https://github.com/reek/anti-adblock-killer/issues/685
      // issue: https://github.com/reek/anti-adblock-killer/pull/467
      host : ['focus.de', 'stern.de', 'sat1.', 'prosieben.', 'kabeleins.', 'sat1gold.', 'sixx.', 'prosiebenmaxx.', 'fem.com', 'the-voice-of-germany.', 'wetter.com', 'wetteronline.de', 'gamestar.de', 'pcwelt.de', 'boerse-online.de', 'sportauto.de', 'auto-motor-und-sport.de', 'motor-klassik.de', '4wheelfun.de', 'autostrassenverkehr.de', 'lustich.de', 'spox.com', 'shz.de', 'transfermarkt.de', 'rp-online.de', 'motorradonline.de', '20min.ch', 'main-spitze.de', 'wormser-zeitung.de', 'lampertheimer-zeitung.de', 'wiesbdener-tagblatt.de', 'buerstaedter-zeitung.de', 'wiesbdener-kurier.de', 'rhein-main-presse.de', 'allgemeine-zeitung.de', 'ariva.de', 'spiegel.de', 'brigitte.de', 'dshini.net', 'gala.de', 'gamepro.de', 'gamona.de', 'pnn.de', 'promobil.de', 'sportal.de', 'webfail.com', 'computerbild.de', 'finanzen.net', 'comunio.de'],
      onAlways : function () {
        Aak.uw.uabpdl = false;
      },
      onBeforeScript : function (e) {
        var target = e.target || e.srcElement;
        var text = target.text;
        if (Aak.contains(text, 'uabInject') && Aak.contains(text, 'uabDetect')) {
          Aak.stopScript(e);
          Aak.log('Ad Defend uabDetect');
        }
      }
    },
	/* solved by AakLIst
    tisoomi_indirekt : {
	  // inline: http://pastebin.com/npmXTUHw
	  // external: http://pastebin.com/hvWnCuDw
      host : ['energy.de', 'getvids.de', 'gewinde-normen.de', 'podcast.de', 'spielespielen24.de', 'dialo.de'],
      onBeforeScript : function (e) {
        var target = e.target || e.srcElement;
        var text = target.text;
        if (Aak.contains(text, 'n="abcdefghijklm",r="nopqrstuvwxyz",i="0123456789";var s=t==0?i:t==1?n')) {
          Aak.stopScript(e);
          Aak.log('Tisoomi Indirekt');
        }
      }
    },
	*/
	/* solved by AakLIst
    tisoomi_direkt : {
	  // inline: http://pastebin.com/2vq38JXY
      host : ['autozeitung.de', 'formel1.de', 'fremdwort.de', 'inside-handy.de', 'motorsport-total.com', 'aussenwirtschaftslupe.de', 'donnerwetter.de', 'wintotal.de'],
      onBeforeScript : function (e) {
        var target = e.target || e.srcElement;
        var text = target.text;
        if (Aak.contains(text, 'function detect()')) {
          Aak.stopScript(e);
          Aak.log('Tisoomi Direkt');
        }
      }
    },
	*/
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
        Aak.addBaitElement('div#ads1');
        Aak.addStyle("#ads1 { height: 30px; }");
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
      onRemove : function (removedNode) {
        if (Aak.opts.removed) {
          if (removedNode.src ||
            removedNode.id ||
            removedNode.className &&
            !/^firebug/.test(removedNode.className)) {
            // Node removed
            Aak.log(removedNode);
          }
        }
      },
      onStart : function () {
	  
        // FuckAdBlock & BlockAdBlock v3 and v4
        // site: http://www.sitexw.fr/fuckadblock/
        // repo: https://github.com/sitexw/FuckAdBlock
        // repo: https://github.com/sitexw/BlockAdBlock
        // note: when fuckadblock.js or blockadblock.js is blocked
		// demo v3: http://sh.st/vovHE
		// demo v4: http://al.ly/qBbXH
		// issue: https://github.com/reek/anti-adblock-killer/issues/888
		// issue: https://github.com/reek/anti-adblock-killer/issues/824
        Aak.fakeFuckAdBlock('fuckAdBlock', 'FuckAdBlock');
        Aak.fakeFuckAdBlock('blockAdBlock', 'BlockAdBlock');		

      },
      onIdle : function () {

        // AdBlock Detector (XenForo Rellect)
        // site: http://tinyurl.com/pa28xdn
        // cloneInto: http://tinyurl.com/k6qphme
		// issue: https://github.com/reek/anti-adblock-killer/issues/805
		// issue: https://github.com/reek/anti-adblock-killer/issues/804
		// issue: https://github.com/reek/anti-adblock-killer/issues/591
        if (Aak.uw.XenForo && typeof Aak.uw.XenForo.rellect == 'object') {
          Aak.uw.XenForo.rellect = {
              AdBlockDetector : {
                start : function () {}
              }
            };
          Aak.detected('AdBlock Detector (XenForo Rellect)');
        }

        /*
        // Adunblock - http://adunblock.com/
        if (Aak.getCookie('adblock') == 1) {
        Aak.setCookie('adblock', 0);
        Aak.setCookie('bar_closed', 1);
        }
        */
		
		// Adblock Blocker
		// https://wordpress.org/plugins/addblockblocker/
        // http://tinyurl.com/nswn6fz
		var ads = document.getElementsByClassName('afs_ads');
		var ad = ads.length && ads[ads.length - 1];
		if (ad && ad.innerHTML.length == 0 || ad.clientHeight === 0) {
		  Aak.addScript(function () {
		    document._getElementsByClassName = document.getElementsByClassName;
		    document.getElementsByClassName = function (byClass) {
		      if (byClass == 'afs_ads') {
		        return null;
		      } else {
		        return document._getElementsByClassName(byClass);
		      }
		    };
		  });
		}
		
        // Adbuddy
        if (typeof Aak.uw.closeAdbuddy === 'function') {
          Aak.uw.closeAdbuddy();
          Aak.detected('Adbuddy');
        }
		
        // AdBlock Alerter (WP)
		// https://github.com/wp-plugins/adblock-alerter
		// 
        if (Aak.getElement('div.adb_overlay > div.adb_modal_img')) {
          // Remove Alert + Allow Scroll
          Aak.removeElement('div.adb_overlay');
          Aak.addStyle('html,body {height:auto; overflow: auto;}');
          Aak.detected('AdBlockAlerter');
        }

        // Unknow Anti AdBlock system
        if (Aak.getElement('#blockdiv') && Aak.contains(Aak.getElement('#blockdiv').innerHTML, 'disable ad blocking or use another browser without any adblocker when you visit')) {
          Aak.removeElement('#blockdiv');
        }
		

		// Antiblock.org v2
		// note: detect and store block id
		// test: http://tinyurl.com/nhyhpzk
		var styles = document.querySelectorAll('style');
		for (var i = 0; i < styles.length; i++) {
		  var style = styles[i];
		  var cssRules = style.sheet.cssRules;
		  //console.log(cssRules)
		  for (var j = 0; j < cssRules.length; j++) {
		    var cssRule = cssRules[j];
		    var cssText = cssRule.cssText;
		    var pattern = /^#([a-z0-9]{4,10}) ~ \* \{ display: none; \}/;
		    if (pattern.test(cssText)) {
		      var id = pattern.exec(cssText)[1];
		      var script = Aak.getScript("w.addEventListener('load'," + id + ",false)");
		      if (script) {
		        Aak.setSession('aboBlockId', id);
		        break;
		      }
		    }
		  }
		}
		// Detect v3
		// issue: https://github.com/reek/anti-adblock-killer/issues/833
		var win = Aak.uw;
		for (var prop in win) {
		  if (!/^webkit/.test(prop)) {
		    var method = win[prop];
		    try {
		      if (/^[a-z0-9]{4,10}$/.test(prop) &&
		        typeof method === 'object' &&
		        method.deferExecution &&
		        method.displayMessage &&
		        method.getElementBy &&
		        method.getStyle &&
		        method.insert &&
		        method.nextFunction) {
		        Aak.setSession('aboBlockId', prop);
		        break;
		      }
		    } catch (e) {
		      //console.log('error', prop)
		    }
		  }
		}

		
		// Anti-Adblockers
		var systems = {
          // Plugins WordPress
          'NoAdblock' : '(/plugins/no-adblock/|/blockBlock/blockBlock.jquery.js)',
          'BetterStopAdblock' : '(/plugins/better-stop-adblock/|bsa-script-doctype.js|bsa-script-no-doctype.js)',
          'WordPressAdBlockBlocker' : '/plugins/wordpress-adblock-blocker/',
          'AntiBlockBukssaAyman' : '/plugins/anti-block/',
          'BlockAlyzer' : '/plugins/blockalyzer-adblock-counter/',
          'AdBlockingDetector' : '/plugins/ad-blocking-detector/',
          // Plugins Website
          'Adworkmedia' : '(adworkmedia|loxtk|contentlockingnetworks).com/gLoader.php',
          'Adscendmedia' : 'adscendmedia.com/gwjs.php',
          'FuckAdBlock' : '(/fuckadblock.js|/blockadblock.js)',
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
            for (var key in systems) {
              if (new RegExp(systems[key], 'i').test(script.src)) {
                Aak.detected(key, location.host, script.src);
                break;
              }
            }
          }
        }

      },
      onInsert : function (insertedNode) {

        // All Nodes
        if (Aak.opts.inserted) {
          if (insertedNode.src ||
            insertedNode.id ||
            insertedNode.className &&
            !/^firebug/.test(insertedNode.className)) {
            // Node inserted
            Aak.log(insertedNode);
          }
        }

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
          Aak.detected('No-Adblock', false, location.href);
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
          Aak.detected('StopAdBlock', false, location.href);
          Aak.removeElement(insertedNode);
          //Aak.log(insertedNode);
        }

        // AntiAdblock (Packer)
        var reIframeId = /^(zd|wd)$/;
        var reImgId = /^(xd|gd)$/;
        var reImgSrc = /\/ads\/banner.jpg/;
        var reIframeSrc = /(\/adhandler\/|\/adimages\/|ad.html)/;

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
            Aak.detected('AntiAdblockPackerZdxd', false, location.href);
          } // Variant 2
          else if (insertedNode.id == 'gd') {
            Aak.detected('AntiAdblockPackerWdgd', false, location.href);
          }
          // Remove
          //Aak.log(insertedNode);
          Aak.removeElement(insertedNode);
        }


        // Adunblock - http://adunblock.com/
        var reId = /^[a-z]{8}$/;
        var reClass = /^[a-z]{8} [a-z]{8}/;
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
            Aak.detected("AdUnBlockPremium");
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
            Aak.detected("AdUnBlockFree");
            Aak.removeElement(insertedNode);
          }
        }

        // Antiblock - http://antiblock.org/
        var reId = /^[a-z0-9]{4,10}$/i;
        var reTag1 = /^(div|span|b|i|font|strong|center)$/i;
        var reTag2 = /[abisuqp]{1}/i;	
        var reTag3 = /[abisuq]{1}/i;	
        var reTag4 = /[p]{1}/i;
        var reWords1 = /ad blocker|ad block|ad-block|adblocker|ad-blocker|adblock|bloqueur|bloqueador|Werbeblocker|adblockert|&#1570;&#1583;&#1576;&#1604;&#1608;&#1603; &#1576;&#1604;&#1587;|блокировщиком/i;
        var reWords2 = /kapat|disable|désactivez|désactiver|desactivez|desactiver|desative|desactivar|desactive|desactiva|deaktiviere|disabilitare|&#945;&#960;&#949;&#957;&#949;&#961;&#947;&#959;&#960;&#959;&#943;&#951;&#963;&#951;|&#1079;&#1072;&#1087;&#1088;&#1077;&#1097;&#1072;&#1090;&#1100;|állítsd le|publicités|рекламе|verhindert/i;

        // Antiblock.org (all version)
        if (typeof Aak.getSession('aboBlockId') != 'undefined' &&
          insertedNode.id == Aak.getSession('aboBlockId')) {
            if (Aak.uw.hasOwnProperty(insertedNode.id)) { // v3
              Aak.uw[insertedNode.id] = null;
              Aak.detected("Antiblock3");
            } else { // v2
              Aak.detected("Antiblock2");
            }
            // Disable
            //Aak.log(insertedNode);
            Aak.removeElement(insertedNode);
        }
        // Alternative
        else if (insertedNode.parentNode &&
          insertedNode.id &&
          insertedNode.style &&
		  insertedNode.childNodes.length &&
          insertedNode.firstChild &&
          !insertedNode.firstChild.id &&
          !insertedNode.firstChild.className &&
          reId.test(insertedNode.id) &&
          reTag1.test(insertedNode.nodeName) &&
          reTag2.test(insertedNode.firstChild.nodeName)) {
          //Aak.log(insertedNode);

          // Kill audio message
          var audio = insertedNode.querySelector("audio[loop]");
          if (audio) {
            Aak.detected('Antiblock(audio)');
            audio.pause();
            Aak.removeElement(audio);
          }

          // v3 + Fork
          if (insertedNode.firstChild.firstChild &&
            typeof Aak.uw[insertedNode.id] == 'object' &&
            typeof Aak.uw[insertedNode.id].displayMessage == 'function') {

            // Better Stop Adblock
            // demo: http://codeclan.altervista.org/
			// issue: https://greasyfork.org/sv/forum/discussion/7593/
            if (typeof Aak.uw[insertedNode.id].toggle == 'function') {
              var childs = document.body.childNodes;
              for (var i = 0; i < childs.length; i++) {
                var child = childs[i];
                if (child.nodeType == 1 && child.style.display == 'none') {
                  child.style.display = ''; // show
                  //Aak.log(node);
                }
              }
              Aak.detected('BetterStopAdblock');
            }
            // Antiblock.org v3
            else if (insertedNode.firstChild.firstChild.nodeName == "IMG") {
              Aak.detected('Antiblock3Alt');
            }
            // Disable
            //Aak.log(insertedNode, Aak.uw[insertedNode.id]);
            Aak.removeElement(insertedNode);
            Aak.uw[insertedNode.id] = null;
          }
          // Antiblock.org v2
          else if (reTag4.test(insertedNode.firstChild.nodeName) &&
            reWords1.test(insertedNode.firstChild.innerHTML) &&
            reWords2.test(insertedNode.firstChild.innerHTML)) {
            // Disable
            //Aak.log(insertedNode);
            Aak.detected("Antiblock2Alt");
            Aak.removeElement(insertedNode);
          }
          //  Many false positive
          else {
            //Aak.removeElement(insertedNode);
          }
        } 
      }
    }
  },
  blockDetect : function () {

    // Exclude domains
	// issue: https://github.com/reek/anti-adblock-killer/issues/857
    // issue: https://github.com/reek/anti-adblock-killer/issues/617
    // issue: https://greasyfork.org/fr/forum/discussion/5426
    // issue: https://github.com/reek/anti-adblock-killer/issues/419
    // issue: https://github.com/reek/anti-adblock-killer/issues/377
    var excludes = ["360.cn", "amazon.", "apple.com", "ask.com", "baidu.com", "bing.com", "bufferapp.com", "chatango.com", "chromeactions.com", "easyinplay.net", "ebay.com", "facebook.com", "flattr.com", "flickr.com", "ghacks.net", "google\.", "imdb.com", "imgbox.com", "imgur.com", "instagram.com", "jsbin.com", "jsfiddle.net", "linkedin.com", "live.com", "mail.ru", "microsoft.com", "msn.com", "paypal.com", "pinterest.com", "preloaders.net", "qq.com", "reddit.com", "stackoverflow.com", "tampermonkey.net", "tumblr.com", "twitter.com", "vimeo.com", "wikipedia.org", "w3schools.com", "yahoo.", "yandex.ru", "youtu.be", "youtube.com", "xemvtv.net", "vod.pl", "agar.io", "pandoon.info", "fsf.org", "adblockplus.org", "plnkr.co"];
    var host = location.host;
    var excluded = false;
    excludes.forEach(function (exclude) {
      if (new RegExp(exclude).test(host)) {
        excluded = true;
        if (Aak.opts.logExcluded) {
          Aak.warn('Excluded', host);
        }
      }
    });

    // Include domains
	// IsEventupported: http://tinyurl.com/oeez8c7
    if (!excluded) {

      // Detect & Kill
      for (var i in Aak.rules) {
        var current = Aak.rules[i];
        current.host.forEach(function (host) {
          // Check host
          if (new RegExp(host).test(location.host)) {
            // Before DOM load
            if (current.onStart) {
              current.onStart();
            }
            // On all statements
            if (current.onAlways) {
              current.onAlways(); // start
              window.addEventListener('DOMContentLoaded', current.onAlways); // idle
              window.addEventListener('load', current.onAlways); // end
            }
            // Before Script Executed
            if (current.onBeforeScript) {
              if ('onbeforescriptexecute' in document) { // Mozilla Firefox
                window.addEventListener('beforescriptexecute', current.onBeforeScript);
              }
            } // After Script Executed
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
            if (current.onIdle) {
              window.addEventListener('DOMContentLoaded', current.onIdle);
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
              // doc: http://tinyurl.com/mxxzee4
              // support: http://tinyurl.com/nepn7vy
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
                        Array.prototype.forEach.call(mutation.addedNodes, function (addedNode) {
                          if (Aak.opts.logInsertedNodes) {
                            Aak.log(addedNode);
                          }
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
              // doc: http://tinyurl.com/op95rfy
              else {
                window.addEventListener("DOMNodeInserted", function (e) {
                  if (Aak.opts.logInsertedNodes) {
                    Aak.log(e.target);
                  }
                  current.onInsert(e.target);
                }, false);
              }
            }
            // When DOM Elements are Removed in Document
            if (current.onRemove) {

              // Mutation Observer
              // doc: http://tinyurl.com/mxxzee4
              // support: http://tinyurl.com/nepn7vy
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
                        Array.prototype.forEach.call(mutation.removedNodes, function (removedNode) {
                          if (Aak.opts.logRemovedNodes) {
                            Aak.log(removedNode);
                          }
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
              // doc: http://tinyurl.com/op95rfy
              else {
                window.addEventListener("DOMNodeRemoved", function (e) {
                  if (Aak.opts.logRemovedNodes) {
                    Aak.log(e.target);
                  }
                  current.onRemove(e.target);
                }, false);
              }
            }
          }
        });
      }
    }
  }
};

Aak.initialize();