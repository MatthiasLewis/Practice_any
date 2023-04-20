import pymysql

scorelist = [40,60,70,90]
db = pymysql.connect(host="localhost",
                     user="admin1",
                     password="123456")
cursor = db.cursor()
cursor.execute("show databases like 'NTC'")
result = cursor.fetchone()

if result is None:
     cursor.execute("create database NTC")
else:
     cursor.execute("drop database NTC")
     cursor.execute("create database NTC")
db.close()

db = pymysql.connect(host="localhost",
                     user="admin1",
                     password="123456",
                     database="NTC"
                     )
cursor_1 = db.cursor()
cursor_1.execute("create table score (name varchar(255),value varchar(255))")

x = 1
for i in scorelist:
    if i <60:
        continue
    insert_score = "insert into score (name,value) values (%s,%s)"
    score_str = (str(x),str(i))
    cursor_1.execute(insert_score,score_str)
    db.commit()
    x+=1
cursor_1.execute("select * from score")
a = cursor_1.fetchall()
for y in a:
    print(y)
    
