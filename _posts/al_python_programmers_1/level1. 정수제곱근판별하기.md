---
title: Python _ Lv1. 정수 제곱근 판별하기
date: 2017-06-01
tags:
  - algorithm
  - python
---

### 문제 설명

> nextSquare함수는 정수 n을 매개변수로 입력받습니다. n이 임의의 정수 x의 제곱이라면 x+1을 리턴하고, n이 임의의 정수 x의 제곱이 아니라면 'no'을 리턴하는 함수를 완성하세요.

> 예를 들어 n이 121이라면 이는 정수 11의 제곱이므로 (11+1)의 제곱인 144를 리턴하고, 3이라면 'no'를 리턴하면 됩니다.

### 내 코드

```python
import math

def nextSquare(n):
	if math.sqrt(n) - int(math.sqrt(n)) == 0:
		num = math.sqrt(n) + 1
		return math.pow(num, 2)
	return 'no'
```

<br>

### 타인의 코드

```python
def nextSqure(n):
    sqrt = n ** (1/2)

    if sqrt % 1 == 0:
        return (sqrt + 1) ** 2
    return 'no'
```
