-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 17 août 2021 à 08:11
-- Version du serveur :  8.0.21
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `id_comment` int(11) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_post` int NOT NULL,
  `comment` text NOT NULL,
  `date_comment` text NOT NULL,
  PRIMARY KEY (`id_comment`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `comment`
--

INSERT INTO `comment` (`id_comment`, `id_user`, `id_post`, `comment`, `date_comment`) VALUES
(00000000042, 66, 124, 'Au top la star !\n', '2021-08-15 09:45:00'),
(00000000048, 66, 112, 'trop bonne cette sauce !', '2021-08-15 09:48:00'),
(00000000064, 69, 124, 'pas moi', '2021-08-15 15:28:00'),
(00000000075, 69, 141, 'Whou trop la classe !', '15/08/2021 à 18h16min'),
(00000000076, 66, 142, 'Ils sont tous les deux des grandes icones ', '15/08/2021 à 18h18min'),
(00000000077, 66, 142, 'De musique !', '15/08/2021 à 18h18min'),
(00000000079, 67, 142, 'J\'adore comme le tabasco ', '15/08/2021 à 18h21min'),
(00000000080, 67, 141, 'J\'adore !', '16/08/2021 à 11h14min');

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE IF NOT EXISTS `likes` (
  `id_user` int NOT NULL,
  `id_post` int NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_post` (`id_post`)
) ENGINE=InnoDB AUTO_INCREMENT=181 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`id_user`, `id_post`, `id`, `type`) VALUES
(69, 141, 176, 'heart'),
(66, 142, 177, 'laugh'),
(66, 141, 178, 'like'),
(67, 142, 179, 'laugh'),
(67, 141, 180, 'like');

-- --------------------------------------------------------

--
-- Structure de la table `post`
--

DROP TABLE IF EXISTS `post`;
CREATE TABLE IF NOT EXISTS `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `content` text,
  `image` varchar(255) DEFAULT NULL,
  `date` text,
  `status` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `post`
--

INSERT INTO `post` (`id`, `id_user`, `content`, `image`, `date`, `status`) VALUES
(141, 69, 'J\'ai vu ma plus grande star hier soir ! ', 'http://localhost:3000/images/abaca_150924_17.jpg1629043573047.jpg', '15/08/2021 à 18h 6min', 1),
(142, 66, 'Moi aussi ;)', 'http://localhost:3000/images/michael-jackson.jpeg1629044268185.jpg', '15/08/2021 à 18h17min', 1);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `admin` char(1) NOT NULL DEFAULT 'N',
  PRIMARY KEY (`id_user`) USING BTREE,
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id_user`, `name`, `email`, `password`, `admin`) VALUES
(66, 'LouisTest', 'LouisTest@hotmail.fr', '$2b$10$8CrKhSfRaqPSoJl4UPand.wtbnONasbpuzgRFUQz.2rP90OW1.rVO', 'N'),
(67, 'LouisTest1', 'LouisTest1@hotmail.fr', '$2b$10$uXjm8XNLlx5rZsLpcjWLp.S26lyxtISm/Z1IWhlMt4K8TIVKatIBu', 'N'),
(68, 'LouisTest2', 'LouisTest2@hotmail.fr', '$2b$10$/IFKfTD9Pgl8ypAuGovfZu1joucwivOVH7i2Uw0OkmJFFJPhrbgYW', 'N'),
(69, 'Admin', 'Admin@hotmail.fr', '$2b$10$Hk9HySqrtnIHtp/wxm/tau2h26yl7DvJwPEWPrHwngkns5gjfFisy', 'Y');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`id_post`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
