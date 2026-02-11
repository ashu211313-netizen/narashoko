document.addEventListener('DOMContentLoaded', () => {
    // 要素の取得
    const loader = document.getElementById('loader');
    const startBtn = document.getElementById('start-btn');
    const bgm = document.getElementById('bgm');
    const audioToggle = document.getElementById('audio-toggle');

    // ボタンクリック時の処理
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            console.log("Start button clicked"); // デバッグ用

            // 1. ローダーにクラスを追加して消す
            loader.classList.add('is-fadeout');

            // 2. 音声再生（エラーが起きても無視して次へ進む）
            if (bgm) {
                bgm.volume = 0;
                const playPromise = bgm.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        // 音量を徐々に上げる
                        let vol = 0;
                        const fadeAudio = setInterval(() => {
                            if (vol < 0.4) {
                                vol += 0.05;
                                bgm.volume = vol;
                            } else {
                                clearInterval(fadeAudio);
                            }
                        }, 200);
                        audioToggle.textContent = 'MUSIC: ON';
                    }).catch(error => {
                        console.log("Audio play failed:", error);
                    });
                }
            }

            // 3. 1秒後に本編を表示状態にする
            setTimeout(() => {
                document.body.classList.add('is-started');
                console.log("Main content should be visible now");
                
                // 完全に消えた後にローダーをDOMから隠す
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 1200);
            }, 1000);
        });
    }

    // BGM切り替えボタン
    if (audioToggle) {
        audioToggle.addEventListener('click', () => {
            if (bgm.paused) {
                bgm.play();
                audioToggle.textContent = 'MUSIC: ON';
            } else {
                bgm.pause();
                audioToggle.textContent = 'MUSIC: OFF';
            }
        });
    }

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
