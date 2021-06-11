$(document).ready(function() {
    $('.language').on('click', function() {
        if($(this).hasClass('open')) {
            $(this).removeClass('open');
        } else {
            $(this).addClass('open');
        }
    });
    $('.language .popup div').on('click', function(e) {
        e.stopPropagation();
        // change language code
    });

    squareScroll($('.top__square'));
    squareScroll($('.bot__square'));

    var previousScrollTop = 0;
    var scrollLock = false;
    $(document).scroll(function(e) {
        var mainItems = $('.main-items');
        var mainItemsOffset = mainItems.offset().top - 200;
        var cScroll = $(this).scrollTop();
        console.log(cScroll, mainItemsOffset);

        if(cScroll > previousScrollTop) {
            if(cScroll > mainItemsOffset) {
                if(!mainItems.hasClass('active2')) {
                    scrollLock = true;
                    if(scrollLock) {
                        $(this).scrollTop(previousScrollTop);
                    }
                }
                if(mainItems.hasClass('active1')) {
                    mainItems.removeClass('active2').addClass('active2');
                }
                if(mainItems.hasClass('active0')) {
                    mainItems.removeClass('active0').addClass('active1');
                }
                console.log(cScroll, mainItemsOffset, previousScrollTop, scrollLock);
            }
        } else if(cScroll < previousScrollTop) {
            if (cScroll < mainItemsOffset) {
                if(mainItems.hasClass('active2')) {
                    scrollLock = true;
                    if(scrollLock) {
                        $(this).scrollTop(previousScrollTop);
                    }
                }
                if(mainItems.hasClass('active1')) {
                    mainItems.removeClass('active1').addClass('active0');
                }
                if(mainItems.hasClass('active2')) {
                    mainItems.removeClass('active2').addClass('active1');
                }
            }
        }
        previousScrollTop = $(this).scrollTop();
    });
});

function squareScroll($el) {
    var maxHp = 100 / ($(document).height() - $(window).height() + $el.height() * 2);
    var pre = $(document).scrollTop();
    $(document).scroll(function() {
        var cScroll = $(this).scrollTop();
        var p = cScroll * maxHp / 20;
        if(cScroll > pre) {
            $el.css({'top': $el.position().top + p + 'px'});
        } else {
            $el.css({'top': $el.position().top - p + 'px'});
        }
        pre = cScroll;
    });
}