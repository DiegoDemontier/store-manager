const { ObjectId } = require('mongodb');
const connect = require('./connect');

const insertSale = async (itensSold) => {
  const conn = await connect();
  const { insertedId } = await conn.collection('sales').insertOne({ 
    itensSold,
  });

  return insertedId;
};

const findSales = async () => {
  const conn = await connect();
  const query = await conn.collection('sales').find().toArray();

  return query;
};

const findSaleById = async (id) => {
  const conn = await connect();
  const query = await conn.collection('sales').findOne({ _id: ObjectId(id) });

  return query;
};

const replaceSaleById = async (id, itensSold) => {
  const conn = await connect();
  const query = await conn.collection('sales').replaceOne(
    {
      _id: ObjectId(id),
    },
    { 
      itensSold,
    },
  );

  return query;
};

const deleteSale = async (id) => {
  const conn = await connect();
  const query = await conn.collection('sales').deleteOne({ _id: ObjectId(id) });

  return query;
};

module.exports = {
  insertSale,
  findSales,
  findSaleById,
  replaceSaleById,
  deleteSale,
};
