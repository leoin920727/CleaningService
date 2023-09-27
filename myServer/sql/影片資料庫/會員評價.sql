-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- 主機： localhost:3306
-- 產生時間： 2023-09-24 08:12:22
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
--
-- 傾印資料表的資料 `attendance`
--

INSERT INTO `attendance` (`oruid`, `employeeid`, `mode`, `time`, `date`, `ornumber`, `donetime`, `orderphoto`) VALUES
(1, 'RA001', 1, 2, '2023-10-07', '230924EPCL', '2023-10-07 08:09:33', '/images/orderImg/1-1-RA001-230924EPCL.jpg,/images/orderImg/2-1-RA001-230924EPCL.jpg'),
(2, 'RA001', 1, 2, '2023-10-14', '230924EPCL', '2023-10-14 08:10:02', '/images/orderImg/1-2-RA001-230924EPCL.jpg,/images/orderImg/2-2-RA001-230924EPCL.jpg'),
(3, 'RA001', 1, 2, '2023-10-21', '230924EPCL', '2023-10-21 08:10:07', '/images/orderImg/1-3-RA001-230924EPCL.jpg,/images/orderImg/2-3-RA001-230924EPCL.jpg'),
(4, 'RA001', 1, 2, '2023-10-28', '230924EPCL', '2023-10-28 08:10:13', '/images/orderImg/1-4-RA001-230924EPCL.jpg,/images/orderImg/2-4-RA001-230924EPCL.jpg');

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
('RA001', '張信彌', '0972840742', 'donald4276@hotmail.com', '/images/cleaner1.jpg', 1, 1, 1, 7, '0a287bd7a986786eacde10abb90d5c3d', 'V130563555', '1997-09-09', '臺中市', '太平區', '永豐路30號', 2, '2023-09-17 17:37:03'),
('RA002', '陸舟韜', '0934570939', 'pablo8236@gmail.com', '/images/cleaner2.jpg', 1, 1, 1, 4, '64d6e178bf45ec5ca10a3a912825d9a0', 'S170185443', '2009-05-07', '臺中市', '西屯區', '福中七街8號', 2, '2023-09-17 17:38:22'),
('RA003', '陳玫菲', '0961441052', 'murphy9136@yahoo.com', '/images/cleaner3.jpg', 1, 1, 1, 4, '7198074d3cd634ad6a292ff620ec6e69', 'L238073686', '1973-05-02', '臺中市', '西區', '忠信街21號', 2, '2023-09-17 17:39:39'),
('RA004', '阮嫣宛', '0912371835', 'kaylynn5375@gmail.com', '/images/cleaner4.jpg', 1, 1, 1, 5, 'c05419d8a89e1cab13968f44b43eeb56', 'Q224242435', '1982-03-07', '臺中市', '西屯區', '朝富二街20號', 2, '2023-09-17 17:40:37'),
('RA005', '曾勛璟', '0989838704', 'robinson9577@icloud.com', '/images/case-002.png', 1, 1, 1, 5, 'cbac75a3c747856be663cd989ec0f20e', 'B165385857', '2007-06-27', '臺中市', '大里區', '仁化工三路23號', 2, '2023-09-17 17:41:34'),
('RA006', '龔月林', '0935607450', 'carly9986@yahoo.com', '/images/case-001.png', 1, 1, 1, 6, '356a078dcea834865abbfecb3274ca84', 'B292234890', '2010-06-18', '臺中市', '北區', '天津一街15號', 2, '2023-09-17 17:42:22');

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
('23091810NA', 'RA006', 1, 1, 3, 1, '會在陽台抽菸...', 2),
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
--
-- 傾印資料表的資料 `orderlist`
--

