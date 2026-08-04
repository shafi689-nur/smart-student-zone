function signup(){
  const name = document.getElementById("su_name").value;
  const email = document.getElementById("su_email").value;
  const pass = document.getElementById("su_pass").value;

  if(!name || !email || !pass){
    alert("সব field fill করো");
    return;
  }

  localStorage.setItem("user", JSON.stringify({name,email,pass}));

  alert("Signup successful!");
  window.location.href="login.html";
}

function login(){
  const email = document.getElementById("li_email").value;
  const pass = document.getElementById("li_pass").value;

  const user = JSON.parse(localStorage.getItem("user"));

  if(!user){
    alert("আগে signup করো");
    return;
  }

  if(user.email === email && user.pass === pass){
    localStorage.setItem("login","true");
    window.location.href="index.html";
  } else {
    alert("Wrong email or password");
  }
}

function logout(){
  localStorage.removeItem("login");
  window.location.href="login.html";
}
// ===== CGPA CALCULATOR =====
function calcCGPA(){
  let m1 = parseFloat(document.getElementById("marks1").value) || 0;
  let m2 = parseFloat(document.getElementById("marks2").value) || 0;
  let m3 = parseFloat(document.getElementById("marks3").value) || 0;

  let cgpa = (m1 + m2 + m3) / 3;

  document.getElementById("cgpaResult").innerText =
    "Result: " + cgpa.toFixed(2);
}

// ===== ATTENDANCE CALCULATOR =====
function calcAttendance(){
  let total = parseFloat(document.getElementById("totalClass").value) || 0;
  let present = parseFloat(document.getElementById("presentClass").value) || 0;

  let percent = (present / total) * 100;

  if(total === 0){
    percent = 0;
  }

  document.getElementById("attResult").innerText =
    "Attendance: " + percent.toFixed(2) + "%";
}
// ===== LOAD ASSIGNMENTS =====
function loadAssignments(){
  let list = JSON.parse(localStorage.getItem("assignments")) || [];

  let html = "";
  list.forEach((a, index) => {
    html += `<li>
      📌 ${a.title} - 📁 ${a.file}
      <button onclick="deleteAssignment(${index})">❌</button>
    </li>`;
  });

  const el = document.getElementById("assignmentList");
  if(el) el.innerHTML = html;
}

// ===== UPLOAD ASSIGNMENT =====
function uploadAssignment(){
  let title = document.getElementById("assignmentTitle").value;
  let fileInput = document.getElementById("assignmentFile");

  if(!title || !fileInput.files.length){
    alert("Title and file select করো");
    return;
  }

  let fileName = fileInput.files[0].name;

  let list = JSON.parse(localStorage.getItem("assignments")) || [];

  list.push({
    title: title,
    file: fileName
  });

  localStorage.setItem("assignments", JSON.stringify(list));

  alert("Assignment uploaded!");

  loadAssignments();
}

// ===== DELETE =====
function deleteAssignment(index){
  let list = JSON.parse(localStorage.getItem("assignments")) || [];

  list.splice(index, 1);

  localStorage.setItem("assignments", JSON.stringify(list));

  loadAssignments();
}

// auto load
window.onload = function(){
  loadAssignments();
};
// ===== ADD ASSIGNMENT WITH DEADLINE & MARKS =====
function addAssignment(){

  let title = document.getElementById("a_title").value;
  let deadline = document.getElementById("a_deadline").value;
  let marks = document.getElementById("a_marks").value;

  if(!title || !deadline || !marks){
    alert("সব field fill করো");
    return;
  }

  let list = JSON.parse(localStorage.getItem("assignments")) || [];

  list.push({
    title,
    deadline,
    marks
  });

  localStorage.setItem("assignments", JSON.stringify(list));

  renderAssignments();
}

// ===== SHOW LIST =====
function renderAssignments(){

  let list = JSON.parse(localStorage.getItem("assignments")) || [];

  let html = "";

  let today = new Date().toISOString().split("T")[0];

  list.forEach((a, i) => {

    let status = a.deadline < today ? "Late" : "On Time";
    let badgeClass = a.deadline < today ? "late" : "ok";

    html += `
      <li>
        📌 ${a.title}
        <span>📅 Deadline: ${a.deadline}</span>
        <span>🎯 Marks: ${a.marks}</span>

        <span class="badge ${badgeClass}">
          ${status}
        </span>

        <button onclick="deleteAssignment(${i})">❌ Delete</button>
      </li>
    `;
  });

  document.getElementById("a_list").innerHTML = html;
}

// ===== DELETE =====
function deleteAssignment(i){
  let list = JSON.parse(localStorage.getItem("assignments")) || [];

  list.splice(i, 1);

  localStorage.setItem("assignments", JSON.stringify(list));

  renderAssignments();
}

// auto load
window.onload = function(){
  renderAssignments();
};

// ===== SAVE PROFILE =====
function saveProfile(){

  let profile = {
    name: document.getElementById("p_name").value,
    id: document.getElementById("p_id").value,
    dept: document.getElementById("p_dept").value,
    sem: document.getElementById("p_sem").value,
    email: document.getElementById("p_email").value,
    phone: document.getElementById("p_phone").value,
    address: document.getElementById("p_address").value,
    image: document.getElementById("profilePic").src
  };

  localStorage.setItem("profile", JSON.stringify(profile));

  alert("Profile Saved!");
}

// ===== LOAD PROFILE =====
window.onload = function(){

  let data = JSON.parse(localStorage.getItem("profile"));

  if(data){

    document.getElementById("p_name").value = data.name || "";
    document.getElementById("p_id").value = data.id || "";
    document.getElementById("p_dept").value = data.dept || "";
    document.getElementById("p_sem").value = data.sem || "";
    document.getElementById("p_email").value = data.email || "";
    document.getElementById("p_phone").value = data.phone || "";
    document.getElementById("p_address").value = data.address || "";
    document.getElementById("profilePic").src = data.image || "logo.png";
  }
};

// ===== IMAGE CHANGE =====
function changeImage(){

  let file = document.getElementById("imgInput").files[0];

  if(file){

    let reader = new FileReader();

    reader.onload = function(e){
      document.getElementById("profilePic").src = e.target.result;
    }

    reader.readAsDataURL(file);
  }
}