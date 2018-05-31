/*!
 * lazyYT (lazy load YouTube videos)
 * v1.0.1 - 2014-12-30
 * (CC) This work is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License.
 * http://creativecommons.org/licenses/by-sa/4.0/
 * Contributors: https://github.com/tylerpearson/lazyYT/graphs/contributors || https://github.com/daugilas/lazyYT/graphs/contributors
 * 
 * Usage: <div class="lazyYT" data-youtube-id="laknj093n" data-parameters="rel=0">loading...</div>
 */

;
(function ($) {
  'use strict';

  function setUp($el, settings) {
    var width = $el.data('width'),
      height = $el.data('height'),
      ratio = ($el.data('ratio')) ? $el.data('ratio') : settings.default_ratio,
      id = $el.data('youtube-id'),
      padding_bottom,
      innerHtml = [],
      $thumb,
      thumb_img,
      loading_text = $el.text() ? $el.text() : settings.loading_text,
      youtube_parameters = $el.data('parameters') || '';

    ratio = ratio.split(":");

    // width and height might override default_ratio value
    if (typeof width === 'number' && typeof height === 'number') {
      $el.width(width);
      padding_bottom = height + 'px';
    } else if (typeof width === 'number') {
      $el.width(width);
      padding_bottom = (width * ratio[1] / ratio[0]) + 'px';
    } else {
      width = $el.width();

      // no width means that container is fluid and will be the size of its parent
      if (width == 0) {
        width = $el.parent().width();
      }

      padding_bottom = (ratio[1] / ratio[0] * 100) + '%';
    }

    //
    // This HTML will be placed inside 'lazyYT' container

    innerHtml.push('<div class="ytp-thumbnail">');

    // Play button from YouTube (exactly as it is in YouTube)
    innerHtml.push('<div class="ytp-large-play-button"');
    if (width <= 640) innerHtml.push(' style="transform: scale(0.563888888888889);"');
    innerHtml.push('>');
    innerHtml.push('<svg>');
    innerHtml.push('<path fill-rule="evenodd" clip-rule="evenodd" fill="#1F1F1F" class="ytp-large-play-button-svg" d="M84.15,26.4v6.35c0,2.833-0.15,5.967-0.45,9.4c-0.133,1.7-0.267,3.117-0.4,4.25l-0.15,0.95c-0.167,0.767-0.367,1.517-0.6,2.25c-0.667,2.367-1.533,4.083-2.6,5.15c-1.367,1.4-2.967,2.383-4.8,2.95c-0.633,0.2-1.316,0.333-2.05,0.4c-0.767,0.1-1.3,0.167-1.6,0.2c-4.9,0.367-11.283,0.617-19.15,0.75c-2.434,0.034-4.883,0.067-7.35,0.1h-2.95C38.417,59.117,34.5,59.067,30.3,59c-8.433-0.167-14.05-0.383-16.85-0.65c-0.067-0.033-0.667-0.117-1.8-0.25c-0.9-0.133-1.683-0.283-2.35-0.45c-2.066-0.533-3.783-1.5-5.15-2.9c-1.033-1.067-1.9-2.783-2.6-5.15C1.317,48.867,1.133,48.117,1,47.35L0.8,46.4c-0.133-1.133-0.267-2.55-0.4-4.25C0.133,38.717,0,35.583,0,32.75V26.4c0-2.833,0.133-5.95,0.4-9.35l0.4-4.25c0.167-0.966,0.417-2.05,0.75-3.25c0.7-2.333,1.567-4.033,2.6-5.1c1.367-1.434,2.967-2.434,4.8-3c0.633-0.167,1.333-0.3,2.1-0.4c0.4-0.066,0.917-0.133,1.55-0.2c4.9-0.333,11.283-0.567,19.15-0.7C35.65,0.05,39.083,0,42.05,0L45,0.05c2.467,0,4.933,0.034,7.4,0.1c7.833,0.133,14.2,0.367,19.1,0.7c0.3,0.033,0.833,0.1,1.6,0.2c0.733,0.1,1.417,0.233,2.05,0.4c1.833,0.566,3.434,1.566,4.8,3c1.066,1.066,1.933,2.767,2.6,5.1c0.367,1.2,0.617,2.284,0.75,3.25l0.4,4.25C84,20.45,84.15,23.567,84.15,26.4z M33.3,41.4L56,29.6L33.3,17.75V41.4z"></path>');
    innerHtml.push('<polygon fill-rule="evenodd" clip-rule="evenodd" fill="#FFFFFF" points="33.3,41.4 33.3,17.75 56,29.6"></polygon>');
    innerHtml.push('</svg>');
    innerHtml.push('</div>'); // end of .ytp-large-play-button

    innerHtml.push('</div>'); // end of .ytp-thumbnail

    // Video title (info bar)

    $el.css({
        'padding-bottom': padding_bottom
      })
      .html(innerHtml.join(''));

    if (width > 640) {
      thumb_img = 'maxresdefault.jpg';
    } else if (width > 480) {
      thumb_img = 'sddefault.jpg';
    } else if (width > 320) {
      thumb_img = 'sddefault.jpg';
    } else if (width > 120) {
      thumb_img = 'sddefault.jpg';
    } else if (width == 0) { // sometimes it fails on fluid layout
      thumb_img = 'sddefault.jpg';
    } else {
      thumb_img = 'sddefault.jpg';
    }


    $thumb = $el.find('.ytp-thumbnail').css({
        'background-image': ['url(//img.youtube.com/vi/', id, '/', thumb_img, ')'].join('')
      })
      .addClass('lazyYT-image-loaded')
      .on('click', function (e) {
        e.preventDefault();
        if (!$el.hasClass('lazyYT-video-loaded') && $thumb.hasClass('lazyYT-image-loaded')) {
          $el.html('<iframe src="//www.youtube.com/embed/' + id + '?autoplay=1&' + youtube_parameters + '" frameborder="0" allowfullscreen></iframe>')
            .addClass('lazyYT-video-loaded');
        }
      });

    /*$.getJSON('//gdata.youtube.com/feeds/api/videos/' + id + '?v=2&alt=json', function (data) {
        $el.find('#lazyYT-title-' + id).text(data.entry.title.$t);
    });*/

  }

  $.fn.lazyYT = function (newSettings) {
    var defaultSettings = {
      loading_text: '',
      default_ratio: '16:9',
      callback: null, // ToDO execute callback if given
      container_class: 'lazyYT-container'
    };
    var settings = $.extend(defaultSettings, newSettings);

    return this.each(function () {
      var $el = $(this).addClass(settings.container_class);
      setUp($el, settings);
    });
  };

}(jQuery));

