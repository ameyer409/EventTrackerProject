-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema gametrackerdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `gametrackerdb` ;

-- -----------------------------------------------------
-- Schema gametrackerdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `gametrackerdb` DEFAULT CHARACTER SET utf8 ;
USE `gametrackerdb` ;

-- -----------------------------------------------------
-- Table `games`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `games` ;

CREATE TABLE IF NOT EXISTS `games` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `genre` VARCHAR(200) NOT NULL,
  `rating` VARCHAR(10) NOT NULL,
  `score` DECIMAL(2,1) NULL,
  `hall_of_fame` TINYINT(1) NOT NULL DEFAULT 0,
  `release_date` DATETIME NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_completed` DATETIME NULL,
  `game_description` TEXT NULL,
  `review_text` TEXT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS player@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'player'@'localhost' IDENTIFIED BY 'player';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'player'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `games`
-- -----------------------------------------------------
START TRANSACTION;
USE `gametrackerdb`;
INSERT INTO `games` (`id`, `name`, `genre`, `rating`, `score`, `hall_of_fame`, `release_date`, `created_at`, `updated_at`, `date_completed`, `game_description`, `review_text`) VALUES (1, 'World of Warcraft', 'MMORPG', 'T', 3.0, 1, '2004-11-23 0:00:00', DEFAULT, DEFAULT, NULL, 'placeholder', 'placeholder');

COMMIT;

