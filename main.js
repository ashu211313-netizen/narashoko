document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const startBtn = document.getElementById('start-btn');
    const bgm = document.getElementById('bgm');
    const body = document.body;

    if (startBtn) {
        startBtn.onclick = () => {
            loader.classList.add('is-fadeout');
            body.classList.add('is-started');

            if (bgm) {
                bgm.volume = 0;
                bgm.play().then(() => {
                    let vol = 0;
                    const fade = setInterval(() => {
                        if (vol < 0.3) {
                            vol += 0.02;
                            bgm.volume = Math.min(vol, 0.3);
                        } else { clearInterval(fade); }
                    }, 150);
                }).catch(e => console.log("Audio play prevented"));
            }
            initObserver();
        };
    }
    function initObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.img-wrapper').forEach(img => {
            observer.observe(img);
        });
    }

    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.setAttribute('loading', 'lazy');
        img.onerror = function() {UI
            this.parentNode.style.display = 'none';
        };
    });
});
