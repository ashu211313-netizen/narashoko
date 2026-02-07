document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.loader');
  const startBtn = document.querySelector('#start-btn');
  const bgm = document.querySelector('#bgm');
  const audioToggle = document.querySelector('#audio-toggle');

  // フェードイン監視（位置は一切変更しない）
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // スタート
  startBtn.addEventListener('click', () => {
    loader.classList.add('loaded');

    if (bgm) {
      bgm.volume = 0.4;
      bgm.play().catch(() => {});
    }

    audioToggle.textContent = 'MUSIC: ON';
  });

  // 音楽ON/OFF
  audioToggle.addEventListener('click', () => {
    if (!bgm) return;

    if (bgm.paused) {
      bgm.play();
      audioToggle.textContent = 'MUSIC: ON';
    } else {
      bgm.pause();
      audioToggle.textContent = 'MUSIC: OFF';
    }
  });
});
