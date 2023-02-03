const validateEmail = async (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validatePassword = async (password) => {
  return String(password)
    .toLowerCase()
    .match(/(?=.*\d)(?=.*[a-zA-Z]).{8,}/);
};

const isRegistrationValid = async (email, password) => {
  const isEmailValid = await validateEmail(email);
  const isPasswordValid = await validatePassword(password);
  console.log("email: ", isEmailValid, "password: ", isPasswordValid);

  return isEmailValid && isPasswordValid;
};

export default isRegistrationValid;
