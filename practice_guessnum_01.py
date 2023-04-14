import random

print("來玩比大小")
your_num=int(input("請輸入你的數字(1~100):"))
num_1=random.randint(0,100)
if your_num==num_1:
  print("可惜，只是平手")
elif your_num>num_1:
  print("恭喜你贏了")
else:
  print("可惜，你輸了")