-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 09 Sep 2021 pada 18.00
-- Versi server: 10.4.17-MariaDB
-- Versi PHP: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `minggu-13`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `forgot_request`
--

CREATE TABLE `forgot_request` (
  `id` int(11) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `forgot_request`
--

INSERT INTO `forgot_request` (`id`, `code`, `user_id`, `created_at`, `updated_at`) VALUES
(1, '3477', 1, '2021-09-09 21:43:39', NULL),
(2, '4333', 1, '2021-09-09 21:46:01', NULL),
(3, '2058', 1, '2021-09-09 21:59:30', NULL),
(4, '6838', 1, '2021-09-09 21:59:51', NULL),
(5, '0131', 1, '2021-09-09 22:00:35', NULL),
(8, '7604', 1, '2021-09-09 23:00:11', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `number` varchar(255) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `number`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'typescript', NULL, 'ts@gmail.com', '$2b$10$qDH3D/1hf9X8fXEEFQPh6Of0f9B/bkqc16j/N6s9qmD9Gb3NG2m1q', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'typescript2', '085798736188', 'ts2@gmail.com', '$2b$10$H.Qtc3vuMhfjP.OQdULYs.3qPpSh6TX.FZbyDrNwH6eA9p9h4QXmO', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'typescript2', '085794564', 'ts2345345@gmail.com', '$2b$10$wK2TU6cP7ovN8.3rnnzlQer6gwGOpozubB7o2mfdbYleznIrrhz8e', '2021-09-09 22:51:12', NULL),
(4, 'typescript2', '085794564', 'ts2345345@gmail', '$2b$10$N.WQKj7kHyDnYHJbeSSRD.MbGBGgxXQ.5T8s5jODGcxxNf8x7bdMi', '2021-09-09 22:58:21', NULL),
(5, 'typescript2', '085794564', 'ts2345345@gmaildd', '$2b$10$wusLcq4MTBo1u79NDJ8h3OkCmTzMMvpDXlw7Ht8Xi5AiLJZPwv5Mm', '2021-09-09 22:58:29', NULL);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `forgot_request`
--
ALTER TABLE `forgot_request`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `forgot_request`
--
ALTER TABLE `forgot_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
