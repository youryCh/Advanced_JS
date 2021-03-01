const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
// Перевести на Promise НЕ ИСПОЛЬЗОВАТЬ fetch

// let getRequest = (url, callBack) => {
//   let xhr = new XMLHttpRequest();
//   xhr.open('GET', url, true);
//   xhr.onreadystatechange = () => {
//     if (xhr.readyState === 4) {
//       if (xhr.status !== 200) {
//         console.log('Error');
//       } else {
//         callBack(xhr.responseText);
//       }
//     }
//   }
//   xhr.send();
// };

// Задание
const getRequest = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
};

getRequest(`${API}/catalogData.json`)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
  
///////////////////////////////////////

class ProductList {
  #goods;
  #allProducts;

  constructor(container = '.products') {
    console.log('constructor');
    this.container = container;
    this.#goods = [];
    this.#allProducts = [];

    this.#getProducts()
      .then((data) => {
        this.#goods = [...data];
        this.#render();
      });
  }

  goodsTotalPrice() {
    return this.#goods.reduce((sum, { price }) => sum + price, 0);
  }  
  
  #getProducts() {
    return fetch(`${API}/catalogData.json`)
      .then((response) => response.json())
      .catch((err) => {
        console.log(err);
      });
  }

  #render() {
    const block = document.querySelector(this.container);

    this.#goods.forEach((product) => {
      const productObject = new ProductItem(product);
      console.log(productObject);
      this.#allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    });
  }
}

class ProductItem {
  constructor(product, img='https://placehold.it/200x150') {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
          </div>`;
  }
}

const productList = new ProductList();