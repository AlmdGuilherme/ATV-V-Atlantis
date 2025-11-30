-- CreateTable
CREATE TABLE `Cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `nomeSocial` VARCHAR(100) NOT NULL,
    `dataNascimento` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dependente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `dataNascimento` DATETIME(3) NOT NULL,
    `cliente_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Endereco` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cliente_id` INTEGER NOT NULL,
    `rua` VARCHAR(100) NOT NULL,
    `numero` VARCHAR(10) NOT NULL,
    `complemento` VARCHAR(50) NULL,
    `bairro` VARCHAR(50) NOT NULL,
    `cidade` VARCHAR(50) NOT NULL,
    `estado` VARCHAR(2) NOT NULL,
    `cep` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `Endereco_cliente_id_key`(`cliente_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Documento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` ENUM('RG', 'CPF', 'Passaporte') NOT NULL,
    `numero` VARCHAR(14) NOT NULL,
    `dataEmissao` DATETIME(3) NOT NULL,
    `cliente_id` INTEGER NULL,
    `dependente_id` INTEGER NULL,

    UNIQUE INDEX `Documento_cliente_id_key`(`cliente_id`),
    UNIQUE INDEX `Documento_dependente_id_key`(`dependente_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Acomodacoes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `descricao` TEXT NOT NULL,
    `camaSolteiro` INTEGER NOT NULL,
    `camaCasal` INTEGER NOT NULL,
    `suites` INTEGER NOT NULL,
    `garagem` INTEGER NOT NULL,
    `climatizacao` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hospedagem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dataCheckin` DATETIME(3) NOT NULL,
    `dataCheckout` DATETIME(3) NOT NULL,
    `status` ENUM('reservado', 'ocupado', 'disponivel') NOT NULL DEFAULT 'reservado',
    `cliente_id` INTEGER NOT NULL,
    `acomodacao_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Dependente` ADD CONSTRAINT `Dependente_cliente_id_fkey` FOREIGN KEY (`cliente_id`) REFERENCES `Cliente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_cliente_id_fkey` FOREIGN KEY (`cliente_id`) REFERENCES `Cliente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Documento` ADD CONSTRAINT `Documento_cliente_id_fkey` FOREIGN KEY (`cliente_id`) REFERENCES `Cliente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Documento` ADD CONSTRAINT `Documento_dependente_id_fkey` FOREIGN KEY (`dependente_id`) REFERENCES `Dependente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hospedagem` ADD CONSTRAINT `Hospedagem_cliente_id_fkey` FOREIGN KEY (`cliente_id`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hospedagem` ADD CONSTRAINT `Hospedagem_acomodacao_id_fkey` FOREIGN KEY (`acomodacao_id`) REFERENCES `Acomodacoes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
