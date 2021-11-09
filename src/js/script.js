// $(document).ready(function () {
//     $('.carousel__inner').slick({
//         speed: 1200,
//         adaptiveHeight: true,
//         prevArrow: '<button type="button" class="slick-prev"><img src="../icons/left.png"></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src="../icons/right.png"></button>',
//         responsive: [
//             {
//                 breakpoint: 992,
//                 settings: {
//                     dots: true,
//                     arrows: false
//                 }
//             }
//         ] 
//     });
// });

const swiper = new Swiper('.swiper', {
  slidesPerView: 1,
  direction: 'horizontal',
  loop: true,
  navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
  },
  pagination: {
          el: ".swiper-pagination",
          clickable: true
  }
});

//tabs
$(function() {
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });
});

//tabs-back
function toggleSlide(item) {
    $(item).each(function (i) {
    $(this).on('click', function (e) {
      e.preventDefault();
      $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
      $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    });
  });
}

toggleSlide('.catalog-item__link');
toggleSlide('.catalog-item__back');

//Modal

$('[data-modal=consultation]').on('click', function () {
  $('.overlay, #consultation').fadeIn('fast');
});


//close modal
$('.modal__close').on('click', function () {
  $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
});
$('.button_mini').each(function (i) {
  $(this).on('click', function () {
    $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
    $('.overlay, #order').fadeIn('slow');
  });
});


function validateForms(form) {
  $(form).validate({
    rules: {
      name: "required",
      phone: "required",
      email: {
          required: true,
          email: true
        }
  },
  messages: {
      name: "Пожалуйста, введите своё имя",
      phone: "Пожалуйста введите свой телефон",
      email: {
          required: "Пожалуйста, введите свою почту",
          email: "Неправильно введен адрес почты"
        }
    }
  });
}

validateForms('#consultation-form');
validateForms('#consultation form');
validateForms('#order form');

$(function () {
  $("input[name=phone]").mask("+7 (999) 999-99-99");
});

$(window).scroll(function () {
  if ($(this).scrollTop() > 1600) {
    $('.pageup').fadeIn();
  } else {
    $('.pageup').fadeOut();
  }

});

new WOW().init();

$('form').submit(function(e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "mailer/smart.php",
    data: $(this).serialize()
  }).done(function () {
    $(this).find("input").val("");
    $('#consultation, #order').fadeOut();
    $('.overlay, #thanks').fadeIn('slow');
    

    $('form').trigger('reset');
  });
  return false;
});


