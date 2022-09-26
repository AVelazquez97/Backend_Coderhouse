import knex from 'knex';

const setColumns = (table) => {
  table.increments('id');
  table.string("email");
  table.string("name");
  table.string("lastname");
  table.integer("age");
  table.string("nick");
  table.string("avatar");
  table.string("msg");
  table.timestamp('fyh');
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
