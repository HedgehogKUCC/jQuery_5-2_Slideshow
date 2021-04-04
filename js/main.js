$(function () {
    const $container = $('#slideshow');
    const $slideGroup = $container.find('.slideshow-slides');
    const $slides = $slideGroup.find('.slide');
    const $nav = $container.find('.slideshow-nav');
    const $indicator = $container.find('.slideshow-indicator');

    const slideCount = $slides.length;
    let indicatorHTML = '';
    let currentIndex = 0;
    const duration = 500;
    const easing = 'easeInOutExpo';
    const interval = 3000;
    let timer;

    goToSlide(currentIndex);
    startTimer();

    $slides.each(function (i) {
        $(this).css({ left: 100 * i + '%' });
        indicatorHTML += `<a href="#">${i+1}</a>`;
    });

    $indicator.html(indicatorHTML);

    $nav.on('click', 'a', function (e) {
        e.preventDefault();
        if ($(this).hasClass('prev')) {
            goToSlide(currentIndex - 1);
        } else {
            goToSlide(currentIndex + 1);
        }
    });

    $indicator.on('click', 'a', function (e) {
        e.preventDefault();
        if (!$(this).hasClass('active')) {
            goToSlide($(this).index());
        }
    });

    $container.on({
        mouseover: stopTimer(),
        mouseout: startTimer()
    });

    function goToSlide(index) {
        $slideGroup.animate({ left: -100 * index + '%' }, duration, easing);

        currentIndex = index;

        updateNav();
    }

    function updateNav() {
        const $navPrev = $nav.find('.prev');
        const $navNext = $nav.find('.next');

        if (currentIndex === 0) {
            $navPrev.addClass('disabled');
        } else {
            $navPrev.removeClass('disabled');
        }

        if (currentIndex === slideCount-1) {
            $navNext.addClass('disabled');
        } else {
            $navNext.removeClass('disabled');
        }

        $indicator.find('a').removeClass('active').eq(currentIndex).addClass('active');
    }

    function startTimer() {
        timer = setInterval(function () {
            let nextIndex = (currentIndex + 1) % slideCount;
            goToSlide(nextIndex);
        }, interval);
    }

    function stopTimer() {
        clearInterval(timer);
    }
});