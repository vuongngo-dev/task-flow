// ==========================================================================
// FILE: client/scripts/index.js
// DESCRIPTION: Script chính cho trang index, xử lý điều hướng và tải nội dung động
// ==========================================================================

function toggleMenu() {
    var menuToggle = document.getElementById('btn menu-toggle');
    var nav = document.getElementById('navigation');
    if (nav.classList.contains('active')) {
        nav.className = nav.className.replace(' active', '');
    }
    else {
        nav.className += ' active';
    }
}

function loadPage(htmlUrl, cssUrl) {
    // 1. Đổi CSS riêng cho trang
    const dynamicCss = document.getElementById('dynamic-css');
    if (cssUrl) {
        dynamicCss.href = cssUrl; // Nạp file CSS mới
    } else {
        dynamicCss.href = ""; // Xóa CSS riêng nếu trang không cần
    }

    // 2. Tải HTML đắp vào thẻ <main>
    fetch(htmlUrl)
        .then(response => {
            if (!response.ok) throw new Error("Không tìm thấy trang");
            return response.text();
        })
        .then(html => {
            document.getElementById('main-content').innerHTML = html;
            
            // Đóng menu sau khi click (nếu menu đang mở)
            var nav = document.getElementById('navigation');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        })
        .catch(error => {
            document.getElementById('main-content').innerHTML = "<h2>Lỗi 404: Không tìm thấy trang!</h2>";
        });
}

function toggleSidebarTutorial() {
    const tfSidebar = document.getElementById('tfSidebar');
    // Kiểm tra nếu phần tử tồn tại trên trang thì mới xử lý
    if (tfSidebar) {
        if (tfSidebar.classList.contains('collapsed')) {
            tfSidebar.className = 'tf-sidebar-inner';
            console.log('Mở sidebar');
        } else {
            tfSidebar.className = 'tf-sidebar-inner collapsed';
            console.log('Đóng sidebar');
        }
    }
}