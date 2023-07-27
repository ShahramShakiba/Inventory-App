/*==============$ import Storage $==============*/
import Storage from './Storage.js';

//-> get title, description -> {} -> saveCategory -> ...
const cTitle = document.querySelector('#category-title'),
  cDescription = document.querySelector('#category-description'),
  addCategory = document.querySelector('#add-new-category'),
  cancelCategory = document.querySelector('#cancel-add-category');

const toggleCategory = document.getElementById('toggle-add-category'),
  categoryWrapper = document.querySelector('#category-wrapper');

class CategoryView {
  constructor() {
    //->add an event to "Add New Category"
    addCategory.addEventListener('click', (e) => this.addNewCategory(e));

    toggleCategory.addEventListener('click', (e) => this.toggleAddCategory(e));
    cancelCategory.addEventListener('click', (e) => this.cancelAddCategory(e));

    //-> default = [] / but when updated we got that new value from addNewCategory()
    this.categories = [];
  }

  //===========> Add New Category <===========
  addNewCategory(e) {
    e.preventDefault();

    const title = cTitle.value;
    const description = cDescription.value;

    //-> Stop if title and desc was empty
    if (!title || !description) return;

    //-> Save newCategory  3 => 4
    Storage.saveCategories({ title, description });

    //-> To display new added category and then call it on "constructor"
    this.categories = Storage.getAllCategories();

    //-> Update DOM: update "Category" option on product section
    this.createCategoriesList();

    //-> empty inputs after each submit
    cTitle.value = '';
    cDescription.value = '';

    categoryWrapper.classList.add('hidden');
    toggleCategory.classList.remove('hidden');
  }

  //============> Set App <============= 
  setCategory() {
    //-> in the initial load, put the categories we have in the App and categoryView
    this.categories = Storage.getAllCategories();
  }

  //=====> Create category on product UI <======= 
  createCategoriesList() {
    //-> Set as default 
    let result = `
    <option class="bg-slate-500 text-slate-300" value="">
        Select a category
    </option>
    `;

    this.categories.forEach((item) => {
      result += `
        <option class="bg-slate-500 text-slate-300" value=${item.id}>
            ${item.title}
        </option>
        `;
    });

    const categoryDOM = document.getElementById('product-category');

    categoryDOM.innerHTML = result;
  }

  //============>  <============= 
  toggleAddCategory(e) {
    e.preventDefault();
    categoryWrapper.classList.remove('hidden');
    toggleCategory.classList.add('hidden');
  }


  //============>  <============= 
  cancelAddCategory(e) {
    e.preventDefault();
    categoryWrapper.classList.add('hidden');
    toggleCategory.classList.remove('hidden');
  }
}

//-> export the new instance of CategoryView So if we used it elsewhere we don't need to make a new instance of CategoryView there 
export default new CategoryView();

