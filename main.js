document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const startBtn = document.getElementById('start-btn');
    const bgm = document.getElementById('bgm');
    const audioToggle = document.getElementById('audio-toggle');

    // ---- Entrance ----
    startBtn.addEventListener('click', () => {
        loader.classList.add('loaded');
        bgm.volume = 0.35;
        bgm.play().catch(() => {});
        audioToggle.textContent = 'MUSIC: ON';
    });

    audioToggle.addEventListener('click', () => {
        if (bgm.paused) {
            bgm.play();
            audioToggle.textContent = 'MUSIC: ON';
        } else {
            bgm.pause();
            audioToggle.textContent = 'MUSIC: OFF';
        }
    });

    // ---- 呼吸する可視化 ----
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const el = entry.target;

            // 主役は遅れて深く
            if (el.classList.contains('primary')) {
                setTimeout(() => {
                    el.classList.add('is-visible');
                }, 400);
            } else {
                el.classList.add('is-visible');
            }

            observer.unobserve(el);
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
    });

    document
        .querySelectorAll('.event, .time-mark, .main-title')
        .forEach(el => observer.observe(el));
});
