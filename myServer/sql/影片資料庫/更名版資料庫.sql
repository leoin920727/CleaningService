-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- 主機： localhost:3306
-- 產生時間： 2023-09-25 07:10:08
-- 伺服器版本： 5.7.24
-- PHP 版本： 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫: `cleaning_services`
--
CREATE DATABASE IF NOT EXISTS `cleaning_services` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `cleaning_services`;

-- --------------------------------------------------------

--
-- 資料表結構 `adreessdist`
--

CREATE TABLE `adreessdist` (
  `dist` varchar(5) NOT NULL,
  `v` varchar(30) NOT NULL,
  `A_I` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 資料表新增資料前，先清除舊資料 `adreessdist`
--

TRUNCATE TABLE `adreessdist`;
--
-- 傾印資料表的資料 `adreessdist`
--

INSERT INTO `adreessdist` (`dist`, `v`, `A_I`) VALUES
('中區', 'Central', 1),
('北區', 'North', 2),
('南區', 'South', 3),
('西區', 'West', 4),
('東區', 'Eastern', 5),
('北屯區', 'Beitun', 6),
('南屯區', 'Nantun', 7),
('西屯區', 'Xitun', 8),
('豐原區', 'Fengyuan', 9),
('大里區', 'Dali', 10),
('太平區', 'Taiping', 11),
('烏日區', 'Uri', 12),
('大雅區', 'Daya', 13),
('潭子區', 'Tanzi', 14),
('新社區', 'Xinshe', 15),
('神岡區', 'Shengang', 16),
('龍井區', 'Longjing', 17),
('沙鹿區', 'Shalu', 18);

-- --------------------------------------------------------

--
-- 資料表結構 `attendance`
--

CREATE TABLE `attendance` (
  `oruid` int(11) NOT NULL,
  `employeeid` varchar(5) NOT NULL,
  `mode` int(1) NOT NULL,
  `time` int(1) NOT NULL,
  `date` date NOT NULL,
  `ornumber` varchar(10) NOT NULL,
  `donetime` timestamp NULL DEFAULT NULL,
  `orderphoto` varchar(1500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 資料表新增資料前，先清除舊資料 `attendance`
--

TRUNCATE TABLE `attendance`;
-- --------------------------------------------------------

--
-- 資料表結構 `blacklist`
--

CREATE TABLE `blacklist` (
  `userid` varchar(8) NOT NULL,
  `whyblacklist` varchar(100) NOT NULL DEFAULT '未說明',
  `blacktime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 資料表新增資料前，先清除舊資料 `blacklist`
--

TRUNCATE TABLE `blacklist`;
-- --------------------------------------------------------

--
-- 資料表結構 `employeeinfo`
--

CREATE TABLE `employeeinfo` (
  `employeeid` varchar(5) NOT NULL,
  `employeename` varchar(20) NOT NULL,
  `employeephone` varchar(10) NOT NULL,
  `employeeemail` varchar(50) NOT NULL,
  `photo` varchar(300) DEFAULT NULL,
  `vaccine` int(1) NOT NULL,
  `goodid` int(1) NOT NULL,
  `racheck` int(1) NOT NULL,
  `cases` int(5) NOT NULL DEFAULT '0',
  `employeepw` varchar(50) NOT NULL,
  `employeeidnumber` varchar(10) NOT NULL,
  `employeebirthday` date NOT NULL,
  `empcity` varchar(10) NOT NULL DEFAULT '臺中市',
  `emprural` varchar(10) NOT NULL,
  `empaddress` varchar(50) NOT NULL,
  `admin` int(1) NOT NULL DEFAULT '2',
  `employeetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 資料表新增資料前，先清除舊資料 `employeeinfo`
--

TRUNCATE TABLE `employeeinfo`;
--
-- 傾印資料表的資料 `employeeinfo`
--

INSERT INTO `employeeinfo` (`employeeid`, `employeename`, `employeephone`, `employeeemail`, `photo`, `vaccine`, `goodid`, `racheck`, `cases`, `employeepw`, `employeeidnumber`, `employeebirthday`, `empcity`, `emprural`, `empaddress`, `admin`, `employeetime`) VALUES
('RA001', '鍾炘均', '0972840742', 'donald4276@hotmail.com', '/images/cleaner1.jpg', 1, 1, 1, 7, '0a287bd7a986786eacde10abb90d5c3d', 'V130563555', '1997-09-09', '臺中市', '太平區', '永豐路30號', 2, '2023-09-17 17:37:03'),
('RA002', '陳宥臻', '0934570939', 'pablo8236@gmail.com', '/images/cleaner2.jpg', 1, 1, 1, 4, '64d6e178bf45ec5ca10a3a912825d9a0', 'S170185443', '2009-05-07', '臺中市', '西屯區', '福中七街8號', 2, '2023-09-17 17:38:22'),
('RA003', '張瀚文', '0961441052', 'murphy9136@yahoo.com', '/images/cleaner3.jpg', 1, 1, 1, 4, '7198074d3cd634ad6a292ff620ec6e69', 'L238073686', '1973-05-02', '臺中市', '西區', '忠信街21號', 2, '2023-09-17 17:39:39'),
('RA004', '盧坤邑', '0912371835', 'kaylynn5375@gmail.com', '/images/cleaner4.jpg', 1, 1, 1, 5, 'c05419d8a89e1cab13968f44b43eeb56', 'Q224242435', '1982-03-07', '臺中市', '西屯區', '朝富二街20號', 2, '2023-09-17 17:40:37'),
('RA005', '林正秉', '0989838704', 'robinson9577@icloud.com', '/images/case-002.png', 1, 1, 1, 5, 'cbac75a3c747856be663cd989ec0f20e', 'B165385857', '2007-06-27', '臺中市', '大里區', '仁化工三路23號', 2, '2023-09-17 17:41:34'),
('RA006', '許雅婷', '0935607450', 'carly9986@yahoo.com', '/images/case-001.png', 1, 1, 1, 6, '356a078dcea834865abbfecb3274ca84', 'B292234890', '2010-06-18', '臺中市', '北區', '天津一街15號', 2, '2023-09-17 17:42:22');

-- --------------------------------------------------------

--
-- 資料表結構 `evaluate`
--

CREATE TABLE `evaluate` (
  `ornumber` varchar(10) NOT NULL,
  `employeeid` varchar(5) NOT NULL,
  `efficiency` int(11) DEFAULT NULL,
  `clean` int(11) DEFAULT NULL,
  `careful` int(11) DEFAULT NULL,
  `manner` int(11) DEFAULT NULL,
  `reply` varchar(100) DEFAULT NULL,
  `state` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 資料表新增資料前，先清除舊資料 `evaluate`
--

TRUNCATE TABLE `evaluate`;
--
-- 傾印資料表的資料 `evaluate`
--

INSERT INTO `evaluate` (`ornumber`, `employeeid`, `efficiency`, `clean`, `careful`, `manner`, `reply`, `state`) VALUES
('23091809IE', 'RA002', 4, 3, 3, 5, '非常好的服務!', 2),
('23091809QY', 'RA005', 2, 3, 2, 3, '服務員很細心', 2),
('23091809TU', 'RA001', 3, 4, 3, 3, '打掃非常乾淨~', 2),
('23091809ZH', 'RA003', 5, 3, 5, 3, '動作效率高!', 2),
('23091810NA', 'RA006', 5, 5, 5, 5, '最棒的清潔員', 2),
('23091810XU', 'RA004', 4, 5, 4, 5, '非常棒!', 2);

-- --------------------------------------------------------

--
-- 資料表結構 `orderlist`
--

CREATE TABLE `orderlist` (
  `ornumber` varchar(10) NOT NULL,
  `orphone` varchar(10) NOT NULL,
  `oremail` varchar(50) NOT NULL,
  `orcity` varchar(10) NOT NULL,
  `orrural` varchar(10) NOT NULL,
  `oraddress` varchar(50) NOT NULL,
  `userid` varchar(8) NOT NULL,
  `orname` varchar(20) NOT NULL,
  `money` int(7) NOT NULL,
  `pay` varchar(1) NOT NULL,
  `ordertime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `orderdone` datetime DEFAULT NULL,
  `state` int(2) NOT NULL,
  `note` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 資料表新增資料前，先清除舊資料 `orderlist`
--

TRUNCATE TABLE `orderlist`;
-- --------------------------------------------------------

--
-- 資料表結構 `pricelist`
--

CREATE TABLE `pricelist` (
  `weeknumber` int(4) NOT NULL,
  `price` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 資料表新增資料前，先清除舊資料 `pricelist`
--

TRUNCATE TABLE `pricelist`;
--
-- 傾印資料表的資料 `pricelist`
--

INSERT INTO `pricelist` (`weeknumber`, `price`) VALUES
(4, 8000),
(5, 10000),
(6, 12000),
(7, 14000),
(8, 14400),
(9, 16200),
(10, 18000),
(11, 19800),
(12, 21600),
(13, 23400),
(14, 25200),
(15, 27000),
(16, 25600),
(17, 27200),
(18, 28800),
(19, 30400),
(20, 32000),
(21, 33600),
(22, 35200),
(23, 36800),
(24, 38400);

-- --------------------------------------------------------

--
-- 資料表結構 `userinfo`
--

CREATE TABLE `userinfo` (
  `uid` int(10) NOT NULL,
  `name` varchar(20) NOT NULL,
  `birthday` date NOT NULL,
  `phone` varchar(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `id` varchar(10) NOT NULL,
  `password` varchar(50) NOT NULL,
  `city` varchar(10) NOT NULL DEFAULT '臺中市',
  `rural` varchar(10) NOT NULL,
  `address` varchar(50) NOT NULL,
  `admin` int(1) DEFAULT '0',
  `userid` varchar(8) NOT NULL,
  `jointime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `blacklist` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表新增資料前，先清除舊資料 `userinfo`
--

TRUNCATE TABLE `userinfo`;
--
-- 傾印資料表的資料 `userinfo`
--

INSERT INTO `userinfo` (`uid`, `name`, `birthday`, `phone`, `email`, `id`, `password`, `city`, `rural`, `address`, `admin`, `userid`, `jointime`, `blacklist`) VALUES
(1, '浣熊大師', '1968-06-20', '0936025896', 'johnson1848@gmail.com', 'V176777368', '0a287bd7a986786eacde10abb90d5c3d', '臺中市', '北屯區', '甲后路32號', 1, 'RA000000', '2023-09-17 17:26:24', 0);

-- --------------------------------------------------------

--
-- 資料表結構 `userorder`
--

CREATE TABLE `userorder` (
  `ornumber` varchar(10) NOT NULL,
  `employeeid` varchar(5) NOT NULL,
  `date` date NOT NULL,
  `time` int(2) NOT NULL,
  `weeks` int(2) NOT NULL,
  `donetime` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 資料表新增資料前，先清除舊資料 `userorder`
--

TRUNCATE TABLE `userorder`;
--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `adreessdist`
--
ALTER TABLE `adreessdist`
  ADD PRIMARY KEY (`A_I`);

--
-- 資料表索引 `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`oruid`);

--
-- 資料表索引 `blacklist`
--
ALTER TABLE `blacklist`
  ADD PRIMARY KEY (`userid`),
  ADD UNIQUE KEY `userid` (`userid`);

--
-- 資料表索引 `employeeinfo`
--
ALTER TABLE `employeeinfo`
  ADD PRIMARY KEY (`employeeid`),
  ADD UNIQUE KEY `employeeemail` (`employeeemail`),
  ADD UNIQUE KEY `employeeidnumber` (`employeeidnumber`);

--
-- 資料表索引 `evaluate`
--
ALTER TABLE `evaluate`
  ADD PRIMARY KEY (`ornumber`);

--
-- 資料表索引 `orderlist`
--
ALTER TABLE `orderlist`
  ADD PRIMARY KEY (`ornumber`);

--
-- 資料表索引 `pricelist`
--
ALTER TABLE `pricelist`
  ADD PRIMARY KEY (`weeknumber`);

--
-- 資料表索引 `userinfo`
--
ALTER TABLE `userinfo`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `id` (`id`);

--
-- 資料表索引 `userorder`
--
ALTER TABLE `userorder`
  ADD PRIMARY KEY (`ornumber`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `adreessdist`
--
ALTER TABLE `adreessdist`
  MODIFY `A_I` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `attendance`
--
ALTER TABLE `attendance`
  MODIFY `oruid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `userinfo`
--
ALTER TABLE `userinfo`
  MODIFY `uid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
