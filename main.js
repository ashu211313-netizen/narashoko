document.addEventListener('DOMContentLoaded', () => {

    /* =========================
       ELEMENTS
    ========================= */
    const loader = document.getElementById('loader');
    const startBtn = document.getElementById('start-btn');
    const bgm = document.getElementById('bgm');
    const audioToggle = document.getElementById('audio-toggle');

    const fadeTargets = document.querySelectorAll('.fade-in');
    const photos = document.querySelectorAll('.img-wrapper');
    const gradeLabels = document.querySelectorAll('.grade-label');

    /* =========================
       1. FADE-IN OBSERVER
       一回だけ発火
    ========================= */
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -120px 0px"
    });

    fadeTargets.forEach(el => observer.observe(el));

    /* =========================
       2. AUDIO FADE CONTROL
    ========================= */
    let audioTargetVolume = 0;
    let audioCurrentVolume = 0;

    bgm.volume = 0;

    function fadeAudio() {
        if (Math.abs(audioCurrentVolume - audioTargetVolume) < 0.01) return;
        audioCurrentVolume += (audioTargetVolume - audioCurrentVolume) * 0.05;
        bgm.volume = audioCurrentVolume;
        requestAnimationFrame(fadeAudio);
    }

    /* =========================
       3. START EXPERIENCE
    ========================= */
    startBtn.addEventListener('click', () => {
        loader.classList.add('loaded');

        bgm.play().then(() => {
            audioTargetVolume = 0.4;
            fadeAudio();
            audioToggle.textContent = "MUSIC: ON";
        }).catch(() => {
            console.log('Autoplay blocked');
        });
    });

    /* =========================
       4. AUDIO TOGGLE
    ========================= */
    audioToggle.addEventListener('click', () => {
        if (bgm.paused) {
            bgm.play();
            audioTargetVolume = 0.4;
            fadeAudio();
            audioToggle.textContent = "MUSIC: ON";
        } else {
            audioTargetVolume = 0;
            fadeAudio();
            setTimeout(() => bgm.pause(), 600);
            audioToggle.textContent = "MUSIC: OFF";
        }
    });

    /* =========================
       5. SCROLL MAGIC
       慣性パララックス
    ========================= */
    let scrollY = window.scrollY;
    let currentScroll = scrollY;

    function lerp(a, b, n) {
        return (1 - n) * a + n * b;
    }

    function onScroll() {
        scrollY = window.scrollY;
    }

    function animate() {
        currentScroll = lerp(currentScroll, scrollY, 0.08);

        // 写真の慣性移動
        photos.forEach((photo, index) => {
            const speed = (index % 5 + 1) * 0.015;
            const offset = currentScroll * speed;
            photo.style.transform = `translateY(${-offset}px)`;
        });

        // 学年ラベルを超ゆっくり流す
        gradeLabels.forEach(label => {
            const offset = currentScroll * 0.05;
            label.style.transform = `translate(-50%, ${offset}px)`;
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('scroll', onScroll);
    animate();

});
