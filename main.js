document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const startBtn = document.getElementById('start-btn');
    const bgm = document.getElementById('bgm');
    const audioToggle = document.getElementById('audio-toggle');

    if (startBtn) {
        startBtn.onclick = () => {
            loader.classList.add('is-fadeout');

            if (bgm) {
                bgm.volume = 0;
                bgm.play().then(() => {
                    let vol = 0;
                    const fade = setInterval(() => {
                        if (vol < 0.3) { 
                            vol += 0.05; 
                            bgm.volume = Math.min(vol, 0.3); 
                        } else { clearInterval(fade); }
                    }, 200);
                    audioToggle.textContent = 'MUSIC: ON';
                }).catch(() => {
                    audioToggle.textContent = 'MUSIC: OFF';
                });
            }

            document.body.classList.add('is-started');

            setTimeout(() => { 
                loader.style.display = 'none'; 
            }, 1100);
        };
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

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
