document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const startBtn = document.getElementById('start-btn');
    const bgm = document.getElementById('bgm');

    // 1. スタート体験
    startBtn.addEventListener('click', () => {
        loader.classList.add('hidden');
        if (bgm.src) {
            bgm.play().catch(e => console.log("Audio play blocked"));
        }
    });

    // 2. スクロール監視 (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // 3. パララックス効果 (簡易版)
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // 背景文字を少し動かす
        const labels = document.querySelectorAll('.bg-label');
        labels.forEach(label => {
            label.style.transform = `translateX(-50%) translateY(${scrolled * 0.1}px)`;
        });

        // 写真を個別に慣性で動かす (魔改造エッセンス)
        const wrappers = document.querySelectorAll('.img-wrapper');
        wrappers.forEach((wrapper, index) => {
            const speed = (index % 3 + 1) * 0.05;
            const yPos = -(scrolled * speed);
            // 画面内にある時だけ適用
            const rect = wrapper.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                wrapper.style.transform = `translateY(${yPos * 0.2}px)`;
            }
        });
    });
});