$(document).ready(function () {
  var review = $('.review-carousel');
  review.owlCarousel({
    loop: true,
    margin: 0,
    nav: true,
    autoHeight: true,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    responsive: {
      0: {
        items: 1
      }
    }
  });

  review.on('changed.owl.carousel', function (event) {
    var index = event.item.index;

    var activeEl = index - 8;
    var countEl = event.item.count;
    if(activeEl == 0) {
      activeEl = 17;
    }

    if ((countEl - activeEl) < 5) {
      $('.review-carousel .owl-dots ').addClass('more-hide');
    } else {
      $('.review-carousel .owl-dots ').removeClass('more-hide');

    }

    console.log(event.item.count);
    console.log(activeEl);

  });

  $('.review-tab_link li').click(function () {
    $(this).parents('.item').find('.review-tab_link li').removeClass('active');
    $(this).parents('.item').find('.tab-item').removeClass('active');
    $(this).addClass('active');
    $('[id='+$(this).data('tab')+']').addClass('active');
  });


  $('.lazyYT').lazyYT();

  $('input').focusin(function () {
    $(this).parent().addClass('focus');
  })
  $('input').focusout(function () {
    $(this).parent().removeClass('focus');
  })

  $('.scroll').click(function (e) {
    event.preventDefault();
    var id = $(this).attr('href'),
      top = $(id).offset().top;

    $('body,html').animate({
      scrollTop: top - 60
    }, 1500);

  });


  $(window).scroll(function () {
    return $('nav').toggleClass("fixed", $(window).scrollTop() > 0);
  });
  
  $('.mob-btn').click(function(){
    $('nav').toggleClass('bg');
    $('nav .menu, nav .call-me').slideToggle(400);
  })
  if($(window).width() < 1200){
    $('nav .menu li ').click(function(){
      $('nav .menu, nav .call-me').hide(400);
    })
  }
});


