document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const startBtn = document.getElementById('start-btn');
    const bgm = document.getElementById('bgm');
    const audioToggle = document.getElementById('audio-toggle');

    startBtn.addEventListener('click', () => {
        // 1. スタート画面をフェードアウトさせる
        loader.classList.add('is-fadeout');

        // 2. 音の再生とフェードイン
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

        // 3. フェードアウトの時間に合わせて本編を表示させる
        setTimeout(() => {
            document.body.classList.add('is-started'); 
            // 1.5秒後に完全に要素を消してスクロール可能にする
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000); 
    });

    // BGMの切り替え
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
