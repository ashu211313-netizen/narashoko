document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const startBtn = document.getElementById('start-btn');
    const bgm = document.getElementById('bgm');
    const audioToggle = document.getElementById('audio-toggle');

    startBtn.addEventListener('click', () => {
        // 1. 全体ズーム開始（コンテナとローダーにクラス付与）
        startBtn.classList.add('zoom-active');
        loader.classList.add('is-zooming');

        // 2. 音の同期：ズーム開始とともにフェードイン
        bgm.volume = 0;
        bgm.play().catch(() => {});
        let vol = 0;
        const fadeAudio = setInterval(() => {
            if (vol < 0.4) {
                vol += 0.05;
                bgm.volume = vol;
            } else {
                clearInterval(fadeAudio);
            }
        }, 150);
        audioToggle.textContent = 'MUSIC: ON';

        // 3. ズームの勢いが最大になるタイミングで本編を表示
        setTimeout(() => {
            loader.style.display = 'none';
            document.body.classList.add('is-started'); 
        }, 1200); // 1.2秒で切り替え
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

    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
