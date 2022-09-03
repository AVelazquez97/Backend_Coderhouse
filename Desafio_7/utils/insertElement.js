import knex from 'knex';

const insertNewElement = async (option, tableName, msgData) => {
  const db = knex(option);
  try {
    await db(tableName).insert(msgData);
  } catch (error) {
    throw error;
  } finally {
    db.destroy();
  }
};

export default insertNewElement;
