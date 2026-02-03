document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const startBtn = document.getElementById('start-btn');
    const bgm = document.getElementById('bgm');
    const audioToggle = document.getElementById('audio-toggle');
    
    // スクロール時のフェードイン監視
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // ロード画面のボタンがクリックされた時
    startBtn.addEventListener('click', () => {
        // ロード画面を非表示にする
        loader.classList.add('loaded');
        
        // 音楽の再生を開始
        bgm.volume = 0.4; // 音量は好みに合わせて調整（0.0〜1.0）
        bgm.play().then(() => {
            audioToggle.textContent = "MUSIC: ON";
        }).catch(e => {
            console.log("再生がブロックされました:", e);
        });
    });

    // 右下のボタンで音楽を個別に切り替え
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
