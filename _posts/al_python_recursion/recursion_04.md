---
title: Python _ Recursion4. 피보나치 수열 출력
date: 2017-09-18
tags:
- algorithm
- python
- recursion
---

문제 4번은 재귀 함수를 구현할 때 가장 빈번하게 등장하는 `피보나치 수열`을 구현하는 문제다. 피보나치를 간단하게 설명하자면 다음과 같다. **0과 1로 시작하며(~~시작값은 달라질 수 있다~~)  다음 피보나치 수는 바로 앞의 두 피보나치 수의 합이 된다.** 이러한 규칙을 가지고 사용자가 입력한 값 `n`으로 `n번 째까지의 피보나치 수열` 출력하면 된다. 해당 문제도 각각 `for`, `while`, `recursive` 방식으로 풀어보았다.

<br>

## 문제 4) 피보나치 수열 출력

```
문제 4. Fibonacci 수열 출력
 N번째 Fibonacci 수열 값을 출력하는 프로그램을 재귀함수로 구현

1. Input the number : 5
    1 1 2 3 5
2. Input the number : 7
    1 1 2 3 5 8 13
3. Input the number : 30
    1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987 1597 2584 4181 6765 10946 17711 28657 46368 75025 121393 196418 317811 514229 832040
```

<br>

## 코드 및 풀이

각각의 방식으로 풀기 전에 `while`문을 사용한 함수는 계산한 값들을 저장한 뒤 한번에 출력하도록, `for`문을 사용한 함수는 계산하면서 하나씩 값을 출력하도록 제약조건을 정하고 풀었다.

<br>

### (1) while

```python
# while문 사용

def fibo_while():
    n = int(input("Input the number : "))
    fibo = [1, 1]
    i = 2
    while i < n:
        fibo.insert(i, fibo[i - 1] + fibo[i - 2])
        i += 1
    return ' '.join(str(num) for num in fibo)

### 실행 ###
fibo_while()

### 출력 ###
# Input the number : 10
# '1 1 2 3 5 8 13 21 34 55'
```

값을 하나씩 저장하기 위해 파이썬의 `list` 자료형을 사용하였다. 먼저 첫번째 값과 두번째 값을 저장한 `fibo` 리스트를 선언해준 뒤 `while`문 안에서 리스트의 내장함수인 `insert()`를 사용하여 원하는 인덱스 위치에 이전 수의 합을 더하여 넣어주었다. 그리고 `i` 값을 1씩 증가시켰다.

출력할 때는 리스트 내에 저장된 값들을 `join()` 메서드를 사용하여 한 줄로 출력되도록 해주었다.

<br>

### (2) for

```python
# for 사용

def fibo_for():
    n = int(input("Input the number : "))
    fibo = [1, 1]
    for i in range(1, n + 1):
        fibo.insert(i, fibo[i - 1] + fibo[i - 2])
        print(fibo[i - 2])

### 실행 ###
fibo_for()

### 출력 ###
# Input the number : 10
# 1
# 1
# 2
# 3
# 5
# 8
# 13
# 21
# 34
# 55
```

`for`문 역시 처음 두 수를 저장한 `fibo` 리스트를 선언해주었지만 반복문을 돌면서 바로 값을 출력을 하기 위해  for문 안에서 `print()`를 사용하였다.

<br>

### (3) recursive function


피보나치 수열의 점화식은 다음과 같다.

```
f(n) = f(n - 1) + f(n - 2)
```

피보나치 수열에서 탈출조건은 2개이다. 해당 문제에서는 초기에 주어진 2개의 수가 `1, 1` 이므로 `n`이 `0`, `1`일 때 `1`을 리턴하도록 하였다. 그러면 다음의 식을 만족한다.

```
f(2) = f(1) + f(0)
# 2
```

<br>

또한 위의 식을 이용할 경우 재귀식이 2개 사용되어 각각의 합이 다음 값을 결정하는 것을 알 수 있다. 따라서 출력을 하려면 앞서 사용했던 방식으로는 무리가 있다. 해당 문제에서는 출력하는 방식을 제외하고 코드를 작성해보았다. ~~출력하는 방법에 대해서는 추가로 포스팅할 예정이다.~~

```python
# 재귀 사용

def recursive04():
    n = int(input("Input the number : "))
    def fibo_recursive(n):
        if n == 0 or n == 1:
            return 1
        r = fibo_recursive(n - 1) + fibo_recursive(n - 2)
        # TODO 출력!
        return r

    return fibo_recursive(n - 1)
```

<br>

## 실행시간 측정해보기

```python
# (1) while
fibo_while  # 6.969785317778587e-07

# (2) for
fibo_for()  # 5.289912223815918e-07

# (3) recursive
recursive04()  # 7.719499990344048e-07
```

<br>
