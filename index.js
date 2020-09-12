class User {
  constructor(fName, lName, email, dOB, gender, username, password) {
    this.fName = fName;
    this.lName = lName;
    this.email = email;
    this.dOB = dOB;
    this.gender = gender;
    this.username = username;
    this.password = password;
  }
}

class DB {
  static validate(user) {
    if (localStorage.getItem("Users") !== null) {
      let dBUsers = JSON.parse(localStorage.getItem("Users"));
      let xUsers = dBUsers.filter((dBuser) => user.email === dBuser.email);
      if (xUsers.length === 0) {
        this.storeDB(user);
        UI.alert("New user successfully added", "success");
        UI.clear();
        setTimeout(() => (window.location.href = "signIn.htm"), 1000);
      } else {
        UI.alert("Email has been used", "danger");
      }
    } else {
      this.storeDB(user);
      UI.alert("New user successfully added", "success");
      UI.clear();
      setTimeout(() => (window.location.href = "signIn.htm"), 1000);
    }
  }

  static storeDB(user) {
    if (localStorage.getItem("Users") !== null) {
      let dBUsers = JSON.parse(localStorage.getItem("Users"));
      dBUsers.push(user);
      localStorage.setItem("Users", JSON.stringify(dBUsers));
    } else {
      const Users = [];
      Users.push(user);
      localStorage.setItem("Users", JSON.stringify(Users));
    }
    UI.goBackToFirst();
  }

  static authenticate(email, password) {
    if (localStorage.getItem("Users") !== null) {
      let dBUsers = JSON.parse(localStorage.getItem("Users"));
      dBUsers.forEach((user) => {
        if (user.email === email && user.password === password) {
          UI.alert("Sign in successfull", "success");
        } else {
          UI.alert("Sign in failed", "danger");
        }
        UI.siginInClear();
      });
    }
  }
}

class UI {
  static clear() {
    document.querySelector("#signUpFirstName").value = "";
    document.querySelector("#signUpLastName").value = "";
    document.querySelector("#signUpEmail").value = "";
    document.querySelector("#signUpDOB").value = "";
    document.querySelector("#signUpGenderMale").checked = false;
    document.querySelector("#signUpGenderFemale").checked = false;
    document.querySelector("#signUpUsername").value = "";
    document.querySelector("#signUpFirstPasscode").value = "";
    document.querySelector("#signUpSecondPasscode").value = "";
  }

  static siginInClear() {
    document.querySelector("#signInEmail").value = "";
    document.querySelector("#signInPasscode").value = "";
  }

  static gotoNext(e) {
    e.preventDefault();
    const signUpFormFirst = document.querySelector("#first");
    const signUpFormNext = document.querySelector("#next");
    signUpFormFirst.style.opacity = "0";
    setTimeout(() => {
      signUpFormFirst.style.display = "none";
      signUpFormNext.style.display = "block";
      setTimeout(() => (signUpFormNext.style.opacity = "1"), 250);
    }, 250);
  }

  static goBackToFirst() {
    const signUpFormFirst = document.querySelector("#first");
    const signUpFormNext = document.querySelector("#next");
    signUpFormNext.style.opacity = "0";
    setTimeout(() => {
      signUpFormNext.style.display = "none";
      signUpFormFirst.style.display = "block";
      setTimeout(() => (signUpFormFirst.style.opacity = "1"), 250);
    }, 250);
  }

  static addToDB() {
    const fName = document.querySelector("#signUpFirstName").value;
    const lName = document.querySelector("#signUpLastName").value;
    const email = document.querySelector("#signUpEmail").value;
    const dOB = document.querySelector("#signUpDOB").value;
    const genderMale = document.querySelector("#signUpGenderMale");
    const genderFemale = document.querySelector("#signUpGenderFemale");
    const username = document.querySelector("#signUpUsername").value;
    const fPasscode = document.querySelector("#signUpFirstPasscode").value;
    const sPasscode = document.querySelector("#signUpSecondPasscode").value;

    let gender, password;
    genderFemale.checked !== false
      ? (gender = genderFemale.value)
      : (gender = genderMale.value);

    if (fPasscode === sPasscode) {
      password = fPasscode;
    } else {
      document.querySelector("#signUpFirstPasscode").value = "";
      document.querySelector("#signUpSecondPasscode").value = "";
      this.alert("Incorrect Passwords", "danger");
    }

    const user = new User(fName, lName, email, dOB, gender, username, password);
    DB.validate(user);
  }

  static closeModal() {
    document.querySelector("#modal").style.display = "none";
  }

  static alert(message, effect) {
    document.querySelector("#modal").style.display = "flex";

    const alertBox = document.querySelector("#alert");
    alertBox.firstElementChild.textContent = message;
    alertBox.firstElementChild.classList.add(effect);
  }
}

if (document.querySelector("#alert") !== null) {
  document
    .querySelector("#alert")
    .querySelector("button")
    .addEventListener("click", () => UI.closeModal());
}

if (document.querySelector("#mainSignUpForm") !== null) {
  const signUpForm = document.querySelector("#mainSignUpForm");
  const signUpFormSubmitBtn = document.querySelector("#signUpFormSubmit");
  const signUpFormBackBtn = document.querySelector("#back");

  signUpForm.addEventListener("submit", (e) => UI.gotoNext(e));

  signUpFormBackBtn.addEventListener("click", () => UI.goBackToFirst());

  signUpFormSubmitBtn.addEventListener("click", () => UI.addToDB());
}

if (document.querySelector("#signInForm") !== null) {
  const signInForm = document.querySelector("#signInForm");

  signInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const signInEmail = document.querySelector("#signInEmail").value;
    const signInPassword = document.querySelector("#signInPasscode").value;

    DB.authenticate(signInEmail, signInPassword);
  });
}
