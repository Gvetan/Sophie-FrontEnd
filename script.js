//Introduction du lien de l'API//
async function getWorks() {
  const reponse = await fetch("http://localhost:5678/api/works");
  const films = await reponse.json();
  console.log(films)
  return films
}

//Importation des images//

function galleryItems(work) {
  let gallery = document.querySelector(".gallery");
  let modalGallery = document.querySelector(".modal-gallery");
  console.log(work);

gallery.innerHTML = ''
modalGallery.innerHTML = ''

  work.forEach(item => {
    gallery.innerHTML += `
      <figure id="${item.id}" category="${item.categoryId}">
        <img src="${item.imageUrl}" alt="${item.title}" class="thumbnail">
        <figcaption>${item.title}</figcaption>
      </figure>`;

     modalGallery.innerHTML += `
      <figure category="${item.categoryId}" class="image-container">
        <div class="trash-icon" workId="${item.id}" >
          <i class="fa-solid fa-trash-can"></i>
        </div>
        <img src="${item.imageUrl}" alt="${item.title}" class="modal-thumbnail">
      </figure>`;
  });

  trashDelet();
}

function trashDelet () {

  document.querySelectorAll(".trash-icon").forEach(trash => {
    console.log(trash);
    trash.addEventListener("click", (e)  => {
   console.log(trash);
        const workId = trash.getAttribute("workId"); // Récupère l'ID
        const figureElement = trash.closest("figure"); // Cible le parent figure
    
        
const token = window.sessionStorage.getItem("token");
      // Requête de suppression
      fetch(`http://localhost:5678/api/works/${workId}`, {
        headers: {Authorization: `Bearer ${token}`},
        method: "DELETE",
      })


        .then(response => {
          if (response.ok) {
            // Suppression réussie, retirer l'élément du DOM
            document.getElementById(workId).remove();
            figureElement.remove();
          } else {
            console.error("Échec de la suppression en base de données.");
          }
        })
        .catch(error => {
          console.error("Erreur lors de la requête :", error);
        });

        
        
    })
  });
}


//Réalisation des boutons filtres//

async function getCategories() {
  try {
    const response = await fetch('http://localhost:5678/api/categories');

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const data = await response.json();

    return data;

  } catch (error) {
    console.error('Erreur lors de la récupération des catégories :', error);
    return null;
  }
}


function writeCategories(categories) {
  let groupFiltres = document.querySelector('.filtres')
  groupFiltres.innerHTML = '<div class="filtres" category="all">Tous</div>'
  categories.forEach(item => {
    groupFiltres.innerHTML += `
  <div class="filtres" category="${item.id}">${item.name}</div>`;

    console.log(categories);

  })
}



async function CategoriesSelect() {
  const categories = await getCategories();
  if (categories) {
    const selectcategorie = document.getElementById("input_categorie");
    select.innerHTML = '<option disabled selected></option>'; 

    categories.forEach(category => {
      select.innerHTML += `<option value="${category.id}">${category.name}</option>`;
    });
  }
}



   buttonFilters = document.querySelectorAll('.filtres');

  buttonFilters.forEach(button => {
    button.addEventListener('click', (e) => {
      const categoryId = e.target.getAttribute("category");
      filterGallery(categoryId);
    });
    console.log(button)
  });


function filterGallery(categoryId) {
  let figures = document.querySelectorAll('.gallery figure');
  figures.forEach(figure => {
    console.log(figure);
    if (categoryId === 'all' || figure.getAttribute('category') === categoryId) {
      figure.style.display = 'block';
    } else {
      figure.style.display = 'none';
    }
  });
}


async function CategoriesSelect() {
  const categories = await getCategories();
  if (categories) {
    const selectcategorie = document.getElementById("input_categorie");
    selectcategorie.innerHTML = '<option disabled selected></option>';
    categories.forEach(category => {
      selectcategorie.innerHTML += `<option value="${category.id}">${category.name}</option>`;
    });
  }
}



//Récupération des données//
async function main() {
  let work = await getWorks();
  galleryItems(work);

  let categories = await getCategories();
  writeCategories(categories);
  await CategoriesSelect();

  let trash = await trashDelet();


  // Mode édition affichage //
const token = window.sessionStorage.getItem("token");
const modeEdition = document.getElementById('mode-edition');
const filtres = document.querySelector('.filtres');
const modificationContainer = document.getElementById('open-modal');
const loginLink = document.querySelector('a[href="login.html"]'); 

if (token) {
    // Mode édition activé
    modeEdition.style.display = 'block';  
    filtres.style.display = 'none';       
    modificationContainer.style.display = 'block'; 

    // Mettre à jour le lien "Login" en "Logout"
    loginLink.innerText = "Logout";
    loginLink.href = "#"; 
    loginLink.onclick = function () {
      
        window.sessionStorage.removeItem("token"); 
        window.location.reload(); 
    };
} else {
    // Mode édition désactivé
    modeEdition.style.display = 'none';  
    filtres.style.display = 'flex';    
    modificationContainer.style.display = 'none';  

    // Mettre à jour le lien "Logout" en "Login"
    loginLink.innerText = "Login";
    loginLink.href = "login.html"; 
    loginLink.onclick = null; 
}


// modal //

document.getElementById('open-modal').addEventListener("click", (event) => {
  event.preventDefault(); 
  document.getElementById('modal1').style.display = 'flex';
});


document.getElementById('close-button-modal1').addEventListener("click", () => {
  document.getElementById('modal1').style.display = 'none';
});

// Fermeture du modal quand on clique sur le back (sur l'overlay)
window.addEventListener("click", (event) => {
  let modal = document.getElementById('modal1');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});


document.querySelector('.add-photo-button').addEventListener('click', function() {
  document.getElementById('modal1').style.display = 'none'; 
  document.getElementById('modal2').style.display = 'flex'; 
});


document.querySelector('.fa-arrow-left').addEventListener('click', function() {
  document.getElementById('modal2').style.display = 'none'; 
  document.getElementById('modal1').style.display = 'flex'; 
});


document.getElementById('close-button-modal2').addEventListener('click', function() {
  document.getElementById('modal2').style.display = 'none';
  document.getElementById('modal1').style.display = 'none';
});

window.addEventListener('click', function(event) {
  let modal1 = document.getElementById('modal1');
  let modal2 = document.getElementById('modal2');
  if (event.target === modal1) {
    modal1.style.display = 'none';
  } else if (event.target === modal2) {
    modal2.style.display = 'none';
  }
});

}



