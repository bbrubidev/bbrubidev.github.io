---
title: HTML _ 텍스트와 관련된 태그
date: 2017-06-17
tags:
- HTML
- markup
---


`HTML`은 웹페이지를 위한 마크업 언어인 동시에 비교적 쉽게 구조를 만들 수 있는 템플릿 언어이다. 텍스트로 구성된 웹페이지에 구조적인 속성을 부여하는 태그들을 알아보자.

<br>

### (1) 헤드라인 h1 ~ h6

중요도 순으로 개요를 나타낼 때 사용하는 태그이다. 주로 학술문서나 검색엔진에서 검색 시 중요하게 사용한다. 실제 크기는 CSS에서 만들고자 하는 웹페이지에 맞춰 새로 설정하므로 단계별로 구별할 제목이 있다면 `hr`태그를 사용한다.


```html
<h1>html</h1>
<h2>역사</h2>
<h3>개발</h3>
...
<h6>최초규격</h6>
```

<br>

### (2) 줄바꾸기(line breaks), `p`와 `br`태그

```html
<!-- p태그 (paragraph, 문단) -->
<p>안녕하세요. 오늘은 날씨가 화창하네요
  그렇지만 마스크를 꼭 착용하세요. 미세먼지 농도가 높거든요!</p>
```

<br>

```html
<!-- br태그 (linebreak, 줄바꾸기) -->
안녕하세요.<br>
오늘은 날씨가 화창하네요.<br>
그렇지만 마스크를 꼭 착용하세요.<br>
미세먼지 농도가 높거든요!<br>
```

<br>

### (3) 그외 > `hr`, `blockquote`, `pre`태그

```html
<!-- 1. hr태그 (Horizontal rule, 수평선) -->
<p>안녕</p>
<hr>
<p>또 안녕</p>
```

```html
<!-- 2. blockquote태그 (인용문) -->
<blockquote>인용문 내용</blockquote>
```

```html
<!-- 3. pre태그 (Preformatted text, 이미 형식화된 텍스트) -->
<pre>
def pretag_test():
  val = 'pretag'
</pre>
```

<br>

### (4) 줄바꿈 없는 텍스트 태그

```html
<!-- 1. strong, b태그 (강조, 굵게 표시)
	: 보이는 것은 같으나 오디오 청취시 다르게 발음한다. -->
<strong>강조할 텍스트</strong>
<b>굵게 표시할 텍스트</b>```
```

```html
<!-- 2. em, i태그 (문맥상 특정부분 강조, 이탤릭 표시)
	: i 태그의 경우 한글에는 지원되지 않는다.   -->
<em>강조할 텍스트</em>
<i>기울여 표시할 텍스트</i>
```

```html
<!-- 3. mark태그 (형광펜 효과)
	: 형광펜으로 그은 효과의 텍스트, 인라인요소이다. -->
<mark>형광펜으로 그은 효과텍스트</mark>
```

<br />

## 링크와 이미지 태그 - `hyperlink`, `image`

### (1) 링크, anchor

**a 태그**<br>
**href** : 이동할 페이지주소<br>
**target** : 링크 걸린 페이지를 여는 법<br>

  - `_self` : 본래창에서 이동
  - `_blank` : 새창에서 열기

**title** : 마우스를 올렸을 때 보여줄 제목


```html
<a href="http://www.naver.com" target="_blank" title="네이버 열기">네이버 바로가기</a>
```

<br />

### (2) 이미지 삽입, image

**img 태그**<br>
**src** : 이미지의 경로<br>
**width, height** : 이미지의 가로/세로크기(px 단위)<br>
**alt** : 대체 텍스트<br>
`alt` 태그 역시 시각장애인에게 설명을 줄 만한 텍스트를 넣을 수 있다.

```html
<img src="이미지의 경로" width="30" height="200" alt="이미지 설명">
```

<br>

## 데이터 태그 (data tags)

데이터를 나타내는 목록형 태그를 의미한다.

<br>

### (1) 목록

: 목록 형태로 나타나는 요소는 `ol`이나 `ul`요소로 구현하고 css로 스타일 속성을 부여한다.

> ordered list, ol<br>

```html
<ol>
	<li>항목</li>
	<li>항목</li>
	<li>항목</li>
	<li>항목</li>
</ol>
```

> unordered list, ul

```html
<ul>
	<li>항목</li>
	<li>항목</li>
	<li>항목</li>
	<li>항목</li>
</ul>
```

<br />

#### 1) 목록 속성

**type** : 나열할 속성 정의 <br>

| 값 | 설명 |
|----|----------|
| 1 | 숫자(기본값) |
| a | 영문 소문자 |
| A | 영문 대문자 |
| i | 로마 숫자 소문자 |
| I | 로마 숫자 대문자 |

**start**: 시작할 숫자 지정

**reversed** : 역순으로 표시

```html
<ol type="A" start="3" reversed>
	<li>First</li>
	<li>First</li>
	<li>First</li>
</ol>
```

<br>

#### 2) 정의목록(Description List)

: 목록과 정의목록은 서로 중첩하여 사용가능.

```html
<dl> <!--정의목록 태그 -->
  <dt>dt는 목록 중 개념을 나타낸다.</dt>
  <dd>dd는 해당 개념의 정의를 나타낸다.</dd>
  <dd></dd>
  <dt>CSS</dt>
  <dd>Cascading Style Sheet</dd>
  <dd>HTML의 형태를 지정하는 언어이다.</dd>
</dl>
