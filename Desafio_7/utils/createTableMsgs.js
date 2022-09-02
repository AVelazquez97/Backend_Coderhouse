import knex from 'knex';
const createTable = (option, tableName) => {
  const db = knex(option);

  const setColumns = (table) => {
    table.increments('id');
    table.string('autor');
    table.string('msg');
    table.float('fyh');
  };

  (async () => {
    try {
      await db.schema.createTable(tableName, (table) => setColumns(table));
      console.log(`Tabla "${tableName}" creada correctamente.`);
    } catch (error) {
      throw error;
    } finally {
      db.destroy();
    }
  })();
};

export default createTable;
