import cal
import load

student_of_class = load.load("input.json")

for i in student_of_class:
  a=int(input("key score: "))
  i["score"]=a

t_score=cal.total(student_of_class)
avg=cal.average(t_score,len(student_of_class))

print(t_score,avg)

load.write_j(t_score,avg,"output.json")

data_1=load.open_data("opendata.json")
load.catch_key(data_1)
