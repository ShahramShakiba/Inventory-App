import CategoryView from "./CategoryView.js";
import ProductView from "./ProductView.js";

document.addEventListener("DOMContentLoaded", () => {
  // setApp -> fill categories
  CategoryView.setApp();
  ProductView.setApp(ProductView);
  //   console.log(CategoryView);

  // use these categories : create categories option
  CategoryView.createCategoriesList(CategoryView.categories);
  ProductView.createProductsList(ProductView.products);
});
