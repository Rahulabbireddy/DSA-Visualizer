document.addEventListener("DOMContentLoaded", () => {

    const themeBtn = document.getElementById("themeBtn");

    // Load saved theme
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        if (themeBtn) themeBtn.textContent = "☀";
    }

    // Toggle theme
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {

            document.body.classList.toggle("dark");

            if (document.body.classList.contains("dark")) {
                localStorage.setItem("theme", "dark");
                themeBtn.textContent = "☀";
            } else {
                localStorage.setItem("theme", "light");
                themeBtn.textContent = "🌙";
            }

        });
    }

});