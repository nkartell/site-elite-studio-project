$(document).ready(function(){
    var owl = $('.owl-carousel');
    owl.owlCarousel({
        items: 4,  // Устанавливаем 4 элемента по умолчанию
        loop: true,
        margin: 10,
        nav: false,
        dots: false,
        responsive: {
            0: {
                items: 1  // 1 элемент для экранов шире 0px
            },
            531: {
                items: 2  // 2 элемента для экранов шире 531px
            },
            1121: {
                items: 4  // 4 элемента для экранов шире 1121px
            }
        }
    });

    $('.slider__button_left').click(function() {
        owl.trigger('prev.owl.carousel');
    });

    $('.slider__button_right').click(function() {
        owl.trigger('next.owl.carousel');
    });
});