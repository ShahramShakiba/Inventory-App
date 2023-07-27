/*==========$ import Categories & Products $========*/
import CategoryView from './CategoryView.js';
import ProductView from './ProductView.js';

document.addEventListener('DOMContentLoaded', () => {
  //-> setApp: call categories we made
  CategoryView.setCategory();

  //-> Create categories options 
  CategoryView.createCategoriesList(CategoryView.categories);

  ProductView.setCategory(ProductView);
  ProductView.createProductsList(ProductView.products);
});
