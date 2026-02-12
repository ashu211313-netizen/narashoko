document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const startBtn = document.getElementById('start-btn');
    const bgm = document.getElementById('bgm');

    // STARTボタンをクリック時の処理
    if (startBtn) {
        startBtn.onclick = () => {
            loader.classList.add('is-fadeout'); // フェードアウト
            
            // BGM再生（ボリュームフェードイン）
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
                }).catch(err => console.log("Safari auto-play restriction"));
            }

            document.body.classList.add('is-started'); // 本編表示

            setTimeout(() => { 
                loader.style.display = 'none'; 
            }, 1100);
        };
    }

    // スクロール時に画像をふわっと表示
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
