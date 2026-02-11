* { margin: 0; padding: 0; box-sizing: border-box; }

:root {
    --bg-color: #fdfdfd;
    --text-color: #2c2c2c;
    --accent-color: #8c7b65; 
    --font-jp: 'Noto Serif JP', serif;
    --font-en: 'Playfair Display', serif;
}

body.animated-bg {
    color: var(--text-color); font-family: var(--font-jp); overflow-x: hidden;
    background: linear-gradient(125deg, #fdfdfd, #f7f3ee, #fdfdfd, #eeeae4);
    background-size: 400% 400%; animation: gradientBG 15s ease infinite;
}
@keyframes gradientBG { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

/* --- ロード画面（フェードアウト修正） --- */
#loader {
    position: fixed; top: 0; left: 0; width: 100%; height: 100dvh;
    background-color: var(--bg-color);
    display: flex; align-items: center; justify-content: center;
    z-index: 9999; overflow: hidden;
    transition: opacity 1.5s ease, visibility 1.5s;
}

#loader.is-fadeout { opacity: 0; visibility: hidden; }

.loader-bg-text {
    position: absolute; width: 250%; white-space: nowrap;
    font-family: var(--font-en); font-weight: 900; font-size: 15vh; 
    text-transform: uppercase; pointer-events: none; color: #888; 
}
.layer-a { opacity: 0.12; } 
.layer-b { opacity: 0.08; font-style: italic; color: var(--accent-color); } 
.layer-c { opacity: 0.15; color: #999; }

.line-1 { top: 2%; } .line-2 { bottom: 2%; }
.line-1.layer-a { animation: scrollRight 110s linear infinite; }
.line-2.layer-a { animation: scrollLeft 110s linear infinite; }
.line-1.layer-b { animation: scrollRight 85s linear infinite; }
.line-2.layer-b { animation: scrollLeft 85s linear infinite; }
.line-1.layer-c { animation: scrollRight 60s linear infinite; }
.line-2.layer-c { animation: scrollLeft 60s linear infinite; }

@keyframes scrollRight { 0% { transform: translateX(-50%); } 100% { transform: translateX(0%); } }
@keyframes scrollLeft { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }

.loader-content { position: relative; z-index: 10; text-align: center; transition: 1s ease; }
#loader.is-fadeout .loader-content { opacity: 0; filter: blur(10px); }

.txt-nara, .txt-tech { font-family: var(--font-en); font-size: 1.8rem; letter-spacing: 0.2em; color: var(--accent-color); line-height: 1.2; }
.ampersand { font-family: var(--font-en); font-style: italic; font-size: 1.5rem; color: var(--accent-color); margin: 5px 0; }
.warning-txt { font-size: 0.85rem; color: var(--accent-color); opacity: 0.7; margin: 2rem 0 4rem; }

#start-btn {
    background: white; border: 1px solid var(--accent-color);
    color: var(--accent-color); padding: 18px 70px; cursor: pointer;
    font-family: var(--font-en); letter-spacing: 0.3em; transition: 0.4s;
}
#start-btn:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(140, 123, 101, 0.1); }

/* --- メインコンテンツ：フェードイン --- */
.hero { height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; }
.hero-content { opacity: 0; transition: 2s ease 0.8s; }
body.is-started .hero-content { opacity: 1; }

.main-title { font-size: clamp(2.5rem, 10vw, 5rem); letter-spacing: 0.3em; font-weight: 500; margin-bottom: 1.5rem; }
.sub-line { display: block; font-size: 1rem; letter-spacing: 0.5em; color: var(--accent-color); margin-bottom: 1rem; }
.years { font-size: 1.5rem; letter-spacing: 0.4em; color: var(--accent-color); }

main { opacity: 0; transition: opacity 2s ease 1s; }
body.is-started main { opacity: 1; }

/* 各セクション */
.grade-section { padding: 15vh 0; }
.grade-header { text-align: center; margin-bottom: 10vh; }
.grade-label { font-family: var(--font-en); font-size: clamp(4rem, 18vw, 12rem); color: var(--accent-color); opacity: 0.1; font-style: italic; }
.grade-subtitle { font-family: var(--font-en); font-size: 1.2rem; color: var(--accent-color); margin-top: -1.5rem; letter-spacing: 0.2em; }

.event { max-width: 1100px; margin: 0 auto 20vh; padding: 0 40px; }
.event-title-box { text-align: center; margin-bottom: 60px; }
.event-title-box h3 { font-size: 1.4rem; font-weight: 500; letter-spacing: 0.3em; border-bottom: 1px solid var(--accent-color); display: inline-block; padding-bottom: 10px; }

/* フォトグリッド */
.photo-grid { display: flex; flex-direction: column; gap: 80px; width: 100%; }
.img-wrapper { background: #fff; padding: 12px; box-shadow: 0 15px 45px rgba(0,0,0,0.07); transition: 1s; }
.img-wrapper img { width: 100%; height: auto; display: block; }

.img-wrapper.left { width: 75%; align-self: flex-start; transform: rotate(-1deg); }
.img-wrapper.right { width: 75%; align-self: flex-end; transform: rotate(1.5deg); }
.img-wrapper.center { width: 100%; align-self: center; }

/* スクロールアニメーション */
.fade-in { opacity: 0; transform: translateY(50px); transition: 1.8s cubic-bezier(0.22, 1, 0.36, 1); }
.fade-in.is-visible { opacity: 1; transform: translateY(0); }

#audio-toggle { position: fixed; bottom: 30px; right: 30px; font-size: 0.75rem; color: var(--accent-color); cursor: pointer; z-index: 100; }
footer { padding: 100px 0; text-align: center; font-size: 0.8rem; color: var(--accent-color); }
.italic { font-family: var(--font-en); font-style: italic; }
