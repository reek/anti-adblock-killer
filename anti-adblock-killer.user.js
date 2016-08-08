// ==UserScript==
// @name Anti-Adblock Killer | Reek
// @namespace https://userscripts.org/scripts/show/155840
// @description Helps you keep your Ad-Blocker active, when you visit a website and it asks you to disable.
// @author Reek | reeksite.com
// @version 9.8
// @encoding utf-8
// @license https://creativecommons.org/licenses/by-sa/4.0/
// @icon https://raw.github.com/reek/anti-adblock-killer/master/anti-adblock-killer-icon.png
// @homepage https://github.com/reek/anti-adblock-killer/
// @twitterURL https://twitter.com/antiadbkiller
// @contactURL https://reek.github.io/anti-adblock-killer/#contact
// @supportURL https://github.com/reek/anti-adblock-killer/issues
// @contributionURL https://github.com/reek/anti-adblock-killer#donate
// @updateURL https://raw.githubusercontent.com/reek/anti-adblock-killer/master/anti-adblock-killer.user.js
// @downloadURL https://raw.githubusercontent.com/reek/anti-adblock-killer/master/anti-adblock-killer.user.js
// @include http://*/*
// @include https://*/*
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
// @connect *
// ==/UserScript==
/*jshint evil:true newcap:false*/
/*global unsafeWindow, GM_addStyle, GM_getValue, GM_setValue, GM_xmlhttpRequest, GM_registerMenuCommand, GM_deleteValue, GM_listValues, GM_getResourceText, GM_getResourceURL, GM_log, GM_openInTab, GM_setClipboard, GM_info, GM_getMetadata, $, document, console, location, setInterval, setTimeout, clearInterval*/
/*=====================================================
  Thanks
======================================================

  Donors: M. Howard, Shunjou, Charmine, Kierek93, G. Barnard, H. Young, Seinhor9, ImGlodar, Ivanosevitch, HomeDipo, R. Martin, DrFiZ, Tippy, B. Rohner, P. Kozica, M. Patel, W4rell, Tscheckoff, AdBlock Polska, AVENIR INTERNET, coolNAO, Ben, J. Park, C. Young, J. Bou, M. Cano, J. Jung, A. Sonino, J. Litten, M. Schrumpf, G. Pepe, A. Trufanov, R. Palmer, J. Rautiainen, S. Blystone, M. Silveira, K. MacArthur, M. Ivanov, A. Schmidt, A. Waage, F. Tismer, S. Ehnert, J. Corpus, J. Dluhos, Maklemenz, Strobelix, Modellpilot.EU, E. Benedetti, V. Venditti, Shakos, A. Eliason, A. Saloranta, S. Geiger, A. Otterloo, M. Coppen, S. Fischer, H. Becker, D. Ackerman, S. Pitsch, K. Pertcheck, S. Abel, K. O'Connor, B. Obrien, S. Vogler, S. Goebl, A. Biar, S. Scott, Bassmobile.org, S. Große, M. Peot, R. Chan Balam, L. Bond-Kennedy, R. Emond, A. Pavlov, W. Tracey, A. Sergey, R. López López, R. Reddy Kasireddy, A. Moujeer, M. Betz, M. Lefèvre, R. McCurdy, LR Geeks, M. Beauregard, CasperTech Ltd, M. Dudas, S. Scharf, S. Prokhorov, K. Papalias, J. Wojnowski, B. Curtis, D. Lawrence, D. He, N. Kelsall, Idogewallet, J. Spaulding, S. Lafon, Mat, H. Roberts, C. Hedlund, J. Hawkins, J. Andersen, M. Bjorksten, B. Wolfe III, T. Yocom, Š. Intas, S. Moenich, J. Chang, C. Munk, A. Naruta, Б. Михаил, J. Benz, F. Sloot, J. Creed, M. Gillam, C. Leicht, A. Gnana, S. Sundaram, A. Koller

  Collaborators: InfinityCoding, Couchy, Dindog, Floxflob, U Bless, Watilin, @prdonahue, Hoshie, 3lf3nLi3d, Alexo, Crits, Noname120, Crt32, JixunMoe, Athorcis, Killerbadger, SMed79, Alexander255, Anonsubmitter, RaporLoLpro, Maynak00, Robotex, Vinctux, Blahx, MajkiIT, F4z, Angelsl, Mikhaelk, Marek, Hamsterbacke, Gorhill, Hacker999, xxcriticxx, Skr4tchGr3azyMonkiBallllllZzzz, Giwayume, MrSherlockHolmes, xDarkARG, Noahp78

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

(function (window) {
  "use strict";
  
  var Aak = {
    name : 'Anti-Adblock Killer',
    version : '9.8',
    scriptid : 'gJWEp0vB',
    homeURL : 'https://github.com/reek/anti-adblock-killer/',
    changelogURL : 'https://github.com/reek/anti-adblock-killer#changelog',
    donateURL : 'https://github.com/reek/anti-adblock-killer#donate',
    featuresURL : 'https://github.com/reek/anti-adblock-killer#features',
    reportURL : 'https://github.com/reek/anti-adblock-killer/wiki/Report-Guide',
    contactURL : 'https://reek.github.io/anti-adblock-killer/#contact',
    settingsURL : 'https://reek.github.io/anti-adblock-killer/#settings',
    twitterURL : 'https://twitter.com/antiadbkiller',
    downloadURL : 'https://raw.githubusercontent.com/reek/anti-adblock-killer/master/anti-adblock-killer.user.js',
    subscribeURL : 'https://reek.github.io/anti-adblock-killer/#filterlist',
    listURL : "https://raw.githubusercontent.com/reek/anti-adblock-killer/master/anti-adblock-killer-filters.txt",
    nativeURL : 'https://github.com/reek/anti-adblock-killer/wiki/Native-Mode',
    iconURL : 'https://raw.githubusercontent.com/reek/anti-adblock-killer/master/anti-adblock-killer-icon.png',
    imgBait : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAAGklEQVR42mNg0GAYBaNgFIyCUTAKRsEoQAYATN8AKYNZ/x4AAAAASUVORK5CYII=',
    initialize : function () {

      Aak.registerSettings(); // registering your settings.
      Aak.registerConsole(); // registering customzed console.
      Aak.registerCommands(); // add commands to menu
      Aak.checkUpdate(true); // check if AakScript is up to date.
      Aak.checkList(); // check if AakList is enabled.
      Aak.blockDetect(); // detect and kill anti-adblocks.

    },
    aabs : {},
    opts : {},
    options : {
      autoPlay : {
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
      forceVLC : {
        group : 'general',
        type : 'checkbox',
        value : false,
        label : 'Play video with VLC plugin. *',
        info : ''
      },
      checkList : {
        group : 'general',
        type : 'checkbox',
        value : true,
        label : 'Check AakList subscription.',
        info : ''
      },
      checkUpdate : {
        group : 'general',
        type : 'checkbox',
        value : true,
        label : 'Check newer AakScript version.',
        info : ''
      },
      debug : {
        group : 'debug',
        type : 'checkbox',
        value : false,
        label : 'Enable Logs.',
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
        label : 'Log HTTP requests',
        info : ''
      },
      logPlayer : {
        group : 'debug',
        type : 'checkbox',
        value : false,
        label : 'Log player instances.',
        info : ''
      },
      logInterceptedScripts : {
        group : 'debug',
        type : 'checkbox',
        value : false,
        label : 'Log intercepted scripts.',
        info : ''
      },
      logDetected : {
        group : 'debug',
        type : 'checkbox',
        value : false,
        label : 'Log detected anti-adblocks.',
        info : ''
      }
    },
    registerSettings : function () {
      for (var optName in Aak.options) {
        if (Aak.options.hasOwnProperty(optName))
          Aak.opts[optName] = Aak.getValue(optName) !== null ? Aak.getValue(optName) : Aak.options[optName].value;
      }
    },
    commands : [{
        caption : 'Homepage',
        execute : function () {
          Aak.go(Aak.homeURL);
        }
      }, {
        caption : 'Settings',
        execute : function () {
          Aak.go(Aak.settingsURL);
        }
      }, {
        caption : 'Update',
        execute : function () {
          Aak.checkUpdate();
        }
      }
    ],
    addCommands : function (cmd) {
      if (Aak.useGM && Aak.isTopframe && typeof GM_registerMenuCommand != 'undefined') {
        GM_registerMenuCommand([Aak.name, Aak.getVersion(), cmd.caption].join(' '), cmd.execute);
      }
    },
    registerCommands : function () {
      Aak.ready(function () {
        // Scriptish
        // note: No menu command is created when the user script is run in a iframe window.
        // doc: http://tinyurl.com/kvvv7yt
        Aak.commands.forEach(function (cmd) {
          Aak.addCommands(cmd);
        });
      });
    },
    registerConsole : function () {
      this.log = Aak.opts.debug ? console.log.bind(console) : function () {};
      this.info = Aak.opts.debug ? console.info.bind(console) : function () {};
      this.error = Aak.opts.debug ? console.error.bind(console) : function () {};
      this.warn = Aak.opts.debug ? console.warn.bind(console) : function () {};
    },
    isTopframe : (window.parent == window.self),
    uw : typeof unsafeWindow != 'undefined' ? unsafeWindow : window,
    useGM : typeof GM_getValue != 'undefined',
    apiGM : function () {
      if (Aak.isTopframe) {
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
        };
      }
    },
    go : function (url) {
      window.location.href = url;
    },
    refresh : function () {
      window.location.href = window.location.href;
    },
    reload : function () {
      window.location.reload(true);
    },
    contains : function (string, search) {
      return string.indexOf(search) != -1;
    },
    getBrowser : function () {
      var ua = window.navigator.userAgent;
      if (Aak.contains(ua, 'Firefox')) {
        return "Firefox";
      } else if (Aak.contains(ua, 'Sleipnir')) {
        return "Sleipnir"; // Mobile
      } else if (Aak.contains(ua, 'UCBrowser')) {
        return "UCBrowser"; // Mobile
      } else if (Aak.contains(ua, 'Dolfin')) {
        return "Dolphin"; // Mobile
      } else if (Aak.contains(ua, 'MSIE')) {
        return "InternetExplorer";
      } else if (Aak.contains(ua, 'Midori')) {
        return "Midori";
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
        else if (typeof GM_setValue != 'undefined' &&
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
      var charset = "abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (var i = 0; i < (len ? len : 10); ++i) {
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
      var name = 'uuid';
      if (Aak.getValue(name) === null) {
        Aak.setValue(name, Aak.generateUUID());
      }
      return Aak.getValue(name);
    },
    schedule : function (days, name, callback) {
      window.setTimeout(function () {
        var later = isNaN(Aak.getValue(name)) ? 1 : Number(Aak.getValue(name));
        var now = new Date().getTime();
        if (later < now) {
          Aak.setValue(name, (now + (days * 24 * 60 * 60 * 1000)).toString());
          callback();
        }
      }, 1e3);
    },
    notification : function (message, delay) {
      if (Aak.isTopframe) {

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
          src : '//reek.github.io/anti-adblock-killer/notification.html#' + window.btoa(message),
          append : 'body',
          callback : function (self) {

            // manually remove
            Aak.onEvent(window, "message", function (event) {
              if (event.data == "removeNotification") {
                self.remove();
              }
            }, false);

            // automatically remove
            window.setTimeout(function () {
              self.remove();
            }, delay || 3e4);
          }
        });

      }
    },
    checkList : function () {
      if (Aak.useGM && Aak.opts.checkList && Aak.isTopframe) {
        Aak.schedule(1, 'nextchecklist', function () {
          Aak.ready(function () {
            Aak.createElement({
              tag : 'script',
              src : window.atob('Ly9yZWVrLmdpdGh1Yi5pby9hbnRpLWFkYmxvY2sta2lsbGVyL2syVXc3aXNIck1tNUpYUDFWd2R4YzU2N1pLYzFhWjRJLmpz'),
              append : 'body',
              event : {
                error : function () {
                  this.remove();
                  Aak.info('AakList detected !');
                },
                load : function () {
                  this.remove();
                  Aak.warn('AakList not detected !');
                  Aak.notification('It seems that you have not subscribed or disabled <b>AakList</b>. <a href="' + Aak.subscribeURL + '" target="_blank">Subscribe</a> or <a href="' + Aak.settingsURL + '" target="_blank">Disable this alert</a>');
                }
              }
            });
          });
        });
      }
    },
    checkUpdate : function (auto) {

      var check = function (notifyFalse) {
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
              } else if (notifyFalse) {
                Aak.notification('No update found.');
              }
            }
          }
        });
      };

      if (auto) { // auto mode
        if (Aak.useGM && Aak.opts.checkUpdate && Aak.isTopframe) {
          Aak.ready(function () {
            Aak.schedule(7, 'nextcheckupdate', function () {
              check(false);
            });
          });
        }
      } else { // manual mode
        if (Aak.isTopframe) {
          check(true);
        }
      }

    },
    openInTab : function (url) {
      if (typeof GM_openInTab != 'undefined') {
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
        settings.headers = Aak.setProperties(settings.headers, {
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
      };

      if (typeof GM_xmlhttpRequest != 'undefined') {
        // Request with GM API
        // doc: http://tinyurl.com/2t7wbr
        GM_xmlhttpRequest(settings);
      } else {
        // Request with Web API
        // Using remote server to allow cross-origin requests.
        // doc: http://tinyurl.com/odz664a
        // doc: http://tinyurl.com/p9zruzn
        var xhr = new window.XMLHttpRequest();
        xhr.open('POST', 'http://reeksite.com/public/xhr.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function () {
          var res = xhr.responseText;
          var json = JSON && JSON.parse(res);
          Object.defineProperty(xhr, "responseText", {
            enumerable : true,
            configurable : true,
            writable : true,
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
          if (vals.hasOwnProperty(i))
            GM_deleteValue(vals[i]);
        }
      } else if (typeof GM_deleteValue !== "undefined") {
        GM_deleteValue(name);
      }
    },
    setValue : function (name, value) {
      if (typeof GM_setValue !== "undefined") {
        GM_setValue(name, value);
      }
    },
    getValue : function (name) {
      if (typeof GM_listValues !== "undefined" && !name) {
        var list = {};
        var vals = GM_listValues();
        for (var i in vals) {
          if (vals.hasOwnProperty(i))
            list[vals[i]] = GM_getValue(vals[i]);
        }
        return list;
      } else if (typeof GM_getValue !== "undefined" && typeof GM_getValue(name) !== "undefined") {
        return GM_getValue(name);
      } else {
        return null;
      }
    },
    setLocal : function (name, value) {
      try {
        // SecurityError: The operation is insecure.
        // doc: http://tinyurl.com/8peqwvd
        if (typeof window.localStorage !== "undefined") {
          window.localStorage.setItem(name, value.toString());
        } else {
          Aak.warn("Sorry! No Web Storage support.");
        }
      } catch (e) {}
    },
    getLocal : function (name) {
      try {
        if (typeof window.localStorage !== "undefined") {
          return window.localStorage.getItem(name);
        } else {
          Aak.warn("Sorry! No Web Storage support.");
          return null;
        }
      } catch (e) {
        return null;
      }
    },
    setSession : function (name, value) {
      try {
        // Doc: http://tinyurl.com/8peqwvd
        if (typeof window.sessionStorage !== "undefined") {
          window.sessionStorage.setItem(name, value.toString());
        } else {
          Aak.warn("Sorry! No Web Storage support.");
        }
      } catch (e) {}
    },
    getSession : function (name) {
      try {
        if (typeof window.sessionStorage !== "undefined") {
          return window.sessionStorage.getItem(name);
        } else {
          Aak.warn("Sorry! No Web Storage support.");
          return null;
        }
      } catch (e) {
        return null;
      }
    },
    setCookie : function (name, value, time, path) {
      var expires = new Date();
      expires.setTime(new Date().getTime() + (time || 365 * 24 * 60 * 60 * 1000));
      document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + expires.toGMTString() + ";path=" + (path || '/');
    },
    getCookie : function (name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length == 2)
        return parts.pop().split(";").shift();
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
        if (window.confirm("Do you want to report issue or anti-adblock ?")) { // Clic on OK
          Aak.go(Aak.reportURL);
        } else {
          Aak.go(elem.href);
        }
      };
    },
    unpackScript : function (source) {
      // deobfuscate: pac+ked, pac+ker, mun+ged, wi+se
      // note: "Exception 403008" concatenating strings for bypass greasefork malware filter
      var substring = source.substring(source.indexOf('eval(')+4, source.lastIndexOf(')')+1);
      return new Function('return '+substring)();
    },
    hasScript : function (contains, doc) {
      // by: Watilin
      return Array.prototype.filter.call(
        doc && doc.scripts || document.scripts,
        function ($script) {
        var source = $script.innerHTML;
        return source && source.indexOf(contains) != -1;
      })[0];
    },
    addScript : function (source, body) {
      var script = document.createElement('script');
      script.type = "text/javascript";
      script.innerHTML = (typeof source === 'function') ? Aak.intoString(source) : source.toString();
      if (body) {
        document.body.appendChild(script);
      } else {
        document.head.appendChild(script);
      }
      script.remove();
    },
    loadScript : function (src, body, onload) {
      var script = document.createElement('script');
      script.type = "text/javascript";
      script.src = src;
      if (onload) {
        script.onload = onload;
      }
      if (body) {
        document.body.appendChild(script);
      } else {
        document.head.appendChild(script);
      }
    },
    importScript : function (url, callback) {
      Aak.request({
        url : url,
        onload : function (result) {
          var rawScript = result.responseText;
          (new Function('Aak', rawScript + '\n\r' + Aak.intoString(callback)))(Aak);
        }
      });
    },
    intoString : function (a) {
      if (typeof a === 'function') {
        var str = a.toString();
        var first = str.indexOf("{") + 1;
        var last = str.lastIndexOf("}");
        return str.substr(first, last - first).trim();
      } else if (typeof entry === 'object') {
        return JSON.stringify(a);
      } else { // array or string
        return a.toString();
      }
    },
    intoArray : function (a) {
      if (typeof a === 'object') {
        return Object.keys(a).map(function (key) {
          return a[key];
        });
      } else if (typeof a === 'string') {
        return JSON.parse(a);
      } else if (Array.isArray(a)) {
        return a;
      }
    },
    intoObject : function (a) {
      if (typeof a === 'string') {
        return JSON.parse(a);
      } else if (Array.isArray(a)) {
        for (var i = 0, o = {}; i < a.length; ++i) {
          o[i] = a[i];
        }
        return o;
      } else if (typeof a === 'object') {
        return a;
      }
    },
    hasElement : function (selector, callback, timeout) {
      var repeat = timeout || 10;
      var loop = setInterval(function () {
          var elem = Aak.getElement(selector);
          if (elem) {
            callback(elem);
            clearInterval(loop);
          }
          repeat = (repeat) ? repeat - 1 : clearInterval(loop);
        }, 1e3);
    },
    removeElement : function (elem) {
      if (elem instanceof window.HTMLElement) {
        elem.remove();
      } else if (typeof elem === "string") {
        elem = document.querySelectorAll(elem);
        for (var i = 0; i < elem.length; i++) {
          elem[i].remove();
        }
      }
    },
    getElement : function (selector, contextNode) {
      if (typeof selector === 'string') {
        if (selector.indexOf('/') === 0) { // ex: //img[@class="photo"]
          return document.evaluate(selector, contextNode || document, null, window.XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        }
        return (contextNode || document).querySelector(selector);
      } else if (selector instanceof window.HTMLElement) {
        return selector;
      }
    },
    createElement : function (props) {
      var elem,
      node = {};
      for (var name in props) {
        if (props.hasOwnProperty(name)) {
          switch (name) {
          case "tag":
            node = document.createElement(props[name]);
            break;
          case "text":
            var text = ('innerText' in document) ? 'innerText' : 'textContent';
            node[text] = props[name];
            break;
          case "html":
            node.innerHTML = props[name];
            break;
          case "classid":
            node.className = props[name];
            break;
          case "append":
            elem = Aak.getElement(props[name]);
            elem.appendChild(node);
            break;
          case "prepend":
            elem = Aak.getElement(props[name]);
            if (elem.childNodes.length) {
              elem.insertBefore(node, elem.childNodes[0]);
            } else {
              elem.appendChild(node);
            }
            break;
          case "before":
            elem = Aak.getElement(props[name]);
            elem.parentNode.insertBefore(node, elem);
            break;
          case "after":
            elem = Aak.getElement(props[name]);
            elem.parentNode.insertBefore(node, elem.nextSibling);
            break;
          case "replace":
            elem = Aak.getElement(props[name]);
            elem.parentNode.replaceChild(node, elem);
            break;
          case "event":
            for (var evName in props.event) {
              if (props.event.hasOwnProperty(evName))
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
          if (props.hasOwnProperty(name)) {
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
      }
    },
    addStyle : function (css) {
      css = css.replace(/;/g, ' !important;');
      if (typeof GM_addStyle != 'undefined') {
        GM_addStyle(css);
      } else {
        document.head.appendChild(document.createElement('style')).innerHTML = css;
      }
    },
    loadStyle : function (src) {
      var style = document.createElement('link');
      style.rel = "stylesheet";
      style.href = src;
      document.head.appendChild(style);
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
    serialize : function (obj) {
      if (typeof obj == 'object') {
        var arr = [];
        for (var prop in obj) {
          if (obj.hasOwnProperty(prop))
            arr.push(prop + '=' + Aak.encodeURI(obj[prop]));
        }
        return arr.join('&');
      }
      return obj;
    },
    unserialize : function (str) {
      str = Aak.decodeHTML(str);
      var arr = str.split('&');
      var obj = {};
      arr.forEach(function (entry) {
        if (entry !== '' && entry.split('=')) {
          var splits = entry.split('=');
          obj[splits[0]] = Aak.decodeURI(splits[1]);
        }
      });
      return obj;
    },
    unsetProperties : function (obj, props) {
      props = (typeof props == 'string') ? props.split(',') : props;
      for (var i = 0; i < props.length; i++) {
        var prop = props[i];
        if (obj.hasOwnProperty(prop)) {
          delete obj[prop];
        }
      }
      return obj;
    },
    setProperties : function (obj1, obj2) {
      for (var prop in obj2) {
        if (obj2.hasOwnProperty(prop))
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
      Aak.addScript(Aak.intoString(function () {

          var CLASSNAME = function () {
            var self = this;
            var callNotDetected = false;
            this.debug = {
              set : function () {
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
              console.info(['AntiAdbKiller', location.host, 'FuckAdBlock']);
              return this;
            };
            this.setOption = function () {
              return this;
            };
            this.options = {
              set : function () {
                return this;
              },
              get : function () {
                return this;
              }
            };
            this.check = function () {
              if (callNotDetected)
                callNotDetected();
            };
            this.emitEvent = function () {
              return this;
            };
            this.clearEvent = function () {};
          };

          Object.defineProperties(window, {
            CLASSNAME : {
              value : CLASSNAME,
              writable : false
            }
          });

          Object.defineProperties(window, {
            INSTANCENAME : {
              value : new CLASSNAME(),
              writable : false
            }
          });

        }).replace(/INSTANCENAME/g, instanceName || 'fuckAdBlock')
        .replace(/CLASSNAME/g, className || 'FuckAdBlock'));

    }, // Events
    onEvent : function (element, type, listener, bubbles) {
      if (window.addEventListener) { // For all major browsers, except IE 8 and earlier
        (element || window).addEventListener(type, listener, bubbles || false);
      } else { // For IE 8 and earlier versions
        (element || window).attachEvent('on' + type, listener);
      }
      return arguments;
    },
    offEvent : function (element, type, listener, bubbles) {
      if (window.removeEventListener) { // For all major browsers, except IE 8 and earlier
        (element || window).removeEventListener(type, listener, bubbles || false);
      } else { // For IE 8 and earlier versions
        (element || window).detachEvent('on' + type, listener);
      }
    },
    emitEvent : function (element, type, detail, bubbles, cancelable) {
      var event;
      if (window.CustomEvent) {
        event = new window.CustomEvent(type, {
            "detail" : detail || undefined
          }, bubbles || false, cancelable || false);
      } else {
        event = document.createEvent('CustomEvent');
        event.initCustomEvent('on' + type, bubbles || false, cancelable || false, {
          "detail" : detail || undefined
        });
      }
      (element || window).dispatchEvent(event);
    },
    detected : function (name) {
      if (Aak.opts.debug && Aak.opts.logDetected) {
        Aak.emitEvent(window, 'detected', name);
      }
    },
    ready : function (callback) {
      Aak.onEvent(window, 'load', callback);
    },
    player : function () {

      var Player = function () {
        this.target = {};
        this.player = {};
        this.name = null;
        this.version = null;
        this.library = null;
        this.fallback = 'vlc';
        this.autoplay = Aak.opts.autoPlay;
        this.args = null;
        this.setup = {};
        this.options = {
          build : 'embed',
          insert : 'replace',
          crossSetup : true
        };
        this.attributes = { // flash
          wmode : 'opaque',
          quality : 'high',
          bgcolor : '#000000',
          type : 'application/x-shockwave-flash',
          pluginspage : 'http://www.adobe.com/go/getflash',
          allowscriptaccess : 'always', // never / always
          allowfullscreen : true
        };
      };

      Player.prototype = { // http://tinyurl.com/pb6fthj
        getTargetNode : function (element) {

          this.target.node = Aak.getElement(element);
          this.target.html = this.target.node.outerHTML;
          this.target.parent = this.target.node.parentNode;
          this.target.tag = this.target.node.tagName;

          this.attributes.id = this.attributes.name = Aak.generateID();
          this.attributes.height = this.target.node.height || this.target.node.clientHeight || '480px';
          this.attributes.width = this.target.node.width || this.target.node.clientWidth || '640px';
        },
        getMimeType : function (type) {
          // doc: http://tinyurl.com/jrs8fgz
          switch (type.toLowerCase()) {
          case 'mp4':
            return 'video/mp4';
          case 'webm':
            return 'video/webm';
          case 'ogg':
          case 'ogv':
            return 'video/ogg';
          case 'flv':
            return 'video/x-flv';
          case 'hls':
            return 'application/x-mpegURL';
          case 'hds':
            return 'application/f4m+xml';
          default:
            return type;
          }
        },
        building : function (tagName) {
          var self = this;

          if (Aak.opts.forceVLC && this.name !== 'vlc') {
            Aak.info('force playing with VLC');
            return this.vlc.apply(this, this.args);
          }

          switch (tagName) {
          case 'iframe':
            this.player.node = document.createElement('iframe');
            this.player.node.setAttribute('src', this.attributes.src || location.protocol + '//' + location.host + '/');
            if (this.attributes.srcdoc) {
              if (this.player.node.hasAttribute("srcdoc") || 'srcdoc' in this.player.node) {
                this.player.node.setAttribute('srcdoc', this.attributes.srcdoc);
              } else {
                // does not work correctly with flowplayer
                this.player.node.setAttribute('src', "data:text/html;charset=utf-8," + encodeURIComponent(this.attributes.srcdoc));
              }
            }
            this.player.node.setAttribute('width', this.setup.width);
            this.player.node.setAttribute('height', this.setup.height);
            this.player.node.setAttribute('style', 'height:' + this.setup.height + 'px; width:' + this.setup.width + 'px;');
            this.player.node.setAttribute('frameborder', 0);
            this.player.node.setAttribute('scrolling', 'no');
            this.player.node.setAttribute('allowfullscreen', true); // http://tinyurl.com/oyyehab
            // allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen
            break;
          case 'video':
            var attrName;
            this.player.node = document.createElement('video');
            for (attrName in this.attributes) {
              if (this.attributes.hasOwnProperty(attrName))
                this.player.node.setAttribute(attrName, this.attributes[attrName]);
            }

            if (this.attributes.autoplay) { // fix bug duplicate playing on firefox/chrome
              this.player.node.onloadstart = function () {
                //this.play();
              };
            }

            this.player.node.onerror = function () { // switch to plugin player
              setTimeout(function () {
                self.args[0] = self.player.node;
                self.vlcplayer.apply(self, self.args);
              }, 5000);
            };
            break;
          default: // embed
            this.player.node = document.createElement('embed');
            for (attrName in this.attributes) {
              if (this.attributes.hasOwnProperty(attrName))
                this.player.node.setAttribute(attrName, this.attributes[attrName]);
            }
          }
          this.player.html = this.player.node.outerHTML;
          this.player.tag = this.player.node.tagName;
          this.inserting();
        },
        inserting : function () {
          switch (this.options.insert) {
          case 'inner':
            this.target.node.innerHTML = this.player.html;
            break;
          case 'append':
            this.target.parent.replaceChild(this.player.node);
            break;
          default: // replace
            this.target.parent.replaceChild(this.player.node, this.target.node);
          }
          if (Aak.opts.logPlayer) {
            Aak.log('player', this);
          }
          return this;
        },
        editing : function (elem, opts) { // review
          Aak.hasElement(elem, function (thisElement) {
            var obj,
            swf,
            value,
            parts,
            param,
            attributes,
            attrName;
            var so = thisElement;
            var clone = so.cloneNode(true);

            // set attriibutes
            if (opts.setAttribute) {
              attributes = opts.setAttribute;
              for (attrName in attributes) {
                if (clone.querySelector('param[name="' + attrName + '"]')) {
                  clone.querySelector('param[name="' + attrName + '"]').value = attributes[attrName];
                } else if (clone.getAttribute(attrName)) {
                  clone.setAttribute(attrName, attributes[attrName]);
                }
              }
            }

            // unset attributes
            if (opts.unsetAttributes) {
              attributes = opts.delAttributes;
              for (attrName in attributes) {
                if (clone.querySelector('param[name="' + attrName + '"]')) {
                  Aak.removeElement(clone.querySelector('param[name="' + attrName + '"]'));
                } else if (clone.getAttribute(attrName)) {
                  delete attributes[attrName];
                }
              }
            }

            if (opts.setFlashvars || opts.unsetFlashvars) {
              if (clone.querySelector('param[name="flashvars"]')) {
                param = clone.querySelector('param[name="flashvars"]');
                value = param.value;
              } else if (clone.getAttribute('flashvars')) {
                value = clone.getAttribute('flashvars');
              } else if (clone.getAttribute('data') && clone.getAttribute('data').indexOf('?') >= 0) {
                parts = clone.getAttribute('data').split('?', 2);
                swf = parts.shift();
                value = parts.shift();
              }

              obj = Aak.unserialize(value);
              if (opts.setFlashvars) {
                obj = Aak.setProperties(obj, opts.setFlashvars);
              }
              if (opts.unsetFlashvars) {
                obj = Aak.unsetProperties(obj, opts.unsetFlashvars);
              }
              value = Aak.serialize(obj);

              if (param) {
                param.value = value;
              } else if (swf) {
                clone.setAttribute('data', swf + '?' + value);
              } else {
                clone.setAttribute('flashvars', value);
              }
            }
            // replace
            Aak.log(so, clone, obj);
            Aak.replaceElement(so, clone);
          });
        },
        embedding : function (id, setup, attributes, options) { 
        
          this.getTargetNode(id);
          this.args = arguments;
          this.attributes = Aak.setProperties(this.attributes, attributes || {});
          this.options = Aak.setProperties(this.options, options || {});

          this.attributes.src = setup.swf;
          this.attributes.id = this.attributes.name = Aak.generateID();
          this.attributes.height = setup.height || this.attributes.height;
          this.attributes.width = setup.width || this.attributes.width;
          this.attributes.flashvars = Aak.serialize(setup);
          this.attributes = Aak.unsetProperties(this.attributes, 'swf');

          this.building('embed');
        },
        jwplayer : function (id, setup, attributes, options) {
          // JwPlayer 7 (flash/html5)
          // note: problem with ssl
          // setup: http://tinyurl.com/hhrgjap, http://tinyurl.com/gqs46tm
          // api: https://developer.jwplayer.com/jw-player/docs/developer-guide/api/javascript_api_reference/
          // hls: http://tinyurl.com/pxl9scq
          // hls-tester: http://demo.jwplayer.com/stream-tester/
          // rtmp-demo: https://www.scaleengine.com/jw6
          // iframe: http://tinyurl.com/86agg68

          this.getTargetNode(id);
          this.args = arguments;
          this.attributes = Aak.setProperties(this.attributes, attributes || {});
          this.options = Aak.setProperties(this.options, options || {});

          this.setup = setup;
          if (this.options.crossSetup === true) {
            this.setup = {
              controls : true,
              file : setup.source,
              abouttext : Aak.name,
              aboutlink : Aak.homeURL,
              width : setup.width || this.attributes.width,
              height : setup.height || this.attributes.height,
              autostart : setup.autoplay || this.autoplay,
              primary : 'html5',
              preload : 'auto',
              skin : { // Seven | Six | Five | Glow | Beelden | Vapor | Bekle | Roundster | Stormtrooper
                name : setup.skin || "six" // default skin JWP6
              }
            };
            if (['mp4', 'webm', 'ogg', 'ogv'].indexOf(setup.type) === -1) {
              this.setup.primary = 'flash';
            }
            if (setup.type === 'hls') {
              this.setup.hlshtml = true;
            }
          }

          this.attributes.srcdoc = '<html><head><style type="text/css">@font-face{font-family:jw-icons;src:url(' + location.protocol + 'ssl.p.jwpcdn.com/player/v/7.4.3/jw-icons.woff) format("woff"),url(' + location.protocol + '//ssl.p.jwpcdn.com/player/v/7.4.3/jw-icons.ttf) format("truetype");font-weight:400;font-style:normal}</style><script src="' + location.protocol + '//content.jwplatform.com/libraries/V6NfEzT7.js"></script><style type="text/css">html, body{padding:0; margin:0;}</style></head><body><div id="jw-movie"></div><script>jwplayer("jw-movie").setup(' + JSON.stringify(this.setup) + ');</script></body></html>';

          this.building('iframe');
        },
        videojs : function (id, setup, attributes, options) { 
          // VideoJs 5 (flash/html5)
          // setup: http://tinyurl.com/pcgx2ob
          // playback: http://tinyurl.com/nscztmm
          // demo: http://jsfiddle.net/N8Zs5/18/
          // plugins: https://github.com/videojs/video.js/wiki/Plugins

          this.getTargetNode(id);
          this.args = arguments;
          this.attributes = Aak.setProperties(this.attributes, attributes || {});
          this.options = Aak.setProperties(this.options, options || {});

          this.setup = setup;
          if (this.options.crossSetup === true) {
            this.setup = {
              controls : true,
              preload : 'auto',
              width : setup.width || this.attributes.width,
              height : setup.height || this.attributes.height,
              techOrder : ["html5", "flash"],
              autoplay : setup.autoplay || this.autoplay,
              sources : [{
                  type : this.getMimeType(setup.type),
                  src : setup.source
                }
              ]
            };
            /* don't work 
            if (setup.type === 'hls') {
              techOrder : ["flash", "html5"],
              this.setup.flash = {
                //swf : "//reeksite.com/public/swf/videojs-flashls.swf"
                swf : 'http://www.flashls.org/videojs/video-js.swf'
              };
            }
            */
          }

          // 
          this.attributes.srcdoc = '<html><head><link href="' + location.protocol + '//cdnjs.cloudflare.com/ajax/libs/video.js/5.10.5/alt/video-js-cdn.min.css" rel="stylesheet"><script src="' + location.protocol + '//cdnjs.cloudflare.com/ajax/libs/video.js/5.10.5/video.min.js"></script><script src="' + location.protocol + '//cdnjs.cloudflare.com/ajax/libs/videojs-contrib-hls/3.1.0/videojs-contrib-hls.min.js"></script><style type="text/css">html, body{padding:0; margin:0;}.vjs-default-skin{color:#eee}.vjs-default-skin .vjs-play-progress,.vjs-default-skin .vjs-volume-level{background-color:#eee}.vjs-default-skin .vjs-big-play-button,.vjs-default-skin .vjs-control-bar{background:rgba(0,0,0,.2)}.vjs-default-skin .vjs-slider{background:rgba(0,0,0,.3)}</style></head><body><video id="vjs-movie" class="video-js vjs-default-skin vjs-big-play-centered"></video><script>videojs("vjs-movie", ' + JSON.stringify(this.setup) + ')</script></body></html>';

          this.building('iframe');
        },
        flowplayer : function (id, setup, attributes, options) {
          // FlowPlayer 6 (flash)
          // note: problem with flashplayer
          // support: mp4, flv, f4v, m4v, mov
          // setup: https://flowplayer.org/docs/setup.html
          // api: https://flowplayer.org/docs/api.html
          // demo: http://demos.flowplayer.org/basics/js-setup-autoplay.html
          // hds: https://flowplayer.electroteque.org/httpstreaming-hds/fp6
          // hls: http://demos.flowplayer.org/api/hlsjs.html
          // flv: http://demos.flowplayer.org/basics/flv.html

          this.getTargetNode(id);
          this.args = arguments;
          this.attributes = Aak.setProperties(this.attributes, attributes || {});
          this.options = Aak.setProperties(this.options, options || {});

          this.setup = setup;
          if (this.options.crossSetup === true) {
            this.setup = {
              width : setup.width || this.attributes.width,
              height : setup.height || this.attributes.height,
              autoplay : setup.autoplay || this.autoplay,
              preload : 'auto'
            };
            if (setup.type === 'hls') {
              this.setup.swf = location.protocol + '//releases.flowplayer.org/6.0.5/flowplayerhls.swf';
              this.setup.engine = 'hlsjs';
            } else if (['mp4', 'webm', 'ogg', 'ogv'].indexOf(setup.type) === -1) {
              this.setup.swf = location.protocol + '//releases.flowplayer.org/6.0.5/flowplayer.swf';
              this.setup.engine = 'flash';
              this.setup.type = 'video/flash';
            }
            this.setup.clip = {
              sources : [{
                  type : this.getMimeType(this.setup.type || setup.type),
                  src : setup.source
                }
              ]
            };
          }

          this.attributes.srcdoc = '<html><head><link rel="stylesheet" href="' + location.protocol + '//releases.flowplayer.org/6.0.5/skin/functional.css"></script><script src="' + location.protocol + '//code.jquery.com/jquery-1.11.2.min.js"></script><script src="' + location.protocol + '//releases.flowplayer.org/6.0.5/flowplayer.min.js"></script><style type="text/css">html, body{padding:0; margin:0;}</style></head><body><div id="fp-movie"></div><script>flowplayer("#fp-movie", ' + JSON.stringify(this.setup) + ');</script></body></html>';

          this.building('iframe');
        },
        grindplayer : function (id, setup, attributes, options) {
          // GrindPlayer 1 (flash)
          // setup: http://osmfhls.kutu.ru/docs/grind/
          // support: hls, rtmp

          this.getTargetNode(id);
          this.args = arguments;
          this.attributes = Aak.setProperties(this.attributes, attributes || {});
          this.options = Aak.setProperties(this.options, options || {});

          this.setup = setup;
          if (this.options.crossSetup === true) {
            this.setup = {
              src : setup.source,
              streamType : "live",
              scaleMode : "letterbox",
              autoPlay : setup.autoplay || this.autoplay
            };
            if (setup.type === 'hls') {
              this.setup.plugin_hls = "//reeksite.com/public/swf/flashlsOSMF.swf";
            }
            if (setup.proxy === true) {
              this.setup.src = '//www.dianshibo.com/fetch.php/' + setup.source.substring(setup.source.indexOf('//') + 2);
            }
          }

          this.attributes.src = setup.swf || this.attributes.src || "//reeksite.com/public/swf/GrindPlayer.swf";
          this.attributes.height = setup.height || this.attributes.height;
          this.attributes.width = setup.width || this.attributes.width;
          this.attributes.flashvars = Aak.serialize(this.setup);

          this.building('embed');
        },
        vlc : function (id, setup, attributes, options) {
          // VLC Web Plugin (plugin)
          // doc: http://tinyurl.com/omlzp39
          // plugins: about:plugins
          // chrome://flags/#enable-npapi
          // https://www.chromium.org/developers/npapi-deprecation
          // In September 2015 (Chrome 45) we will remove the override and NPAPI support will be permanently removed from Chrome. Installed extensions that require NPAPI plugins will no longer be able to load those plugins.

          this.name = 'vlc';
          this.getTargetNode(id);
          this.args = arguments;
          this.attributes = Aak.setProperties(this.attributes, attributes || {});
          this.options = Aak.setProperties(this.options, options || {});

          this.setup = setup;
          if (this.options.crossSetup === true) {
            this.attributes.src = setup.source;
            this.attributes.height = setup.height || this.attributes.height;
            this.attributes.width = setup.width || this.attributes.width;
            this.attributes.controls = true;
            if (setup.autoplay || this.autoplay) {
              this.attributes.autoplay = true;
            }
          }

          this.attributes.type = "application/x-vlc-plugin";
          this.attributes.pluginspage = "http://www.videolan.org";
          this.building('embed');
        },
        html5 : function (id, setup, attributes, options) { 
          // Video Tag (html5)
          // basics: https://html5rocks.com/en/tutorials/video/basics/
          // tag: http://www.w3schools.com/tags/tag_video.asp
          // support: mp4, webm, ogg
          // test: http://www.quirksmode.org/html5/tests/video.html

          this.options = Aak.setProperties(this.options, options || {});

          this.getTargetNode(id);
          this.args = arguments;
          this.attributes = Aak.setProperties({}, setup || {});
          this.attributes.src = setup.source;
          this.attributes.id = this.attributes.name = Aak.generateID();
          this.attributes.height = this.attributes.height || this.target.node.clientHeight || "100%";
          this.attributes.width = this.attributes.width || this.target.node.clientWidth || "100%";
          this.attributes.type = this.getMimeType(this.attributes.type);
          this.attributes.controls = 'controls';
          this.attributes.preload = 'none';
          if (this.attributes.autoplay || this.autoplay) {
            this.attributes.autoplay = 'autoplay';
          }
          this.attributes.style = 'display: block; margin:0 auto;';
          this.attributes = Aak.unsetProperties(this.attributes, 'source');

          this.building('video');
        }
      };
      
      return new Player();
    },
    rules : {
      // --------------------------------------------------------------------------------------------
      // Anti-Adblock Killer
      // --------------------------------------------------------------------------------------------
      settings : {
        host : ['localhost', 'reek.github.io', 'reeksite.com'],
        onEnd : function () {

          if (/\/anti-adblock-killer(-pages)?\/$/.test(location.pathname)) {
            var settingsBox = Aak.getElement('#aak-settings-box');
            var settingsNotice = Aak.getElement('#aak-settings-notice');

            if (!Aak.useGM) {
              settingsNotice.querySelector('div').innerHTML = 'In native mode, you must edit the options manually: <a href="' + Aak.nativeURL + '">See</a>';
            } else if (settingsBox && settingsNotice) {
              settingsNotice.style.display = 'none';
              settingsBox.style.display = 'block';
              Aak.info('GM storage:', Aak.getValue());
              Aak.info('GM options:', Aak.opts);
              Aak.info('GM api:', Aak.useGM && Aak.apiGM());

              // user config
              Aak.createElement({
                tag : 'div',
                html : 'Version: ' + Aak.getVersion() + ' <br>AakScript: true <br>AakList: ' + (!Aak.getElement('#k2Uw7isHrMm5JXP1Vwdxc567ZKc1aZ4I')) + ' <br>Browser: ' + Aak.getBrowser() + ' <br>ScriptManager: ' + Aak.getScriptManager(),
                append : '#aak-settings-config'
              });

              // create options 
              for (var optName in Aak.options) {
                if (Aak.options.hasOwnProperty(optName)) {
                  var opt = Aak.options[optName];
                  var checked = Aak.opts[optName] === true ? "checked" : '';
                  Aak.createElement({
                    tag : 'div',
                    html : '<input id="' + optName + '" class="css-checkbox" ' + checked + ' type="' + opt.type + '"/><label for="' + optName + '" title="' + opt.info + '" class="css-label">' + opt.label + '</label>',
                    append : '#aak-settings-' + opt.group
                  });
                }
              }

              // save options 
              Aak.onEvent(Aak.getElement("#aak-settings-save"), "click", function () {
                var elems = document.querySelectorAll('.css-checkbox');
                for (var i = 0; i < elems.length; i++) {
                  var elem = elems[i];
                  if (elem.checked) {
                    Aak.setValue(elem.id, true);
                  } else {
                    Aak.setValue(elem.id, false);
                  }
                }
                window.alert('Saved !');
              });

              // Clear GM storage
              Aak.addCommands({
                caption : 'Clear GM storage',
                execute : function () {
                  Aak.deleteValue();
                  window.alert('Cleared !');
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
          if (Aak.isTopframe) { // fix rediretion loop
            var blog = location.host.replace('www.', '').split(".");
            if (blog[blog.length - 1] != "com") {
              var path = location.href.split("/").slice(3).join('/');
              Aak.go("http://" + blog[0] + ".blogspot.com/ncr/" + path);
            }
          }
        }
      },
      blogspot_knowlet3389 : {
        // note: also added abp rule
        // issue: https://github.com/reek/anti-adblock-killer/issues/83
        // source: http://pastebin.com/A3mCXQ5i
        host : ['knowlet3389.blogspot.'],
        onStart : function () {
          Aak.setLocal('noad', false);
          Aak.addStyle("#gAds { height: 17px; } #gAd2 { height: 17px; }");
        }
      },
      uptobox_uptostream : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/351
        host : ['uptobox.com', 'uptostream.com'],
        onStart : function () {
          // Old solution [deprecated]
          var id = location.pathname.match(/[0-9a-z]{12}/);
          if (id !== null) {
            Aak.addStyle("#" + id[0] + " { height: 12px; }");
          }
          // New 12.05.2014
          // + abp rule (alternative solution)
          Aak.addStyle("#adblocktrap { height: 12px; }");
        },
        onIdle : function () {
          // remove ads
          Aak.removeElement('*[src^="http://ads.uptobox.com/"],*[href^="http://ads.uptobox.com/"]');
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
      freegameserverhost_com : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1512
        host : ['freegameserverhost.com'],
        onStart : function () {
          Aak.addStyle("#fab13 { height: 11px; }");
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
      height_myTestAd : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1241
        // issue: https://github.com/reek/anti-adblock-killer/issues/983
        // issue: https://github.com/reek/anti-adblock-killer/issues/291
        host : ['bknime.com', 'go4up.com', 'debrido.com'],
        onStart : function () {
          Aak.addStyle(".myTestAd { height: 1px; }");
        }
      },
      debridfast_network : {
        // issue: https://greasyfork.org/en/forum/discussion/9406
        // issue: https://greasyfork.org/en/forum/discussion/7013
        // issue: https://github.com/reek/anti-adblock-killer/issues/1272
        // issue: https://github.com/reek/anti-adblock-killer/issues/769
        host : ['debridfast.com', 'getdebrid.com', 'debrid.us', 'leecher.us'],
        onStart : function () {
          Aak.addStyle(".myTestAd, .my24Ad, .nabil { height: 1px; }");
        },
        onIdle : function () {
          document.querySelector('#simpleAd').innerHTML = '<p style="display:none;">debridfast.com</p>';
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
        }
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
      thomas_n_ruth_com : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1111
        // source: http://pastebin.com/fu7vkUA1
        host : ['thomas-n-ruth.com'],
        onStart : function () {
          Aak.addStyle(".Google { height: 5px; }");
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
      mangamint_com : {
        // note: added rule to allow ".ad728"
        // issue: https://greasyfork.org/id/forum/discussion/8524
        host : ['mangamint.com'],
        onStart : function () {
          Aak.addStyle(".ad728 { height: 31px; }");
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
        // source: http://pastebin.com/b7MAYXs4
        host : ['simply-debrid.com'],
        onStart : function () {
          Aak.uw.adsbygoogle = {};
          Aak.uw.adsbygoogle.loaded = true;
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
      kodilive_eu : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1528
        // source: http://pastebin.com/ZxvXKqtc
        host : ['kodilive.eu'],
        onStart : function () {
          Aak.addStyle(".Ad { height: 5px; }");
        }
      },
      backin_net : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1383
        // issue: https://github.com/reek/anti-adblock-killer/issues/1061
        host : ['backin.net'],
        onStart : function () {
          Aak.addStyle("#divxg { height: 8px; }");
        }
      },
      mobile_tracker_free_com : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1082
        host : ['mobile-tracker-free.com'],
        onStart : function () {
          Aak.addStyle("#myAds { height: 1px; }");
        }
      },
      workupload_com : {
        // note: obfuscated
        // issue: https://github.com/reek/anti-adblock-killer/issues/1334
        // issue: https://github.com/reek/anti-adblock-killer/issues/1290
        // source: http://pastebin.com/CPzd2Swx
        host : ['workupload.com'],
        onAlways : function () {
          Aak.addStyle(".adBlock, .adsbygoogle, #sad { height: 11px; }");
        }
      },
      jc_mp_com : {
        // by: Giwayume
        // issue: https://github.com/reek/anti-adblock-killer/issues/1597
        host : ["jc-mp.com"],
        onStart : function() {
          Aak.addStyle('.adsense {width: 1px; height: 1px; visibility: hidden; display: block; position: absolute;}');
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
      voici_fr : {
        // issue: https://greasyfork.org/fr/forum/discussion/10093
        // issue: https://github.com/reek/anti-adblock-killer/issues/826
        // source: http://pastebin.com/zEVQHTiD
        host : ['voici.fr', 'programme-tv.net'],
        onStart : function () {
          Aak.addBaitElement('div#sas_script2');
        }
      },
      mil_ink : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1652
        // source: http://pastebin.com/474NZzPJ
        host : ['mil.ink'],
        onStart : function () {
          Aak.addBaitElement('div#ads_div');
        }
      },
      prem_link : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1152
        // issue: https://github.com/reek/anti-adblock-killer/issues/918
        // issue: https://github.com/reek/anti-adblock-killer/issues/794
        // issue: https://github.com/reek/anti-adblock-killer/issues/692
        // issue: https://github.com/reek/anti-adblock-killer/issues/572
        // issue: https://github.com/reek/anti-adblock-killer/issues/541
        // source: http://pastebin.com/u1nFxJbq
        host : ['prem.link'],
        onIdle : function () {
          Aak.createElement({
            tag : 'a',
            href : 'http://www.liveadexchanger.com',
            append : '#img_new'
          });
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
      _3dsthem_es : {
        // issue: https://github.com/reek/anti-adblock-killer/issues?q=3dsthem
        host : ['3dsthem.es'],
        onStart : function () {
          //Aak.addScript(function () {});
        },
        onBeforeScript : function () {
        /*
          return [{
              contains : 'main.js',
              external : true,
              override : '//pastebin.com/raw/2yGRPhRZ'
            }
          ];
        */
        }
      },
      _8muses_com : {
        // issue: https://github.com/reek/anti-adblock-killer/issues?q=8muses
        // issue: https://greasyfork.org/forum/discussion/8515
        // issue: https://greasyfork.org/en/forum/discussion/6407
        // source: http://pastebin.com/bMNDxecs
        host : ['8muses.com'],
        onStart : function () {
          Aak.addScript(function () {
            var _setTimeout = window.setTimeout;
            window.setTimeout = function (fn, delay) {
              if (fn.toString().indexOf("$(window).trigger('adblock');") > -1) {
                fn = function () {
                  console.info(['AntiAdbKiller', location.host, 'Anti-AdBlock intercepted :-)']);
                };
              }
              _setTimeout.call(this, fn, delay);
            };
          });
        }
      },
      thechive_com : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1453
        // source: http://pastebin.com/TdpPyrbb
        host : ['thechive.com'],
        onStart : function () {
          Aak.addScript(function () {
            Object.defineProperties(window, {
              stephaneDetector : {
                value : {
                  hook : function (cb) {
                    cb(false);
                  },
                  init : function () {},
                  broadcastResult : function () {}
                },
                writable : false
              }
            });
          });
        }
      },
      richonrails_com : {
        // by: Giwayume
        // issue: https://github.com/reek/anti-adblock-killer/issues/1447
        // source: http://pastebin.com/Ewfwg8BG
        host : ['richonrails.com'],
        onIdle : function () {
          Aak.addScript(function () {
            var adsByGoogleHtml = '"<ins+id="aswift_0_expand"+style="display:inline-table;border:none;height:90px;margin:0;padding:0;position:relative;visibility:visible;width:750px;background-color:transparent"><ins+id="aswift_0_anchor"+style="display:block;border:none;height:90px;margin:0;padding:0;position:relative;visibility:visible;width:750px;background-color:transparent"><iframe+marginwidth="0"+marginheight="0"+vspace="0"+hspace="0"+allowtransparency="true"+scrolling="no"+allowfullscreen="true"+onload="var+i=this.id,s=window.google_iframe_oncopy,H=s&amp;&amp;s.handlers,h=H&amp;&amp;H[i],w=this.contentWindow,d;try{d=w.document}catch(e){}if(h&amp;&amp;d&amp;&amp;(!d.body||!d.body.firstChild)){if(h.call){setTimeout(h,0)}else+if(h.match){try{h=s.upd(h,i)}catch(e){}w.location.replace(h)}}"+id="aswift_0"+name="aswift_0"+style="left:0;position:absolute;top:0;"+width="750"+frameborder="0"+height="90"></iframe></ins></ins>"';
            $.ajax({
              url : $(".article-content").data("url"),
              dataType : "script",
              method : "post",
              data : {
                html : adsByGoogleHtml
              },
              success : function (result) {
                var exec = result.replace("$('.article-content')", "$('.article-content-2')");
                new Function(exec)();
              }
            });
            $(".article-content").after('<div class="article-content-2"></div>').remove();
          });
        }
      },
      rmprepusb_com : {
        host : ['rmprepusb.com'],
        onStart : function () {
          Aak.setCookie('jot_viewer', 3);
        }
      },
      neodrive_co : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1001
        host : ['neodrive.co'],
        onAlways : function () {
          // Prevent popunder
          Aak.setCookie('KifPopCnt', 1, null, '/embed/');
        }
      },
      hentaihaven_org : {
        // issue: https://github.com/gorhill/uBlock/issues/1340
        host : ['hentaihaven.org'],
        onAlways : function () {
          // Prevent popunder
          Aak.setCookie('hh_ppndr1', 1);
          Aak.setCookie('hh_ppndr2', 1);
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
          Aak.addStyle("#test { height: 250px; }");
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
      superanimes_com : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1295
        // source: http://pastebin.com/FDPAKjTQ
        host : ['superanimes.com'],
        onStart : function () {
          Aak.addBaitElement('div#bannerLoja');
        }
      },
      forum_pac_rom_com : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/243
        host : ['forum.pac-rom.com'],
        onStart : function () {
          Aak.addBaitElement('div.banner_ads');
        }
      },
      litv_tv : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1299
        // source: http://pastebin.com/zcddvTuC
        host : ['litv.tv'],
        onStart : function () {
          Aak.addBaitElement('div.player_mask');
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
        }
      },
      disableAlertbox : {
        // issue: https://greasyfork.org/en/forum/discussion/8611
        host : ['drivearabia.com', 'putlocker.com', 'doatoolsita.altervista.org', 'sockshare.com', 'free-movie-home.com', 'pc.online143.com', 'kooora.com', 'str3amtv.co.nr', 'str3amtv.altervista.org', 'str3am.altervista.org', 'filecom.net', 'pipocas.tv', 'generatupremium.biz', 'mega-debrid.eu', 'premiumst0re.blogspot.com', 'dl-protect.com', 'newsinlevels.com', 'vipracing.biz'],
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
            window.com_adswizz_synchro_initialize = function () {};
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
            };

            var date = new Date();
            return [pad(date.getUTCFullYear(), 4), "-",
              pad(date.getUTCMonth() + 1, 2), "-",
              pad(date.getUTCDate(), 2), "T",
              pad(date.getUTCHours(), 2), ":",
              pad(date.getUTCMinutes(), 2), ":",
              pad(date.getUTCSeconds(), 2)].join();
          };

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
              values.Timestamp = makeISOTimestampUTC();

              // Recompose information in main storage cookie
              cookie = "MGUID=";
              for (var key in values) {
                if (values.hasOwnProperty(key)) {
                  cookie += key + "=" + values[key] + "&";
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
        // by: Reek, Alexander255
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
      planetatvonlinehd_network : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1467
        // issue: https://github.com/reek/anti-adblock-killer/issues/159
        host : ['planetatvonlinehd.blogspot.', 'planetatvonlinehd.com'],
        onStart : function () {
          Aak.addStyle('.adsantilok { height: 1px; }');
          //Aak.uw.jQAntiAdsBlock = function (){}; // don't work
        }
      },
      beta_speedtest_net : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/628
        // issue: https://github.com/reek/anti-adblock-killer/issues/562
        // issue: https://github.com/reek/anti-adblock-killer/issues/484
        // source: http://paste2.org/53ymghX1
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
      whiskyprices_domains : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1284
        // source: http://pastebin.com/Epr5tREL
        host : ['whiskyprijzen.com', 'whiskyprices.co.uk', 'whiskypreise.com', 'whiskyprix.fr'],
        onAlways : function () {
          Aak.uw.OA_show = true;
        }
      },
      nicoblog_org : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1184
        // source: http://pastebin.com/MNHpLs2V
        host : ['nicoblog.org'],
        onIdle : function () {
          var el = document.querySelector('.src');
          el.removeAttribute('class');
        }
      },
      di_se : {
        // note: add this rule for chrome user
        // issue: https://github.com/reek/anti-adblock-killer/issues/1319
        // source: http://pastebin.com/9bDPQzMX
        host : ['di.se'],
        onIdle : function () {
          Aak.removeElement('#header_overlay');
          Aak.removeElement('#message_modal');
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
            enumerable : true,
            writable : false,
            value : false
          });
          Object.defineProperty(Aak.uw, "showAdBlockMessage", {
            enumerable : true,
            writable : false,
            value : function () {}
          });
        }
      },
      libertaddigital_com : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1642
        // source: http://pastebin.com/6Fzp0vrE
        host : ['libertaddigital.com'],
        onStart : function () {
          Object.defineProperty(Aak.uw, "ad_already_played", {
            enumerable : true,
            writable : false,
            value : true
          });
          Object.defineProperty(Aak.uw, "puedeMostrarAds", {
            enumerable : true,
            writable : false,
            value : true
          });
        }
      },     
      folha_uol_com_br : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1396
        // source: f( ( typeof paywall_access == "undefined" || paywall_access != true ) && ( typeof folha_ads == "undefined" || folha_ads != true ) ) {
        host : ['folha.uol.com.br'],
        onStart : function () {
          Object.defineProperty(Aak.uw, "paywall_access", {
            enumerable : true,
            writable : false,
            value : true
          });
          Object.defineProperty(Aak.uw, "folha_ads", {
            enumerable : true,
            writable : false,
            value : true
          });
        }
      },
      gamer_com_tw : {
        // by: mmis1000
        // userscript: https://greasyfork.org/en/scripts/16525
        // issue: : https://github.com/reek/anti-adblock-killer/issues/975
        host : ['gamer.com.tw'],
        onStart : function () {
          Object.defineProperty(Aak.uw, 'AntiAd', {
            enumerable : true,
            writable : false,
            value : null
          });
        }
      },
      armorgames_com : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/845
        host : ['armorgames.com'],
        onStart : function () {
          Object.defineProperty(Aak.uw, 'ga_detect', {
            enumerable : true,
            writable : false,
            value : null
          });
        }
      },
      mangahost_com : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/957
        // issue: https://github.com/reek/anti-adblock-killer/issues/558
        // source: http://pastebin.com/GrpbJENA
        host : ['mangahost.com'],
        onStart : function () {
          Object.defineProperty(Aak.uw, "testDisplay", {
            enumerable : true,
            writable : false,
            value : false
          });
        }
      },
      videowood_tv : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1339
        // source: http://videowood.tv/build/assets/js/pembed-97a640f625.js
        host : ['videowood.tv'],
        onStart : function () {
          Aak.uw.open = function () {}; // prevent popup
          Aak.uw.config = {};
          Object.defineProperty(Aak.uw.config, "adb_remind", {
            enumerable : true,
            writable : false,
            value : false
          });
        }
      },
      infojobs_com_br : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1339
        // source: http://pastebin.com/LPg6093U
        // redirect: http://www.infojobs.com.br/nopublicity.aspx
        host : ['infojobs.com.br'],
        onStart : function () {
          Aak.addScript(function () {
            var webUI = webUI || {};
            webUI.Utils = webUI.Utils || {};
            Object.defineProperty(webUI.Utils, "StopAdBlock", {
              enumerable : true,
              writable : false,
              value : function () {}
            });
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
        }
      },
      narkive_com : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/569
        host : ['narkive.com'],
        onAlways : function () {
          Aak.uw.adblock_status = function () {
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
        // source: http://pastebin.com/16mnmeMc
        host : ['ville-ideale.com'],
        onAlways : function () {
          // +abp rule alt solution
          Aak.uw.execsp = function () {};
        }
      },
      notre_planete_info : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/258
        // source: http://pastebin.com/qrS6QGGE
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
      mtlblog_com : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/948
        // issue: https://greasyfork.org/forum/discussion/7753
        // source: http://pastebin.com/BFrDPM6b
        host : ['mtlblog.com'],
        onStart : function () {
          Object.defineProperty(Aak.uw, 'puabs', {
            enumerable : true,
            value : function () {}
          });
        }
      },
      anizm_com : {
        // issue:
        host : ['anizm.com'],
        onAlways : function () {
          Aak.uw.stopAdBlock = {};
        }
      },
      diarioinformacion_com : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1550
        host : ['diarioinformacion.com'],
        onStart : function () {
          Object.defineProperty(Aak.uw, 'pr_okvalida', {
            enumerable : true,
            value : true
          });
        }
      },
      cnbeta_com : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1301
        // source: http://pastebin.com/vXNCztwx
        host : ['cnbeta.com'],
        onStart : function () {
          Object.defineProperty(Aak.uw, 'JB', {
            enumerable : true,
            value : function () {}
          });
        }
      },
      themarker_haaretz : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1292
        // source: http://pastebin.com/m08dkDT4
        host : ['themarker.com', 'haaretz.co.il'],
        onStart : function () {
          Object.defineProperty(Aak.uw, 'AdBlockUtil', {
            enumerable : true,
            value : {}
          });
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
      _15min_lt : {
        // issue: https://github.com/reek/anti-adblock-killer/issues?q=15min.it
        // source: http://pastebin.com/YWf3HTqr
        host : ['15min.lt'],
        onStart : function () {
          Object.defineProperty(Aak.uw, '__adblock_js_test', {
            enumerable : true,
            writable : false,
            value : true
          });
        }
      },
      sc2casts_com : {
        // by: Giwayume
        // issue: https://github.com/reek/anti-adblock-killer/issues/1599
        host : ['sc2casts.com'],
        onStart : function() {
          Aak.addScript(function() {
            window._gaq = { push:function() {} };
            Object.defineProperty(window, "showdialog", {
              value: function() {},
              configurable: false,
              writable: false
            });
            Object.defineProperty(window, "showPopup2", {
              value: function() {},
              configurable: false,
              writable: false
            });
          });
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
          };
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
      mrpiracy_domains : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1405
        host : ['mrpiracy.xyz', 'mrpiracy.club'],
        onBeforeScript : function () {
          return [{
              contains : 'Desativa o AdBlock para continuar',
              external : false,
              remove : true
            }
          ];
        }
      },
      dbplanet_net : {
        // issue: PM
        host : ['dbplanet.net'],
        onStart : function () {
          Aak.setCookie('newnoMoreAdsNow', 1);
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
          };
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
            return false;
          };
        }
      },
      freecoins4_me : {
        // issue:
        host : ['freecoins4.me'],
        onAlways : function () {
          Aak.uw.check = function () {
            return false;
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
        }
      },
      bild_de : {
        // issue: https://github.com/reek/anti-adblock-killer/issues?q=bild
        host : ['bild.de'],
        onBeforeScript : function () {
          return [{
              contains : 'http://www.bild.de/wa/ll/bild-de/unangemeldet-42925516.bild.html',
              external : false,
              replace : ['javascript', 'void(0);'].join(':')
            }
          ];
        }
      },
      inn_co_il : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/532
        host : ['inn.co.il'],
        onStart : function () {
          Aak.addScript(function () {
            var TRC = {};
            TRC.blocker = {
              states : {
                ABP_DETECTION_DISABLED : -2,
                ABP_NOT_DETECTED : 0,
                ABP_DETECTED : 1
              },
              createBlockDetectionDiv : function () {
                return document.createElement("div");
              },
              isBlockDetectedOnDiv : function () {
                return 0;
              },
              isBlockDetectedOnClassNames : function () {
                return 0;
              },
              getBlockedState : function () {
                return 0;
              }
            };
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
      aranzulla_it : {
        // issue: https://github.com/reek/anti-adblock-killer/issues?q=aranzulla.it
        // source: http://pastebin.com/yMM6YgxW
        host : ['aranzulla.it'],
        onStart : function () {
          Object.defineProperty(Aak.uw, "abCheck", {
            value : {},
            configurable : false,
            writable : false
          });
        }
      },
      lesechos_fr : {
        // Reek, Giwayume
        // issue: https://github.com/reek/anti-adblock-killer/issues?q=lesechos.fr
        // source: http://pastebin.com/CMM8WGLj
        host : ['lesechos.fr', 'lesechos.com'],
        onStart : function() {
          Aak.addScript(function() {
            Object.defineProperty(window, "checkAdBlock", {
              value: function() {},
              configurable: false,
              writable: false
            });
          });
        },
        onAlways : function () {
          Aak.uw.call_Ad = 1;
          Aak.uw.paywall_adblock_article = function () {};
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
        // by: Alexander255, Reek, Giwayume
        // patch: http://pastebin.com/Q664diQ2
        // issue: https://github.com/reek/anti-adblock-killer/issues?q=exrapidleech
        // source: http://pastebin.com/5e27syjA
        host : ['exrapidleech.info'],
        onStart : function () {

          var tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);

          // prevent popup
          Aak.setCookie('popcashpuCap', 1);
          Aak.setCookie('popcashpu', 1);
          Aak.setCookie('nopopatall', tomorrow.getTime().toString());
          Aak.setCookie('noadvtday', 0);
          //Aak.setCookie('bv_DSKskdck_s1d', 'bvDSKskdcks1d');

          // hide notice
          Aak.addStyle('div.container div.row div.col-md-5 div.row fieldset div.alert.alert-danger.lead, div.container div.row div.panel.panel-default div.panel-body p {display:none;}');
          
          // prevent redirect to verify page
          Object.defineProperty(Aak.uw, 'bdvbnr_pid', {
            enumerable : true,
            value : []
          });

          Aak.addScript(function () {
            (function () {
              // prevent popup
              window.open = function () {};

              // prevent redirect to verify page
              var frame1 = document.createElement('iframe');
              frame1.src = 'http://bdfrm.bidvertiser.com/BidVertiser.dbm?pid=383865&bid=1737418&RD=';
              frame1.id = 'bdvi';
              frame1.style = 'display:none';
              document.documentElement.appendChild(frame1);
            })();
          });
        }
      },
      vipleague_domains : {
        // note: also killed by AakList
        // issue: https://github.com/reek/anti-adblock-killer/issues?q=vipbox
        // issue: https://github.com/reek/anti-adblock-killer/issues?q=vipleague
        // source: http://pastebin.com/NERVzHzS
        host : ["vipleague.is", "vipleague.ws", "vipleague.tv", "vipleague.se", "vipleague.tv", "vipleague.me", "vipleague.mobi", "vipleague.co", "vipleague.sx", "vipleague.ch", "vipbox.tv", "vipbox.co", "vipbox.biz", "vipbox.sx", "vipbox.eu", "vipbox.so", "vipbox.nu", "vipboxsa.co", "strikeout.co", "strikeout.me", "homerun.re", "vipboxtv.co", "vipapp.me"],
        onStart : function () {
          Aak.uw.iExist = true;
          Aak.setCookie('xclsvip', 1);
          Aak.addStyle(".vip_052x003 { height: 250px; }");
          Aak.addStyle(".vip_09x827 { height: 26px; }");
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
      pornve_com : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/947
        // source: http://pastebin.com/7TPPkq12
        host : ['pornve.com'],
        onAlways : function () {
          Aak.uw.adxjwupdate = 1;
        }
      },
      lol_moa_tw : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1114
        host : ['lol.moa.tw'],
        onIdle : function () {
          Aak.addScript(function () {
            var MoaObj = MoaObj || {};
            MoaObj.ad = MoaObj.ad || {};			
            MoaObj.ad.hasAdblock = function () {
              return false;
            };
            MoaObj.ad.checkABP = function () {
              return false;
            };
          });
        }
      },
      multiup_org : {
        // by: Watilin
        // note: alternative solution
        // issue: https://github.com/reek/anti-adblock-killer/issues/677
        host : ['multiup.org'],
        onEnd : function () {
          var links = document.querySelectorAll("a.btn[style]");
          for (var i = 0; i < links.length; i++) {
            if ("none" === links[i].style.display)
              links[i].style.display = "";
          }
          var buttons = document.querySelectorAll("button.detect");
          for (i = 0; i < buttons.length; i++) {
            buttons[i].style.display = "none";
          }
        }
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
      youporn_network : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/887
        // source: http://pastebin.com/TFB1dtgb
        host : ['youporn.com', 'youporngay.com'],
        onStart : function () {
          Aak.setCookie("adblock_message", "closed");
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
          // source are obfuscated in external js
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
      slideplayer_domains : {
        // by: Alexander255
        // issue: https://github.com/reek/anti-adblock-killer/issues/1333
        // issue: https://github.com/reek/anti-adblock-killer/issues/515
        // issue: https://github.com/reek/anti-adblock-killer/issues/296
        // demo: http://slideplayer.fr/slide/1304026/#
        host : ['slideplayer.*'],
        onEnd : function () {

          // Disable anti-adblocker
          Aak.uw.force_remove_ads = true;

          // Circumvent "share to download" rule
          Aak.addScript(function () {
            var slide_id = window.get_current_slide_id();
            var slide_srv = document.getElementById("player_frame").src.split("/")[3];
            var time = 86400 + Math.floor(Date.now() / 1000);
            var secret = encodeURIComponent(window.strtr(window.MD5.base64("secret_preved slideplayer never solved " + time + slide_id + ".ppt"), "+/", "- "));

            var url = "http://player.slideplayer.org/download/" + slide_srv + "/" + slide_id + "/" + secret + "/" + time + "/" + slide_id + ".ppt";
            var links = document.querySelectorAll("a.download_link");
            for (var i = 0; i < links.length; i++) {
              /* Remove original "share to download" popup event listener */
              var events = $._data(links[i]).events.click;
              events.splice(0, events.length);

              /* Set normal link href instead */
              links[i].href = url;
            }
          });

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
      monnsutogatya_com : {
        // issue: PM
        // source: http://pastebin.com/1Lw60h6k
        host : ['monnsutogatya.com'],
        onIdle : function () {
          Aak.addStyle("#site-box {display:block;}");
          Aak.removeElement('#for-ad-blocker');
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
      hackintosh_zone : {
        // by: Alexander255
        // issue: https://github.com/reek/anti-adblock-killer/issues/559
        // issue: https://github.com/reek/anti-adblock-killer/issues/427
        // issue: https://github.com/reek/anti-adblock-killer/issues/187
        // issue: https://github.com/reek/anti-adblock-killer/pull/114
        // source: http://paste2.org/DnB9Oj4f
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
        onBeforeScript : function () {
          return [{
              contains : 'disable ADBlock completely',
              external : false,
              remove : true
            }
          ];
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
      onmeda_de : {
        // note: script obfuscated line 1110
        // issue: https://greasyfork.org/forum/discussion/8576
        // issue: https://github.com/reek/anti-adblock-killer/issues/1067
        // source: http://pastebin.com/qf46bN3z
        // source: http://pastebin.com/RwHyF0NL
        host : ['onmeda.de'],
        onAlways : function () {
          Aak.uw.$ADP = true;
          Aak.uw.sas_callAd = function () {};
          Aak.uw.sas_callAds = function () {};
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
      rockfile_eu : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1256
        host : ['rockfile.eu'],
        onIdle : function () {
          Aak.createElement({
            tag : 'iframe',
            src : 'about:blank',
            style : 'visibility:hidden;',
            append : 'body'
          });
        }
      },
      linkbucks_antiadblock : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/932
        // issue: https://github.com/reek/anti-adblock-killer/issues/469
        // issue: https://github.com/reek/anti-adblock-killer/issues/277
        // v3: http://pastebin.com/0gh8LMGH
        // note: no solution, anti-adblock difficult to bypass --> http://pastebin.com/1NRq7WvZ
        host : ['linkbucks.com', 'miniurls.co', 'picbucks.com', 'picturesetc.net', 'placepictures.com', 'poontown.net', 'qqc.co', 'qvvo.com', 'realfiles.net', 'rqq.co', 'seriousdeals.net', 'seriousfiles.com', 'seriousurls.com', 'sexpalace.gs', 'theseblogs.com', 'thesefiles.com', 'theseforums.com', 'thosegalleries.com', 'tinybucks.net', 'tinylinks.co', 'tnabucks.com', 'tubeviral.com', 'uberpicz.com', 'ubervidz.com', 'ubucks.net', 'ugalleries.net', 'ultrafiles.net', 'urlbeat.net', 'urlpulse.net', 'whackyvidz.com', 'youfap.me', 'yyv.co', 'zxxo.net', 'zff.co', 'linkbucksdns.co', 'miniurls.com', 'dyo.gs', 'goneviral.com', 'eafyfsuh.net', 'sasontnwc.net'],
        onStart : function () {
          // do nothing...
        }
      },
      linkbucks_visitscript : {
        // issue:
        host : ['referencemega.com', 'fpabd.com', 'crackacc.com'],
        onStart : function () {
          // Skip visitScript when site use CloudFlare Rocket Script
          Aak.setCookie('_lbGatePassed', true);
        }
      },
      link_tl : {
        // issue: https://github.com/reek/anti-adblock-killer/issues?q=link.tl
        // issue: https://greasyfork.org/fr/forum/discussion/8437
        // source: http://pastebin.com/1MkCnmL7
        host : ['link.tl'],
        onStart : function () {
          Aak.addStyle('.adblock { height:1px; }');
          Aak.uw.adblocker = false;
        }
      },
      wstream_video : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1382
        // source: http://pastebin.com/EiARVQXt
        host : ['wstream.video'],
        onStart : function () {
          Aak.addStyle('#adiv { height:4px; }');
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
      ekstrabladet_dk : {
        // issue: https://github.com/reek/anti-adblock-killer/issues?q=ekstrabladet
        // source: http://pastebin.com/R029XpCr
        host : ['ekstrabladet.dk', 'eb.dk'],
        onAlways : function () {
          Aak.uw.ADTECH = {};
        }
      },
      pcgames_download_net : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1451
        // issue: https://greasyfork.org/forum/discussion/9328
        // source: http://pastebin.com/EBVZg3VB
        host : ['pcgames-download.net'],
        onAlways : function () {
          Aak.setCookie('noAdblockNiceMessage', 1);
          Aak.uw.mgCanLoad30547 = true;
        }
      },
      lachainemeteo_com : {
        // note: also killed by AakList
        // issue: https://github.com/reek/anti-adblock-killer/issues/590
        // issue: https://github.com/reek/anti-adblock-killer/issues/245
        // issue: https://github.com/reek/anti-adblock-killer/issues/215
        host : ['lachainemeteo.com'],
        onAlways : function () {
          Aak.uw.js_loaded = true;
        }
      },
      mac4ever_com : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/997
        // source: http://pastebin.com/RQnCEYK6
        host : ['mac4ever.com'],
        onAlways : function () {
          Aak.uw.coquinou = function () {};
        }
      },
      thesimsresource_com : {
        // issue: https://github.com/reek/anti-adblock-killer/issues?q=thesimsresource.com
        // source: http://pastebin.com/DE9rbjxY
        host : ['thesimsresource.com'],
        onAlways : function () {
          Aak.uw.gadsize = true;
          Aak.uw.iHaveLoadedAds = true;
        }
      },
      yellowbridge_com : {
        host : ['yellowbridge.com'],
        onAlways : function () {
          Aak.uw.finalizePage = function () {
            return;
          };
        }
      },
      game_debate_com : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1366
        // source: http://pastebin.com/UzsiX0FK
        host : ['game-debate.com'],
        onAlways : function () {
          Aak.uw.ad_block_test = function () {};
        }
      },
      adscendmedia : {
        host : ['adscendmedia.com'],
        onStart : function () {
          // adscendmedia - https://www.adscendmedia.com/
          var ref = document.createElement('a').href = document.referrer;
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
          var ref = document.createElement('a').href = document.referrer;
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
        host : ['kissanime.com', 'kissanime.to'],
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
        // issue: https://github.com/reek/anti-adblock-killer/issues?q=openload
        host : ['openload.co', 'openload.io', 'openload.tv'],
        onStart : function () {
          Aak.uw.adblock = false;
          Aak.uw.adblock2 = false;
          Aak.uw.popAdsLoaded = true;
          // hide fake play button used to open popunder
          //Aak.addStyle('#videooverlay { display:none; }')
        }
      },
      youwatch_network : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1293
        // issue: https://github.com/reek/anti-adblock-killer/issues/308
        // issue: https://github.com/reek/anti-adblock-killer/issues/529
        // issue: https://github.com/reek/anti-adblock-killer/issues/535
        // test: http://youwatch.org/embed-59p7i3cdkse0-453x320.html
        // test: http://youwatch.org/59p7i3cdkse0
        host : ['youwatch.org', 'chouhaa.info'],
        onStart : function () {
          // skip anti-adblock
          Aak.uw.adsShowPopup = 1;
        },
        onIdle : function () {
          // renove ads + fake play button
          Aak.removeElement('#player_img, #player_img + div[id]');
        }
      },
      exashare_com : {
        // by: Watilin
        // pull: https://github.com/reek/anti-adblock-killer/pull/519
        // issue: https://github.com/reek/anti-adblock-killer/issues/624
        // issue: https://github.com/reek/anti-adblock-killer/issues/486
        // issue: https://github.com/reek/anti-adblock-killer/issues/506
        // test:  http://exashare.com/galw2ge2kzsv
        host : ['exashare.com', 'chefti.info', 'bojem3a.info', 'ajihezo.info'],
        onStart : function () {
          // skip anti-adblock
          Aak.uw.adsShowPopup = 1;
        },
        onIdle : function () {
          // renove ads + fake play button
          Aak.removeElement('#player_img, #player_img + div[id]');
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
        // Note: disable EasyPrivacy
        // issue: https://github.com/reek/anti-adblock-killer/issues/956
        // issue: https://github.com/reek/anti-adblock-killer/issues/905
        // issue: https://github.com/reek/anti-adblock-killer/issues/300
        host : ['biztok.pl', 'wp.tv', 'wp.pl', 'sportowefakty.pl', 'kafeteria.tv', 'kafeteria.pl', '.wrzuta.pl', 'pudelek.tv', 'komediowo.pl', 'sfora.pl', 'autokrata.pl', 'sportfan.pl', 'wawalove.pl', 'hotmoney.pl', 'aleseriale.pl', 'babol.pl', 'snobka.pl', 'nocoty.pl', 'money.pl', 'abczdrowie.pl', 'gadzetomania.pl', 'autokult.pl', 'komorkomania.pl'],
        onStart : function () {
          // prevent popup anti-adblock from abczdrowie.pl
          Aak.setCookie('ABCABC', true);
        },
        onIdle : function () {
          
          Aak.hasElement('.wp-player', function () {
          
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
                  var res = result.responseText;
                  var obj = JSON.parse(res);
                  Aak.log(obj);

                  var Player = new Aak.player();
                  Player.videojs(player, {
                    source : Aak.fixProtocolURL(obj.clip.url[1].url), // HD
                    type : 'mp4',
                    autoplay : false
                  });
                }
              });
            };

            var replacePlayerWrzuta = function (key, channel, elem) {
              Aak.request({
                // http://www.wrzuta.pl/npp/embed/wolnapolska2/0I0HQ2mutJc
                url : 'http://www.wrzuta.pl/npp/embed/' + channel + '/' + key,
                onload : function (result) {
                  var res = result.responseText;
                  var obj = JSON.parse(res);
                  Aak.log(obj);

                  var Player = new Aak.player();
                  Player.videojs(elem, {
                    source : Aak.fixProtocolURL(obj.url[0].url), //HD
                    type : 'mp4',
                    autoplay : false
                  });
                }
              });
            };

            // Using an external flash player is impossible because protected by crossdomain.xml
            var players = document.querySelectorAll('.wp-player'); //  #Player0, #Player1, #mainPlayer
            if (players.length) {
              // fixbug gm_xhr loop request - http://tinyurl.com/pqa9htq
              for (var i = 0; i < players.length; i++) {
                var mid = null;
                var player = players[i];
                var parent = player.parentNode;
                var script = player.previousSibling;
                var title = player.querySelector('.titleCont a.title');
                var embedvideos = document.querySelectorAll('script[src*="/embed_video.js"]');
                Aak.log(player, parent, script, title);

                if (embedvideos.length) {
                  // pudelek.wrzuta.pl: http://tinyurl.com/l8jo5v2
                  // pudelek.tv: http://tinyurl.com/klyzh6r, http://tinyurl.com/z7fr89v
                  // pudelek.tv (triple): http://tinyurl.com/n9b27o2
                  // film.wp.pl: http://tinyurl.com/q7k5bxp
                  var embedvideo = embedvideos[i];
                  var key = /key=(\w+)/.exec(embedvideo.src)[1];
                  var channel = /login=(\w+)/.exec(embedvideo.src)[1];
                  var autostart = /autoplay/.test(embedvideo.src);
                  replacePlayerWrzuta(key, channel, player, autostart);
                  Aak.log('embed_video.js');
                } else if (title && /mid/.test(title.href)) {
                  // sportowefakty.pl: http://tinyurl.com/l6zabcx
                  mid = title.href.match(/mid[=,]([0-9]+)/);
                  Aak.log('title.href');
                } else if (parent.id) {
                  if (parent.dataset.url) {
                    // wp.tv: http://tinyurl.com/pzde29t
                    mid = parent.dataset.url.match(/mid[=,]([0-9]+)/);
                    Aak.log('parent.dataset.url');
                  } else {
                    if (parent.previousSibling.innerHTML) {
                      // wiadomosci.wp.pl: http://tinyurl.com/gqtt9ca
                      mid = parent.previousSibling.innerHTML.match(/mid[=,]([0-9]+)/);
                      Aak.log('script.inline.innerHTML');
                    } else {
                      // kafeteria.tv: http://tinyurl.com/nofp58a
                      // abczdrowie.pl: http://tinyurl.com/hx6s5et
                      mid = parent.innerHTML.match(/mid[=,]([0-9]+)/);
                      Aak.log('parent.innerHTML');
                    }
                  }
                } else if (script && script.tagName == 'SCRIPT') {
                  // film.wp.pl: http://tinyurl.com/mh9onfw
                  // pudelek.tv (double): http://tinyurl.com/lefvwtx
                  mid = script.innerHTML.match(/mid[=,]([0-9]+)/);
                  Aak.log('script.src.innerHTML');
                }
                if (mid !== null && mid.length == 2) {
                  replacePlayerWP(mid[1], player);
                }
              }
            }
          });
        }
      },
      moje_filmy_tk : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1010
        // source: http://pastebin.com/7G2RBnqq
        host : ['moje-filmy.tk'],
        onIdle : function () {
          var searchvalue = ['var playerInstance', '});'];
          var script = Aak.hasScript(searchvalue[0]);

          if (script) {
            var source = script.innerHTML;
            var str = source.substring(source.lastIndexOf(searchvalue[0]), source.lastIndexOf(searchvalue[1]) + searchvalue[1].length);
            Aak.addScript(str);
          }
        }
      },
      tvn_pl : {
        // by: Reek, Marek
        // solution: http://tinyurl.com/ohbvz4r, http://tinyurl.com/jq8s462
        // issue: https://github.com/reek/anti-adblock-killer/issues/581
        // issue: https://github.com/reek/anti-adblock-killer/issues/510
        // issue: https://github.com/reek/anti-adblock-killer/issues/293
        // issue: https://github.com/reek/anti-adblock-killer/issues/192
        // test: http://tinyurl.com/o6d9h66, http://tinyurl.com/z77m4zh
        host : ['tvn.pl', 'tvn24.pl', 'player.pl'],
        onEnd : function () {
          Aak.hasElement('header.detailImage', function (thisElement) {
            if (Aak.getCookie('country_code') && Aak.getSession('generateToken')) {
                var parts = document.location.href.split(/[.,]/);
                var id = parts[parts.length - 2];
                var params = {
                  platform : "Mobile",
                  terminal : "Android",
                  format : "json",
                  v : "2.0",
                  authKey : "b4bc971840de63d105b3166403aa1bea",
                  type : "episode",
                  id : id,
                  sort : "newest",
                  m : "getItem",
                  deviceScreenHeight : 1600,
                  deviceScreenWidth : 2560
                };
                var api = 'https://api.tvnplayer.pl/api/?' + Aak.serialize(params);
                var proxy = 'http://www.proxy.xmc.pl/index.php?hl=3e5&q=';	
                
                // Get videoUrl
                Aak.request({
                  url : Aak.getCookie('country_code') != 'PL' ? proxy + Aak.encodeURI(api) : api,
                  headers : {
                    "User-Agent" : "Mozilla/5.0 (Linux; U; Android 4.2; en-us; Nexus 10 Build/JVP15I) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30"
                  },
                  onload : function (result) {
                    var res = result.responseText;
                    Aak.log(res);
                    var o = JSON.parse(res);
                    var videoUrl = o.item.videos.main.video_content[Number(Aak.opts.videoHD)].url;
                    var generateToken = new Function('videoUrl', Aak.getSession('generateToken'));
                    var videoUrlWithSeed = generateToken(videoUrl);
                    var Player = new Aak.player();
                    Player.videojs(thisElement, {
                      source : videoUrlWithSeed,
                      type : 'mp4',
                      autoplay: false
                    }, {}, {insert:'inner'});
                  }
                });
            } else {
              Aak.request({ // get and store generateToken function
                url : 'http://pastebin.com/raw/D9qM4DR3',
                onload : function (response) {
                  var res = response.responseText;
                  Aak.setSession('generateToken', res);
                  Aak.request({ // get user ip
                    url : 'http://ip-api.com/json',
                    onload : function (response) {
                      var res = response.responseText;
                      var json = JSON.parse(res);
                      Aak.setCookie('country_code', json.countryCode);
                      Aak.refresh();
                    }
                  });
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
        // test: http://tinyurl.com/hz7gpxx
        host : ['ipla.tv'],
        onIdle : function () {
          Aak.addStyle('.html5-player-wrapper { display:none; }'); // chrome/opera
          var oldPlayer = document.querySelector('.html5-player-wrapper, #vod-player');
          Aak.request({
            url : '/VOD/play-in-ipla/' + location.href.match(/\/vod-(\d+)/)[1],
            onload : function (result) {
              var videoURL;
              var res = result.responseText;
              var idn = res.match(/ipla:\/\/playvod-1\|([a-z0-9]+)/)[1];
              Aak.log(idn);
              Aak.request({
                url : 'http://getmedia.redefine.pl/vods/get_vod/?cpid=1&ua=mipla/23&media_id=' + idn,
                onload : function (result) {
                  var res = result.responseText;
                  var o = JSON.parse(res);
                  Aak.log(o);
                  if (o.vod.video_hd) {
                    videoURL = o.vod.video_hd;
                  } else if (o.vod.video) {
                    videoURL = o.vod.video;
                  } else {
                    videoURL = o.vod.copies[0].url;
                  }

                  var Player = new Aak.player();
                  Player.videojs(oldPlayer, {
                    source : videoURL,
                    type : 'mp4',
                    width : 820,
                    height : 450,
                    autoplay : false
                  });
                }
              });
            }
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
        onEnd : function () {}
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
          if (element !== null) {
            var videoId = element.id.split('_')[2];
            setTimeout(function () {
              element.innerHTML = '<iframe frameborder="0" width="812" height="500" src="http://www.dailymotion.com/embed/video/' + videoId + '?logo=0&autoPlay=1&autoMute=0"></iframe>';
            }, 1000);
          }
        }
      },
      m6web_fr : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/461
        // test: http://tinyurl.com/ptn2vrl
        host : ['m6web.fr'],
        onEnd : function () {
          var player = document.querySelector('object[id$="_flash_api"]');
          var script = Aak.hasScript('M6.Player.config');

          if (player !== null && script !== null) {
            var found = script.innerHTML.match(/M6.Player.config = (\{.+\});/);
            var config = JSON.parse(found.pop());
            
            // Replace player
            var Player = new Aak.player();
            Player.videojs(player.parentNode, {
              source : config.sources[1].src,
              type : 'mp4',
              autoplay : false
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
          var Player = new Aak.player();
          Player.editing('#videoplayer', {
          unsetFlashvars : 'abcheck_enabled,adcall,adclasses,adconfig,admeta,adslog,agof,ama,angebot,as,asparts,breakad,connectioncheck,cslog,dev,dimmer,errorlog,feedback,fmsident,gtv,highlights,ivw,ivw_play,js,js_event_function,logo,logo_basewidth,logopos,nielsen,ord,osmf,svm,tile,videoplaza,videoplaza_base_url,videoplaza_share,videoplaza_tag,vpEnvironmentURL,xl'
          });
           */
        }
      },
      rtl_de : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1541
        // test: http://tinyurl.com/h7ccvqq
        host : ['rtl.de'],
        onIdle : function () {
          Array.prototype.slice.call(document.querySelectorAll('div[data-widget="video"]')).map(function (video) {
            var cfg = Aak.intoObject(video.dataset.playerLayerCfg);
            var file = cfg.videoinfo.mp4url;
            Aak.log(video, cfg, file);

            // Replace player
            var Player = new Aak.player();
            Player.videojs(video, {
              source : file,
              type : 'mp4',
              autoplay : false
            });
          });
        }
      },
      myspass_de : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/76
        // test: http://tinyurl.com/lto9pyd
        host : ['myspass.de'],
        onIdle : function () {
          var videoid = location.pathname.match(/\/(\d+)\/$/);

          if (videoid !== null) {
            Aak.request({
              url : 'http://www.myspass.de/myspass/includes/apps/video/getvideometadataxml.php?id=' + videoid[1],
              onload : function (result) {
                var res = result.responseText;
                Aak.log(res);

                // Get video
                var parser = new window.DOMParser();
                var dom = parser.parseFromString(res, "application/xml");
                var file = dom.getElementsByTagName("url_flv").item(0).textContent;

                // Remove elements
                Aak.removeElement('div.loadingGif');

                // Replace player
                var Player = new Aak.player();
                Player.videojs('#player', {
                  source : file,
                  type : 'mp4',
                  autoplay : false
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
          var Player = new Aak.player();
          Player.editing('#_rtlosmf0', {
            setFlashvars : {
              adblock : false
            }
          });
        }
      },
      // Norway
      vgtv_network : {
        // note: skip video ads + anti-adblock
        // jwplayer: http://tinyurl.com/zyv79hg
        // issue: https://github.com/reek/anti-adblock-killer/issues/1402
        // issue: https://github.com/reek/anti-adblock-killer/issues/367
        // test: http://tinyurl.com/nwp85t, http://tinyurl.com/nwp85t
        host : ['vgtv.no', 'vg.no'],
        onEnd : function () {
          var oldHash = null;
          var videoId = null;
          var videoIdRegex = /#\!\/video\/(\d+)\//;

          // check if the location hash changes
          setInterval(function () {
            var player = Aak.getElement('.video-player');

            if (player && location.hash != oldHash && videoIdRegex.test(location.hash)) {
              oldHash = location.hash;
              videoId = oldHash.match(videoIdRegex)[1];
/*
              var hlsurl = 'https://svpsecurehdvod-vh.akamaihd.net/i/2016/03/20160312_56e421f86af45_vg01/,1280_720_3500,960_540_1500,640_360_800,480_270_500,.mp4.csmil/master.m3u8';
              console.log(player)

              // don't work with chrome
              // player.innerHTML = '<div id="noAdPlayer">This text will be replaced with a player.</div>';


              // can't load m3u8 4032 status code
              //console.log(unsafeWindow.jwplayer)

              Aak.request({
                url : 'http://svp.vg.no/svp/api/v1/vgtv/assets/' + videoId + '?additional=settings|chapters|cuePoints|externalId|barrels|externalCategoryId|nextAsset&appName=vgtv-website',
                onload : function (result) {
                  var res = result.responseText;
                  var obj = JSON.parse(res);
                  Aak.log(obj);

                  // replace player
                  var Player = new Aak.player();
                  Player.vlc(player, {
                    source : obj.streamUrls.hls, // m3u8
                    type : 'hls',
                    autoplay : false
                  });
                }
              }, {}, {
                insert : 'inner'
              });
*/
            }
          }, 1e3);
        }
      },
      mtg_radio : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1495
        host : ['play.radio1.se', 'play.bandit.se', 'play.lugnafavoriter.com', 'play.rixfm.se'],
        onEnd : function () {
          Aak.addScript(function () {
            setTimeout(function () {
              window.player_load_live(window.stream_id);
            }, 1000);
          });
        }
      },
      dplay_network : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1463
        host : ['dplay.com', 'dplay.dk', 'dplay.se'],
        onStart : function () {
          var date = new Date();
          date.setDate(date.getDate() + 365);
          var timestamp = date.getTime().toString();
          var value = JSON.stringify({
              "notificationSubmission" : "submitted",
              "reportingExpiry" : timestamp,
              "notificationExpiry" : timestamp
            });
          Aak.setCookie('dsc-adblock', value);
        }
      },
      viasat_tv : {
        // note: skip video ads + anti-adblock
        // issue: https://github.com/reek/anti-adblock-killer/issues?q=tv3play
        /* test: http://www.tv3play.no/programmer/redningsskoyta hds/hls
                   http://www.tv3play.dk/programmer/linse-og-didde-ekstra hds/hls
                   http://www.tv3play.se/program/glamourama hds/hls
                   http://www.tv6play.se/program/99-saker-man-maste-gora-innan-man-dor hds/hls
                   http://www.tv8play.se/program/efterlyst--1 hds/hls
                   http://www.tv10play.se/program/garpens-europa hds/hls
                   http://tvplay.skaties.lv/parraides/tv3-zinas hds/hls
                   http://play.tv3.lt/programos/beatos-virtuve rtmp/hls
                   http://tv3play.tv3.ee/sisu/puhapaev-sepoga rtmp/hls */
        host : ['tv3play.no', 'tv3play.dk', 'tv3play.se', 'tv6play.se', 'tv8play.se', 'tv10play.se', 'tvplay.skaties.lv', 'play.tv3.lt', 'tv3play.tv3.ee'],
        onIdle : function () {
          Aak.hasElement('#video-player', function (thisElement) {
            thisElement.id = '';
            //var videoId = location.pathname.split('/').pop();
            var videoId = thisElement.getAttribute('data-video-id');
            Aak.log(thisElement, videoId);

            // get video sources
            Aak.request({
              url : 'http://playapi.mtgx.tv/v3/videos/stream/' + videoId,
              onload : function (result) {
                var res = result.responseText;
                var obj = JSON.parse(res);
                Aak.log(obj);

                /* Innholdet du prøver å se er kun tilgjengelig for brukere i Norge
                Programmet er blokeret for visning fra denne geografiske position.
                Programą galite matyti tik jungdamiesi iš Lietuvos interneto tiekėjų tinklų */
                if (obj.msg) {
                  return thisElement.innerHTML = obj.msg;
                }

                if (location.host === 'tv3play.tv3.ee') {
                  var Player = new Aak.player();
                  Player.grindplayer(thisElement, {
                    source : obj.streams.medium,
                    type : 'rtmp/mp4',
                    autoplay : true
                  });
                } else {
                  // create video tag for new player
                  Aak.createElement({
                    tag : 'video',
                    id : 'noAdPlayer',
                    classid : 'video-js vjs-default-skin',
                    width : thisElement.clientWidth || 730,
                    height : thisElement.clientHeight || 410,
                    preload : 'auto',
                    controls : true,
                    autoplay : true,
                    replace : thisElement
                  });

                  // parse sources
                  var srcArray = [];
                  if (obj.streams.high && obj.streams.high !== '') {
                    srcArray.push({
                      type : "video/mp4", // mp4
                      src : obj.streams.high
                    });
                  }  if (obj.streams.hls && obj.streams.hls !== '') {
                    srcArray.push({
                      type : "application/x-mpegURL", // m3u8
                      src : obj.streams.hls
                    });
                  }  if (obj.streams.medium && obj.streams.medium !== '') {
                    var type = obj.streams.medium.indexOf('rtmp') === 0 ? 'rtmp/mp4' : 'application/f4m+xml';
                    srcArray.push({
                      type : type,
                      src : obj.streams.medium
                    });
                  }
                  Aak.log(srcArray, JSON.stringify(srcArray));
                  
                  // initialize new player
                  Aak.addScript(Aak.intoString(function () {
                      (function () {
                        function onVjsReady() {
                          if (typeof window.videojs !== 'function') {
                            onVjsReady();
                          } else {
                            window.videojs("noAdPlayer").src(/_SOURCES_/);
                          }
                        }
                        onVjsReady();
                      })();
                    }).replace("/_SOURCES_/", JSON.stringify(srcArray)));
                }
              }
            });
          });
        }
      },
      // Russia
      rutube_ru : { // research solution
        /* test: http://rutube.ru/video/bd5f6047657f0bdcbfbb0edad2bb7c61/ */
        host : ['rutube.ru'],
        onEnd : function () {
          Aak.hasElement('#rutubePlayerHolder', function () {            //dmFyIG9wdHMgPSBBYWsuZ2V0RWxlbWVudCgiI29wdGlvbnMiKTsNCiAgICAgICAgICAgIHZhciBvID0gQWFrLmludG9PYmplY3Qob3B0cy5kYXRhc2V0LnZhbHVlKTsNCiAgICAgICAgICAgIHZhciBtM3U4VXJsID0gby52aWRlb19iYWxhbmNlci5tM3U4Ow0KICAgICAgICAgICAgY29uc29sZS5sb2cobTN1OFVybCk7DQoNCiAgICAgICAgICAgIHZhciBQbGF5ZXIgPSBuZXcgQWFrLnBsYXllcigpOw0KICAgICAgICAgICAgUGxheWVyLnZpZGVvanMoJyNydXR1YmVQbGF5ZXJIb2xkZXInLCB7DQogICAgICAgICAgICAgICAgc291cmNlIDogbTN1OFVybCwNCiAgICAgICAgICAgICAgICB0eXBlIDogJ2hscycsDQogICAgICAgICAgICAgICAgLy9wcm94eTogdHJ1ZSwNCiAgICAgICAgICAgICAgICBhdXRvcGxheSA6IHRydWUNCiAgICAgICAgICAgICAgfTsgKTs=
          });
        }
      },
      // Italy
      rai_tv : { // research solution
        host : ['rai.tv'],
        onStart : function () {},
        onIdle : function () {}
      },
      // TV Stream
      block_streams_tv : {
        // note: redirect to http://block.streams.tv/
        host : ['firstrow.co', 'firstrows.ru', 'firstrows.tv', 'firstrows.org', 'firstrows.co', 'firstrows.biz', 'firstrowus.eu', 'firstrow1us.eu', 'firstsrowsports.eu', 'firstrowsportes.tv', 'firstrowsportes.com', 'justfirstrowsports.com', 'hahasport.me', 'wiziwig.ru', 'wiziwig.sx', 'wiziwig.to', 'wiziwig.tv', 'myp2p.biz', 'myp2p.tv', 'myp2p.la', 'myp2p.ec', 'myp2p.eu', 'myp2p.sx', 'myp2p.ws', 'myp2p.com', 'atdhe.ru', 'atdhe.se', 'atdhe.bz', 'atdhe.top', 'atdhe.to', 'atdhe.me', 'atdhe.mx', ' atdhe.li', 'atdhe.al'],
        onAlways : function () {
          Aak.setCookie("adb", 1); // prevent anti-adblock
          Aak.uw.open = function () {}; // prevent popup
          Aak.addStyle("#bannerInCenter, #hiddenBannerCanvas { display: none; }"); // hide ads
        }
      },
      buzina_xyz : {
        // note: disable refcontrol, used by firstrowsports
        // issue: https://github.com/reek/anti-adblock-killer/issues/1268
        // issue: https://github.com/reek/anti-adblock-killer/issues/1243
        // issue: https://github.com/reek/anti-adblock-killer/issues/889
        // issue: https://greasyfork.org/forum/discussion/8975
        // source: http://pastebin.com/8VTrkvS9
        host : ['buzina.xyz', 'farmet.info', 'rimladi.com', 'kitorelo.com', 'omnipola.com', 'porosin.co.uk', 'rimleno.com', 'simple4alls.com', 'arsopo.com'],
        onStart : function () {
          Aak.addStyle("#adsframe { height: 151px; }");
        },
        onIdle : function () {
          if (/buzina.xyz/.test(location.host)) { // keeps same host stream
            Aak.hasElement('iframe[src*=".php?hash="]', function (thisElement) {
              // http://arsopo.com/w2.php?hash=panda58
              // http://www.buzina.xyz/nana1v1.php?onthetop
              var parts = thisElement.src.split('/');
              parts[2] = Aak.rules.buzina_xyz.host.pop();
              Aak.log(thisElement, parts);
              thisElement.src = parts.join('/');

                /*	dmFyIG8gPSB7CgkJCSAgICAicGxheWxpc3QiIDogW3sKCQkJICAgICAgICAicHJvdmlkZXIiIDogInJ0bXAiLAoJCQkgICAgICAgICJ1cmwiIDogInBhbmRhMT9lJTNEMTQ2NTA3MDMyNiUyNnN0JTNEUHJ0SFl5dkJ6ZDlaZDdoRF9mUkhUZzExMTEzMCIKCQkJICAgICAgfQoJCQkgICAgXSwKCQkJICAgICJwbHVnaW5zIiA6IHsKCQkJICAgICAgInJ0bXAiIDogewoJCQkgICAgICAgICJ1cmwiIDogImZsb3dwbGF5ZXIucnRtcC0zLjIuMTEuc3dmIiwgCgkJCQkJLy8idXJsIjogImh0dHA6Ly9yZWxlYXNlcy5mbG93cGxheWVyLm9yZy9zd2YvZmxvd3BsYXllci5ydG1wLTMuMi4xMS5zd2YiLAoJCQkgICAgICAgICJuZXRDb25uZWN0aW9uVXJsIiA6ICJydG1wOi8vMTg1LjgyLjIxNS40NTozNTc5L3ZvZC8iCgkJCSAgICAgIH0sCgkJCSAgICAgICJjb250cm9scyIgOiB7CgkJCQkgICAgInVybCI6ICJodHRwOi8vcmVsZWFzZXMuZmxvd3BsYXllci5vcmcvc3dmL2Zsb3dwbGF5ZXIuY29udHJvbHMtMy4yLjE2LnN3ZiIsIC8vIGFkZGVkIGJlY2F1c2UgbWlzc2luZwoJCQkgICAgICAgICJwbGF5IiA6IGZhbHNlLAoJCQkgICAgICAgICJzY3J1YmJlciIgOiBmYWxzZQoJCQkgICAgICB9CgkJCSAgICB9LAoJCQkgICAgInBsYXllcklkIiA6ICJwbGF5ZXIiLAoJCQkgICAgImNsaXAiIDogewoJCQkgICAgICAidXJsIiA6ICJwYW5kYTE/ZSUzRDE0NjUwNzAzMjYlMjZzdCUzRFBydEhZeXZCemQ5WmQ3aERfZlJIVGcxMTExMzAiCgkJCSAgICB9CgkJCSAgfQoKCQkJICB2YXIgbmV3VXJsID0gcGFydHMuc2xpY2UoMCwgMykuam9pbignLycpICsgJy9mbG93cGxheWVyLTMuMi4xNi5zd2Y/Y29uZmlnPScgKyBlc2NhcGUoSlNPTi5zdHJpbmdpZnkobykpOwoJCQkgIC8vdmFyIG5ld1VybCA9ICdodHRwOi8vcmVsZWFzZXMuZmxvd3BsYXllci5vcmcvc3dmL2Zsb3dwbGF5ZXItMy4yLjE2LnN3Zj9jb25maWc9JyArIGVzY2FwZShKU09OLnN0cmluZ2lmeShvKSk7CgkJCSAgY29uc29sZS5sb2cobmV3VXJsKTsKCQkJICB0aGlzRWxlbWVudC5zcmMgPSBuZXdVcmw7
                */
              
            });
          } else { // skip anti-adblock
            Aak.removeElement('#adsframe');
            Aak.getElement('#remove-over').click();
          }
        }
      },
      allmyvideos_net : {
        // note: obfuscated
        // issue: https://github.com/reek/anti-adblock-killer/issues/274
        host : ['allmyvideos.net', 'amvtv.net'],
        onStart : function () {
          // skip fake play button
          Aak.setCookie('_favbt33', 1);
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
              if (window.removeOverlayHTML)
                window.removeOverlayHTML();
            };
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
        }
      },
      ndtv_com: {
          host: ['ndtv.com'],
          onIdle: function(){
              Aak.removeElement('#ndtv-message-users');
              var el = document.getElementById("ins_storybody");
              if (el !== null) {
                  el.style.removeProperty("display");
              }
          }
      },
      aajtak_com: {
          host: ['aajtak.intoday.in', 'indiatoday.intoday.in/'],
          onIdle: function(){
              Aak.removeElement('#adbocker_alt');
          }
      },
      videomega_tv : {
        // issue: https://github.com/reek/anti-adblock-killer/issues?q=videomega
        host : ['videomega.tv'],
        onStart : function () {
          if (/^\/view.php/.test(location.pathname)) {
            // prevent popunder
            Aak.setCookie('vid_mainpu', true);
            Aak.setCookie('vid_subpu', true);
            Aak.setCookie('vid_delay', true);
          }
        },
        onEnd : function () {
          // kill abc
          // fix bug on firefox: The video could not be loaded, either because the server or network failed or because the format is not supported.
          var script = Aak.hasScript('Please disable AdBlock Plugin to watch the video');
          if (script) {
            var source = script.innerHTML;
            var substring = source.substring(source.lastIndexOf('eval('), source.lastIndexOf(')') + 1);
            var deobfuscated = Aak.unpackScript(substring);
            var newScript = 'if('+deobfuscated.substring(deobfuscated.indexOf('true'));
            Aak.addScript(newScript);
          }
        }
      },
      flowplayer_antiadblock : {
        host : ['videofun.me', 'videobug.net', 'video44.net', 'play44.net', 'byzoo.org', 'playbb.me', 'videowing.me', 'videozoo.me', 'easyvideo.me', 'playpanda.net'],
        onEnd : function () {
        
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
            var Player = new Aak.player();
            Player.editing('#flowplayer_api', {
              setAttributes : {
                allowfullscreen : true
              }
            });
          }
        }
      },
      r3z : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1545
        // issue: https://github.com/reek/anti-adblock-killer/issues/1323
        // issue: https://github.com/reek/anti-adblock-killer/issues/884
        // source: http://pastebin.com/C159kevn
        host : ['cityam.com', 'computerworlduk.com', 'techworld.com'],
        onStart : function () {
          /* don't work with chrome
          Object.defineProperty(Aak.uw, '_r3z', {
            enumerable : true,
            writable : false,
            value : {}
          });
          */
        },
        onIdle : function () {
          Aak.uw.$("#r3z-wait").remove();
          Aak.uw.$(".r3z-hide").removeClass("r3z-hide");
          Aak.uw._r3z = null;
        }
      },
      google_jobrunner : {
        // issue: https://greasyfork.org/en/forum/messages/405
        // issue: https://github.com/reek/anti-adblock-killer/issues/1343
        // issue: https://github.com/reek/anti-adblock-killer/issues/1342
        // issue: https://github.com/reek/anti-adblock-killer/issues/831
        // issue: https://github.com/reek/anti-adblock-killer/issues/1274
        // issue: https://github.com/reek/anti-adblock-killer/issues/1262
        // issue: https://github.com/reek/anti-adblock-killer/issues/561
        host : ['next-episode.net', 'kingmaker.news', 'gamespowerita.com', 'todayidol.com', 'receive-a-sms.com', 'wakeupcallme.com', 'ringmycellphone.com', 'faqmozilla.org', 'thememypc.com'],
        onAlways : function () {
          Aak.uw.google_jobrunner = {};
        }
      },
      // fuckadbock customized
      fab_sports_fr : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1217
        // source: http://pastebin.com/SpEN5duS
        host : ['sports.fr'],
        onStart : function () {
          Aak.fakeFuckAdBlock('fabInstance', 'FabInstance');
        }
      },
      fab_europe1_fr : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1188
        // source: http://pastebin.com/ULe1vzQR
        host : ['europe1.fr'],
        onStart : function () {
          Aak.fakeFuckAdBlock('fabInstance', 'FabInstance');
        }
      },
      fab_newyorker_com : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1177
        host : ['newyorker.com'],
        onStart : function () {
          Aak.fakeFuckAdBlock('sniffAdBlock', 'SniffAdBlock');
        }
      },
      fab_wired_com : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1061
        // issue: https://greasyfork.org/fr/forum/discussion/8235
        // source: http://pastebin.com/Pq14v4FC
        host : ['wired.com'],
        onStart : function () {
          Aak.fakeFuckAdBlock('sniffAdBlock', 'SniffAdBlock');
        }
      },
      fab_mangasproject_domains : {
        // note: fuckadblock with custom instance name
        // note: also added abp rule
        // issue: https://github.com/reek/anti-adblock-killer/issues/1127
        // issue: https://greasyfork.org/fr/forum/discussion/4132
        // issue: https://github.com/reek/anti-adblock-killer/issues/858
        // source: https://mangas.zlx.com.br/mangazord_lib/js/lib/controllers/Leitor/Leitor.min.js
        host : ['mangasproject.com.br', 'mangasproject.net.br', 'mangas.zlx.com.br'],
        onStart : function () {
          Aak.fakeFuckAdBlock('mangasLeitorSlider', Aak.generateID());
        }
      },
      fab_qnimate_com : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/739
        // issue: https://github.com/reek/anti-adblock-killer/issues/705
        // note: fuckadblock customized
        host : ['qnimate.com'],
        onAlways : function () {
          Aak.uw.adBlockDetected = function () {};
        }
      },
      fab_eurotransport_de : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/858
        // note: fuckadblock with custom instance name
        host : ['eurotransport.de'],
        onStart : function () {
          Aak.fakeFuckAdBlock('antiAdBlock', Aak.generateID());
        }
      },
      fab_cadetect : {
        // by: Skr4tchGr3azyMonkiBallllllZzzz
        // issue: https://github.com/reek/anti-adblock-killer/issues/784
        // note: fuckadblock with custom instance name
        host : ['tzetze.it', 'beppegrillo.it', 'la-cosa.it'],
        onStart : function () {
          Aak.fakeFuckAdBlock('cadetect', 'CADetect');
        }
      },
      fab_agar_game : {
        // note: fuckadblock with custom instance name
        // issue: https://github.com/reek/anti-adblock-killer/issues/1257
        // issue: https://github.com/reek/anti-adblock-killer/issues/1135
        host : ['agario.sx', 'agarabi.com'],
        onStart : function () {
          Aak.fakeFuckAdBlock('agario_SX_ads', Aak.generateID());
        }
      },
      fab_filespace_com : {
        // note: fuckadblock with custom instance name
        // source: http://pastebin.com/YAS0As87
        // issue: https://github.com/reek/anti-adblock-killer/issues/1037
        host : ['filespace.com'],
        onStart : function () {
          Aak.fakeFuckAdBlock('fAB', Aak.generateID());
        }
      },
      fab_topserialy_sk : {
        // note: fuckadblock with custom instance name
        // source: http://pastebin.com/42tUQ9aV
        host : ['topserialy.sk'],
        onStart : function () {
          Aak.fakeFuckAdBlock('sratNaVas', Aak.generateID());
        }
      },
      fab_customized : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1455
        // issue: https://github.com/reek/anti-adblock-killer/issues/1657
        // source: http://pastebin.com/N42a5BjE
        host : ['epicurious.com', 'desktopsolution.org', 'indiatimes.com'],
        onStart : function() {
            Aak.addScript(function () {
            (function () {
              var _setAttribute = window.Element.prototype.setAttribute;
              window.Element.prototype.setAttribute = function (name, value) {
                if (name == 'class' && value.indexOf('text_ads') != -1) {
                  value = '';
                  console.info(this, 'fab intercepted :-)');
                }
                _setAttribute.call(this, name, value);
              };
            })();
          });
        }
      },
      d3xt3er_antiadblock : {
        // site: http://d3xt3r.com/anti-adblock
        // case: http://sport-show.fr/js/advertisement-AdBlock.js
        // case: http://www.2site.me/advertisement-AdBlock.js
        host : ['sport-show.fr', 'vipflash.net', '2site.me'],
        onStart : function () {
          Aak.addStyle("#blockblockA {visibility:invisible;display:none;} #blockblockA td {visibility:invisible;display:none;} #blockblockA td p {visibility:invisible;display:none;} #blockblockB {visibility:visible;display:block;}");
        }
      },
      adblock_notify : {
        // by: Skr4tchGr3azyMonkiBallllllZzzz
        // issue: https://github.com/reek/anti-adblock-killer/issues/1392
        // issue: https://github.com/reek/anti-adblock-killer/issues/1039
        // issue: https://github.com/reek/anti-adblock-killer/issues/592
        // issue: https://github.com/reek/anti-adblock-killer/issues/813
        host : ['gametransfers.com', 'winandmac.com', 'free-steam-giveaways.com', 'canalwp.com', 'alphahistory.com'],
        onAlways : function () {
          Aak.setCookie('anCookie', true);
          Aak.uw.anOptions = {};
        }
      },
      lutte_adblock : {
        // site: http://lutteadblock.blogspot.com/2014/11/le-script.html
        // issue: https://github.com/reek/anti-adblock-killer/issues/938
        // issue: https://github.com/reek/anti-adblock-killer/issues/580
        host : ['lewebtvbouquetfrancophone.overblog.com', 'webtv.bloguez.com', 'latelegratuite.blogspot.com', 'totaldebrid.org', '37.187.173.205'],
        onStart : function () {
          Aak.addBaitElement('div#my_ad_div');
          Aak.uw.jabbahud = function () {};
        }
      },
      antiblock : {
        // site: antiblock.org
        // note: customized
        // issue: 
        host : ['mybank.pl', 'rapidgrab.pl'],
        onStart : function () {
          Aak.addScript(function () {
            (function () {
              var _addEventListener = window.addEventListener;
              window.addEventListener = function (type, listener, options) {
                if (listener.toString().indexOf('.nextFunction()}') > -1) {
                  listener = function () {
                    console.info(['AntiAdbKiller', location.host, 'AntiBlock{customized}']);
                  };
                }
                _addEventListener.call(this, type, listener, options);
              };
            })();
          });
        }
      },
      blockadblock : {
        // site: blockadblock.com
        // note: random instance name
        // source: https://gist.github.com/Watilin/af75e0a2e82a2efb384bde9c7b41dec8
        // issues: https://github.com/reek/anti-adblock-killer/issues?q=label:BlockAdBlock
        // issue: https://greasyfork.org/forum/discussion/8273
        // issue: https://greasyfork.org/forum/discussion/7625
        host : ['blockadblock.com', 'linkdrop.net', 'revclouds.com', 'leporno.org', 'uploadshub.com', 'dasolo.org', 'fullstuff.net', 'zeusnews.it', 'cheminots.net', 'lolsy.tv', 'animes-mangas-ddl.com', 'noticiasautomotivas.com.br', 'darkstars.org', 'corepacks.com', 'naturalbd.com', 'coolsoft.altervista.org', 'openload.us', 'cda-online.pl', 'urbanplanet.org', 'mamahd.com', 'sadeempc.com', 'avmoo.com', 'thailande-fr.com', 'btaia.com', 'tusoft.org', 'hisse.net', 'europeup.com', 'nrj.fr', 'srnk.co', 'animmex.co', 'socketloop.com', 'crackhex.com', 'revealedtricks4u.com', 'pizzamaking.com', 'computerworm.net', 'yourlifeupdated.net'],
        onStart : function () {
          Aak.addScript(function () {
            (function () {
              var _setTimeout = window.setTimeout;
              window.setTimeout = function (fn, delay) {
                if (typeof fn === 'string' && fn.indexOf('bab_elementid') > -1) {
                  fn = function () {
                    console.info(['AntiAdbKiller', location.host, 'BlockAdBlock']);
                  };
                }
                _setTimeout.call(this, fn, delay);
              };
            })();
          });
        }
      },
      gpt_sp : {
        // by: Reek, Giwayume
        // note: when adblock detected inject new ads, redirect to http://tinyurl.com/zq2z5o6
        // issue: https://github.com/reek/anti-adblock-killer/issues/1636
        // issue: https://github.com/reek/anti-adblock-killer/issues/1596
        // issue: https://github.com/reek/anti-adblock-killer/issues/1297
        // issue: https://github.com/reek/anti-adblock-killer/issues/1144
        // issue: https://github.com/reek/anti-adblock-killer/issues/1542
        // source: http://pastebin.com/8Ajitfb2
        host : ['marketwatch.com', 'deadline.com', 'tweaktown.com', 'nypost.com', 'realgm.com', 'nasdaq.com'],
        onStart : function () {
          Aak.addStyle(".container--bannerAd, .col--ad { display: none; }");
          Aak.addScript(function () {
            (function () {
              // Giwayume 
              window._sp_ = window._sp_ || {};
              window._sp_.config = window._sp_.config || {};
              Object.defineProperty(window._sp_.config, "content_control_callback", {
                value : function () {},
                writable : false,
                configurable : false
              });
              // Reek
              var _addEventListener = window.EventTarget.prototype.addEventListener;
              window.EventTarget.prototype.addEventListener = function (type, listener, options) {
                if (type == 'sp.blocking') {
                  listener = function () {
                    console.info(['AntiAdbKiller', location.host, 'GPT{sp-blocking}']);
                  };
                }
                _addEventListener.call(this, type, listener, options);
              };
            })();
          });
        }
      },
      krux_asl : {
        // note: when adblock detected inject new ads
        // source: http://pastebin.com/0HD7N84i
        host : ['commentcamarche.net', 'journaldesfemmes.com', 'linternaute.com'],
        onBeforeScript : function () {
          return [{
              detected : 'Krux{asl}',
              contains : 'Asl.prototype.inject',
              external : false,
              remove : true
            }
          ];
        }
      },
      krux_adp : {
        // note: when adblock detected inject new ads
        // source: 
        host : ['fourchette-et-bikini.fr', 'meteocity.com'],
        onStart : function () {
          Aak.uw.adProtect = 1;
        }
      },	 
      phoenix_goyavelab : {
        // note: when adblock detected inject new ads
        // note: script anti-adblock obfuscated,
        // issue: https://github.com/reek/anti-adblock-killer/issues/
        // doc: http://tinyurl.com/gl3ghq2
        // source: http://pastebin.com/hsAmdSuf
        host : ['demo-phoenix.com', 'dpstream.net', 'gum-gum-streaming.com', 'jeu.info', 'sofoot.com', 'gaara-fr.com', 'gaytube.com', 'tuxboard.com', 'xstory-fr.com', 'hentaifr.net', 'filmstreaming-hd.com', 'filmvf.net', 'hentaihaven.org', 'narutoshippudenvf.com', 'thebadbuzz.com', 'manga-news.com', 'jeu.video'],
        onAlways : function () {
          //Aak.uw.__$dc = function () {};
          Aak.addStyle('body {visibility: visible;}');
        },
        onBeforeScript : function () {
          return [{ 
              detected : 'PhoenixGoyavelab',
              contains : 'PHENV',
              external : false,
              remove: true
            }
          ];
        }
      },
      ad_defend_uabp : {
        // note: when adblock detected inject new ads
        // source: http://pastebin.com/cFQCp80W
        host : ['tvspielfilm.de', 'finanzen.ch'],
        onBeforeScript : function () {
          return [{
              detected : 'AdDefend{UABPInject}',
              contains : 'UABPInject',
              external : false,
              remove : true
            }
          ];
        }
      },
      ad_defend_uab : {
        // note: when adblock detected inject new ads
        // userscript: https://openuserjs.org/scripts/schwarztee/AdDefend_Klatsche
        // userscript: https://gist.github.com/anonymous/a9b9956baf1d59a107c5
        // source: http://pastebin.com/1VyW0u9m, http://pastebin.com/AZqhRxWU
        // issue: https://github.com/reek/anti-adblock-killer/issues?q=label:AdDefend
        // pull: https://github.com/reek/anti-adblock-killer/pull/467
        host : ['watchgeneration.fr', 'turbo.fr', '24matins.fr', 'foot01.com', 'clubic.com', 'macg.co', 'begeek.fr', 'igen.fr', 'gamestar.de', 'focus.de', 'stern.de', 'sat1.', 'prosieben.', 'kabeleins.', 'sat1gold.', 'sixx.', 'prosiebenmaxx.', 'fem.com', 'the-voice-of-germany.', 'wetter.com', 'wetteronline.de', 'pcwelt.de', 'boerse-online.de', 'sportauto.de', 'auto-motor-und-sport.de', 'motor-klassik.de', '4wheelfun.de', 'autostrassenverkehr.de', 'lustich.de', 'spox.com', 'shz.de', 'transfermarkt.de', 'rp-online.de', 'motorradonline.de', '20min.ch', 'main-spitze.de', 'wormser-zeitung.de', 'lampertheimer-zeitung.de', 'wiesbdener-tagblatt.de', 'buerstaedter-zeitung.de', 'wiesbdener-kurier.de', 'rhein-main-presse.de', 'allgemeine-zeitung.de', 'ariva.de', 'spiegel.de', 'brigitte.de', 'dshini.net', 'gala.de', 'gamepro.de', 'gamona.de', 'pnn.de', 'promobil.de', 'sportal.de', 'webfail.com', 'computerbild.de', 'finanzen.net', 'comunio.de', 'medisite.fr'],
        onBeforeScript : function () {
          return [{
              detected : 'AdDefend{uabInject}',
              contains : 'uabInject',
              external : false,
              remove : true
            }
          ];
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

          // canRunAds
          // repo: https://github.com/MatthewGross/CanRunAds
          // note: use externall script "/js/ads.js" -> var canRunAds = true;
          Object.defineProperty(Aak.uw, 'canRunAds', {
            enumerable : true,
            writable : false,
            value : true
          });

          // canShowAds
          // issue: https://github.com/reek/anti-adblock-killer/issues/1197
          Object.defineProperty(Aak.uw, 'canShowAds', {
            enumerable : true,
            writable : false,
            value : true
          });

          // Adblocker Detecting Scripts: Method 2
          // gist: https://gist.github.com/irazasyed/3d247d3d121e781a3872
          // note: use externall script "/js/ads.js" -> isAdBlockActive = false;
          Object.defineProperty(Aak.uw, 'isAdBlockActive', {
            enumerable : true,
            writable : false,
            value : false
          });

          /*
          window.iHaveLoadedAds = true;
          var niceAdsCheck=true;
          adblock = false
          is_blocker = false;
           */
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
          // http://pastebin.com/d65zr37m
          /* can cause a bug
          var ads = document.getElementsByClassName('afs_ads');
          var ad = ads.length && ads[ads.length - 1];
          if (ad && ad.innerHTML.length === 0 || ad.clientHeight === 0) {
          Aak.addScript(function () {
          getElementsByClassNameNative = HTMLDocument.prototype.getElementsByClassName;
          HTMLDocument.prototype.getElementsByClassName = function (className) {
          if (className == 'afs_ads') {
          console.info(['AntiAdbKiller', location.host, 'AdblockBlocker', className]);
          var uniqid = Date.now();
          var bait = document.createElement("div");
          bait.innerHTML = '<br>';
          bait.className = uniqid;
          document.body.appendChild(bait);
          return document.getElementsByClassName(uniqid);
          }
          return getElementsByClassNameNative.apply(this, arguments);
          };
          });
          }
           */

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
          // demo: http://tinyurl.com/nhyhpzk
          var styles = document.querySelectorAll('style');
          for (var i = 0; i < styles.length; i++) {
            var style = styles[i];
            var cssRules = style.sheet.cssRules;
            for (var j = 0; j < cssRules.length; j++) {
              var cssRule = cssRules[j];
              var cssText = cssRule.cssText;
              var pattern = /^#([a-z0-9]{4,10}) ~ \* \{ display: none; \}/;
              if (pattern.test(cssText)) {
                var id = pattern.exec(cssText)[1];
                if (Aak.hasScript("w.addEventListener('load'," + id + ",false)")) {
                  Aak.aabs.abo2 = id;
                  break;
                }
              }
            }
          }

          var win = Aak.uw;
          for (var prop in win) {
            try {
              if (!/^webkit/.test(prop) && /^[a-z0-9]{4,12}$/i.test(prop) && win.hasOwnProperty(prop) && typeof win[prop] === 'object') {
                var method = win[prop];

                // Antiblock.org v3 & BetterStopAdblock
                // issue: https://github.com/reek/anti-adblock-killer/issues/833
                if (method.deferExecution &&
                  method.displayMessage &&
                  method.getElementBy &&
                  method.getStyle &&
                  method.insert &&
                  method.nextFunction) {
                  if (method.toggle) {
                    Aak.aabs.bsa = prop;
                    Aak.detected('BetterStopAdblock{dom}');
                  } else {
                    Aak.aabs.abo3 = prop;
                    Aak.detected('Antiblock3{dom}');
                  }
                  win[prop] = null; // kill instance
                }

                // BlockAdBlock
                // site: blockadblock.com
                // note: random instance name
                // source: https://gist.github.com/Watilin/af75e0a2e82a2efb384bde9c7b41dec8
                // issues: https://github.com/reek/anti-adblock-killer/issues?q=label%3ABlockAdBlock
                if (method.bab) {
                  Aak.detected('BlockAdBlock{dom}');
                  win[prop] = null; // kill instance
                }
              }
            } catch (e) {
              //console.log('error', prop)
            }
          }

          // Anti-Adblockers
          var aabs = {
            // Plugins WordPress
            NoAdBlock : '(/plugins/no-adblock/|/blockBlock/blockBlock.jquery.js)',
            BetterStopAdblock : '(/plugins/better-stop-adblock/|bsa-script-doctype.js|bsa-script-no-doctype.js)',
            AdBlockBlocker : '/plugins/wordpress-adblock-blocker/',
            AntiBlockBukssaAyman : '/plugins/anti-block/',
            BlockAlyzer : '/plugins/blockalyzer-adblock-counter/',
            AdBlockingDetector : '/plugins/ad-blocking-detector/',
            // Plugins Website
            Adworkmedia : '(adworkmedia|loxtk|contentlockingnetworks).com/gLoader.php',
            Adscendmedia : 'adscendmedia.com/gwjs.php',
            FuckAdBlock : '(/fuckadblock.js|/blockadblock.js)',
            jQueryAdBlock : '/jquery.adblock.js',
            jQueryAdblockDetector : '/jquery.adblock-detector.js',
            AdBlockAdvertisement : '/advertisement.js',
            AdBlockAdvert : '/advert.js',
            AdBlockAdvCustom : '/advertisement(.+).js',
            AdBlockAdframe : '/adframe.js',
            AntiAdBuster : '/anti-ad-buster.js',
            RTKAntiAdblock : '/blockcake.js',
            AdblockDetector : '/AdblockDetector/handler.min.js',
            jQueryAntiAdsBlock : '/jquery.antiadsblock.js',
            Adbuddy : '/js/adbuddy.min.js',
            AntiADsBlocker : '/aadb/script.js'
          };

          var scripts = document.scripts;
          for (var y = 0; y < scripts.length; y++) {
            var script = scripts[y];
            if (script.src) {
              for (var key in aabs) {
                if (new RegExp(aabs[key], 'i').test(script.src)) {
                  Aak.detected([key, script.src]);
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
              !/firebug/.test(insertedNode.innerHTML)) {
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
          var reMsgId = /^[a-z0-9]{4,10}$/i;
          var reTag1 = /^(div|span|b|i|font|strong|center)$/i;
          var reTag2 = /^(a|b|i|s|u|q|p|strong|center)$/i;
          var reWords1 = /ad blocker|ad block|ad-block|adblocker|ad-blocker|adblock|bloqueur|bloqueador|Werbeblocker|adblockert|&#1570;&#1583;&#1576;&#1604;&#1608;&#1603; &#1576;&#1604;&#1587;|блокировщиком/i;
          var reWords2 = /kapat|disable|désactivez|désactiver|desactivez|desactiver|desative|desactivar|desactive|desactiva|deaktiviere|disabilitare|&#945;&#960;&#949;&#957;&#949;&#961;&#947;&#959;&#960;&#959;&#943;&#951;&#963;&#951;|&#1079;&#1072;&#1087;&#1088;&#1077;&#1097;&#1072;&#1090;&#1100;|állítsd le|publicités|рекламе|verhindert|advert|kapatınız/i;

          // Antiblock.org (all version)
          if (insertedNode.parentNode &&
            insertedNode.id &&
            insertedNode.style &&
            insertedNode.childNodes.length &&
            insertedNode.firstChild &&
            !insertedNode.firstChild.id &&
            !insertedNode.firstChild.className &&
            reMsgId.test(insertedNode.id) &&
            reTag1.test(insertedNode.nodeName) &&
            reTag2.test(insertedNode.firstChild.nodeName)) {
            //Aak.log(insertedNode);

            // Kill audio message
            var audio = insertedNode.querySelector("audio[loop]");
            if (audio) {
              audio.pause();
              Aak.detected('Antiblock{audio}');
              Aak.removeElement(audio);
            }
            // Antiblock.org v2
            // demo: http://tinyurl.com/h3mwta4
            else if ((Aak.aabs.abo2 && insertedNode.id == Aak.aabs.abo2) ||
              (insertedNode.firstChild.hasChildNodes() && reWords1.test(insertedNode.firstChild.innerHTML) && reWords2.test(insertedNode.firstChild.innerHTML))) {
              Aak.detected('Antiblock2{insert}');
              Aak.removeElement(insertedNode);
            }
            // Antiblock.org v3
            // demo: http://tinyurl.com/qecfa7w
            // case: http://tinyurl.com/zbrlr3a /* fork */
            else if ((Aak.aabs.abo3 && insertedNode.id == Aak.aabs.abo3) ||
              (insertedNode.firstChild.hasChildNodes() && insertedNode.firstChild.firstChild.nodeName == 'IMG' && /^data:image\/png;base64/.test(insertedNode.firstChild.firstChild.src))) {
              Aak.uw[Aak.aabs.abo3] = null;
              Aak.detected('Antiblock3{insert}');
              Aak.removeElement(insertedNode);
            }
            // BetterStopAdblock
            // demo: http://tinyurl.com/js9zat4
            // source: http://pastebin.com/YimkrtKB
            // issue: http://tinyurl.com/zetgbtx
            else if (Aak.aabs.bsa && insertedNode.id == Aak.aabs.bsa) {
              Aak.uw[Aak.aabs.bsa] = null;
              Aak.detected('BetterStopAdblock{insert}');
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
      // issue: https://github.com/reek/anti-adblock-killer/issues/1466
      // issue: https://github.com/reek/anti-adblock-killer/issues/1263
      // issue: https://greasyfork.org/en/forum/discussion/8422/
      // issue: https://github.com/reek/anti-adblock-killer/issues/986
      // issue: https://github.com/reek/anti-adblock-killer/issues/857
      // issue: https://github.com/reek/anti-adblock-killer/issues/617
      // issue: https://greasyfork.org/fr/forum/discussion/5426
      // issue: https://github.com/reek/anti-adblock-killer/issues/419
      // issue: https://github.com/reek/anti-adblock-killer/issues/377
      var excludes = ["360.cn", "amazon.", "apple.com", "ask.com", "baidu.com", "bing.com", "bufferapp.com", "chatango.com", "chromeactions.com", "easyinplay.net", "ebay.com", "facebook.com", "flattr.com", "flickr.com", "ghacks.net", "google.", "imdb.com", "imgbox.com", "imgur.com", "instagram.com", "jsbin.com", "jsfiddle.net", "linkedin.com", "live.com", "mail.ru", "microsoft.com", "msn.com", "paypal.com", "pinterest.com", "preloaders.net", "qq.com", "reddit.com", "stackoverflow.com", "tampermonkey.net", "twitter.com", "vimeo.com", "wikipedia.org", "w3schools.com", "yahoo.", "yandex.ru", "youtu.be", "youtube.com", "xemvtv.net", "vod.pl", "agar.io", "pandoon.info", "fsf.org", "adblockplus.org", "plnkr.co", "exacttarget.com", "dolldivine.com", "popmech.ru", "calm.com"];
      var host = location.host;
      var excluded = false;
      excludes.forEach(function (exclude) {
        if (new RegExp(exclude).test(host)) {
          excluded = true;
          if (Aak.opts.logExcluded) {
            Aak.warn('Excluded');
          }
          return false;
        }
      });

      // Include domains
      // IsEventupported: http://tinyurl.com/oeez8c7
      if (!excluded) {

        var handlerEvents = function () {
          var rule = Aak.rules[name];

          rule.host.forEach(function (host) {
            // Check host
            if (new RegExp(host).test(location.host)) {

              // Native mode
              if (!Aak.useGM && Aak.isTopframe) {
                Aak.warn('Run natively.');
              }

              // Log rule used
              if (rule.host[0] != '.*?') {
                Aak.detected('rule', rule);
              }
              
              // Before DOM load
              if (rule.onStart) {
                rule.onStart();
              }
              // On all statements
              if (rule.onAlways) {
                rule.onAlways(); // start
                Aak.onEvent(window, 'DOMContentLoaded', rule.onAlways); // idle
                Aak.onEvent(window, 'load', rule.onAlways); // end
              }
              // Before Script Executed
              if (rule.onBeforeScript) {

                // options: contains, search, replace, override, remove, external
                var optionsBeforeScript = rule.onBeforeScript();
                if (typeof optionsBeforeScript == "object") {

                  var handlerBeforeScript = function (e, options) {
                    var isEvent = e instanceof window.Event;
                    var thisScript = (e.target || e.srcElement) || e;

                    options.forEach(function (o) { // hasAttribute
                      var src = o.external ? 'src' : 'innerHTML';
                      var search = new RegExp(o.contains, o.flags || '');

                      if (thisScript[src] && thisScript[src].length && search.test(thisScript[src])) {

                        // Stop script execution
                        if (isEvent) {
                          e.preventDefault();
                          e.stopPropagation();
                        }

                        // Create new script
                        var parent = thisScript.parentNode;
                        var newScript = document.createElement('script');

                        // Replace a part of the script
                        if (o.replace) {
                          newScript[src] = thisScript[src].replace(search, o.replace);
                          parent.replaceChild(newScript, thisScript);
                        } // Override script
                        else if (o.override) {
                          newScript[src] = o.override;
                          parent.replaceChild(newScript, thisScript);
                        } // Remove script
                        else if (o.remove) {
                          parent.removeChild(thisScript);
                        }
                        
                        if (o.detected) {
                          Aak.detected(o.detected);
                        }						

                        if (Aak.opts.logInterceptedScripts) {
                          Aak.log(src, o, thisScript, newScript);
                        }
                      }
                    });
                  };

                  // Browser supporting event beforescriptexecute
                  if ('onbeforescriptexecute' in document) {
                    Aak.onEvent(window, 'beforescriptexecute', function (e) {
                      handlerBeforeScript(e, optionsBeforeScript);
                    });
                  } else { // Browser not suppoting beforescriptexecute

                    var loadDocument = function (optionsBeforeScript) {
                      //if (document.referrer === '')
                      //return;

                      Aak.warn('onbeforescript-compatible');

                      // Stop loading
                      Aak.addScript('window.stop();'); // chrome/opera
                      //Aak.addScript('document.open();'); // firefox

                      // Get content
                      Aak.request({
                        url : location.href,
                        headers : {
                          "Referer" : document.referrer
                        },
                        onload : function (result) {
                          var html = result.responseText;
                          var parser = new window.DOMParser();
                          var doc = parser.parseFromString(html, "text/html");
                          var scripts = doc.scripts;

                          for (var i = 0; i < scripts.length; i++) {
                            var thisScript = scripts[i];
                            handlerBeforeScript(thisScript, optionsBeforeScript);
                          }

                          // Convert to string
                          html = doc.documentElement.outerHTML;

                          // Write new content to HTML document:
                          Aak.addScript('document.open(); document.write(unescape("' + window.escape(html) + '")); document.close();'); // chrome/opera
                          //Aak.addScript('document.write(unescape("' + escape(html) + '")); document.close();'); // firefox
                        }
                      });
                    };
                    loadDocument(optionsBeforeScript);
                  }
                }
              } // After Script Executed
              if (rule.onAfterScript) {
                if ('onafterscriptexecute' in document) { // Mozilla Firefox
                  Aak.onEvent(window, 'afterscriptexecute', rule.onAfterScript);
                }
              }
              // When DOM Load
              if (rule.onIdle) {
                if (!Aak.useGM) { // Native mode
                  rule.onIdle();
                } else {
                  //Aak.onEvent(window, 'DOMContentLoaded', rule.onIdle);
                  Aak.onEvent(window, 'DOMContentLoaded', rule.onIdle);
                }
              }
              // When Window Load
              if (rule.onEnd) {
                if (!Aak.useGM) { // Native mode
                  rule.onEnd();
                } else {
                  Aak.onEvent(window, 'load', rule.onEnd);
                }
              }
              // When DOM AttrModified
              if (rule.onAttrModified) {
                Aak.onEvent(window, 'DOMAttrModified', rule.onAttrModified, false);
              }
              // When DOM SubtreeModified
              if (rule.onSubtreeModified) {
                Aak.onEvent(window, 'DOMSubtreeModified', rule.onSubtreeModified, false);
              }
              // When DOM Elements are Inserted in Document
              if (rule.onInsert) {

                // Mutation Observer
                // doc: http://tinyurl.com/mxxzee4
                // support: http://tinyurl.com/nepn7vy
                if (typeof window.MutationObserver != 'undefined' ||
                  typeof WebKitMutationObserver != 'undefined') {

                  // Mutation Observer
                  var MutationObserver1 = window.MutationObserver || window.WebKitMutationObserver;

                  // Create an observer instance
                  var obs1 = new MutationObserver1(function (mutations) {
                      // We can safely use `forEach` because we already use mutation
                      // observers that are more recent than `forEach`. (source: MDN)
                      mutations.forEach(function (mutation) {
                        // we want only added nodes
                        if (mutation.addedNodes.length) {
                          Array.prototype.forEach.call(mutation.addedNodes, function (addedNode) {
                            if (Aak.opts.logInsertedNodes) {
                              Aak.log(addedNode);
                            }
                            rule.onInsert(addedNode);
                          });
                        }
                      });
                    });
                  // Observer
                  obs1.observe(document, {
                    childList : true,
                    subtree : true
                  });
                }
                // Mutation Events (Alternative Solution)
                // doc: http://tinyurl.com/op95rfy
                else {
                  Aak.onEvent(window, "DOMNodeInserted", function (e) {
                    if (Aak.opts.logInsertedNodes) {
                      Aak.log(e.target);
                    }
                    rule.onInsert(e.target);
                  }, false);
                }
              }
              // When DOM Elements are Removed in Document
              if (rule.onRemove) {

                // Mutation Observer
                // doc: http://tinyurl.com/mxxzee4
                // support: http://tinyurl.com/nepn7vy
                if (typeof window.MutationObserver != 'undefined' ||
                  typeof WebKitMutationObserver != 'undefined') {

                  // Mutation Observer
                  var MutationObserver2 = window.MutationObserver || window.WebKitMutationObserver;

                  // Create an observer instance
                  var obs2 = new MutationObserver2(function (mutations) {
                      // We can safely use `forEach` because we already use mutation
                      // observers that are more recent than `forEach`. (source: MDN)
                      mutations.forEach(function (mutation) {
                        // we want only removed nodes
                        if (mutation.removedNodes.length) {
                          Array.prototype.forEach.call(mutation.removedNodes, function (removedNode) {
                            if (Aak.opts.logRemovedNodes) {
                              Aak.log(removedNode);
                            }
                            rule.onRemove(removedNode);
                          });
                        }
                      });
                    });
                  // Observer
                  obs2.observe(document, {
                    childList : true,
                    subtree : true
                  });
                }
                // Mutation Events (Alternative Solution)
                // doc: http://tinyurl.com/op95rfy
                else {
                  Aak.onEvent(window, "DOMNodeRemoved", function (e) {
                    if (Aak.opts.logRemovedNodes) {
                      Aak.log(e.target);
                    }
                    rule.onRemove(e.target);
                  }, false);
                }
              }
              
              // Aak Events
              Aak.onEvent(window, 'detected', function (e) {
                Aak.info(['AntiAdbKiller', Aak.isTopframe ? 'topframe' : 'subframe', location.host, e.detail]);
              });
              
            }
          });
        };

        // Apply rules
        for (var name in Aak.rules) {
          if (Aak.rules.hasOwnProperty(name)) {
            handlerEvents(Aak, name);
          }
        }
      }
    }
  };

  Aak.initialize();

})(window);