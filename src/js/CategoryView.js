/*==============$ import Storage $==============*/
import Storage from './Storage.js';

//-> get title, description -> {} -> saveCategory -> ...
const categoryTitle = document.querySelector('#category-title'),
  categoryDescription = document.querySelector('#category-description'),
  addCategory = document.querySelector('#add-new-category'),
  cancelCategoryBtn = document.querySelector('#cancel-add-category');

//===============================================

const toggleCategoryBtn = document.getElementById('toggle-add-category'),
  categoryWrapper = document.querySelector('#category-wrapper');

//===============================================

class CategoryView {
  constructor() {
    //->add an event to "Add New Category"
    addCategory.addEventListener('click', (e) => this.addNewCategory(e));

    toggleCategoryBtn.addEventListener('click', (e) => this.toggleCategory(e));

    cancelCategoryBtn.addEventListener('click', (e) => this.cancelCategory(e));

    //-> default = [] / but when updated we got that new value from addNewCategory()
    this.categories = [];
  }

  //============> Set Categories <=============
  setApp() {
    //-> in the initial load, put the categories we have in the App and categoryView
    this.categories = Storage.getAllCategories();
  }

  //===========> Add New Category <===========
  addNewCategory(e) {
    e.preventDefault();

    const title = categoryTitle.value;
    const description = categoryDescription.value;

    //-> Stop if title and desc was empty
    if (!title || !description) return;

    //-> Save newCategory  3 => 4
    Storage.saveCategories({ title, description });

    //-> To display new added category and then call it on "constructor"
    this.categories = Storage.getAllCategories();

    //-> Update DOM: update "Category" option on product section
    this.createCategoriesList();

    //-> empty inputs after each submit
    categoryTitle.value = '';
    categoryDescription.value = '';

    //-> Add toggle event
    categoryWrapper.classList.add('hidden');
    toggleCategoryBtn.classList.remove('hidden');
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

  //============> Toggle Category <=============
  toggleCategory(e) {
    e.preventDefault();

    categoryWrapper.classList.remove('hidden');
    toggleCategoryBtn.classList.add('hidden');
  }

  //============> Cancel Category <=============
  cancelCategory(e) {
    e.preventDefault();

    categoryWrapper.classList.add('hidden');
    toggleCategoryBtn.classList.remove('hidden');
  }
}

//-> export the new instance of CategoryView So if we used it elsewhere we don't need to make a new instance of CategoryView there
export default new CategoryView();
