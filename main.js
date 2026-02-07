document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const startBtn = document.getElementById('start-btn');
    const bgm = document.getElementById('bgm');
    const audioToggle = document.getElementById('audio-toggle');

    // --- 1. STARTボタン：ロード解除と音楽再生 ---
    startBtn.addEventListener('click', () => {
        loader.classList.add('loaded');
        bgm.volume = 0.4;
        bgm.play().then(() => {
            audioToggle.textContent = 'MUSIC: ON';
        }).catch(() => {
            console.log("Audio playback blocked by browser.");
            audioToggle.textContent = 'MUSIC: OFF';
        });
    });

    // --- 2. 音楽切り替えトグル ---
    audioToggle.addEventListener('click', () => {
        if (bgm.paused) {
            bgm.play();
            audioToggle.textContent = 'MUSIC: ON';
        } else {
            bgm.pause();
            audioToggle.textContent = 'MUSIC: OFF';
        }
    });

    // --- 3. スクロール監視：フェードイン（Intersection Observer） ---
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // 一度表示されたら監視を終了して負荷を軽減
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px" 
    });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // --- 4. 視差効果：学年ラベルをゆっくり動かす ---
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const labels = document.querySelectorAll('.grade-label');
        labels.forEach(label => {
            // CSSの translateX(-50%) を維持しながら translateY を適用
            const speed = 0.15;
            label.style.transform = `translateX(-50%) translateY(${scrolled * speed}px)`;
        });
    });
});
