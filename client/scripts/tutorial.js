// ==========================================================================
// FILE: client/scripts/tutorial.js
// DESCRIPTION: Script riêng cho trang tutorial, xử lý các tương tác đặc thù của trang này
// ==========================================================================

// Hàm mở/tắt sidebar
function toggleSidebar() {
    const tfSidebar = document.getElementById('tfSidebar');
    // Kiểm tra nếu phần tử tồn tại trên trang thì mới xử lý
    if (tfSidebar) {
        if (tfSidebar.classList.contains('collapsed')) {
            tfSidebar.className = 'tf-sidebar';
            console.log('Mở sidebar');
        } else {
            tfSidebar.className = 'tf-sidebar collapsed';
            console.log('Đóng sidebar');
        }
    }
}