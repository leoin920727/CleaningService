-- 查詢員工各項能力評價平均值
SELECT p.employeeid, AVG(efficiency) as e1, AVG(clean) as e2, AVG(careful) as e3, AVG(manner) as e4 FROM employeeinfo as p LEFT JOIN evaluate as v ON p.employeeid=v.employeeid GROUP BY p.employeeid;

-- 查詢員工總評價
SELECT employeeid, ROUND((e1 + e2 + e3 + e4)/4,1) AS total_efficiency
FROM (
    SELECT p.employeeid,
           AVG(v.efficiency) AS e1,
           AVG(v.clean) AS e2,
           AVG(v.careful) AS e3,
           AVG(v.manner) AS e4
    FROM employeeinfo AS p
    LEFT JOIN evaluate AS v ON p.employeeid = v.employeeid
    GROUP BY p.employeeid
) AS new;

-- 查詢員工姓名、照片、總評分
SELECT
    info.name,
    info.photo,
    ROUND((score.e1 + score.e2 + score.e3 + score.e4) / 4, 1) AS total_efficiency
FROM
    employeeinfo AS info
LEFT JOIN
    (
        SELECT
            p.employeeid,
            AVG(v.efficiency) AS e1,
            AVG(v.clean) AS e2,
            AVG(v.careful) AS e3,
            AVG(v.manner) AS e4
        FROM
            employeeinfo AS p
        LEFT JOIN
            evaluate AS v ON p.employeeid = v.employeeid
        GROUP BY
            p.employeeid
    ) AS score
ON
    score.employeeid = info.employeeid;

-- 列出每個員工當前的出勤狀況(明日～兩個月內)
SELECT `time`, `date`, COUNT(*) AS record_count
FROM attendance
WHERE `date` >= DATE_ADD(CURDATE(), INTERVAL 1 day) AND `date` < DATE_ADD(CURDATE(), INTERVAL 2 MONTH)
GROUP BY `time`, `date`
ORDER BY `date`;

-- 查詢滿檔的日期時段
SET @EmployeeLimit = (SELECT COUNT(*) FROM employeeinfo);
SELECT A.time, A.date FROM
(SELECT `time`, `date`, COUNT(*) AS record_count
FROM attendance
WHERE `date` >= DATE_ADD(CURDATE(), INTERVAL 1 day) AND `date` < DATE_ADD(CURDATE(), INTERVAL 2 MONTH)
GROUP BY `time`, `date`
ORDER BY `date`) AS A
WHERE A.record_count = @EmployeeLimit;

SELECT A.time, A.date FROM 
(SELECT `time`, `date`
FROM attendance
WHERE `date` >= DATE_ADD(CURDATE(), INTERVAL 1 day) AND `date` < DATE_ADD(CURDATE(), INTERVAL 2 MONTH)
AND employeeid = ?
ORDER BY `date`) AS A   

-- 查詢有空檔的所有員工及其手上的工作天數
SELECT i.employeeid, IFNULL(b.worktime, 0) AS worktime
FROM employeeinfo AS i
LEFT JOIN (
    SELECT employeeid, COUNT(*) AS worktime FROM attendance
    GROUP BY employeeid
) AS b ON i.employeeid = b.employeeid
WHERE i.employeeid NOT IN (
    SELECT employeeid FROM attendance 
    WHERE `time` = 2 AND `date` = '2023-09-20'
)
ORDER BY IFNULL(b.worktime, 0)  LIMIT 1;