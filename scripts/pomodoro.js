// --- ĐỒNG HỒ POMODORO ---
document.addEventListener('DOMContentLoaded', () => {
    const timeLeftDisplay = document.getElementById('time-left');
    const timerStatus = document.getElementById('timer-status');
    const timerPath = document.getElementById('timer-path');
    const btnPlay = document.getElementById('btn-play');
    const playIcon = document.getElementById('play-icon');
    const btnReset = document.getElementById('btn-reset');
    const tabBtns = document.querySelectorAll('.tab-btn');

    // Thoát sớm nếu thiếu các element bắt buộc (trang khác không có Pomodoro)
    if (!timeLeftDisplay || !btnPlay) return;

    let isRunning = false;
    let timerInterval = null;
    let totalTime = 25 * 60; // Mặc định 25 phút tập trung
    let timeLeft = totalTime;

    // Chu vi vòng tròn SVG (bán kính 48)
    const CIRCUMFERENCE = 2 * Math.PI * 48;
    if (timerPath) {
        timerPath.style.strokeDasharray = CIRCUMFERENCE;
        timerPath.style.strokeDashoffset = 0;
    }

    // Cập nhật giao diện đồng hồ
    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timeLeftDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Cập nhật thanh tròn tiến trình
        if (timerPath) {
            const progress = timeLeft / totalTime;
            timerPath.style.strokeDashoffset = CIRCUMFERENCE - (progress * CIRCUMFERENCE);
        }
    }

    // Bật / Tắt bộ đếm
    function toggleTimer() {
        if (isRunning) {
            // Dừng lại
            clearInterval(timerInterval);
            if (playIcon) playIcon.className = 'fas fa-play';
            if (timerStatus) timerStatus.textContent = 'Đã tạm dừng';
        } else {
            // Bắt đầu chạy
            timerInterval = setInterval(() => {
                timeLeft--;
                updateDisplay();
                
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    isRunning = false;
                    if (playIcon) playIcon.className = 'fas fa-play';
                    if (timerStatus) timerStatus.textContent = 'Hết giờ! 🎉';
                    
                    // Ghi nhận khi hoàn thành phiên Tập trung (25 phút)
                    if (totalTime === 25 * 60) {
                        const today = new Date().toISOString().split('T')[0];
                        
                        // Lưu số phiên Pomodoro vào localStorage
                        const pomos = JSON.parse(localStorage.getItem('taskflow_pomodoros') || '{}');
                        pomos[today] = (pomos[today] || 0) + 1;
                        localStorage.setItem('taskflow_pomodoros', JSON.stringify(pomos));
                        
                        // Tạo thông báo hệ thống
                        const notifs = JSON.parse(localStorage.getItem('taskflow_notifications') || '[]');
                        notifs.push({
                            id: Date.now(),
                            type: 'system',
                            icon: 'fa-check-circle',
                            color: 'success',
                            text: 'Bạn đã hoàn thành 1 phiên tập trung!',
                            time: Date.now(),
                            read: false
                        });
                        localStorage.setItem('taskflow_notifications', JSON.stringify(notifs));
                        
                        // Thông báo cho dashboard cha
                        window.parent.postMessage({ type: 'pomo_completed' }, '*');
                    }
                    return;
                }
            }, 1000);
            if (playIcon) playIcon.className = 'fas fa-pause';
            if (timerStatus) timerStatus.textContent = 'Đang tập trung...';
        }
        isRunning = !isRunning;
    }

    // Reset về trạng thái ban đầu
    function resetTimer() {
        clearInterval(timerInterval);
        isRunning = false;
        timeLeft = totalTime;
        if (playIcon) playIcon.className = 'fas fa-play';
        if (timerStatus) timerStatus.textContent = 'Sẵn sàng';
        updateDisplay();
    }

    // Chuyển đổi chế độ (Tập trung / Nghỉ ngắn / Nghỉ dài)
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Đặt lại thời gian từ data-time (phút)
            totalTime = parseInt(btn.getAttribute('data-time')) * 60;
            resetTimer();
            
            // Đổi màu sắc theo chế độ
            const label = btn.textContent.trim();
            const colorMap = {
                'Tập trung': 'var(--primary)',
                'Nghỉ ngắn': 'var(--success)',
                'Nghỉ dài': 'var(--warning)'
            };
            const color = colorMap[label] || 'var(--primary)';
            document.documentElement.style.setProperty('--pomo-color', color);
        });
    });

    // Gán sự kiện cho các nút điều khiển
    btnPlay.addEventListener('click', toggleTimer);
    if (btnReset) btnReset.addEventListener('click', resetTimer);
    
    const btnSkip = document.getElementById('btn-skip');
    if (btnSkip) {
        btnSkip.addEventListener('click', () => {
            timeLeft = 0;
            updateDisplay();
        });
    }

    // Phím tắt: Spacebar để bật/tắt đồng hồ
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            toggleTimer();
        }
    });

    // Hiển thị lần đầu
    updateDisplay();
});
