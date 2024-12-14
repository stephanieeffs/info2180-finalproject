DROP DATABASE IF EXISTS dolphin_crm;
CREATE DATABASE dolphin_crm;
USE dolphin_crm;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id` int(11) NOT NULL auto_increment,
    `firstname` VARCHAR(250) NOT NULL,
    `lastname` VARCHAR(250) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `role` ENUM('Admin', 'User') NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (`id`)
);

INSERT INTO `users` (`id`, `firstname`, `lastname`, `password`, `email`, `role`, `created_at`) VALUES
(2, 'Admin', 'Project', '$2y$10$RpUYkS5zi/Z/caRn9F7n.eCT1EtQD7C2Szpm8Mun.tR8J3aCkg4dG', 'admin@project2.com', 'Admin', '2022-12-07 06:40:17');

DROP TABLE IF EXISTS `contacts`;
CREATE TABLE `contacts` (
    `id` int(11) NOT NULL auto_increment,
    `title` VARCHAR(50) NOT NULL,
    `firstname` VARCHAR(250) NOT NULL,
    `lastname` VARCHAR(250) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `telephone` VARCHAR(15) NOT NULL,
    `company` VARCHAR(250) NOT NULL,
    `type` VARCHAR(15) NOT NULL,
    `assigned_to` int(11) NOT NULL,
    `created_by` int(11) NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (`id`),
FOREIGN KEY (`assigned_to`) REFERENCES `users`(`id`),
FOREIGN KEY (`created_by`) REFERENCES `users`(`id`)
);

DROP TABLE IF EXISTS `notes`;
CREATE TABLE `notes`(
    `id` int(11) NOT NULL auto_increment,
    `contact_id` int(11) NOT NULL,
    `comment` TEXT NOT NULL,
    `created_by` int(11) NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (`id`),
FOREIGN KEY (`contact_id`) REFERENCES `contacts`(`id`),
FOREIGN KEY (`created_by`) REFERENCES `users`(`id`)
);
