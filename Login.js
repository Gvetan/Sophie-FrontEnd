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
    });

    if (response.ok) {
      const result = await response.json();
      localStorage.setItem('token', result.token); // Sauvegarde du token dans le localStorage
      afficherModeEdition(); // Affiche le mode édition
    } else {
      afficherErreur("Mot de passe incorrect");
    }

  } catch (error) {
    console.error(error);
    afficherErreur("Une erreur est survenue");
  }
});

// Fonction pour afficher le mode édition
function afficherModeEdition() {
  document.getElementById('mode-edition').style.display = 'block';
  document.getElementById('login-form').style.display = 'none';
}

// Fonction pour masquer le mode édition
function masquerModeEdition() {
  document.getElementById('mode-edition').style.display = 'none';
  document.getElementById('login-form').style.display = 'block';
}
