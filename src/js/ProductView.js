/*==============$ import Storage $==============*/
import Storage from './Storage.js';

const numOfProducts = document.querySelector('#product-number');

const addNewProduct = document.getElementById('add-new-product');

const searchInput = document.querySelector('#search-input'),
  sortInput = document.querySelector('#sort-products');

class ProductView {
  constructor() {
    numOfProducts.addEventListener('change', (e) =>
      this.updateProductNumber(e)
    );

    addNewProduct.addEventListener('click', (e) => this.addNewProduct(e));

    searchInput.addEventListener('input', (e) => this.searchProduct(e));

    sortInput.addEventListener('change', (e) => this.sortProducts(e));

    this.products = [];

    this.updateProductNumber();
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

    //-> Clear input fields 
    document.querySelector('#product-title').value = '';
    document.querySelector('#product-quantity').value = '';
    document.querySelector('#product-category').value = '';

    //-> Save newProduct
    Storage.saveProducts({ title, category, quantity });

    //-> Update DOM: update "Products" option
    this.products = Storage.getAllProducts();

    //-> Add new products
    this.createProductsList(this.products);

    //-> Update product number
    this.updateProductNumber();
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

    products.innerHTML = '';

    products.forEach((item) => {
      //-> find selected category by its id
      const selectedCategory = Storage.getAllCategories().find(
        (c) => c.id === parseInt(item.category)
      );

      /* optional chaining operator (?.): add a check to verify if the 'item' object exists and if the 'title' property is defined before accessing it. */
      result += `
      <div class="products-details flex items-center justify-between mb-8">
        <span class="added-product text-slate-400" 
        style="margin-left: 3px; padding-right: 30px; padding-left: 3px;">
          ${item?.title}
        </span>

        <div class="flex items-center gap-x-3">
          <span class="text-slate-400">
            ${new Date().toLocaleDateString('en', options)}
          </span>

          <span
              class="block px-3 py-0.5 text-slate-400 border
              border-slate-400 text-sm rounded-2xl">
            ${selectedCategory?.title}
          </span>

          <span
              class="flex items-center justify-center w-7 h-7 
              rounded-full bg-slate-500 text-slate-300 border-2
              border-slate-300">
            ${item?.quantity}
          </span>

          <button
              class="edit-product border px-2 py-0.5 rounded-2xl
              border-slate-400 text-slate-400" data-id=${item?.id}>
              <i class="ri-edit-line"></i>
          </button>
          <button
              class="delete-product border px-2 py-0.5 rounded-2xl
              border-red-400 text-red-400" data-id=${item?.id}
              >
              
              <span class="delete-icon">
                <i class="ri-delete-bin-line"></i>
              </span>
          </button>
        </div>
      </div>
        `;
    });

    const productsDOM = document.getElementById('products-list');
    productsDOM.innerHTML = result;

    //-> deleteBtns = Node-list => convert to an array with "spread op"
    const deleteBtns = [...document.querySelectorAll('.delete-product')];

    const editBtns = [...document.querySelectorAll('.edit-product')];

    deleteBtns.forEach((btn) => {
      //adds a click event listener to the current button.
      btn.addEventListener('click', (e) => this.deleteProduct(e, btn));
    });

    editBtns.forEach((item) => {
      item.addEventListener('click', (e) => this.editProduct(e));
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

    //-> update DOM
    this.createProductsList(this.products);
  }

  //============> Delete Products <=============
  deleteProduct(e, btn) {
    const productId = btn.dataset.id;

    //-> Delete product on localStorage
    Storage.deleteProduct(productId);

    //-> finds the closest ancestor element of the `btn` 
    const productElement = btn.closest('.products-details');
    //-> Remove the product element from the DOM 
    productElement.remove();

    //-> Get remained products
    this.products = Storage.getAllProducts();

    //-> rendering the updated list of products on the web page
    this.createProductsList(this.products);

    //-> Update product number
    this.updateProductNumber();
  }

  editProduct(e) {
    const productId = e.target.dataset.id;

    const input = e.target
      .closest('.products-details')
      .querySelector('.added-product');

    input.contentEditable = true;
    input.focus();
    
    const initialValue = input.innerText;

    input.addEventListener('blur', () => {
      input.contentEditable = false;

      const updatedValue = input.innerText.trim();

      if (updatedValue === initialValue) return;

      const productToUpdate = this.products.find(
        (product) => product.id === productId
      );

      productToUpdate.title = updatedValue;

      Storage.saveProducts(productToUpdate);

      this.createProductsList(this.products);

      //-> Update product number
      this.updateProductNumber();
    });
  }

  //=======> Update the number of Products <========
  updateProductNumber(e) {
    this.products = Storage.getAllProducts();

    const count = this.products.length;
    numOfProducts.textContent = count;
  }
}

export default new ProductView();
