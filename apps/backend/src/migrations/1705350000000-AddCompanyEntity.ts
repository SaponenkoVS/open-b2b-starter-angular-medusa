import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AddCompanyEntity1705350000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "company",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "tax_id",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "address",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "city",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "country",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "postal_code",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "phone",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "email",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "is_active",
            type: "boolean",
            default: true,
          },
          {
            name: "created_at",
            type: "timestamp with time zone",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp with time zone",
            default: "now()",
          },
        ],
      }),
      true
    );

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_company_tax_id" ON "company" ("tax_id");
    `);

    await queryRunner.query(`
      ALTER TABLE "customer" ADD COLUMN IF NOT EXISTS "company_id" VARCHAR;
    `);

    await queryRunner.createForeignKey(
      "customer",
      new TableForeignKey({
        columnNames: ["company_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "company",
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("customer");
    const foreignKey = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("company_id") !== -1
    );
    
    if (foreignKey) {
      await queryRunner.dropForeignKey("customer", foreignKey);
    }

    await queryRunner.query(`
      ALTER TABLE "customer" DROP COLUMN IF EXISTS "company_id";
    `);

    await queryRunner.dropTable("company");
  }
}
