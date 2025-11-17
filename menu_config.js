// 메뉴 설정 파일 - 여기만 수정하면 자동으로 메뉴 생성됩니다!
const MENU_CONFIG = {
  // 메인 네비게이션
  mainNav: [
    {
      id: 'heart',
      title: '마음전하기',
      icon: '💌',
      submenu: [
        {
          title: '편지쓰기',
          url: 'letter-service-flow.html',
          action: 'navigate' // navigate | modal | external
        },
        {
          title: '보낸편지함',
          url: 'sent-box.html',
          action: 'navigate'
        },
        {
          title: '받은편지함',
          url: 'inbox.html',
          action: 'modal', // 로그인 모달 띄우기
          loginRequired: true
        },
        {
          title: '임시보관함',
          url: 'draft-box.html',
          action: 'navigate'
        }
      ]
    },
    {
      id: 'legal',
      title: '법률도우미',
      icon: '⚖️',
      submenu: [
        {
          title: '무료상담신청',
          url: 'legal-consult-form.html',
          action: 'navigate'
        },
        {
          title: '나의상담내역',
          url: 'my-consult.html',
          action: 'navigate'
        },
        {
          title: '법률도우미 찾기',
          url: 'find-lawyer.html',
          action: 'navigate'
        },
        {
          title: '정보나눔',
          url: 'legal-info.html',
          action: 'navigate'
        }
      ]
    },
    {
      id: 'community',
      title: '커뮤니티',
      icon: '💬',
      submenu: [
        {
          title: '자유게시판',
          url: 'free-board.html',
          action: 'navigate'
        },
        {
          title: '법률지식 on',
          url: 'legal-knowledge.html',
          action: 'navigate'
        }
      ]
    },
    {
      id: 'donation',
      title: '기부나눔',
      icon: '🎁',
      submenu: [
        {
          title: '기부나눔캠페인',
          url: 'campaign.html',
          action: 'navigate'
        },
        {
          title: '스토리',
          url: 'stories.html',
          action: 'navigate'
        },
        {
          title: '기부소식',
          url: 'donation-news.html',
          action: 'navigate'
        }
      ]
    },
    {
      id: 'life-center',
      title: '라이프 센터',
      icon: '🏠',
      url: 'life-center.html',
      action: 'navigate',
      submenu: null // 서브메뉴 없음
    },
    {
      id: 'support',
      title: '고객센터',
      icon: '📞',
      submenu: [
        {
          title: '이용가이드',
          url: 'guide.html',
          action: 'navigate'
        },
        {
          title: '공지사항',
          url: 'notice.html',
          action: 'navigate'
        },
        {
          title: '1:1문의',
          url: 'inquiry.html',
          action: 'navigate'
        }
      ]
    }
  ],

  // 마이페이지 메뉴
  mypage: [
    {
      title: '홈',
      url: 'mypage-home.html',
      action: 'navigate'
    },
    {
      title: '내정보',
      url: 'mypage-info.html',
      action: 'navigate'
    },
    {
      title: '주문배송조회',
      url: 'mypage-order.html',
      action: 'navigate'
    },
    {
      title: '포인트결제',
      url: 'mypage-point.html',
      action: 'navigate'
    }
  ],

  // 푸터 메뉴
  footer: {
    services: [
      { title: '편지쓰기', url: 'letter-service-flow.html' },
      { title: '받은편지함', url: 'inbox.html', loginRequired: true },
      { title: '법률상담', url: 'legal-consult-form.html' },
      { title: '라이프센터', url: 'life-center.html' },
      { title: '기부나눔', url: 'campaign.html' }
    ],
    support: [
      { title: '이용가이드', url: 'guide.html' },
      { title: '공지사항', url: 'notice.html' },
      { title: '1:1 문의', url: 'inquiry.html' },
      { title: '자주묻는질문', url: 'faq.html' }
    ]
  }
};

// 메뉴 생성 함수
function generateMenu() {
  const mainNav = document.querySelector('.main-nav');
  if (!mainNav) return;

  mainNav.innerHTML = '';

  MENU_CONFIG.mainNav.forEach(menu => {
    const li = document.createElement('li');

    if (menu.submenu) {
      // 서브메뉴가 있는 경우
      li.innerHTML = `
        <a href="#${menu.id}">
          ${menu.title}
          <span class="arrow-down">▼</span>
        </a>
        <ul class="submenu">
          ${menu.submenu.map(sub => `
            <li>
              <a href="#" onclick="${getMenuAction(sub)}; return false;">
                ${sub.title}
              </a>
            </li>
          `).join('')}
        </ul>
      `;
    } else {
      // 서브메뉴가 없는 경우
      li.innerHTML = `
        <a href="#" onclick="${getMenuAction(menu)}; return false;">
          ${menu.title}
        </a>
      `;
    }

    mainNav.appendChild(li);
  });
}

// 메뉴 액션 생성
function getMenuAction(menuItem) {
  if (menuItem.loginRequired) {
    return `showLoginModal()`;
  }
  
  if (menuItem.action === 'navigate') {
    return `navigateToPage('${menuItem.url}', '페이지 이동 중...')`;
  }
  
  if (menuItem.action === 'modal') {
    return `showLoginModal()`;
  }
  
  return `alert('준비 중인 페이지입니다')`;
}

// 마이페이지 메뉴 생성
function generateMypageMenu() {
  const mypageSubmenu = document.querySelector('.mypage-submenu');
  if (!mypageSubmenu) return;

  mypageSubmenu.innerHTML = MENU_CONFIG.mypage.map(item => `
    <li>
      <a href="#" onclick="${getMenuAction(item)}; return false;">
        ${item.title}
      </a>
    </li>
  `).join('');
}

// 푸터 메뉴 생성
function generateFooterMenu() {
  const servicesSection = document.querySelector('.footer-section:nth-child(2)');
  const supportSection = document.querySelector('.footer-section:nth-child(3)');

  if (servicesSection) {
    const links = MENU_CONFIG.footer.services.map(item => 
      `<a href="#" onclick="${getMenuAction(item)}; return false;">${item.title}</a>`
    ).join('');
    
    servicesSection.innerHTML = `<h4>서비스</h4>${links}`;
  }

  if (supportSection) {
    const links = MENU_CONFIG.footer.support.map(item => 
      `<a href="#" onclick="${getMenuAction(item)}; return false;">${item.title}</a>`
    ).join('');
    
    supportSection.innerHTML = `<h4>고객지원</h4>${links}`;
  }
}

// 페이지 로드 시 자동 실행
document.addEventListener('DOMContentLoaded', function() {
  generateMenu();
  generateMypageMenu();
  generateFooterMenu();
});
