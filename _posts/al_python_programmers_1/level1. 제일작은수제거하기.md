---
title: Python _ Lv1. 제일 작은수 제거하기
date: 2017-06-01
tags:
  - algorithm
  - python
---

### 문제 설명

> rm_small함수는 list타입 변수 mylist을 매개변수로 입력받습니다.
mylist 에서 가장 작은 수를 제거한 리스트를 리턴하고, mylist의 원소가 1개 이하인 경우는 []를 리턴하는 함수를 완성하세요.
예를들어 mylist가 [4,3,2,1]인 경우는 [4,3,2]를 리턴 하고, [10, 8, 22]면 [10, 22]를 리턴 합니다.

### 내 코드

```python
def rm_small(mylist):
	return [i for i in mylist if i > min(mylist)]

my_list=[4, 3, 2, 1]
print('결과 {} ".format(rm_small(my_list)))
```

### 타인의 코드

```python
def rm_small(mylist):
    # 함수를 완성하세요
    mylist.remove(min(mylist))
    return mylist

# 아래는 테스트로 출력해 보기 위한 코드입니다.
my_list = [4,3,2,1]
print("결과 {} ".format(rm_small(my_list)))
```

```python
def rm_small(mylist):
    # 함수를 완성하세요
    lowest_num_idx = 0
    for i in range(len(mylist) - 1):
        if mylist[lowest_num_idx] > mylist[i + 1]:
            lowest_num_idx = mylist.index(mylist[i + 1])

    del mylist[lowest_num_idx]
    return mylist


# 아래는 테스트로 출력해 보기 위한 코드입니다.
my_list = [4, 3, 2, 1]
print("결과 {} ".format(rm_small(my_list)))
```
