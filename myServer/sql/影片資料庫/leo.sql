-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- 主機： localhost:3306
-- 產生時間： 2023-09-25 08:18:05
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
-- 傾印資料表的資料 `attendance`
--

INSERT INTO `attendance` (`oruid`, `employeeid`, `mode`, `time`, `date`, `ornumber`, `donetime`, `orderphoto`) VALUES
(5, 'RA001', 1, 2, '2023-10-07', '230925NURZ', '2023-09-25 07:42:51', '/images/orderImg/1-1-RA001-230925NURZ.jpg,/images/orderImg/2-1-RA001-230925NURZ.jpg'),
(6, 'RA001', 1, 2, '2023-10-14', '230925NURZ', '2023-09-25 07:43:17', '/images/orderImg/1-2-RA001-230925NURZ.jpg,/images/orderImg/2-2-RA001-230925NURZ.jpg'),
(7, 'RA001', 1, 2, '2023-10-21', '230925NURZ', '2023-09-25 07:43:27', '/images/orderImg/1-3-RA001-230925NURZ.jpg,/images/orderImg/2-3-RA001-230925NURZ.jpg'),
(8, 'RA001', 1, 2, '2023-10-28', '230925NURZ', '2023-09-25 07:43:38', '/images/orderImg/1-4-RA001-230925NURZ.jpg,/images/orderImg/2-4-RA001-230925NURZ.jpg'),
(9, 'RA001', 0, 2, '2023-09-30', '230925MVLW', NULL, NULL),
(10, 'RA001', 0, 2, '2023-10-07', '230925MVLW', NULL, NULL),
(11, 'RA001', 0, 2, '2023-10-14', '230925MVLW', NULL, NULL),
(12, 'RA001', 0, 2, '2023-10-21', '230925MVLW', NULL, NULL),
(13, 'RA001', 1, 1, '2023-09-30', '230925ADPE', '2023-09-25 08:00:01', '/images/orderImg/1-1-RA001-230925ADPE.jpg,/images/orderImg/2-1-RA001-230925ADPE.jpg'),
(14, 'RA001', 0, 1, '2023-10-07', '230925ADPE', NULL, NULL),
(15, 'RA001', 0, 1, '2023-10-14', '230925ADPE', NULL, NULL),
(16, 'RA001', 0, 1, '2023-10-21', '230925ADPE', NULL, NULL),
(17, 'RA001', 0, 1, '2023-10-28', '230925ADPE', NULL, NULL),
(18, 'RA001', 0, 1, '2023-11-04', '230925ADPE', NULL, NULL),
(19, 'RA001', 0, 1, '2023-11-11', '230925ADPE', NULL, NULL),
(20, 'RA002', 1, 1, '2023-09-26', '230925KRRX', '2023-09-25 08:01:04', '/images/orderImg/1-1-RA002-230925KRRX.jpg,/images/orderImg/2-1-RA002-230925KRRX.jpg'),
(21, 'RA002', 0, 1, '2023-10-03', '230925KRRX', NULL, NULL),
(22, 'RA002', 0, 1, '2023-10-10', '230925KRRX', NULL, NULL),
(23, 'RA002', 0, 1, '2023-10-17', '230925KRRX', NULL, NULL),
(24, 'RA002', 1, 0, '2023-09-26', '230925FVWJ', '2023-09-25 08:01:26', '/images/orderImg/1-1-RA002-230925FVWJ.jpg,/images/orderImg/2-1-RA002-230925FVWJ.jpg'),
(25, 'RA002', 1, 0, '2023-10-03', '230925FVWJ', '2023-09-25 08:01:36', '/images/orderImg/1-2-RA002-230925FVWJ.jpg,/images/orderImg/2-2-RA002-230925FVWJ.jpg'),
(26, 'RA002', 1, 0, '2023-10-10', '230925FVWJ', '2023-09-25 08:01:51', '/images/orderImg/1-3-RA002-230925FVWJ.jpg,/images/orderImg/2-3-RA002-230925FVWJ.jpg,/images/orderImg/3-3-RA002-230925FVWJ.jpg,/images/orderImg/4-3-RA002-230925FVWJ.jpg'),
(27, 'RA002', 1, 0, '2023-10-17', '230925FVWJ', '2023-09-25 08:01:52', '/images/orderImg/1-3-RA002-230925FVWJ.jpg,/images/orderImg/2-3-RA002-230925FVWJ.jpg,/images/orderImg/3-3-RA002-230925FVWJ.jpg,/images/orderImg/4-3-RA002-230925FVWJ.jpg'),
(28, 'RA002', 0, 0, '2023-09-26', '230925CLPK', NULL, NULL),
(29, 'RA002', 0, 0, '2023-10-03', '230925CLPK', NULL, NULL),
(30, 'RA002', 0, 0, '2023-10-10', '230925CLPK', NULL, NULL),
(31, 'RA002', 0, 0, '2023-10-17', '230925CLPK', NULL, NULL),
(32, 'RA003', 0, 1, '2023-09-27', '230925KOTQ', NULL, NULL),
(33, 'RA003', 0, 1, '2023-10-04', '230925KOTQ', NULL, NULL),
(34, 'RA003', 0, 1, '2023-10-11', '230925KOTQ', NULL, NULL),
(35, 'RA003', 0, 1, '2023-10-18', '230925KOTQ', NULL, NULL),
(36, 'RA003', 0, 1, '2023-10-25', '230925KOTQ', NULL, NULL),
(37, 'RA003', 0, 1, '2023-11-01', '230925KOTQ', NULL, NULL),
(38, 'RA003', 0, 1, '2023-11-08', '230925KOTQ', NULL, NULL),
(39, 'RA003', 1, 1, '2023-09-30', '230925AWSE', '2023-09-25 08:03:24', '/images/orderImg/1-1-RA003-230925AWSE.jpg,/images/orderImg/2-1-RA003-230925AWSE.jpg'),
(40, 'RA003', 1, 1, '2023-10-07', '230925AWSE', '2023-09-25 08:03:41', '/images/orderImg/1-2-RA003-230925AWSE.jpg,/images/orderImg/2-2-RA003-230925AWSE.jpg'),
(41, 'RA003', 1, 1, '2023-10-14', '230925AWSE', '2023-09-25 08:03:51', '/images/orderImg/1-3-RA003-230925AWSE.jpg,/images/orderImg/2-3-RA003-230925AWSE.jpg'),
(42, 'RA003', 1, 1, '2023-10-21', '230925AWSE', '2023-09-25 08:04:03', '/images/orderImg/1-4-RA003-230925AWSE.jpg,/images/orderImg/2-4-RA003-230925AWSE.jpg'),
(43, 'RA003', 1, 1, '2023-10-28', '230925AWSE', '2023-09-25 08:04:14', '/images/orderImg/1-5-RA003-230925AWSE.jpg,/images/orderImg/2-5-RA003-230925AWSE.jpg'),
(44, 'RA003', 1, 1, '2023-11-04', '230925AWSE', '2023-09-25 08:04:24', '/images/orderImg/1-6-RA003-230925AWSE.jpg,/images/orderImg/2-6-RA003-230925AWSE.jpg'),
(45, 'RA003', 1, 1, '2023-11-11', '230925AWSE', '2023-09-25 08:04:36', '/images/orderImg/1-7-RA003-230925AWSE.jpg,/images/orderImg/2-7-RA003-230925AWSE.jpg'),
(46, 'RA004', 1, 1, '2023-09-27', '230925SSHQ', '2023-09-25 08:05:28', '/images/orderImg/1-1-RA004-230925SSHQ.jpg,/images/orderImg/2-1-RA004-230925SSHQ.jpg'),
(47, 'RA004', 1, 1, '2023-10-04', '230925SSHQ', '2023-09-25 08:05:39', '/images/orderImg/1-2-RA004-230925SSHQ.jpg,/images/orderImg/2-2-RA004-230925SSHQ.jpg'),
(48, 'RA004', 1, 1, '2023-10-11', '230925SSHQ', '2023-09-25 08:05:56', '/images/orderImg/1-3-RA004-230925SSHQ.jpg'),
(49, 'RA004', 1, 1, '2023-10-18', '230925SSHQ', '2023-09-25 08:06:07', '/images/orderImg/1-4-RA004-230925SSHQ.jpg,/images/orderImg/2-4-RA004-230925SSHQ.jpg'),
(50, 'RA004', 1, 1, '2023-10-25', '230925SSHQ', '2023-09-25 08:06:19', '/images/orderImg/1-5-RA004-230925SSHQ.jpg,/images/orderImg/2-5-RA004-230925SSHQ.jpg'),
(51, 'RA004', 1, 1, '2023-11-01', '230925SSHQ', '2023-09-25 08:06:31', '/images/orderImg/1-6-RA004-230925SSHQ.jpg,/images/orderImg/2-6-RA004-230925SSHQ.jpg'),
(52, 'RA004', 1, 1, '2023-11-08', '230925SSHQ', '2023-09-25 08:06:47', '/images/orderImg/1-7-RA004-230925SSHQ.jpg,/images/orderImg/2-7-RA004-230925SSHQ.jpg'),
(53, 'RA004', 0, 2, '2023-09-27', '230925GFFV', NULL, NULL),
(54, 'RA004', 0, 2, '2023-10-04', '230925GFFV', NULL, NULL),
(55, 'RA004', 0, 2, '2023-10-11', '230925GFFV', NULL, NULL),
(56, 'RA004', 0, 2, '2023-10-18', '230925GFFV', NULL, NULL),
(57, 'RA004', 0, 2, '2023-10-25', '230925GFFV', NULL, NULL),
(58, 'RA004', 0, 2, '2023-11-01', '230925GFFV', NULL, NULL),
(59, 'RA004', 0, 2, '2023-11-08', '230925GFFV', NULL, NULL),
(60, 'RA005', 1, 1, '2023-10-11', '230925LURT', '2023-09-25 08:11:31', '/images/orderImg/1-1-RA005-230925LURT.jpg,/images/orderImg/2-1-RA005-230925LURT.jpg'),
(61, 'RA005', 1, 1, '2023-10-18', '230925LURT', '2023-09-25 08:11:44', '/images/orderImg/1-2-RA005-230925LURT.jpg,/images/orderImg/2-2-RA005-230925LURT.jpg'),
(62, 'RA005', 1, 1, '2023-10-25', '230925LURT', '2023-09-25 08:11:53', '/images/orderImg/1-3-RA005-230925LURT.jpg,/images/orderImg/2-3-RA005-230925LURT.jpg'),
(63, 'RA005', 1, 1, '2023-11-01', '230925LURT', '2023-09-25 08:12:04', '/images/orderImg/1-4-RA005-230925LURT.jpg'),
(64, 'RA005', 1, 1, '2023-11-08', '230925LURT', '2023-09-25 08:12:14', '/images/orderImg/1-5-RA005-230925LURT.jpg'),
(65, 'RA005', 1, 1, '2023-11-15', '230925LURT', '2023-09-25 08:12:23', '/images/orderImg/1-6-RA005-230925LURT.jpg'),
(66, 'RA005', 1, 0, '2023-09-29', '230925VMEW', '2023-09-25 08:12:38', '/images/orderImg/1-1-RA005-230925VMEW.jpg'),
(67, 'RA005', 0, 0, '2023-10-06', '230925VMEW', NULL, NULL),
(68, 'RA005', 0, 0, '2023-10-13', '230925VMEW', NULL, NULL),
(69, 'RA005', 0, 0, '2023-10-20', '230925VMEW', NULL, NULL),
(70, 'RA005', 0, 0, '2023-10-27', '230925VMEW', NULL, NULL),
(71, 'RA005', 0, 0, '2023-11-03', '230925VMEW', NULL, NULL),
(72, 'RA005', 0, 0, '2023-11-10', '230925VMEW', NULL, NULL),
(73, 'RA005', 0, 0, '2023-11-17', '230925VMEW', NULL, NULL),
(74, 'RA005', 0, 0, '2023-11-24', '230925VMEW', NULL, NULL),
(75, 'RA005', 0, 0, '2023-12-01', '230925VMEW', NULL, NULL),
(76, 'RA006', 1, 0, '2023-10-04', '230925YYQT', '2023-09-25 08:13:17', '/images/orderImg/1-1-RA006-230925YYQT.jpg'),
(77, 'RA006', 1, 0, '2023-10-11', '230925YYQT', '2023-09-25 08:13:27', '/images/orderImg/1-2-RA006-230925YYQT.jpg'),
(78, 'RA006', 1, 0, '2023-10-18', '230925YYQT', '2023-09-25 08:13:42', '/images/orderImg/1-3-RA006-230925YYQT.jpg'),
(79, 'RA006', 1, 0, '2023-10-25', '230925YYQT', '2023-09-25 08:13:49', '/images/orderImg/1-4-RA006-230925YYQT.jpg'),
(80, 'RA006', 1, 0, '2023-11-01', '230925YYQT', '2023-09-25 08:14:06', '/images/orderImg/1-5-RA006-230925YYQT.jpg'),
(81, 'RA006', 1, 0, '2023-11-08', '230925YYQT', '2023-09-25 08:14:42', '/images/orderImg/1-6-RA006-230925YYQT.jpg'),
(82, 'RA006', 1, 0, '2023-11-15', '230925YYQT', '2023-09-25 08:14:49', '/images/orderImg/1-7-RA006-230925YYQT.jpg'),
(83, 'RA006', 1, 0, '2023-11-22', '230925YYQT', '2023-09-25 08:15:11', '/images/orderImg/1-8-RA006-230925YYQT.jpg'),
(84, 'RA006', 1, 0, '2023-11-29', '230925YYQT', '2023-09-25 08:15:22', '/images/orderImg/1-9-RA006-230925YYQT.jpg'),
(85, 'RA006', 1, 0, '2023-12-06', '230925YYQT', '2023-09-25 08:15:30', '/images/orderImg/1-10-RA006-230925YYQT.jpg'),
(86, 'RA006', 0, 1, '2023-10-18', '230925TUNI', NULL, NULL),
(87, 'RA006', 0, 1, '2023-10-25', '230925TUNI', NULL, NULL),
(88, 'RA006', 0, 1, '2023-11-01', '230925TUNI', NULL, NULL),
(89, 'RA006', 0, 1, '2023-11-08', '230925TUNI', NULL, NULL),
(90, 'RA006', 0, 1, '2023-11-15', '230925TUNI', NULL, NULL),
(91, 'RA006', 0, 1, '2023-11-22', '230925TUNI', NULL, NULL),
(92, 'RA006', 0, 1, '2023-11-29', '230925TUNI', NULL, NULL),
(93, 'RA006', 0, 1, '2023-12-06', '230925TUNI', NULL, NULL),
(94, 'RA006', 0, 1, '2023-12-13', '230925TUNI', NULL, NULL),
(95, 'RA006', 0, 1, '2023-12-20', '230925TUNI', NULL, NULL);

