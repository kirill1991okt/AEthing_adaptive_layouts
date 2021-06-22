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


    $('.participate-select').prop('checked', false);
    let participate = false;

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



    $("form").submit(function (event) {
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
           <p>
                  <span>Your message has</br> been sent</br> successfully!</span></br></br>
                    In the near future you will</br> receive a confirmation to</br> the specified e-mail.</br></br></br>
                    Thank You!  
                  </p> 
        `;
        const messageSp = `
              <p>
                  <span>¡Tu mensaje ha</br>sido enviado</br> exitosamente!</span></br></br>
                    En un futuro próximo,</br> receive a confirmation</br>en el correo electrónico</br>especificado.
                    
                  </p> 
        
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


    //////////////////////////////


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
    });


    $("#carouselExampleControls").carousel({
        interval: false
    });

    $('.items__img').on('click', function () {
        $('.prize__container .slider-wrapper').css('display', 'block');
    })
    $('.slider-closer').on('click', function () {
        $('.prize__container .slider-wrapper').css('display', 'none');
    })

});