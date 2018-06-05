!function(t){"use strict";function e(t,e){var a,n,i,o=t.data("width"),s=t.data("height"),c=t.data("ratio")?t.data("ratio"):e.default_ratio,l=t.data("youtube-id"),r=[],u=(t.text()?t.text():e.loading_text,t.data("parameters")||"");c=c.split(":"),"number"==typeof o&&"number"==typeof s?(t.width(o),a=s+"px"):"number"==typeof o?(t.width(o),a=o*c[1]/c[0]+"px"):(o=t.width(),0==o&&(o=t.parent().width()),a=c[1]/c[0]*100+"%"),r.push('<div class="ytp-thumbnail">'),r.push('<div class="ytp-large-play-button"'),o<=640&&r.push(' style="transform: scale(0.563888888888889);"'),r.push(">"),r.push("<svg>"),r.push('<path fill-rule="evenodd" clip-rule="evenodd" fill="#1F1F1F" class="ytp-large-play-button-svg" d="M84.15,26.4v6.35c0,2.833-0.15,5.967-0.45,9.4c-0.133,1.7-0.267,3.117-0.4,4.25l-0.15,0.95c-0.167,0.767-0.367,1.517-0.6,2.25c-0.667,2.367-1.533,4.083-2.6,5.15c-1.367,1.4-2.967,2.383-4.8,2.95c-0.633,0.2-1.316,0.333-2.05,0.4c-0.767,0.1-1.3,0.167-1.6,0.2c-4.9,0.367-11.283,0.617-19.15,0.75c-2.434,0.034-4.883,0.067-7.35,0.1h-2.95C38.417,59.117,34.5,59.067,30.3,59c-8.433-0.167-14.05-0.383-16.85-0.65c-0.067-0.033-0.667-0.117-1.8-0.25c-0.9-0.133-1.683-0.283-2.35-0.45c-2.066-0.533-3.783-1.5-5.15-2.9c-1.033-1.067-1.9-2.783-2.6-5.15C1.317,48.867,1.133,48.117,1,47.35L0.8,46.4c-0.133-1.133-0.267-2.55-0.4-4.25C0.133,38.717,0,35.583,0,32.75V26.4c0-2.833,0.133-5.95,0.4-9.35l0.4-4.25c0.167-0.966,0.417-2.05,0.75-3.25c0.7-2.333,1.567-4.033,2.6-5.1c1.367-1.434,2.967-2.434,4.8-3c0.633-0.167,1.333-0.3,2.1-0.4c0.4-0.066,0.917-0.133,1.55-0.2c4.9-0.333,11.283-0.567,19.15-0.7C35.65,0.05,39.083,0,42.05,0L45,0.05c2.467,0,4.933,0.034,7.4,0.1c7.833,0.133,14.2,0.367,19.1,0.7c0.3,0.033,0.833,0.1,1.6,0.2c0.733,0.1,1.417,0.233,2.05,0.4c1.833,0.566,3.434,1.566,4.8,3c1.066,1.066,1.933,2.767,2.6,5.1c0.367,1.2,0.617,2.284,0.75,3.25l0.4,4.25C84,20.45,84.15,23.567,84.15,26.4z M33.3,41.4L56,29.6L33.3,17.75V41.4z"></path>'),r.push('<polygon fill-rule="evenodd" clip-rule="evenodd" fill="#FFFFFF" points="33.3,41.4 33.3,17.75 56,29.6"></polygon>'),r.push("</svg>"),r.push("</div>"),r.push("</div>"),t.css({"padding-bottom":a}).html(r.join("")),i="hqdefault.jpg",n=t.find(".ytp-thumbnail").css({"background-image":["url(//img.youtube.com/vi/",l,"/",i,")"].join("")}).addClass("lazyYT-image-loaded").on("click",function(e){e.preventDefault(),!t.hasClass("lazyYT-video-loaded")&&n.hasClass("lazyYT-image-loaded")&&t.html('<iframe src="//www.youtube.com/embed/'+l+"?autoplay=1&"+u+'" frameborder="0" allowfullscreen></iframe>').addClass("lazyYT-video-loaded")})}t.fn.lazyYT=function(a){var n={loading_text:"",default_ratio:"16:9",callback:null,container_class:"lazyYT-container"},i=t.extend(n,a);return this.each(function(){var a=t(this).addClass(i.container_class);e(a,i)})}}(jQuery),$(document).ready(function(){var t=$(".review-carousel");t.owlCarousel({loop:!0,margin:0,nav:!0,autoHeight:!0,animateOut:"fadeOut",animateIn:"fadeIn",responsive:{0:{items:1}}}),$(".problems-carousel").owlCarousel({loop:!0,margin:0,nav:!1,autoHeight:!0,autoplay:!0,autoplayTimeout:4e3,animateOut:"fadeOut",animateIn:"fadeIn",responsive:{0:{items:1}}}),t.on("changed.owl.carousel",function(t){var e=t.item.index,a=e-11,n=t.item.count;0==a&&(a=24),n-a<5?$(".review-carousel .owl-dots ").addClass("more-hide"):$(".review-carousel .owl-dots ").removeClass("more-hide")}),$(".review-tab_link li").click(function(){$(this).parents(".item").find(".review-tab_link li").removeClass("active"),$(this).parents(".item").find(".tab-item").removeClass("active"),$(this).addClass("active"),$("[id="+$(this).data("tab")+"]").addClass("active")}),$(".lazyYT").lazyYT(),$("input").focusin(function(){$(this).parent().addClass("focus")}),$("input").focusout(function(){$(this).parent().removeClass("focus")}),$(".scroll").click(function(t){event.preventDefault();var e=$(this).attr("href"),a=$(e).offset().top;$("body,html").animate({scrollTop:a-60},1500)}),$(window).scroll(function(){return $("nav").toggleClass("fixed",$(window).scrollTop()>0)}),$(".mob-btn").click(function(){$("nav").toggleClass("bg"),$("nav .menu, nav .call-me").slideToggle(400)}),$(window).width()<1200&&$("nav .menu li ").click(function(){$("nav .menu, nav .call-me").hide(400)})}),jQuery.cookie=function(t,e,a){if("undefined"==typeof e){var n=null;if(document.cookie&&""!=document.cookie)for(var i=document.cookie.split(";"),o=0;o<i.length;o++){var s=jQuery.trim(i[o]);if(s.substring(0,t.length+1)==t+"="){n=decodeURIComponent(s.substring(t.length+1));break}}return n}a=a||{},null===e&&(e="",a.expires=-1);var c="";if(a.expires&&("number"==typeof a.expires||a.expires.toUTCString)){var l;"number"==typeof a.expires?(l=new Date,l.setTime(l.getTime()+24*a.expires*60*60*1e3)):l=a.expires,c="; expires="+l.toUTCString()}var r=a.path?"; path="+a.path:"",u=a.domain?"; domain="+a.domain:"",d=a.secure?"; secure":"";document.cookie=[t,"=",encodeURIComponent(e),c,r,u,d].join("")},function(t){function e(e,a){e.addClass("countdownHolder"),t.each(["Days","Hours","Minutes","Seconds"],function(a){t('<span class="count'+this+'">').html('<span class="position">\t\t\t\t\t<span class="digit static">0</span>\t\t\t\t</span>\t\t\t\t<span class="position">\t\t\t\t\t<span class="digit static">0</span>\t\t\t\t</span>').appendTo(e),"Seconds"!=this&&e.append('<span class="countDiv countDiv'+a+'"></span>')})}function a(e,a){var n=e.find(".digit");if(n.is(":animated"))return!1;if(e.data("digit")==a)return!1;e.data("digit",a);var i=t("<span>",{"class":"digit",css:{top:"-2.1em",opacity:0},html:a});n.before(i).removeClass("static").animate({top:"2.5em",opacity:0},"fast",function(){n.remove()}),i.delay(100).animate({top:0,opacity:1},"fast",function(){i.addClass("static")})}var n=86400,i=3600,o=60;t.fn.countdown=function(s){function c(t,e,n){a(f.eq(t),Math.floor(n/10)%10),a(f.eq(e),n%10)}var l,r,u,d,p,f,m=t.extend({callback:function(){},timestamp:0},s);return e(this,m),f=this.find(".position"),function v(){l=Math.floor((m.timestamp-new Date)/1e3),l<0&&(l=0),r=Math.floor(l/n),c(0,1,r),l-=r*n,u=Math.floor(l/i),c(2,3,u),l-=u*i,d=Math.floor(l/o),c(4,5,d),l-=d*o,p=l,c(6,7,p),m.callback(r,u,d,p),setTimeout(v,1e3)}(),this}}(jQuery),$(function(){function t(t,a,n){return e.setDate(e.getDate()+t),e.setHours(e.getHours()+a),e.setMinutes(e.getMinutes()+n),e}var e=new Date;if($.cookie("timer"))var a=$.cookie("timer");else{var a=t(3,0,0);$.cookie("timer",a,{expires:3})}var n=($("#note"),new Date(a));$("#countdown").countdown({timestamp:n,callback:function(t,e,a,n){}}),$("#countdown_1").countdown({timestamp:n,callback:function(t,e,a,n){}}),$(".countDays").append('<span class="title">дней</span>'),$(".countHours").append('<span class="title">часов</span>'),$(".countMinutes").append('<span class="title">минут</span>'),$(".countSeconds").append('<span class="title">секунд</span>')});