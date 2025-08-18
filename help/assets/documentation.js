// 页面加载时初始化深色模式
document.addEventListener('DOMContentLoaded', function() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    document.documentElement.classList.toggle('dark-mode', isDarkMode);
    document.body.classList.toggle('dark-mode', isDarkMode);

    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.checked = isDarkMode;
    }
});


function toggleDarkMode() {
    const darkMode = !document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', darkMode);
    document.documentElement.classList.toggle('dark-mode', darkMode);
    document.body.classList.toggle('dark-mode', darkMode);

    const toggle = document.getElementById('darkModeToggle');
    if (toggle) {
        toggle.checked = darkMode;
    }
}