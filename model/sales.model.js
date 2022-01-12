const connect = require('./connect');

const insertSale = async (itensSold) => {
  const conn = await connect();
  const { insertedId } = await conn.collection('products').insertOne({ 
    itensSold,
  });

  return insertedId;
};

module.exports = {
  insertSale,
};
