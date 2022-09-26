import knex from 'knex';

const setColumns = (table) => {
  table.increments('id');
  table.string('title');
  table.float('price');
  table.string('thumbnail');
  return table;
};

const createTable = async (option, tableName) => {
  const db = knex(option);
  try {
    await db.schema.createTable(tableName, (table) => setColumns(table));
    console.log(`Tabla "${tableName}" creada correctamente.`);
  } catch (error) {
    throw error;
  } finally {
    db.destroy();
  }
};

export default createTable;
