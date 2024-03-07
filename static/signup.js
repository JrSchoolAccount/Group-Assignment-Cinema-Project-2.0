document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.querySelector('#signup');

  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const userNameInput = document.querySelector('#userName');
    const emailInput = document.querySelector('#email');
    const fullNameInput = document.querySelector('#fullName');
    const passwordInput = document.querySelector('#password');
    const repeatPasswordInput = document.querySelector('#repeatPassword');

    const userName = userNameInput.value;
    const email = emailInput.value;
    const fullName = fullNameInput.value;
    const password = passwordInput.value;
    const repeatPassword = repeatPasswordInput.value;

    console.log(
      'Anvädarnamn:',
      userName,
      'E-post:',
      email,
      'Fullständigt name:',
      fullName,
      'Lösenord:',
      password,
      'Upprepat lösenord:',
      repeatPassword
    );

    userNameInput.value = '';
    emailInput.value = '';
    fullNameInput.value = '';
    passwordInput.value = '';
    repeatPasswordInput.value = '';
  });
});
