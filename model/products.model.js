const { ObjectId } = require('mongodb');
const connect = require('./connect');

const insertProduct = async (name, quantity) => {
  const conn = await connect();
  
  const { insertedId } = await conn.collection('products')
    .insertOne({
      name,
      quantity,
    });
    
  return insertedId;
};

const findProductByName = async (name) => {
  const conn = await connect();
  const query = await conn.collection('products').findOne({ name });

  return query;
};

const findProducts = async () => {
  const conn = await connect();
  const query = await conn.collection('products').find().toArray();

  return query;
};

const findProductById = async (id) => {
  const conn = await connect();
  const query = await conn.collection('products').findOne({ _id: ObjectId(id) });

  return query;
};

const replaceProductById = async (id, name, quantity) => {
  const conn = await connect();
  const query = await conn.collection('products').replaceOne(
    {
      _id: ObjectId(id),
    },
    { 
      name,
      quantity,
    },
  );

  return query;
};

const deleteProduct = async (id) => {
  const conn = await connect();
  const query = await conn.collection('products').deleteOne({ _id: ObjectId(id) });

  return query;
};

module.exports = {
  insertProduct,
  findProductByName,
  findProducts,
  findProductById,
  replaceProductById,
  deleteProduct,
};
