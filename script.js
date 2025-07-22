document.addEventListener('DOMContentLoaded', function() {

    // --- ヘッダーのスクロール処理 ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- スクロールに応じたアニメーション ---
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

    // --- 成功事例スライダー ---
    const slider = document.querySelector('.case-scroll-wrapper');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const slide = document.querySelector('.case-study');

    if (slider && prevBtn && nextBtn && slide) {
        const slideWidth = slide.offsetWidth + 40; // 40はmargin

        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: slideWidth, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -slideWidth, behavior: 'smooth' });
        });
    }

    // --- フォーム送信のダミー処理 ---
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('お問い合わせありがとうございます。\n内容を確認の上、担当者よりご連絡いたします。');
            form.reset();
        });
    }
});