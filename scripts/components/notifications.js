document.addEventListener('DOMContentLoaded', () => {
    const btnNotification = document.getElementById('btn-notification');
    const notifPopup = document.getElementById('notif-popup');
    const notifTabs = document.querySelectorAll('.notif-tab');
    const notifLists = document.querySelectorAll('.notif-list');

    // 1. MỞ / ĐÓNG POPUP THÔNG BÁO
    btnNotification.addEventListener('click', (e) => {
        e.stopPropagation(); // Ngăn click lan ra ngoài
        notifPopup.classList.toggle('show');
    });

    // Click ra ngoài khoảng không thì tự động đóng popup
    document.addEventListener('click', (e) => {
        if (!notifPopup.contains(e.target) && e.target !== btnNotification) {
            notifPopup.classList.remove('show');
        }
    });

    // Đừng đóng popup khi người dùng click vào bên trong nó
    notifPopup.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // 2. CHUYỂN ĐỔI TAB (NHIỆM VỤ / HỆ THỐNG)
    notifTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Xóa active cũ
            notifTabs.forEach(t => t.classList.remove('active'));
            notifLists.forEach(l => l.classList.remove('active'));
            
            // Thêm active mới
            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // 3. CHỨC NĂNG XÓA VÀ ĐÁNH DẤU ĐÃ ĐỌC
    notifPopup.addEventListener('click', (e) => {
        
        // Nút Xóa (Delete)
        if (e.target.closest('.delete-btn')) {
            const item = e.target.closest('.notif-item');
            // Thêm hiệu ứng mờ dần trước khi xóa (Tuỳ chọn)
            item.style.opacity = '0';
            setTimeout(() => item.remove(), 200); 
            updateBadgeCount();
        }

        // Nút Đánh dấu đã đọc (Mark as read)
        if (e.target.closest('.mark-read-btn')) {
            const item = e.target.closest('.notif-item');
            item.classList.remove('unread');
            const markBtn = e.target.closest('.mark-read-btn');
            markBtn.remove(); // Xóa nút này đi vì đã đọc rồi
            updateBadgeCount();
        }
    });

    // 4. ĐÁNH DẤU TẤT CẢ ĐÃ ĐỌC
    const markAllReadBtn = document.getElementById('mark-all-read');
    markAllReadBtn.addEventListener('click', () => {
        const unreadItems = document.querySelectorAll('.notif-item.unread');
        unreadItems.forEach(item => {
            item.classList.remove('unread');
            const markBtn = item.querySelector('.mark-read-btn');
            if (markBtn) markBtn.remove();
        });
        updateBadgeCount();
    });

    // Cập nhật con số trên chuông thông báo (Demo Logic)
    function updateBadgeCount() {
        const unreadCount = document.querySelectorAll('.notif-item.unread').length;
        const badge = document.querySelector('.notif-badge');
        if (unreadCount > 0) {
            badge.textContent = unreadCount;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none'; // Ẩn chấm đỏ nếu hết thông báo mới
        }
    }
});