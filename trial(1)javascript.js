// script.js

// SHOW REGISTER
function showRegister(){

  document.getElementById("loginForm")
  .classList.add("hidden");

  document.getElementById("registerForm")
  .classList.remove("hidden");
}

// SHOW LOGIN
function showLogin(){

  document.getElementById("registerForm")
  .classList.add("hidden");

  document.getElementById("loginForm")
  .classList.remove("hidden");
}

// REGISTER USER
function registerUser(){

  let username =
  document.getElementById("registerUsername").value;

  let password =
  document.getElementById("registerPassword").value;

  let role =
  document.getElementById("registerRole").value;

  let user = {
    username,
    password,
    role
  };

  localStorage.setItem(username, JSON.stringify(user));

  alert("Registration Successful!");

  showLogin();
}

// LOGIN USER
function loginUser(){

  let username =
  document.getElementById("loginUsername").value;

  let password =
  document.getElementById("loginPassword").value;

  let role =
  document.getElementById("loginRole").value;

  let storedUser =
  JSON.parse(localStorage.getItem(username));

  if(
    storedUser &&
    storedUser.password === password &&
    storedUser.role === role
  ){

    alert("Login Successful!");

    document.getElementById("tracker")
    .classList.remove("hidden");

    // PATIENT VIEW
    if(role === "patient"){

      document.getElementById("dashboard")
      .classList.add("hidden");

    }

    // NURSE VIEW
    else{

      document.getElementById("dashboard")
      .classList.remove("hidden");

    }

  }

  else{

    alert("Invalid Account!");

  }

function registerUser() {

  const username = document.getElementById("registerUsername").value;
  const password = document.getElementById("registerPassword").value;
  const role = document.getElementById("registerRole").value;

  // Restrict healthcare worker registration
  if (role === "nurse") {

    if (!username.startsWith("SFSTTeam_")) {

      alert("Only authorized healthcare workers can register.\nUse the format: SFSTTeam_Name");

      return;
    }
  }

  // Continue registration
  alert("Registration successful!");

}

}

// SAVE RECORD
function saveRecord(){

  let name =
  document.getElementById("patientName").value;

  let date =
  document.getElementById("date").value;

  let time =
  document.getElementById("time").value;

  let temperature =
  document.getElementById("temperature").value;

  let pain =
  document.getElementById("pain").value;

  let status = "Normal";

  if(temperature >= 38 || pain >= 7){

    status = "High Risk";
  }

  // CREATE RECORD OBJECT
  let record = {
    name,
    date,
    time,
    temperature,
    pain,
    status
  };

  // GET OLD RECORDS
  let records =
  JSON.parse(localStorage.getItem("patientRecords"))
  || [];

  // ADD NEW RECORD
  records.push(record);

  // SAVE TO LOCAL STORAGE
  localStorage.setItem(
    "patientRecords",
    JSON.stringify(records)
  );

  // DISPLAY RECORDS
  displayRecords();

  alert("Symptom Record Saved!");

}

function displayRecords(){

  let records =
  JSON.parse(localStorage.getItem("patientRecords"))
  || [];

  let table = document.getElementById("historyTable");

  table.innerHTML = "";

  records.forEach(function(record){

    let row = `
      <tr>

        <td>${record.name}</td>

        <td>${record.date}</td>

        <td>${record.time}</td>

        <td>${record.temperature} °C</td>

        <td>${record.pain}/10</td>

        <td>${record.status}</td>

      </tr>
    `;

    table.innerHTML += row;

  });

}


// LOAD SAVED RECORDS
window.onload = function(){

  displayRecords();

}