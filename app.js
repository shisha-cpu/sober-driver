let isScrolling = false; 

document.addEventListener('wheel', (e) => {
    e.preventDefault();

    if (isScrolling) return; 

    isScrolling = true; 
    const sections = document.querySelectorAll('.section');
    const scrollDirection = e.deltaY > 0 ? 'down' : 'up';
    const currentSection = [...sections].findIndex(section => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 0 && rect.bottom > 0;
    });

    if (scrollDirection === 'down') {
        if (currentSection < sections.length - 1) {
            scrollToSection(sections[currentSection + 1]);
        }
    } else if (scrollDirection === 'up') {
        if (currentSection > 0) {
            scrollToSection(sections[currentSection - 1]);
        }
    }


    setTimeout(() => {
        isScrolling = false; 
    }, 1000);
});


function scrollToSection(section) {
    section.scrollIntoView({
        behavior: 'smooth',
        block: 'start' 
    });
}

function updateProgressBar() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    const progressBar = document.querySelector('.progress');

    const progressHeight = (scrollPosition / scrollableHeight) * 100;


    progressBar.style.height = progressHeight + '%';
}


window.addEventListener('scroll', updateProgressBar);


updateProgressBar();
function updateGreeting() {
    const hours = new Date().getHours();
    const greetingLink = document.getElementById("greeting-link");

    let message = "";
    if (hours >= 6 && hours < 12) {
        message = "Доброе утро! Новый день — новые приключения!";
    } else if (hours >= 12 && hours < 18) {
        message = "Добрый день! Ваш безопасный путь начинается здесь.";
    } else {
        message = "После вечеринки? Мы доставим вас домой в безопасности!";
    }

    greetingLink.textContent = message;
}


updateGreeting();
document.addEventListener('DOMContentLoaded', () => {
    const widget = document.querySelector('.sw-app');
    if (widget) {
        console.log('Widget initialized');
    } else {
        console.error('Widget not found!');
    }
});
function updateGreeting() {
    const currentHour = new Date().getHours();
    const greetingText = document.getElementById("greeting-text");

    if (currentHour >= 5 && currentHour < 12) {
        greetingText.textContent = "Доброе утро! Новый день — новые приключения!";
    } else if (currentHour >= 12 && currentHour < 18) {
        greetingText.textContent = "Добрый день! Ваш комфорт — наша забота!";
    } else {
        greetingText.textContent = "После вечеринки? Мы доставим вас домой в безопасности!";
    }
}


document.addEventListener("DOMContentLoaded", updateGreeting);
