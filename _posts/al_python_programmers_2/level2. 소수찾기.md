---
title: Python _ Lv2. 소수 찾기
date: 2017-10-31
tags:
- algorithm
- python
use_math: true
---

### 문제 설명

> numberOfPrime 메소드는 정수 n을 매개변수로 입력받습니다.
> 1부터 입력받은 숫자 n 사이에 있는 소수의 개수를 반환하도록 numberOfPrime 메소드를 만들어 보세요.

> 소수는 1과 자기 자신으로만 나누어지는 수를 의미합니다.(1은 소수가 아닙니다.)

> 10을 입력받았다면, 1부터 10 사이의 소수는 [2,3,5,7] 4개가 존재하므로 4를 반환하고 5를 입력받았다면, 1부터 5 사이의 소수는
[2,3,5] 3개가 존재하므로 3를 반환


<a href="https://programmers.co.kr/learn/challenge_codes/171" target="_blank">문제 보러가기</a>

<br>

## 코드 및 풀이

소수는 1과 자기 자신으로만 나누어지는 수이다. 이 조건을 만족하기 위해서는 **매개변수가 n일 때 1에서 (n-1) 사이의 수로 나눈 나머지가 0이 될 수 없는 수**를 찾아야 한다.

이 때, 에라토스테네스의 체를 사용하여 연산 과정을 줄일 수 있었다. 모든 자연수는 소수들의 곱으로 표현이 되는데, 제일 작은 소수 2부터 시작해 (n-1)까지의 수 중 나머지가 0이 되는 수들을 모두 거르고 $\sqrt{n}$ 까지의 수로만 나눠보면 n 이 소수인지 아닌지 알 수 있다.


```python
def numberOfPrime(n):
    # 일단 리스트에 2부터 n까지의 수를 넣어둔다.
    li = [i for i in range(2, n+1)]
    # i는 n이 될 때까지 반복한다.
    for i in range(2, n + 1):
        # j는 2부터 루트 n까지 i를 나누는 수이다.
        for j in range(2, int(n ** 0.5 + 2)):
            # 자기 자신을 제외하고 나눠지는 숫자가 있을 때 리스트에서 해당 수를 제외시킨다.
            if i != j and i % j == 0 and i in li:
                li.remove(i)
    return len(li)


# 아래는 테스트로 출력해 보기 위한 코드입니다.
print(numberOfPrime(10))
```

<br>
