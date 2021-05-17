import * as Knex from 'knex';

export async function up(knex: any): Promise<any> {
    await knex.schema.createTable('user', (table: any) => {
        table.uuid('id').primary();
        table.text('username').unique().notNullable();
        table.text('email').unique().notNullable();
        table.text('password').notNullable();
        table.text('firstname').notNullable();
        table.text('lastname').notNullable();
        table.text('bank_account').notNullable();
        table.text('account_number').notNullable();
        table.text('phone').nullable();
        table.text('address').nullable();
        table.boolean('is_verified').defaultTo(false);
    });

    await knex.schema.createTable('verification_token', (table: any) => {
        table.uuid('id').notNullable().primary();
        table.uuid('user_id').notNullable();
        table.string('token').notNullable();
        table.foreign('user_id').references('user.id').onDelete('CASCADE');
    });

    return await knex.schema.createTable(
        'donation_transaction',
        (table: any) => {
            table.uuid('id').primary();
            table.uuid('user_id').notNullable();
            table.string('donator').notNullable();
            table.text('condolence_word').notNullable();
            table.decimal('amount').notNullable();
            table.boolean('status').notNullable();
            table.foreign('user_id').references('user.id').onDelete('CASCADE');
        }
    );
}

export async function down(knex: any): Promise<any> {
    await knex.schema.dropTableIfExists('verification_token');
    await knex.schema.dropTableIfExists('user');
    return await knex.schema.dropTableIfExists('donation_transaction');
}
