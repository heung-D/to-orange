// 메뉴 설정 파일 - 여기만 수정하면 자동으로 메뉴 생성됩니다!
const MENU_CONFIG = {
  // 메인 네비게이션
  mainNav: [
    {
      id: 'heart',
      title: '마음전하기',
      icon: '💌',
      mainUrl: 'heart-main.html',
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
          action: 'navigate',
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
      mainUrl: 'legal-main.html',
      submenu: [
        {
          title: '무료법률상담',
          url: 'legal-consult.html',
          action: 'navigate'
        },
        {
          title: '상황진단받기',
          url: 'legal-diagnosis.html',
          action: 'navigate'
        },
        {
          title: '나의상담내역',
          url: 'my-consult.html',
          action: 'navigate'
        }
      ]
    },
    {
      id: 'community',
      title: '커뮤니티',
      icon: '💬',
      mainUrl: 'community-main.html',
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
      mainUrl: 'donation-main.html',
      submenu: [
        {
          title: '기부나눔캠페인',
          url: 'campaign.html',
          action: 'navigate'
        },
        {
          title: '후원소식',
          url: 'support-news.html',
          action: 'navigate'
        },
        {
          title: '후원하기',
          url: 'support.html',
          action: 'navigate'
        }
      ]
    },
    {
      id: 'life-center',
      title: '라이프센터',
      icon: '🏠',
      mainUrl: 'life-center.html',
      submenu: [
        {
          title: '상황별안내',
          url: 'life-situation.html',
          action: 'navigate'
        },
        {
          title: '준비물체크리스트',
          url: 'life-checklist.html',
          action: 'navigate'
        }
      ]
    },
    {
      id: 'support',
      title: '고객센터',
      icon: '📞',
      mainUrl: 'support-main.html',
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
      { title: '법률상담', url: 'legal-consult.html' },
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

// 메뉴 생성 함수 (호버 서브메뉴)
function generateMenu() {
  const mainNav = document.querySelector('.main-nav');
  if (!mainNav) return;

  mainNav.innerHTML = '';

  MENU_CONFIG.mainNav.forEach(menu => {
    const li = document.createElement('li');
    li.className = 'nav-item';

    if (menu.submenu && menu.submenu.length > 0) {
      // 서브메뉴가 있는 경우 - 메인 링크는 카테고리 메인으로 이동
      li.innerHTML = `
        <a href="${menu.mainUrl}" class="nav-link">
          ${menu.title}
        </a>
        <div class="submenu-wrapper">
          <ul class="submenu">
            ${menu.submenu.map(sub => `
              <li>
                <a href="${sub.url}" ${sub.loginRequired ? 'data-login-required="true"' : ''}>
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
        <a href="${menu.mainUrl}" class="nav-link">
          ${menu.title}
        </a>
      `;
    }

    mainNav.appendChild(li);
  });

  // 호버 이벤트 추가
  addHoverEvents();
  // 로그인 필요 링크 처리
  addLoginRequiredHandlers();
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

// 로그인 필요 링크 처리
function addLoginRequiredHandlers() {
  const loginRequiredLinks = document.querySelectorAll('[data-login-required="true"]');
  
  loginRequiredLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // 로그인 상태 체크 (실제 구현시 수정 필요)
      const isLoggedIn = checkLoginStatus();
      
      if (!isLoggedIn) {
        e.preventDefault();
        showLoginModal();
      }
    });
  });
}

// 로그인 상태 체크 (실제 구현시 수정 필요)
function checkLoginStatus() {
  return false; // 기본값: 로그아웃 상태
}

// 로그인 모달 표시
function showLoginModal() {
  alert('로그인이 필요한 서비스입니다.');
  // 실제 로그인 모달 구현
}

// 마이페이지 메뉴 생성
function generateMypageMenu() {
  const mypageSubmenu = document.querySelector('.mypage-submenu');
  if (!mypageSubmenu) return;

  mypageSubmenu.innerHTML = MENU_CONFIG.mypage.map(item => `
    <li>
      <a href="${item.url}">${item.title}</a>
    </li>
  `).join('');
}

// 푸터 메뉴 생성
function generateFooterMenu() {
  const servicesSection = document.querySelector('.footer-section:nth-child(2)');
  const supportSection = document.querySelector('.footer-section:nth-child(3)');

  if (servicesSection) {
    const links = MENU_CONFIG.footer.services.map(item => 
      `<a href="${item.url}" ${item.loginRequired ? 'data-login-required="true"' : ''}>${item.title}</a>`
    ).join('');
    
    servicesSection.innerHTML = `<h4>서비스</h4>${links}`;
  }

  if (supportSection) {
    const links = MENU_CONFIG.footer.support.map(item => 
      `<a href="${item.url}">${item.title}</a>`
    ).join('');
    
    supportSection.innerHTML = `<h4>고객지원</h4>${links}`;
  }
}

// CSS 스타일 자동 주입
function injectSubmenuStyles() {
  const styleId = 'submenu-hover-styles';
  
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
  `;
  
  document.head.appendChild(style);
}

// 페이지 로드 시 자동 실행
document.addEventListener('DOMContentLoaded', function() {
  injectSubmenuStyles();
  generateMenu();
  generateMypageMenu();
  generateFooterMenu();
});
