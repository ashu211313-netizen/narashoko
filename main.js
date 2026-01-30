const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const targets = document.querySelectorAll('.fade-in');
    targets.forEach(t => observer.observe(t));
});
