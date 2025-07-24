document.addEventListener('DOMContentLoaded', function() {
    initHeaderScroll();
    initScrollAnimation();
    initCaseSlider();
    initContactForm();
});

function initHeaderScroll() {
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

function initScrollAnimation() {
    const targets = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1
    });
    targets.forEach(target => {
        observer.observe(target);
    });
}

function initCaseSlider() {
    const slider = document.querySelector('.case-scroll-wrapper');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const slides = document.querySelectorAll('.case-study');
    if (slider && prevBtn && nextBtn && slides.length > 0) {
        const slideWidth = slides[0].offsetWidth + 40; // 40はmargin
        let autoScrollInterval;
        let isHovered = false;

        function scrollNext() {
            if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth - 1) {
                slider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                slider.scrollBy({ left: slideWidth, behavior: 'smooth' });
            }
        }
        function scrollPrev() {
            if (slider.scrollLeft === 0) {
                slider.scrollTo({ left: slider.scrollWidth, behavior: 'smooth' });
            } else {
                slider.scrollBy({ left: -slideWidth, behavior: 'smooth' });
            }
        }
        nextBtn.addEventListener('click', scrollNext);
        prevBtn.addEventListener('click', scrollPrev);

        // 自動スクロール
        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                if (!isHovered) scrollNext();
            }, 4000);
        }
        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }
        slider.addEventListener('mouseenter', () => { isHovered = true; });
        slider.addEventListener('mouseleave', () => { isHovered = false; });
        startAutoScroll();

        // スワイプ対応
        let startX = 0;
        let isDown = false;
        slider.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].clientX;
        });
        slider.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            let moveX = e.touches[0].clientX;
            if (moveX - startX > 50) {
                scrollPrev();
                isDown = false;
            } else if (startX - moveX > 50) {
                scrollNext();
                isDown = false;
            }
        });
        slider.addEventListener('touchend', () => { isDown = false; });
    }
}

function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('お問い合わせありがとうございます。\n内容を確認の上、担当者よりご連絡いたします。');
            form.reset();
        });
    }
}