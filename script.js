/**
 * Khushi Thakkar - E-Portfolio Script
 * Handles: Navbar scroll, reveal animations, mobile menu, smooth scroll
 */

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
        }
    });


    // ===== 4. SMOOTH SCROLL FOR ANCHOR LINKS =====
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
