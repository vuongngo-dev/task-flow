// --- QUẢN LÝ CÔNG VIỆC QUA LOCAL STORAGE ---

// Khởi tạo danh sách công việc mẫu nếu chưa có
function getTasks() {
    const tasks = localStorage.getItem('taskflow_tasks');
    if (tasks) return JSON.parse(tasks);
    
    // Dữ liệu mẫu ban đầu
    const defaultTasks = [{
        id: 'task-' + Date.now(),
        title: 'Thiết kế UI cho trang Quản lý',
        description: 'Sắp xếp lại layout và thẻ iframe cho đúng chuẩn HTML5.',
        priority: 'high',
        date: new Date().toISOString().split('T')[0],
        status: 'in-progress'
    }];
    saveTasks(defaultTasks);
    return defaultTasks;
}

function saveTasks(tasks) {
    localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
    // Phát sự kiện để các iframe khác (calendar, stats) cập nhật theo
    window.parent.postMessage({ type: 'tasks_updated' }, '*');
}

// Format ngày tháng
function formatDate(dateStr) {
    if (!dateStr) return 'Không có hạn';
    const date = new Date(dateStr + 'T00:00:00'); // Thêm giờ để tránh lỗi múi giờ
    return `${date.getDate().toString().padStart(2,'0')}/${(date.getMonth()+1).toString().padStart(2,'0')}`;
}

// Tạo HTML thẻ công việc
function createTaskCard(task) {
    const card = document.createElement('div');
    card.className = 'task-card';
    card.setAttribute('data-id', task.id);

    // Xác định màu badge trạng thái
    const statusMap = {
        'todo':        { cls: 'badge-secondary', text: 'Chưa làm' },
        'in-progress': { cls: 'badge-warning',   text: 'Đang làm' },
        'done':        { cls: 'badge-success',    text: 'Hoàn thành' }
    };
    const { cls, text } = statusMap[task.status] || statusMap['todo'];

    // Xác định icon ưu tiên
    const priorityMap = {
        'high':   '<span class="text-danger"><i class="fas fa-flag"></i> Cao</span>',
        'medium': '<span style="color:var(--warning)"><i class="fas fa-bolt"></i> TB</span>',
        'low':    '<span class="text-muted"><i class="fas fa-arrow-down"></i> Thấp</span>'
    };
    const priorityHtml = priorityMap[task.priority] || priorityMap['low'];

    card.innerHTML = `
        <div class="task-card-header">
            <span class="badge ${cls}" onclick="toggleStatus('${task.id}')" style="cursor:pointer" title="Nhấp để đổi trạng thái">${text}</span>
            <button class="icon-btn text-danger" onclick="deleteTask('${task.id}')" title="Xóa công việc"><i class="fas fa-trash-alt"></i></button>
        </div>
        <h3 class="task-title">${task.title}</h3>
        <p class="task-desc">${task.description || 'Không có mô tả'}</p>
        <div class="task-footer">
            <div class="task-meta">
                ${priorityHtml}
                <span><i class="far fa-calendar"></i> ${formatDate(task.date)}</span>
            </div>
            <div class="user-avatar-sm">V</div>
        </div>
    `;
    return card;
}

// Đổi trạng thái: todo → in-progress → done → todo
window.toggleStatus = function(taskId) {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    const cycle = { 'todo': 'in-progress', 'in-progress': 'done', 'done': 'todo' };
    task.status = cycle[task.status] || 'todo';
    saveTasks(tasks);
    renderTasks(); // Re-render với bộ lọc hiện tại
};

// Xóa công việc
window.deleteTask = function(taskId) {
    if (confirm('Bạn có chắc muốn xóa công việc này?')) {
        const tasks = getTasks().filter(t => t.id !== taskId);
        saveTasks(tasks);
        renderTasks();
    }
};

// Lấy từ khóa tìm kiếm và bộ lọc hiện tại
function getCurrentFilter() {
    const searchInput = document.getElementById('search-input');
    const filterSelect = document.getElementById('filter-status');
    return {
        search: searchInput ? searchInput.value.trim().toLowerCase() : '',
        status: filterSelect ? filterSelect.value : 'all'
    };
}

// Hiển thị danh sách ra màn hình (có tìm kiếm + lọc)
function renderTasks() {
    const container = document.querySelector('.tasks-content');
    if (!container) return;

    container.innerHTML = '';
    let tasks = getTasks();
    const { search, status } = getCurrentFilter();

    // Lọc theo trạng thái
    if (status && status !== 'all') {
        tasks = tasks.filter(t => t.status === status);
    }

    // Lọc theo từ khóa tìm kiếm
    if (search) {
        tasks = tasks.filter(t =>
            t.title.toLowerCase().includes(search) ||
            (t.description && t.description.toLowerCase().includes(search))
        );
    }

    if (tasks.length === 0) {
        container.innerHTML = `<p class="text-muted" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
            ${search ? `Không tìm thấy công việc nào cho "${search}".` : 'Không có công việc nào. Hãy thêm mới!'}
        </p>`;
        return;
    }

    tasks.forEach(task => container.appendChild(createTaskCard(task)));
}

// --- LOGIC MODAL VÀ TƯƠNG TÁC ---
document.addEventListener('DOMContentLoaded', () => {
    renderTasks();

    const btnAdd    = document.getElementById('btn-add-task');
    const modal     = document.getElementById('task-modal');
    const btnClose  = document.getElementById('btn-close-modal');
    const btnCancel = document.getElementById('btn-cancel-modal');
    const btnSave   = document.getElementById('btn-save-task');
    const searchInput  = document.getElementById('search-input');
    const filterSelect = document.getElementById('filter-status');

    // Mở Modal
    if (btnAdd && modal) {
        btnAdd.addEventListener('click', () => {
            modal.classList.add('active');
            const titleInput = document.getElementById('task-title');
            if (titleInput) titleInput.focus();
        });
    }

    // Đóng Modal
    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        // Reset tất cả trường nhập
        ['task-title', 'task-desc'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = '';
        });
        const priority = document.getElementById('task-priority');
        if (priority) priority.value = 'medium';
        const date = document.getElementById('task-date');
        if (date) date.value = '';
    }

    if (btnClose)  btnClose.addEventListener('click', closeModal);
    if (btnCancel) btnCancel.addEventListener('click', closeModal);

    // Bấm ra ngoài vùng modal thì đóng
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Phím Escape cũng đóng modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Lưu công việc mới
    if (btnSave) {
        btnSave.addEventListener('click', () => {
            const title    = document.getElementById('task-title')?.value.trim();
            const desc     = document.getElementById('task-desc')?.value.trim();
            const priority = document.getElementById('task-priority')?.value || 'medium';
            const date     = document.getElementById('task-date')?.value;

            if (!title) {
                alert('Vui lòng nhập tiêu đề công việc!');
                document.getElementById('task-title')?.focus();
                return;
            }

            const newTask = {
                id: 'task-' + Date.now(),
                title,
                description: desc,
                priority,
                date,
                status: 'todo'
            };

            const tasks = getTasks();
            tasks.push(newTask);
            saveTasks(tasks);
            closeModal();
            renderTasks();
        });
    }

    // Tìm kiếm real-time khi người dùng gõ
    if (searchInput) {
        searchInput.addEventListener('input', renderTasks);
    }

    // Lọc theo trạng thái khi chọn dropdown
    if (filterSelect) {
        filterSelect.addEventListener('change', renderTasks);
    }
});