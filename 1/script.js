$(document).ready(function () {

    let form;
    const codes = {
        'USA': '+1',
        'Canada': '+1',
        'Australia': '+61',
        'England': '+44',
        'Singapore': '+65',
        'New Zealand': '+64',
        'Mexico': '+52',
        'Spain': '+34',
        'Argentina': '+54',
        'Colombia': '+57',
        'Hong Kong': '+852',

    };

    const messageErrorEn = `
    <p>
    Message not sent.<br> 
    Please fill in the required fields 
    </p>
    `;

    const messageErrorSp = `
    <p>
        Mensaje no enviado.<br> 
        Por favor llene los campos requeridos
    </p>
    `;


    $('.country-select').on("change", function () {
        form = $(this).parents('form');
        const county = this.value;
        const codesCounry = codes[county];
        $('.phone-select', form).val(codesCounry);
    });

    $('.country-select').on("focus", function () {
        $(this).css('border', 'none');
        $('.country-select-error').css('display', 'none');
    });

    $('.prize-select').on("focus", function () {
        $(this).css('border', 'none');
        $('.prize-select-error').css('display', 'none');
    });


    let participate;
    if($(document).width() < 1050) {
        $('.participate-select').prop('checked', true);
        if ($('.participate-select').is(':checked')) {
            participate = true;
            $('.phone-select', form).prop('required', true);
            $('.name-select', form).prop('required', true);
        } else {
            $('.phone-select', form).prop('required', false);
            $('.name-select', form).prop('required', false);
            participate = false;
        }
    } else {
        $('.participate-select').prop('checked', false);
        participate = false;
    }

    $('.participate-select').on("change", function () {
        form = $(this).parents('form');
        const check = $(this).is(':checked');
        if (check) {
            participate = true;
            $('.phone-select', form).prop('required', true);
            $('.name-select', form).prop('required', true);
        } else {
            $('.phone-select', form).prop('required', false);
            $('.name-select', form).prop('required', false);
            participate = false;
        }
    });


    $('.mobile.burger').on('click', function(e) {
        e.stopPropagation();
        $('.mobile.menu').addClass('active');
        $('.mobile.menu').removeClass('close__active');
        $('.bg__menu').addClass('active');
        $('.bg__menu').removeClass('close__active');
    });
    $('.mobile.menu .close').on('click', function() {
        $('.mobile.menu').addClass('close__active');
        $('.mobile.menu').removeClass('active');
        $('.bg__menu').addClass('close__active');
        $('.bg__menu').removeClass('active');
    });
    $('.mobile.menu').on('click', function(e) {
        e.stopPropagation();
    });
    $('body').on('click', function() {
        if($('.mobile.menu').hasClass('active')) {
            $('.mobile.menu').addClass('close__active');
            $('.mobile.menu').removeClass('active');
            $('.bg__menu').addClass('close__active');
            $('.bg__menu').removeClass('active');
        }
    });

    $(".modal .close:not(.not-mob)").on('click', function() {
        $(this).parents('.modal').addClass('modal__close');
        setTimeout(function() {
            $(this).parents('.modal').removeClass('modal__close');
        }, 1000);
    });



    $("#formModal form").submit(function (event) {
        event.preventDefault();
        const data = $(this).serializeArray();

        const checkCountry = data.find((value) => {
            if (value.name === "country") {
                return true;
            }
        });

        if (!checkCountry) {
            $('.country-select', this).css('border', '2px solid red');
            if ($('html').attr('lang') === 'en') {
                $('.country-select-error', this).html(messageErrorEn);

            } else if ($('html').attr('lang') === 'sp') {
                $('.country-select-error', this).html(messageErrorSp);
            }
            $('.country-select-error', this).css('display', 'block');
            return false;
        }



        if (participate) {
            const prize = data.find((value) => {
                if (value.name === "prize") {
                    return true;
                }
            });


            if (!prize) {
                $('.prize-select', this).css('border', '2px solid red');
                if ($('html').attr('lang') === 'en') {
                    $('.prize-select-error', this).html(messageErrorEn);

                } else if ($('html').attr('lang') === 'sp') {
                    $('.prize-select-error', this).html(messageErrorSp);
                }
                $('.prize-select-error', this).css('display', 'block');
                return false
            }
        }

        const messageEn = `
           <p class="not-mob">
                  <span>Your message has</br> been sent</br> successfully!</span></br></br>
                    In the near future you will</br> receive a confirmation to</br> the specified e-mail.</br></br></br>
                    Thank You!  
                  </p> 
          <div class="mobile">
              <div class="title">The message was sent successfully</div>
              <div class="smile"><img src="./img/smile.svg" alt="smile"></div>
              <div class="subtitle">Thank you!</div>
            </div>
        `;
        const messageSp = `
              <p class="not-mob">
                  <span>¡Tu mensaje ha</br>sido enviado</br> exitosamente!</span></br></br>
                    En un futuro próximo,</br> receive a confirmation</br>en el correo electrónico</br>especificado.
                  </p> 
          <div class="mobile">
              <div class="title">El mensaje se envió con éxito </div>
              <div class="smile"><img src="./img/smile.svg" alt="smile"></div>
              <div class="subtitle">¡Gracias!</div>
            </div>
        
        `;


        fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: data
            })
            .then(() => {
                const parent = $(this).parent();
                parent.addClass('blockform-send');
                if ($('html').attr('lang') === 'en') {
                    parent.html(messageEn);
                } else if ($('html').attr('lang') === 'sp') {
                    parent.html(messageSp);
                }

            })
            .catch(() => {
                console.log('error');
            });

    });

    $("#formModal2 form").submit(function (event) {
        event.preventDefault();
        const data = $(this).serializeArray();

        const checkName = data.find((value) => {
            if (value.name === "name" && value.value) {
                return true;
            }
        });

        if(!checkName) {
            $('.name-select', this).css('border', '2px solid red');
            return false;
        }

        const messageEn = `
           <p class="not-mob">
              <span>Your message has</br> been sent</br> successfully!</span></br></br>
                In the near future you will</br> receive a confirmation to</br> the specified e-mail.</br></br></br>
                Thank You!  
            </p>
          <div class="mobile">
              <div class="title">The message was sent successfully</div>
              <div class="smile"><img src="./img/smile.svg" alt="smile"></div>
              <div class="subtitle">Thank you!</div>
            </div>
        `;
        const messageSp = `
              <p class="not-mob">
                  <span>¡Tu mensaje ha</br>sido enviado</br> exitosamente!</span></br></br>
                    En un futuro próximo,</br> receive a confirmation</br>en el correo electrónico</br>especificado.
                  </p> 
          <div class="mobile">
              <div class="title">El mensaje se envió con éxito </div>
              <div class="smile"><img src="./img/smile.svg" alt="smile"></div>
              <div class="subtitle">¡Gracias!</div>
            </div>
        
        `;


        fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: data
            })
            .then(() => {
                const parent = $(this).parent();
                parent.addClass('blockform-send');
                if ($('html').attr('lang') === 'en') {
                    parent.html(messageEn);
                } else if ($('html').attr('lang') === 'sp') {
                    parent.html(messageSp);
                }

            })
            .catch(() => {
                console.log('error');
            });

    });



    $('.language').on('click', function () {
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
        } else {
            $(this).addClass('open');
        }
    });
    $('.language .popup div').on('click', function (e) {
        e.stopPropagation();
        // change language code
    });

    $('.popup').mouseleave(function () {
        $('.language').removeClass('open');
    })

    $('.top__square').each(function () {
        squareScroll($(this));
    });
    $('.bot__square').each(function () {
        squareScroll($(this));
    });

    var previousScrollTop = 0;
    var scrollLock = false;
    $(document).scroll(function (e) {
        var mainItems = $('.main-items');
        var mainItemsOffset = mainItems.offset().top - 200;
        var cScroll = $(this).scrollTop();

        if (cScroll > previousScrollTop) {
            if (cScroll > mainItemsOffset) {
                if (!mainItems.hasClass('active2')) {
                    e.preventDefault();
                    scrollLock = true;
                    if (scrollLock) {
                        $(this).scrollTop(previousScrollTop);
                    }
                }
                if (mainItems.hasClass('active1')) {
                    mainItems.removeClass('active1').addClass('active2');
                }
                if (mainItems.hasClass('active0')) {
                    mainItems.removeClass('active0').addClass('active1');
                }
                return;
            }
        } else if (cScroll < previousScrollTop) {
            if (cScroll < mainItemsOffset) {
                if (mainItems.hasClass('active2')) {
                    e.preventDefault();
                    scrollLock = true;
                    if (scrollLock) {
                        $(this).scrollTop(previousScrollTop);
                    }
                }
                if (mainItems.hasClass('active1')) {
                    mainItems.removeClass('active1').addClass('active0');
                }
                if (mainItems.hasClass('active2')) {
                    mainItems.removeClass('active2').addClass('active1');
                }
                return;
            }
        }
        previousScrollTop = $(this).scrollTop();
    });
});

function squareScroll($el) {
    var maxHp = 100 / ($(document).height() - $(window).height() + $el.height() * 2);
    var pre = $(document).scrollTop();
    var preEl = $el.position().top;
    $(document).scroll(function () {
        var cScroll = $(this).scrollTop();
        var p = cScroll * maxHp / 50;
        if (cScroll > pre) {
            if ((preEl - $el.position().top) >= -100) {
                // console.log('bot', (preEl - $el.position().top))
                $el.css({
                    'top': $el.position().top + p + 'px'
                });
            }
        } else {
            if (preEl - $el.position().top <= 100) {
                // console.log('top', (preEl - $el.position().top))
                $el.css({
                    'top': $el.position().top - p + 'px'
                });
            }
        }
        pre = cScroll;
    });
}



// header background

var header = $("header");
if ($(window).width() >= 960) {
    if ($(window).scrollTop() !== 0) header.addClass("bg-white");
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll === 0) {
            header.removeClass("bg-white");
        } else header.addClass("bg-white");
    });
}