$(document).ready(function () {
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


    squareScroll($('.prize__img'));
});

function squareScroll($el) {
    var maxHp = 100 / ($(document).height() - $(window).height() + $el.height() * 2);
    var pre = $(document).scrollTop();
    $(document).scroll(function () {
        var cScroll = $(this).scrollTop();
        var p = cScroll * maxHp / 20;
        if (cScroll > pre) {
            $el.css({
                'top': $el.position().top + p + 'px'
            });
        } else {
            $el.css({
                'top': $el.position().top - p + 'px'
            });
        }
        pre = cScroll;
    });
}

$("#carouselExampleControls").carousel({
    interval: false
});