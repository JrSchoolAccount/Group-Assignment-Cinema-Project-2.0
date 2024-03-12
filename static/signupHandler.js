const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);

  // Convert FormData to JSON
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  // Store form data in localStorage
  localStorage.setItem('signupData', JSON.stringify(formObject));
  console.log('Signup Form Data:', formObject);
  event.target.reset();
});
