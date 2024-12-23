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
