document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const startBtn = document.getElementById('start-btn');
    const bgm = document.getElementById('bgm');

    if (startBtn) {
        startBtn.onclick = () => {
            loader.classList.add('is-fadeout');
            document.body.classList.add('is-started');

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
                }).catch(() => {});
            }

            setTimeout(() => { loader.style.display = 'none'; }, 1300);
        };
    }
});
