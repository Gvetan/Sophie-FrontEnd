
 const loginconnect = "http://localhost:5678/api/users/login";
const messageErreur = document.getElementById("messageErreur");


document.getElementById('login-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  let user = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  };


  let response = await fetch(loginconnect, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    if (data.userId && data.token) {
      window.sessionStorage.setItem("token", data.token);
      window.location.href = 'index.html';
    }
  }

  else{
    messageErreur.innerText = "Erreur dans l'identifiant ou le mot de passe";
  }





});
