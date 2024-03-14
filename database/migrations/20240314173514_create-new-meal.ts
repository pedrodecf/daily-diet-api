import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meals', (table) => {
    table.increments('id').primary()
    table.uuid('userId').references('id').inTable('users')
    table.string('name').notNullable()
    table.string('description').notNullable()
    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.boolean('dietFood').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('meals')
}
