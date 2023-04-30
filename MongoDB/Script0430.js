//.update( {} , {$pop:{A}} ) 可刪除陣列中「指定數量」的內容
db.fbuser.update({"name":"mark"},{$pop:{"fans":1}})
//.update( {} , {$pull:{A}} ) 可刪除陣列中「指定」的內容
db.fbuser.update({"name":"mark"},{$pull:{"fans":"crisis"}})
//將score大於100者，把score變成100
db.school.update({"score":{$gt:100}},{$set:{"score":100}})
//新增一個number_group並放入內容
db.number_group.insert({_id:"001",list:[30,40,50]})
//$push 在list加入80
db.number_group.update({"_id":"001"},{$push:{"list":80}},{multi:true,upsert:false})
//$push+$each 在list一次放入多個值
db.number_group.update({"_id":"001"},{$push:{"list":{$each:[60,60,70]}}},{multi:true,upsert:false})
//$pop 刪除list陣列中的1個內容(1從最後一項開始刪)(-1從第一項開始刪)
db.number_group.update({"_id":"001"},{$pop:{"list":1}})
//建立drink
db.drink.insertMany([{ _id: "001", product: "日月潭紅茶", type: "tea", price: {M:20,L:30}, sold:0, log:[] },
{ _id: "002", product: "金鑽鳳梨綠", type: "fruit", price: {M:40,L:50}, sold:0, log:[] },
{ _id: "003", product: "黑糖粉圓鮮奶", type: "tea latte", price: {M:50,L:65}, sold:0, log:[] }]
)
//每賣出一個指定品項，sold就增加指定銷售金額，並在log中加入「時間」及「品項」
//Date.now()會生出一串數字時間戳 new Date()會生出"2023-04-30T02:26:31.389+0000"這類格式
db.drink.update({"product" : "日月潭紅茶"},{$inc:{"sold":20},$push:{"log":{time:Date.now(),size:"M"}}})
db.drink.update({"product" : "金鑽鳳梨綠"},{$inc:{"sold":40},$push:{"log":{time:new Date(),size:"M"}}})
db.drink.update({"product" : "黑糖粉圓鮮奶"},{$inc:{"sold":60},$push:{"log":{time:new Date(),size:"L"}}})
//新建contacts
db.contacts.insertMany([{_id:"4-9_01", name:"江小于", age:22, phone:"0967-481-146"},
{_id:"4-9_02", name:"穆小蓉", age:18, phone:"0989-153-149"},
{_id:"4-9_03", name:"陳小昇", age:24, phone:"0955-581-064"},
{_id:"4-9_04", name:"傅小彰", age:25, phone:"0967-058-845"},
{_id:"4-9_05", name:"廖小健", age:28, phone:"0989-758-138"},
{_id:"4-9_06", name:"陳小翰", age:31, phone:"0989-051-129"},
{_id:"4-9_07", name:"鄭小瀚", age:27, phone:"0967-984-852"},
{_id:"4-9_08", name:"梁小瑋", age:21, phone:"0989-748-913"},
{_id:"4-9_09", name:"陳小鴻", age:22, phone:"0955-685-846"},
{_id:"4-9_10", name:"陳小豪", age:20, phone:"0955-648-843"}]
)
//查找contacts中 name姓陳且phone開頭為0955者 並依年齡「小到大(1)」排序
db.contacts.find({"name":/^陳*/,"phone":/^0955*/}).sort({"age":1})
//建立agg
db.agg.insert({"id" : 1 ,"name" : "mark","age" : 20,
"assets" : 100000000 })
db.agg.insert({"id" : 2, "name" : "steven", "age" : 40,
"assets" : 1000000 })
//aggregate( [ {} ] ) 聚合操作搜尋
//$project:{A:1} 選擇要顯示或不顯示的資料
db.agg.aggregate([{$project:{"id":1,"name":1,"_id":0}}]) 
//$match:{} 篩選出所需的資料
db.agg.aggregate([{$match:{age:{$gt:10,$lte:30}}}])
//建立ox
db.ox.insert({"id" :1 , "status" : "o" , "count" : 5})
db.ox.insert({"id" :2 , "status" : "o", "count" : 5})
db.ox.insert({"id" :3 , "status" : "o", "count" : 5})
db.ox.insert({"id" :4 , "status" : "x", "count" : 10})
db.ox.insert({"id" :5 , "status" : "x", "count" : 10})
db.ox.insert({"id" :6 , "status" : "x", "count" : 11})
//$group:{"_id":"$A"} 群組化，"_id"為一種故定用法，_id後的$A，代表群組化的主依據項
db.ox.aggregate([{$group:{"_id":"$status"}}])
//$group:{"_id":"$A" , B } 群組化，$A代表群組化的主依據項 B代表群組化後要執行的動作(設total項，動作為加總$count)
db.ox.aggregate([{$group:{"_id":"$status","total":{$sum:"$count"}}}])
//$group:{ "_id":{"a":"$A" , "b":"$B" } } 群組化，依據$A跟$B進行分組
db.ox.aggregate([{$group:{"_id":{"a":"$status","b":"$count"}}}])
//建立agg2
db.agg2.insert({"name" : "mark",
"fans" : [
{"name" : "steven","age":20},
{"name" : "max","age":60},
{"name" : "stanly","age":30}
]})
//$unwind 在查看索引中，可以把陣列依欄位拆開成多筆資料(不影響原始資料)
db.agg2.aggregate([{$unwind:"$fans"}])
//建立agg3
db.agg3.insert({"name" : "mark", "age" : 18})
db.agg3.insert({"name" : "steven", "age" : 38})
db.agg3.insert({"name" : "max", "age" : 10})
db.agg3.insert({"name" : "stanlly", "age" : 28})
//在聚合查詢中進行排序
db.agg3.aggregate([{$sort:{"age":1}}])
//在聚合查詢中限制出現的筆數只能有2筆
db.agg3.aggregate([{$limit:2}])
//在聚合查詢中跳過前3筆資料
db.agg3.aggregate([{$skip:3}])

