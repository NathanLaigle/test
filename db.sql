-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 27, 2021 at 02:34 PM
-- Server version: 5.7.26
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `test-pradeo`
--

-- --------------------------------------------------------

--
-- Table structure for table `Apps`
--

CREATE TABLE `Apps` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'unverified',
  `path` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserEmail` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Apps`
--

INSERT INTO `Apps` (`id`, `name`, `description`, `status`, `path`, `image`, `createdAt`, `updatedAt`, `UserEmail`) VALUES
(2, 'Molotov', 'Une façon radicalement nouvelle de regarder la télévision, maintenant depuis toute l\'Europe.', 'secured', '/uploads/Molotov.apk', '/uploads/appImages/molotov-icone.jpeg', '2021-07-24 18:16:59', '2021-07-24 18:17:00', 'nathan@test.com'),
(3, 'Wanna Kicks', 'Wanna Kicks est une application conçue pour essayer des baskets, où vous pouvez découvrir les nouveaux arrivages et les classiques grâce à la réalité augmentée.', 'threat detected', '/uploads/Wanna-Kicks.apk', '/uploads/appImages/wannaKiks.png', '2021-07-24 18:20:19', '2021-07-26 19:16:30', 'nathan@test.com'),
(4, 'Google Earth +', 'Google Earth est un logiciel développé par la société Google, permettant une visualisation de la Terre avec un assemblage de photographies aériennes ou satellitaires.', 'secured', '/uploads/Google-Earth.apk', '/uploads/appImages/05_project_facebook-001.jpeg', '2021-07-24 19:14:35', '2021-07-26 18:44:43', 'nathan@test.com'),
(5, 'France TV', 'france.tv est la plateforme de télévision de rattrapage et un service de vidéo à la demande de France Télévisions. Le site permet aussi de regarder l\'ensemble des chaines du groupe France Télévisions en direct.', 'secured', '/uploads/France-TV.apk', '/uploads/appImages/tvFrance.png', '2021-07-25 13:18:00', '2021-07-25 13:19:00', 'nathan@test.com');

-- --------------------------------------------------------

--
-- Table structure for table `Comments`
--

CREATE TABLE `Comments` (
  `id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserEmail` varchar(255) DEFAULT NULL,
  `AppId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Comments`
--

INSERT INTO `Comments` (`id`, `rating`, `title`, `content`, `createdAt`, `updatedAt`, `UserEmail`, `AppId`) VALUES
(1, 4, 'Nice app', 'This app is pretty cool, user experience is a real pleasure.', '2021-07-25 10:59:46', '2021-07-25 10:59:46', 'nathan@test.com', 3),
(2, 5, 'Woooo !', 'Works perfectly well !', '2021-07-25 11:43:12', '2021-07-25 11:43:12', 'nathan@test.com', 3),
(3, 5, 'Another Comment', NULL, '2021-07-25 12:49:51', '2021-07-25 12:49:51', 'nathan@test.com', 3),
(4, 5, 'Simple to use !', 'The best app i ever seen !', '2021-07-25 16:00:35', '2021-07-25 16:00:35', 'nathan@test.com', 3),
(5, 4, 'Great', 'nothing to add', '2021-07-25 16:01:50', '2021-07-25 16:01:50', 'nathan@test.com', 4),
(6, 5, 'Good to watch Soccer !', 'Replays and live are pleasant to watch.', '2021-07-25 16:06:45', '2021-07-25 16:06:45', 'nathan@test.com', 2),
(7, 5, 'Simple to use !', 'Quite good', '2021-07-25 18:23:16', '2021-07-25 18:23:16', 'nathan@test.com', 5),
(8, 5, 'Great', 'This is spartaaaaaaaaaaaaaaaaaaaa !', '2021-07-25 18:52:17', '2021-07-25 18:52:17', 'nathan@test.com', 2),
(9, 5, 'i\'m a test', 'ouh ! this is also a test', '2021-07-26 17:39:24', '2021-07-26 17:39:24', 'test@test.com', 3);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `email` varchar(255) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`email`, `pseudo`, `password`, `createdAt`, `updatedAt`) VALUES
('nathan@test.com', 'Nathy', '$2b$10$1fyjK.lUI6oHqLWvWAGkIO5xxalRhL90JuZW3cK9dY4LGVOlUP326', '2021-07-24 18:16:37', '2021-07-24 18:16:37'),
('nathanlaigle@gmail.com', 'jeSuiSUnPseudoTropLong', '$2b$10$sDZEOuUYe.pnNudaazH4g.FLk.171bz6dHb9dMV7Qkwb6yTyhEBJi', '2021-07-25 13:31:14', '2021-07-25 13:31:14'),
('test@test.com', 'test', '$2b$10$UkQm88agdwOWeiPvlOfsyeF0WRjtkEPj0jRB182nfjHBA/yjsaRei', '2021-07-26 17:38:56', '2021-07-26 17:38:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Apps`
--
ALTER TABLE `Apps`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `UserEmail` (`UserEmail`);

--
-- Indexes for table `Comments`
--
ALTER TABLE `Comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserEmail` (`UserEmail`),
  ADD KEY `AppId` (`AppId`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `pseudo` (`pseudo`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Apps`
--
ALTER TABLE `Apps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Comments`
--
ALTER TABLE `Comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Apps`
--
ALTER TABLE `Apps`
  ADD CONSTRAINT `apps_ibfk_1` FOREIGN KEY (`UserEmail`) REFERENCES `Users` (`email`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Comments`
--
ALTER TABLE `Comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`UserEmail`) REFERENCES `Users` (`email`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`AppId`) REFERENCES `Apps` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
