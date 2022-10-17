import knex from 'knex';

const insertNewElement = async (option, tableName, data) => {
  const db = knex(option);
  try {
    await db(tableName).insert(data);
  } catch (error) {
    throw error;
  } finally {
    db.destroy();
  }
};

export default insertNewElement;
