const storedSignupData = JSON.parse(localStorage.getItem('signupData'));

function handleLogin(event) {
  event.preventDefault();

  const loginForm = document.getElementById('signinForm');
  const formData = new FormData(loginForm);
  const loginData = Object.fromEntries(formData.entries());

  if (
    storedSignupData &&
    loginData.email === storedSignupData.email &&
    loginData.password === storedSignupData.password
  ) {
    window.location.href = 'profile';
  } else {
    alert('Invalid email or password. Please try again.');
  }
}

const loginForm = document.getElementById('signinForm');
loginForm.addEventListener('submit', handleLogin);
