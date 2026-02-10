document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const startBtn = document.getElementById('start-btn');
    const bgm = document.getElementById('bgm');
    const audioToggle = document.getElementById('audio-toggle');

    startBtn.addEventListener('click', () => {
        // 1. ズーム発動（コンテナとボタンにクラスを付与）
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

        // 3. 画面切り替え：ズームが視界を白く染め上げた瞬間に実行
        setTimeout(() => {
            loader.style.display = 'none'; // ロード画面を物理的に消す
            document.body.classList.add('is-started'); // 本編タイトルを浮上させる
        }, 1200); // 1.2秒後
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

    // スクロール時のフェードイン監視
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