// Fonction pour vérifier l'état des champs
function checkFormValidity() {
  const imageFile = document.getElementById('upload-photo').files[0];
  const title = document.getElementById('input_titre').value.trim();
  const category = document.getElementById('input_categorie').value.trim();

  const validerButton = document.getElementById('submit-button');
  
  // Activer ou désactiver le bouton en fonction de la validité du formulaire
  if (imageFile && title && category) {
    validerButton.classList.add('enabled-button');  // Ajoute la classe "enabled-button" pour activer le bouton
  } else {
    validerButton.classList.remove('enabled-button');  // Retire la classe "enabled-button" pour désactiver le bouton
  }
}

// Ajout des événements pour vérifier la validité du formulaire
document.getElementById('upload-photo').addEventListener('change', checkFormValidity);  // Pour la sélection d'image
document.getElementById('input_titre').addEventListener('input', checkFormValidity);  // Pour le titre
document.getElementById('input_categorie').addEventListener('input', checkFormValidity);  // Pour la catégorie

// Vérifier la validité au chargement de la page (au cas où il y a déjà des valeurs dans les champs)
document.addEventListener('DOMContentLoaded', checkFormValidity);

document.getElementById('picture-form').addEventListener('submit', async (event) => {
  event.preventDefault(); // Empêche le rechargement de la page

  const formData = new FormData();
  const token = window.sessionStorage.getItem("token");

  const validerButton = document.getElementById('submit-button');

  const imageFile = document.getElementById('upload-photo').files[0];
  const title = document.getElementById('input_titre').value.trim();
  const category = document.getElementById('input_categorie').value.trim();

  if (!imageFile || !title || !category) {
    alert('Veuillez remplir tous les champs et sélectionner un fichier image !');
    return;
  }

  formData.append('image', imageFile);
  formData.append('title', title);
  formData.append('category', category);

  try {
    const response = await fetch('http://localhost:5678/api/works', {
      headers: { Authorization: `Bearer ${token}` },
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'envoi du projet');
    }

    else {
      const work = await getWorks();
      galleryItems(work);
      trashDelet();
    }

    const result = await response.json();
    alert('Projet ajouté avec succès !');
    console.log(result);

    // Réinitialisation des champs texte
    document.getElementById('input_titre').value = '';
    document.getElementById('input_categorie').value = '';

    // Réinitialisation du champ fichier
    const fileInput = document.getElementById('upload-photo');
    fileInput.value = '';

    // Suppression de l'image prévisualisée
    const previewContainer = document.getElementById('image-preview-container'); 
    const imgPreview = document.getElementById('image-preview');
    const iconPlaceholder = document.getElementById('icon-placeholder');
    const updatephoto = document.getElementById('update-photo');
    const limitephoto = document.getElementById('limit-photo');

    if (imgPreview) {
      previewContainer.removeChild(imgPreview); 
    }

    // Affichage des icônes par défaut
    iconPlaceholder.style.display = 'block';
    limitephoto.style.display = 'block';
    updatephoto.style.display = 'block';


  
  } catch (error) {
    console.error(error);
    alert('Une erreur est survenue. Veuillez réessayer.');
  }
});

// Prévisualisation d'image
function voirImage(input) {
  const previewContainer = document.getElementById('image-preview-container');
  const iconPlaceholder = document.getElementById('icon-placeholder');
  const updatephoto = document.getElementById('update-photo');
  const limitephoto = document.getElementById('limit-photo') 
  

  if (input.files && input.files[0]) {
    const file = input.files[0];

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = function (e) {
        if (iconPlaceholder) {
          iconPlaceholder.style.display = 'none';

        }

        if (updatephoto) {
          updatephoto.style.display = 'none';
        }

        if (limitephoto) {
          limitephoto.style.display = 'none';
        }

        let imgPreview = document.getElementById('image-preview');
        if (!imgPreview) {
          imgPreview = document.createElement('img');
          imgPreview.id = 'image-preview';
          previewContainer.appendChild(imgPreview);
        }
        imgPreview.src = e.target.result;
      };

      reader.readAsDataURL(file);
    } else {
      alert('Veuillez sélectionner un fichier image valide (JPEG ou PNG).');
    }
  }
}




main();

