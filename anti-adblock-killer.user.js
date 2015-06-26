// ==UserScript==
// @name Anti-Adblock Killer | Reek
// @namespace https://userscripts.org/scripts/show/155840
// @description Anti-Adblock Killer is a userscript aiming to circumvent many protections used on some websites that force the user to disable AdBlockers.
// @author Reek | reeksite.com
// @version 8.2
// @encoding utf-8
// @license https://creativecommons.org/licenses/by-nc-sa/4.0/
// @icon https://raw.github.com/reek/anti-adblock-killer/master/anti-adblock-killer-icon.png
// @homepage https://github.com/reek/anti-adblock-killer#anti-adblock-killer--reek
// @twitterURL https://twitter.com/antiadbkiller
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

  Donors: M. Howard, Shunjou, Charmine, Kierek93, G. Barnard, H. Young, Seinhor9, ImGlodar, Ivanosevitch, HomeDipo, R. Martin, DrFiZ, Tippy, B. Rohner, P. Kozica, M. Patel, W4rell, Tscheckoff, AdBlock Polska, AVENIR INTERNET, coolNAO, Ben, J. Park, C. Young, J. Bou, M. Cano, J. Jung, A. Sonino, J. Litten, M. Schrumpf

  Collaborators: InfinityCoding, Couchy, Dindog, Floxflob, U Bless, Watilin, @prdonahue, Hoshie, 3lf3nLi3d, Alexo, Crits, Noname120, Crt32, JixunMoe, Athorcis, Killerbadger, SMed79, Alexander255, Anonsubmitter, RaporLoLpro, Maynak00, Robotex, Vinctux, Blahx, MajkiIT

  Users: Thank you to all those who use Anti Adblock Killer, who report problems, who write the review, which add to their favorites, making donations, which support the project and help in its development or promote.

=======================================================
  Mirrors
