$(document).ready(function () {
  $('.review-carousel').owlCarousel({
    loop: true,
    margin: 0,
    nav: true,
    animateOut: 'fadeOut',
     animateIn: 'fadeIn',
    responsive: {
      0: {
        items: 1
      }
    }
  })
  
  $('.review-tab_link li').click(function(){
    $(this).parents('.col-lg-8').find('.review-tab_link li').removeClass('active');
    $(this).parents('.col-lg-8').find('.tab-item').removeClass('active');
    $(this).addClass('active');
    $('#'+$(this).data('tab')).addClass('active');
  })
});