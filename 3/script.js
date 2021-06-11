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


});