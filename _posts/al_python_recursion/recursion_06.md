---
title: Python _ Recursion6. 숫자의 자릿수의 합
date: 2017-09-23
tags:
- algorithm
- python
- recursion
---

6번은 주어진 범위 안에서 입력받은 숫자의 각 자릿수를 더하는 문제이다. 해당 문제는 스트링의 인덱싱과 슬라이싱 성질을 사용하여 풀이하였다. 또, `for`, `while`, 그리고 `recursive` 방식을 사용하여 풀어보았다.

<br>

## 문제 6) 숫자의 자릿수의 합

```
문제 6. 숫자의 자릿수의 합
사용자에게 정수 N(0 < N <= 1,000,000)을 입력받고, N의 자릿수의 합을 출력하는 프로그램을 재귀함수로 구현
1. Input the number : 123456
    21
2. Input the number : 10000000
    1
3. Input the number : 6666
    24
4. Input the number : 119
    11
```

<br>

## 코드 및 풀이

### (1) while

```python
# while 사용

def digit_sum_while():
    n = str(input("Input the number : "))
    sum_ = 0
    ln = len(n)
    while ln > 0 and int(n) <= 1000000:
        sum_ += int(n[ln - 1])
        ln -= 1
    return sum_


### 실행 ###
digit_sum_while()

### 출력 ###
# Input the number : 1211
# 5
```

`n`의 값을 문자열로 받은 후 `n`의 길이를 `ln`에 할당한다. `ln`의 값이 `0`보다 크고 `n`이 주어진 값(1,000,000)보다 작을 경우에는 while문을 진행한다. 이 때, 미리 선언해놓은 `sum_`에 n의 각 인덱스의 값들을 더하고 `ln`을 `1`씩 감소시킨다.  

<br>

### (2) for

```python
# for 사용

def digit_sum_for():
    n = str(input("Input the number : "))
    sum_ = 0
    for i in n:
        sum_ += int(i)
    return sum_


### 실행 ###
digit_sum_for()

### 출력 ###
# Input the number : 1211
# 5
```

`for`문을 사용하는 경우에는 훨씬 간단하다. 입력값을 문자열로 받은 후 미리 선언해놓은 `sum_`에 각 인덱스의 값을 더해주고 해당 값을 리턴해주면 된다.

<br>

### (3) recursive function

```python
# recursive 사용

def recursive06():
    n = str(input("Input the number : "))

    def digit_sum_recursive(n):
        if n[0] == n:
            return int(n)

        r = digit_sum_recursive(n[:-1])
        return int(n[-1]) + r
    return digit_sum_recursive(n)


### 실행 ###
recursive06()

### 출력 ###
# Input the number : 1211
# 5
```

재귀를 사용한 경우 먼저 `n`을 스트링 값으로 받은 후 1의 자리 수를 계속 더하면서 문자열의 마지막 값을(`n[-1]`) 제외한 문자열에 계속 재귀함수를 적용한다.

그리고 `n`의 길이가 1일 때, 즉 n의 첫번째 인덱스 값이 `n` 자체가 될 때 해당 값을 반환하여 탈출조건을 설정하였다.

<br>

## 실행시간 측정해보기

```python
# 작성한 메서드를 100000번씩 반복 실행하여 나온 실행속도의 평균값 구하는 함수를 avg()로 정의하였다.


# (1) while
avg(digit_sum_while)
# 0.022326416132273152

# (2) for
avg(digit_sum_for)
# 0.023095118565834127

# (3) recursive
avg(recursive06)
# 0.0244320781348506
```

<br>
