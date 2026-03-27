/**
 * Khushi Thakkar - E-Portfolio Script
 * Handles: Navbar scroll, reveal animations, mobile menu
 */

document.addEventListener("DOMContentLoaded", function () {

    // ===== 1. NAVBAR SCROLL EFFECT =====
    var navbar = document.getElementById("navbar");

    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleScroll);
    // Run once on load in case page is already scrolled
    handleScroll();


    // ===== 2. REVEAL ON SCROLL ANIMATION =====
    var revealElements = document.querySelectorAll(".reveal");

    // Check if IntersectionObserver is supported
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
        // Fallback: if IntersectionObserver not supported, show everything
        revealElements.forEach(function (el) {
            el.classList.add("active");
        });
    }

    // Make hero visible immediately with a slight delay for entrance effect
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
        hamburger.classList.add("active");
        navLinks.classList.add("active");
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeMenu() {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "";
    }

    if (hamburger) {
        hamburger.addEventListener("click", function () {
            if (navLinks.classList.contains("active")) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    // Close menu when a nav link is clicked
    var allNavLinks = document.querySelectorAll(".nav-link");
    allNavLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            closeMenu();
        });
    });

    // Close menu when overlay is clicked
    if (overlay) {
        overlay.addEventListener("click", function () {
            closeMenu();
        });
    }

    // Close menu on Escape key
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
                var navHeight = navbar.offsetHeight;
                var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

});
