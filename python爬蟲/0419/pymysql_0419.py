import pymysql

db = pymysql.connect(host="localhost",
                     user="root",
                     password="k4946872")

cursor = db.cursor()
cursor.execute("select version()")
data = cursor.fetchone()

print("The version is :",str(data))

db.close()

