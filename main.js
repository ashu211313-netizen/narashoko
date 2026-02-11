document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const startBtn = document.getElementById('start-btn');
    const bgm = document.getElementById('bgm');
    const audioToggle = document.getElementById('audio-toggle');

    // スポットライト演出
    window.addEventListener('mousemove', e => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        loader.style.setProperty('--x', `${x}%`);
        loader.style.setProperty('--y', `${y}%`);
    });

    // スタート
    startBtn.addEventListener('click', () => {
        loader.classList.add('loaded');
        bgm.volume = 0.5;
        bgm.play().catch(err => console.log("Audio ready after interaction"));
        audioToggle.textContent = 'MUSIC: ON';
    });

    // スクロール監視
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // ミュート切り替え
    audioToggle.addEventListener('click', () => {
        if (bgm.paused) { bgm.play(); audioToggle.textContent = 'MUSIC: ON'; }
        else { bgm.pause(); audioToggle.textContent = 'MUSIC: OFF'; }
    });
});
