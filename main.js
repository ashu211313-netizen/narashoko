document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const startBtn = document.getElementById('start-btn');
    const bgm = document.getElementById('bgm');
    const audioToggle = document.getElementById('audio-toggle');

    // 1. STARTボタン：ロード画面を消して音楽を再生
    startBtn.addEventListener('click', () => {
        loader.classList.add('loaded');
        bgm.volume = 0.4;
        bgm.play().catch(() => {
            console.log("ブラウザにより再生がブロックされました");
        });
        audioToggle.textContent = 'MUSIC: ON';
    });

    // 2. 音楽のON/OFF切り替え
    audioToggle.addEventListener('click', () => {
        if (bgm.paused) {
            bgm.play();
            audioToggle.textContent = 'MUSIC: ON';
        } else {
            bgm.pause();
            audioToggle.textContent = 'MUSIC: OFF';
        }
    });

    // 3. スクロール監視：写真や文字をふわっと出す
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.15 });

    // 全ての .fade-in 要素を監視対象にする
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
});
