// Lấy số lượng công việc hoàn thành mỗi ngày từ LocalStorage
function getCompletedStats() {
    const tasksRaw = localStorage.getItem('taskflow_tasks');
    if (!tasksRaw) return {};
    
    const tasks = JSON.parse(tasksRaw);
    const stats = {};
    
    tasks.forEach(task => {
        if (task.status === 'done' && task.date) {
            stats[task.date] = (stats[task.date] || 0) + 1;
        }
    });
    
    return stats;
}

function renderStatistics() {
    const grid = document.querySelector('.graph-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    const stats = getCompletedStats();
    
    // Ngày hiện tại
    const today = new Date();
    // Bắt đầu từ 210 ngày trước (30 tuần x 7 ngày)
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 209);
    
    let currentDate = new Date(startDate);
    
    for (let i = 0; i < 30; i++) {
        const week = document.createElement('div');
        week.className = 'graph-week';
        
        for (let j = 0; j < 7; j++) {
            const day = document.createElement('div');
            day.className = 'graph-day';
            
            // Format ngày dạng YYYY-MM-DD
            const dateStr = currentDate.toISOString().split('T')[0];
            const completedCount = stats[dateStr] || 0;
            
            // Tính toán level hiển thị màu sắc (0 đến 4)
            let level = 0;
            if (completedCount === 1) level = 1;
            else if (completedCount === 2) level = 2;
            else if (completedCount === 3) level = 3;
            else if (completedCount > 3) level = 4;
            
            day.setAttribute('data-level', level);
            
            // Tooltip hiển thị
            const displayDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
            day.title = `${completedCount} công việc hoàn thành vào ngày ${displayDate}`;
            
            week.appendChild(day);
            
            // Tăng thêm 1 ngày
            currentDate.setDate(currentDate.getDate() + 1);
        }
        grid.appendChild(week);
    }
    
    // Cập nhật các con số thống kê tổng quan (nếu có các element tương ứng trên giao diện)
    const totalCompletedEl = document.getElementById('total-completed');
    if (totalCompletedEl) {
        let total = 0;
        for (let key in stats) { total += stats[key]; }
        totalCompletedEl.textContent = total;
    }
}

document.addEventListener('DOMContentLoaded', renderStatistics);

// Lắng nghe sự kiện cập nhật dữ liệu từ các trang khác
window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'tasks_updated') {
        renderStatistics();
    }
});