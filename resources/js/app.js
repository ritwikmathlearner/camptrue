const contactFormSubmit = () => {
  let fullName = document.getElementById("full-name");
  let email = document.getElementById("email");
  let subject = document.getElementById("subject");
  let message = document.getElementById("message");
  let inputNotEmpty = checkRequird([
    fullName.value,
    email.value,
    subject.value,
    message.value,
  ]);
  let emailValid = validateEmail(email.value);
  if (inputNotEmpty && emailValid) {
    alert('Message sent');
  } else {
    alert('Please submit the form with valid information');
  }
};

const checkRequird = (inputs) => {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i] === "") {
      return false;
    }
  }
  return true;
};

const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (
    re.test(email)
  ) {
    return true;
  }
  return false;
};
