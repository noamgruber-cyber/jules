const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');

            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Burger Animation
            burger.classList.toggle('toggle');
        });
    }
}

// Theme Toggle Logic
const themeToggle = () => {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return;

    // Check for saved user preference, if any, on load of the website
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
    }

    themeBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Position Sizing Calculator Logic
const initCalculator = () => {
    const calcBtn = document.getElementById('calc-btn');
    if (!calcBtn) return;

    calcBtn.addEventListener('click', () => {
        const accountSize = parseFloat(document.getElementById('account-size').value);
        const riskPercent = parseFloat(document.getElementById('risk-percent').value);
        const entryPrice = parseFloat(document.getElementById('entry-price').value);
        const stopLoss = parseFloat(document.getElementById('stop-loss').value);

        if (!accountSize || !riskPercent || !entryPrice || !stopLoss) {
            alert('Please fill in all fields correctly.');
            return;
        }

        if (entryPrice <= stopLoss) {
            alert('Stop loss must be lower than the entry price for a long position.');
            return;
        }

        const riskAmount = accountSize * (riskPercent / 100);
        const riskPerShare = entryPrice - stopLoss;
        const shares = Math.floor(riskAmount / riskPerShare);
        const capitalRequired = shares * entryPrice;

        document.getElementById('res-shares').innerText = shares;
        document.getElementById('res-capital').innerText = capitalRequired.toFixed(2);
        document.getElementById('res-risk').innerText = riskAmount.toFixed(2);

        document.getElementById('calc-result').style.display = 'block';
    });
}

// Initialize the application
const app = () => {
    navSlide();
    themeToggle();
    initCalculator();
}

// Run app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', app);
