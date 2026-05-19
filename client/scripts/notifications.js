document.addEventListener('DOMContentLoaded', () => {
    const notifTabs = document.querySelectorAll('.notif-tab');
    const notifLists = document.querySelectorAll('.notif-list');
    const markAllReadBtn = document.getElementById('mark-all-read');

    // Load data
    function getNotifications() {
        return JSON.parse(localStorage.getItem('taskflow_notifications') || '[]');
    }

    function saveNotifications(notifs) {
        localStorage.setItem('taskflow_notifications', JSON.stringify(notifs));
        updateBadgeCount();
    }

    function getTimeAgo(timestamp) {
        const diff = Math.floor((Date.now() - timestamp) / 60000); // phút
        if (diff < 1) return 'Vừa xong';
        if (diff < 60) return `${diff} phút trước`;
        const hours = Math.floor(diff / 60);
        if (hours < 24) return `${hours} giờ trước`;
        const days = Math.floor(hours / 24);
        return `${days} ngày trước`;
    }

    function renderNotifications() {
        const tasksList = document.getElementById('notif-tasks');
        const systemList = document.getElementById('notif-system');
        
        if (tasksList) tasksList.innerHTML = '';
        if (systemList) systemList.innerHTML = '';

        const notifs = getNotifications();
        
        if (notifs.length === 0) {
            if (systemList) systemList.innerHTML = '<p class="text-muted" style="padding:20px; text-align:center;">Không có thông báo mới.</p>';
            if (tasksList) tasksList.innerHTML = '<p class="text-muted" style="padding:20px; text-align:center;">Không có thông báo mới.</p>';
            updateBadgeCount();
            return;
        }

        // Đảo ngược để thông báo mới lên trên
        notifs.reverse().forEach(n => {
            const html = `
                <div class="notif-item ${n.read ? '' : 'unread'}" data-id="${n.id}">
                    <div class="notif-icon bg-${n.color}-light text-${n.color}">
                        <i class="fas ${n.icon}"></i>
                    </div>
                    <div class="notif-content">
                        <p class="notif-text">${n.text}</p>
                        <span class="notif-time">${getTimeAgo(n.time)}</span>
                    </div>
                    <div class="notif-actions">
                        ${!n.read ? `<button class="action-btn mark-read-btn" title="Đánh dấu đã đọc"><i class="fas fa-circle"></i></button>` : ''}
                        <button class="action-btn delete-btn" title="Xóa"><i class="fas fa-times"></i></button>
                    </div>
                </div>
            `;
            
            if (n.type === 'system' && systemList) {
                systemList.insertAdjacentHTML('beforeend', html);
            } else if (n.type === 'task' && tasksList) {
                tasksList.insertAdjacentHTML('beforeend', html);
            }
        });
        
        updateBadgeCount();
    }

    // 1. CHUYỂN ĐỔI TAB (NHIỆM VỤ / HỆ THỐNG)
    notifTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            notifTabs.forEach(t => t.classList.remove('active'));
            notifLists.forEach(l => l.classList.remove('active'));
            
            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);
            if(targetEl) targetEl.classList.add('active');
        });
    });

    // 2. CHỨC NĂNG XÓA VÀ ĐÁNH DẤU ĐÃ ĐỌC
    document.addEventListener('click', (e) => {
        // Nút Xóa (Delete)
        if (e.target.closest('.delete-btn')) {
            const item = e.target.closest('.notif-item');
            if (item) {
                const id = parseInt(item.getAttribute('data-id'));
                let notifs = getNotifications().filter(n => n.id !== id);
                saveNotifications(notifs);
                
                item.style.opacity = '0';
                setTimeout(() => item.remove(), 200); 
            }
        }

        // Nút Đánh dấu đã đọc (Mark as read)
        if (e.target.closest('.mark-read-btn')) {
            const item = e.target.closest('.notif-item');
            if (item) {
                const id = parseInt(item.getAttribute('data-id'));
                let notifs = getNotifications();
                const n = notifs.find(n => n.id === id);
                if (n) {
                    n.read = true;
                    saveNotifications(notifs);
                }
                
                item.classList.remove('unread');
                const markBtn = item.querySelector('.mark-read-btn');
                if(markBtn) markBtn.remove();
            }
        }
    });

    // 3. ĐÁNH DẤU TẤT CẢ ĐÃ ĐỌC
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', () => {
            let notifs = getNotifications();
            notifs.forEach(n => n.read = true);
            saveNotifications(notifs);
            renderNotifications();
        });
    }

    // Cập nhật con số hiển thị
    function updateBadgeCount() {
        const notifs = getNotifications();
        const unreadCount = notifs.filter(n => !n.read).length;
        const badge = document.getElementById('notif-count');
        if (badge) {
            if (unreadCount > 0) {
                badge.textContent = unreadCount;
                badge.style.display = 'inline-block';
            } else {
                badge.style.display = 'none';
            }
        }
    }
    
    // Gọi lần đầu
    renderNotifications();

    // 4. LẮNG NGHE SỰ KIỆN CẬP NHẬT
    window.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'pomo_completed') {
            renderNotifications();
        }
    });
});