db.agg4.insert({ "id" : 1,"name" : "mark","age" : 20,"sex" : "M", "fans"
: [{"name" : "steven"},{"name" : "max"}],"phone" : "xxxxx"})
db.agg4.insert({ "id" : 2,"name" : "steven", "age" : 40,"sex" :
"M","fans" : [{"name" : "mark"},{"name" : "max"}],"phone" : "xxxxx"})
db.agg4.insert({ "id" : 3,"name" : "marry","age" : 30,"sex" : "S", "fans"
: [{"name" : "mark"},{"name" : "max"},{"name" : "jack"}], "phone" :
"xxxxx"})
db.agg4.insert({ "id" : 4,"name" : "jack","age" : 21,"sex" : "M","fans" :
[{"name" : "mark"}],"phone" : "xxxxx" })
//在agg4中，查找姓別為M者中，年齡第二小的人
db.agg4.aggregate([{$match:{sex:"M"}},{$sort:{"age":1}},{$limit:2},{$skip:1}])

//建立order
db.order.insertMany([{ "class" : "1", "price" : 10,"count" : 180},
{ "class" : "1" ,"price" : 10,"count" : 350},
{ "class" : "2" ,"price" : 10,"count" : 90},
{ "class" : "2" ,"price" : 10,"count" : 320},
{ "class" : "2" ,"price" : 10,"count" : 150}])
//用.mapReduce()書寫JS邏輯的聚合搜尋物件
//.mapReduce( map,reduce , {out、query、sort、limit、finalize、scope}) 共3大部分，詳如下:
//1. map：以函式的方式計算，並用emit(k,v)回傳Key值當成群組化主依據項，並將生成的values陣列當成參數送入reduce的函式中
//2. reduce: 以函式的方式進行群組化要執行的動作，或要顯示的項目
//3. {...}: 最後一個大括號內包含多項數值，不一定都要使用詳細如下：
//3-1. {out:".." }：表示將map中的k及reduce的回傳結果輸出並生成到指定"name"的collection中，並可使用.find()顯示
//3-2. {query:...}: 有此的話，可在執行map前，先進行資料的篩選
//3-3. {sort:...}: 有此的話，可在執行map前，先進行資料的排序
//3-4. {limit:...}: 有此的話，可在執行map前，先限制資料顯示的數量
//3-5. {finalize:...}: 有此的話，可指定一個key，將reduce回傳的值處理後放入相同key的out collection下
//3-6. {scope:...}: 可在js中使用變數
var result = db.order.mapReduce(
function(){
    var total=this.price * this.count
    emit(this.class,total)    
},function(key,values){
    var total=0;
    for(var i=0;i<values.length;i++){
        total+= values[i];}
    return total;
},{out:"mapReduceTest"}
)
db.mapReduceTest.find()
    
