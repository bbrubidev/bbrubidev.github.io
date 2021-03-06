---
title: Python _ Lv2. 콜라츠 추측
date: 2017-11-01
tags:
- algorithm
- python
---

### 문제 설명

> 1937년 Collatz란 사람에 의해 제기된 이 추측은, 입력된 수가 짝수라면 2로 나누고, 홀수라면 3을 곱하고 1을 더한 다음, 결과로 나온 수에 같은 작업을 1이 될 때까지 반복할 경우 모든 수가 1이 된다는 추측입니다.
>
>  예를 들어, 입력된 수가 6이라면 6→3→10→5→16→8→4→2→1 이 되어 총 8번 만에 1이 됩니다. collatz 함수를 만들어 입력된 수가 몇 번 만에 1이 되는지 반환해 주세요. 단, 500번을 반복해도 1이 되지 않는다면 –1을 반환해 주세요.


<a href="https://programmers.co.kr/learn/challenge_codes/14" target="_blank">문제 보러가기</a>

<br>

## 코드 및 풀이

문제를 잘 읽는 것이 중요했다.

```python
def collatz(num):
    answer = 0
    while num != 1:
        if num % 2 == 0:
            num = num / 2
        else:
            num = (num * 3) + 1
        answer += 1

    if answer >= 500:
        return -1
    else:
        return answer

# 아래는 테스트로 출력해 보기 위한 코드입니다.
print(collatz(9720207773787777))
# -1
```

문제에서 500번이 넘어도 1이 반환되지 않으면 `-1`을 리턴하라고 했다. while문의 종료조건을 `answer < 500`이라고 줄 수도 있는 문제였다. 하지만 종료하고 특정한 값(`-1`)을 반환해야 하기 때문에 따로 조건문을 써주었다.

<br>

짝수라는 조건을 판별할 때 위처럼 단순히 2로 나누어서 나머지가 0인 것을 찾을 수도 있지만, 논리연산자를 사용할 수도 있다.

예를 들어, 2라는 정수는 이진수 `10` 으로 표현할 수 있다.

이진수 `10`의 마지막 자리수는 `0`이고 이 값을 `1`과 함께 `&`연산할 경우 0이므로 짝수이다.

```python
2 & 1 == 10 & 1 == 0  # 짝수
```

<br>

반면 3은 이진수로 `11`이며 마지막 자릿수인 `1`을 `1`과 `&`연산했을 때 1이므로 홀수이다.

```python
3 & 1 == 11 & 1 == 1  # 홀수
```

<br>

아래 코드를 보면 `&`(AND) 연산자를 써서 비교하는 값에 따라 나온 결과로 짝수, 홀수를 판별하였다.

```python
def collatz(num):
    answer = 0
    while num != 1:
        if num & 1 == 0:
            num = num // 2
        else:
            num = (num * 3) + 1
        answer += 1

    if answer >= 500:
        return -1
    else:
        return answer
```

<br>

## 다른 방식의 코드 및 풀이

while문을 써서 풀었지만, 사실 이 문제는 반환값이 500을 넘으면 추가 연산을 하지 않아도 되므로 for 반복문을 사용할 수도 있다.

```python
def collatz(num):
    answer = 0
    for i in range(501) :
        if num == 1:
            break
        num = num //2 if num % 2 == 0 else num*3 + 1
        answer += 1

    return answer if i != 500 else -1

# 아래는 테스트로 출력해 보기 위한 코드입니다.
print(collatz(1))
```

<br>
