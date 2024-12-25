let isScrolling = false; // Флаг для предотвращения многократной прокрутки

document.addEventListener('wheel', (e) => {
    e.preventDefault();

    if (isScrolling) return; // Если сейчас идет прокрутка, игнорируем дальнейшие события

    isScrolling = true; // Устанавливаем флаг, чтобы предотвратить множественные прокрутки
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

    // Делаем паузу перед следующим событием прокрутки
    setTimeout(() => {
        isScrolling = false; // Сбрасываем флаг через 1 секунду
    }, 1000); // Таймаут на 1 секунду
});

// Функция для плавной прокрутки к секции
function scrollToSection(section) {
    section.scrollIntoView({
        behavior: 'smooth',
        block: 'start' // Прокручиваем к началу секции
    });
}

// Функция для обновления прогресса ползунка
function updateProgressBar() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    const progressBar = document.querySelector('.progress');

    // Вычисляем процент прокрутки
    const progressHeight = (scrollPosition / scrollableHeight) * 100;

    // Обновляем высоту ползунка
    progressBar.style.height = progressHeight + '%';
}

// Добавляем обработчик события scroll для обновления ползунка
window.addEventListener('scroll', updateProgressBar);

// Вызываем функцию сразу, чтобы ползунок отобразился корректно при загрузке страницы
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

// Обновляем приветствие при загрузке страницы
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

// Обновляем приветствие при загрузке страницы
document.addEventListener("DOMContentLoaded", updateGreeting);
