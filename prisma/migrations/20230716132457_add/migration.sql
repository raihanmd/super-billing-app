/*
  Warnings:

  - You are about to drop the column `address` on the `housing_complex` table. All the data in the column will be lost.
  - Added the required column `kecamatan` to the `housing_complex` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kelurahan` to the `housing_complex` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `housing_complex_address_key` ON `housing_complex`;

-- AlterTable
ALTER TABLE `housing_complex` DROP COLUMN `address`,
    ADD COLUMN `kecamatan` VARCHAR(100) NOT NULL,
    ADD COLUMN `kelurahan` VARCHAR(100) NOT NULL;
