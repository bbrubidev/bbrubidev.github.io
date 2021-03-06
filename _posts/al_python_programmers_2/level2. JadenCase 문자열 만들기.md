---
title: Python _ Lv2. JadenCase 문자열 만들기
date: 2017-08-30
tags:
- algorithm
- python
---

### 문제 설명

> Jaden_Case함수는 문자열 s을 매개변수로 입력받습니다. s에 모든 단어의 첫 알파벳이 대문자이고, 그 외의 알파벳은 소문자인 문자열을 리턴하도록 함수를 완성하세요. 예를 들어 s가 "3people unFollowed me for the last week"라면 "3people Unfollowed Me For The Last Week"를 리턴하면 됩니다.

[문제 보러가기](https://programmers.co.kr/learn/challenge_codes/134)

<br>

### 내 코드

#### 방식 1

문자열을 먼저 소문자로 모두 바꾼다. 그리고 단어 별로 리스트에 삽입한 후  반복문을 사용하여 단어의 첫글자만 대문자로 변경한다. 그리고 결과 리스트에 다시 넣어 문장으로 리턴한다.

```python   
"""
JadenCase 문자열 만들기
"""

def Jaden_Case(s):
    low_s = s.lower()
    a = low_s.split()
    result = []
    for i in a:
        p = i[0].upper()
        words = p + i[1:]
        result.append(words)

    sen = " ".join(result)
    return sen


# 아래는 테스트로 출력해 보기 위한 코드입니다.
print(Jaden_Case("3people unFollowed me for the last week"))
# 3people Unfollowed Me For The Last Week
```

<br>

#### 방식 2

위의 방식에서는 2개의 리스트를 사용하였다. 입력받은 문장을 단어 단위로 쪼갠 리스트와 첫글자를 대문자로 변환하는 처리가 된 후의 단어를 넣는 리스트이다.  좀 더 간결하게 코드 리펙토링을 하여 리스트를 하나만 사용하면서 변환된 단어로 대체하는 방식으로 코드를 작성하였다.

```python
def Jaden_Case(s):
    low_s = s.lower()
    a = low_s.split()

    for i in range(len(a)):
        words = a[i][0].upper() + a[i][1:]
        a[i], words = words, a[i]
    result = " ".join(a)
    return result

# 아래는 테스트로 출력해 보기 위한 코드입니다.
print(Jaden_Case("3people unFollowed me for the last week"))
# 3people Unfollowed Me For The Last Week
```

<br>

#### 방식 3

파이썬의 내장함수인 `title()`을 사용하여 자동으로 단어의 첫글자만 대문자로 바꿔주게 처리하였다. 이 때 `3People`과 같이 예외상황이 발생하므로 이 경우에는 첫글자가 숫자인지 판별하여 숫자일 경우 2번째 오는 문자를 소문자로 바꿔주는 처리를 추가해주었다.

```python
def Jaden_Case(s):
    p = s.title()
    l = p.split()
    for i in range(len(l)):
        if l[i][0].isdigit():
            a =  l[i][0] + l[i][1:].lower()
            a, l[i] = l[i], a
            return " ".join(l)


# 아래는 테스트로 출력해 보기 위한 코드입니다.
print(Jaden_Case("3people unFollowed me for the last week"))
# 3people Unfollowed Me For The Last Week
```

<br>
