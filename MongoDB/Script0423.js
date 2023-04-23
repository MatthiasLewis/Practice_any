show dbs   //顯示所有db
use mongo_class   //創建db或選擇使用之db
show collections   //顯示所有table
db.students.count()    //顯示table的資料筆數
db    //顯示當前db
db.students.drop()   //刪除指定table
db.dropDatabase()   //刪除當前整個db
db.students.insert({})   //insert單項
db.students.insertMany({})  //insert多項
db.students.find({})            //找到指定table下的所有項目，可指定
db.students.update({"profile.id":"108418005"},{$set:{profile:{name:"林林林",id:"123456789"}}})   
//將指定id的資料重新設定為新的內容(會覆寫原內容)
db.students.remove({"profile.id":"108418006"})   //將指定id的資料刪除
use testing
db.getCollection("test_data").find({class:{$eq:"A"}}) //選擇table"teat_data"並查找class="A"的。
db.getCollection("test_data").find({class:"A"})    //選擇table"teat_data"並查找class為"A"的
db.getCollection("test_data").find({weight:{$lt:60}})   //選擇table"teat_data"並查找weight小於60的
db.getCollection("test_data").find({name:{$nin:["Chad","Ethan"]}})
//選擇table"teat_data"並查找name中$nin(不包含)["Chad","Ethan"]的
//一次包含多項條件時，可用[]包住使用
db.getCollection("test_data").find({$and:[{score:{$gte:80}},{weight:{$lt:80}}]})
//選擇table"teat_data"並查找score在80以上且weight小於80的
db.getCollection("test_data").find({$nor:[{class:"B"},{weight:{$lt:50}}]})
//選擇table"teat_data"並查找class不為B且weight不小於50的
//$and:{條件一},{條件二}... /  $not:{條件一} (只能一項)  
//$or:{條件一},{條件二}...(符合其一即可)  /  $nor:{條件一},{條件二}...(不為A且不為B)
db.getCollection("test_data").find({class:{$exists:false}})
//選擇table"teat_data"並查找class欄不存在者
db.getCollection("test_data").find({$and:[{class:{$exists:true}},{class:{$in:["B","C"]}}]})
//選擇table"teat_data"並查找同時符合「class欄存在」且「class值在"B"及"C"之中」的
//exists:true/false表示存在與否 / "欄位":{$type: BSON格式} (指定欄位中type為指定類型者)
//$all 用於查找value值為陣列之欄位，尋找符合所有指定條件者
//$elemMatch 用於查找value值為陣列之欄位，尋找符合至少其一指定條件者

db.getCollection("test_data").find({score:{$not:{$gt:78}}})
//在test_data下查找「score不大於($gt)78分者」
db.getCollection("test_data").find({$and:[{class:{$in:["A","C"]}},{score:{$lte:90,$gte:60}}]})
//在test_data下查找「score大於等於($gte)60分且小於等於($lte)90分」而且「class為A或C班其一」
db.library.insertMany([{
	_id:"4-1_1",
	book:"實用英文會話",
	price:299.0, authors: ["Jason", "hhhhh", "Bob"],
	borrower:{
		name:"王小明",
		timestamp:ISODate("2015-07-23T12:00:00Z")
	}
},
{
	_id:"4-1_2",
	book:"七天學會大數據資料庫處理－NoSQL:MongoDB入門與活用",
	price:360.0, authors: ["黃小嘉"],
	borrower:{name:"王小明", timestamp:ISODate("2015-07-24T12:30:00Z")}
},
{
	_id:"4-1_3",
	book:"日本環球影城全攻略",
	price:280, authors: ["Jason", "Mary", "Bob"]
}]
)

db.getCollection("library").find({price:{$lt:300}})  
db.getCollection("library").find({$or:[{authors:{$all:["Bob","hhhhh"]}},{borrower:{$exists:true}}]})
db.library.update({"book":"實用英文會話"},{$set:{"book":"英文大會話"}}) 
db.library.update({"_id":"4-1_2"},{$set:{"authors":["黃小嘉","kim","hihi"]}})   
db.library.updateOne({"_id":"4-1_2"},{$set:{"authors":"黃小嘉"}}) 
//1. 在library中查找price小於300者
//2. 在library中查找「作者有"Bob","hhhhh"」或者「borrower項是存在者」
//3. 在library中更新"_id"="4-1_2"者的作者
//4. 在library中更新"_id"="4-1_2"者的作者(會覆寫原資料)


db.table.find({"name":"AAA"},{"weight":1}) //尋找指定條件，並只返回後一項條件之部份(1為返回/0為不返回)
db.table.find().limit(1)  //顯示指定數量的前幾筆資料
db.table.find().skip(3)   //跳過指定幾筆資料
db.table.find.sort({age:1})   //指定特定欄位，並依此欄位進行排序(1為由小到大/-1為由大到小)

db.user_likes.insertMany([{"id":"1","name":"mark","age":25,"fans":100,"likes" : 1000},
{"id":"2","name":"steven","age":35,"fans":220,"likes" : 50},
{"id":"3","name":"stanly","age":30,"fans":120,"likes" : 33},
{"id":"4","name":"max","age":60,"fans":500,"likes" : 1000},
{"id":"5","name":"jack","age":30,"fans":130,"likes" : 1300},
{"id":"6","name":"crisis","age":30,"fans":130,"likes" : 100},
{"id":"7","name":"landry","age":25,"fans":130,"likes" :
100}]
)
db.getCollection("user_likes").find({"name":"mark"},{"id":"1"})  
db.getCollection("user_likes").find({$and:[{"fans":{$gt:200}},{"age":{$gte:30,$lt:60}}]})
db.getCollection("user_likes").find({$or:[{"fans":{$lte:100}},{"likes":{$lt:100}}]})
db.getCollection("user_likes").find({age:{$in:[25,60]}})
db.getCollection("user_likes").find({age:{$in:[25,60]}},{"id":"1"})
db.getCollection("user_likes").find({likes:{$not:{$gt:100}}})
//1. 查找name=mark者，且只返回其ID
//2. 查找「fans>200」且「30<=age<60」者
//3. 查找「fans<=100」或「likes<100」者
//4. 查找「age=25或60」者
//5. 查找「age=25或60」者且只返回ID
//6. 查找「likes不大於100」者




  
