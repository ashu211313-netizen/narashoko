document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const startBtn = document.getElementById('start-btn');
    const bgm = document.getElementById('bgm');
    const audioToggle = document.getElementById('audio-toggle');
    
    // Intersection Observerの設定 (三菱ケミカルのような滑らかな登場)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px" // 画面下から100pxの位置で発動
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // 一度表示されたら監視を解除（パフォーマンス向上）
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 全てのフェードイン要素を監視
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // STARTボタンの処理
    startBtn.addEventListener('click', () => {
        loader.classList.add('loaded');
        
        // 音声再生
        bgm.volume = 0.4;
        bgm.play().then(() => {
            audioToggle.textContent = "MUSIC: ON";
        }).catch(err => {
            console.log("Audio play blocked: ", err);
        });
    });

    // 音楽切り替え
    audioToggle.addEventListener('click', () => {
        if (bgm.paused) {
            bgm.play();
            audioToggle.textContent = "MUSIC: ON";
        } else {
            bgm.pause();
            audioToggle.textContent = "MUSIC: OFF";
        }
    });
});
