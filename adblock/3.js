// Run after all the page elements have loaded
window.onload = function () {

  // This will take care of asynchronous Google ads
  setTimeout(function () {

    // We are targeting the first banner ad of AdSense
    var ad = document.querySelector("ins.adsbygoogle");

    // If the ad contains no innerHTML, ad blockers are at work
    if (ad && ad.innerHTML.replace(/\s/g, "").length == 0) {

      // Since ad blocks hide ads using CSS too
      ad.style.cssText = 'display:block !important; position: fixed !important; top: -2px; left: 0px; width: 100%; height: 100%; background-color: #000; opacity: .95; filter: alpha(opacity=95); display: block; padding: 15% 0; text-align: center; font-family: arial; font-size: 14px; text-decoration: none; z-index: 99999;';

      // You can put any text, image or even IFRAME tags here
      ad.innerHTML = '<div class="blockmessage" style="min-width: 450px; max-width: 550px; margin: 0 auto; background-color: #fff; border-radius: 10px; padding: 25px; text-decoration: none; box-shadow: 0 0 25px 5px #999; color: #000; line-height: 20px;"><strong>Please disable your ad blocker!<br>Bitte deaktiviere Deinen Werbeblocker!<br>Veuillez desactiver votre bloqueur de publicite!<br>Por favor, desactive el bloqueador de anuncios!<br>Пожалуйста, отключите ваш блокировщик рекламы!</strong><br><br><br>This website is completely supported by revenue from ads, which is used to buy Bitcoins to distribute to users like you.<br><br>By blocking ads on our website, you are cutting off our only source of revenue and this will seriously affect our ability to continue distributing Bitcoins to our users.<br><br>Please disable your ad-blocking browser plugin/software for this page and then<br><a href="/btc/">click here</a><br>to refresh the page and collect your free Bitcoins.</div>';
    }

  }, 0); // The ad blocker check is performed 0 seconds after the page load
};
