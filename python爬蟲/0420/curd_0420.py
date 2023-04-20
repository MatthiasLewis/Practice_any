import pymysql

def connectsql(datab_name=None):
    if datab_name == None:
        db = pymysql.connect(host="localhost",
                             user="admin1",
                             password="123456"
                             )
        cursor = db.cursor()
    cursor.execute("show databases like 'ettoday'")
    result = cursor.fetchone()
    else:
        db = pymysql.connect(host="localhost",
                             user="admin1",
                             password="123456",
                             database=datab_name)
    return db

def createdatabase(datab_name,db):
    n1 = str(datab_name)
    cursor = db.cursor()
    cursor.execute(f"show databases like {n1}")
    result = cursor.fetchone()
    if result is None:
        cursor.execute(f"create database {n1}")
    else:
        ans = input(f"名稱重複，即將刪除原本的{n1},是否繼續(Y/n)：")
        if ans == "n" :
            return
        cursor.execute(f"drop database {n1}")
        cursor.execute(f"create database {n1}")

def createtable(table_name,db,avg_all_title):
    cursor = db.cursor()
    create_t = f"create table {table_name} "+str(avg_all_title)
    cursor.execute(create_t)
    db.commit()
    
def inserttable(title,content,db):
    cursor = db.cursor()
    insert_table = "insert into news  values (%s,%s)"
    a = content[:254]
    table_value = (str(title),str(a))
    cursor.execute(insert_table,table_value)
    db.commit()

def close(db):
    db.close()

def output(cur):
    cur.execute("select * from news")
    result = cur.fetchall()
    for i in result:
        print(i)

    