jQuery.cookie = function (name, value, options) {
  if (typeof value != 'undefined') { // name and value given, set cookie
    options = options || {};
    if (value === null) {
      value = '';
      options.expires = -1;
    }
    var expires = '';
    if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
      var date;
      if (typeof options.expires == 'number') {
        date = new Date();
        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
      } else {
        date = options.expires;
      }
      expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
    }
    // CAUTION: Needed to parenthesize options.path and options.domain
    // in the following expressions, otherwise they evaluate to undefined
    // in the packed version for some reason...
    var path = options.path ? '; path=' + (options.path) : '';
    var domain = options.domain ? '; domain=' + (options.domain) : '';
    var secure = options.secure ? '; secure' : '';
    document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
  } else { // only name given, get cookie
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i]);
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) == (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
};

/**
 * @name		jQuery Countdown Plugin
 * @author		Martin Angelov
 * @version 	1.0
 * @url			http://tutorialzine.com/2011/12/countdown-jquery/
 * @license		MIT License
 */

(function ($) {

  // Количество секунд в каждом временном отрезке
  var days = 24 * 60 * 60,
    hours = 60 * 60,
    minutes = 60;

  // Создаем плагин
  $.fn.countdown = function (prop) {

    var options = $.extend({
      callback: function () {},
      timestamp: 0
    }, prop);

    var left, d, h, m, s, positions;

    // инициализируем плагин
    init(this, options);

    positions = this.find('.position');

    (function tick() {

      // Осталось времени
      left = Math.floor((options.timestamp - (new Date())) / 1000);

      if (left < 0) {
        left = 0;
      }

      // Осталось дней
      d = Math.floor(left / days);
      updateDuo(0, 1, d);
      left -= d * days;

      // Осталось часов
      h = Math.floor(left / hours);
      updateDuo(2, 3, h);
      left -= h * hours;

      // Осталось минут
      m = Math.floor(left / minutes);
      updateDuo(4, 5, m);
      left -= m * minutes;

      // Осталось секунд
      s = left;
      updateDuo(6, 7, s);

      // Вызываем возвратную функцию пользователя
      options.callback(d, h, m, s);

      // Планируем следующий вызов данной функции через 1 секунду
      setTimeout(tick, 1000);
    })();

    // Данная функция обновляет две цифоровые позиции за один раз
    function updateDuo(minor, major, value) {
      switchDigit(positions.eq(minor), Math.floor(value / 10) % 10);
      switchDigit(positions.eq(major), value % 10);
    }

    return this;
  };


  function init(elem, options) {
    elem.addClass('countdownHolder');

    // Создаем разметку внутри контейнера
    $.each(['Days', 'Hours', 'Minutes', 'Seconds'], function (i) {
      $('<span class="count' + this + '">').html(
        '<span class="position">\
					<span class="digit static">0</span>\
				</span>\
				<span class="position">\
					<span class="digit static">0</span>\
				</span>'
      ).appendTo(elem);

      if (this != "Seconds") {
        elem.append('<span class="countDiv countDiv' + i + '"></span>');
      }
    });

  }

  // Создаем анимированный переход между двумя цифрами
  function switchDigit(position, number) {

    var digit = position.find('.digit')

    if (digit.is(':animated')) {
      return false;
    }

    if (position.data('digit') == number) {
      // Мы уже вывели данную цифру
      return false;
    }

    position.data('digit', number);

    var replacement = $('<span>', {
      'class': 'digit',
      css: {
        top: '-2.1em',
        opacity: 0
      },
      html: number
    });

    // Класс .static добавляется, когда завершается анимация.
    // Выполнение идет более плавно.

    digit
      .before(replacement)
      .removeClass('static')
      .animate({
        top: '2.5em',
        opacity: 0
      }, 'fast', function () {
        digit.remove();
      })

    replacement
      .delay(100)
      .animate({
        top: 0,
        opacity: 1
      }, 'fast', function () {
        replacement.addClass('static');
      });
  }
})(jQuery);

