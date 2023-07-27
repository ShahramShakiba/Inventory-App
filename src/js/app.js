/*==========$ import Categories & Products $========*/
import CategoryView from './CategoryView.js';
import ProductView from './ProductView.js';

document.addEventListener('DOMContentLoaded', () => {
  //-> setApp: call categories and products we made
  CategoryView.setApp();

  ProductView.setApp();

  //-> Add created categories and products options
  CategoryView.createCategoriesList();

  ProductView.createProductsList();
});
