import { Model, QueryContext } from 'objection';

type ModelDecorator = (
    ...args: any[]
) => <T extends { new (...args: any[]): Model }>(base: T) => T;

export const GenID: ModelDecorator =
    <T>(idGenerator: () => T) =>
    base =>
        class extends base {
            id!: T;
            $beforeInsert(ctx: QueryContext) {
                super.$beforeInsert(ctx);
                this.id = idGenerator();
            }
        };
