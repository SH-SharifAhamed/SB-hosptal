
// 30 Doctors Data
const doctors = [
     { name: "Dr. Mahmud Rahman", cat: "Cardiologist", fee: 700, img: "Assets/Dr. Mahmud Rahman.jpeg" },
     { name: "Dr. Sanzida Noor", cat: "Neurologist", fee: 800, img: "Assets/Dr. Sanzida Noor.jpeg" },
     { name: "Dr. Imtiaz Khan", cat: "Skin Specialist", fee: 500, img: "Assets/Dr. Imtiaz Khan.jpeg" },
     { name: "Dr. Fariha Hasan", cat: "Child Specialist", fee: 600, img: "Assets/Dr. Fariha Hasan.jpeg" },
     // 26 more sample doctors
     { name: "Dr. Alamgir Hossain", cat: "Diabetologist", fee: 650, img: "Assets/Dr. Alamgir Hossain.jpeg" },
     { name: "Dr. Farzana Akter", cat: "ENT Specialist", fee: 550, img: "Assets/Dr. Farzana Akter.jpeg" },
     { name: "Dr. Nayeem Siddique", cat: "Eye Specialist", fee: 500, img: "Assets/Dr. Nayeem Siddique.jpeg" },
     { name: "Dr. Rafiq Uddin", cat: "Cardiologist", fee: 700, img: "Assets/Dr. Rafiq Uddin.jpeg" }
];

let booked = JSON.parse(localStorage.getItem("bookedDoctors") || "[]");
let showAllDoctors = false;

function renderDoctors() {
     const container = document.getElementById('doctorCards');
     container.innerHTML = "";
     let listToShow = showAllDoctors ? doctors : doctors.slice(0, 4);
     listToShow.forEach((d, i) => {
          let disabled = booked.some(b => b.name === d.name);
          container.innerHTML += `<div class='doctor-card'>
<img src='${d.img}'>
<h3>${d.name}</h3>
<p>${d.cat}</p>
<p><b>Visit Fee:</b> ${d.fee} TK</p>
<label>Appointment Date: <input type='date' id='date${i}'></label><br>
<label>Time: <input type='time' id='time${i}'></label><br>
<button class='book-btn ${disabled ? "disabled" : ""}' ${disabled ? "disabled" : ''} onclick="bookDoctor('${d.name}', ${i})">Book</button>
<button class='cancel-btn' style='${disabled ? "display:block" : "display:none"}' onclick="cancelDoctor('${d.name}')">Cancel</button>
</div>`;
     });
}
renderDoctors();

function toggleDoctors() {
     showAllDoctors = !showAllDoctors;
     document.getElementById('toggleDoctorsBtn').innerText = showAllDoctors ? "Show Less" : "Show More";
     renderDoctors();
}

function bookDoctor(name, index) {
     let date = document.getElementById('date' + index).value;
     let time = document.getElementById('time' + index).value;
     if (!date || !time) { alert('Please select date and time'); return; }
     if (!booked.some(b => b.name === name)) {
          booked.push({ name: name, date: date, time: time });
          localStorage.setItem('bookedDoctors', JSON.stringify(booked));
          renderDoctors();
          renderDashboard();
          alert(name + ' booked successfully!');
     }
}

function cancelDoctor(name) {
     booked = booked.filter(b => b.name !== name);
     localStorage.setItem('bookedDoctors', JSON.stringify(booked));
     renderDoctors();
     renderDashboard();
     alert(name + ' booking cancelled');
}

function filterDoctor() {
     let cat = document.getElementById('diseaseSelect').value;
     let result = document.getElementById('diseaseResult');
     if (!cat) { result.innerHTML = ""; return; }
     let doc = doctors.find(d => d.cat === cat);
     result.innerHTML = `<div class='doctor-card'>
<img src='${doc.img}' />
<h3>${doc.name}</h3>
<p>${doc.cat}</p>
<p><b>Visit Fee:</b> ${doc.fee} TK</p>
<label>Date: <input type='date' id='filterDate'></label><br>
<label>Time: <input type='time' id='filterTime'></label><br>
<button class='book-btn' onclick="bookDoctor('${doc.name}',0)">Book Now</button>
</div>`;
}

function openBooking() { alert("Please select a doctor below"); }

function renderDashboard() {
     let dash = document.getElementById('dashboardList');
     dash.innerHTML = "";
     if (booked.length === 0) { dash.innerHTML = '<p>No booked doctors yet.</p>'; return; }
     booked.forEach((b, i) => {
          dash.innerHTML += `<div class='dashboard-item'><span>${b.name} - ${b.date} ${b.time}</span><button onclick='cancelDoctor("${b.name}")'>Cancel</button></div>`;
     });
}
renderDashboard();

function showView(view) {
     document.getElementById('homeView').style.display = (view === 'home') ? 'block' : 'none';
     document.getElementById('dashboardView').style.display = (view === 'dashboard') ? 'block' : 'none';
     document.getElementById('blogView').style.display = (view === 'blog') ? 'block' : 'none';
}
