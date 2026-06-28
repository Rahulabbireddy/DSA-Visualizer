

document.addEventListener("DOMContentLoaded", function () {

    const themeBtn = document.getElementById("themeBtn");

    if (!themeBtn) return;

    if (localStorage.getItem("theme") === "dark") {

        document.body.classList.add("dark");

        themeBtn.textContent = "☀";

    }

    themeBtn.addEventListener("click", function () {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {

            localStorage.setItem("theme", "dark");

            themeBtn.textContent = "☀";

        } else {

            localStorage.setItem("theme", "light");

            themeBtn.textContent = "🌙";

        }

    });

});
