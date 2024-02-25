-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 25, 2024 at 07:33 PM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `noteshelena`
--

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `document_id` int(11) NOT NULL,
  `title` varchar(128) DEFAULT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `owner_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `documents`
--

INSERT INTO `documents` (`document_id`, `title`, `content`, `owner_id`, `created`) VALUES
(6, 'Sabaa Tahir - All my Rage', '<p>Cupcake ipsum dolor sit amet wafer dessert. Apple pie jelly-o apple pie toffee chocolate cake tart danish brownie. I love cheesecake biscuit cake chocolate I love topping toffee ice cream. Danish bonbon marzipan fruitcake I love oat cake. Chocolate powder apple pie jelly tart jujubes liquorice pudding. Oat cake croissant marshmallow I love cupcake shortbread. Jujubes sweet roll souffl&eacute; I love danish brownie.<br>Gingerbread chocolate bar I love cookie I love ice cream gummies caramels.&nbsp;</p>\n<p>&nbsp;</p>\n<p>Chocolate jujubes I love pudding I love topping chocolate cake. I love halvah gummies bear claw toffee souffl&eacute; marshmallow jelly. Sesame snaps jelly-o sweet biscuit sweet roll. Dessert cheesecake oat cake sweet fruitcake pastry toffee. I love jelly tootsie roll chocolate bar cotton candy chocolate bar candy canes.</p>', NULL, '2024-02-19 09:39:07'),
(8, 'Tracey Deonn - Bloodmarked', '<article class=\"review-article\">\n<p>Cupcake ipsum dolor sit amet wafer dessert. Apple pie jelly-o apple pie toffee chocolate cake tart danish brownie. I love cheesecake biscuit cake chocolate I love topping toffee ice cream. Danish bonbon marzipan fruitcake I love oat cake. Chocolate powder apple pie jelly tart jujubes liquorice pudding. Oat cake croissant marshmallow I love cupcake shortbread. Jujubes sweet roll souffl&eacute; I love danish brownie.<br>Gingerbread chocolate bar I love cookie I love ice cream gummies caramels.</p>\n<p>&nbsp;</p>\n<p>Chocolate jujubes I love pudding I love topping chocolate cake. I love halvah gummies bear claw toffee souffl&eacute; marshmallow jelly. Sesame snaps jelly-o sweet biscuit sweet roll. Dessert cheesecake oat cake sweet fruitcake pastry toffee. I love jelly tootsie roll chocolate bar cotton candy chocolate bar candy canes.</p>\n</article>', NULL, '2024-02-19 15:08:07'),
(9, 'Andy Weir - Project Hail Mary', '<article class=\"review-article\">\n<p>Cupcake ipsum dolor sit amet wafer dessert. Apple pie jelly-o apple pie toffee chocolate cake tart danish brownie. I love cheesecake biscuit cake chocolate I love topping toffee ice cream. Danish bonbon marzipan fruitcake I love oat cake. Chocolate powder apple pie jelly tart jujubes liquorice pudding. Oat cake croissant marshmallow I love cupcake shortbread. Jujubes sweet roll souffl&eacute; I love danish brownie.<br>Gingerbread chocolate bar I love cookie I love ice cream gummies caramels.</p>\n<p>&nbsp;</p>\n<p>Chocolate jujubes I love pudding I love topping chocolate cake. I love halvah gummies bear claw toffee souffl&eacute; marshmallow jelly. Sesame snaps jelly-o sweet biscuit sweet roll. Dessert cheesecake oat cake sweet fruitcake pastry toffee. I love jelly tootsie roll chocolate bar cotton candy chocolate bar candy canes.</p>\n</article>', NULL, '2024-02-19 15:49:04');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `userName` varchar(128) DEFAULT NULL,
  `userEmail` varchar(128) DEFAULT NULL,
  `userPassword` varchar(12) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `userName`, `userEmail`, `userPassword`, `created`) VALUES
(1, 'Helena89', 'Helena@gmail.com', 'test123', '2024-02-23 08:33:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`document_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `documents`
--
ALTER TABLE `documents`
  MODIFY `document_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=171;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
