document.write("<h2>hello world<h2>");
console.log("hello world")
let price=document.getElementById("price").textContent;
let discount=0.8;
let fee=30;
let total=price * discount + fee;
function total_1(price,discount,total){
  if(total>200){
    console.log("expensive,the total is : $"+ total)
    return "expensive,the total is : $"+ total
} else if(total<100){
   console.log("cheap,the total is : $"+ total)
   return "cheap,the total is : $"+ total
} else{
   console.log("the total is : $"+total)
   return "the total is : $"+total
};
}
document.write(total_1(price,discount,total));
document.write("<br>");
var new_obj = new Object();
new_obj["name"] = "賀爾蒙少年";
new_obj.date = "2023-05-22";
new_obj.price = "1600";
document.write(new_obj["name"]+"<br>"+new_obj.date+"<br>");

let bandArr = ["One Ok Rock", "麋先生", "告五人"];
bandArr.push("五月天");
//(array)下方的i為index數字，從0開始直到結束
for ( i in bandArr){
    document.write(bandArr[i]);
};
document.write("<br>")
//(object)下方i為key值，Object[i]為value值
for ( i in new_obj){
    document.write(i);
    document.write(new_obj[i]+"<br>");
};
//將object取出的key集合轉為一個array，並用forEach迴圈取值
Object.keys(new_obj).forEach((key)=>{
    document.write(key+"<br>");
});

