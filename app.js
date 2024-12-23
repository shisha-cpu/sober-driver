document.addEventListener('wheel', (e) => {
    e.preventDefault();

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
});

// Функция для прокрутки к следующей секции
function scrollToSection(section) {
    window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth'
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