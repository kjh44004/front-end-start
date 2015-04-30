$(window).scroll(function() {
    if ($(window).scrollTop() == $(document).height() - $(window).height()) {
        $(document.body).animate({scrollTop:0},1000);
    }    
});