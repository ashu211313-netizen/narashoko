document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const startBtn = document.getElementById('start-btn');
    const bgm = document.getElementById('bgm');
    const audioToggle = document.getElementById('audio-toggle');
    
    // スクロールフェードイン
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // ロード解除 & 再生
    startBtn.addEventListener('click', () => {
        loader.classList.add('loaded');
        bgm.volume = 0.5;
        // mp4ファイルでもplay()で音声が流れます
        bgm.play().catch(e => console.log("Audio play blocked by browser."));
        audioToggle.textContent = "MUSIC: ON";
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
