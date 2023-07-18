-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(14) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `role` ENUM('ROOT', 'ADMIN', 'CLIENT') NOT NULL DEFAULT 'CLIENT',
    `phoneNumber` VARCHAR(20) NULL,

    UNIQUE INDEX `user_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `housing_complex` (
    `id` VARCHAR(14) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `address` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `housing_complex_address_key`(`address`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `house` (
    `id` VARCHAR(14) NOT NULL,
    `userId` VARCHAR(14) NOT NULL,
    `housingComplexId` VARCHAR(14) NOT NULL,
    `houseNumber` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `house_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bills` (
    `id` VARCHAR(14) NOT NULL,
    `userId` VARCHAR(14) NOT NULL,
    `serviceId` VARCHAR(14) NOT NULL,
    `date` INTEGER NOT NULL,
    `dueDate` INTEGER NOT NULL,
    `status` ENUM('PAID', 'UNPAID') NOT NULL DEFAULT 'UNPAID',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service` (
    `id` VARCHAR(14) NOT NULL,
    `serviceTypeId` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(191) NULL,
    `price` FLOAT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `house` ADD CONSTRAINT `house_housingComplexId_fkey` FOREIGN KEY (`housingComplexId`) REFERENCES `housing_complex`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `house` ADD CONSTRAINT `house_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bills` ADD CONSTRAINT `bills_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bills` ADD CONSTRAINT `bills_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service` ADD CONSTRAINT `service_serviceTypeId_fkey` FOREIGN KEY (`serviceTypeId`) REFERENCES `service_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
