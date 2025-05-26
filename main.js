// Es 1: Crea una funzione getPostTitle(id) che accetta un id e restituisce una Promise che recupera il titolo di un post dal link https://dummyjson.com/posts/{id}

function getPostTitle(id) {
  return new Promise((resolve, reject) => {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then((response) => response.json())
      .then((post) => resolve(post.title))
      .catch(reject); // Invece di: error => reject(error) posso passare subito REJECT al metodo .catch()
  });
}

/* Bonus ex 1: Ottieni l'intero post con l'autore
Crea una funzione getPost(id) che recupera l'intero post. Concatena una seconda chiamata che aggiunge una proprietà user che contiene i dati dell'autore, recuperati dalla chiamata https://dummyjson.com/users/{post.userId}. 
*/

function getPost(id) {
  return new Promise((resolve, reject) => {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then((response) => response.json())
      .then((post) => {
        fetch(`https://dummyjson.com/users/${post.userId}`)
          .then((response) => response.json())
          .then((user) => {
            resolve({ ...post, user });

            /*
            const result = {
              ...post,
              user: user,
            };
            resolve(result);
            */
          })
          .catch(reject);
      })
      .catch(reject);
  });
}

getPost(1)
  .then((post) => console.log(post))
  .catch((error) => console.error(error));

getPostTitle(1)
  .then((title) => console.log(title))
  .catch((error) => console.error(error));

/* Es 2:  Crea la funzione lanciaDado() che restituisce una Promise che, dopo 3 secondi, genera un numero casuale tra 1 e 6. Tuttavia, nel 20% dei casi, il dado si "incastra" e la Promise va in reject.
🎯 Bonus: HOF con closure per memorizzare l'ultimo lancio
Modifica la funzione in creaLanciaDado(), che restituisce una closure che memorizza l'ultimo risultato. Se il numero esce due volte di fila, stampa "Incredibile!". */

function getRandomArbitrary(min, max) {
  const number = Math.round(Math.random() * (max - min));

  return console.log(number);
}

function lanciaDado() {
  return new Promise((resolve, reject) => {
    console.log("Sto tirando il dado...");
    setTimeout(() => {
      const minValue = 1;
      const maxValue = 6;
      const randomValue = getRandomArbitrary(1, 6);

      const winnerValue = minValue >= 1 && maxValue <= 6; // tiro valido se risulta da 1-6
      const value = winnerValue === 0 ? false : true;
      if (winnerValue === randomValue) {
        resolve(`il numero ${randomValue} è valido, 80% resolve score!`);
      } else {
        reject(`il numero ${randomValue} è non valido, 20% reject score!`);
      }
    }, 3000);
  });
}

lanciaDado()
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
