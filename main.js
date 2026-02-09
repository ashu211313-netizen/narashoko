document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const startBtn = document.getElementById('start-btn');
    const bgm = document.getElementById('bgm');

    startBtn.addEventListener('click', () => {
        bgm.volume = 0.3;
        bgm.play().catch(() => {});
        
        loader.classList.add('loaded');
        
        // 起動の余韻
        setTimeout(() => {
            document.querySelector('.years').classList.add('is-visible');
        }, 500);
    });

    // 呼吸するような監視設定
    const observerOptions = {
        threshold: 0.05, // わずかに入ったら始動
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                // 少しだけランダムな遅延を入れて「均一さ」を殺す
                const delay = Math.random() * 300;
                setTimeout(() => {
                    e.target.classList.add('is-visible');
                }, delay);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .fade-in-special').forEach(el => observer.observe(el));

    // 音声トグルは最小限に
    document.getElementById('audio-toggle').addEventListener('click', (e) => {
        if (bgm.paused) { bgm.play(); e.target.style.opacity = "0.8"; }
        else { bgm.pause(); e.target.style.opacity = "0.3"; }
    });
});
