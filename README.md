# Koa API Server

## Sequelize

To create a new migration, run
`npm run sequelize migration:create -- --name migration-name`

To start postgres, run `postgres -D /usr/local/var/postgres`

To create the database, run `createdb database_name`

To drop the database, run `dropdb database_name`

To run migrations, run `npm run sequelize db:migrate`

To undo migrations, run `npm run sequelize db:migrate:undo:all`

If you get `permission denied to create extension "btree_gist"` when migrating, run these commands:

```
psql -d database_name
psql> ALTER USER user WITH SUPERUSER;
```

If you get `ERROR: could not open extension control file "/usr/local/share/postgresql/extension/postgis.control"` when migrating, run:

```
brew install postgis;
```

## Logging

The server logs info level messages to the console, and records debug level to a log file.
All logs from the server are logged under the child logger `component: 'server'`

To filter the logs by some parameter, run something like
`tail logs/development-debug.log | node_modules/.bin/bunyan -c 'this.component == "server"'`

The logger can be accessed in a route through `ctx.app.logger`

## Error Handling

If you throw an error either using `throw` or `ctx.throw`, an internal server error will be
returned by the server. The error and the ctx will be logged using bunyan. To return error
responses for expected cases, set `ctx.state.error` to be an error object. Typically, this
will be an instance of a `restify-error`, and will result in an appropriate response being
created.

If you do throw an error, first wrap it in a VError since that gives better stack traces.

## Testing

To run the tests, use the npm scripts:

`npm run test`
`npm run test:unit`
`npm run test:integration`

## Debugging in Visual Studio Code

Right now I haven't managed to get attaching working. For now, you can run `npm run debug`
and run the launch configuration from VSCode. Unfortunately, you will have to restart the
VSCode part if you change any files for this to work.

## Weird Stuff

I had to add `require('babel-core/register');` to `node_modules/sequelize-cli/bin/sequelize`
and `node_modules/sequelize-cli/lib/gulpfile.js` to get it to work with es6 imports based
on https://github.com/sequelize/cli/issues/112.

In theory you don't need this, but you would have to change all the related files which use
es6 imports to use require instead, and at least for now I have opted to take this workaround
