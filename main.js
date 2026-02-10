document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const startBtn = document.getElementById('start-btn');
    const bgm = document.getElementById('bgm');
    const audioToggle = document.getElementById('audio-toggle');

    startBtn.addEventListener('click', () => {
        // 1. ズームアニメーション開始用のクラス付与
        startBtn.classList.add('zoom-active');
        loader.classList.add('is-zooming');

        // 2. 音の同期（低音が入るイメージで少し遅れてメインボリュームへ）
        bgm.volume = 0;
        bgm.play().catch(() => {});
        
        // 徐々にボリュームアップ（フェードイン）
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

        // 3. ズーム完了のタイミング（1.1秒）でロード画面を完全に消し、本編を開始
        setTimeout(() => {
            loader.style.display = 'none';
            document.body.classList.add('is-started'); 
        }, 1100);
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
