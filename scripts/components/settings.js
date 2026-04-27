document.addEventListener('DOMContentLoaded', () => {
    // 1. XỬ LÝ TAB ĐIỀU HƯỚNG BÊN TRÁI
    const settingTabs = document.querySelectorAll('.setting-tab');
    const settingPanels = document.querySelectorAll('.setting-panel');

    settingTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Xóa trạng thái active cũ
            settingTabs.forEach(t => t.classList.remove('active'));
            settingPanels.forEach(p => p.classList.remove('active'));
            
            // Gắn trạng thái active mới
            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // 2. XỬ LÝ CHUYỂN ĐỔI CHẾ ĐỘ TỐI (DARK MODE)
    const themeToggle = document.getElementById('theme-toggle');
    
    // Kiểm tra xem trình duyệt có đang lưu trạng thái theme nào không
    const currentTheme = localStorage.getItem('taskflow_theme');
    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.checked = true;
    }

    // Bắt sự kiện khi gạt nút
    themeToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('taskflow_theme', 'dark');
        } else {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('taskflow_theme', 'light');
        }
    });
});