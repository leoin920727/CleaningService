-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2023-09-14 09:37:06
-- 伺服器版本： 10.4.28-MariaDB
-- PHP 版本： 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `cleaning_services`
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `employeeid` varchar(5) NOT NULL,
  `mode` int(1) NOT NULL,
  `time` int(1) NOT NULL,
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `attendance`
--

INSERT INTO `attendance` (`employeeid`, `mode`, `time`, `date`) VALUES
('RA001', 0, 0, '2023-01-22'),
('RA001', 0, 0, '2023-01-29'),
('RA002', 0, 1, '2023-02-09'),
('RA002', 0, 1, '2023-02-13'),
('RA002', 0, 1, '2023-02-16'),
('RA002', 0, 1, '2023-02-22'),
('RA003', 0, 2, '2023-02-27'),
('RA004', 0, 2, '2023-03-17'),
('RA004', 0, 2, '2023-03-24'),
('RA004', 0, 2, '2023-03-31'),
('RA004', 0, 2, '2023-04-07'),
('RA004', 0, 2, '2023-04-14'),
('RA004', 0, 2, '2023-04-21'),
('RA005', 0, 1, '2023-04-01'),
('RA006', 0, 0, '2023-04-12'),
('RA006', 0, 0, '2023-04-19'),
('RA006', 0, 0, '2023-04-26'),
('RA001', 0, 2, '2023-05-19'),
('RA001', 0, 2, '2023-06-02'),
('RA001', 0, 2, '2023-06-09'),
('RA001', 0, 2, '2023-06-16'),
('RA002', 0, 0, '2023-06-04'),
('RA002', 0, 0, '2023-06-11'),
('RA002', 0, 0, '2023-06-18'),
('RA002', 0, 0, '2023-06-25'),
('RA003', 0, 1, '2023-07-15'),
('RA003', 0, 1, '2023-07-22'),
('RA003', 0, 1, '2023-08-05'),
('RA003', 0, 1, '2023-08-12'),
('RA003', 0, 1, '2023-08-19'),
('RA003', 0, 1, '2023-08-26'),
('RA004', 0, 1, '2023-08-22'),
('RA004', 0, 1, '2023-08-29'),
('RA004', 0, 1, '2023-09-05'),
('RA004', 0, 1, '2023-09-12'),
('RA005', 0, 2, '2023-09-08'),
('RA006', 0, 0, '2023-09-09'),
('RA006', 0, 0, '2023-09-16'),
('RA006', 0, 0, '2023-09-23'),
('RA006', 0, 0, '2023-09-30'),
('RA001', 1, 0, '2023-02-05'),
('RA001', 1, 1, '2023-02-05'),
('RA001', 1, 2, '2023-02-05'),
('RA002', 1, 0, '2023-03-01'),
('RA002', 1, 1, '2023-03-01'),
('RA002', 1, 2, '2023-03-01'),
('RA003', 1, 0, '2023-03-18'),
('RA003', 1, 1, '2023-03-18'),
('RA003', 1, 2, '2023-03-18'),
('RA004', 1, 0, '2023-04-02'),
('RA004', 1, 1, '2023-04-02'),
('RA004', 1, 2, '2023-04-02'),
('RA005', 1, 0, '2023-04-10'),
('RA005', 1, 1, '2023-04-10'),
('RA005', 1, 2, '2023-04-10'),
('RA006', 1, 0, '2023-04-20'),
('RA006', 1, 1, '2023-04-20'),
('RA006', 1, 2, '2023-04-20'),
('RA001', 1, 0, '2023-05-05'),
('RA001', 1, 1, '2023-05-05'),
('RA002', 1, 2, '2023-05-05'),
('RA002', 1, 0, '2023-05-20'),
('RA003', 1, 1, '2023-06-06'),
('RA003', 1, 2, '2023-06-06'),
('RA004', 1, 0, '2023-06-13'),
('RA004', 1, 1, '2023-06-13'),
('RA005', 1, 2, '2023-06-17'),
('RA005', 1, 0, '2023-06-20'),
('RA006', 1, 1, '2023-06-30'),
('RA006', 1, 2, '2023-06-30'),
('RA003', 1, 0, '2023-07-01'),
('RA001', 1, 1, '2023-07-09'),
('RA005', 1, 2, '2023-08-08');

