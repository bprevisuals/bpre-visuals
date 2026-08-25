/* =========================================================
   BPRE VISUALS
   GLOBAL JAVASCRIPT
========================================================= */


/* =========================================================
   01. MOBILE NAVIGATION
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("active");
    });

    const navLinks = mainNav.querySelectorAll("a");

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {
            mainNav.classList.remove("active");
        });

    });

}


/* =========================================================
   02. CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener("click", (event) => {

    if (!mainNav || !menuToggle) {
        return;
    }

    const clickedInsideNav =
        mainNav.contains(event.target);

    const clickedMenu =
        menuToggle.contains(event.target);

    if (!clickedInsideNav && !clickedMenu) {
        mainNav.classList.remove("active");
    }

});


/* =========================================================
   03. PORTFOLIO FILTER
========================================================= */

const filterButtons =
    document.querySelectorAll(".filter-button");

const portfolioItems =
    document.querySelectorAll(".portfolio-item");

if (
    filterButtons.length > 0 &&
    portfolioItems.length > 0
) {

    filterButtons.forEach((button) => {

        button.addEventListener("click", () => {

            filterButtons.forEach((btn) => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const filter =
                button.dataset.filter;

            portfolioItems.forEach((item) => {

                const category =
                    item.dataset.category;

                if (
                    filter === "all" ||
                    category === filter
                ) {

                    item.classList.remove("hidden");

                } else {

                    item.classList.add("hidden");

                }

            });

        });

    });

}


/* =========================================================
   04. CURRENT YEAR
========================================================= */

const yearElement =
    document.getElementById("current-year");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   05. SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".service-card, .portfolio-item, .about-content"
    );

if (
    revealElements.length > 0 &&
    "IntersectionObserver" in window
) {

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach((element) => {

        observer.observe(element);

    });

}



