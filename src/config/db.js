export const name = 'koa_api_server';
export const username = process.env.PGUSER || 'root';
export const password = process.env.PGPASS || null;
export const envVariable = 'POSTGRES_DB_URL';

export default {
  name,
  username,
  password,
  envVariable
};
