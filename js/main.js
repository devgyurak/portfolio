(function ($) {
    "use strict";

    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    // 페이지 로드 시 최상단으로 스크롤
    $(document).ready(function () {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
    });


    // Initiate the wowjs
    new WOW().init();


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }


    // Smooth scrolling to section
    $(".btn-scroll").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 0
            }, 1500, 'easeInOutExpo');
        }
    });


    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, { offset: '80%' });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });


    // HTML 콘텐츠를 포함한 객체
    const htmlContents = {
        "좋았쓰! 변환기": `
            <p align="center">
              <img src="https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white" alt="Django">
              <img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python" alt="Python">
              <img src="https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql" alt="MySQL">
              <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker" alt="Docker">
              <img src="https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions" alt="Github Action">
            </p>
            <img src="https://github.com/user-attachments/assets/05933c2a-77d5-4d75-81ef-b64484577a88" alt="스크린샷" class="screen">
            <h2>기간</h2>
            <ul>
              <li>2024.08.17~2024.08.24</li>
            </ul>
            <h2>인원 구성</h2>
            <ul>
              <li>FE 1(본인), BE 1(본인) 총 1명.
              </li>
            </ul>
            <h2>나의 역할</h2>
            <ul>
              <li>1. 간단한 프론트엔드 코드 수정
              </li>
              <li>2. 백엔드 개발 및 코드 리팩토링 담당
              </li>
              <li>3. Docker 이미지 빌드 CI 구성 및 배포
              </li>
            </ul>
            <h2>주요 기능</h2>
            <ul>
              <li>1. 문장 입력
              </li>
              <li>2. 프롬프팅 된 결과 출력
              </li>
            </ul>
            <h2>환경 세팅 및 실행</h2>
            <ul>
              <li><a href="https://git-scm.com/">Git</a>, <a href="https://www.python.org/downloads/">Python</a>, <a href="https://www.mysql.com/">MySQL</a>, 그리고 <a href="https://python-poetry.org/">Poetry</a>가 필요해요!</li>
            </ul>
            <pre><code>
# Clone this repository
$ git clone https://github.com/leegyurak/joatss_backend<br>
# Go into the repository
$ cd joatss_backend<br>
# Enter vitual environment
$ poetry shell<br><br>
# Install dependencies
$ poetry install<br><br>
# Add Environment Variable
$ DJAGNO_SECRET_KEY={add your secret key}
$ CLAUDE_API_KEY={add your API key}
$ MYSQL_HOST={add your MySQL host}
$ MYSQL_PORT={add your MySQL port}
$ MYSQL_USER={add your MySQL user}
$ MYSQL_PASSWORD={add your MySQL password}
$ MYSQL_DATABASE={add your MySQL database}<br>
# Run migrate
$ python manage.py migrate<br>
# Run server
$ python manage.py runserver
    </code ></pre >
            <blockquote>도커 파일을 빌드해도 실행 가능합니다!</blockquote>
            <h2>사용하기</h2>
            <ul>
              <li><a href="https://joatss.devgyurak.com">좋았쓰! 변환기 접속</a></li>
            </ul>
            <h2>후기 (자세한 건 아래 프로젝트 회고에서)</h2>
            <ul>
              <li>1. 아이디어는 가까운 곳에 있다</li>
              <li>평소에는 어떤 아이디어로 토이 프로젝트를 해야할지 몰랐지만 해당 프로젝트의 아이디어를 얻는 과정에서 아이디어는 생각보다 가까운 곳에 있다는 것을 깨달았고 앞으로도 더 많은 토이 프로젝트를 할 수 있을 것이라는 자신감을 얻었습니다.
              <li>2. 스택은 목적 달성을 위해 고르자</li>
              <li>해당 프로젝트를 Django로 진행하면서 빠르게 아이디어를 출시까지 하자라는 목적을 이룰 수 있었습니다. 다만 사용도가 없었던 MySQL을 억지로 도입하여 시간이 더욱 지체 되었는데, 앞으로는 기술을 선정할 때 보다 더 목적에 가까운 기술을 골라야겠다는 점을 알게되었습니다.<li>
            </ul>
            <h2>프로젝트 회고</h2>
            <ul>
              <li><a href="https://velog.io/@devgyurak/%EC%96%B4%EC%A8%8C%EB%93%A0-%EC%99%84%EC%84%B1%ED%96%88%EC%9C%BC%EB%8B%88%EA%B9%8C-%EC%A2%8B%EC%95%98%EC%93%B0-%EC%A2%8B%EC%95%98%EC%93%B0-%EB%B3%80%ED%99%98%EA%B8%B0-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%9A%8C%EA%B3%A0">어쨌든 완성했으니까 좋았쓰! (좋았쓰! 변환기 프로젝트 회고)</a></li>
            </ul>
    `,
        "상징 타로 카드 찾기": `
            <p align="center">
              <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi" alt="FastAPI">
              <img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python" alt="Python">
              <img src="https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql" alt="MySQL">
              <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker" alt="Docker">
              <img src="https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions" alt="Github Action">
            </p>
            <img src="https://github.com/user-attachments/assets/db846a5a-9600-4454-94d8-4f174e20755d" alt="스크린샷" class="screen">
            <h2>기간</h2>
            <ul>
              <li>2024.08.21~2024.08.29</li>
            </ul>
            <h2>인원 구성</h2>
            <ul>
              <li>FE 1(본인), BE 1(본인) 총 1명.
              </li>
            </ul>
            <h2>나의 역할</h2>
            <ul>
              <li>1. 간단한 프론트엔드 코드 수정
              </li>
              <li>2. 백엔드 개발 및 코드 리팩토링 전반적 담당
              </li>
              <li>3. Docker 이미지 빌드 CI 구성 및 배포
              </li>
            </ul>
            <h2>주요 기능</h2>
            <ul>
              <li>1. 생일 입력
              </li>
              <li>2. 공식 계산 및 해당되는 타로 카드 DB에서 선택
              </li>
              <li>3. 로딩 화면 후, 결과 확인 및 이미지 저장
              </li>
            </ul>
            <h2>환경 세팅 및 실행</h2>
            <ul>
              <li><a href="https://git-scm.com/">Git</a>, <a href="https://www.python.org/downloads/">Python</a>, <a href="https://www.mysql.com/">MySQL</a>, 그리고 <a href="https://python-poetry.org/">Poetry</a>가 필요해요!</li>
            </ul>
            <pre><code>
# Clone this repository
$ git clone https://github.com/leegyurak/mytarot_backend<br>
# Go into the repository
$ cd mytarot_backend<br>
# Enter vitual environment
$ poetry shell<br><br>
# Install dependencies
$ poetry install<br><br>
# Add Environment Variable
$ CLAUDE_API_KEY={add your API key}
$ MYSQL_HOST={add your MySQL host}
$ MYSQL_PORT={add your MySQL port}
$ MYSQL_USER={add your MySQL user}
$ MYSQL_PASSWORD={add your MySQL password}
$ MYSQL_DATABASE={add your MySQL database}<br>
# Run migrate
$ alembic upgrade head<br>
# Run server
$ python main.py
    </code ></pre >
            <blockquote>도커 파일을 빌드해도 실행 가능합니다!</blockquote>
            <h2>사용하기</h2>
            <ul>
              <li><a href="https://mytarot.devgyurak.com">상징 타로 카드 찾기 접속</a></li>
            </ul>
            <h2>후기 (자세한 건 아래 프로젝트 회고에서)</h2>
            <ul>
              <li>1. SQLAlchemy를 더욱 공부해야겠다.</li>
              <li>이번 프로젝트에서 SQLAlchemy를 비동기로 사용하면서 DB 커넥션에서 많은 어려움을 겪었습니다. 레퍼런스를 보고 성공하긴 했지만 이를 더욱 자세히 알고 쓰기 위해 많은 공부가 필요할 것 같습니다.
              <li>2. 완성은 끝이 아닌 시작!</li>
              <li>해당 프로젝트를 하면서 타로와 관련된 더욱 많은 아이디어들이 떠올라 프로젝트를 더욱 발전 시킬 수 있을 것 같다는 생각이 들었습니다. 이 과정에서 프로젝트 구조 개선 및 버전 관리까지 학습하고 싶습니다.<li>
            </ul>
            <h2>프로젝트 회고</h2>
    `
    };

    $(document).ready(function () {
        // Portfolio item click event for Bootstrap 4
        $('.portfolio-item').on('click', function () {
            var title = $(this).data('title');  // Get the title from data-title attribute
            var htmlContent = htmlContents[title];  // Get the HTML content
            console.log(htmlContent)

            if (htmlContent) {
                $('#portfolioModalLabel').text(title);  // Set the modal title
                $('#portfolioModal .modal-body').html(htmlContent);  // Set the modal body
            }

            // Bootstrap 4 방식으로 모달 열기
            $('#portfolioModal').modal('show');
        });

        // 모달 닫기 버튼 이벤트 (Bootstrap 4)
        $('#portfolioModal .btn-close').on('click', function () {
            $('#portfolioModal').modal('hide');
        });
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('fast');
        } else {
            $('.back-to-top').fadeOut('fast');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 0, 'easeInOutExpo');
        return false;
    });
})(jQuery);

