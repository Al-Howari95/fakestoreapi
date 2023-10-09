

// // card
// function Product(title, price,image) {
//   this.title = title;
//   this.price = price;
//   this.image = image;
// }

// async function fetchProducts() {
//   try {
//       const response = await fetch('https://fakestoreapi.com/products');
//       const products = await response.json();
//       return products;
//   } catch (error) {
//       console.error('Error fetching products:', error);
//   }
// }
// async function renderProducts() {
//   const productList = document.getElementById('product-list');

//   const products = await fetchProducts();

//   if (products && products.length > 0) {
//       productList.innerHTML = ''; 

     
//       const productContainer = document.createElement('div');
//       productContainer.classList.add('product-container');

//       products.map(product => {
//           const productCard = document.createElement('div');
//           productCard.classList.add('product-card');

//           const productImage = document.createElement('img');
//           productImage.src = product.image ;
         

//           const productTitle = document.createElement('h2');
//           productTitle.innerHTML = product.title;

//           const productPrice = document.createElement('p');
//           productPrice.innerHTML = `Price: ${product.price}`;

       

//           productCard.appendChild(productImage);
//           productCard.appendChild(productTitle);
//           productCard.appendChild(productPrice);
         

//           productContainer.appendChild(productCard);
//       });

//       productList.appendChild(productContainer);
//   } else {
//       productList.innerHTML = 'No products available';
//   }
// }
// renderProducts();





// http://localhost:3000/posts

// EX 2 -------------------

  
document.addEventListener("DOMContentLoaded", function () {
  const postForm = document.getElementById("post-form");
  const postContainer = document.getElementById("post-container");

  postForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const title = document.getElementById("title").value;
      const content = document.getElementById("content").value;

      const newPost = {
          title,
          content,
      };

    
      fetch("http://localhost:3000/posts", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(newPost),
      })
      .then((response) => response.json())
      .then((data) => {
          document.getElementById("title").value = "";
          document.getElementById("content").value = "";

          displayPost(data);
      });
  });

  function displayPost(post) {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.content}</p>
          <div class="card-buttons">
              <button class="delete-button" data-id="${post.id}"><i class="fas fa-trash"></i> Delete</button>
              <button class="update-button" data-id="${post.id}"><i class="fas fa-edit"></i> Update</button>
          </div>
      `;

      const deleteButton = card.querySelector(".delete-button");
      deleteButton.addEventListener("click", deletePost);

      const updateButton = card.querySelector(".update-button");
      updateButton.addEventListener("click", updatePost);

      postContainer.appendChild(card);
  }

  function deletePost(e) {
      const postId = e.target.getAttribute("data-id");

      fetch(`http://localhost:3000/posts/${postId}`, {
          method: "DELETE",
      })
      .then(() => {
          e.target.closest(".card").remove();
      });
  }

  function updatePost(e) {
      const postId = e.target.getAttribute("data-id");

      fetch(`http://localhost:3000/posts/${postId}`)
      .then((response) => response.json())
      .then((post) => {
    
          alert(`Update post: ${JSON.stringify(post)}`);
      });
  }

  fetch("http://localhost:3000/posts")
  .then((response) => response.json())
  .then((data) => {
      data.forEach((post) => {
          displayPost(post);
      });
  });
});
























  
