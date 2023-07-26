const products = [
  {
    id: 1,
    title: "React.JS",
    category: "Frontend",
    createdAt: "2023-03-30T12:28:00.411Z",
  },
  {
    id: 2,
    title: "Node.JS",
    category: "Backend",
    createdAt: "2023-03-30T12:30:00.556Z",
  },
  {
    id: 3,
    title: "Vue.JS",
    category: "Frontend",
    createdAt: "2023-03-30T12:32:00.889Z",
  },
];

const categories = [
  {
    id: 1,
    title: "Frontend",
    description: "Frontend of Applications",
    createdAt: "2023-03-30T12:32:00.889Z",
  },
  {
    id: 2,
    title: "Backend",
    description: "The Backend of Applications",
    createdAt: "2023-02-30T12:32:00.889Z",
  },
];

export default class Storage {
  // add new category
  // save category
  // getAllCategories

  static getAllCategories() {
    /* products, category => where/save -> localStorage browser -> how to get them: 
       the data are stored as 'strings', so they must be converted into understandable data
       with the help of: 
    */
    const savedCategories = JSON.parse(localStorage.getItem("category")) || [];

    // descending sort -> sort based on the latest data
    const sortedCategories = savedCategories.sort((a, b) => {
      // converted into understandable Date :
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    });
    return sortedCategories;
  }

  static saveCategories(categoryToSave) {
    const savedCategories = Storage.getAllCategories();
    // category edit -> ... then save
    // category new -> ... then save
    const existedItem = savedCategories.find((c) => c.id === categoryToSave.id);
    if (existedItem) {
      // edit
      existedItem.title = categoryToSave.title;
      existedItem.description = categoryToSave.description;
    } else {
      // new
      //                 new Date().getTime() -> it's a time stamp
      categoryToSave.id = new Date().getTime();
      categoryToSave.createdAt = new Date().toISOString();
      //                        new Date().toISOString() -> date in th backend stored in this way
      // add another object
      savedCategories.push(categoryToSave);
    }

    localStorage.setItem("category", JSON.stringify(savedCategories));
    // -> category is an array so we need to converted to string
  }

  // products method are as same as categories method
  static getAllProducts(sort = "newest") {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];

    return savedProducts.sort((a, b) => {
      if (sort === "newest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
      } else if (sort === "oldest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
      }
    });
  }

  static saveProducts(productToSave) {
    const savedProducts = Storage.getAllProducts();

    const existedItem = savedProducts.find((c) => c.id === productToSave.id);
    if (existedItem) {
      // edit
      existedItem.title = productToSave.title;
      existedItem.quantity = productToSave.quantity;
      existedItem.category = productToSave.category;
    } else {
      // new
      productToSave.id = new Date().getTime();
      productToSave.createdAt = new Date().toISOString();

      savedProducts.push(productToSave);
    }

    localStorage.setItem("products", JSON.stringify(savedProducts));
  }

  static deleteProduct(id) {
    const savedProducts = Storage.getAllProducts();
    const filteredProducts = savedProducts.filter((p) => p.id !== parseInt(id));

    localStorage.setItem("products", JSON.stringify(filteredProducts));
  }
}
