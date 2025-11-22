// 메뉴 설정 파일 - 여기만 수정하면 자동으로 메뉴 생성됩니다!
const MENU_CONFIG = {
  // 메인 네비게이션
  mainNav: [
    {
      id: 'heart',
      title: '마음전하기',
      icon: '💌',
      mainUrl: 'heart-main.html', // 마음전하기 메인 홈
      submenu: [
        {
          title: '편지쓰기',
          url: 'letter-service-flow.html',
          action: 'navigate'
        },
        {
          title: '보낸편지함',
          url: 'sent-box.html',
          action: 'navigate'
        },
        {
          title: '받은편지함',
          url: 'inbox.html',
          action: 'modal',
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
      mainUrl: 'legal-main.html', // 법률도우미 메인 홈
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
      mainUrl: 'community-main.html', // 커뮤니티 메인 홈
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
      mainUrl: 'donation-main.html', // 기부나눔 메인 홈
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
      submenu: null
    },
    {
      id: 'support',
      title: '고객센터',
      icon: '📞',
      mainUrl: 'support-main.html', // 고객센터 메인 홈
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

// 메뉴 생성 함수 (화살표 제거, 호버 서브메뉴)
function generateMenu() {
  const mainNav = document.querySelector('.main-nav');
  if (!mainNav) return;

  mainNav.innerHTML = '';

  MENU_CONFIG.mainNav.forEach(menu => {
    const li = document.createElement('li');
    li.className = 'nav-item';

    if (menu.submenu) {
      // 서브메뉴가 있는 경우 - 메인 링크는 카테고리 홈으로 이동
      li.innerHTML = `
        <a href="#" onclick="navigateToPage('${menu.mainUrl}', '페이지 이동 중...'); return false;" class="nav-link">
          ${menu.title}
        </a>
        <div class="submenu-wrapper">
          <ul class="submenu">
            ${menu.submenu.map(sub => `
              <li>
                <a href="#" onclick="${getMenuAction(sub)}; return false;">
                  ${sub.title}
                </a>
              </li>
            `).join('')}
          </ul>
        </div>
      `;
    } else {
      // 서브메뉴가 없는 경우
      li.innerHTML = `
        <a href="#" onclick="${getMenuAction(menu)}; return false;" class="nav-link">
          ${menu.title}
        </a>
      `;
    }

    mainNav.appendChild(li);
  });

  // 호버 이벤트 추가
  addHoverEvents();
}

// 호버 이벤트 추가
function addHoverEvents() {
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    const submenuWrapper = item.querySelector('.submenu-wrapper');
    
    if (submenuWrapper) {
      item.addEventListener('mouseenter', () => {
        submenuWrapper.style.display = 'block';
        setTimeout(() => {
          submenuWrapper.classList.add('show');
        }, 10);
      });

      item.addEventListener('mouseleave', () => {
        submenuWrapper.classList.remove('show');
        setTimeout(() => {
          if (!submenuWrapper.classList.contains('show')) {
            submenuWrapper.style.display = 'none';
          }
        }, 300);
      });
    }
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

// CSS 스타일 자동 주입
function injectSubmenuStyles() {
  const styleId = 'submenu-hover-styles';
  
  // 이미 스타일이 주입되어 있다면 중복 방지
  if (document.getElementById(styleId)) return;
  
  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    /* 네비게이션 아이템 */
    .nav-item {
      position: relative;
    }

    .nav-link {
      display: block;
      padding: 10px 20px;
      text-decoration: none;
      color: var(--black, #000);
      font-size: 15px;
      font-weight: 500;
      transition: color 0.3s;
    }

    .nav-link:hover {
      color: var(--orange, #FF6B35);
    }

    /* 서브메뉴 래퍼 */
    .submenu-wrapper {
      position: absolute;
      top: 100%;
      left: 0;
      display: none;
      opacity: 0;
      transform: translateY(-10px);
      transition: all 0.3s ease;
      z-index: 1000;
      min-width: 200px;
    }

    .submenu-wrapper.show {
      opacity: 1;
      transform: translateY(0);
    }

    /* 서브메뉴 */
    .submenu {
      background: white;
      border: 2px solid var(--gray-100, #E8E8E8);
      border-radius: 15px;
      padding: 15px 0;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      list-style: none;
      margin: 0;
    }

    .submenu li {
      margin: 0;
    }

    .submenu a {
      display: block;
      padding: 12px 25px;
      color: var(--black, #000);
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.3s;
    }

    .submenu a:hover {
      background: linear-gradient(135deg, #FFE5E5 0%, #FFF5E5 100%);
      color: var(--orange, #FF6B35);
    }

    /* 화살표 제거 (혹시 남아있는 경우) */
    .arrow-down {
      display: none !important;
    }
  `;
  
  document.head.appendChild(style);
}

// 스타일 주입 실행
document.addEventListener('DOMContentLoaded', function() {
  injectSubmenuStyles();
  generateMenu();
  generateMypageMenu();
  generateFooterMenu();
});