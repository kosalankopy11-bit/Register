const form = document.getElementById("regForm"), pass = document.getElementById("pass"), bar = document.getElementById("bar");


document.getElementById("toggle").onclick = function() {
  pass.type = pass.type === "password" ? "text" : "password";
  this.innerText = pass.type === "password" ? "Show" : "Hide";
};


pass.oninput = () => {
  let v = pass.value, score = /[A-Z]/.test(v) + /[a-z]/.test(v) + /[0-9]/.test(v) + /[!@$%^&*+#+]/.test(v) + (v.length >= 6);
  bar.style.width = v ? (score <= 2 ? "33%" : score <= 4 ? "66%" : "100%") : "0%";
  bar.style.background = score <= 2 ? "#d93025" : score <= 4 ? "#f4b400" : "#0f9d58";
};


form.onsubmit = (e) => {
  e.preventDefault();
  document.querySelectorAll(".error").forEach(s => s.innerText = ""); 

  const fN = document.getElementById("fName").value.trim(), lN = document.getElementById("lName").value.trim();
  const em = document.getElementById("email").value.trim(), re = document.getElementById("rePass").value.trim();
  let valid = true;

  const setErr = (id, msg) => { document.getElementById(id).innerText = msg; valid = false; };

  if (!fN || !/^[A-Za-z]+$/.test(fN)) setErr("fNameErr", "Valid first name required!");
  if (!lN || !/^[A-Za-z]+$/.test(lN)) setErr("lNameErr", "Valid last name required!");
  if (!em || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) setErr("emailErr", "Valid email required!");
  

  if (!pass.value) setErr("passErr", "Password required!");
  else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@$%^&*+#+]).{6,}$/.test(pass.value)) {
    setErr("passErr", "Use a combo of uppercase letters, lowercase letters, numbers, and even some special characters (!, @, $, %, ^, &, *, +, #)");
  }
  
  if (!re) setErr("rePassErr", "Retype password!");
  else if (pass.value !== re) setErr("rePassErr", "Passwords do not match!");

  if (valid) { alert("Registration Successful! 🎉"); form.reset(); bar.style.width = "0"; }
};
