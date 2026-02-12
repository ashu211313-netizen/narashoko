document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const startBtn = document.getElementById('start-btn');
    const bgm = document.getElementById('bgm');
    const audioToggle = document.getElementById('audio-toggle');

    if (startBtn) {
        startBtn.onclick = () => {
            // ローダーのフェードアウト
            loader.classList.add('is-fadeout');

            // BGMのフェードイン再生
            if (bgm) {
                bgm.volume = 0;
                bgm.play().then(() => {
                    let vol = 0;
                    const fade = setInterval(() => {
                        if (vol < 0.35) { 
                            vol += 0.02; 
                            bgm.volume = Math.min(vol, 0.35); 
                        } else { 
                            clearInterval(fade); 
                        }
                    }, 150);
                    audioToggle.textContent = 'MUSIC: ON';
                }).catch(err => console.log("Audio interaction required."));
            }

            // 本編のフェードイン
            setTimeout(() => {
                document.body.classList.add('is-started');
                setTimeout(() => { 
                    loader.style.display = 'none'; 
                }, 1500);
            }, 800);
        };
    }

    // スクロール検知（画像ふわっと表示）
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // 音声制御
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
