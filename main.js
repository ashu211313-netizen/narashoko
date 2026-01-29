/**
 * スクロール監視：要素が画面に入ったらクラスを付与
 */
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // 10%が見えたら実行
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // 一度表示されたら監視をやめる（必要に応じて）
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 対象となるすべてのクラスを監視
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
});
