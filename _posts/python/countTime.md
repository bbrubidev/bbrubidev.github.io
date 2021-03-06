---
title: Python _ 파이썬에서 코드실행시간 측정하기
date: 2017-09-12
tags:
- algorithm
- python
---

아직 알고리즘을 작성하는 것에 익숙하지 않은 개발자들은 먼저 자신이 만든 코드가 정상적으로 작동되는지를 신경쓴다. 이 단계를 넘어서면 기본적으로 고려해야할 것이 바로 성능인데, 성능을 측정하는 방법 중의 하나가 하나의 알고리즘 문제를 여러 방식으로 풀어보고 그 `실행시간`을 측정해보는 것이다.

해당 포스트는 파이썬으로 작성한 알고리즘 코드의 실행시간을 측정하는 방법에 대해 소개한다.

<br>

## 파이썬으로 코드실행시간 측정하기

먼저 시간을 측정하는 파이썬 내장모듈 중에  `timeit`를 살펴보자. `timeit`는 작은 파이썬 코드들의 실행시간을 측정할 목적으로 만들어놓은 모듈이다.

```python
timeit.timeit(stmt='pass', setup='pass', timer=<default timer>, number=1000000, globals=None)
```

해당 모듈은 실행시 `Timer`의 객체를 생성한다. 매개변수를 살펴보면 `stmt`에는 실행할 코드를 스트링으로 줄 수 있고, `setup`키워드인자에는 임포트나 실행문을, `timer`키워드인자에는 타이머 함수를, 그리고 `number`키워드인자에는 `timeit()`가 실행될 때의 시간단위를 입력한다.

시간은 주어진 코드의 실행 횟수를 카운트한다. 실행되는 동안 `setup`은 한번만 실행되며 코드의 실행시간을 여러 번 측정하여 초 단위의 실수형으로 리턴한다. 인자는 루프를 몇 번 돌 것인지 그 횟수를 주면 되며, 주지 않을 경우 기본값은 `1,000,000`으로 설정되어 있다. 모듈이 사용되면 코드, `setup`값, 그리고 `timer` 함수는 `Timer`의 생성자에 전달된다.

<br>

위의 모듈을 사용하여 다음과 같이 `runtime` 메서드를 정의해보았다.

```python
def runtime(f):
    import timeit
    start = timeit.default_timer()
    f  # 시간 측정할 메서드
    end = timeit.default_timer()
    print(end - start)
```

`runtime` 함수가 실행되면 바로 `timeit` 모듈을 임포트해온 후 `default_timer`를 사용하여 측정할 코드의 실행 직전, 실행 직후 시간을 각각 측정한다. 그리고 시간 값의 차를 구하면 이것이 바로 매개번수로 받은 코드(함수, 메서드, 스트링)의 실행시간이 된다.


사용예는 다음과 같다.

```python
# for 사용

def odd_sum_for():
    result = 0
    n = int(input("input the number : "))

    for i in range(0, n + 1):
        if n > 1000:
            return "1000과 같거나 작은 수를 입력하세요!"
        elif not i % 2 == 0:
            result += i
    return "1부터 {n}까지 홀수의 합 : {result}".format(n=n, result=result)


### 실행 ###
runtime(odd_sum_for())
odd_sum_for()

### 출력 ###
# 5.299807526171207e-07
# input the number : 10
# '1부터 10까지 홀수의 합 : 25'
```

<br>

## 실행시간 측정 데코레이터

위의 코드는 실행시간을 출력하는 작은 모듈이 되었다. 좀 더 파이써닉하게 해당 메서드를 사용하고 싶다면 파이썬의 `데코레이터(Decorator)`화 하는 것이 좋다.

위의 `runtime` 메서드를 조금 더 고쳐보자.

```python
def runtime(f):
    def wrapper(*args, **kwargs):
        import timeit
        start = timeit.default_timer()
        f
        end = timeit.default_timer()
        print(end - start)
        return f()
    return wrapper
```

**+추가**

`runtime` 메서드에서 `time.process_time()`을 사용하면 CPU 실행시간도 측정할 수 있다.

파이썬에서 데코레이터를 정의할 경우에는 위처럼 내부에 `wrapper` 메서드를 넣어 기존 메서드를 내부함수로 정의하고 외부함수에서 내부함수 자체를 리턴하면 된다.

<br>

위의 데코레이터를 활용하면 다음과 같다.

```python
# for 사용

@runtime
def odd_sum_for():
    result = 0
    n = int(input("input the number : "))

    for i in range(0, n + 1):
        if n > 1000:
            return "1000과 같거나 작은 수를 입력하세요!"
        elif not i % 2 == 0:
            result += i
    return "1부터 {n}까지 홀수의 합 : {result}".format(n=n, result=result)


### 실행 ###
# runtime(odd_sum_for()) - 따로 실행해주지 않아도 데코레이터가 알아서 출력해준다.
odd_sum_for()

### 출력 ###
# 5.299807526171207e-07
# input the number : 10
# '1부터 10까지 홀수의 합 : 25'
```

<br>

## 커멘드-라인에서 코드실행시간 측정하기

위의 `timeit`를 그대로 사용하여 커멘드-라인에서도 코드조각, 메서드, 함수 등 작은 파이썬 코드의 실행시간을 측정할 수 있다.

```powershell
$ python -m timeit [statement ...]
```

자세한 명령어 옵션은 다음 링크(<a href="https://docs.python.org/3/library/timeit.html" target="_blank">파이썬 3.6.2 `timeit`</a>)를 참고하기 바란다.

<br>
