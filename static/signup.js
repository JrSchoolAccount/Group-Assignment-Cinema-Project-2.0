document
  .getElementById('signupForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValid.test(data.email)) {
      alert('Ange en giltig emailadress');
      return;
    }

    const password = data.password;
    const passwordStrength = document.getElementById('passwordStrength');
    if (!/(?=.*\d)(?=.*[A-Z]).{6,}/.test(password)) {
      passwordStrength.textContent =
        'Lösenordet måste vara minst 6 tecken långt, innehålla en stor bokstav och en siffra';

      return;
    } else {
      passwordStrength.textContent = '';
    }

    console.log(data);
    alert(data.userName + ' har registrerats');

    this.reset();
  });
