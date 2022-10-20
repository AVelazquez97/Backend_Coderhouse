import knex from 'knex';

const readAllElements = async (option, tableName) => {
  const db = knex(option);
  try {
    const records = await db.from(tableName).select('*');
    return records;
  } catch (error) {
    throw error;
  } finally {
    db.destroy();
  }
};

export default readAllElements;
