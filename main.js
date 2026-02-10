document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const startBtn = document.getElementById('start-btn');
    const bgm = document.getElementById('bgm');
    const audioToggle = document.getElementById('audio-toggle');

    startBtn.addEventListener('click', () => {
        loader.classList.add('loaded');
        document.body.classList.add('is-started'); 
        
        // 音声を再生
        bgm.volume = 0.4;
        bgm.play().catch(() => {
            console.log("Audio play blocked by browser");
        });
        audioToggle.textContent = 'MUSIC: ON';
    });

    audioToggle.addEventListener('click', () => {
        if (bgm.paused) {
            bgm.play();
            audioToggle.textContent = 'MUSIC: ON';
        } else {
            bgm.pause();
            audioToggle.textContent = 'MUSIC: OFF';
        }
    });

    // スクロールでふわっと表示させる
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
