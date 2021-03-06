---
title: Web _ 1.1 장고를 사용한 개인 프로젝트 기획 및 세팅하기
date: 2017-09-08
tags:
- Django
- Project
- Web development
---


어제부터 웹프로그래밍 스쿨 수료생 분들과 함께 `모내기 스터디`를 시작했다. 해당 스터디에서는 각자가 만들고 싶었던 개인 프로젝트를 진행하면서 서로 피드백을 주고받는다. 이번 포스트에서는 1주차 미팅에서 한 일을 기록하고 프로젝트 관련 공부내용을 정리하고자 한다.

- 일시 : 2017년 9월 7일 수요일
- 스터디 소요시간 : 오후 7시부터 2시간 30분

<br>

## 스터디 내용

스터디 진행방향을 먼저 정하고 프로젝트 주제에 대해 생각해보는 시간을 가졌다. 그리고 정한 주제를 가지고 장고 프레임워크를 사용하여 초기 세팅까지 완료했다.

- 프로젝트 코드를 업데이트할 `github organization` 및 개인 레포지토리(<a href="https://github.com/Monaegi/Julia-ArtDiscussion" target="_blank">Github Link</a>
) 생성하기
- 개인 프로젝트 주제 정하기
- 개인프로젝트 세부 기능 구상하기
- 프로젝트 개발환경 설치 및 첫 커밋까지 완료하기

<br>

## 개인 프로젝트 기획 - `Wordy Gallery`

신진작가의 미술작품을 감상하고 사용자끼리 작품에 대한 의견을 나누는 웹서비스다. 웹서비스명은 `wordy gallery`로, 소란스러운 갤러리를 의미한다.

<br>

### 세부 기능명세

**(기본) 유저인증기능**

- 로그인/로그아웃/회원가입/유저정보변경 + 소셜로그인(페이스북, 선택)
- 사용자 프로필페이지 (북마크한 이미지가 보이는 목록도 구성)
- 로그인의 경우 `email` 계정을 username으로 설정하여 모델링할 계획이다.
- 페이스북은 자바스크립트 SDK를 사용하여 구현해볼 계획이다.

<br>

**(1) 장르 or 키워드별 작품 인덱스 페이지**

- 장르별 작품목록으로 가는 목록 페이지이다.
- 이미지에 키워드를 띄워두고, 그림 위에 마우스 호버시 그림이 보이도록 한다.

<br>

**(2) 관련 작가 인덱스 페이지**

- 작가별로 3D 태그 클라우드를 생성하여 클릭하면 해당 페이지로 갈 수 있도록 한다.
- 상세페이지에 그림이 항상 떠있어야 하므로 빈 이미지 틀을 만들어두거나 `id=1`인 작품으로 렌더한다.

<br>

**(3) 작가별 작품 목록 페이지**

- 작가 클릭하면 해당 작가의 작품목록이 이미지로 뜨는 페이지다.
- 작가의 프로필페이지로 이동하면서 아래에는 작품목록이 뜬다.

<br>

**(4) 작품별 디테일 페이지**

- 작품 상세페이지로 이동
- 작품이미지, 작품설명, 댓글창, 관련작품목록 등이 뜬다.

<br>

**(5) discuss(댓글) 기능**

- 메인페이지에서 '오늘의 작품'에 해당하는 작품들에 댓글을 달 수 있는 기능
- 작품 디테일페이지에서 댓글을 달 수 있는 기능

**(6) 작품 like toggle 또는 북마크 기능**

- 작품 자체에 좋아요 기능을 추가한다.

<br>

### 추가적으로 해볼 기능

(1) 유저등급 부여

(2) 작품/작가 북마크 기능

(3) 좋아하는 장르 선택한 것을 기반으로 작품 추천

(4) 작가 또는 작품 서치 기능

<br>

---

## 마치며

혼자서 진행해보는 프로젝트를 든든한 사람들과 함께할 수 있어 영광이다. 2달 정도를 소요하고 싶은데 주어진 기간 내에 마칠 수 있었으면 좋겠다.

스터디 프로젝트 세팅 관련 포스트는 <a href="#" target="_blank">1편. 장고 프로젝트 세팅하기</a>로 따로 포스트하였다.

<br>

## 과제

2주차 스터디까지 DB 모델링 설계 및 url 구조를 설계하는 것을 과제로 진행하고, 서로의 설계에 대해 피드백을 받기로 했다.
