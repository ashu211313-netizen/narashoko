document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const startBtn = document.getElementById('start-btn');
    const bgm = document.getElementById('bgm');
    const audioToggle = document.getElementById('audio-toggle');

    if (startBtn) {
        startBtn.onclick = () => {
            // ローダーのフェードアウト
            loader.classList.add('is-fadeout');

            // BGMの音量を0から上げて再生
            if (bgm) {
                bgm.volume = 0;
                bgm.play().then(() => {
                    let vol = 0;
                    const fade = setInterval(() => {
                        if (vol < 0.4) { 
                            vol += 0.05; 
                            bgm.volume = Math.min(vol, 0.4); 
                        } else { 
                            clearInterval(fade); 
                        }
                    }, 200);
                    audioToggle.textContent = 'MUSIC: ON';
                }).catch(err => console.log("User interaction required for audio"));
            }

            // 本編のフェードイン開始
            document.body.classList.add('is-started');

            // フェードアウト完了後にDOMから削除
            setTimeout(() => { 
                loader.style.display = 'none'; 
            }, 1500);
        };
    }

    // スクロール時のふわっと表示
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // 音声トグル
    if (audioToggle && bgm) {
        audioToggle.onclick = () => {
            if (bgm.paused) {
                bgm.play();
                audioToggle.textContent = 'MUSIC: ON';
            } else {
                bgm.pause();
                audioToggle.textContent = 'MUSIC: OFF';
            }
        };
    }
});
