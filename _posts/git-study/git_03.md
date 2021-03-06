---
title: Git _ 버전관리 상태 수정하기
date: 2016-10-02
tags:
- Git
---

버전관리컨트롤 시스템인 Git에서 파일을 실수로 추가하지 않았거나 추가하면 안될 파일의 상태를 바꾸고 싶을 때 어떻게 해주어야하는지 정리해보았다.

<br>

## 커밋 합치기

`git`에서 프로젝트 초기에 설정해주는 `.gitignore` 등의 파일을 빼먹고 커밋했다면 다음 명령어를 사용하여 원하는 커밋에 파일을 추가해줄 수 있다.

```powershell
$ git commit --amend
```

에디터 창이 열리면 처음에 입력했던 커밋 메세지가 그대로 뜬다. 추가하거나 그대로 저장한다. `.gitignore`를 추가한 커밋사항이 추가저장된 것을 확인할 수 있다.

<br>

### 삭제

이 경우에는 바로 전에 커밋된 파일을 삭제할 수는 있지만 해당 커밋 이후 다른 커밋을 하고 해당 커밋으로 돌아온 경우 파일이 되살아난다.

<br>

## staging area에서 파일 제외하기

`git add *`나 `git add -A`는 `untracked` 상태의 파일들을 한꺼번에`staging area`로 옮겨준다. 해당 명령어를 실행한 후 몇몇 파일은 `untracked` 상태로 되돌리고 싶은 경우에는 다음과 같이 명령어를 사용한다.

```powershell
$ git rm -r "example.md" --cached
```

<br>

## 커밋에서 파일 하나만 제외하기

`add` 명령어로 staging area에 파일을 추가하거나 커밋한 경우 다음 명령어를 사용하면 원하는 위치의 파일이나 파일명과 일치하는 파일을 `untracked` 상태로 되돌릴 수 있다.

```powershell
$ git reset HEAD~1
$ git reset HEAD <파일명>
Unstaged changes after reset:
M	example.md
```

<br>

## modified 상태의 파일 되돌리기

이미 커밋하고 수정한 파일(`modified` 상태)에서 수정이전의 상태로 가고싶은 경우에 `checkout` 명령어를 사용한다.

`git checkout --<파일명>`

하지만 해당 명령어는 그동안의 수정내용을 모두 지우고 복구되지도 않으니 주의해야한다.

<br>
