# react-toyproject
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## 소개

- 과제로 만들었던 sns 웹 어플리케이션

- React로 채팅, 게시글, 담벼락, 갤러리, 팔로우, 그룹, 지도 위치 계산 등을 지원하는 SNS 웹 어플리케이션이에요.

- 2인, 2017.04.27~2017.06.19

## 사용 라이브러리, 프레임워크
- react, redux, redux-saga, react-router-dom
- django rest framework
- highcharts



## 구현한 기능 개괄

- 프로필
    - 자신의 프로필 사진 및 개인정보를 확인하고 수정할 수 있어요.
- 타임라인
    - 자신의 글 및 팔로우한 사람의 글을 볼 수 있고, 에디터를 통해 텍스트를 꾸미거나 사진, 동영상을 올릴 수 있어요.
- 담벼락
    - 특정 User가 작성한 글이나 좋아요한 글, 댓글단 글을 모아 볼 수 있어요.
- 채팅
    - 모든 User와 채팅을 할 수 있어요.
    - **WebSocket**으로 구현한 게 아니라 **폴링** 방식으로 구현되어 있으므로, 실제로 서비스할 수는 없어요. 개선이 필요해요.

-   뮤직 플레이어
    - 음악을 올리고 들을 수 있어요. 
    - 사이드바에 존재하고 이를 닫아도 재생 중이 음악은 멈추지 않아요.
    - 음악은 목록에 있는 순서대로 반복 재생되요.
- 그룹
    - 그룹을 생성하고 가입할 수 있어요.
    - 관리자는 공지를 작성할 수 있고, 회원은 대화를 작성할 수 있어요.
- 갤러리
    - 이미지를 올리고 볼 수 있어요.
- 팔로우
    - 원하는 User를 검색하고 Follow할 수 있어요. Follow하기 전에 담벼락을 보러갈 수 있어요.
- 그래프
    - Diet Data를 작성하고 이를 그래프로 확인해볼 수 있어요.
- 지도
    - 지도에 운동한 지점을 표시하고 운동 시간을 계산할 수 있어요.
    - google-maps-api를 이용했어요.


##	사용한 모듈 목록

-  React-router-dom, https://www.npmjs.com/package/react-router-dom
    - 다양한 주소로 라우팅하고 하이퍼링크를 이용해도 react-state가 저장되게 하기 위해 이용했어요.
-	Quill, https://quilljs.com/
    - 타임라인과 담벼락에 쓰이는 rich text editor를 연ㄷ홍했어요.
-	React-image-gallery, https://www.npmjs.com/package/react-image-gallery
    - 이미지 갤러리의 프론트엔드를 꾸밀 때 연동했어요.
-	Highcharts, https://www.highcharts.com/
    - 다이어트 그래프를 표시할 때 사용했어요.
-	Google maps API, https://developers.google.com/maps/?hl=ko
    - 지도의 경로를 계산하고, 사용자의 위치를 계산해 지도로 표시하기 위해 사용했어요.
