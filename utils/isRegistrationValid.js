const validateEmail = async (email) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

//at least 8 char long and contains at least one lowercase, one uppercase, one number
const validatePassword = async (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
};

const isRegistrationValid = async (email, password) => {
  const isEmailValid = await validateEmail(email);
  const isPasswordValid = await validatePassword(password);

  console.log("email: ", isEmailValid, "password: ", isPasswordValid);

  return isEmailValid && isPasswordValid;
};

export default isRegistrationValid;
