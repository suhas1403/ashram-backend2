module.exports = {
  stage_database: {
    client: 'postgresql',
    connection: {
      host: process.env.STAGE_DATABASE_HOST,
      port: process.env.DB_PORT,
      database: process.env.STAGE_DATABASE,
      user: process.env.STAGE_DATABASE_USER,
      password: process.env.STAGE_DATABASE_PASSWORD,
      ssl: { rejectUnauthorized: false },
      timezone: "ist"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production_database: {
    client: 'postgresql',
    connection: {
      host: process.env.DATABASE_HOST,
      port: process.env.DB_PORT,
      database: process.env.DATABASE,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      ssl: { rejectUnauthorized: false }
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
