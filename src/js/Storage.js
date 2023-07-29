/*=============$ Products $=============*/
// const products = [
//   {
//     id: 1,
//     title: 'React.JS',
//     category: 'Frontend',
//     createdAt: '2023-03-30T12:28:00.411Z',
//   },

//   {
//     id: 2,
//     title: 'Node.JS',
//     category: 'Backend',
//     createdAt: '2023-03-30T12:30:00.556Z',
//   },

//   {
//     id: 3,
//     title: 'Vue.JS',
//     category: 'Frontend',
//     createdAt: '2023-03-30T12:32:00.889Z',
//   },
// ];

/*=============$ Categories $=============*/
// const categories = [
//   {
//     id: 1,
//     title: 'Frontend',
//     description: 'The Frontend of Application',
//     createdAt: '2023-03-30T12:32:00.889Z',
//   },

//   {
//     id: 2,
//     title: 'Backend',
//     description: 'The Backend of Application',
//     createdAt: '2023-02-30T12:32:00.889Z',
//   },
// ];

export default class Storage {
  //products, category => save or get -> localStorage browser

  //========> Get All Categories <=========
  static getAllCategories() {
    const savedCategories = JSON.parse(localStorage.getItem('category')) || [];

    //-> descending sort: sort based on the latest data
    const sortedCategories = savedCategories.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    });

    return sortedCategories;
  }

  //==========> Save categories <===========
  static saveCategories(category) {
    //-> get all categories
    const savedCategories = Storage.getAllCategories();

    const existedItem = savedCategories.find((c) => c.id === category.id);

    if (existedItem) {
      //-> edit category: ... then save
      existedItem.title = category.title;
      existedItem.description = category.description;
    } else {
      //-> new category: ... then save
      category.id = new Date().getTime();
      category.createdAt = new Date().toISOString();
    
      //update categories 
      savedCategories.push(category);
    }

    localStorage.setItem('category', JSON.stringify(savedCategories));
  }

  //==========> Get All Products <==========
  static getAllProducts(sort = 'newest') {
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];

    return savedProducts.sort((a, b) => {
      if (sort === 'newest') {
        //-> descending sort
        return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
      } else if (sort === 'oldest') {
        //-> ascending sort 
        return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
      }
    });
  }

  //==========> Save Products <=============
  static saveProducts(product) {
    const savedProducts = Storage.getAllProducts();

    const existedItem = savedProducts.find((c) => c.id === product.id);
    if (existedItem) {
      //-> edit products
      existedItem.title = product.title;
      existedItem.quantity = product.quantity;
      existedItem.category = product.category;
    } else {
      //-> new products
      product.id = new Date().getTime();
      product.createdAt = new Date().toISOString();

      //update products 
      savedProducts.push(product);
    }

    localStorage.setItem('products', JSON.stringify(savedProducts));
  }

  //==========> Delete Products <===========
  static deleteProduct(id) {
    //-> Get all products 
    const savedProducts = Storage.getAllProducts();

    const filteredProducts = savedProducts.filter((p) => p.id !== parseInt(id));

    localStorage.setItem('products', JSON.stringify(filteredProducts));
  }
}
