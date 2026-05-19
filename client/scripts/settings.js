document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".setting-tab");
    const panels = document.querySelectorAll(".setting-panel");

    // 1. Logic chuyển Tab mượt mà
    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            tabs.forEach(t => t.classList.remove("active"));
            panels.forEach(p => p.classList.remove("active"));
            this.classList.add("active");
            const targetPanel = document.getElementById(this.getAttribute("data-target"));
            if (targetPanel) targetPanel.classList.add("active");
        });
    });

    // 2. Đồng bộ trạng thái Dark Mode từ localStorage khi load trang
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        // Dùng cùng key 'taskflow_theme' như global.js
        themeToggle.checked = localStorage.getItem('taskflow_theme') === 'dark';

        // Khi người dùng bật/tắt thì lưu ngay
        themeToggle.addEventListener('change', function () {
            toggleDarkMode(this.checked);
        });
    }
});

// Hàm đổi giao diện Sáng/Tối — dùng cùng key và thuộc tính với global.js
window.toggleDarkMode = function (isChecked) {
    const theme = isChecked ? 'dark' : 'light';
    // Lưu lựa chọn vào localStorage (key giống global.js)
    localStorage.setItem('taskflow_theme', theme);
    // Áp dụng ngay lên toàn bộ tài liệu
    document.documentElement.setAttribute('data-theme', theme);
};

// Giả lập hàm lưu cài đặt tài khoản
window.saveAccountSettings = function () {
    const newName = document.getElementById("displayNameInput").value;
    alert(`Đã lưu thông tin tài khoản! Tên hiển thị mới: ${newName}`);
};

// Hàm xuất dữ liệu ra file JSON
window.exportData = function () {
    const tasks = localStorage.getItem('taskflow_tasks') || '[]';
    const blob = new Blob([tasks], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'taskflow_backup.json';
    a.click();
    URL.revokeObjectURL(url);
};

// Hàm nhập dữ liệu từ file JSON
window.importData = function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (Array.isArray(data)) {
                localStorage.setItem('taskflow_tasks', JSON.stringify(data));
                alert("Nhập dữ liệu thành công!");
                window.parent.postMessage({ type: 'tasks_updated' }, '*');
            } else {
                alert("Định dạng file không hợp lệ! Vui lòng chọn file backup của TaskFlow.");
            }
        } catch (error) {
            alert("Lỗi khi đọc file. File phải là định dạng JSON.");
        }
        // Reset giá trị input để có thể chọn lại file cũ nếu muốn
        event.target.value = "";
    };
    reader.readAsText(file);
};

// Xóa tất cả dữ liệu
window.clearAllData = function () {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ dữ liệu lưu trữ local của ứng dụng? Hành động này không thể hoàn tác!")) {
        localStorage.clear();
        window.parent.postMessage({ type: 'tasks_updated' }, '*');
        alert("Đã xóa sạch cache hệ thống.");
        window.location.reload();
    }
};