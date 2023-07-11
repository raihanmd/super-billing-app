-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(14) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `role` ENUM('ADMIN', 'CLIENT') NOT NULL DEFAULT 'CLIENT',

    UNIQUE INDEX `user_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `housing_complex` (
    `id` VARCHAR(14) NOT NULL,
    `userId` VARCHAR(14) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `address` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `housing_complex_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bill_type` (
    `id` VARCHAR(14) NOT NULL,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bills` (
    `id` VARCHAR(14) NOT NULL,
    `userId` VARCHAR(14) NOT NULL,
    `typeId` VARCHAR(191) NOT NULL,
    `date` INTEGER NOT NULL,
    `total` FLOAT NOT NULL,
    `status` ENUM('PAID', 'UNPAID') NOT NULL DEFAULT 'UNPAID',

    UNIQUE INDEX `bills_typeId_key`(`typeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `housing_complex` ADD CONSTRAINT `housing_complex_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bills` ADD CONSTRAINT `bills_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bills` ADD CONSTRAINT `bills_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `bill_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
