// Crea una funzione getPostTitle(id) che accetta un id e restituisce una Promise che recupera il titolo di un post dal link https://dummyjson.com/posts/{id}

function getPostTitle(id) {
  return new Promise((resolve, reject) => {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then((response) => (titolo = response.json()))
      .then((titolo) => resolve(titolo.title))
      .catch(reject);
  });
}

getPostTitle(1)
  .then((post) => console.log(post))
  .catch((error) => console.error(error));
