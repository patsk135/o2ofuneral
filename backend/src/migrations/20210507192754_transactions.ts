import * as Knex from 'knex';

export async function up(knex: any): Promise<void> {
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

export async function down(knex: any): Promise<void> {
    return await knex.schema.dropTableIfExists('donation_transaction');
}
