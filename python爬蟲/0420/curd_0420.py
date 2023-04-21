import pymysql

def connectsql(db_name=None,host="localhost",user="admin1",password="123456"):
    if db_name != None:
        db = pymysql.connect(host=f"{host}",
                             user=f"{user}",
                             password=f"{password}",
                             database=f"{db_name}")
        cursor = db.cursor()
        cursor.execute("show databases like %s",db_name)
        result = cursor.fetchone()
        while result is None:
            db.close()
            return
        return db
    elif db_name == None:
        db = pymysql.connect(host=f"{host}",
                             user=f"{user}",
                             password=f"{password}"
                             )
        cursor = db.cursor()
        return db

def createdatabase(name,fun1):
    cursor = fun1.cursor()
    cursor.execute("show databases like %s",name)
    result = cursor.fetchone()
    if result is None:
        cursor.execute(f"create database {name}")
    else:
        ans = input(f"名稱重複，即將刪除原本的{name},是否繼續(Y/n)：")
        if ans == "n" :
            return
        elif ans == "Y":
            cursor.execute(f"drop database {name}")
            cursor.execute(f"create database {name}")

def createtable(name,fun1,arg):
    cursor = fun1.cursor()
    create_t = f"create table {name} "
    table_set = tuple(arg)
    create_t = create_t + f"{table_set}".replace("'","")
    cursor.execute(create_t)
    fun1.commit()
    return name
    
def inserttable(name,fun1,arg):
    cursor = fun1.cursor()
    insert_table = "insert into news values "
    tuple_table = tuple(arg)
    insert_table = insert_table + f"{tuple_table}"
    cursor.execute(insert_table)
    fun1.commit()

def close(fun1):
    fun1.close()

def output(name,fun1):
    cursor = fun1.cursor()
    cursor.execute(f"select * from {name}")
    result = cursor.fetchall()
    for i in result:
        print(i)

    