$(function () {
  var myDate = new Date();

  function returnEndDate(d, h, m) {
    myDate.setDate(myDate.getDate() + d);
    myDate.setHours(myDate.getHours() + h);
    myDate.setMinutes(myDate.getMinutes() + m);
    return myDate;
  }
  if ($.cookie("timer")) {
    var dateEnd = $.cookie("timer");
  } else {
    var dateEnd = returnEndDate(3, 0, 0);
    $.cookie("timer", dateEnd, {
      expires: 3
    });
  }


  var note = $('#note'),
    ts = new Date(dateEnd),
    // ts =dateEnd,
    //    ts = new Date(2018, 02, 11),
    newYear = true;



  $('#countdown').countdown({
    timestamp: ts,
    callback: function (days, hours, minutes, seconds) {

    }
  });

  $('#countdown_1').countdown({
    timestamp: ts,
    callback: function (days, hours, minutes, seconds) {

    }
  });
  $('.countDays').append('<span class="title">дней</span>');
  $('.countHours').append('<span class="title">часов</span>');
  $('.countMinutes').append('<span class="title">минут</span>');
  $('.countSeconds').append('<span class="title">секунд</span>');

  function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
      vars[key] = value;
    });
    return vars;
  }
  $('input[name="utm_source"]').val(getUrlVars()["utm_source"]);
  $('input[name="utm_campaign"]').val(getUrlVars()["utm_campaign"]);
  $('input[name="utm_medium"]').val(getUrlVars()["utm_medium"]);
  $('input[name="utm_term"]').val(getUrlVars()["utm_term"]);
  $('input[name="utm_content"]').val(getUrlVars()["utm_content"]);
  $('input[name="click_id"]').val(getUrlVars()["aff_sub"]);
  $('input[name="affiliate_id"]').val(getUrlVars()["aff_id"]);
  //     $('input[name="page_url"]').val(window.location.hostname);
  $('input[name="ref"]').val(document.referrer);

  $.get("https://ipinfo.io", function (response) {
    $('input[name="ip_address"]').val(response.ip);
    $('input[name="city"]').val(response.city);
    $('input[name="country"]').val(response.country);
    $('input[name="region"]').val(response.region);
  }, "jsonp");

  $('form').on('submit', function (e) {

    e.preventDefault();

    var $form = $(this);
    var msg = $form.find('input, textarea, select');
    $form.find('.submit').addClass('inactive');
    $form.find('.submit').prop('disabled', true);

    $.ajax({
      type: 'POST',
      url: 'db/registration.php',
      data: msg,
      success: function (response) {}
    });

    setTimeout(function () {
      window.location.href = 'success.html';
    }, 1000);
  });


  function readCookie(name) {
    var n = name + "=";
    var cookie = document.cookie.split(';');
    for (var i = 0; i < cookie.length; i++) {
      var c = cookie[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(n) == 0) {
        return c.substring(n.length, c.length);
      }
    }
    return null;
  }
  setTimeout(function () {
    $('.gclid_field').val(readCookie('gclid'));
    if ($('.gclid_field').val() == '') {
      $('.gclid_field').val(readCookie('_gid'));
    }
  }, 2000);
});