import * as Knex from 'knex';

export async function up(knex: any): Promise<void> {
    return await knex.schema.createTable('ceremony_detail', (table: any) => {
        table.uuid('id').primary();
        table.uuid('user_id').notNullable();
        table.text('name').notNullable();
        table.text('lastname').notNullable();
        table.dateTime('startDate').notNullable();
        table.dateTime('endDate').notNullable();
        table.text('location').notNullable();
        table.text('description').notNullable();
        table.foreign('user_id').references('user.id').onDelete('CASCADE');
    });
}

export async function down(knex: any): Promise<void> {
    return await knex.schema.dropTableIfExists('ceremony_detail');
}
