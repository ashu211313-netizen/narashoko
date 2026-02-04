document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const startBtn = document.getElementById('start-btn');
    const bgm = document.getElementById('bgm');
    const audioToggle = document.getElementById('audio-toggle');
    
    // スクロール監視
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: "0px 0px -80px 0px"
    });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // STARTボタン
    startBtn.addEventListener('click', () => {
        loader.classList.add('loaded');
        bgm.volume = 0.4;
        bgm.play().then(() => {
            audioToggle.textContent = "MUSIC: ON";
        }).catch(err => console.log("Play blocked"));
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
