const loginconnect = "http://localhost:5678/api/users/login";


document.getElementById('login-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  let user = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  };

  try {
    let response = await fetch(loginconnect, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    const result = await response.json()

    console.log(result.token)

  }
  catch (error) {
    console.error(error)
  }

})