import * as Knex from 'knex';

export async function up(knex: any): Promise<void> {
    return await knex.schema.createTable('withdraw_request', (table: any) => {
        table.uuid('id').primary();
        table.uuid('user_id').unique().notNullable();
        table.boolean('is_paid').notNullable().defaultTo(false);
        table.foreign('user_id').references('user.id').onDelete('CASCADE');
    });
}

export async function down(knex: any): Promise<void> {
    return await knex.schema.dropTableIfExists('withdraw_request');
}
