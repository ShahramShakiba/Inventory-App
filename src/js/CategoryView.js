import Storage from "./Storage.js";

// get title, description -> they're inside {} -> pass to saveCategory -> ...
const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#add-new-category");
const toggleAddCategoryBtn = document.getElementById("toggle-add-category");
const categoryWrapper = document.querySelector("#category-wrapper");
const cancelAddCategory = document.querySelector("#cancel-add-category");

class CategoryView {
  constructor() {
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    toggleAddCategoryBtn.addEventListener("click", (e) =>
      this.toggleAddCategory(e)
    );
    cancelAddCategory.addEventListener("click", (e) =>
      this.cancelAddCategory(e)
    );
    // default -> [] an empty array / but when updated we got that new value from addNewCategory()
    this.categories = [];
  }

  addNewCategory(e) {
    e.preventDefault();
    const title = categoryTitle.value;
    const description = categoryDescription.value;

    if (!title || !description) return;

    // save new category
    Storage.saveCategories({ title, description }); // 3category -> 4
    // display new added category -> need this new value in constructor()
    this.categories = Storage.getAllCategories();

    // update DOM : update select option in categories
    this.createCategoriesList();

    /* empty the title and description of category section after adding new category
       so that nothing can be seen inside them */
    categoryTitle.value = "";
    categoryDescription.value = "";
    categoryWrapper.classList.add("hidden");
    toggleAddCategoryBtn.classList.remove("hidden");
  }

  // in the initial load, put the categories we have in the app and categoryView
  setApp() {
    this.categories = Storage.getAllCategories();
  }

  /* * create category options in category section
     * when we create a new category, make the category 'select option' dynamic so that
      this new category is also added to it  
     * at the end, add this method to 'addNewCategory()'  */
  createCategoriesList() {
    let result = `
    <option class="bg-slate-500 text-slate-300" value="">
        Select a category
    </option>
    `;

    this.categories.forEach((element) => {
      result += `
        <option class="bg-slate-500 text-slate-300" value=${element.id}>
            ${element.title}
        </option>
        `;
    });

    const categoryDOM = document.getElementById("product-category");
    categoryDOM.innerHTML = result;
  }

  toggleAddCategory(e) {
    e.preventDefault();
    categoryWrapper.classList.remove("hidden");
    toggleAddCategoryBtn.classList.add("hidden");
  }

  cancelAddCategory(e) {
    e.preventDefault();
    categoryWrapper.classList.add("hidden");
    toggleAddCategoryBtn.classList.remove("hidden");
  }
}

/* create new instance of category 
   in order not to 'new CategoryView' in other files every time, export it as follows */
export default new CategoryView();
