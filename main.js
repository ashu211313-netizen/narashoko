document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const startBtn = document.getElementById('start-btn');
    const bgm = document.getElementById('bgm');
    const audioToggle = document.getElementById('audio-toggle');

    if (startBtn) {
        startBtn.onclick = () => {
            // ローダーのフェードアウト開始
            loader.classList.add('is-fadeout');

            // BGMのフェードイン再生
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
                }).catch(err => console.log("Audio play blocked by browser."));
            }

            // 本編（ヒーローセクション・メインコンテンツ）を時間差で表示
            setTimeout(() => {
                document.body.classList.add('is-started');
                // アニメーション完了後にDOMから削除して負荷を軽減
                setTimeout(() => { 
                    loader.style.display = 'none'; 
                }, 1000);
            }, 600);
        };
    }

    // スクロールに応じたふわっとした表示（Intersection Observer）
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // ミュージックトグル機能（任意）
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
