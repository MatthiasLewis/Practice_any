import json

def load(file_name):
  f_list=[]
  with open (file_name,"r") as f1:
    f2=f1.readlines()
    print(f2)
  for i in f2:
    f_list.append(json.loads(i))
    print(f_list)
  return f_list

def write_j(t_total,l_avg,file_out):
  a1={"總分":t_total,"平均":l_avg}
  with open(file_out,"w") as f_out:
    dict1=json.dumps(a1,ensure_ascii=False)
    f_out.write(dict1)


def open_data(file_j):
  with open(file_j,"r") as data_num:
    data_file=[]
    data_file=json.load(data_num)
  print(data_file)
  return data_file

def catch_key(n):
  for t in n:
    print("民國91年人數"+t["民國91年"])

    
  



