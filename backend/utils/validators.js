export const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
export const validatePassword = (pass) => /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/.test(pass);
