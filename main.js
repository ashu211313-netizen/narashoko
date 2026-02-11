document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const startBtn = document.getElementById('start-btn');
    const bgm = document.getElementById('bgm');
    const audioToggle = document.getElementById('audio-toggle');

    startBtn.addEventListener('click', () => {
        startBtn.classList.add('zoom-active');
        loader.classList.add('is-zooming');

        bgm.volume = 0;
        bgm.play().catch(() => {});
        let vol = 0;
        const fadeAudio = setInterval(() => {
            if (vol < 0.4) {
                vol += 0.05;
                bgm.volume = vol;
            } else {
                clearInterval(fadeAudio);
            }
        }, 150);
        audioToggle.textContent = 'MUSIC: ON';

        setTimeout(() => {
            loader.style.display = 'none';
            document.body.classList.add('is-started'); 
        }, 1200);
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

    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
