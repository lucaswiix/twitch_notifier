$(document).ready(function() {

    var channels = "eowiixtv,channhel2,channel3"; // Here your add ur channel with ,

    var ClientID = "000000000000000000000000000"; // Put ur Clientid

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1)
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length)
            }
        }
        return ""
    }
    var a = [];
    var c = [];
    var l;
    var t = c.length;
    var state = 1;

    function expand() {
        $(".live_popup").animate({
            right: 0
        }, 500);
        $("#live_btn").html('<i class="fa fa-chevron-right" aria-hidden="true"></i>');
        state = 1
    }

    function hide(ct) {
        $(".live_popup").animate({
            right: -(ct * 130 + 60 - 50)
        }, 500);
        $("#live_btn").html('<i class="fa fa-chevron-left" aria-hidden="true"></i>');
        state = 0
    }

    function show() {
        
        if(a["length"] == 0) return false;
       
            var t = a[0]["streams"].length;
            var ct = a[0]["streams"].length;
            
            for (l = 0; l < t; l++) {
                if(a[0]["streams"][l]["channel"]["game"] != 'Tibia'){
                    t--;
                    ct = t;
                }

            }      
            if(!t || t == 0 ) return false;
            


        $("body").append('<div class="live_popup"><div id="live_btn"></div><div id="live_popup_ch"></div></div>');

        $(".live_popup").css({
            right: -(t * 130 + 100),
            width: t * 130 + 60
        });
        var total = a[0]["_total"];
        var i;
        for (i = 0; i < total; i++) {
            var c = a[0]["streams"][i]["channel"];
            var p = a[0]["streams"][i]["preview"];
            if (c.game != 'Tibia') continue;
            if (!c || !p) return;
            $("#live_popup_ch").append('<a href="' + c.url + '" target="_blank" title="' + c.display_name + '"><span class="angled-img"><div class="img"><img src="' + p.medium + '" alt="" height="60"></div></span><img class="logo" src="' + c.logo + '" alt=""></div></a>')
        }
        setTimeout(function() {
            var c = getCookie("live_btn");
            if (c !== "0") {
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    hide(ct)
                } else {
                    expand()
                }
            } else hide(ct)
        }, 3000);
        $("#live_btn").click(function() {
            if (state) hide(ct);
            else expand();
            setCookie("live_btn", state, 7)
        })
    }

    function check() {
        $.ajax({
            url: "https://api.twitch.tv/kraken/streams?channel=" + channels,
            dataType: 'json',
            headers: {
                'Client-ID': ClientID
            },
            success: function(channel) {
                if (channel["_total"] == 0) return;
                a.push(channel)
                console.log('Wiixzer security development running...');
            },
            complete: function() {
                show()
            },
            error: function(erro){
                console.log(erro);
            }
        })
    }
    check()
});