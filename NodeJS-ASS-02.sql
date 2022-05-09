/*Create New Schema on start up*/
DROP SCHEMA IF EXISTS `tcs_weather_api`;

CREATE SCHEMA `tcs_weather_api`;

use `tcs_weather_api`;
/*Create DB tables*/


DROP TABLE IF EXISTS `wind`;

CREATE TABLE `wind`(
	`id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`speed` DECIMAL(5, 2) DEFAULT NULL,
	`deg` INT DEFAULT NULL,
	`gust` DECIMAL(5, 2) DEFAULT NULL,
	PRIMARY KEY (`id`)
)ENGINE=InnoDB;

DROP TABLE IF EXISTS `temperature`;

CREATE TABLE `temperature`(
	`id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`temp` DECIMAL(5, 2) DEFAULT NULL,
	`feels_like` DECIMAL(5, 2) DEFAULT NULL,
	`temp_min` DECIMAL(5, 2) DEFAULT NULL,
	`temp_max` DECIMAL(5, 2) DEFAULT NULL,
	PRIMARY KEY(`id`)
)ENGINE=InnoDB;

DROP TABLE IF EXISTS `weather_detail`;

CREATE TABLE `weather_detail`(
	`id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`description` VARCHAR(128) DEFAULT NULL,
	`pressure` INT DEFAULT NULL,
	`humidity` INT DEFAULT NULL,
	`visibility` INT DEFAULT NULL,
	`temperature_id` INT(11) UNSIGNED DEFAULT NULL REFERENCES temperature (`id`),
	`wind_id` INT(11) UNSIGNED NOT NULL REFERENCES wind (`id`),
	 PRIMARY KEY (`id`)
)  ENGINE=INNODB;


DROP TABLE IF EXISTS `location`;

CREATE TABLE `location`(
	`id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`city` VARCHAR(28) DEFAULT NULL,
    `point` GEOMETRY DEFAULT NULL,
    `last_access` DATETIME DEFAULT NULL,
    `weather_detail_id` INT(11) UNSIGNED DEFAULT NULL,
     FOREIGN KEY (`weather_detail_id`) REFERENCES weather_detail(`id`)
     ON DELETE CASCADE ON UPDATE CASCADE,
     PRIMARY KEY(`id`)
)ENGINE=InnoDB;