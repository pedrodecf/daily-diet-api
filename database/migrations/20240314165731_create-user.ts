import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user', (table) => {
    table.uuid('id').primary().unique()
    table.string('name').notNullable()
    table.string('username').notNullable().unique()
    table.string('email').notNullable().unique()
    table.string('password').notNullable()
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user')
}
