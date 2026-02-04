document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const startBtn = document.getElementById('start-btn');
    const bgm = document.getElementById('bgm');
    const audioToggle = document.getElementById('audio-toggle');
    
    // --- 1. スクロール監視：エレガントな浮き上がり ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 画面に入ったらクラスを付与
                entry.target.classList.add('is-visible');
                // 一度表示されたら監視を解除（動作を軽くするため）
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: "0px 0px -5% 0px" // 画面の下の方で少し早めに検知開始
    });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // --- 2. STARTボタン：物語の始まり ---
    startBtn.addEventListener('click', () => {
        // ロード画面を消す
        loader.classList.add('loaded');
        
        // BGMの設定（音量を徐々に上げる演出はブラウザ制限により簡易化）
        bgm.volume = 0.4;
        bgm.play().then(() => {
            audioToggle.textContent = "MUSIC: ON";
            audioToggle.style.opacity = "0.8"; // 再生中は少し目立たせる
        }).catch(err => {
            console.log("再生がブロックされました。ユーザー操作が必要です。");
            audioToggle.textContent = "MUSIC: OFF";
        });
    });

    // --- 3. 音楽切り替えトグル ---
    audioToggle.addEventListener('click', () => {
        if (bgm.paused) {
            bgm.play();
            audioToggle.textContent = "MUSIC: ON";
            audioToggle.style.opacity = "0.8";
        } else {
            bgm.pause();
            audioToggle.textContent = "MUSIC: OFF";
            audioToggle.style.opacity = "0.4";
        }
    });

    // --- 4. パララックス（おまけ：さらに質感を出すなら） ---
    // もし背景の「1st year」などを少し動かしたい場合は、以下を有効にしてください。
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const labels = document.querySelectorAll('.grade-label');
        labels.forEach(label => {
            // スクロールに合わせてゆっくり上に移動（視差効果）
            label.style.transform = `translateX(-50%) translateY(${scrolled * 0.1}px)`;
        });
    });
});
