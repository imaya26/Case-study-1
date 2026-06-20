function register() {

  const fname = document.getElementById("firstName").value.trim();
  const lname = document.getElementById("lastName").value.trim();
  const dob = document.getElementById("dob").value;
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const contact = document.getElementById("contact").value.trim();

  const errorDiv = document.getElementById("errorMsg");
  const ackDiv = document.getElementById("acknowledgment");

  errorDiv.innerHTML = "";
  ackDiv.innerHTML = "";

  // ✅ 1. Mandatory fields
  if (!fname || !lname || !dob || !email || !address || !contact) {
    errorDiv.innerHTML = "All fields are mandatory";
    return;
  }

  // ✅ First/Last Name validation (max 50 characters)
  if (fname.length > 50 || lname.length > 50) {
    errorDiv.innerHTML = "First and Last Name must not exceed 50 characters";
    return;
  }

  // ✅ Address validation (max 100 characters)
  if (address.length > 100) {
    errorDiv.innerHTML = "Address must not exceed 100 characters";
    return;
  }

  // ✅ 2. DOB validation (> 1/1/1924)
  const minDate = new Date("1924-01-01");
  const selectedDate = new Date(dob);

  if (selectedDate <= minDate) {
    errorDiv.innerHTML = "Choose a date greater than 1/1/1924";
    return;
  }

  // ✅ 3. Contact validation (10 digits)
  if (!/^[0-9]{10}$/.test(contact)) {
    errorDiv.innerHTML = "Enter a valid contact number";
    return;
  }

  // ✅ 4. Email validation
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    errorDiv.innerHTML = "Enter a valid mail id";
    return;
  }

  // ✅ Generate Passenger ID (5 digit numeric ID)
  const passengerId = String(Math.floor(10000 + Math.random() * 90000));

  // ✅ Password formula (First 4 letters of FirstName + @123)
  const password = fname.substring(0, 4) + "@123";

  // ✅ Store user data in sessionStorage for profile access
  const userData = {
    firstName: fname,
    lastName: lname,
    dob: dob,
    email: email,
    address: address,
    contact: contact,
    passengerId: passengerId,
    password: password
  };

  sessionStorage.setItem("passengerData", JSON.stringify(userData));
  sessionStorage.setItem("loggedInUser", fname + " " + lname);

  // ✅ Acknowledgment Screen
  ackDiv.innerHTML = `
    <div class="ack-box">
      <p class="success">Passenger Registration is successful.</p>
      <p><b>Passenger ID:</b> ${passengerId}</p>
      <p><b>Password:</b> ${password}</p>
      <p style="margin-top: 15px; color: gray; font-size: 12px;">Redirecting to Home in 2 seconds...</p>
    </div>
  `;

  // Redirect to home after 2 seconds
  setTimeout(() => {
    window.location.href = "home.html";
  }, 2000);
}

// ✅ Reset with confirmation
function resetForm() {
  const confirmReset = confirm("Is it Okay to reset the fields");

  if (confirmReset) {
    document.getElementById("regForm").reset();
    document.getElementById("errorMsg").innerHTML = "";
    document.getElementById("acknowledgment").innerHTML = "";
  }
}