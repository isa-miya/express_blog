/*
  Warnings:

  - You are about to drop the column `authroId` on the `Blog` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Blog` DROP FOREIGN KEY `Blog_authroId_fkey`;

-- AlterTable
ALTER TABLE `Blog` DROP COLUMN `authroId`,
    ADD COLUMN `authorId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Blog` ADD CONSTRAINT `Blog_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
