// ===== PAGE SWITCH FUNCTION =====
function show(page) {
  document.querySelectorAll(".page").forEach((p) => {
    p.style.display = "none";
  });

  document.getElementById(page).style.display = "block";
}

// ===== DARK MODE TOGGLE =====
function toggleDark() {
  document.body.classList.toggle("dark");
}

// ===== CGPA CALCULATOR =====
const gpaInput = document.getElementById("gpa");
const resultText = document.getElementById("result");

if (gpaInput) {
  gpaInput.addEventListener("input", function () {
    let value = this.value;

    if (value === "") {
      resultText.innerText = "Your CGPA: 0.00";
    } else {
      resultText.innerText = "Your CGPA: " + value;
    }
  });
}

// ===== OPTIONAL: DEFAULT PAGE =====
window.onload = function () {
  show("dashboard");
};