
(function (w, u) {
  var d = w.document,
  z = typeof u;
  function c353() {
    function c(c, i) {
      var e = d.createElement('div'),
      b = d.body,
      s = b.style,
      l = b.childNodes.length;
      if (typeof i != z) {
        e.setAttribute('id', i);
        s.margin = s.padding = 0;
        s.height = '100%';
        l = Math.floor(Math.random() * l) + 1
      }
      e.innerHTML = c;
      b.insertBefore(e, b.childNodes[l - 1])
    }
    function g(i, t) {
      return !t ? d.getElementById(i) : d.getElementsByTagName(t)
    };
    function f(v) {
      if (!g('c353')) {
        c('<div id="c353"><input type="button" onclick="(function(){document.getElementById(\'c353\').style.display=\'none\'})()" value="X" class=bouton><p><h3>Vous utilisez un bloqueur de publicité ?</h3><br>Désativez votre bloqueur de publicité pour  SOS-Lettre afin de fermer ce message.<br><a href="http://no-adblock.com/?d=2.3' + '___' + escape(v) + '" target="_blank" class="credit" rel="nofollow">no-adblock.com <i>v2.3</i></a> </p></div>', 'c353');
        $(function () {
          $.get('http://www.no-adblock.com/bloc/?id=2');
        });
        EcrireCookie("adblock", "oui");
      }
    };
    (function () {
      var a = ['ad-300x60-1', 'advertisement1', 'leaderboardAd', 'refine-300-ad', 'secondBoxAdContainer', 'skyscrapeAd', 'tabAdvertising', 'ad', 'ads', 'adsense'],
      l = a.length,
      i,
      s = '',
      e;
      for (i = 0; i < l; i++) {
        if (!g(a[i])) {
          s += '<a id="' + a[i] + '"></a>'
        }
      }
      c(s);
      l = a.length;
      setTimeout(function () {
        for (i = 0; i < l; i++) {
          e = g(a[i]);
          if (e.offsetParent == null || (w.getComputedStyle ? d.defaultView.getComputedStyle(e, null).getPropertyValue('display') : e.currentStyle.display) == 'none') {
            return f('#' + a[i])
          }
        }
      }, 250)
    }
      ());
    (function () {
      var t = g(0, 'img'),
      a = ['.com/bads/', '/ad_skin_', '/ad_vert.', '/addeals/ad', '/addyn/3.0/ad', '/customadsense.', '/inc_ad.', '/include/ad/ad', '/nextad/ad', '_300_250_'],
      i;
      if (typeof t[0] != z && typeof t[0].src != z) {
        i = new Image();
        i.onload = function () {
          this.onload = z;
          this.onerror = function () {
            f(this.src)
          };
          this.src = t[0].src + '#' + a.join('')
        };
        i.src = t[0].src
      }
    }
      ());
    (function () {
      var o = {
        'http://pagead2.googlesyndication.com/pagead/show_ads.js' : 'google_ad_client',
        'http://js.adscale.de/getads.js' : 'adscale_slot_id',
        'http://get.mirando.de/mirando.js' : 'adPlaceId'
      },
      S = g(0, 'script'),
      l = S.length - 1,
      n,
      r,
      i,
      v,
      s;
      d.write = null;
      for (i = l; i >= 0; --i) {
        s = S[i];
        if (typeof o[s.src] != z) {
          n = d.createElement('script');
          n.type = 'text/javascript';
          n.src = s.src;
          v = o[s.src];
          w[v] = u;
          r = S[0];
          n.onload = n.onreadystatechange = function () {
            if (typeof w[v] == z && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
              n.onload = n.onreadystatechange = null;
              r.parentNode.removeChild(n);
              w[v] = null
            }
          };
          r.parentNode.insertBefore(n, r);
          setTimeout(function () {
            if (w[v] === u) {
              f(n.src)
            } else {
              if (LireCookie("adblock") == "oui") {
                EcrireCookie("adblock", "non");
              }
            }
            if (LireCookie("adblock") == "non") {
              $(function () {
                $.get('http://www.no-adblock.com/desactiv/?id=2');
              });
              /*alert("merci");*/
              EcrireCookie("adblock", "")
            }
          }, 2000);
          break
        }
      }
    }
      ())
  }
  if (d.addEventListener) {
    w.addEventListener('load', c353, false)
  } else {
    w.attachEvent('onload', c353)
  }
})(window);
