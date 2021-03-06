---
title: Python _ Lv1. 문자열 내맘대로 정렬하기
date: 2017-06-12
tags:
  - algorithm
  - python
---

### 문제 설명

> strange_sort함수는 strings와 n이라는 매개변수를 받아들입니다.
strings는 문자열로 구성된 리스트인데, 각 문자열을 인덱스 n인 글자를 기준으로 정렬하면 됩니다.

> 예를들어 strings가 ["sun", "bed", "car"]이고 n이 1이면 각 단어의 인덱스 1인 문자 u, e ,a를 기준으로 정렬해야 하므로 결과는 ["car", "bed", "sun"]이 됩니다.
strange_sort함수를 완성해 보세요.

### 내 코드

```python
def strange_sort(strings, n):
    '''strings의 문자열들을 n번째 글자를 기준으로 정렬해서 return하세요'''
    return sorted(strings, key=lambda strings:strings[n])


# 아래는 테스트로 출력해 보기 위한 코드입니다.
print( strange_sort(["sun", "bed", "car"], 1) )
```

<br>

### 타인의 코드

x의 n번째 문자열을 키값으로, x문자열 자체를 value값으로 가지는 dictionary를 선언하고 x의 n번째 문자열만 가지는 list를 각각 선언한 뒤, list를 정렬한다.

선언한 딕셔너리에서 x의 value값을 가져와서 리턴하면 순서대로 정렬된 리스트가 반환된다.

```python
def strange_sort(strings, n):
    '''strings의 문자열들을 n번째 글자를 기준으로 정렬해서 return하세요'''
    dict1 = {x[n]:x for x in strings}
    list1 = [x[n] for x in strings]
    list1.sort()
    return [dict1[x] for x in list1]

# 아래는 테스트로 출력해 보기 위한 코드입니다.
print( strange_sort(["sun", "bed", "car"], 1) )
```

itemgetter 함수를 사용하여 key값을 n을 기준으로 value 찾음

```python
from _operator import itemgetter

def strange_sort(strings, n):
    '''strings의 문자열들을 n번째 글자를 기준으로 정렬해서 return하세요'''

    return sorted(strings, key=itemgetter(n))


# 아래는 테스트로 출력해 보기 위한 코드입니다.
print( strange_sort(["sun", "bed", "car"], 1) )
```

<br>

n번째 문자를 기준으로 정렬해야하므로 n번째 문자를 원래 단어에 붙여서 정렬한 뒤 1번째부터 슬라이스한 값만 반환하였다.

```python
def strange_sort(strings, n):
    a = [i[n]+i for i in strings]
    a.sort()
    return [i[1:] for i in a]

# 아래는 테스트로 출력해 보기 위한 코드입니다.
print( strange_sort(["sun", "bed", "car"], 1) )
```
