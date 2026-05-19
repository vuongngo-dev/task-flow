// --- LỊCH THÁNG ---
document.addEventListener('DOMContentLoaded', () => {
    const daysGrid = document.getElementById('days-grid');
    const monthYearDisplay = document.getElementById('month-year-display');
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');
    const todayBtn = document.getElementById('btn-today');

    // Thoát nếu trang này không có lịch
    if (!daysGrid || !monthYearDisplay) return;

    let currentDate = new Date();

    // Đọc dữ liệu công việc từ localStorage, phân nhóm theo ngày
    function getTasksData() {
        const tasksRaw = localStorage.getItem('taskflow_tasks');
        if (!tasksRaw) return {};
        
        const tasks = JSON.parse(tasksRaw);
        const tasksData = {};
        
        tasks.forEach(task => {
            if (!task.date) return; // Bỏ qua task không có ngày
            if (!tasksData[task.date]) tasksData[task.date] = [];
            tasksData[task.date].push(task.priority);
        });
        
        return tasksData;
    }

    function renderCalendar() {
        daysGrid.innerHTML = '';
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        // Hiển thị tháng và năm hiện tại
        monthYearDisplay.textContent = `Tháng ${month + 1}, ${year}`;

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Chuyển đổi: Sunday=0 → đặt CN vào cuối (Thứ 2 = 0)
        const startingPoint = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

        // Thêm các ô trống cho ngày đầu tháng
        for (let i = 0; i < startingPoint; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'calendar-day empty';
            daysGrid.appendChild(emptyDiv);
        }

        const tasksData = getTasksData();
        const todayDate = new Date();

        // Tạo các ô ngày
        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'calendar-day';

            // Format ngày YYYY-MM-DD
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

            // Đánh dấu hôm nay
            if (
                day === todayDate.getDate() &&
                month === todayDate.getMonth() &&
                year === todayDate.getFullYear()
            ) {
                dayDiv.classList.add('today');
            }

            dayDiv.innerHTML = `
                <span class="day-number">${day}</span>
                <div class="task-indicators"></div>
            `;

            // Vẽ chấm màu cho các công việc trong ngày
            if (tasksData[dateStr]) {
                const indicatorWrap = dayDiv.querySelector('.task-indicators');
                const priorities = tasksData[dateStr].slice(0, 3); // Tối đa 3 chấm

                priorities.forEach(level => {
                    const dot = document.createElement('span');
                    dot.className = `dot ${level === 'high' ? 'high' : (level === 'medium' ? 'normal' : '')}`;
                    indicatorWrap.appendChild(dot);
                });

                // Nếu có hơn 3 task → hiện dấu "+"
                if (tasksData[dateStr].length > 3) {
                    const plus = document.createElement('span');
                    plus.textContent = '+';
                    plus.style.cssText = 'font-size:10px; color:var(--text-muted);';
                    indicatorWrap.appendChild(plus);
                }
            }

            daysGrid.appendChild(dayDiv);
        }
    }

    // Điều hướng tháng
    if (prevBtn) prevBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    if (nextBtn) nextBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    if (todayBtn) todayBtn.addEventListener('click', () => {
        currentDate = new Date();
        renderCalendar();
    });

    // Lắng nghe cập nhật từ trang khác (tasks.js hoặc settings.js)
    window.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'tasks_updated') {
            renderCalendar();
        }
    });

    // Vẽ lần đầu
    renderCalendar();
});