-- --------------------------------------------------------

--
-- 資料表結構 `blacklist`
--

CREATE TABLE `blacklist` (
  `userid` varchar(8) NOT NULL,
  `whyblacklist` varchar(100) NOT NULL DEFAULT '未說明',
  `blacktime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `blacklist`
--

INSERT INTO `blacklist` (`userid`, `whyblacklist`, `blacktime`) VALUES
('5', '未說明', '2023-09-07 10:52:20'),
('6', '3123123', '2023-09-07 10:52:20');

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
  `cases` int(5) NOT NULL DEFAULT 0,
  `employeepw` varchar(50) NOT NULL,
  `employeeidnumber` varchar(10) NOT NULL,
  `employeebirthday` date NOT NULL,
  `empcity` varchar(10) NOT NULL DEFAULT '臺中市',
  `emprural` varchar(10) NOT NULL,
  `empaddress` varchar(50) NOT NULL,
  `admin` int(1) NOT NULL DEFAULT 1,
  `employeetime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `employeeinfo`
--

INSERT INTO `employeeinfo` (`employeeid`, `employeename`, `employeephone`, `employeeemail`, `photo`, `vaccine`, `goodid`, `racheck`, `cases`, `employeepw`, `employeeidnumber`, `employeebirthday`, `empcity`, `emprural`, `empaddress`, `admin`, `employeetime`) VALUES
('RA001', '鄒琦筑', '0958237879', 'sophia1207@hotmail.com', '/images/cleaner1.jpg', 1, 1, 1, 0, 'TdYzz2m3', 'K113760435', '1966-12-28', '台中市', '中區', '中山路一段123號', 1, '2023-09-09 11:30:23'),
('RA002', '鍾圖陽', '0912175001', 'jeffrey8325@outlook.com', '/images/cleaner2.jpg', 1, 1, 1, 0, 'kDyS45z3', 'Y220164801', '1998-02-22', '台中市', '西屯區', '文心路二段456號', 1, '2023-09-09 11:30:23'),
('RA003', '曹克毓', '0970724731', 'jane5953@yahoo.com', '/images/case-002.png', 1, 1, 1, 0, 'V68823d7', 'H170488816', '1993-02-15', '台中市', '北區', '三民路一段789號', 1, '2023-09-09 11:30:23'),
('RA004', '沈芮莘', '0960800071', 'fawcett9476@outlook.com', '/images/case-001.png', 1, 1, 1, 0, '9x94d49v', 'O282848786', '1978-11-24', '台中市', '南區', '建國南路十二段101號', 1, '2023-09-09 11:30:23'),
('RA005', '洪之寶', '0920012384', 'samantha1849@gmail.com', '/images/orderStaff.png', 1, 1, 1, 0, '8Q7Aw32W', 'M294543748', '2018-11-03', '台中市', '東區', '東光路三段234號', 1, '2023-09-09 11:30:23'),
('RA006', '楊年瀚', '0930036786', 'dupont882@gmail.com', '/images/cleaner4.jpg', 1, 1, 1, 0, '6sLv8KUM', 'E185269204', '1969-08-01', '台中市', '西區', '美村路四段567號', 1, '2023-09-09 11:30:23');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `evaluate`
--

INSERT INTO `evaluate` (`ornumber`, `employeeid`, `efficiency`, `clean`, `careful`, `manner`, `reply`, `state`) VALUES
('A000000001', 'RA001', 5, 5, 5, 5, '這家清潔公司的服務真的很棒，每次都能讓我的家焕然一新。', 2),
('A000000002', 'RA002', 5, 3, 4, 1, '我對他們的工作不太滿意，有一些地方並沒有清潔得很徹底。', 2),
('A000000003', 'RA003', 4, 4, 4, 4, '價格合理，服務一般，沒什麼特別的感覺。', 2),
('A000000004', 'RA004', 0, 0, 0, 0, '曾經有一次他們損壞了我的家具，雖然後來賠償了，但還是有點不開心。', 2),
('A000000005', 'RA005', 5, 5, 5, 5, '清潔人員總是非常準時，而且友好，他們的服務讓我感到很滿意。', 2),
('A000000006', 'RA006', 3, 5, 4, 5, NULL, 2);

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
  `ordertime` timestamp NOT NULL DEFAULT current_timestamp(),
  `orderdone` datetime DEFAULT NULL,
  `state` int(2) NOT NULL,
  `note` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `orderlist`
--

INSERT INTO `orderlist` (`ornumber`, `orphone`, `oremail`, `orcity`, `orrural`, `oraddress`, `userid`, `orname`, `money`, `pay`, `ordertime`, `orderdone`, `state`, `note`) VALUES
('A000000001', '0920589962', 'gomez8601@outlook.com', '臺中市', '西屯區', '河南東一街17號', 'RA000001', '李儀冬', 4000, '1', '2023-01-14 16:00:00', '2023-01-29 00:00:00', 2, NULL),
('A000000002', '0923230748', 'swift2607@icloud.com', '臺中市', '梧棲區', '緯五路26號', 'RA000003', '沈子成', 8000, '1', '2023-02-01 16:00:00', '2023-02-16 00:00:00', 2, NULL),
('A000000003', '0930398746', 'barry3965@hotmail.com', '臺中市', '太平區', '園區五路6號', 'RA000006', '李傑寒', 2000, '1', '2023-02-19 16:00:00', '2023-02-27 00:00:00', 2, NULL),
('A000000004', '0928958260', 'chantel6709@gmail.com', '臺中市', '大里區', '泉水街11號', 'RA000009', '蔣冉瑄', 12000, '1', '2023-03-09 16:00:00', '2023-04-21 00:00:00', 2, NULL),
('A000000005', '0955222092', 'campbell8610@gmail.com', '臺中市', '南區', '民興街1號', 'RA000016', '李叡業', 2000, '1', '2023-03-24 16:00:00', '2023-01-01 00:00:00', 2, NULL),
('A000000006', '0970341719', 'garrix7642@outlook.com', '臺中市', '南屯區', '益昌二街2號', 'RA000022', '劉嘉星', 6000, '1', '2023-04-04 16:00:00', '2023-04-26 00:00:00', 2, NULL),
('A000000007', '0918540495', 'long2043@gmail.com', '臺中市', '北區', '忠明八街11號', 'RA000025', '廖佩影', 8000, '1', '2023-05-11 16:00:00', '2023-06-09 00:00:00', 2, NULL),
('A000000008', '0937524906', 'sanders3662@gmail.com', '臺中市', '沙鹿區', '賢正街19號', 'RA000028', '劉奕漩', 8000, '1', '2023-05-27 16:00:00', '2023-06-25 00:00:00', 2, NULL),
('A000000009', '0921152383', 'kathleen7782@hotmail.com', '臺中市', '沙鹿區', '六路五街12號', 'RA000032', '巫安連', 12000, '1', '2023-07-07 16:00:00', '2023-08-19 00:00:00', 2, NULL),
('A000000010', '0914361087', 'shields454@gmail.com', '臺中市', '太平區', '振德街19號', 'RA000037', '吳佳涵', 8000, '1', '2023-08-14 16:00:00', '2023-09-12 00:00:00', 1, NULL),
('A000000011', '0932922539', 'bryce7029@hotmail.com', '臺中市', '大雅區', '中和七路25號', 'RA000040', '林思楷', 2000, '1', '2023-08-31 16:00:00', '2023-09-08 00:00:00', 1, NULL),
('A000000012', '0972514676', 'lena6305@gmail.com', '臺中市', '神岡區', '福成路7號', 'RA000043', '嚴夏洋', 8000, '1', '2023-09-01 16:00:00', '2023-09-30 00:00:00', 0, NULL);

-- --------------------------------------------------------

--
-- 資料表結構 `pricelist`
--

CREATE TABLE `pricelist` (
  `weeknumber` int(4) NOT NULL,
  `price` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `admin` int(1) DEFAULT 0,
  `userid` varchar(8) NOT NULL,
  `jointime` timestamp NOT NULL DEFAULT current_timestamp(),
  `blacklist` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- 傾印資料表的資料 `userinfo`
--

INSERT INTO `userinfo` (`uid`, `name`, `birthday`, `phone`, `email`, `id`, `password`, `city`, `rural`, `address`, `admin`, `userid`, `jointime`, `blacklist`) VALUES
(1, '浣熊管家', '1963-06-27', '0920589962', 'raccoon@gmail.com', 'A236173460', 'raccoon55688', '臺中市', '西屯區', '河南東一街17號', 1, 'RA000001', '2023-09-07 13:49:19', 0),
(2, '孫博國', '1979-03-08', '0936025896', 'johnson1848@gmail.com', 'V176777368', 'Un42ev4D', '臺中市', '后里區', '甲后路32號', 0, 'RA000002', '2023-09-07 13:49:19', 0),
(3, '沈子成', '2013-02-15', '0923230748', 'swift2607@icloud.com', 'H137147389', 'UbY9Z9kP', '臺中市', '梧棲區', '緯五路26號', 0, 'RA000003', '2023-09-07 13:49:19', 0),
(4, '劉星鋭', '1981-08-19', '0914009711', 'shelley5034@outlook.com', 'Q194326971', 'khC266QL', '臺中市', '沙鹿區', '民族路6號', 0, 'RA000004', '2023-09-07 13:49:19', 0),
(5, '鄭源瀾', '2008-07-24', '0929720369', 'adames6343@hotmail.com', 'P232512436', 'yr65nM9N', '臺中市', '烏日區', '自強街13號', 0, 'RA000005', '2023-09-07 13:49:19', 1),
(6, '李傑寒', '1975-12-20', '0930398746', 'barry3965@hotmail.com', 'Q167695858', 'd69QkK92', '臺中市', '太平區', '園區五路6號', 0, 'RA000006', '2023-09-07 13:49:19', 1),
(7, '錢奕春', '1994-12-30', '0986550089', 'jerry8882@gmail.com', 'Y169875145', '7M6EG6kd', '臺中市', '南屯區', '文山一街16號', 0, 'RA000007', '2023-09-07 13:49:19', 0),
(8, '陳偲璐', '1974-06-06', '0922177963', 'lily2364@yahoo.com', 'F231251624', 'D9Rn9566', '臺中市', '潭子區', '潭子街4號', 0, 'RA000008', '2023-09-07 13:49:19', 0),
(9, '蔣冉瑄', '1972-11-03', '0928958260', 'chantel6709@gmail.com', 'I291180474', 'H4p9eqHB', '臺中市', '大里區', '泉水街11號', 0, 'RA000009', '2023-09-07 13:49:19', 0),
(10, '王嘉堇', '1970-04-02', '0931347252', 'rodney2738@hotmail.com', 'U198074392', 'nQ867DqE', '臺中市', '西屯區', '天水西一街24號', 0, 'RA000010', '2023-09-07 13:49:19', 0),
(11, '陳旭順', '2006-01-18', '0926271764', 'arthur439@hotmail.com', 'V138871509', '9D5Gs6rc', '臺中市', '梧棲區', '建國西街31號', 0, 'RA000011', '2023-09-07 13:49:19', 0),
(12, '董晉業', '1961-11-13', '0917456967', 'martin8055@outlook.com', 'P127016765', 'UJh8DYP8', '臺中市', '石岡區', '大仁街15號', 0, 'RA000012', '2023-09-07 13:49:19', 0),
(13, '蔡才芝', '2017-08-02', '0982500822', 'christian5824@gmail.com', 'U175517232', 'r7u4HY2n', '臺中市', '后里區', '犁份路2號', 0, 'RA000013', '2023-09-07 13:49:19', 0),
(14, '盧嘉夕', '1964-04-21', '0933199906', 'torres6514@outlook.com', 'T252129253', '2vy487Le', '臺中市', '后里區', '公舘路15號', 0, 'RA000014', '2023-09-07 13:49:19', 0),
(15, '王修嶽', '1960-02-17', '0929047858', 'middleton852@hotmail.com', 'G176206102', '949zTk39', '臺中市', '烏日區', '成功西路18號', 0, 'RA000015', '2023-09-07 13:49:19', 0),
(16, '李叡業', '1960-07-05', '0955222092', 'campbell8610@gmail.com', 'B128690497', '6SX97z4E', '臺中市', '南區', '民興街1號', 0, 'RA000016', '2023-09-07 13:49:19', 0),
(17, '傅維義', '2014-05-09', '0939399820', 'pattie4389@gmail.com', 'C275534847', '54Z68GJ8', '臺中市', '南屯區', '大墩五街1號', 0, 'RA000017', '2023-09-07 13:49:19', 0),
(18, '何玫瑋', '1988-07-07', '0930843010', 'rosie4912@outlook.com', 'L254399103', '9S29vq5T', '臺中市', '太平區', '振德街16號', 0, 'RA000018', '2023-09-07 13:49:19', 0),
(19, '張恬玲', '1988-02-12', '0986473669', 'garcia4508@icloud.com', 'L230873808', 'gzLf774v', '臺中市', '西區', '公正路16號', 0, 'RA000019', '2023-09-07 13:49:19', 0),
(20, '蕭利恩', '1991-10-20', '0931533517', 'garver3630@outlook.com', 'C198536490', '3VdLtY8q', '臺中市', '豐原區', '文化街15號', 0, 'RA000020', '2023-09-07 13:49:19', 0),
(21, '鄧健容', '2009-10-17', '0971551295', 'farmiga8918@icloud.com', 'W150704858', '8F7ZJqhh', '臺中市', '大安區', '興安路23號', 0, 'RA000021', '2023-09-07 13:49:19', 0),
(22, '劉嘉星', '1976-04-19', '0970341719', 'garrix7642@outlook.com', 'S249658931', '92SX6s7c', '臺中市', '南屯區', '益昌二街2號', 0, 'RA000022', '2023-09-07 13:49:19', 0),
(23, '陳曄瀾', '2011-06-11', '0916458929', 'thomas6671@gmail.com', 'X239097901', 'AErB5f7B', '臺中市', '東區', '建成路15號', 0, 'RA000023', '2023-09-07 13:49:19', 0),
(24, '紀恩月', '1984-07-05', '0956058395', 'bowen2410@gmail.com', 'Q167591908', '49AGFvAs', '臺中市', '北屯區', '崇德九路31號', 0, 'RA000024', '2023-09-07 13:49:19', 0),
(25, '廖佩影', '1993-12-22', '0918540495', 'long2043@gmail.com', 'N290718446', 'Wd27cyW8', '臺中市', '北區', '忠明八街11號', 0, 'RA000025', '2023-09-07 13:49:19', 0),
(26, '王祐馳', '2002-06-18', '0929192471', 'oliver3367@yahoo.com', 'V198996367', 'E535x42q', '臺中市', '大雅區', '平和一路35號', 0, 'RA000026', '2023-09-07 13:49:19', 0),
(27, '姚爍銘', '1972-08-23', '0982427547', 'lopez8015@gmail.com', 'Z131362395', '9Q6SN4Q5', '臺中市', '后里區', '月眉南路3號', 0, 'RA000027', '2023-09-07 13:49:19', 0),
(28, '劉奕漩', '1988-11-07', '0937524906', 'sanders3662@gmail.com', 'I268961281', '23W84Ky6', '臺中市', '沙鹿區', '賢正街19號', 0, 'RA000028', '2023-09-07 13:49:19', 0),
(29, '許婧筱', '2000-03-25', '0934729640', 'bailey6861@outlook.com', 'I280722153', 'cuE349pd', '臺中市', '大雅區', '科雅七路25號', 0, 'RA000029', '2023-09-07 13:49:19', 0),
(30, '邵星錦', '1964-03-28', '0982381235', 'elmer5795@gmail.com', 'W166370484', 'zQ4q28r5', '臺中市', '北區', '台中港路30號', 0, 'RA000030', '2023-09-07 13:49:19', 0),
(31, '王升遠', '1969-01-29', '0916724793', 'rahman4797@gmail.com', 'P264188188', 'c7AzFRn9', '臺中市', '后里區', '梅里路20號', 0, 'RA000031', '2023-09-07 13:49:19', 0),
(32, '巫安連', '1964-06-15', '0921152383', 'kathleen7782@hotmail.com', 'D287320309', '2m65bZFm', '臺中市', '沙鹿區', '六路五街12號', 0, 'RA000032', '2023-09-07 13:49:19', 0),
(33, '歐濤萱', '2013-07-24', '0923601262', 'cruz4545@gmail.com', 'Y249620262', 'nD6w9622', '臺中市', '龍井區', '中山一路31號', 0, 'RA000033', '2023-09-07 13:49:19', 0),
(34, '涂易汝', '2008-09-23', '0915878916', 'sophie6293@yahoo.com', 'E273360609', '7k6v45xd', '臺中市', '大里區', '新和路11號', 0, 'RA000034', '2023-09-07 13:49:19', 0),
(35, '田嬋雲', '1982-12-17', '0954482901', 'courtney7543@gmail.com', 'R287352526', '85t7Znk6', '臺中市', '大里區', '工業十二路31號', 0, 'RA000035', '2023-09-07 13:49:19', 0),
(36, '張盧萱', '1986-03-08', '0929593228', 'mia3826@icloud.com', 'Z241449007', 'H99CV9zL', '臺中市', '大里區', '祥全路7號', 0, 'RA000036', '2023-09-07 13:49:19', 0),
(37, '吳佳涵', '2006-04-09', '0914361087', 'shields454@gmail.com', 'E243703696', 'Bt4kQprA', '臺中市', '太平區', '振德街19號', 0, 'RA000037', '2023-09-07 13:49:19', 0),
(38, '莊亞笑', '1997-02-04', '0925064152', 'kimberly3034@outlook.com', 'N200304481', 'Kt7y4d8H', '臺中市', '沙鹿區', '六路十七街5號', 0, 'RA000038', '2023-09-07 13:49:19', 0),
(39, '柯庭賢', '1991-12-12', '0988589723', 'barbara949@gmail.com', 'J222354071', 'RV39QpB2', '臺中市', '梧棲區', '中二路33號', 0, 'RA000039', '2023-09-07 13:49:19', 0),
(40, '林思楷', '2000-03-05', '0932922539', 'bryce7029@hotmail.com', 'N140150956', 'XE2HQ7X6', '臺中市', '大雅區', '中和七路25號', 0, 'RA000040', '2023-09-07 13:49:19', 0),
(41, '蕭懷濤', '2000-07-25', '0939596222', 'natalie6765@gmail.com', 'Y291897168', 'n2aPdHKh', '臺中市', '烏日區', '慶光路29號', 0, 'RA000041', '2023-09-07 13:49:19', 0),
(42, '宋影鶴', '2015-10-09', '0952987815', 'sergey7044@gmail.com', 'B172676167', '5H4MsNsR', '臺中市', '清水區', '自治路26號', 0, 'RA000042', '2023-09-07 13:49:19', 0),
(43, '嚴夏洋', '2014-10-18', '0972514676', 'lena6305@gmail.com', 'Z293627497', '373E7q8f', '臺中市', '神岡區', '福成路7號', 0, 'RA000043', '2023-09-07 13:49:19', 0),
(44, '蔡奕錦', '2012-11-24', '0963746210', 'dinwiddie4673@gmail.com', 'X128409948', 'Nn8kbyCQ', '臺中市', '大肚區', '文昌路26號', 0, 'RA000044', '2023-09-07 13:49:19', 0),
(45, '龔月林', '2010-06-18', '0935607450', 'carly9986@yahoo.com', 'B292234890', '522DUmqE', '臺中市', '北區', '天津一街15號', 0, 'RA000045', '2023-09-07 13:49:19', 0),
(46, '曾勛璟', '2007-06-27', '0989838704', 'robinson9577@icloud.com', 'B165385857', '23TSXuh6', '臺中市', '大里區', '仁化工三路23號', 0, 'RA000046', '2023-09-07 13:49:19', 0),
(47, '阮嫣宛', '1982-03-27', '0912371835', 'kaylynn5375@gmail.com', 'Q224242435', '59ZtCc4a', '臺中市', '西屯區', '朝富二街20號', 0, 'RA000047', '2023-09-07 13:49:19', 0),
(48, '陳玫菲', '1973-05-02', '0961441052', 'murphy9136@yahoo.com', 'L238073686', '37H7q9fV', '臺中市', '西區', '忠信街21號', 0, 'RA000048', '2023-09-07 13:49:19', 0),
(49, '陸舟韜', '2009-05-07', '0934570939', 'pablo8236@gmail.com', 'S170185443', '3KFhJNC6', '臺中市', '西屯區', '福中七街8號', 0, 'RA000049', '2023-09-07 13:49:19', 0),
(50, '張信彌', '1977-09-09', '0972840742', 'donald4276@hotmail.com', 'V130563555', '69q5x4S7', '臺中市', '太平區', '永豐路30號', 0, 'RA000050', '2023-09-07 13:49:19', 0);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `userorder`
--

INSERT INTO `userorder` (`ornumber`, `employeeid`, `date`, `time`, `weeks`, `donetime`) VALUES
('A000000001', 'RA001', '2023-01-22', 0, 2, 2),
('A000000002', 'RA002', '2023-02-09', 1, 2, 2),
('A000000003', 'RA003', '2023-02-27', 2, 1, 1),
('A000000004', 'RA004', '2023-03-17', 2, 6, 6),
('A000000005', 'RA005', '2023-04-01', 1, 1, 1),
('A000000006', 'RA006', '2023-04-12', 0, 3, 3),
('A000000007', 'RA001', '2023-05-19', 2, 4, 4),
('A000000008', 'RA002', '2023-06-04', 0, 4, 4),
('A000000009', 'RA003', '2023-07-15', 1, 6, 6),
('A000000010', 'RA004', '2023-08-22', 1, 4, 3),
('A000000011', 'RA005', '2023-09-08', 2, 1, 0),
('A000000012', 'RA006', '2023-09-09', 0, 4, 0);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `adreessdist`
--
ALTER TABLE `adreessdist`
  ADD PRIMARY KEY (`A_I`);

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
  ADD UNIQUE KEY `employeeemail` (`employeeemail`,`employeeidnumber`);

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
  ADD UNIQUE KEY `email` (`email`,`id`);

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
-- 使用資料表自動遞增(AUTO_INCREMENT) `userinfo`
--
ALTER TABLE `userinfo`
  MODIFY `uid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