db.order_2.insertMany([{ "class" : "1", "price" : 10,"count" : 180},
{ "class" : "1" ,"price" : 10,"count" : 350},
{ "class" : "2" ,"price" : 10,"count" : 90},
{ "class" : "2" ,"price" : 10,"count" : 320},
{ "class" : "2" ,"price" : 10,"count" : 150},
{ "class" : "3" ,"price" : 10,"count" : 100},
{ "class" : "3" ,"price" : 10,"count" : 200},
{ "class" : "3" ,"price" : 10,"count" : 300}])
//以mapReduce聚合方式生成一個collection(似view)
var result = db.order_2.mapReduce(
function(){                        //map：k的指定及v的計算生成
    var total=this.price * this.count    //v為price*count
    emit(this.class,total)      //返回k=this.class  / v=total
},function(key,values){   //依據指定之k分群，並將v=total當成參數放入
    var total=0;     //設一個變數total
    for(var i=0;i<values.length;i++){    //依序取v=total陣列中之值
        total+= values[i];}   
    return total;   //將最後生成之值回傳給out
},{out:"test",  //輸出並生成一個collection，接收map指定之k及reduce之回傳結果
query:{class:{$in:["2","3"]}},   //指定在map前先篩選，k.class指定為class=2或3者
finalize:function(key,reduceVal){   //將reduce之回傳結果處理後，回傳到out:"test"下相同key下成為新的v
    reduceVal= reduceVal +"dollar";
    return reduceVal;
}}) 
db.test.find()  //顯示out:"test"


//建立tests
db.tests.insert({"x":"hello"})
//.ensureindex( {} )建立索引
db.tests.ensureIndex({"x":1})
//.ensureindex({ A , B... })可建立組合索引
for(var i=0;i<100000;i++){db.abc.insert({"x":i})}
db.abc.ensureIndex({"x":1})   //為abc之"x"建立單一索引
for(var i=0;i<100000;i++){db.abc_1.insert({"x":i})}
//"executionTimeMillis" : 68.0  建立索引者之運行時間 (單位毫秒)
db.abc.find({"x":{$gt:50000}}).sort({"x":-1}).explain("executionStats")
//"executionTimeMillis" : 86.0 未建立索引者之運行時間 (單位毫秒)
db.abc_1.find({"x":{$gt:50000}}).sort({"x":-1}).explain("executionStats")
//建立user_1
db.user_1.insertMany([{ "name" : "mark00" , age:20 },
 { "name" : "mark01" , age:25 },
 { "name" : "mark02" , age:10 } ,
{ "name" : "mark03" , age:18 } ,
{ "name" : "mark04" , age:26 },
 { "name" : "mark05" , age:40 }, 
{ "name" : "mark06" , age:51 } ,
{ "name" : "mark07" , age:20 } ,
{ "name" : "mark08" , age:51 } ,
{ "name" : "mark00" , age:30 } ,
{ "name" : "mark00" , age:100 }])
//建立user_2
db.user_2.insertMany([{ "name" : "mark00" , age:20 },
 { "name" : "mark01" , age:25 },
 { "name" : "mark02" , age:10 } ,
{ "name" : "mark03" , age:18 } ,
{ "name" : "mark04" , age:26 },
 { "name" : "mark05" , age:40 }, 
{ "name" : "mark06" , age:51 } ,
{ "name" : "mark07" , age:20 } ,
{ "name" : "mark08" , age:51 } ,
{ "name" : "mark00" , age:30 } ,
{ "name" : "mark00" , age:100 }])
//建立組合索引時，若能以int為首要索引存取，可節省內存空間，加快搜尋效率
db.user_1.ensureIndex({"name":1,"age":1}) 
db.user_2.ensureIndex({"age":1,"name":1}) 
db.user_1.find({"name":"mark00"}).sort({"age":1})
db.user_2.find({"name":"mark00"}).sort({"age":1})






