const searchEl = document.querySelector('.search');
const searchinputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function () {
  searchinputEl.focus();
});

searchinputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused');
  searchinputEl.setAttribute('placeholder', '통합검색');
});

searchinputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused');
  searchinputEl.setAttribute('placeholder', '');
});

const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

// .throttle 이라는 라이브러리 사용법 _.throttle (함수, 1000ms) 의미는 Scoll 함수를 일정시간 간격으로 실행
//용도는 너무 많이 반복적으로 함수가 실행되는 것을 방지함. 
window.addEventListener('scroll', _.throttle(function () {
  // console.log(window.scrollY);
  if (window.scrollY > 500) {
    //배지 숨기기 
    //  gsap.to(요소, 지속시간, 옵션); 애니메이션 관련 라이브러리 사용법! 
    // gsap 라이브러리 사용시 문장 부호 주의 하기 
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none' // 클릭되지 않게 하기 위하여 
    });
    //버튼 보이기 
    gsap.to(toTopEl, 0.2, {
      x: 0
    });
  } else {
    //배지 보이기
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
    //버튼 숨기기 
    gsap.to(toTopEl, 0.2, {
      x: 100
    });
  }
}, 300));


toTopEl.addEventListener('click', function(){
  gsap.to(window, 0.4, {
    scrollTo: 0
  });
})


const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) {
  //  gsap.to(요소, 지속시간, 옵션); 사용법! 
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7, //0,7 , 1.4 , 2.1 , 2.8초 순서대로 나오게 하기 
    opacity: 1
  });
});

// new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical', // 수직 슬라이드
  autoplay: true, // 자동 재생 여부
  loop: true // 반복 재생 여부
})

new Swiper('.promotion .swiper-container', {
  slidesPerView: 3, // 한 번에 보여줄 슬라이드 개수
  spaceBetween: 10, // 슬라이드 사이 여백
  centeredSlides: true, // 1번 슬라이드가 가운데 보이기
  loop: true, //무한 루프
  autoplay: {
    display: 5000 // 5초에 한번 씩 돌기 
  },
  pagination: {
    el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
    clickable: true //사용자의 페이지 번호 요소 제어여부
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }

});

new Swiper('.awards .swiper-container', {
  // direction: 'horizontal', // 수평 슬라이드
  autoplay: true, // 자동 재생 여부
  loop: true, // 반복 재생 여부
  spaceBetween: 30, // 슬라이드 사이 여백
  slidesPerView: 5, // 한 번에 보여줄 슬라이드 개수
  // slidesPerGroup: 5, // 한 번에 슬라이드 할 개수(전체 개수로 나뉘어야 함)
  navigation: { // 슬라이드 이전/다음 버튼 사용 여부
    prevEl: '.awards .swiper-prev', // 이전 버튼 선택자
    nextEl: '.awards .swiper-next' // 다음 버튼 선택자
  }
})

const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;

//프로모션 내용을 토글 버튼으로 숨겨주는 함수 
promotionToggleBtn.addEventListener('click', function () {
  isHidePromotion = !isHidePromotion
  if (isHidePromotion) {
    //숨김처리 
    promotionEl.classList.add('hide');
  } else {
    //보임처리 
    promotionEl.classList.remove('hide');
  }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size) {
  gsap.to(
    selector, //선택자 
    random(1.5, 2.5), //애니메이션 동작 시간
    {
    y: size,
    repeat: -1, //무한 반복 
    yoyo: true, //다시 돌아오기 
    ease: Power1.easeInOut,
    delay: random(0,delay),
  }
  );
}

floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

const spyEls = document.querySelectorAll('section.scroll-spy');

spyEls.forEach(function(spyEl){
   // ScrollMagic 라이브러리를 통해 특정한 요소를 감시하는 요소를 제공하는 메소드: Scene. 
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, //  보여짐의 여부를 감시할 요소를 지정함. 
      triggerHook: 0.8       // 스크롤 화면 어디서 부터 애니메이션을 줄지 
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
});

const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); //2021 연도 출력됨 

