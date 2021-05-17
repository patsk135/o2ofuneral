import * as Knex from 'knex';

export async function up(knex: any): Promise<void> {
    return await knex.schema.alterTable(
        'donation_transaction',
        (table: any) => {
            table.string('reference').unique().notNullable();
            table.boolean('status').defaultTo(false).alter();
        }
    );
}

export async function down(knex: any): Promise<void> {
    return await knex.schema.alterTable(
        'donation_transaction',
        (table: any) => {
            table.dropColumn('reference');
            table.boolean('status').notNullable().alter();
        }
    );
}
