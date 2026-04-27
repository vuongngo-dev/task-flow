const daysGrid = document.getElementById('days-grid');
const monthYearDisplay = document.getElementById('month-year-display');
const prevBtn = document.getElementById('prev-month');
const nextBtn = document.getElementById('next-month');

let currentDate = new Date();

// Dữ liệu mẫu: Ngày có nhiệm vụ (YYYY-MM-DD)
const tasksData = {
    "2026-04-15": ["high"],
    "2026-04-27": ["normal", "high"],
    "2026-04-30": ["normal"]
};

function renderCalendar() {
    daysGrid.innerHTML = "";
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    monthYearDisplay.textContent = `Tháng ${month + 1}, ${year}`;

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Fix: Chuyển đổi GetDay (CN=0) sang chuẩn (T2=0)
    const startingPoint = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    // Tạo các ô trống của tháng trước
    for (let i = 0; i < startingPoint; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = "calendar-day empty";
        daysGrid.appendChild(emptyDiv);
    }

    // Tạo các ô ngày trong tháng
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = "calendar-day";
        
        const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        
        // Kiểm tra nếu là hôm nay
        const today = new Date();
        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayDiv.classList.add('today');
        }

        dayDiv.innerHTML = `
            <span class="day-number">${day}</span>
            <div class="task-indicators" id="task-${dateStr}"></div>
        `;

        // Thêm chấm thông báo nếu có nhiệm vụ
        if (tasksData[dateStr]) {
            const indicatorWrap = dayDiv.querySelector('.task-indicators');
            tasksData[dateStr].forEach(level => {
                const dot = document.createElement('span');
                dot.className = `dot ${level === 'high' ? 'high' : ''}`;
                indicatorWrap.appendChild(dot);
            });
        }

        daysGrid.appendChild(dayDiv);
    }
}

prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

document.getElementById('btn-today').addEventListener('click', () => {
    currentDate = new Date();
    renderCalendar();
});

renderCalendar();