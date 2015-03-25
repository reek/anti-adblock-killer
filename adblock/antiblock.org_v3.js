window.document.getElementById("nf1a").parentNode.removeChild(window.document.getElementById("nf1a"));
(function (l, m) {
  function n(a) {
    a && nf1a.nextFunction()
  }
  var h = l.document,
  p = ["i", "s", "u"];
  n.prototype = {
    rand : function (a) {
      return Math.floor(Math.random() * a)
    },
    getElementBy : function (a, b) {
      return a ? h.getElementById(a) : h.getElementsByTagName(b)
    },
    getStyle : function (a) {
      var b = h.defaultView;
      return b && b.getComputedStyle ? b.getComputedStyle(a, null) : a.currentStyle
    },
    deferExecution : function (a) {
      setTimeout(a, 2E3)
    },
    insert : function (a, b) {
      var e = h.createElement("strong"),
      d = h.body,
      c = d.childNodes.length,
      g = d.style,
      f = 0,
      k = 0;
      if ("nf1a" == b) {
        e.setAttribute("id", b);
        g.margin = g.padding = 0;
        g.height = "100%";
        for (c = this.rand(c); f < c; f++)
          1 == d.childNodes[f].nodeType && (k = Math.max(k, parseFloat(this.getStyle(d.childNodes[f]).zIndex) || 0));
        k && (e.style.zIndex = k + 1);
        c++
      }
      e.innerHTML = a;
      d.insertBefore(e, d.childNodes[c - 1])
    },
    displayMessage : function (a) {
      var b = this;
      a = "abisuq".charAt(b.rand(5));
      b.insert("<" + a + '><img src="data:image/png;base64,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" height="66" width="432" alt="" /> <a href="http://is.gd/ndmArO">[ ? ]</a>' + ("</" + a + ">"), "nf1a");
      h.addEventListener && b.deferExecution(function () {
        b.getElementBy("nf1a").addEventListener("DOMNodeRemoved", function () {
          b.displayMessage()
        }, !1)
      })
    },
    i : function () {
      for (var a = "ad_txt,bottomAds,ft-ad,googleAdBox,post_ad,rightAdsDiv,sideline-ad,ad,ads,adsense".split(","), b = a.length, e = "", d = this, c = 0, g = "abisuq".charAt(d.rand(5)); c < b; c++)
        d.getElementBy(a[c]) || (e += "<" + g + ' id="' + a[c] + '"></' + g + ">");
      d.insert(e);
      d.deferExecution(function () {
        for (c = 0; c < b; c++)
          if (null == d.getElementBy(a[c]).offsetParent || "none" == d.getStyle(d.getElementBy(a[c])).display)
            return d.displayMessage("#" + a[c] + "(" + c + ")");
        d.nextFunction()
      })
    },
    s : function () {
      var a = {
        'pagead2.googlesyndic' : 'google_ad_client',
        'js.adscale.de/getads' : 'adscale_slot_id',
        'get.mirando.de/miran' : 'adPlaceId'
      },
      b = this,
      e = b.getElementBy(0, "script"),
      d = e.length - 1,
      c,
      g,
      f,
      k;
      h.write = null;
      for (h.writeln = null; 0 <= d; --d)
        if (c = e[d].src.substr(7, 20), a[c] !== m) {
          f = h.createElement("script");
          f.type = "text/javascript";
          f.src = e[d].src;
          g = a[c];
          l[g] = m;
          f.onload = f.onreadystatechange = function () {
            k = this;
            l[g] !== m || k.readyState && "loaded" !== k.readyState && "complete" !== k.readyState || (l[g] = f.onload = f.onreadystatechange = null, e[0].parentNode.removeChild(f))
          };
          e[0].parentNode.insertBefore(f, e[0]);
          b.deferExecution(function () {
            if (l[g] === m)
              return b.displayMessage(f.src);
            b.nextFunction()
          });
          return
        }
      b.nextFunction()
    },
    u : function () {
      var a = "/ad-logger/ad,/adLink728.,/adshare3.,/adsrv.,/adv4.,/btmads.,/showads_,_adpartner.,_adsjs.,/468x80-".split(","),
      b = this,
      e = b.getElementBy(0, "img"),
      d,
      c;
      e[0] !== m && e[0].src !== m && (d = new Image, d.onload = function () {
        c = this;
        c.onload = null;
        c.onerror = function () {
          p = null;
          b.displayMessage(c.src)
        };
        c.src = e[0].src + "#" + a.join("")
      }, d.src = e[0].src);
      b.deferExecution(function () {
        b.nextFunction()
      })
    },
    nextFunction : function () {
      var a = p[0];
      a !== m && (p.shift(), this[a]())
    }
  };
  l.nf1a = nf1a = new n;
  h.addEventListener ? l.addEventListener("load", n, !1) : l.attachEvent("onload", n)
})(window);