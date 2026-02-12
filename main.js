document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const startBtn = document.getElementById('start-btn');
    const bgm = document.getElementById('bgm');
    const audioToggle = document.getElementById('audio-toggle');

    if (startBtn) {
        startBtn.onclick = () => {
            // フェードアウト開始
            loader.classList.add('is-fadeout');

            // 音声再生
            if (bgm) {
                bgm.volume = 0;
                bgm.play().then(() => {
                    let vol = 0;
                    const fade = setInterval(() => {
                        if (vol < 0.4) { vol += 0.05; bgm.volume = vol; }
                        else { clearInterval(fade); }
                    }, 200);
                    audioToggle.textContent = 'MUSIC: ON';
                }).catch(err => console.log("Audio play blocked"));
            }

            // 本編のフェードインタイミング
            setTimeout(() => {
                document.body.classList.add('is-started');
                // ローダーを完全に消す
                setTimeout(() => { loader.style.display = 'none'; }, 1000);
            }, 600);
        };
    }

    // 画像のふわっと表示
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) e.target.classList.add('is-visible');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
