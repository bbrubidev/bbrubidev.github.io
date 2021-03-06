---
title: Python _ Lv2. 가장 긴 펠린드롬
date: 2017-11-03
tags:
- algorithm
- python
---

### 문제 설명

> 앞뒤를 뒤집어도 똑같은 문자열을 palindrome이라고 합니다.
longest_palindrom함수는 문자열 s를 매개변수로 입력받습니다.
s의 부분문자열중 가장 긴 palindrom의 길이를 리턴하는 함수를 완성하세요.
예를들어 s가 "토마토맛토마토"이면 7을 리턴하고 "토마토맛있어"이면 3을 리턴합니다.


<a href="https://programmers.co.kr/learn/challenge_codes/85" target="_blank">문제 보러가기</a>

<br>

## 코드 및 풀이

처음에는 반복문으로 가능한 경우의 수를 하나하나 나눠서 생각했다. (정렬에 대한 기반이 약해서 이러지 않았나 싶다.)

이중 반복문을 사용했는데, 비교할 부분문자열 범위를 잘 생각해봐야 한다. 먼저 인자로 받은 **문자열 `s`를 반대로 나열한 `rs`**를 만든다.

`s` 문자열에 대하여 반복문을 돌면서 한 글자 이상의 부분문자열 슬라이스가 `rs`에 있으면 해당 문자열의 길이를 `result` 리스트에 저장한다. 그 후 `result` 리스트를 정렬하여 최대 길이를 반환한다.


```python
def longest_palindrom(s):
    rs = s[::-1]
    ls = len(s)
    result = []

    for i in range(ls+1):
        for j in range(ls+1):
            t = s[i:ls-j]
            if len(t) > 1 and t in rs:
                result.append(len(t))

    return sorted(result)[-1]

print(longest_palindrom("토마토맛있어토마토마토")) # 5
print(longest_palindrom("토마토맛있어")) # 3
print(longest_palindrom("토마토마토마토")) # 7
print(longest_palindrom("맛있어토마토")) # 3
print(longest_palindrom("맛있어토마토네")) # 3
```

위의 코드는 다음과 같은 문자열 비교 관련 파이썬 문법을 사용하였다.

```python
a = "토마토마토"
b = "어있맛토마토마토"
if a in b:
    print(True)
else:
    print(False)

# True
```

또, 빈문자열이나 길이가 1인 문자도 함께 제외시켜 리스트에 포함되지 않도록 했다.

<br>

리펙토링으로 줄인 코드는 다음과 같다.

```python
def longest_palindrom(s):
    rs = s[::-1]
    ls = len(s)

    result=[len(s[i:ls-j]) for i in range(ls+1) for j in range(ls+1) if s[i:ls-j] in rs and (len(s[i:ls-j]) > 1)]
    return sorted(result)[-1]
```

사실 이 문제는 재귀로 푸는 것이 가장 쉽다..

<br>

## 다른 방식의 코드 및 풀이

재귀로 푼 코드를 보자.

먼저 인덱싱을 통해 거꾸로 만든 문자열이 원래 문자열과 같으면 `s` 길이를 리턴하는 것으로 종료조건을 설정한다.

`s`의 마지막 글자부터 하나씩 슬라이스하는 재귀함수와, s의 첫 글자부터 하나씩 슬라이스하는 재귀함수 값 중 일치하는 것(종료조건 적용)의 최대길이를 `max()`로 찾았다.


```python
def longest_palindrom(s):
    if s[::-1] == s:
        return len(s)

    return max(longest_palindrom(s[:-1]), longest_palindrom(s[1:]))
```

매우 간단하지 않은가?

<br>

다음 코드는 파이썬에서 제공하는 `difflib` 라이브러리에서 해시 가능한 값이면 자료형에 상관없이 순서비교가 가능한 `SequenceMatcher`를 사용해 푼 방식이다.

```python
from difflib import SequenceMatcher as SM

def longest_palindrom_3(s):
    return SM(None, s, s[::-1]).find_longest_match(0, len(s), 0, len(s)).size

print(longest_palindrom("토마토맛있어토마토마토")) # 5
```

`SequenceMatcher`에 대해 간략히 정리해보면 다음과 같다.

더 자세한 사항은 <a href="https://docs.python.org/3.6/library/difflib.html" target="_blank">파이썬 3.6 문서 - difflib</a>을 참고하면 된다.

```python
from difflib import SequenceMatcher as SM

# 첫 번째 인자값은 isjunk로, 무시할 값이 있으면 여기에 설정한다.
# 보통 None으로 설정하며, lambda x: 0;과 같은 뜻이다.
s = SM(None, a=" abcd", b="abcd abcd")
```

```python
# find_longest_match(a의 찾을 시작인덱스, a의 찾을 끝인덱스, b의 찾을 시작인덱스, b의 찾을 끝인덱스)
s.find_longest_match(0, 5, 0, 9)

# a의 i부터 j까지 size가 k인 값을 찾았음을 알려준다.
# Match(a=i, b=j, size=k)
# Match(a=0, b=4, size=5)
# 대입해보면 a[i:i+k] == b[j:j+k]와 같다.
```

<br>

## 실행시간 측정하기

```python
print(e.longest_palindrom_1("수박수박수박맛있어수박"))
# 0.4620087565854192 ~ 0.5309993866831064

print(e.longest_palindrom_2("수박수박수박맛있어수박"))
# 0.5870097083970904 ~ 0.5980109563097358

print(e.longest_palindrom_3("수박수박수박맛있어수박"))
# 0.5979964043945074 ~ 0.9469949873164296

print(e.longest_palindrom_4("수박수박수박맛있어수박"))
# 0.4210014594718814 ~ 0.5869951564818621
```

<br>
