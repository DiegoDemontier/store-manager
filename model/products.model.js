const { ObjectId } = require('mongodb');
const connect = require('./connect');

const findProducts = async () => {
  const conn = await connect();
  const query = await conn.collection('products').find().toArray();

  return query;
};

const findProductByName = async (name) => {
  const conn = await connect();
  const query = await conn.collection('products').findOne({ name });

  return query;
};

const findProductById = async (id) => {
  const conn = await connect();
  const query = await conn.collection('products').findOne({ _id: ObjectId(id) });
  console.log(query);

  return query;
};

const insertProduct = async (name, quantity) => {
  const conn = await connect();
  
  const { insertedId } = await conn.collection('products')
    .insertOne({
      name,
      quantity,
    });
    
  return insertedId;
};

module.exports = {
  findProducts,
  findProductByName,
  findProductById,
  insertProduct,
};
