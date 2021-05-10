import * as Knex from 'knex';

export async function up(knex: any): Promise<any> {
    await knex.schema.createTable('user', (table: any) => {
        table.uuid('id').primary();
        table.text('username').unique().notNullable();
        table.text('email').unique().notNullable();
        table.text('password').notNullable();
        table.text('firstname').notNullable();
        table.text('lastname').notNullable();
        table.text('phone').nullable();
        table.text('address').nullable();
        table.boolean('is_verified').defaultTo(false);
    });

    return await knex.schema.createTable('verification_token', (table: any) => {
        table.uuid('id').notNullable().primary();
        table.uuid('user_id').notNullable();
        table.string('token').notNullable();
        table.foreign('user_id').references('user.id').onDelete('CASCADE');
    });
}

export async function down(knex: any): Promise<any> {
    await knex.schema.dropTableIfExists('verification_token');
    return await knex.schema.dropTableIfExists('user');
}
