/*
  Warnings:

  - You are about to drop the column `dependente_id` on the `documento` table. All the data in the column will be lost.
  - You are about to drop the `dependente` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `dependente` DROP FOREIGN KEY `Dependente_cliente_id_fkey`;

-- DropForeignKey
ALTER TABLE `documento` DROP FOREIGN KEY `Documento_dependente_id_fkey`;

-- AlterTable
ALTER TABLE `cliente` ADD COLUMN `responsavel_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `documento` DROP COLUMN `dependente_id`;

-- DropTable
DROP TABLE `dependente`;

-- AddForeignKey
ALTER TABLE `Cliente` ADD CONSTRAINT `Cliente_responsavel_id_fkey` FOREIGN KEY (`responsavel_id`) REFERENCES `Cliente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
