document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const startBtn = document.getElementById('start-btn');
    const bgm = document.getElementById('bgm');
    const audioToggle = document.getElementById('audio-toggle');

    startBtn.addEventListener('click', () => {
        // 1. ズーム発動
        startBtn.classList.add('zoom-active');
        loader.classList.add('is-zooming');

        // 2. 音の同期
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

        // 3. 画面切り替え（1.2秒後、ズームが突き抜けたタイミング）
        setTimeout(() => {
            loader.style.display = 'none';
            document.body.classList.add('is-started'); 
        }, 1200);
    });

    // スクロール監視
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
