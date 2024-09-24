const listProducts = [
    {Id: 1, name: 'Suitcase 250', price: 50, stock: 4},
    {Id: 2, name: 'Suitcase 450', price: 100, stock: 10},
    {Id: 3, name: 'Suitcase 650', price: 350, stock: 2},
{Id: 4, name: 'Suitcase 1050', price: 550, stock: 5}
]

function getItemById(Id) {
    return listProducts.find(product => product.Id === Id );
}

import express from 'express';
import redis from 'redis';
import { promisify } from 'util';

const app = express();
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const PORT = 1245;

app.get('/list_products', (req, res) => {
    res.json(listProducts);
  });
  
  // Route to get product by ID
  app.get('/list_products/:itemId', async (req, res) => {
    const itemId = parseInt(req.params.itemId);
    const product = getItemById(itemId);
    if (!product) {
      return res.json({ status: 'Product not found' });
    }
    const reservedStock = await getAsync(`item.${itemId}`) || 0;
    res.json({
      ...product,
      currentQuantity: product.stock - reservedStock,
    });
  });
  
  // Route to reserve a product
  app.get('/reserve_product/:itemId', async (req, res) => {
    const itemId = parseInt(req.params.itemId);
    const product = getItemById(itemId);
    if (!product) {
      return res.json({ status: 'Product not found' });
    }
  
    const reservedStock = await getAsync(`item.${itemId}`) || 0;
    const currentStock = product.stock - reservedStock;
  
    if (currentStock <= 0) {
      return res.json({ status: 'Not enough stock available', itemId });
    }
  
    await setAsync(`item.${itemId}`, parseInt(reservedStock) + 1);
    res.json({ status: 'Reservation confirmed', itemId });
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
