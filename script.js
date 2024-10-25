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
  console.log(work);

  work.forEach(item => {
    gallery.innerHTML += `
    <figure category="${item.categoryId}">
        <img src="${item.imageUrl}" alt="${item.title}">
        <figcaption>${item.title}</figcaption>
      </figure>`;
  })
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



//Récupération des données//
async function main() {
  let work = await getWorks();
  galleryItems(work);

  let categories = await getCategories();
  writeCategories(categories)
}

main();