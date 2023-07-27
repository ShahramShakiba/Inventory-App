/*==============$ import Storage $==============*/
import Storage from './Storage.js';

const addNewProduct = document.getElementById('add-new-product');

const searchInput = document.querySelector('#search-input'),
  selectedSort = document.querySelector('#sort-products');

class ProductView {
  constructor() {
    addNewProduct.addEventListener('click', (e) => this.addNewProduct(e));
    searchInput.addEventListener('input', (e) => this.searchProduct(e));
    selectedSort.addEventListener('change', (e) => this.sortProducts(e));

    this.products = [];
  }

  //============> Set Products <=============
  setApp() {
    this.products = Storage.getAllProducts();
  }

  //===========> Add New Product <==========
  addNewProduct(e) {
    e.preventDefault();

    const title = document.querySelector('#product-title').value,
      quantity = document.querySelector('#product-quantity').value,
      category = document.querySelector('#product-category').value;

    //-> Stop if title, category and quantity was empty
    if (!title || !category || !quantity) return;

    //-> Save newProduct
    Storage.saveProducts({ title, category, quantity });

    //-> Update DOM: update "Products" option
    this.products = Storage.getAllProducts();

    //-> Add new products
    this.createProductsList(this.products);
  }

  //============> Create Products <=============
  createProductsList(products) {
    let result = '';

    //make our date like:  March 30, 2023
    const options = {
      weekly: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    products.forEach((item) => {
      //-> find selected category by its id
      const selectedCategory = Storage.getAllCategories().find(
        (c) => c.id === parseInt(item.category)
      );
      console.log(products);
      result += `
      <div class="flex items-center justify-between mb-8">
        <span class="text-slate-400">
          ${item.title}
        </span>

        <div class="flex items-center gap-x-3">
          <span class="text-slate-400">
            ${new Date().toLocaleDateString('en', options)}
          </span>

          <span
              class="block px-3 py-0.5 text-slate-400 border
              border-slate-400 text-sm rounded-2xl">
            ${selectedCategory.title}
          </span>

          <span
              class="flex items-center justify-center w-7 h-7 
              rounded-full bg-slate-500 text-slate-300 border-2
              border-slate-300">
            ${item.quantity}
          </span>

          <button
              class="delete-product border px-2 py-0.5 rounded-2xl
              border-red-400 text-red-400" data-product-id=${item.id}>
            Delete
          </button>
        </div>
      </div>
        `;
    });

    const productsDOM = document.getElementById('products-list');
    productsDOM.innerHTML = result;

    //-> deleteBtns = Node-list => convert to an array with "spread op"
    const deleteBtns = [...document.querySelectorAll('.delete-product')];

    deleteBtns.forEach((item) => {
      item.addEventListener('click', (e) => this.deleteProduct(e));
    });
  }

  //============> Search Products <=============
  searchProduct(e) {
    const value = e.target.value.trim().toLowerCase();
    
    const filteredProducts = this.products.filter((p) =>
      p.title.toLowerCase().includes(value)
    );

    this.createProductsList(filteredProducts);
  }

  //============> Sort Products <=============
  sortProducts(e) {
    const value = e.target.value;
    this.products = Storage.getAllProducts(value);
    this.createProductsList(this.products);
  }

  //============> Delete Products <=============
  deleteProduct(e) {
    const productId = e.target.dataset.productId;
    Storage.deleteProduct(productId);
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
  }
}

export default new ProductView();
