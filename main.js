/**
 * 인생마술 (INSAENG MASUL) Official Website
 * Main JavaScript Controller
 */

document.addEventListener('DOMContentLoaded', async () => {

    /* ==========================================================================
       0. DYNAMIC HEADER & FOOTER COMPONENT LOADER
       ========================================================================== */
    await loadHeaderAndFooter();

    async function loadHeaderAndFooter() {
        const headerEl = document.querySelector('header');
        const footerEls = document.querySelectorAll('footer');
        
        const headerHTML = `<div class="nav-container">
            <a href="index.html" class="logo">
                <img src="images/logo.png" alt="인생마술 로고">
            </a>
            <nav>
                <ul class="nav-links" id="nav-links">
                    <li><a href="index.html" data-page="index">홈</a></li>
                    <li><a href="about.html" data-page="about">회사소개</a></li>
                    <li><a href="program.html" data-page="program">프로그램</a></li>
                    <li><a href="history.html" data-page="history">히스토리</a></li>
                    <li><a href="inquiry.html" data-page="inquiry">문의</a></li>
                </ul>
            </nav>
            <button class="hamburger" id="hamburger" aria-label="메뉴 토글">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>`;

        const footerHTML = `<div class="footer-container">
            <div class="footer-info">
                <div class="footer-brand"><span>인생마술</span></div>
                <div class="footer-biz-details">
                    <p>상호명: 인생마술 | 대표자: 이은재</p>
                    <p>사업자등록번호: 305-37-51109 | 이메일: art4623@naver.com</p>
                    <p>주소: 경기도 부천시 원미구 상일로 69, 지12호</p>
                    <p>공연 및 예약 전화 문의: 010-4370-4623 (상담 시간: 10:00 - 19:00)</p>
                </div>
            </div>
            <div class="footer-sns-box">
                <h4 class="sns-title">CONNECT WITH US</h4>
                <div class="sns-links-grid">
                    <a href="https://instagram.com" target="_blank" class="sns-circle-link" aria-label="인스타그램">
                        <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
                    </a>
                    <a href="https://section.blog.naver.com" target="_blank" class="sns-circle-link" aria-label="블로그">
                        <svg viewBox="0 0 24 24"><path d="M22.5 0h-21C.672 0 0 .672 0 1.5v21C0 23.328.672 24 1.5 24h21c.828 0 1.5-.672 1.5-1.5v-21C24 .672 23.328 0 22.5 0zM17.43 12.56h-2.45v5.33h-2.68v-5.33H9.85V9.92h7.58v2.64z" /></svg>
                    </a>
                    <a href="https://pf.kakao.com" target="_blank" class="sns-circle-link" aria-label="카카오톡">
                        <svg viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.707 4.8 4.27 6.054-.188.702-.68 2.531-.777 2.893-.118.438.148.433.31.325.127-.085 2.012-1.366 2.805-1.902.443.084.903.13 1.392.13 4.97 0 9-3.186 9-7.115C21 6.185 16.97 3 12 3z" /></svg>
                    </a>
                    <a href="tel:010-4370-4623" class="sns-circle-link" aria-label="전화번호">
                        <svg viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.58l2.2-2.21c.28-.27.36-.66.25-1.01-.36-1.11-.56-2.3-.56-3.53 0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.58c0-.56-.45-1-1-1z" /></svg>
                    </a>
                </div>
            </div>
        </div>
        <div class="footer-copyright">
            © 2026 INSAENG MASUL. ALL RIGHTS RESERVED.
        </div>`;

        // 1. Load Header
        if (headerEl) {
            let loaded = false;
            if (window.location.protocol.startsWith('http')) {
                try {
                    const response = await fetch('header.html');
                    if (response.ok) {
                        headerEl.innerHTML = await response.text();
                        loaded = true;
                    }
                } catch (e) {
                    console.warn("Header fetch failed, falling back to local template", e);
                }
            }
            if (!loaded) {
                headerEl.innerHTML = headerHTML;
            }
            highlightActiveNav();
            initHeaderInteractions();
        }

        // 2. Load Footer
        if (footerEls.length > 0) {
            let loaded = false;
            let footerContent = '';
            if (window.location.protocol.startsWith('http')) {
                try {
                    const response = await fetch('footer.html');
                    if (response.ok) {
                        footerContent = await response.text();
                        loaded = true;
                    }
                } catch (e) {
                    console.warn("Footer fetch failed, falling back to local template", e);
                }
            }
            if (!loaded) {
                footerContent = footerHTML;
            }
            footerEls.forEach(footer => {
                footer.innerHTML = footerContent;
            });
        }
    }

    function highlightActiveNav() {
        const path = window.location.pathname;
        const page = path.substring(path.lastIndexOf('/') + 1);
        
        let activePage = 'index'; // default
        if (page.includes('about.html')) activePage = 'about';
        else if (page.includes('program.html')) activePage = 'program';
        else if (page.includes('history.html')) activePage = 'history';
        else if (page.includes('inquiry.html')) activePage = 'inquiry';
        else if (page.includes('admin.html')) activePage = 'admin';

        // Highlight matching link
        document.querySelectorAll('.nav-links a').forEach(link => {
            const pageAttr = link.getAttribute('data-page');
            if (pageAttr === activePage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    function initHeaderInteractions() {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('nav-links');

        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navLinks.classList.toggle('active');
            });

            // Close mobile drawer when clicking a link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                });
            });
        }
    }

    // Shrink header on scroll
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.padding = '10px 0';
                header.style.background = 'rgba(7, 6, 10, 0.9)';
            } else {
                header.style.padding = '20px 0';
                header.style.background = 'rgba(7, 6, 10, 0.4)';
            }
        });
    }


    /* ==========================================================================
       2. SCROLL SNAPPING ACTIVE SECTIONS & MOTTO ANIMATION (index.html)
       ========================================================================== */
    const scrollContainer = document.getElementById('scroll-container');
    const snapSections = document.querySelectorAll('.snap-section');

    if (scrollContainer && snapSections.length > 0) {
        const observerOptions = {
            root: scrollContainer,
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    snapSections.forEach(sec => sec.classList.remove('active'));
                    entry.target.classList.add('active');

                    // Highlight matching nav link
                    const secId = entry.target.getAttribute('id');
                    document.querySelectorAll('.nav-links a').forEach(link => {
                        const href = link.getAttribute('href');
                        if (href === 'index.html' || href === '#home') {
                            link.classList.remove('active');
                            if (secId === 'home') link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        snapSections.forEach(section => observer.observe(section));
    }


    /* ==========================================================================
       3. ABOUT PAGE SUB-TABS & GROWING TIMELINE (about.html)
       ========================================================================== */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');

                tabButtons.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                btn.classList.add('active');
                const targetContent = document.getElementById(targetTab);
                if (targetContent) {
                    targetContent.classList.add('active');
                }

                // If switching to timeline, re-trigger line growth
                if (targetTab === 'timeline-tab') {
                    triggerTimelineGrowth();
                }
            });
        });

        // Initialize timeline scroll growth
        triggerTimelineGrowth();
    }

    function triggerTimelineGrowth() {
        const timelineLine = document.getElementById('timeline-line');
        const timelineItems = document.querySelectorAll('.timeline-item');

        if (!timelineLine) return;

        // Animate line growth immediately
        setTimeout(() => {
            timelineLine.style.height = '100%';
        }, 300);

        // Animate individual items revealing sequentially
        const itemObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.15 });

        timelineItems.forEach(item => itemObserver.observe(item));
    }


    /* ==========================================================================
       4. 3D TILT EFFECT CONTROLLER (program.html)
       ========================================================================== */
    const tiltCards = document.querySelectorAll('.js-tilt');

    if (tiltCards.length > 0) {
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const cardRect = card.getBoundingClientRect();
                const cardWidth = cardRect.width;
                const cardHeight = cardRect.height;

                // Calculate mouse position relative to the center of the card (-0.5 to 0.5)
                const mouseX = (e.clientX - cardRect.left) / cardWidth - 0.5;
                const mouseY = (e.clientY - cardRect.top) / cardHeight - 0.5;

                // Max tilt angle in degrees
                const maxTilt = 15;

                // Dynamic rotation calculation
                const rotateX = -mouseY * maxTilt;
                const rotateY = mouseX * maxTilt;

                // Apply transforms
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
                card.style.boxShadow = `0 15px 45px rgba(212, 175, 55, 0.25), 0 0 20px rgba(138, 43, 226, 0.15)`;
                card.style.borderColor = 'rgba(212, 175, 55, 0.4)';
            });

            card.style.transition = 'transform 0.1s ease, box-shadow 0.3s ease, border-color 0.3s ease';

            card.addEventListener('mouseleave', () => {
                card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease';
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                card.style.boxShadow = '';
                card.style.borderColor = '';
            });
        });
    }


    /* ==========================================================================
       5. SHOW HISTORY BOARD & MODAL DETAILED VIEWER (history.html)
       ========================================================================== */
    const historyGrid = document.getElementById('history-grid');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');

    // Prepopulated stunning mock history data
    const defaultHistory = [
        {
            id: 1716931200000,
            program: "반짝반짝 빛나는 마술사의 방",
            title: "서울 마포아트센터 오리지널 정기 매직 콘서트 성황리 성료!",
            date: "2026-05-15",
            location: "서울 마포아트센터 대극장",
            description: "인생마술 크루의 혼이 듬뿍 실린 오리지널 극장 매직 쇼 '반짝반짝 빛나는 마술사의 방'이 전석 매진을 기록하며 성황리에 막을 내렸습니다. 빛을 활용한 다채로운 일루전과 따뜻한 감동이 담긴 옴니버스 스토리극에 관객 여러분께서 기립 박수를 보내주셨습니다.",
            image: "" // Placeholder magic visual
        },
        {
            id: 1716499200000,
            program: "매직버블벌룬쇼",
            title: "대전 월드컵 어린이회관 초청 - 꿈과 상상을 전파한 키즈 축제",
            date: "2026-05-10",
            location: "대전 월드컵 어린이회관",
            description: "가정의 달을 맞아 대전 월드컵 어린이회관에서 매직버블벌룬쇼를 선보였습니다. 수많은 비눗방울과 대형 풍선 아트 퍼포먼스가 어우러져 어린이들과 학부모님들 모두가 무대 위에 올라가 꼬마 마술사가 되어 함께 즐기는 환상의 하루였습니다.",
            image: ""
        },
        {
            id: 1715808000000,
            program: "안녕, 낯선이",
            title: "부산 해운대 모래축제 거리 버스킹 - 열광의 스트리트 피버!",
            date: "2026-05-02",
            location: "부산 해운대 백사장 광장",
            description: "파란 바다를 등지고 펼쳐진 안녕, 낯선이 버스킹 쇼! 지나가던 500여 명의 관객들이 인생마술의 참여형 1인극에 스며들어 무대를 꽉 메워주셨습니다. 관객분들이 직접 이야기의 주인공으로 어우러져 소통했던 잊지 못할 밤이었습니다.",
            image: ""
        }
    ];

    async function getHistoryData() {
        if (window.fb && window.fb.isInitialized()) {
            try {
                let posts = await window.fb.getHistory();
                if (posts && posts.length === 0) {
                    console.log("Firestore history collection is empty. Auto-populating initial data...");
                    for (const item of defaultHistory) {
                        await window.fb.saveHistory(item);
                    }
                    posts = await window.fb.getHistory();
                }
                return posts || defaultHistory;
            } catch (e) {
                console.error("Firebase read failed, using localStorage fallback:", e);
            }
        }

        let data = localStorage.getItem('insaeng_history');
        if (!data) {
            localStorage.setItem('insaeng_history', JSON.stringify(defaultHistory));
            return defaultHistory;
        }
        return JSON.parse(data);
    }

    async function renderHistoryBoard() {
        if (!historyGrid) return;
        const allPosts = await getHistoryData();
        const posts = allPosts.filter(p => !p.hidden);
        historyGrid.innerHTML = '';

        if (posts.length === 0) {
            historyGrid.innerHTML = `<div class="glass-panel" style="grid-column: span 3; text-align: center; padding: 50px; color: var(--color-text-muted);">아직 등록된 공연 실적이 없습니다. 관리자 화면에서 게시글을 작성해주세요.</div>`;
            return;
        }

        posts.forEach(post => {
            const card = document.createElement('div');
            card.className = 'history-item-card glass-panel';
            card.innerHTML = `
                <div class="history-img-box">
                    ${post.image ? `<img src="${post.image}" alt="공연 현장">` : `
                    <svg class="history-img-placeholder-svg" viewBox="0 0 24 24">
                        <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.707 4.8 4.27 6.054-.188.702-.68 2.531-.777 2.893-.118.438.148.433.31.325.127-.085 2.012-1.366 2.805-1.902.443.084.903.13 1.392.13 4.97 0 9-3.186 9-7.115C21 6.185 16.97 3 12 3zm0 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>`}
                </div>
                <div class="history-text-box">
                    <div class="history-date-loc">
                        <span>📅 ${post.date}</span>
                        <span>📍 ${post.location}</span>
                    </div>
                    <h4 class="history-card-title">[${post.program}] ${post.title}</h4>
                    <p class="history-card-desc">${post.description}</p>
                </div>
            `;

            card.addEventListener('click', () => openModal(post));
            historyGrid.appendChild(card);
        });
    }

    function openModal(post) {
        if (!modalOverlay) return;

        const imgContainer = document.getElementById('modal-img-container');
        const meta = document.getElementById('modal-meta');
        const title = document.getElementById('modal-title');
        const desc = document.getElementById('modal-content-text');

        if (imgContainer) {
            imgContainer.innerHTML = post.image ? `<img src="${post.image}" alt="현장">` : `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#110e1a;">
                <svg class="history-img-placeholder-svg" style="width: 25%; height: 25%;" viewBox="0 0 24 24">
                    <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.707 4.8 4.27 6.054-.188.702-.68 2.531-.777 2.893-.118.438.148.433.31.325.127-.085 2.012-1.366 2.805-1.902.443.084.903.13 1.392.13 4.97 0 9-3.186 9-7.115C21 6.185 16.97 3 12 3zm0 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
            </div>`;
        }
        if (meta) meta.innerHTML = `<span>📅 ${post.date}</span> <span>📍 ${post.location}</span> <span>🏷️ ${post.program}</span>`;
        if (title) title.innerText = post.title;
        if (desc) desc.innerText = post.description;

        modalOverlay.style.display = 'flex';
        setTimeout(() => {
            modalOverlay.classList.add('active');
        }, 10);
    }

    if (modalClose && modalOverlay) {
        modalClose.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    function closeModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('active');
        setTimeout(() => {
            modalOverlay.style.display = 'none';
        }, 300);
    }

    // Render history on page load
    renderHistoryBoard();


    /* ==========================================================================
       6. CLIENT-SIDE LOCAL ADMIN MANAGEMENT & FIREBASE AUTH (admin.html)
       ========================================================================== */
    const adminLockscreen = document.getElementById('admin-lockscreen');
    const adminDashboard = document.getElementById('admin-dashboard');
    const passcodeBtn = document.getElementById('lock-submit-btn');
    const passcodeField = document.getElementById('passcode-input');
    const adminEmailField = document.getElementById('admin-email-input');
    const adminLogoutBtn = document.getElementById('admin-logout-btn');

    // Subscribe to Firebase Auth state if available
    let firebaseUser = null;
    if (window.fb && window.fb.isInitialized() && (adminLockscreen || adminDashboard)) {
        window.fb.onAuthStateChanged(async (user) => {
            if (user) {
                firebaseUser = user;
                if (adminLockscreen) adminLockscreen.style.display = 'none';
                if (adminDashboard) adminDashboard.style.display = 'block';
                if (adminLogoutBtn) {
                    adminLogoutBtn.style.display = 'block';
                    adminLogoutBtn.innerText = '로그아웃';
                }
                const emailGroup = document.getElementById('admin-email-group');
                if (emailGroup) emailGroup.style.display = 'none';

                await renderAdminList();
                await renderAdminInquiries();
            } else {
                firebaseUser = null;
                if (adminLockscreen) adminLockscreen.style.display = 'block';
                if (adminDashboard) adminDashboard.style.display = 'none';
                if (adminLogoutBtn) adminLogoutBtn.style.display = 'none';
                const emailGroup = document.getElementById('admin-email-group');
                if (emailGroup) emailGroup.style.display = 'block';
            }
        });
    }

    if (passcodeBtn && passcodeField) {
        passcodeBtn.addEventListener('click', handleAuth);
        passcodeField.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') handleAuth();
        });
    }

    if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', async () => {
            if (window.fb && window.fb.isInitialized() && firebaseUser) {
                if (confirm('로그아웃 하시겠습니까?')) {
                    try {
                        await window.fb.logout();
                    } catch (e) {
                        alert('로그아웃 실패: ' + e.message);
                    }
                }
            } else {
                if (confirm('로컬 관리자 세션을 종료하시겠습니까?')) {
                    window.location.reload();
                }
            }
        });
    }

    async function handleAuth() {
        const email = adminEmailField ? adminEmailField.value.trim() : '';
        const passcode = passcodeField.value.trim();

        // 1. Firebase Auth Mode (If email is entered)
        if (window.fb && window.fb.isInitialized() && email !== '') {
            try {
                const originalText = passcodeBtn.innerText;
                passcodeBtn.innerText = '로그인 중...';
                passcodeBtn.disabled = true;

                await window.fb.login(email, passcode);

                passcodeBtn.innerText = originalText;
                passcodeBtn.disabled = false;
                return;
            } catch (e) {
                alert('Firebase 로그인 실패: ' + e.message);
                passcodeBtn.innerText = '인증 및 로그인';
                passcodeBtn.disabled = false;
                passcodeField.value = '';
                passcodeField.focus();
                return;
            }
        }

        // 2. Local Storage Passcode Bypass Mode
        if (passcode === 'magic123') {
            if (adminLockscreen) adminLockscreen.style.display = 'none';
            if (adminDashboard) adminDashboard.style.display = 'block';
            if (adminLogoutBtn) {
                adminLogoutBtn.style.display = 'block';
                adminLogoutBtn.innerText = '로컬 세션 종료';
            }
            const emailGroup = document.getElementById('admin-email-group');
            if (emailGroup) emailGroup.style.display = 'none';

            await renderAdminList();
            await renderAdminInquiries();
        } else {
            alert('비밀번호 또는 이메일 정보가 올바르지 않습니다.');
            passcodeField.value = '';
            passcodeField.focus();
        }
    }

    // Base64 file converter and preview
    const fileInput = document.getElementById('admin-post-file');
    const fileLabelText = document.getElementById('file-label-text');
    const imgPreviewBox = document.getElementById('image-preview-box');
    const imgPreview = document.getElementById('image-preview');
    let loadedBase64 = '';

    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            if (file.size > 2.5 * 1024 * 1024) {
                alert('사진 용량이 너무 큽니다. 2.5MB 이하의 이미지를 업로드해주세요.');
                fileInput.value = '';
                return;
            }

            fileLabelText.innerText = file.name;
            const reader = new FileReader();
            reader.onload = (event) => {
                loadedBase64 = event.target.result;
                if (imgPreview) imgPreview.src = loadedBase64;
                if (imgPreviewBox) imgPreviewBox.style.display = 'block';
            };
            reader.readAsDataURL(file);
        });
    }

    // Form submit inside admin
    const adminForm = document.getElementById('admin-form');
    if (adminForm) {
        adminForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const programVal = document.getElementById('admin-post-prog').value;
            const dateVal = document.getElementById('admin-post-date').value;
            const locVal = document.getElementById('admin-post-loc').value;
            const titleVal = document.getElementById('admin-post-title').value;
            const descVal = document.getElementById('admin-post-desc').value;

            const newPost = {
                id: Date.now(),
                program: programVal,
                title: titleVal,
                date: dateVal,
                location: locVal,
                description: descVal,
                image: loadedBase64,
                hidden: false
            };

            // Firestore Write
            if (window.fb && window.fb.isInitialized()) {
                try {
                    await window.fb.saveHistory(newPost);
                } catch (err) {
                    alert('Firestore 저장 실패: ' + err.message);
                    return;
                }
            }

            // Sync with local storage
            const currentList = await getHistoryData();
            if (!currentList.some(p => p.id === newPost.id)) {
                currentList.unshift(newPost);
                localStorage.setItem('insaeng_history', JSON.stringify(currentList));
            }

            alert('공연 히스토리가 성공적으로 등록되었습니다.');

            // Reset form
            adminForm.reset();
            loadedBase64 = '';
            if (fileLabelText) fileLabelText.innerText = '여기를 눌러 사진 선택';
            if (imgPreviewBox) imgPreviewBox.style.display = 'none';
            if (imgPreview) imgPreview.src = '';

            await renderAdminList();
        });
    }

    // Render list for delete inside admin
    const adminListBox = document.getElementById('admin-list-box');
    const postsCount = document.getElementById('posts-count');

    async function renderAdminList() {
        if (!adminListBox) return;
        const posts = await getHistoryData();
        adminListBox.innerHTML = '';
        if (postsCount) postsCount.innerText = `${posts.length}개`;

        if (posts.length === 0) {
            adminListBox.innerHTML = `<div style="text-align: center; padding: 30px; color: var(--color-text-muted); font-size: 0.9rem;">등록된 포스트가 없습니다.</div>`;
            return;
        }

        posts.forEach(post => {
            const item = document.createElement('div');
            item.className = `admin-list-item${post.hidden ? ' is-hidden' : ''}`;

            const eyeOpenSvg = `<svg style="width: 20px; height: 20px;" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>`;
            const eyeClosedSvg = `<svg style="width: 20px; height: 20px;" fill="currentColor" viewBox="0 0 24 24"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.82l2.92 2.92c1.51-1.2 2.7-2.78 3.44-4.74-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.17c0-1.66-1.34-3-3-3l-.17.02z"/></svg>`;

            item.innerHTML = `
                <div class="admin-item-info">
                    <h5>
                        [${post.program}] ${post.title.substring(0, 20)}...
                        ${post.hidden ? '<span class="badge-hidden">숨김됨</span>' : ''}
                    </h5>
                    <p>📅 ${post.date} | 📍 ${post.location}</p>
                </div>
                <div style="display: flex; align-items: center;">
                    <button type="button" class="admin-hide-btn" aria-label="${post.hidden ? '보이기' : '숨기기'}">
                        ${post.hidden ? eyeClosedSvg : eyeOpenSvg}
                    </button>
                    <button type="button" class="admin-delete-btn" aria-label="삭제">
                        <svg style="width: 20px; height: 20px;" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                    </button>
                </div>
            `;

            item.querySelector('.admin-hide-btn').addEventListener('click', () => {
                togglePostVisibility(post.id);
            });

            item.querySelector('.admin-delete-btn').addEventListener('click', () => {
                if (confirm('정말로 이 포스트를 삭제하시겠습니까?')) {
                    deletePost(post.id);
                }
            });

            adminListBox.appendChild(item);
        });
    }

    async function togglePostVisibility(id) {
        const posts = await getHistoryData();
        const postToUpdate = posts.find(p => p.id === id);
        if (!postToUpdate) return;
        const newHidden = !postToUpdate.hidden;

        if (window.fb && window.fb.isInitialized()) {
            try {
                await window.fb.updateHistoryHidden(id, newHidden);
            } catch (err) {
                alert('Firestore 상태 업데이트 실패: ' + err.message);
                return;
            }
        }

        const updated = posts.map(p => {
            if (p.id === id) {
                p.hidden = newHidden;
            }
            return p;
        });
        localStorage.setItem('insaeng_history', JSON.stringify(updated));
        await renderAdminList();
    }

    async function deletePost(id) {
        if (window.fb && window.fb.isInitialized()) {
            try {
                await window.fb.deleteHistory(id);
            } catch (err) {
                alert('Firestore 삭제 실패: ' + err.message);
                return;
            }
        }

        const posts = await getHistoryData();
        const filtered = posts.filter(p => p.id !== id);
        localStorage.setItem('insaeng_history', JSON.stringify(filtered));
        await renderAdminList();
    }

    // Data Export/Import
    const exportBtn = document.getElementById('admin-export-btn');
    const importInput = document.getElementById('admin-import-file');

    if (exportBtn) {
        exportBtn.addEventListener('click', async () => {
            const posts = await getHistoryData();
            const dataStr = JSON.stringify(posts);
            const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

            const exportFileDefaultName = 'insaeng_masul_history_backup.json';

            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
        });
    }

    if (importInput) {
        importInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = async (event) => {
                try {
                    const parsed = JSON.parse(event.target.result);
                    if (Array.isArray(parsed)) {
                        if (window.fb && window.fb.isInitialized()) {
                            for (const item of parsed) {
                                await window.fb.saveHistory(item);
                            }
                        }
                        localStorage.setItem('insaeng_history', JSON.stringify(parsed));
                        alert('데이터 복원이 성공적으로 완료되었습니다.');
                        await renderAdminList();
                    } else {
                        alert('올바른 백업 파일 포맷이 아닙니다.');
                    }
                } catch (err) {
                    alert('파일 해석 중 오류가 발생했습니다: ' + err.message);
                }
            };
            reader.readAsText(file);
        });
    }


    /* ==========================================================================
       7. DETAILED BOOKING FORM & PARTICLE SYSTEM (inquiry.html)
       ========================================================================== */
    const inquiryForm = document.getElementById('inquiry-form');
    const successModal = document.getElementById('success-modal');
    const successCard = document.getElementById('success-card');

    // Terms modal control
    const termsOpen = document.getElementById('terms-open-btn');
    const termsClose = document.getElementById('terms-close-btn');
    const termsModal = document.getElementById('terms-modal');

    if (termsOpen && termsModal && termsClose) {
        termsOpen.addEventListener('click', (e) => {
            e.preventDefault();
            termsModal.style.display = 'flex';
        });
        termsClose.addEventListener('click', () => {
            termsModal.style.display = 'none';
        });
        termsModal.addEventListener('click', (e) => {
            if (e.target === termsModal) termsModal.style.display = 'none';
        });
    }

    if (inquiryForm) {
        inquiryForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Collect inquiry data
            const nameVal = document.getElementById('inq-name').value;
            const phoneVal = document.getElementById('inq-phone').value;
            const dateVal = document.getElementById('inq-date').value;
            const timeVal = document.getElementById('inq-time').value;
            const addrVal = document.getElementById('inq-addr').value;
            const audienceVal = document.getElementById('inq-audience').value;
            const budgetVal = document.getElementById('inq-budget').value;
            
            // Collect ages
            const ageCheckboxes = document.querySelectorAll('input[name="inq-age"]:checked');
            const agesVal = Array.from(ageCheckboxes).map(cb => cb.value);
            
            const descVal = document.getElementById('inq-desc').value;

            const newInquiry = {
                id: Date.now(),
                name: nameVal,
                phone: phoneVal,
                date: dateVal,
                time: timeVal,
                address: addrVal,
                audience: audienceVal,
                budget: budgetVal,
                ages: agesVal,
                description: descVal,
                timestamp: new Date().toLocaleString('ko-KR'),
                read: false
            };

            // Firestore Write
            if (window.fb && window.fb.isInitialized()) {
                try {
                    await window.fb.saveInquiry(newInquiry);
                } catch (err) {
                    alert('Firestore 문의 접수 실패: ' + err.message);
                    return;
                }
            }

            // Sync with local storage
            const inquiries = JSON.parse(localStorage.getItem('insaeng_inquiries') || '[]');
            if (!inquiries.some(i => i.id === newInquiry.id)) {
                inquiries.unshift(newInquiry);
                localStorage.setItem('insaeng_inquiries', JSON.stringify(inquiries));
            }

            // Fire canvas particle explosion
            explodeMagicParticles();

            // Display success modal
            if (successModal && successCard) {
                successModal.style.display = 'flex';
                setTimeout(() => {
                    successCard.classList.add('active');
                }, 100);
            }
        });
    }

    // Inquiries management functions for Admin Dashboard
    const btnTabInquiry = document.getElementById('btn-tab-inquiry');
    if (btnTabInquiry) {
        btnTabInquiry.addEventListener('click', async () => {
            await renderAdminInquiries();
        });
    }

    async function getInquiriesData() {
        if (window.fb && window.fb.isInitialized()) {
            try {
                const list = await window.fb.getInquiries();
                return list || [];
            } catch (err) {
                console.error("Firebase read failed, using localStorage fallback:", err);
            }
        }
        const data = localStorage.getItem('insaeng_inquiries');
        return data ? JSON.parse(data) : [];
    }

    async function renderAdminInquiries() {
        const inquiryListContainer = document.getElementById('admin-inquiry-list');
        const inquiriesCount = document.getElementById('inquiries-count');
        if (!inquiryListContainer) return;

        const inquiries = await getInquiriesData();
        inquiryListContainer.innerHTML = '';
        if (inquiriesCount) inquiriesCount.innerText = `${inquiries.length}개`;

        if (inquiries.length === 0) {
            inquiryListContainer.innerHTML = `<div style="text-align: center; padding: 50px; color: var(--color-text-muted); font-size: 0.9rem;">신청된 문의 내역이 없습니다.</div>`;
            return;
        }

        inquiries.forEach(inq => {
            const card = document.createElement('div');
            card.className = 'glass-panel';
            card.style.padding = '24px';
            card.style.marginBottom = '20px';
            card.style.border = 'var(--border-glass)';
            card.style.borderRadius = '16px';
            card.style.boxShadow = 'var(--shadow-premium)';
            card.style.background = 'rgba(18, 16, 26, 0.4)';

            const ageBadges = inq.ages && inq.ages.length > 0 
                ? inq.ages.map(age => `<span style="background: rgba(138, 43, 226, 0.15); border: 1px solid rgba(138, 43, 226, 0.3); color: #d1b3ff; font-size: 0.8rem; padding: 3px 10px; border-radius: 12px; margin-right: 8px; display: inline-block; margin-bottom: 5px;">${age}</span>`).join('') 
                : '<span style="color: var(--color-text-muted); font-size: 0.85rem;">선택 없음</span>';

            card.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 15px; margin-bottom: 15px; flex-wrap: wrap; gap: 15px;">
                    <div>
                        <h4 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin-bottom: 6px; display: flex; align-items: center; flex-wrap: wrap; gap: 10px;">
                            ${inq.name} 
                            <span style="font-size: 0.9rem; font-weight: 400; color: var(--color-text-muted);">📞 ${inq.phone}</span>
                        </h4>
                        <div style="font-size: 0.8rem; color: var(--color-primary-gold);">신청일시: ${inq.timestamp}</div>
                    </div>
                    <div style="display: flex; gap: 10px; align-items: center;">
                        <button type="button" class="btn-glass btn-inq-read" data-id="${inq.id}" style="padding: 6px 14px; font-size: 0.8rem; border-radius: 20px; border-color: ${inq.read ? 'rgba(255, 255, 255, 0.15)' : 'var(--color-primary-gold)'}; color: ${inq.read ? 'var(--color-text-muted)' : 'var(--color-primary-gold)'}; cursor: pointer; background: transparent; transition: var(--transition-fast);">
                            ${inq.read ? '읽음 완료' : '미확인'}
                        </button>
                        <button type="button" class="admin-delete-btn btn-inq-delete" data-id="${inq.id}" style="background: rgba(255, 77, 77, 0.1); border: none; color: #ff4d4d; cursor: pointer; padding: 8px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: var(--transition-fast); width: 34px; height: 34px;">
                            <svg style="width: 18px; height: 18px;" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                        </button>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 15px; margin-bottom: 20px; font-size: 0.9rem;">
                    <div><strong style="color: var(--color-text-muted);">📅 희망 일시:</strong> <span style="color: #fff;">${inq.date} ${inq.time}</span></div>
                    <div><strong style="color: var(--color-text-muted);">📍 공연 장소:</strong> <span style="color: #fff;">${inq.address}</span></div>
                    <div><strong style="color: var(--color-text-muted);">👥 예상 관객:</strong> <span style="color: #fff;">${inq.audience}</span></div>
                    <div><strong style="color: var(--color-text-muted);">💰 기획 예산:</strong> <span style="color: #fff;">${inq.budget}</span></div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <strong style="color: var(--color-text-muted); font-size: 0.9rem; display: block; margin-bottom: 8px;">👥 주요 연령층:</strong>
                    <div>${ageBadges}</div>
                </div>
                
                <div style="background: rgba(0, 0, 0, 0.25); padding: 18px; border-radius: 8px; border: var(--border-glass);">
                    <strong style="color: var(--color-text-muted); font-size: 0.9rem; display: block; margin-bottom: 8px;">💬 상세 문의 내용:</strong>
                    <p style="color: #e5e5e7; line-height: 1.6; font-size: 0.95rem; white-space: pre-wrap; word-break: break-all; margin: 0;">${inq.description || '작성된 내용이 없습니다.'}</p>
                </div>
            `;

            // Attach event listeners
            card.querySelector('.btn-inq-read').addEventListener('click', () => {
                toggleInquiryRead(inq.id);
            });

            card.querySelector('.btn-inq-delete').addEventListener('click', () => {
                if (confirm('정말로 이 문의 글을 삭제하시겠습니까? (삭제된 정보는 복구할 수 없습니다)')) {
                    deleteInquiry(inq.id);
                }
            });

            inquiryListContainer.appendChild(card);
        });
    }

    async function toggleInquiryRead(id) {
        const inquiries = await getInquiriesData();
        const inqToUpdate = inquiries.find(inq => inq.id === id);
        if (!inqToUpdate) return;
        const newRead = !inqToUpdate.read;

        if (window.fb && window.fb.isInitialized()) {
            try {
                await window.fb.updateInquiryRead(id, newRead);
            } catch (err) {
                alert('Firestore 읽음 처리 실패: ' + err.message);
                return;
            }
        }

        const updated = inquiries.map(inq => {
            if (inq.id === id) {
                inq.read = newRead;
            }
            return inq;
        });
        localStorage.setItem('insaeng_inquiries', JSON.stringify(updated));
        await renderAdminInquiries();
    }

    async function deleteInquiry(id) {
        if (window.fb && window.fb.isInitialized()) {
            try {
                await window.fb.deleteInquiry(id);
            } catch (err) {
                alert('Firestore 문의 삭제 실패: ' + err.message);
                return;
            }
        }

        const inquiries = await getInquiriesData();
        const filtered = inquiries.filter(inq => inq.id !== id);
        localStorage.setItem('insaeng_inquiries', JSON.stringify(filtered));
        await renderAdminInquiries();
    }

    // CANVAS PARTICLES ENGINE
    const canvas = document.getElementById('particle-canvas');
    let ctx = null;
    let particles = [];

    if (canvas) {
        ctx = canvas.getContext('2d');
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
    }

    function resizeCanvas() {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;

            // Random direction speeds
            this.vx = (Math.random() - 0.5) * 14;
            this.vy = (Math.random() - 0.5) * 14 - 3; // slight upward drag

            // Sizes & speeds
            this.size = Math.random() * 8 + 4;
            this.color = Math.random() > 0.5 ? '#d4af37' : '#8a2be2'; // Gold or Purple

            this.opacity = 1;
            this.fadeSpeed = Math.random() * 0.015 + 0.01;
            this.gravity = 0.15;
            this.shape = Math.random() > 0.4 ? 'star' : 'circle';
        }

        update() {
            this.vy += this.gravity;
            this.x += this.vx;
            this.y += this.vy;
            this.opacity -= this.fadeSpeed;
        }

        draw() {
            if (!ctx) return;
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;

            if (this.shape === 'circle') {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // Drawing a simple star
                ctx.beginPath();
                for (let i = 0; i < 5; i++) {
                    ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * this.size + this.x,
                        Math.sin((18 + i * 72) * Math.PI / 180) * this.size + this.y);
                    ctx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * (this.size / 2) + this.x,
                        Math.sin((54 + i * 72) * Math.PI / 180) * (this.size / 2) + this.y);
                }
                ctx.closePath();
                ctx.fill();
            }
            ctx.restore();
        }
    }

    function explodeMagicParticles() {
        if (!canvas || !ctx) return;

        // Spawn coordinates around the center of the screen
        const startX = window.innerWidth / 2;
        const startY = window.innerHeight / 2;

        particles = [];
        for (let i = 0; i < 120; i++) {
            particles.push(new Particle(startX, startY));
        }

        animateParticles();
    }

    function animateParticles() {
        if (!canvas || !ctx || particles.length === 0) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, idx) => {
            p.update();
            p.draw();

            // Remove faded particles
            if (p.opacity <= 0) {
                particles.splice(idx, 1);
            }
        });

        if (particles.length > 0) {
            requestAnimationFrame(animateParticles);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

});
