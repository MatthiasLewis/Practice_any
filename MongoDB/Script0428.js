db.getCollection("user_likes").find({"name":"mark"},{"id":1})  
db.getCollection("user_likes").find({$and:[{"fans":{$gte:200}},{"age":{$gte:30,$lt:60}}]})
db.getCollection("user_likes").find({$or:[{"fans":{$lte:100}},{"likes":{$lt:100}}]})
db.getCollection("user_likes").find({age:{$in:[25,60]}})
db.getCollection("user_likes").find({age:{$nin:[25,60]}},{"id":1})
db.getCollection("user_likes").find({likes:{$not:{$gt:100}}})
//1. 查找「name=mark」者，且只返回其ID
//2. 查找「fans>200」且「30<=age<60」者
//3. 查找「fans<=100」或「likes<100」者
//4. 查找「age=25或60」者
//5. 查找「age1不=25或60」者且只返回ID
//6. 查找「likes不大於100」者

db.chat.insertMany([{
	_id:"4-2_1",
	members: [ "Jason", "Bob" ],
	messages: [ 
		{ sender:"Jason", content:"Hello"},
		{ sender:"Bob", content:"Hi"},
		{ sender:"Jason", content:"午餐要吃什麼"},
		{ sender:"Jason", content:"吃義大利麵!?"},
		{ sender:"Bob", content:"走阿"}
	]
},
{_id:"4-2_2", members:[ "Jason", "Mary" ], messages:[]},
{_id:"4-2_3", members:[ "Bob", "Mary" ], messages:[]}]
)
//查找messages的陣列內，content部分有包含"義大利麵"之部分(正則)
db.chat.find({"messages":{$elemMatch:{"content":{$regex:"義大利麵",$options:"i"}}}})
db.chat.find({"messages":{$elemMatch:{"content":/義大利麵/}}})
//找messages的陣列內，內容(size)為0者
db.chat.find({"messages":{$size:0}})
//找出book中不分大小寫(i)，有nosql之部分
db.library.find({"book":{$regex:"nosql",$options:"i"}})
db.library.find({"book":/nosql/i})
//建立collections(user) 
db.user.insert({"name":"mark","age":23})
db.user.insert({"name":"steven","age":23})
db.user.insert({"name":"jj","age":23})
//.update( {A} , { $set:{B} }) A為搜尋條件，B為value值修改之部分 
db.user.update({"name":"mark"},{$set:{"age":18}})
//建立collections(home) 
db.home.insert({"id":1,"like":0})
//$inc 代表指定欄位進行指定數值的加/減
//.update( {A} , { $inc:{B} }) A為搜尋條件，B為數值加/減之部分 
db.home.update({"id":1},{$inc:{"like":1}}) 

db.account.insertMany([{
    "_id": "001",
    "name": "小明",
    "currency": [ 
        {
            "type": "TWD",
            "cash": 1500,
            "lastModified": ISODate("2021-01-01T12:00:00Z")
        },
        {
            "type": "USD",
            "cash": 9.99,
            "lastModified": ISODate("2021-01-02T12:00:00Z")
        }
    ]
},
{
    "_id": "002",
    "name": "小華",
    "currency": [ 
        {
            "type": "USD",
            "cash": 75.59,
            "lastModified": ISODate("2021-01-03T12:00:00Z")
        }
    ]
},
{
    "_id": "003",
    "name": "小花",
    "currency": []
}]

)

db.account.update({name:"小華","currency.type":"USD"},
{$mul:{"currency.$.cash":30},$set:{"currency.$.type":"TWD"},
$currentDate:{"currency.$.lastModified":{$type:"date"}}},{"multi":true,"upsert":false})
//$mul 代表將指定欄位之值*num  $set修改值  $currentDate設定日期時間 
//"multi=true"一次更動多筆資料  "upsert":false 默認為false，表示不存在就不插入

db.school.insertMany([{ _id: "001", studentNumber: "102418099", studentName: "小明", score: 50},
{ _id: "002", studentId: "102418098", studentName: "小華", score: 80},
{ _id: "003", studentId: "102418097", studentName: "小花", score: 120}]

)
//將"studentNumber"這個key改成"studentId"
db.school.update({"_id" : "001"},{$rename:{"studentNumber":"studentId"}})
//將score小於60者，把score變成60。
db.school.update({score:{$lt:60}},{$set:{"score":60}})
//比對所有score，將score不足60者變成60這個最大值。
db.school.update({},{$max:{"score":60}})
//新增加入fbuser
db.fbuser.insert({ "name":"mark","fans":["steven","crisis","stanly"]})
//$push 在指定欄位的list加入"jack"
db.fbuser.update({"name":"mark"},{$push:{"fans":"jack"}})
//$push 搭配 $each 可一次加入多個值 ($each 表示後方陣列內的每一個值)
//$push 搭配 $each 加入的值不會覆寫，而是「附加」。(要注意重複值)
db.fbuser.update({"name":"mark"},{$push:{"fans":{$each:["jack","lnadry","max"]}}})
//$slice:num 設定陣列中最多可放幾個值，若「num為正」代表後入的資料無法加入，若「num為負」代表最前面的資料被刪除
db.fbuser.update({"name":"mark"},{$push:{"fans":{$each:["jack","lnadry","max"],$slice:4}}})
//$addToSet 新增值進入指定陣列，但會「去除重複值」！
db.fbuser.update({"name":"mark"},{$addToSet:{"fans":{$each:["steven","jack","peter"]}}})