-- --------------------------------------------------------

--
-- 資料表結構 `blacklist`
--

CREATE TABLE `blacklist` (
  `userid` varchar(8) NOT NULL,
  `whyblacklist` varchar(100) NOT NULL DEFAULT '未說明',
  `blacktime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
-- 傾印資料表的資料 `employeeinfo`
--

INSERT INTO `employeeinfo` (`employeeid`, `employeename`, `employeephone`, `employeeemail`, `photo`, `vaccine`, `goodid`, `racheck`, `cases`, `employeepw`, `employeeidnumber`, `employeebirthday`, `empcity`, `emprural`, `empaddress`, `admin`, `employeetime`) VALUES
('RA001', '鍾炘均', '0972840742', 'donald4276@hotmail.com', '/images/cleaner1.jpg', 1, 1, 1, 10, '0a287bd7a986786eacde10abb90d5c3d', 'V130563555', '1997-09-09', '臺中市', '太平區', '永豐路30號', 2, '2023-09-17 17:37:03'),
('RA002', '陳宥臻', '0934570939', 'pablo8236@gmail.com', '/images/cleaner2.jpg', 1, 1, 1, 7, '0a287bd7a986786eacde10abb90d5c3d', 'S170185443', '2009-05-07', '臺中市', '西屯區', '福中七街8號', 2, '2023-09-17 17:38:22'),
('RA003', '張瀚文', '0961441052', 'murphy9136@yahoo.com', '/images/cleaner3.jpg', 1, 1, 1, 6, '0a287bd7a986786eacde10abb90d5c3d', 'L238073686', '1973-05-02', '臺中市', '西區', '忠信街21號', 2, '2023-09-17 17:39:39'),
('RA004', '盧坤邑', '0912371835', 'kaylynn5375@gmail.com', '/images/cleaner4.jpg', 1, 1, 1, 7, '0a287bd7a986786eacde10abb90d5c3d', 'Q224242435', '1982-03-07', '臺中市', '西屯區', '朝富二街20號', 2, '2023-09-17 17:40:37'),
('RA005', '林正秉', '0989838704', 'robinson9577@icloud.com', '/images/case-002.png', 1, 1, 1, 7, '0a287bd7a986786eacde10abb90d5c3d', 'B165385857', '2007-06-27', '臺中市', '大里區', '仁化工三路23號', 2, '2023-09-17 17:41:34'),
('RA006', '許雅婷', '0935607450', 'carly9986@yahoo.com', '/images/case-001.png', 1, 1, 1, 8, '0a287bd7a986786eacde10abb90d5c3d', 'B292234890', '2010-06-18', '臺中市', '北區', '天津一街15號', 2, '2023-09-17 17:42:22');

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
-- 傾印資料表的資料 `evaluate`
--

INSERT INTO `evaluate` (`ornumber`, `employeeid`, `efficiency`, `clean`, `careful`, `manner`, `reply`, `state`) VALUES
('230925AWSE', 'RA003', 5, 5, 5, 3, '清潔很乾淨', 2),
('230925FVWJ', 'RA002', 4, 5, 5, 4, '非常迅速', 2),
('230925LURT', 'RA005', 5, 5, 5, 5, '還行', 2),
('230925NURZ', 'RA001', 5, 4, 5, 5, '非常棒的服務', 2),
('230925SSHQ', 'RA004', 2, 5, 2, 2, '差強人意', 2),
('230925YYQT', 'RA006', 5, 5, 5, 5, '非常棒', 2);

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
-- 傾印資料表的資料 `orderlist`
--

INSERT INTO `orderlist` (`ornumber`, `orphone`, `oremail`, `orcity`, `orrural`, `oraddress`, `userid`, `orname`, `money`, `pay`, `ordertime`, `orderdone`, `state`, `note`) VALUES
('230925ADPE', '0936025896', 'johnson1848@gmail.com', '臺中市', '北屯區', '甲后路32號', 'RA000000', '浣熊大師', 14000, '1', '2023-09-25 07:48:26', NULL, 1, ''),
('230925AWSE', '0936025896', 'johnson1848@gmail.com', '臺中市', '北屯區', '甲后路32號', 'RA000000', '浣熊大師', 14000, '1', '2023-09-25 07:52:41', '2023-09-25 16:04:37', 2, ''),
('230925CLPK', '0936025896', 'johnson1848@gmail.com', '臺中市', '北屯區', '甲后路32號', 'RA000000', '浣熊大師', 8000, '1', '2023-09-25 07:49:56', NULL, 0, ''),
('230925FVWJ', '0936025896', 'johnson1848@gmail.com', '臺中市', '北屯區', '甲后路32號', 'RA000000', '浣熊大師', 8000, '1', '2023-09-25 07:49:53', '2023-09-25 16:02:16', 2, ''),
('230925GFFV', '0936025896', 'johnson1848@gmail.com', '臺中市', '北屯區', '甲后路32號', 'RA000000', '浣熊大師', 14000, '1', '2023-09-25 07:54:01', NULL, 0, ''),
('230925KOTQ', '0936025896', 'johnson1848@gmail.com', '臺中市', '北屯區', '甲后路32號', 'RA000000', '浣熊大師', 14000, '1', '2023-09-25 07:52:06', NULL, 0, ''),
('230925KRRX', '0936025896', 'johnson1848@gmail.com', '臺中市', '北屯區', '甲后路32號', 'RA000000', '浣熊大師', 8000, '1', '2023-09-25 07:49:21', NULL, 1, ''),
('230925LURT', '0936025896', 'johnson1848@gmail.com', '臺中市', '北屯區', '甲后路32號', 'RA000000', '浣熊大師', 12000, '1', '2023-09-25 07:55:04', '2023-09-25 16:12:23', 2, ''),
('230925MVLW', '0936025896', 'johnson1848@gmail.com', '臺中市', '北屯區', '甲后路32號', 'RA000000', '浣熊大師', 8000, '1', '2023-09-25 07:47:22', NULL, 0, ''),
('230925NURZ', '0914009711', 'sswxx1004@gmail.com', '臺中市', '沙鹿區', '民族路6號', 'RA000002', '李宜鴻', 8000, '1', '2023-09-25 07:37:47', '2023-09-25 15:43:38', 2, '晚上不在家'),
('230925SSHQ', '0936025896', 'johnson1848@gmail.com', '臺中市', '北屯區', '甲后路32號', 'RA000000', '浣熊大師', 14000, '1', '2023-09-25 07:53:24', '2023-09-25 16:06:47', 2, ''),
('230925TUNI', '0936025896', 'johnson1848@gmail.com', '臺中市', '北屯區', '甲后路32號', 'RA000000', '浣熊大師', 18000, '1', '2023-09-25 07:57:15', NULL, 0, ''),
('230925VMEW', '0936025896', 'johnson1848@gmail.com', '臺中市', '北屯區', '甲后路32號', 'RA000000', '浣熊大師', 18000, '1', '2023-09-25 07:55:49', NULL, 1, ''),
('230925YYQT', '0936025896', 'johnson1848@gmail.com', '臺中市', '北屯區', '甲后路32號', 'RA000000', '浣熊大師', 18000, '1', '2023-09-25 07:56:33', '2023-09-25 16:15:30', 2, '');

-- --------------------------------------------------------

--
-- 資料表結構 `pricelist`
--

CREATE TABLE `pricelist` (
  `weeknumber` int(4) NOT NULL,
  `price` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
-- 傾印資料表的資料 `userinfo`
--

INSERT INTO `userinfo` (`uid`, `name`, `birthday`, `phone`, `email`, `id`, `password`, `city`, `rural`, `address`, `admin`, `userid`, `jointime`, `blacklist`) VALUES
(1, '浣熊大師', '1968-06-20', '0936025896', 'johnson1848@gmail.com', 'V176777368', '0a287bd7a986786eacde10abb90d5c3d', '臺中市', '北屯區', '甲后路32號', 1, 'RA000000', '2023-09-17 17:26:24', 0),
(4, '李宜鴻', '1981-08-19', '0914009711', 'sswxx1004@gmail.com', 'Q194326971', '0a287bd7a986786eacde10abb90d5c3d', '臺中市', '沙鹿區', '民族路6號', 0, 'RA000002', '2023-09-25 07:35:50', 0);

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
-- 傾印資料表的資料 `userorder`
--

INSERT INTO `userorder` (`ornumber`, `employeeid`, `date`, `time`, `weeks`, `donetime`) VALUES
('230925ADPE', 'RA001', '2023-09-30', 1, 7, 1),
('230925AWSE', 'RA003', '2023-09-30', 1, 7, 7),
('230925CLPK', 'RA002', '2023-09-26', 0, 4, 0),
('230925FVWJ', 'RA002', '2023-09-26', 0, 4, 4),
('230925GFFV', 'RA004', '2023-09-27', 2, 7, 0),
('230925KOTQ', 'RA003', '2023-09-27', 1, 7, 0),
('230925KRRX', 'RA002', '2023-09-26', 1, 4, 1),
('230925LURT', 'RA005', '2023-10-11', 1, 6, 6),
('230925MVLW', 'RA001', '2023-09-30', 2, 4, 0),
('230925NURZ', 'RA001', '2023-10-07', 2, 4, 4),
('230925SSHQ', 'RA004', '2023-09-27', 1, 7, 7),
('230925TUNI', 'RA006', '2023-10-18', 1, 10, 0),
('230925VMEW', 'RA005', '2023-09-29', 0, 10, 1),
('230925YYQT', 'RA006', '2023-10-04', 0, 10, 10);

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
  MODIFY `oruid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `userinfo`
--
ALTER TABLE `userinfo`
  MODIFY `uid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
