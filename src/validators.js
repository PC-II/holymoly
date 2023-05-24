var errors = [];

export const validEmail = (email) => {
  errors = [];
  if(email === ''){
    errors.push(`📧 Email: Can't be blank`);
  } else if(!/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email)){
    errors.push(`📧 Email: Invalid format`);
  }
  return errors;
}

export const validUsername = (username) => {
  errors = [];
  if(username === ''){
    errors.push(`👤 Username: Can't be blank`);
  } else {
    if(/^_|_$/.test(username)){
      errors.push(`👤 Username: Can't start or end with underscore`);
    }
    if(/\W/.test(username)){
      errors.push(`👤 Username: Can only have:\nA-Z a-z 0-9 _`);
    }
    if(username.length < 3 || username.length > 20){
      errors.push(`👤 Username: Must be 3-20 characters long`);
    }
  }
  return errors;
}

export const validPassword = (password) => {
  errors = [];
  if(password === ''){
    errors.push(`🔑 Password: Can't be blank`);
  } else if(/^(.)\1*$/.test(password)){
    errors.push(`🔑 Change your password. Change all of your passwords if you think that was a good password... 🤨`);
  } else {
    if(password.length < 6){
      errors.push(`🔑 Password: Needs at least 6 characters`);
    }
    if(/^[^a-z]*$/.test(password)){
      errors.push(`🔑 Password: Needs a lowercase letter a-z`);
    }
    if(/^[^A-Z]*$/.test(password)){
      errors.push(`🔑 Password: Needs an uppercase letter A-Z`);
    }
    if(/^\D*$/.test(password)){
      errors.push(`🔑 Password: Needs a number 0-9`);
    }
    if(/^[^!-/:-@[-`{-~]*$/.test(password)){
      errors.push(`🔑 Password: Needs a special character (~ : ? < | _ etc.)`);
    }
  }
  return errors;
}

export const validConfirmPass = (confirmPass, password) => {
  errors = [];
  if(confirmPass === '') {
    errors.push(`🔐 Confirm Pass: Can't be blank`);
  } else if(confirmPass !== password){
      errors.push(`🔑🔐 Passwords don't match`);
  }
  return errors;
}

export const validEntry = (entry, inputId, password) => {
  if(inputId === 'sign-up-email'){
    return validEmail(entry);
  } else if(inputId === 'sign-up-username'){
    return validUsername(entry);
  } else if(inputId === 'sign-up-password'){
    return validPassword(entry);
  } else {
    return validConfirmPass(entry, password);
  }
}