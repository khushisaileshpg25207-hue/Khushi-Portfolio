/**
 * Khushi Thakkar - E-Portfolio Script
 * Handles: Navbar scroll, reveal animations, mobile menu, certificate PDF viewer
 */

/* ====================================================
   CERTIFICATE PDF OPENING FUNCTION (Global Scope)
   ==================================================== */
var CERT_BASE_PATH = "assets/certificates/Certificates/";

function openCertificate(filename, title) {
    var pdfPath = CERT_BASE_PATH + filename;

    // Try the modal viewer first
    var modal = document.getElementById("pdfModal");
    var modalTitle = document.getElementById("pdfModalTitle");
    var pdfViewer = document.getElementById("pdfViewer");
    var downloadLink = document.getElementById("pdfDownloadLink");
    var fallback = document.getElementById("pdfFallback");
    var fallbackLink = document.getElementById("pdfFallbackLink");
    var fallbackDownload = document.getElementById("pdfFallbackDownload");

    if (modal && pdfViewer) {
        // Set title
        if (modalTitle) modalTitle.textContent = title || "Certificate";

        // Set download link
        if (downloadLink) {
            downloadLink.href = pdfPath;
            downloadLink.download = filename;
        }

        // Set fallback links
        if (fallbackLink) fallbackLink.href = pdfPath;
        if (fallbackDownload) {
            fallbackDownload.href = pdfPath;
            fallbackDownload.download = filename;
        }

        // Check if we're on file:// protocol (where iframes for PDFs often don't work)
        var isFileProtocol = window.location.protocol === "file:";

        if (isFileProtocol) {
            // On file:// protocol, open the PDF directly in a new tab
            // because iframes cannot load file:// PDFs in most browsers
            window.open(pdfPath, "_blank");
            return;
        }

        // On http/https, show the modal with iframe
        pdfViewer.src = pdfPath;
        if (fallback) fallback.style.display = "none";
        pdfViewer.style.display = "block";

        // Show modal
        modal.classList.add("active");
        document.body.style.overflow = "hidden";

        // If iframe fails to load, show fallback after a timeout
        var iframeLoadTimeout = setTimeout(function () {
            pdfViewer.style.display = "none";
            if (fallback) fallback.style.display = "flex";
        }, 5000);

        pdfViewer.onload = function () {
            clearTimeout(iframeLoadTimeout);
        };

        pdfViewer.onerror = function () {
            clearTimeout(iframeLoadTimeout);
            pdfViewer.style.display = "none";
            if (fallback) fallback.style.display = "flex";
        };

        return;
    }

    // Ultimate fallback: just open in a new tab
    window.open(pdfPath, "_blank");
}

function closePdfModal() {
    var modal = document.getElementById("pdfModal");
    var pdfViewer = document.getElementById("pdfViewer");

    if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }
    if (pdfViewer) {
        pdfViewer.src = "";
    }
}

/* ====================================================
   MAIN INITIALIZATION (DOMContentLoaded)
   ==================================================== */
document.addEventListener("DOMContentLoaded", function () {

    // ===== 1. NAVBAR SCROLL EFFECT =====
    var navbar = document.getElementById("navbar");

    function handleScroll() {
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();


    // ===== 2. REVEAL ON SCROLL ANIMATION =====
    var revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -30px 0px"
        });

        revealElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback: show everything immediately
        revealElements.forEach(function (el) {
            el.classList.add("active");
        });
    }

    // Make hero visible immediately
    var hero = document.getElementById("hero");
    if (hero) {
        setTimeout(function () {
            hero.classList.add("active");
        }, 150);
    }


    // ===== 3. MOBILE HAMBURGER MENU =====
    var hamburger = document.getElementById("hamburger");
    var navLinks = document.getElementById("navLinks");
    var overlay = document.getElementById("mobileMenuOverlay");

    function openMenu() {
        if (hamburger) hamburger.classList.add("active");
        if (navLinks) navLinks.classList.add("active");
        if (overlay) overlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeMenu() {
        if (hamburger) hamburger.classList.remove("active");
        if (navLinks) navLinks.classList.remove("active");
        if (overlay) overlay.classList.remove("active");
        document.body.style.overflow = "";
    }

    if (hamburger) {
        hamburger.addEventListener("click", function () {
            if (navLinks && navLinks.classList.contains("active")) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    var allNavLinks = document.querySelectorAll(".nav-link");
    allNavLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            closeMenu();
        });
    });

    if (overlay) {
        overlay.addEventListener("click", function () {
            closeMenu();
        });
    }

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            closeMenu();
            closePdfModal();
        }
    });


    // ===== 4. PDF MODAL CLOSE HANDLERS =====
    var pdfModalClose = document.getElementById("pdfModalClose");
    var pdfModalBackdrop = document.getElementById("pdfModalBackdrop");

    if (pdfModalClose) {
        pdfModalClose.addEventListener("click", function () {
            closePdfModal();
        });
    }

    if (pdfModalBackdrop) {
        pdfModalBackdrop.addEventListener("click", function () {
            closePdfModal();
        });
    }


    // ===== 5. SMOOTH SCROLL FOR ANCHOR LINKS =====
    var anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            var targetId = this.getAttribute("href");
            if (targetId === "#") return;

            var targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                var navHeight = navbar ? navbar.offsetHeight : 0;
                var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

});
