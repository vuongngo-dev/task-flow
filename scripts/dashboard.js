document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".sidebar");
    const menuToggle = document.querySelector(".menu-toggle");           // Nút thu nhỏ trên desktop
    const mobileToggle = document.getElementById("mobile-menu-toggle"); // Nút hamburger trên mobile
    const overlay = document.getElementById("sidebar-overlay");         // Lớp phủ mờ

    // --- 1. DESKTOP: Thu nhỏ / Mở rộng sidebar bằng class "collapsed" ---
    if (menuToggle && sidebar) {
        menuToggle.addEventListener("click", function () {
            sidebar.classList.toggle("collapsed");

            // Lưu trạng thái để khôi phục khi reload trang
            const state = sidebar.classList.contains("collapsed") ? "collapsed" : "expanded";
            localStorage.setItem("sidebar-state", state);
        });

        // Khôi phục trạng thái cũ từ localStorage khi vừa load trang
        if (localStorage.getItem("sidebar-state") === "collapsed") {
            sidebar.classList.add("collapsed");
        }
    }

    // --- 2. MOBILE: Mở sidebar bằng nút hamburger ---
    function openMobileSidebar() {
        sidebar.classList.add("open");
        overlay.classList.add("active");
        document.body.style.overflow = "hidden"; // Ngăn cuộn nền khi sidebar mở
    }

    function closeMobileSidebar() {
        sidebar.classList.remove("open");
        overlay.classList.remove("active");
        document.body.style.overflow = "";
    }

    if (mobileToggle) {
        mobileToggle.addEventListener("click", openMobileSidebar);
    }

    // Bấm vào overlay thì đóng sidebar
    if (overlay) {
        overlay.addEventListener("click", closeMobileSidebar);
    }

    // Bấm vào link điều hướng thì đóng sidebar (tốt cho mobile UX)
    const navLinks = document.querySelectorAll(".sidebar-nav .nav-item");
    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            // Chỉ đóng nếu đang ở chế độ mobile (overlay đang bật)
            if (overlay && overlay.classList.contains("active")) {
                closeMobileSidebar();
            }
        });
    });
});