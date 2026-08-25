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


/* =========================================================
   06. FORMSPREE CONTACT FORM
========================================================= */

const projectForm =
    document.getElementById("project-form");

const formMessage =
    document.getElementById("form-message");

if (projectForm) {

    projectForm.addEventListener(
        "submit",
        async function (event) {

            /*
             * Stop the browser from leaving the page.
             */

            event.preventDefault();


            const submitButton =
                projectForm.querySelector(
                    'button[type="submit"]'
                );


            /*
             * Clear previous message.
             */

            if (formMessage) {

                formMessage.textContent = "";

                formMessage.className =
                    "form-message";

            }


            /*
             * Disable button while submitting.
             */

            if (submitButton) {

                submitButton.disabled = true;

                submitButton.textContent =
                    "Sending...";

            }


            /*
             * Collect form data.
             */

            const formData =
                new FormData(projectForm);


            try {

                /*
                 * Send the form directly
                 * to the Formspree endpoint.
                 */

                const response =
                    await fetch(
                        projectForm.action,
                        {
                            method: "POST",
                            body: formData,
                            headers: {
                                "Accept":
                                    "application/json"
                            }
                        }
                    );


                /*
                 * SUCCESS
                 */

                if (response.ok) {

                    projectForm.reset();


                    if (formMessage) {

                        formMessage.textContent =
                            "Thank you. Your project inquiry has been received. BPRE Visuals will get back to you shortly.";

                        formMessage.classList.add(
                            "success"
                        );

                    }


                    if (submitButton) {

                        submitButton.disabled = false;

                        submitButton.textContent =
                            "Inquiry Sent ✓";

                    }


                    return;

                }


                /*
                 * FORMSPREE ERROR
                 */

                const data =
                    await response.json()
                    .catch(() => null);


                let errorMessage =
                    "Something went wrong. Please try again.";

                if (
                    data &&
                    data.errors &&
                    data.errors.length > 0
                ) {

                    errorMessage =
                        data.errors
                            .map(
                                (error) =>
                                    error.message
                            )
                            .join(" ");

                }


                if (formMessage) {

                    formMessage.textContent =
                        errorMessage;

                    formMessage.classList.add(
                        "error"
                    );

                }


                if (submitButton) {

                    submitButton.disabled = false;

                    submitButton.textContent =
                        "Send Project Inquiry";

                }


            } catch (error) {

                /*
                 * NETWORK ERROR
                 */

                if (formMessage) {

                    formMessage.textContent =
                        "We couldn't send your inquiry. Please check your internet connection and try again.";

                    formMessage.classList.add(
                        "error"
                    );

                }


                if (submitButton) {

                    submitButton.disabled = false;

                    submitButton.textContent =
                        "Send Project Inquiry";

                }

            }

        }
    );

}