=======================================================

  Github: http://tinyurl.com/mcra3dn
  Greasyfork: http://tinyurl.com/puyxrn4
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
  version : '8.2',
  scriptid : 'gJWEp0vB',
  homeURL : 'https://github.com/reek/anti-adblock-killer#anti-adblock-killer--reek',
  changelogURL : 'https://github.com/reek/anti-adblock-killer#changelog',
  donateURL : 'https://github.com/reek/anti-adblock-killer#donate',
  featuresURL : 'https://github.com/reek/anti-adblock-killer#features',
  reportURL : 'https://github.com/reek/anti-adblock-killer/wiki/Report-Guide',
  twitterURL : 'https://twitter.com/antiadbkiller',
  downloadURL : 'https://raw.githubusercontent.com/reek/anti-adblock-killer/master/anti-adblock-killer.user.js',
  subscribeURL : 'abp:subscribe?location=https://raw.github.com/reek/anti-adblock-killer/master/anti-adblock-killer-filters.txt&title=Anti-Adblock%20Killer%20|%20Filters%20for%20Adblockers',
  listURL : "https://raw.githubusercontent.com/reek/anti-adblock-killer/master/anti-adblock-killer-filters.txt",
  iconURL : 'https://raw.githubusercontent.com/reek/anti-adblock-killer/master/anti-adblock-killer-icon.png',
  excludes : ["360.cn", "amazon.", "apple.com", "ask.com", "baidu.com", "bing.com", "bufferapp.com", "chatango.com", "chromeactions.com", "easyinplay.net", "ebay.com", "facebook.com", "flattr.com", "flickr.com", "ghacks.net", "google.", "imdb.com", "imgbox.com", "imgur.com", "instagram.com", "jsbin.com", "jsfiddle.net", "linkedin.com", "live.com", "mail.ru", "microsoft.com", "msn.com", "paypal.com", "pinterest.com", "preloaders.net", "qq.com", "reddit.com", "reeksite.com", "stackoverflow.com", "tampermonkey.net", "tumblr.com", "twitter.com", "vimeo.com", "wikipedia.org", "w3schools.com", "yahoo.", "yandex.ru", "youtu.be", "youtube.com", "seansik.tv", "xemvtv.net", "vod.pl"],
  debug : {
    log : true,
    exclude : false,
    dump : false,
    inserted : false,
    removed : false
  },
  initialize : function () {
    // Debug
    if (Aak.debug.dump) {
      Aak.log(Aak);
      Aak.log(Aak.apiSupported());
      Aak.log(Aak.getScriptManager());
      Aak.log(Aak.getBrowser());
    }
    // Script Manager
    if (Aak.getScriptManager()) {
      Aak.registerCommands();
      Aak.update.automatic();
      Aak.listDetect();
      Aak.blockDetect();
    } else { // Native
      throw "Sorry! No Native support..";
    }
  },
  uw : unsafeWindow || window,
  $ : unsafeWindow.$ || unsafeWindow.jQuery || null,
  isTopWindow : !(window.top != window.self),
  ready : function (callback) {
    window.addEventListener('load', callback);
  },
  contains : function (string, search) {
    return string.indexOf(search) != -1;
  },
  log : function (data, method) {
    if (Aak.debug.log) {
      console = console || unsafeWindow.console;
      console[method || 'info']('Aak' + Aak.getVersion(), data);
    }
  },
  dumpDOM : function (delay) {
    setTimeout(function () {
      var array = [];
      var win = Aak.uw;
      for (var k in win) {
        var curr = win[k];
        if (typeof curr === 'object') {
          try {
            array.push(k + ': ' + JSON.stringify(curr));
          } catch (e) {
            console.log(k, typeof curr, curr);
          }
        }
      }
      document.body.innerHTML = '<textarea width="100%" height="500px">{' + array.join(',') + '}</textarea>';
    }, delay || 0);
  },
  apiSupported : function () {
    if (Aak.isTopWindow) {
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
        return false;
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
    if (Aak.getValue(name) == 'undefined') {
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
  go : function (url) {
    location.href = url;
  },
  refresh : function () {
    location.href = location.href;
  },
  reload : function () {
    location.reload(true);
  },
  registerCommands : function () {
    Aak.ready(function () {
      // Scriptish
      // note: No menu command is created when the user script is run in a iframe window.
      // doc: http://tinyurl.com/kvvv7yt
      if (Aak.isTopWindow && typeof GM_registerMenuCommand != 'undefined') {
        GM_registerMenuCommand(Aak.name + ' ' + Aak.getVersion() + ' Homepage', function () {
          location.href = Aak.homeURL;
        });
        GM_registerMenuCommand(Aak.name + ' ' + Aak.getVersion() + ' Update', Aak.update.manual);
      }
    });
  },
  notification : function (message, delay) {
    if (Aak.isTopWindow) {
      // css 
      // tool: http://csscompressor.com/
      // animate: http://daneden.github.io/animate.css/
	  // crimson: #DC143C
      Aak.addStyle('#aak-notice{font-family:arial;color:#000;font-variant:small-caps;font-size:14px;border:1px solid #999;border-radius:3px;box-shadow:1px 1px 12px #555;width:400px;max-width:400px;min-height:100px;top:0;left:0;line-height:1.2;z-index:999999;position:fixed;display:block;background-color:#fff;background-image:url(https://raw.githubusercontent.com/reek/anti-adblock-killer/master/anti-adblock-killer-icon.png);background-repeat:no-repeat;background-position:10px center;background-size:80px;margin:10px}#aak-notice-content{background-color:#fff;width:260px;min-height:70px;margin:20px 10px 10px 100px;text-align:left}.aak-notice-ok{float:right;bottom:10px;right:10px;position:absolute;font-size:12px;border:2px solid #DC143C;background-color:#DC143C;color:#FFF;padding:5px 10px;text-decoration:none;-webkit-transition:all .3s;transition:all .3s}.aak-notice-ok:hover{background-color:#FFF;color:#DC143C;text-decoration:none}#aak-notice-close{float:right;top:10px;right:10px;cursor:pointer;width:16px;height:16px;position:absolute}@-webkit-keyframes bounceInLeft{0%,60%,75%,90%,100%{-webkit-transition-timing-function:cubic-bezier(0.215,0.610,0.355,1.000);transition-timing-function:cubic-bezier(0.215,0.610,0.355,1.000)}0%{opacity:0;-webkit-transform:translate3d(-3000px,0,0);transform:translate3d(-3000px,0,0)}60%{opacity:1;-webkit-transform:translate3d(25px,0,0);transform:translate3d(25px,0,0)}75%{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}90%{-webkit-transform:translate3d(5px,0,0);transform:translate3d(5px,0,0)}100%{-webkit-transform:none;transform:none}}@keyframes bounceInLeft{0%,60%,75%,90%,100%{-webkit-transition-timing-function:cubic-bezier(0.215,0.610,0.355,1.000);transition-timing-function:cubic-bezier(0.215,0.610,0.355,1.000)}0%{opacity:0;-webkit-transform:translate3d(-3000px,0,0);transform:translate3d(-3000px,0,0)}60%{opacity:1;-webkit-transform:translate3d(25px,0,0);transform:translate3d(25px,0,0)}75%{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}90%{-webkit-transform:translate3d(5px,0,0);transform:translate3d(5px,0,0)}100%{-webkit-transform:none;transform:none}}.bounceInLeft{animation-name:bounceInLeft;animation-duration:1s;-webkit-animation-name:bounceInLeft;-webkit-animation-duration:1s}@-webkit-keyframes bounceOutLeft{20%{opacity:1;-webkit-transform:translate3d(20px,0,0);transform:translate3d(20px,0,0)}100%{opacity:0;-webkit-transform:translate3d(-2000px,0,0);transform:translate3d(-2000px,0,0)}}@keyframes bounceOutLeft{20%{opacity:1;-webkit-transform:translate3d(20px,0,0);transform:translate3d(20px,0,0)}100%{opacity:0;-webkit-transform:translate3d(-2000px,0,0);transform:translate3d(-2000px,0,0)}}.bounceOutLeft{animation-name:bounceOutLeft;animation-duration:1s;-webkit-animation-name:bounceOutLeft;-webkit-animation-duration:1s}@-webkit-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@keyframes fadeIn{0%{opacity:0}100%{opacity:1}}.fadeIn{-webkit-animation-name:fadeIn;-webkit-animation-duration:3s;animation-name:fadeIn;animation-duration:3s}');
      // remove
      Aak.removeElement('#aak-notice');
      setTimeout(function () {
        Aak.createElement({
          tag : 'div',
          id : 'aak-notice',
          class : 'bounceInLeft',
          html : '<img  id="aak-notice-close" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAIVBMVEXcFDwAAADcFDzcFDzcFDzcFDzcFDzcFDzcFDzcFDzcFDxaSbB2AAAACnRSTlP9AASnuEmihYQNEux+bAAAAHpJREFUCNc9jjEKwkAURB8YQX4326jlsri1bJkqtZVYWu4NbK30CN7gQxTBU5olkKkGhuE9dHjFsL8IPYqUNmLnYwy9PTlDSbAmQzdAJRwBVhElgCKkk/lbrQzQSSxT6H9Txkj2drfK1awk9w/bGXFD9yrlr5qGNGn8AcsRF4P77o1SAAAAAElFTkSuQmCC"/><div id="aak-notice-content">' + message + '</div>',
          to : 'body'
        });
        var close = function () {
          Aak.getElement('#aak-notice').className = 'bounceOutLeft';
          setTimeout(function () {
            Aak.removeElement('#aak-notice');
          }, 1e3);
        };
        // close (manually)
        Aak.getElement('#aak-notice-close').onclick = function () {
          close();
        };
        // close (automatically)
        setTimeout(function () {
          close();
        }, delay);
      }, 50);
    }
  },
  listDetect : function () {
    if (Aak.isTopWindow) {
      Aak.ready(function () {
        Aak.once(30, 'aak-checklist', function () {
          var elem = document.createElement("div");
          elem.id = "k2Uw7isHrMm5JXP1Vwdxc567ZKc1aZ4I";
          elem.innerHTML = "<br>";
          document.body.appendChild(elem);
          setTimeout(function () {
            if (elem.clientHeight) {
              Aak.notification('<p>It seems that you have not subscribed to <b>AakList (Anti-Adblock Killer )</b>. <a class="aak-notice-ok" href="' + Aak.subscribeURL + '" target="_blank">Subscribe</a></p>', 3e4);
              Aak.log("AakList not detected !" + elem.clientHeight, 'warn');
            } else {
              Aak.log("AakList detected !");
            }
          }, 5e3);
        });
      });
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
    // doc: http://tinyurl.com/2t7wbr
    settings.url = settings.url || '';
    settings.method = settings.method || 'GET';
    settings.headers = settings.headers || {};
    settings.timeout = settings.timeout || 2e4; // 20s

    if (typeof GM_xmlhttpRequest != 'undefined') {
      if (settings.data || settings.method == 'POST') {
        settings.method = 'POST';
        settings.data = Aak.serialize(settings.data || {});
        settings.headers = Aak.setProperty(settings.headers, {
          'X-Requested-With' : 'XMLHttpRequest',
          'Content-Type' : 'application/x-www-form-urlencoded'
        });
      }
      GM_xmlhttpRequest(settings);
    } else {
      throw "Sorry! No GM XMLHttpRequest support..";
    }
  },
  update : {
    manual : function () {
      if (Aak.isTopWindow) {
        Aak.notification('<p>Checking...</p>', 6e4);
        Aak.update.getRemote();
      }
    },
    automatic : function () {
      if (Aak.isTopWindow) {
        Aak.ready(function () {
          Aak.once(5, 'aak-checkupdate', function () {
            Aak.request({
              url : 'http://reeksite.com/php/get.php?checkupdate',
              data : {
                scriptid : Aak.scriptid,
                uuid : Aak.getUUID(),
                version : Aak.getVersion(),
                browser : Aak.getBrowser(),
                scriptmanager : Aak.getScriptManager()
              },
              onload : function (response) {
                try {
                  var res = response.responseText;
                  var json = JSON && JSON.parse(res);
                  if (json.update) {
                    Aak.downloadURL = json.url;
                    Aak.update.manual();
                  }
                } catch (e) {
                  Aak.log(response, 'error');
                }
              }
            });
          });
        });
      }
    },
    getRemote : function () {
      Aak.request({
        url : Aak.downloadURL,
        onload : function (response) {
          var html = '<p>Failed...</p>';
          var res = response.responseText;
          var status = response.status;
          if (status == 200) {
            var local = Aak.getVersion();
            var remote = Number(res.match(/@version\s+(\d+\.\d+)/)[1]);
            if (local < remote) {
              var html = '<p>Anti-Adblock Killer v' + remote + ' is available.</p><p class="aak-notice-center"><a class="aak-notice-ok" target="_blank" href="' + Aak.downloadURL + '">Install</a></p>';
            } else {
              var html = '<p>Anti-Adblock Killer is up to date.</p>';
            }
          }
          Aak.getElement('#aak-notice-content').innerHTML = html;
        }
      });
    }
  },
  autoReport : function (system, host, target) {
    var host = host || location.host;
    var target = target || '';
    if (Aak.getLocal(system) == "undefined") {
      Aak.setLocal(system, host); // save
      Aak.request({
        url : 'http://reeksite.com/php/get.php?autoreport',
        data : {
          system : system,
          host : host,
          target : target
        },
        onload : function (response) {
          var res = response.responseText;
          //Aak.log(res);
        }
      });
    }
    Aak.log(system);
  },
  setValue : function (name, value) {
    if (typeof GM_setValue !== "undefined") {
      GM_setValue(name, value);
    } else {
      throw "Sorry! No GM Storage support..";
    }
  },
  getValue : function (name) {
    if (typeof GM_getValue !== "undefined") {
      return GM_getValue(name) || 'undefined';
    } else {
      throw "Sorry! No GM Storage support..";
    }
  },
  setLocal : function (name, value) {
    // doc: http://tinyurl.com/8peqwvd
    if (typeof localStorage !== "undefined") {
      localStorage[name] = value;
    } else {
      throw "Sorry! No Web Storage support..";
    }
  },
  getLocal : function (name) {
    if (typeof localStorage !== "undefined") {
      return localStorage[name] || 'undefined';
    } else {
      throw "Sorry! No Web Storage support..";
    }
  },
  setSession : function (name, value) {
    // Doc: http://tinyurl.com/8peqwvd
    if (typeof sessionStorage !== "undefined") {
      sessionStorage[name] = value;
    } else {
      throw "Sorry! No Web Storage support..";
    }
  },
  getSession : function (name) {
    if (typeof sessionStorage !== "undefined") {
      return sessionStorage[name] || 'undefined';
    } else {
      throw "Sorry! No Web Storage support..";
    }
  },
  setCookie : function (name, value, time) {
    var time = (time) ? time : 365 * 24 * 60 * 60 * 1000; // 1 year
    var expires = new Date();
    expires.setTime(new Date().getTime() + time);
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + expires.toGMTString() + ";path=/";
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
        location.href = Aak.reportURL;
      } else {
        location.href = elem.href;
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
    // note: Scriptish no support
    if (document.head) {
      if (/\.js$/.test(code)) { // External
        document.head.appendChild(document.createElement('script')).src = code;
      } else { // Inline
        document.head.appendChild(document.createElement('script')).innerHTML = code.toString().replace(/^function.*{|}$/g, '');
      }
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
  addElement : function (str) { // ex: div.ads or span#ads
    var split = str.replace('.', ':className:').replace('#', ':id:').split(':');
    Aak.addScript('function() { document.documentElement.appendChild(document.createElement("' + split[0] + '")).' + split[1] + ' = "' + split[2] + '"; document.querySelector("' + str + '").innerHTML = "<br>"; }');
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
      Aak.log('Error ' + elem + ' not removed !');
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
      case "to":
        var elem = Aak.getElement(props[name]);
        elem.appendChild(node);
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
      default:
        node[name] = props[name];
      }
    }
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
          node[name] = props[name];
        }
      }
    }
  },
  addStyle : function (css) {
    var css = css.replace(/;/g, ' !important;');
    if (typeof GM_addStyle != 'undefined') {
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
      //Aak.log(this);
    },
    log : function (a) {
      Aak.log('Aak.player ' + a || '' + '');
      Aak.log(this);
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
      //
      this.swfvars = [this.attributes.src, this.flashvars.str].join('?');
      switch (this.options.output) {
      case 'iframe':
        this.out.node = document.createElement('iframe');
        this.out.node.setAttribute('src', this.swfvars);
        this.out.node.setAttribute('width', this.attributes.width + 10);
        this.out.node.setAttribute('height', this.attributes.height + 10);
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
        this.out.node.innerHTML = '<strong>Video not playing ? <a href="' + this.attributes.src + '" download>Download file</a> instead.</strong>';
        for (var name in this.attributes) {
          this.out.node.setAttribute(name, this.attributes[name]);
        }
        /*
        if (this.attributes.autoplay) { // fix bug duplicate playing on firefox/chrome
        this.out.node.onloadstart = function () {
        this.play();
        };
        }*/
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
      // support: http://tinyurl.com/mjavxdr
      // mp4, m4v, f4v, mov, flv, webm, aac, mp3, vorbis, hls, rtmp, youtube, aac, m4a, f4a, mp3, ogg, oga

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
    flowplayer : function (id, setup) {
      // Flowplayer (flash)
      // support: mp4, flv, f4v, m4v, mov
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

	  setup.autostart = setup.autostart || false;
      setup.height = setup.height || this.attributes.height;
      setup.width = setup.width || this.attributes.width;
      setup.type = this.getMime(setup.file || setup.src);
	  setup.id = setup.id || Aak.generateID();

      var html = '<html><head><link href="http://vjs.zencdn.net/4.8/video-js.css" rel="stylesheet"><script src="http://vjs.zencdn.net/4.8/video.js"></script></head><body><video id="' + setup.id + '" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" width="' + setup.width + '" height="' + setup.height + '"></video><script>videojs("' + setup.id + '",{techOrder:["flash","html5"],autoplay:' + setup.autostart + ',sources:[{type:"' + setup.type + '",src:"' + setup.file + '"}]})</script></body></html>';
      this.attributes.src = "data:text/html;charset=utf-8," + escape(html);
      this.options.output = 'iframe';
      this.insert();
    },
    jwplayer6 : function (id, setup) {
      // Jwplayer 6 (flash)
      // Config: http://tinyurl.com/lcygyu9
      // Iframe: http://tinyurl.com/86agg68

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
          Aak.notification('<p>You need install VLC Web Plugin ! <a class="aak-notice-ok" href="http://www.videolan.org/vlc/" target="_blank">Install</a></p>', 30000);
          return false;
        }
      }
      this.options.output = 'embed';
      this.insert();
    },
    html5 : function (id, setup) {
      /* Video Tag (html5)
      note:
      https://html5rocks.com/en/tutorials/video/basics/
      http://www.w3schools.com/tags/tag_video.asp
      test:
      https://www.joomlacontenteditor.net/images/big_buck_bunny.flv
      http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4
      http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm
      http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv
       */

      this.get(id);
      this.attributes = {};
      this.attributes.src = setup.file || setup.src;
      this.attributes.id = this.attributes.name = Aak.generateID();
      this.attributes.height = setup.height || this.in.node.clientHeight || "100%";
      this.attributes.width = setup.width || this.in.node.clientWidth || "100%";
      this.attributes.type = this.getMime(this.attributes.src);
      this.attributes.controls = 'controls';
      //this.attributes.preload = 'none';
      if (setup.autostart || setup.autoplay) {
        //this.attributes.autoplay = 'autoplay'; bug duplicated playing
      }
      this.options.output = 'html5';
      this.insert();
    }
  },
  rules : {
    // --------------------------------------------------------------------------------------------
    // Specific
    // --------------------------------------------------------------------------------------------
    blogspot : { // No Country Redirect (NCR)
      host : ['.blogspot.'],
      onStart : function () {
        // doc: http://tinyurl.com/odncet7
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
        Aak.addStyle("#gAds { height: 1px; width: 1px; }");
      }
    },
    uptobox_uptostream : {
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
    notre_planete_info : {
      host : ['notre-planete.info'],
      onStart : function () {
        Aak.addStyle("#testpub { height: 51px; }");
        Aak.addStyle("#pub_meh { height: 51px; }");
      },
      onIdle : function () {
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
    multiup_org : {
      host : ['multiup.org', 'streamupload.org'],
      onStart : function () {
        Aak.addStyle("#crazy { height: 3px; }");
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
    eveskunk_com : {
      host : ['eveskunk.com'],
      onStart : function () {
        // Disable Antiblock 1
        //Aak.addElement('div.adsbygoogle'); // dont work
        // + abp rule eveskunk.com#@#.adsbygoogle
        Aak.addStyle(".adsbygoogle { height: 5px; }");
        // Disable Antiblock 2
        Aak.addStyle(".container .row .col-lg-12 div[id] { height: 35px; }");
      },
      onIdle : function () {
        // Disable Antiblock 1
        document.querySelector('.adsbygoogle').innerHTML = '<br>';
        // Disable Antiblock 2
        Aak.uw.trackAdBlocking = function () {};
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
    tzetze_it : {
      host : ['tzetze.it'],
      onStart : function () {
        // + abp rule
        Aak.addStyle('#TzeTze_728x90 { height: 5px;}');
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
    bait_tester : {
      host : ['osoarcade.com', 'd3brid4y0u.info', 'fileice.net', 'nosteam.ro', 'openrunner.com', 'easybillets.com', 'spox.fr', 'yovoyages.com', 'tv3.co.nz', 'freeallmusic.info', 'putlocker.com', 'sockshare.com', 'dramapassion.com', 'yooclick.com', 'online.ua'],
      onStart : function () {
        Aak.addElement('div#tester');
      }
    },
    bait_add : {
      host : ['filecom.net', 'upshare.org', 'skippyfile.com', 'mwfiles.net', 'up-flow.org'],
      // @@||filecom.net/advertisement.js
      // document.write('<div id="add"></div>');
      onStart : function () {
        Aak.addElement('div#add');
      }
    },
    bait_adpbtest : {
      // @@||teknogods.com/advert.js
      // <div id="adpbtest">;
      host : ['leaguesecretary.com', 'teknogods.com', 'hellsmedia.com'],
      onStart : function () {
        Aak.addElement('div#adpbtest');
      }
    },
    bait_adtester : {
      host : ['freesportsbet.com', 'sportsplays.com'],
      onStart : function () {
        Aak.addElement('div#ad-tester');
      }
    },
    tgo_tv_com : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/303
      host : ['tgo-tv.com'],
      onStart : function () {
        Aak.addStyle("#adb, #bannerad1, .load_stream { display: none; }");
        Aak.addElement('div#tester');
      },
      onEnd : function () {
        Aak.uw.threshold = 1000;
        Aak.removeElement('.chat_frame'); // bug reload iframe
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
    stream4free_eu : {
      host : ['stream4free.eu'],
      onStart : function () {
        // +abp alt solution
        Aak.addElement('div#jpayday');
        Aak.uw.jpayday_alert = 1;
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
    totaldebrid_org : {
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
    planetatvonlinehd_blogspot : {
      host : ['planetatvonlinehd.blogspot.'],
      onAlways : function () {
        Aak.uw.jQAntiAdsBlock = function () {
          return false
        };
      }
    },
    cwtv_com : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/340
      // code: http://pastebin.com/J7e73MpJ
      host : ['cwtv.com'],
      onAlways : function () {
        Aak.uw.CLAPI = undefined;
      },
      onBeforeScript : function (e) {
        if (Aak.contains(Aak.innerScript(e), 'CLAPI.IsAdBlocking(function(isAdBlocking, hasAdBlocked)')) {
          Aak.stopScript(e);
        }
      }
    },
    pregen_net : {
      host : ['pregen.net'],
      onStart : function () {
		// skip page info
        Aak.setCookie('pginfo', 1);
      }
    },	
    onvasortir_com : {
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
        Aak.uw.exec_sp = function () {};
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
    tek_no : {
      host : ['tek.no'],
      onAlways : function () {
        Aak.uw.sas = {};
      }
    },	
    apkmirror_com : {
      host : ['apkmirror.com'],
      onAlways : function () {
        Aak.uw.doCheck = function () {};
      }
    },		
    anizm_com : {
      host : ['anizm.com'],
      onAlways : function () {
        Aak.uw.stopAdBlock = {};
      }
    },
    mangasproject_com : {
      // issue: http://tinyurl.com/ncezaan
      host : ['mangasproject.com'],
      onAlways : function () {
        Aak.uw.jLoader.Leitor.data.adBlock = false;
      }
    },
    slideplayer_org : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/296
      host : ['slideplayer.org'],
      onAlways : function () {
        Aak.uw.is_adblock_detect = function () {};
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
      onIdle : function () {
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
      onIdle : function () {
        //Aak.uw.is_loaded = true;
        //Aak.removeElement('.box-error');
      }
    },
    linkcrypt_ws : {
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
      host : ['eventosppv.me'],
      onIdle : function () {
        Aak.removeElement('#nf37');
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
      host : ['luxyad.com'],
      onIdle : function () {
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
      onIdle : function () {
        Aak.setCookie('ad_locked', 1);
      }
    },
    bigdownloader_com : {
      host : ['bigdownloader.com'],
      onIdle : function () {
        Aak.removeElement('#anti_adblock');
      }
    },
    gametrailers_com : {
      host : ['gametrailers.com'],
      onIdle : function () {
        Aak.removeElement('#ad_blocking');
      }
    },
    ad_block_test : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/279
      host : ['scan-mx.com', 'onepiece-mx.net'],
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
      onIdle : function () {
        Aak.removeElement('#AdBlocked');
      }
    },
    moondoge_co_in : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/384
      // issue: https://github.com/reek/anti-adblock-killer/issues/232
      // issue: https://github.com/reek/anti-adblock-killer/issues/233
      // issue: https://github.com/reek/anti-adblock-killer/issues/236
      host : ['moondoge.co.in', 'moonliteco.in', 'moonbit.co.in', 'faucet.bitcoinzebra.com'],
      onIdle : function () {
        Aak.removeElement('#AB, #E442Dv, #eCC5h');
      }
    },
    bitcoiner_net : {
	  // issue: 
      host : ['bitcoiner.net', 'litecoiner.net'],
      onStart : function () {
        Aak.addElement('div#tester');
        Aak.addElement('div#ad-top');
      }
    },
    bitcoins_nx_tc : {
      host : ['freebitcoins.nx.tc', 'getbitcoins.nx.tc'],
      onAlways : function () {
        Aak.uw.ad_block_test = function () {
          return false
        };
      }
    },
    freecoins4_me : {
      host : ['freecoins4.me'],
      onAlways : function () {
        Aak.uw.check = function () {
          return false
        };
      }
    },
    adultmult_tv : { // antiblock.org
      // issue: https://github.com/reek/anti-adblock-killer/issues/366
      host : ['adultmult.tv'],
      onAlways : function () {
        Aak.uw.ee4e = {};
      }
    },
    turkanime_tv : { 
      // issue: http://tinyurl.com/n6mzdxs
      host : ['turkanime.tv'],
      onAlways : function () {
        Aak.uw.BlokKontrol = {};
      }
    },
    turkanime_tv : { 
      // issue: http://tinyurl.com/n6mzdxs
      host : ['turkanime.tv'],
      onAlways : function () {
        Aak.uw.adblockblock = function (){};
      }
    },	
    hackintosh_zone : {
	  // issue: 
      // issue: https://greasyfork.org/fr/forum/discussion/3786/
      host : ['hackintosh.zone'],
      onStart : function () {
        Aak.addStyle("#impactradious, #topframead { height: 5px; }");
        Aak.addElement('div#impactradious');
        Aak.addElement('div#topframead');
      },
      onAlways : function () {
        Aak.uw.writeHTMLasJS = function () {};
      }
    },
    wtfbit_ch : {
	  // issue: 
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
    vipleague_domains : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/290
      // issue: https://github.com/reek/anti-adblock-killer/issues/297
      // issue: https://github.com/reek/anti-adblock-killer/issues/301
      // issue: https://github.com/reek/anti-adblock-killer/issues/273
      // issue: https://github.com/reek/anti-adblock-killer/issues/271
      // issue: https://github.com/reek/anti-adblock-killer/issues/322
      // issue: https://github.com/reek/anti-adblock-killer/issues/326
      // +abp rule alt solution
      host : ['vipleague.ws', 'vipleague.tv', 'vipleague.se', 'vipleague.me', 'vipleague.co', 'vipleague.sx', 'vipleague.ch', 'vipbox.tv', 'vipbox.co', 'vipbox.sx', 'vipboxsa.co', 'strikeout.co', 'homerun.re'],
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
    canalplus_fr : {
      // issue:
      host : ['canalplus.fr'],
      onEnd : function () {}
    },
    dailybitcoins_org : {
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
    psarips_com : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/153
      host : ['psarips.com'],
      onStart : function () {
        Aak.addElement('div#advert');
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
      host : ['tny.cz','pasted.co'],
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
          Aak.addElement('div#banner');
        } else { // Website
          // Solution 1
          Aak.addElement('div.banner_topo');
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
      host : ['gamestar.de'],
      onAlways : function () {
        // if removing of functions/objects does not work
        // those 2 vars avoid loading the ads
        Aak.uw['UABPtracked']=true; 
        Aak.uw['UABPPercent']=-1;
        // kill functions/objects of UABP
        for (var key in Aak.uw) {
           element = Aak.uw[key];
            if (typeof element == 'function' && /^UABP.*$/.test(key)) {
                console.log("wird blockiert:" + key);
                element = function () {};
            } else if (typeof element == 'object') {
              var objectsWindow=Aak.uw[key];
              for(var i in objectsWindow){
                if (/^UABP.*$/.test(i)) {
                  console.log("wird blockiert object: " + i);
                  objectsWindow[i] = null;
                }
              }
            }
        }
      },
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
    lachainemeteo_com : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/245
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
          Aak.notification('<p>You must subscribe to <b>AakList (Anti-Adblock Killer )</b>.<a class="aak-notice-ok" href="' + Aak.subscribeURL + '" target="_blank">Subscribe</a></p>', 2e4);
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
          Aak.notification('<p>You must subscribe to <b>AakList (Anti-Adblock Killer )</b>.<a class="aak-notice-ok" href="' + Aak.subscribeURL + '" target="_blank">Subscribe</a></p>', 2e4);
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
    kissanime_Kisscartoon : {
	  // issue: https://github.com/reek/anti-adblock-killer/issues/381
      // issue: https://github.com/reek/anti-adblock-killer/issues/302
      // issue: https://github.com/reek/anti-adblock-killer/issues/257
      // issue: https://github.com/reek/anti-adblock-killer/issues/178
      // issue: https://github.com/reek/anti-adblock-killer/issues/196
      // issue: https://github.com/reek/anti-adblock-killer/issues/56
      host : ['kissanime.com','kisscartoon.me'],
      onStart : function () {
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
          Aak.removeElement('iframe[id^="adsIfrme"], .divCloseBut');
          Aak.log('Solution 2');
        } //Solution 3
        else if (divContentVideo) {

          var divDownload = document.querySelector('#divDownload').cloneNode(true);
          //Aak.log(divDownload,divContentVideo);

          setTimeout(function () {
            divContentVideo.innerHTML = '';
            Aak.uw.DoHideFake();
            divContentVideo.appendChild(divDownload);
            Aak.removeElement('iframe[id^="adsIfrme"], .divCloseBut');
            Aak.log('Solution 3');
          }, 5500);
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
      // https://github.com/reek/anti-adblock-killer/issues/300
      host : ['biztok.pl', 'wp.tv', 'wp.pl', 'sportowefakty.pl', 'kafeteria.tv', '.wrzuta.pl', 'pudelek.tv', 'komediowo.pl', 'sfora.pl', 'autokrata.pl', 'sportfan.pl', 'wawalove.pl', 'hotmoney.pl', 'aleseriale.pl', 'babol.pl', 'snobka.pl', 'nocoty.pl', 'money.pl'],
      onIdle : function () {
        //Aak.dumpDOM(3000);
        setTimeout(function () {

          var replacePlayerWP = function (mid, player) {
            /* Request
            http://get.wp.tv/?mid=1661056
            http://wp.tv/player/mid,1661056,embed.json
            http://get.wp.tv/?f=2896462.1426329056904.l.webm&rnd=1
             */
            Aak.request({
              url : 'http://wp.tv/player/mid,' + mid + ',embed.json',
              onload : function (result) {
                try {
                  var res = result.responseText;
                  var obj = JSON.parse(res);
                  Aak.player.html5(player, {
                    autostart : true,
                    file : obj.clip.url[0].url
                  });
                } catch (e) {
                  console.log(result, 'error', player);
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
                  Aak.player.html5(elem, {
                    autostart : autostart,
                    file : obj.url[0].url
                  });
                } catch (e) {
                  console.log(result, 'error', player);
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
                  Aak.player.html5(elem, {
                    autostart : autostart,
                    file : obj.clip.url[0].url[0]
                  });
                } catch (e) {
                  console.log(result, 'error', player);
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
			  //console.log(player, parent, script, titles)
		
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
              }
              else if (/lid=/.test(script.innerHTML)) {
                // wiadomosci.wp.pl: http://tinyurl.com/pdwx7na
			    // http://wp.tv/player/lid,1354,ts,1432569945076,livestream.json
			    // http://get.wp.tv/?lid=1354
                var lid = script.innerHTML.match(/lid[=,]([0-9]+)/);
				replacePlayerlivestream(lid, player, true);
				Aak.log('livestream lid');
              }
              else if (titles.length && /mid/.test(titles.href)) {
                // sportowefakty.pl: http://tinyurl.com/l6zabcx
                var mid = titles[i].href.match(/mid[=,]([0-9]+)/);
				Aak.log('title.href')
              }
              else if (parent.id) {
                if (parent.dataset.url) {
                  // wp.tv: http://tinyurl.com/pzde29t
                  var mid = parent.dataset.url.match(/mid[=,]([0-9]+)/);
				  Aak.log('parent.dataset.url')
                } else {
                  // kafeteria.tv: http://tinyurl.com/nofp58a
                  var mid = parent.innerHTML.match(/mid[=,]([0-9]+)/);
				  Aak.log('parent.innerHTML')
                }
              }
              else if (script && script.tagName == 'SCRIPT') {
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

        }, 3e3);
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
      // issue. https://github.com/reek/anti-adblock-killer/issues/192
      // test: http://tinyurl.com/mcwtz27
      // source: http://tinyurl.com/ohbvz4r
      // proxy: http://www.proxy.xmc.pl
      host : ['tvn.pl', 'tvn24.pl', 'player.pl'],
      onEnd : function () {
        Aak.onElement('#detailEpisode', function () {
          /*
          var videoURL = 'http://n-2-4.dcs.redcdn.pl/dcs/o2/tvnplayer/vod/14_400_20029_0011/TV_MP4/4c407d87-5d77-4778-81e3-dbc560bbc19b/tv_mp4_2928000.mp4?salt=391F25D2E95781550E7A3BA1730AF412&token=8CC29AECB565397B692D4BDE4B37048742B3BD892212F8B9F1DE0D40D8662C775C82311B35074D38BC4EF8FFDCB15067610BB855955359B8F06C629C44485A42DBFEDAF17A812A67F2ECF4B7996A9B73C754E1089DB4A81BDBF798C23B5EBEEF1C6FA6668FB290EA77013C67FEB0DD5005F90D890ED6B76675487EDB7999CE3C9316D6237B009CC97819E798FE760A0B';
          Aak.player.html5('#detailEpisode', {
          autostart : true,
          file : videoURL
          });
           */

          var sp = document.location.href.split(/[.,]/);
          var id = sp[sp.length - 2];
          // http://player.pl/api/?platform=ConnectedTV&terminal=Samsung&format=json&v=2.0&authKey=ba786b315508f0920eca1c34d65534cd&type=episode&id=34555&sort=newest&m=getItem&deviceScreenHeight=1080&deviceScreenWidth=1920
          Aak.request({
            url : '/api/?platform=ConnectedTV&terminal=Samsung&format=json&v=2.0&authKey=ba786b315508f0920eca1c34d65534cd&type=episode&id=' + id + '&sort=newest&m=getItem&deviceScreenHeight=1080&deviceScreenWidth=1920',
            onload : function (result) {
              var res = result.responseText;
              var o = JSON.parse(res);
              console.log(o)
              var standardURL = o.item.videos.main.video_content[0].url;
              Aak.request({
                url : standardURL,
                onload : function (result) {
                  var videoURL = result.responseText;
                  Aak.player.html5('#detailEpisode', {
                    autostart : true,
                    file : videoURL
                  });
                }
              });
            }
          });
        });
      }
    },
    // France
    playtv_fr : { // research solution
      host : ['play.tv', 'playtv.fr'],
      onAlways : function () {},
      onEnd : function () {
        //Aak.DOMstringify(3000);
        //Aak.stopRedirect();
        //Aak.confirmLeave();

        // http://playtv.fr/television/tooltip/arte/
        /*
        http://playtv.fr/player/play/?channel=bfm-tv&language=fr&format=flash&bitrate=0
        rtmpe://37.187.254.104:80/origin01/?files=800|bfm-tv_800,300|bfm-tv_300&dar=ws&t=18ddf1b11ff0fbb24e3ecbecf4748ff821784cd760dd9e1a9ec2ae552e15361cae296b29d00d72a7f56df77544a62c51176a227b5c5c93f30d7050591e8c8271454ccaa94fd2156d0bb32ae87c5c6344d30d84e588a7e7b87cd1ed4c6c728eb9206e06b02187169ba4f07e8a7c14ad15823c0dd860dd286a


      ;(function(win, doc, app) {
        app.Data = app.Data || {};
        app.Data.Remote = app.Data.Remote || {};
        app.Data.Remote.channel = {"alias":"bfm-tv","id":17,"name":"BFM TV","images":{"mini":"\/\/static.playtv.fr\/img\/tv_channels\/17_mini.png","small":"\/\/static.playtv.fr\/img\/tv_channels\/17_small.png","medium":"\/\/static.playtv.fr\/img\/tv_channels\/17_medium.png","source":"\/\/static.playtv.fr\/img\/tv_channels\/17_source.png"},"has_programs":true,"is_adult":false,"has_social_tv":true,"streaming_source":"internal"};

        })(window, window.document, window.ptv || (window.ptv = {}));
         */
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
    sat1_de : { // research solution
      host : ['sat1.de', 'sat1.ch'],
      onStart : function () {},
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
      host : ['myspass.de'],
      onIdle : function () {
        // test: http://tinyurl.com/lto9pyd
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
              Aak.player.html5('#player', {
                autostart : true,
                file : file
              });
              
			  
              /*
              // Replace player
              Aak.player.flowplayer('#player', {
              clip : {
              autoPlay : true,
              url : file
              }
              });
               */

              /*
              // Replace player
              Aak.player.jwplayer6('#player', {
              autostart : true,
              file : file
              });
               */

              /*
              // Replace player
              Aak.player.plugin('#player', {
              autostart : true,
              file : file
              });
               */
              
			  /*
              // Replace player
              Aak.player.videojs('#player', {
                autostart : true,
                file : file
              });
              */
			   
              /*
              // Replace player
              Aak.player.external('#jwplayer6','player', {
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
                console.log(player, obj.streamUrls.mp4)
                Aak.player.html5(player, {
                  autostart : false,
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
    youwatch_org : {
      // issue: https://github.com/reek/anti-adblock-killer/issues/308#issuecomment-93075240
      host : ['youwatch.org'],
      onStart : function () {},
      onEnd : function () {
        if (Aak.getElement('#videoyw')) {
          Aak.removeElement('#adbuddy-overlay, #adbuddy-no-adb-container');
          Aak.uw.disableAds(null, null, 1);
          Aak.uw.player_start();
        }
      }
    },
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
	/*
    ShowAdbblock : {
	  // issue: https://github.com/reek/anti-adblock-killer/issues/412
	  // screen: http://tinyurl.com/pg37hsu
	  // code: http://pastebin.com/hiL0w6ZK
      host : ['exemple.com'],
      onAlways : function () {
        Aak.uw.ShowAdbblock = function () {};
      }
    },	
	*/
    fuckAdBlockTest : {
      host : ['fuckAdBlockTest.com'],
      onStart : function () {
        // tool: http://jscompress.com/
		// source: https://github.com/sitexw/FuckAdBlock
        !function(t){if(void 0===t.fuckAdBlock){var e=function(i){void 0!==i&&this.setOption(i);var e=this,o=function(){setTimeout(function(){e._options.checkOnLoad===!0&&(null===e._var.bait&&e._creatBait(),setTimeout(function(){e.check()},1))},1)};t.addEventListener?t.addEventListener("load",o,!1):t.attachEvent("onload",o)};e.prototype._options={checkOnLoad:!0,resetOnEnd:!0,loopCheckTime:50,loopMaxNumber:5,baitClass:"",baitStyle:""},e.prototype._var={version:"3.0.1",bait:null,checking:!1,loop:null,loopNumber:0,event:{detected:[],notDetected:[]}},e.prototype._bait=null,e.prototype.setOption=function(t,i){if(void 0!==i){var e=t;t={},t[e]=i}for(option in t)this._options[option]=t[option];return this},e.prototype._creatBait=function(){var i=document.createElement("div");i.setAttribute("class",this._options.baitClass),i.setAttribute("style",this._options.baitStyle),this._var.bait=t.document.body.appendChild(i),this._var.bait.offsetParent,this._var.bait.offsetHeight,this._var.bait.offsetLeft,this._var.bait.offsetTop,this._var.bait.offsetWidth,this._var.bait.clientHeight,this._var.bait.clientWidth},e.prototype._destroyBait=function(){t.document.body.removeChild(this._var.bait),this._var.bait=null},e.prototype.check=function(t){if(void 0===t&&(t=!0),this._var.checking===!0)return!1;this._var.checking=!0,null===this._var.bait&&this._creatBait();var i=this;return this._var.loopNumber=0,t===!0&&(this._var.loop=setInterval(function(){i._checkBait(t)},this._options.loopCheckTime)),this._checkBait(t),!0},e.prototype._checkBait=function(t){var i=!1;null===this._var.bait&&this._creatBait(),t===!0&&(this._var.loopNumber++,this._var.loopNumber>=this._options.loopMaxNumber&&(clearInterval(this._var.loop),this._var.loop=null,this._var.loopNumber=0)),i===!0?(t===!0&&(this._var.checking=!1),this._destroyBait(),this.emitEvent(!0)):(null===this._var.loop||t===!1)&&(t===!0&&(this._var.checking=!1),this._destroyBait(),this.emitEvent(!1))},e.prototype.emitEvent=function(t){var e=this._var.event[t===!0?"detected":"notDetected"];for(i in e)e[i]();return this._options.resetOnEnd===!0&&this.clearEvent(),this},e.prototype.clearEvent=function(){this._var.event.detected=[],this._var.event.notDetected=[]},e.prototype.on=function(t,i){return this._var.event[t===!0?"detected":"notDetected"].push(i),this},e.prototype.onDetected=function(t){return this.on(!0,t)},e.prototype.onNotDetected=function(t){return this.on(!1,t)},t.fuckAdBlock=new e}}(Aak.uw);
      }
    },
    // --------------------------------------------------------------------------------------------
    // Generic
    // --------------------------------------------------------------------------------------------
    generic : {
      host : ['.*?'],
      onRemove : function (removedNode) {
        if (Aak.debug.removed) {
          if (removedNode.src ||
		    removedNode.id ||
            removedNode.className &&
            !/^firebug/.test(removedNode.className)) {
            // Node removed
            Aak.log(removedNode);
          }
        }
      },
      onStart : function () {},
      onAlways : function () {},
      onIdle : function () {

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
          Aak.uw.closeAdbuddy();
          Aak.autoReport('Adbuddy');
        }

        // AdBlock Alerter (WP) Fix 10.12.2014
        if (Aak.getElement('div.adb_overlay > div.adb_modal_img')) {
          // Remove Alert + Allow Scroll
          Aak.removeElement('div.adb_overlay');
          Aak.addStyle('html,body {height:auto; overflow: auto;}');
          Aak.autoReport('AdBlockAlerter');
        }

        // Unknow Anti AdBlock system
        if (Aak.getElement('#blockdiv') && Aak.contains(Aak.getElement('#blockdiv').innerHTML, 'disable ad blocking or use another browser without any adblocker when you visit')) {
          Aak.removeElement('#blockdiv');
        }

        // Antiblock - http://antiblock.org/
        var styles = document.querySelectorAll('style');
        for (var i = 0; i < styles.length; i++) {
          if (styles[i].innerHTML.length) {
            var css = styles[i].innerHTML.replace(/[\n\r\t\s]+/g, "");
            var id = /#([0-9a-z]{4,10})\{.*position:fixed\!important;.+document\.documentElement.scrollTop\?document\.documentElement\.scrollTop:document\.body\.scrollTop.+\}#/.exec(css);
            if (id != null && id.length == 2) {
              Aak.setLocal('AntiblockID', id[1]);
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
            for (var key in systems) {
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
        if (Aak.debug.inserted) {
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
		
		/* Do not still work
        // FuckAdBlock (v3.1.0) - http://github.com/sitexw/FuckAdBlock
        var reClass = /(pub_300x250|pub_300x250m|pub_728x90|text-ad|textAd|text_ad|text_ads|text-ads|text-ad-links)/;
        var reCss = /width: 1px/;
        if (insertedNode.nodeName == 'DIV' &&
          insertedNode.style.cssText &&
          reCss.test(insertedNode.style.cssText) &&
          insertedNode.className &&
          reClass.test(insertedNode.className)) {
			  
          // Remove
		  insertedNode.className='';
          Aak.autoReport('FuckAdBlock', false, location.href);
          Aak.removeElement(insertedNode);
        }
		*/

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
        var reWords2 = /kapat|disable|désactivez|désactiver|desactivez|desactiver|desative|desactivar|desactive|desactiva|deaktiviere|disabilitare|&#945;&#960;&#949;&#957;&#949;&#961;&#947;&#959;&#960;&#959;&#943;&#951;&#963;&#951;|&#1079;&#1072;&#1087;&#1088;&#1077;&#1097;&#1072;&#1090;&#1100;|állítsd le|publicités/i;

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
          else if (localStorage.antiblockId != 'undefined' &&
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
  },
  blockDetect : function () {

    // Exclude domains
    var host = location.host;
    var excluded = false;
    Aak.excludes.forEach(function (entry) {
      if (host.indexOf(entry) != -1) {
        excluded = true;
        if (Aak.debug.exclude) {
          Aak.log(host + ' (' + entry + ') excluded !');
        }
      }
    });

    // Include domains
    if (!excluded) {

      // Detect & Kill
      for (var i in Aak.rules) {

        // Current
        var current = Aak.rules[i];

        // RegExp host
        var reHost = new RegExp(current.host.join('|'));
        // If domains is
        if (reHost.test(host)) {
          // On all statements
          if (current.onAlways) {
            current.onAlways(); // start
            window.addEventListener('DOMContentLoaded', current.onAlways); // idle
            window.addEventListener('load', current.onAlways); // end
          }
          // When
          if (current.onStart) {
            current.onStart();
          }
          // When Before Script Executed
          if (current.onBeforeScript) {
            if ('onbeforescriptexecute' in document) { // Mozilla Firefox
              window.addEventListener('beforescriptexecute', current.onBeforeScript);
            }
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
            // doc: http://tinyurl.com/op95rfy
            else {
              window.addEventListener("DOMNodeInserted", function (e) {
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
            // doc: http://tinyurl.com/op95rfy
            else {
              window.addEventListener("DOMNodeRemoved", function (e) {
                current.onRemove(e.target);
              }, false);
            }
          }
        }
      }
    }
  }
};

Aak.initialize();
