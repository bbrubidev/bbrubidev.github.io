---
title: Web _ WSGI란 무엇인가?
date: 2017-09-16
tags:
- Django
- Web development
- Network
- python
- WSGI
---

`WSGI`(Web Server Gateway Interface)는 **웹서버와 파이썬을 사용한 웹 어플리케이션 개발환경 간의 인터페이스에 대한 규칙**
이다. 파이썬으로 선택할 수 있는 웹 프레임워크에서 사용할 수 있는 기존 웹서버는 `CGI`, `FastCGI`, `mod_python`, 또는 커스텀으로 만들어진 API 등으로 상당히 제한되어 있었다. 또 반대로 웹서버를 선택하는 것이 파이썬 웹개발환경을 제한하기도 하였다. 이를 위해 표준으로 나온 것이 `WSGI`이다.

<br>

## WSGI의 동작 원리

WSGI는 웹서버와 웹 어플리케이션(또는 프레임워크) 간에 호환성있는 웹 어플리케이션 개발환경을 만들기 위해 로우-레벨 인터페이스로 만들어졌다.

WSGI는 보통 서버 사이드와 게이트웨이 사이드(`Nginx`, `Apache` 등)를 가진다. 그리고 어플리케이션 또는 프레임워크 사이드와 통신한다. WSGI 요청을 처리하기 위해서 서버사이드는 어플리케이션을 실행하고 환경정보를 제공하며, 콜백 함수를 어플리케이션 사이드에 전달한다. 그러면 어플리케이션은 요청을 실행하고 전달받은 콜백 함수를 통하여 응답을 서버사이드에 넘겨준다.

서버와 어플리케이션 사이에서, 양방향의 API를 실행할 수 있는 `WSGI 미들웨어` (이하 미들웨어, middleware)가 사용되기도 한다. 서버는 클라이언트의 요청을 받아 미들웨어에 넘겨준다. 미들웨어가 요청을 처리한 후에는 요청을 어플리케이션에 보낸다. 어플리케이션에서 나온 응답은 다시 미들웨어를 통해 서버와 궁극적으로 클라이언트 측에 전달된다. WSGI 친화적인 어플리케이션에서는 이러한 미들웨어 여러 개가 스택을 이루어 사용될 수 있다.

<br>

**미들웨어가 하는 역할**
은 다음과 같다.

- 환경 변수가 변경되는 것에 맞추어 타겟 URL에 따라 요청을 다른 어플리케이션 객체에 전달한다.
- 여러 어플리케이션(또는 프레임워크)가 나란히 동일한 실행을 할 수 있게 해준다.
- 네트워크 상에서 요청과 응답을 전달함으로써 로드밸런싱과 원격 실행을 가능하게 한다.  
- XSLT(Extensible Stylesheet Language Transformations)와 같은 컨텐트 전처리를 실행할 수 있다.
	- 예를 들면 XML 문서를 다른 XML 형태의 문서로 바꾼다던가 HTML을 웹페이지로 변환해주는 등의 처리이다.
	- <a href="https://en.wikipedia.org/wiki/XSLT" target="_blank">XSLT에 대해 더 알아보기</a>

<br>

### 예제

다음은 WSGI 호환되는 "Hello World" 어플리케이션이다.

```python
def application(environ, start_response):
    start_response('200_OK', [('Content_Type', 'text/plain')])
    yield 'Hello World'
```

`application` 메서드는 각각 `environ`과 `start_response`를 매개변수로 받는다. `environ`변수는 CGI의 환경변수들을 딕셔너리로 받는다. 그리고 `start_response`변수는 `status`와 `response_headers`를 매개변수로 받는 메서드이다.

메서드 내부에서는 매개변수로 받은 `start_response` 메서드를 실행하며, `status`에 응답상태 코드 정보로 `200 OK`와 응답 헤더(`response_headers`) 정보 중의 하나인 `Content_Type`을 정의해준다.

그 다음에는 응답의 바디부분에 해당하는 "Hello World"를 스트링 값으로 넘겨준다.

<br>

### 어플리케이션 호출 예제

다음은 WSGI 친화적인 애플리케이션을 호출하여 응답을 받는 메서드의 원리에 대해 정리한 것이다.

```python
# 앱을 실행하고 응답을 보여주는 예제 메서드
def call_application(app, environ):
    # body content와 status, headers 정보를 담는 리스트 각각 정의
    body = []
    status_headers = [None, None]
    # 응답을 넘겨주는 내부함수 start_response 정의
    def start_response(status, headers):
        status_headers[:] = [status, headers]
        return body.append(status_headers)
    # 어플리케이션에서 실행할 view 메서드(app()) 실행
    app_iter = app(environ, start_response)
    # app_iter의 값들을 바디에 넣는다.
    try:
        for item in app_iter:
            body.append(item)
    # 항상 실행. app_iter 내에 'close' 를 찾으면 종료
    finally:
        if hasattr(app_iter, 'close'):
            app_iter.close()
    # 상태코드, 헤더정보, 바디를 순서대로 리턴
    return status_headers[0], status_headers[1], ''.join(body)

status, headers, body = call_application(app, {"""environ"""})
```

<br>

## WSGI와 파이썬3

`파이썬3`에서 이진데이터와 텍스트데이터의 분리하는 것이 WSGI를 사용하는데 문제가 되었다. 헤더 데이터가 스트링 변수로 정의되어야하는데, 가끔씩 이진 데이터로 처리되는 경우가 있기 때문이다. `파이썬2`에서는 텍스트와 이진 데이터가 모두 스트링 변수로 처리되기 때문에 문제가 없었던 사항이다. 하지만 파이썬3 에서 이진 데이터는 바이트 변수로, 텍스트 데이터는 유니코드 텍스트 변수로 처리된다. 이를 해결하기 위해 개정된 버전의 WSGI는 <a href="https://www.python.org/dev/peps/pep-3333/" target="_blank">PEP 3333</a>에 소개되어 있다.

<br>

## 어떤 WSGI를 사용할 것인가?

가장 많이 사용하는 것은 C언어로 개발된 서버인 `uwsgi`이다. `uwsgi`는 반드시 웹서버와 함께 사용되어야 하는데 예를 들어, Nginx 웹서버를 사용함으로써 정적인 페이지를 처리하도록 하고 나머지 요청은 `uwsgi`에게 전달하여  처리하는 방법이 일반적이다.

<br>

## 마치며

더 자세한 내용은 <a href="https://en.wikipedia.org/wiki/Web_Server_Gateway_Interface" target="_blank">다음 링크(Web Server Gateway Interface)</a>에서 확인할 수 있다.

<br>
