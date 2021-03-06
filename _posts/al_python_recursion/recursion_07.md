---
title: Python _ Recursion7. 이진수의 1의 개수 출력
date: 2017-09-24
tags:
- algorithm
- python
- recursion
---

7번은 이진수로 구성된 16자리 이하의 숫자를 입력받은 후, 입력받은 숫자에 등장하는 1의 총 갯수를 구하는 문제이다. 해당 문제 또한 `for`, `while`, 그리고 재귀방식을 사용하여 풀어보았다.

<br>

## 문제 7) 이진수의 1의 개수 출력

```
문제 7. 이진수의 1의 개수 출력

사용자에게 이진수를 입력 받고, 1이 등장하는 개수를 출력하는 프로그램을 재귀함수로 구현
이진수는 16자리까지 입력가능함

1. Input the number : 1111
      4
2. Input the number : 110000111
      5
3. Input the number : 1111111111
      10
4. Input the number : 1
      1
```

<br>

## 코드 및 풀이

### (1) while

```python
# while 사용

def bin_while():
    n = str(input("Input the number : "))
    ln = len(n)
    sum_ = 0
    while ln > 0:
        if ln >= 16:
            return "Too long!"
        elif n[0] == '1':
            sum_ += 1
        ln -= 1
        n = n[1:]
    return sum_


### 실행 ###
bin_while()

### 출력 ###
# Input the number : 11010101111
# 7
```

`while`문을 사용한 경우 `ln`에 입력받은 이진수(`n`)의 길이를 할당한 후 `ln`이 `0`보다 클 때까지만 반복문을 실행하도록 하였다.

그리고 문제에서 주어진 범위를 적용하여 예외처리를 해준 후 `n`의 첫번째 인덱스 값을 슬라이싱하면서 값이 해당 인덱스의 값이 `1`이면 갯수를 세기 위해 `0`으로 할당한 `sum_` 변수에 `1`씩 더하도록 하였다. 그리고 반복문이 끝난 후 `sum_`을 리턴해주었다.

<br>

### (2) for

```python
# for 사용

def bin_for():
    n = str(input("Input the number : "))
    sum_ = 0
    for i in n:
        if int(i) == 1:
            sum_ += 1
    return sum_


### 실행 ###
bin_for()

### 출력 ###
# Input the number : 11010101111
# 7
```

`for`문을 사용한 경우에는 `n`을 문자열로 입력받은 후 반복문을 돌면서 각 자라의 값이 `1`일 때만 `sum_`에 `1`을 더해주었다. 그리고 `while`문과 동일하게 `sum_`을 리턴한다.

<br>

### (3) recursive function

```python
# recursive 사용

def recursive07():
    n = str(input("Input the number : "))

    def bin_recursive(n):
        if len(n) < 1:
            return 0
        r = bin_recursive(n[1:])
        if n[0] == '1':
            return 1 + r
        return r
    return bin_recursive(n)


### 실행 ###
recursive07()

### 출력 ###
# Input the number : 11010101111
# 7
```

재귀방식을 사용한 경우에는 `n`을 문자열로 받았다. 그리고 `n[0]`의 값이 `1`일 때 첫번째 값을 제외한 문자열에 다시 재귀를 적용하고 `1`을 더해주는 방식으로 규칙을 찾았다. 만약 `n[0]`의 값이 `1`이 아닌 경우에는 `1`을 더해주지 않고 그대로 재귀식을 반환해주었다.

<br>

## 실행시간 측정해보기

```python
# 작성한 메서드를 100000번씩 반복 실행하여 나온 실행속도의 평균값 구하는 함수를 avg()로 정의하였다.


# (1) while
avg(bin_while)
# 0.0221393486863235

# (2) for
avg(bin_for)
# 0.02261209048447199

# (3) recursive
avg(recursive07)
# 0.023148359468905255
```

<br>
