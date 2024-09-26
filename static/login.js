document
  .getElementById('loginForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const error = document.getElementById('loginError');

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    if (!data.userName || !data.password) {
      error.textContent = 'Vänligen ange användarnamn och lösenord';
      return;
    }

    console.log(data);
    alert(data.userName + ' har loggat in');

    this.reset();
  });