INSERT INTO `orderlist` (`ornumber`, `orphone`, `oremail`, `orcity`, `orrural`, `oraddress`, `userid`, `orname`, `money`, `pay`, `ordertime`, `orderdone`, `state`, `note`) VALUES
('23091809AK', '0914009711', 'shelley5034@outlook.com', '臺中市', '沙鹿區', '民族路6號', 'RA000003', '劉星鋭', 16200, '1', '2023-09-17 17:52:10', '2023-09-18 10:22:30', 1, '晚上不在家'),
('23091809DM', '0914009711', 'shelley5034@outlook.com', '臺中市', '沙鹿區', '民族路6號', 'RA000003', '劉星鋭', 27000, '1', '2023-09-17 17:53:16', '2023-09-18 10:22:50', 1, '房下房客會說很吵'),
('23091809EB', '0930398746', 'barry3965@hotmail.com', '臺中市', '太平區', '園區五路6號', 'RA000005', '李傑寒', 8000, '1', '2023-09-17 17:58:29', '2023-09-18 10:22:56', 2, ''),
('23091809EH', '0930398746', 'barry3965@hotmail.com', '臺中市', '太平區', '園區五路6號', 'RA000005', '李傑寒', 32000, '1', '2023-09-17 17:58:59', '2023-09-18 10:23:02', 1, ''),
('23091809FN', '0936025896', 'johnson1848@gmail.com', '臺中市', '北屯區', '甲后路32號', 'RA000001', '孫博國', 25600, '1', '2023-09-17 17:44:40', '2023-09-18 10:23:07', 1, '晚上不在家'),
('23091809FS', '0914009711', 'shelley5034@outlook.com', '臺中市', '沙鹿區', '民族路6號', 'RA000003', '劉星鋭', 23400, '1', '2023-09-17 17:51:34', '2023-09-18 10:23:14', 2, '晚上不在家'),
('23091809IE', '0923230748', 'swift2607@icloud.com', '臺中市', '龍井區', '緯五路26號', 'RA000002', '沈子成', 8000, '1', '2023-09-17 17:47:53', '2023-09-18 10:23:19', 2, ''),
('23091809IF', '0936025896', 'johnson1848@gmail.com', '臺中市', '北屯區', '甲后路32號', 'RA000001', '孫博國', 33600, '1', '2023-09-17 17:45:33', '2023-09-18 10:24:35', 1, ''),
('23091809PC', '0929720369', 'adames6343@hotmail.com', '臺中市', '烏日區', '自強街13號', 'RA000004', '鄭源瀾', 21600, '1', '2023-09-17 17:55:04', '2023-09-18 10:25:17', 1, ''),
('23091809QY', '0929720369', 'adames6343@hotmail.com', '臺中市', '烏日區', '自強街13號', 'RA000004', '鄭源瀾', 14000, '1', '2023-09-17 17:55:49', '2023-09-18 10:25:11', 2, ''),
('23091809TU', '0936025896', 'johnson1848@gmail.com', '臺中市', '北屯區', '甲后路32號', 'RA000001', '孫博國', 12000, '1', '2023-09-17 17:43:48', '2023-09-18 10:24:48', 2, '房下房客會說很吵'),
('23091809UC', '0923230748', 'swift2607@icloud.com', '臺中市', '龍井區', '緯五路26號', 'RA000002', '沈子成', 30400, '1', '2023-09-17 17:48:39', '2023-09-18 10:25:00', 2, '晚上不在家'),
('23091809WA', '0929720369', 'adames6343@hotmail.com', '臺中市', '烏日區', '自強街13號', 'RA000004', '鄭源瀾', 8000, '1', '2023-09-17 17:56:33', '2023-09-18 10:25:22', 2, ''),
('23091809WU', '0930398746', 'barry3965@hotmail.com', '臺中市', '太平區', '園區五路6號', 'RA000005', '李傑寒', 27200, '1', '2023-09-17 17:57:56', '2023-09-18 10:25:28', 1, ''),
('23091809ZH', '0923230748', 'swift2607@icloud.com', '臺中市', '龍井區', '緯五路26號', 'RA000002', '沈子成', 27000, '1', '2023-09-17 17:49:54', '2023-09-18 10:26:28', 2, '晚上不在家'),
('23091810BX', '0931347252', 'rodney2738@hotmail.com', '臺中市', '西屯區', '天水西一街24號', 'RA000009', '王嘉堇', 8000, '1', '2023-09-17 18:17:42', '2023-09-18 10:25:48', 2, ''),
('23091810CK', '0922177963', 'lily2364@yahoo.com', '臺中市', '潭子區', '潭子街4號', 'RA000007', '陳偲璐', 27200, '1', '2023-09-17 18:12:12', '2023-09-18 10:26:48', 1, ''),
('23091810DN', '0922177963', 'lily2364@yahoo.com', '臺中市', '潭子區', '潭子街4號', 'RA000007', '陳偲璐', 8000, '1', '2023-09-17 18:11:31', NULL, 0, ''),
('23091810EJ', '0986550089', 'jerry8882@gmail.com', '臺中市', '南屯區', '文山一街16號', 'RA000006', '錢奕春', 32000, '1', '2023-09-17 18:07:41', '2023-09-18 10:25:33', 1, ''),
('23091810FI', '0928958260', 'chantel6709@gmail.com', '臺中市', '大里區', '泉水街11號', 'RA000008', '蔣冉瑄', 8000, '1', '2023-09-17 18:13:56', '2023-09-18 10:25:37', 2, ''),
('23091810JR', '0928958260', 'chantel6709@gmail.com', '臺中市', '大里區', '泉水街11號', 'RA000008', '蔣冉瑄', 8000, '1', '2023-09-17 18:13:04', '2023-09-18 10:26:42', 2, ''),
('23091810NA', '0926271764', 'arthur439@hotmail.com', '臺中市', '大里區', '建國西街31號', 'RA000010', '陳旭順', 8000, '1', '2023-09-17 18:20:40', '2023-09-18 10:25:43', 2, ''),
('23091810OE', '0922177963', 'lily2364@yahoo.com', '臺中市', '潭子區', '潭子街4號', 'RA000007', '陳偲璐', 28800, '1', '2023-09-17 18:11:00', '2023-09-18 10:27:08', 1, ''),
('23091810QR', '0931347252', 'rodney2738@hotmail.com', '臺中市', '西屯區', '天水西一街24號', 'RA000009', '王嘉堇', 27000, '1', '2023-09-17 18:15:44', '2023-09-18 10:26:56', 2, '房下房客會說很吵'),
('23091810RL', '0928958260', 'chantel6709@gmail.com', '臺中市', '大里區', '泉水街11號', 'RA000008', '蔣冉瑄', 8000, '1', '2023-09-17 18:14:40', '2023-09-18 10:26:12', 2, ''),
('23091810UR', '0931347252', 'rodney2738@hotmail.com', '臺中市', '西屯區', '天水西一街24號', 'RA000009', '王嘉堇', 8000, '1', '2023-09-17 18:16:47', NULL, 0, ''),
('23091810XU', '0926271764', 'arthur439@hotmail.com', '臺中市', '大里區', '建國西街31號', 'RA000010', '陳旭順', 8000, '1', '2023-09-17 18:19:01', '2023-09-18 10:26:32', 2, ''),
('23091810YJ', '0986550089', 'jerry8882@gmail.com', '臺中市', '南屯區', '文山一街16號', 'RA000006', '錢奕春', 33600, '1', '2023-09-17 18:08:36', NULL, 0, ''),
('23091810YZ', '0926271764', 'arthur439@hotmail.com', '臺中市', '大里區', '建國西街31號', 'RA000010', '陳旭順', 21600, '1', '2023-09-17 18:19:57', NULL, 0, ''),
('23091810ZF', '0986550089', 'jerry8882@gmail.com', '臺中市', '南屯區', '文山一街16號', 'RA000006', '錢奕春', 32000, '1', '2023-09-17 18:09:18', NULL, 0, ''),
('23091813CF', '0929720369', 'adames6343@hotmail.com', '臺中市', '烏日區', '自強街13號', 'RA000004', '鄭源瀾', 8000, '1', '2023-09-17 21:29:24', NULL, 0, ''),
('23091813CN', '0930398746', 'barry3965@hotmail.com', '臺中市', '太平區', '園區五路6號', 'RA000005', '李傑寒', 21600, '1', '2023-09-17 21:32:02', NULL, 0, '我家有養小狗~'),
('23091813MN', '0928958260', 'chantel6709@gmail.com', '臺中市', '大里區', '泉水街11號', 'RA000008', '蔣冉瑄', 14400, '1', '2023-09-17 21:30:51', NULL, 0, '我家的話很貴，請細心點'),
('23091813WW', '0986550089', 'jerry8882@gmail.com', '臺中市', '南屯區', '文山一街16號', 'RA000006', '錢奕春', 21600, '1', '2023-09-17 21:33:47', NULL, 0, '家有小貓'),
('23091813ZV', '0929720369', 'adames6343@hotmail.com', '臺中市', '烏日區', '自強街13號', 'RA000004', '鄭源瀾', 18000, '1', '2023-09-17 21:28:30', NULL, 0, '幫我掃乾淨點'),
('230924EPCL', '0914009711', 'shelley5034@outlook.com', '臺中市', '沙鹿區', '民族路6號', 'RA000001', '劉星鋭', 8000, '1', '2023-09-24 07:55:42', '2023-10-28 16:10:13', 2, '');

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
(1, '孫博國', '1968-06-20', '0936025896', 'johnson1848@gmail.com', 'V176777368', '0a287bd7a986786eacde10abb90d5c3d', '臺中市', '北屯區', '甲后路32號', 1, 'RA000000', '2023-09-17 17:26:24', 0),
(2, '劉星鋭', '1981-08-19', '0914009711', 'shelley5034@outlook.com', 'Q194326971', '0a287bd7a986786eacde10abb90d5c3d', '臺中市', '沙鹿區', '民族路6號', 0, 'RA000001', '2023-09-24 03:09:44', 0);

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
-- 傾印資料表的資料 `userorder`
--

INSERT INTO `userorder` (`ornumber`, `employeeid`, `date`, `time`, `weeks`, `donetime`) VALUES
('230924EPCL', 'RA001', '2023-10-07', 2, 4, 4);

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
