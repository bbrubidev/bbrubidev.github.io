---
title: Python _ Lv2. 2016년
date: 2017-11-01
tags:
- algorithm
- python
---

### 문제 설명

> 2016년 1월 1일은 금요일입니다. 2016년 A월 B일은 무슨 요일일까요? 두 수 A,B를 입력받아 A월 B일이 무슨 요일인지 출력하는 getDayName 함수를 완성하세요. 요일의 이름은 일요일부터 토요일까지 각각
> SUN,MON,TUE,WED,THU,FRI,SAT
를 출력해주면 됩니다. 예를 들어 A=5, B=24가 입력된다면 5월 24일은 화요일이므로 TUE를 반환하면 됩니다.


<a href="https://programmers.co.kr/learn/challenge_codes/177" target="_blank">문제 보러가기</a>

<br>

## 코드 및 풀이

두려워했던 달력 관련 문제다. 2016년 1월 1일은 금요일이므로 그에 맞는 결과 출력용 리스트를 생성해주고 달별 날짜를 딕셔너리로 만들었다.

```python
# 2016년 1월 1일은 금요일

def getDayName_1(a,b):
    day_name = ['FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU']
    month_dict = {
        "1":31,
        "2":29,
        "3":31,
        "4":30,
        "5":31,
        "6":30,
        "7":31,
        "8":31,
        "9":30,
        "10":31,
        "11":30,
        "12":31
    }

    days = 0
    for i in range(1, a):
        days += month_dict[str(i)]
    days += b
    index = days % 7 - 1

    return day_name[index]

print(getDayTime(5, 24))
# TUE
```

사실 `month_dict`를 리스트로 만들면 편하긴 하지만 딕셔너리로 한 이유는 가독성을 높이기 위해서... 해봤다^^

알고리즘은 간단하다. 원하는 달까지의 날짜들을 모두 합하고 요일을 출력하려는 날짜를 더해준 후 7로 나눈 인덱스를 구한다. 이 인덱스로 `day_name` 리스트에서 값을 뽑으면 된다.

<br>

## 다른 방식의 코드 및 풀이

연산하지 않고 내장함수를 사용할 수도 있다.(~~반칙이지만..~~) 파이썬에서 지원하는 `datetime`은 장고를 사용한 프로젝트를 진행할 때도 자주 봤던 시간 계산 모듈이다. 알아두면 좋은 함수들이라 소개한다.

```python
import datetime
def getDayName_2(a,b):
    week = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
    return week[datetime.date(2016, a, b).weekday()]

#아래 코드는 테스트를 위한 출력 코드입니다.
print(getDayName(5,24))
# TUE
```

<br>

`date` 모듈에서는 `isoweekday()`라는 내장함수를 지원하고 있다. 해당 함수는 원하는 년/월/일의 요일을 정수형 값으로 리턴해준다. 예를 들어 월요일은 1로, 일요일은 7로 리턴해주는 식이다.

```python
import time, datetime

def getDayName_3(a,b):
    t = datetime.date(2016,a,b)
    week = ['MON','TUE','WED','THU','FRI','SAT','SUN']

    return  week[t.isoweekday()-1]


#아래 코드는 테스트를 위한 출력 코드입니다.
print(getDayName(5,24))
```

<br>

다음 코드는 리스트에 출력할 값을 미리 만들어서 저장하지 않고 문자열로 만든 다음 인덱싱과 슬라이싱을 통해 값을 출력한다.

인덱싱과 슬라이싱의 규칙은 월별로 시작하는 요일의 리스트에서 시작한다. 인자 a를 그대로 넣으면 인덱싱이 0부터 시작하므로 역방향으로 인덱싱하였고, 리스트도 이에 따라 [`12월 1일의 요일`, `11월 1일의 요일`, ... , `1월 1일의 요일`] 순으로 만들어져 있다.

```python
def getDayName_4(a,b):
    # 숫자 리스트는 각 월별 1일의 요일을 숫자로 나타낸 것
    # - (12월~1월로 거꾸로 봐야 함)
    # [-a]는 인덱싱이 0부터 시작하므로 역순으로 처리하여 1부터 시작
    return "FSSMTWTRAUOUEHITNNEDU"[([5,3,0,5,2,6,4,1,6,3,2,6][-a]+b)%7::7]

getDayName(5, 24)
```

원하는 달의 요일을 찾았다면 원하는 날짜(`b`)를 더해 7로 나눈 나머지를 구할 수 있다. 이 나머지값은 만들어 놓은 문자열의 슬라이싱 시작값이다.

문자열을 자세히 보면 금요일(`FRI`)부터 한 글자씩 시작하여 7칸마다 나머지 글자가 나온다. 따라서 파이썬의 슬라이싱 기법을 통해 7칸씩 뛴 값을 출력하면 원하는 요일의 문자가 출력된다.

> 코드 리뷰 및 공유를 허락해주신 pignu님께 감사드립니다:)

<br>

## 실행시간 측정하기

```python
print(avg_time(e.getDayName_1(3,30)))
# 7.429989636875689 ~ 9.140021575149149

print(avg_time(e.getDayName_2(3,30)))
# 8.089991752058268 ~ 9.350005711894482

print(avg_time(e.getDayName_3(3,30)))
# 5.43001078767702 ~ 6.269983714446425

print(avg_time(e.getDayName_4(3,30)))
# 6.619993655476719 ~ 7.510025170631707
```

<br>

---

## 마치며

- 2월은 28일이 아닌 29일이다.
- 윤년 구하는 알고리즘도 풀어보고 싶다.
- <a href="https://docs.python.org/3/library/datetime.html" target="_blank">시간 및 날짜관련 파이썬 내장 모듈 문서 바로가기</a>

<br>
