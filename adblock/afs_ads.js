(function() {
    var message = "Adblocker detected, please disable it on mobilevids or you can upgrade to VIP and get lots of benefits.";

        var tryMessage = function() {
            setTimeout(function() {
                if(!document.getElementsByClassName) return;
                var uAgent = navigator.userAgent;
                if (uAgent.indexOf("PLAYSTATION") != -1) return;
                var ads = document.getElementsByClassName('afs_ads'),
                    ad  = ads[ads.length - 1];

                if(!ad
                    || ad.innerHTML.length == 0
                    || ad.clientHeight === 0) {
                    alert(message);
                   window.location.href = 'http://mobilevids.org/forums/';
                } else {
                    
                }

            }, 1000);
        }

        /* Attach a listener for page load ... then show the message */
        if(window.addEventListener) {
            window.addEventListener('load', tryMessage, false);
        } else {
            window.attachEvent('onload', tryMessage); //IE
        }
})();