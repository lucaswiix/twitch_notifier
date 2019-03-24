// WIIXZER TWITCH NOTIFICATION V4

$(document).ready(function() {

    // Menu
    var title = " ";
    var isGame = "Tibia";
    var findChannels = "nattank,eliastibianodoido,ddd_pinda,rubini,Abak,Drufoox,gonyxazt,hashtagtitio,xoxim,jardineiroxd,metyzera,kathyzinha,mah_sz,tatoowtv";


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
            bottom: 0
        }, 500);
        $("#live_btn").html('<img src="arrow_bot.png" alt="Hide streams">');
        state = 1
    }

    function hide() {
        $(".live_popup").animate({
            bottom: -100
        }, 500);
        $("#live_btn").html('<img src="arrow_top.png" alt="Show streams">');
        state = 0
    }

    function show() {
        console.log(a);
        if(a["length"] == 0) return false;
       
            var t = a[0]["streams"].length;
            var check = false;

            for (l = 0; l < t; l++) { 
                var status = a[0]["streams"][l]["channel"]["status"];
                if(a[0]["streams"][l]["channel"]["game"] == isGame && status.indexOf(title) != -1){                    
                    var check = true;
                }                         
            }
            if(!check) return;


        // $("body").append('<div class="live_popup"><div id="live_btn"><i class="fa fa-chevron-left" aria-hidden="true"></i></div><div id="live_popup_ch"></div></div>');
        $("body").append('<div class="live_popup"><button id="live_btn"><img src="arrow_bot.png" alt="Hide streams"></button><div id="live_popup_ch"></div></div>');


        var total = a[0]["_total"];
        var i;
        for (i = 0; i < total; i++) {
            var c = a[0]["streams"][i]["channel"];
            var p = a[0]["streams"][i]["preview"];
            var status = c.status;
            if(status.indexOf(title) == -1) continue;
            if (c.game != isGame) continue;
            if (!c || !p) continue;
            $("#live_popup_ch").append('<div class="item-wiix"><a href="' + c.url + '" target="_blank" title="' + c.display_name + '"><div class="each-stream"><div class="live"><img src="' + p.medium + '" height="54" width="108"  alt="' + c.display_name + '"></div><div class="title"><span>' + c.display_name + '</span></div></div></a></div>');
            // $("#live_popup_ch").append('<a href="' + c.url + '" target="_blank" title="' + c.display_name + '"><div class="each-stream"><div class="live"><img src="' + p.medium + '" height="54" width="108" alt="' + c.display_name + '"></div><div class="title"><span>' + c.display_name + '</span></div></div></a>');
        }   
        setTimeout(function() {
            var c = getCookie("live_btn");
            if (c !== "0") {
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    hide()
                } else {
                    expand()
                }
            } else hide()
        }, 3000);
        $("#live_btn").click(function() {
            if (state) hide();
            else expand();
            setCookie("live_btn", state, 7)
        })
    }

    function check() {
        $.ajax({
            url: "https://api.twitch.tv/kraken/streams?channel=" + findChannels,
            dataType: 'json',
            headers: {
                'Client-ID': '8hpijtqsoexg9yepbs9m9xm3cfgpor'
            },
            success: function(channel) {
                if (channel["_total"] == 0) return;
                a.push(channel);
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

