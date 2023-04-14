'''
輸入5個學生的name number score, 並印出平均 最高分 最低分
如果不及格者過半，則逐一加分，直到不及格者未過半
'''
stu_1={"name":"Tom","number":"0101","score":70}
stu_2={"name":"Mei","number":"0102","score":55}
stu_3={"name":"Sue","number":"0103","score":35}
stu_4={"name":"Jay","number":"0104","score":90}
stu_5={"name":"Ben","number":"0105","score":20}
a_class=[stu_1,stu_2,stu_3,stu_4,stu_5]
x=0
score_2=0
sc_1=[]

for v in a_class:
  score_2=score_2+v["score"] #總分
  sc_1.append(v["score"])
  if v["score"]<60: #如果分數小於60，x計次+1
    x=x+1
#list.sort(key=lambda k: (k.get('XXX', 0)))可排序list中的dict
for i in a_class: #判斷不及格是否過半
  if x > len(a_class)//2 and i["score"]<60: #若不及格過半且當前分數小於60，則加分到60
    i["score"]=i["score"]+(60-i["score"])
    x=x-1  #加完x-1次

print("平均:",score_2//len(a_class),"最高分:",max(sc_1),"最低分:",min(sc_1))
print(a_class)