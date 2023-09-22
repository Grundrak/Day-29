const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());
app.set('view engine','ejs');
app.set('views','./views');
app.get('/', (req ,res) => {
    res.render('home',{ products: products })
})



let products = [
  { id: 1, name: "iPhone 12 Pro", price: 1099.99 },
  { id: 2, name: "Samsung Galaxy S21", price: 999.99 },
  { id: 3, name: "Sony PlayStation 5", price: 499.99 },
  { id: 4, name: "MacBook Pro 16", price: 2399.99 },
  { id: 5, name: "iPhone 12 Pro", price: 2500.99 },
  { id: 6, name: "DJI Mavic Air 2", price: 799.99 },
];
app.use((req,res,next) => {
  const crDate = new Date();
  const request = req.method;
  const url = req.originalUrl;
  console.log(` The request : ${request} \n Executed at : ${crDate} \n Whit Url :${url}`);
  next();
})


app.get("/products", (req, res) => {
  res.send(products);
});
app.get("/products/:id", (req, res) => {
  let product = products.find(
    (product) => product.id === parseInt(req.params.id)
  );
  if (product) {
    res.render('productDetails',{product : product});
  } else {
    res.status(404).send();
  }
});

app.get("/products/p/search", (req, res) => {
  const searchquery = req.query.q.toLowerCase();
  let minPrice = parseFloat(req.query.minPrice);
  let maxPrice = parseFloat(req.query.maxPrice);

  let product = products.filter(
    (item) =>
      item.name.toLowerCase().includes(searchquery) &&
      item.price >= minPrice &&
      item.price <= maxPrice
  );
  if (product.length > 0) {
    res.status(200).json(product);
  } else {
    res.sendStatus(404);
  }
});

app.post("/products", (req, res) => {
    const {name,price} = req.query
  const createproduct = {id : products.length++, name, price};
  products.push(createproduct);
  if (createproduct) {
    res.status(201).send("Done the product added");
  } else {
    res.status(400).send(); }
});
app.put("/products/:id", (req, res) => {
  const index = products.find((index) => index.id === parseInt(req.params.id));
  const update = req.body;
  if (index !== -1) {
    products[index] = { ...products[index], ...update };
    res.sendStatus(201);
  } else {
    res.sendStatus(404);
  }
});

app.delete("/products/:id", (req, res) => {
  let product = products.find(
    (product) => product.id === parseInt(req.params.id)
  );
  if (product !== -1) {
    products.splice(product, 1);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});
app.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});
