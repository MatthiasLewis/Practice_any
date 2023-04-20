import pymysql

db = pymysql.connect(host="localhost",
                     user="????",
                     password="?????")

cursor = db.cursor()
cursor.execute("select version()")
data = cursor.fetchone()

print("The version is :",str(data))

db.close()

