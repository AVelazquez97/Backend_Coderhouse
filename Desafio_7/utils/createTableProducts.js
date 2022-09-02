import option from '../databases/configMariaDB.js';
import knex from 'knex';

const db = knex(option);

const setColumns = (table) => {
  table.increments('id');
  table.string('title');
  table.float('price');
  table.string('thumbnail');
};

const handleErrors = (error) => {
  if (error.code !== 'ER_TABLE_EXISTS_ERROR') {
    throw error;
  }
  console.log('La tabla que se está intentando crear ya existe.');
};

const newTable = async () => {
  try {
    await db.schema.createTable('products', (table) => setColumns(table));
    console.log('Tabla creada correctamente.');
  } catch (error) {
    handleErrors(error);
  } finally {
    db.destroy();
  }
};

newTable();
