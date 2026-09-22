document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       HERO INTRO
    ========================= */

    const hero = document.querySelector(".hero");

    hero.style.opacity = "0";
    hero.style.transform = "translateY(30px)";

    setTimeout(() => {
        hero.style.transition =
            "opacity 1s ease, transform 1s ease";

        hero.style.opacity = "1";
        hero.style.transform = "translateY(0)";
    }, 200);


    /* =========================
       CUSTOM CURSOR
    ========================= */

    const cursor = document.createElement("div");
    cursor.classList.add("custom-cursor");
    document.body.appendChild(cursor);

    document.addEventListener("mousemove", (e) => {

        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";

    });


    /* =========================
       CURSOR HOVER
    ========================= */

    const interactiveElements =
        document.querySelectorAll("a, .project, .skill");

    interactiveElements.forEach((element) => {

        element.addEventListener("mouseenter", () => {
            cursor.classList.add("cursor-hover");
        });

        element.addEventListener("mouseleave", () => {
            cursor.classList.remove("cursor-hover");
        });

    });


    /* =========================
       PROJECT TILT
    ========================= */

    const projects =
        document.querySelectorAll(".project");

    projects.forEach((project) => {

        project.addEventListener("mousemove", (e) => {

            const rect =
                project.getBoundingClientRect();

            const x =
                (e.clientX - rect.left) /
                rect.width - 0.5;

            const y =
                (e.clientY - rect.top) /
                rect.height - 0.5;

            const visual =
                project.querySelector(".project-visual");

            visual.style.transform =
                `perspective(1000px)
                 rotateX(${y * -2}deg)
                 rotateY(${x * 2}deg)
                 scale(0.99)`;

        });

        project.addEventListener("mouseleave", () => {

            const visual =
                project.querySelector(".project-visual");

            visual.style.transform =
                "perspective(1000px) rotateX(0) rotateY(0) scale(1)";

        });

    });


    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealElements =
        document.querySelectorAll(
            ".work h2, .project, .about-header, " +
            ".about-content, .experience, " +
            ".skills-heading, .skill, .contact-main"
        );

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "revealed"
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

        element.classList.add("reveal");

        observer.observe(element);

    });

});