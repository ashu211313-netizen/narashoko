document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const startBtn = document.getElementById('start-btn');
    const bgm = document.getElementById('bgm');
    const audioToggle = document.getElementById('audio-toggle');

    if (startBtn) {
        startBtn.onclick = () => {
            // ローダーを非表示にするクラスを追加
            loader.classList.add('is-fadeout');

            // BGMの処理
            if (bgm) {
                bgm.volume = 0;
                bgm.play().then(() => {
                    let vol = 0;
                    const fade = setInterval(() => {
                        if (vol < 0.3) { 
                            vol += 0.05; 
                            bgm.volume = Math.min(vol, 0.3); 
                        } else { 
                            clearInterval(fade); 
                        }
                    }, 200);
                    audioToggle.textContent = 'MUSIC: ON';
                }).catch(err => console.log("Safari requirements: User gesture needed for audio."));
            }

            // 本編のフェードインクラスを付与
            document.body.classList.add('is-started');

            // 完全に隠れたらDOMから消去
            setTimeout(() => { 
                loader.style.display = 'none'; 
            }, 1100);
        };
    }

    // スクロール時のアニメーション
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // ミュージックトグル
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
