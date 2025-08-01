# Bookstore

## 설치 방법
### 설치 전 준비
- 설치 환경: linux
- 운영 환경: node 20
- 설치 파일 구성
  - docker-compose.yml: docker compose 설정 파일
  - Dockerfile: docker 이미지 설정 파일
  - start.sh: 전체 설치 과정이 정의된 파일(이 파일만 실행하면 설치 및 구동함)
- 사전 준비(준비된 경우 아래 설치로)
  - docker 및 docker compose 설치
    - docker 설치 참조: https://docs.docker.com/engine/install
    - docker compose 설치 참조: https://docs.docker.com/compose/install

### 설치
- 백엔드 앱을 나중에 설치해도 무방하나, 본 앱을 정상 설치하더라도 백엔드의 DB와는 연결이 되지 않는 상태이므로 기능은 사용할 수 없음. 백엔드 앱을 설치하면 정상 작동함
```shell
### 설치 파일을 실행할 때 백엔드 앱이 설치된 주소를 함께 사용(아래 예시의 http://api-host-url 부분)
$ sh start.sh http://api-host-url
```
- 본 시스템은 포트 3000번을 사용하는데, 만약 포트 3000번이 이미 사용 중일 경우, 본 소스의 docker-compose.yml 파일 변경 후 다시 시도
  - ports 항목의 "3000:3000" 중 앞 숫자를 바꾸고 싶은 포트로 변경한 후 다시 시도(ex. 3333으로 변경할 경우 "3333:3000")

### 설치 완료 확인
- 아래 명령어를 실행하여 구동중인 컨테이너 중 bookstore-frontend가 있으면 설치 완료됨
```shell
$ docker ps --filter "name=bookstore-frontend"
```
- 다만 상기 명령어는 컨테이너가 설치된 것을 의미하며 이후 구동까지는 시간이 더 걸릴 수 있음

### 설치 실패 대응법
- Error response from daemon: driver failed... port is already in use
  - 설치하려는 port가 이미 사용중임. 상기 설치의 포트 변경 방법을 참고하여 다시 설치

### 사용
- 브라우저의 주소창에 설치한 호스트 주소(아래 예시의 client-host 부분) 및 포트(아래 예시는 기본값인 3000번을 사용. 상기 설치 과정에서 변경한 경우는 변경한 번호를 사용해야 함)를 입력하여 접속
```
http://client-host:3000
```
- 외부 망에서 접근하려면 포트포워딩 후 접속 가능

## 페이지 및 기능 동작
### 책 목록
- url: /books
- 기능
  - 책 목록 조회
    - 필터링: 제목, 저자 이름, (사용 안함)
    - 페이지네이션(페이지별 항목 10개)
  - 책 목록 표출
    - 표출 정보: 제목, 저자 이름, 수량
- 페이지 이동
  - 새 책 추가 페이지
  - 책 상세 정보 페이지
  - 페이지 이동

### 새 책 추가
- url: /books/new
- 기능
  - 생성: 책 정보 입력 후 저장 버튼 선택
  - 유효성 확인: 저장 전 확인
- 페이지 이동
  - 책 목록 페이지

### 책 상세 정보
- url: /books/:id
- 기능
  - 수정: 책 정보 변경 후 수정 버튼 선택
  - 유효성 확인: 수정 전 확인
  - 삭제: 삭제 후 책 목록 페이지로 자동 이동
- 페이지 이동
  - 책 목록 페이지
  - 아이디에 해당하는 책이 존재하지 않을 경우 책 목록 페이지로 리다이렉트
