document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('#login');

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const usernameInput = document.querySelector('#username');
    const passwordInput = document.querySelector('#password');

    const username = usernameInput.value;
    const password = passwordInput.value;

    console.log('Anvädarnamn:', username, 'Lösenord:', password);
  });
});
