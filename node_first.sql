-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 31, 2022 at 03:03 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.0.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `node_first`
--

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `content` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `sender_id`, `receiver_id`, `content`, `created_at`) VALUES
(37, 82, 81, 'hello', '2022-10-29 07:16:14'),
(38, 81, 82, 'lafm quen nhe\n', '2022-10-29 07:16:49'),
(39, 82, 81, 'ok', '2022-10-29 07:17:13'),
(40, 82, 83, 'hello Qanh', '2022-10-29 07:21:44'),
(41, 83, 82, 'helo binh', '2022-10-29 07:21:56'),
(42, 83, 81, 'hi\n', '2022-10-29 07:29:04'),
(43, 83, 81, 'hello', '2022-10-29 07:29:35'),
(44, 81, 83, 'ukm', '2022-10-29 07:29:40'),
(45, 81, 82, 'ooi\n', '2022-10-31 01:56:32');

-- --------------------------------------------------------

--
-- Table structure for table `mysql_migrations_347ertt3e`
--

CREATE TABLE `mysql_migrations_347ertt3e` (
  `timestamp` varchar(254) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mysql_migrations_347ertt3e`
--

INSERT INTO `mysql_migrations_347ertt3e` (`timestamp`) VALUES
('1666414594002'),
('1666440938904'),
('1666578209343'),
('1666856034221'),
('1666939297883');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(225) NOT NULL,
  `email` varchar(225) NOT NULL,
  `img` varchar(225) DEFAULT NULL,
  `phone` varchar(225) DEFAULT NULL,
  `status` int(11) DEFAULT 0,
  `pass` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `img`, `phone`, `status`, `pass`) VALUES
(81, 'binh', 'binhnd@vgsholding.com', '57a6b024-36da-4f08-8b57-dea25b541539.png', '0961187214', 1, '$2b$10$etjFLZ2vxKOgimbZusYdAuvwmOFub8.V9HFqG2.f2ali7TCrHXaRe'),
(82, 'binh nguyen', 'binhndph15107@fpt.edu.vn', 'e9aa6750-3756-4a70-af46-c7c8e7985b74.png', '0348048435', 0, '$2b$10$EktswBZrfcRcyE/5PWxqTuRnp4zm7LGEDF9FUmFPZdaOlM1myv3gy'),
(83, 'Quynh ANh', 'qanh962k@gmail.com', '7f6daf73-61c4-4435-b6f7-d8510c786371.png', '0348048435', 0, '$2b$10$g6AeZa9K5ghTa3xgZthF1O8fAa4lT8BBMxQ29UVremuQlSNVGiE4u'),
(84, 'Duc binh', 'khangnd@vgsholding.com', 'd453f0f4-c51b-4f70-90d0-0285fb18f12b.png', '0961187214', 0, '$2b$10$qfEIF2ao0olErRR9bsKc3.bxhx2bS4WGypnKky1Hp9jxSdESvUBZi'),
(85, 'TUng nguyen', 'Tungnd@vgsholding.com', '5bd1871c-9a0e-4945-917d-eecaeb16c4e7.png', '0961187214', 0, '$2b$10$U6DXttb8PvXT2RUz4y68.uTNgfI0Hlg6gZAG6CZPfs5mjFuUe./p2'),
(86, 'Hoang', 'Hoangnd@vgsholding.com', 'f017d655-0415-4f4e-aabe-04d3acb7a8e3.png', '0961187214', 0, '$2b$10$u/CqkYJ8MvFo6duMi6d8bOLssx8ygvSn67ohZQl1G2NnA.5mo4ema');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `mysql_migrations_347ertt3e`
--
ALTER TABLE `mysql_migrations_347ertt3e`
  ADD UNIQUE KEY `timestamp` (`timestamp`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
