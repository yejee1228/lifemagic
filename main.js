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

        // 1. Load Header
        if (headerEl) {
            try {
                const response = await fetch('header.html');
                if (response.ok) {
                    headerEl.innerHTML = await response.text();
                } else {
                    console.warn('header.html fetch failed:', response.status);
                }
            } catch (e) {
                console.warn('header.html fetch error:', e);
            }
            highlightActiveNav();
            initHeaderInteractions();
        }

        // 2. Load Footer
        if (footerEls.length > 0) {
            let footerContent = '';
            try {
                const response = await fetch('footer.html');
                if (response.ok) {
                    footerContent = await response.text();
                } else {
                    console.warn('footer.html fetch failed:', response.status);
                }
            } catch (e) {
                console.warn('footer.html fetch error:', e);
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

            const programSelectEl = document.getElementById('inq-program');
            const programVal = programSelectEl ? programSelectEl.value : '';

            const newInquiry = {
                id: Date.now(),
                program: programVal,
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

    /* ==========================================================================
       7b. INQUIRY URL PARAM AUTO-SELECT
       ========================================================================== */
    const inqProgramSelect = document.getElementById('inq-program');
    if (inqProgramSelect) {
        const params = new URLSearchParams(window.location.search);
        const programParam = params.get('program');
        if (programParam) {
            const opt = Array.from(inqProgramSelect.options).find(o => o.value === programParam);
            if (opt) inqProgramSelect.value = programParam;
        }
    }

    // Also include program field in inquiry submit
    if (inquiryForm) {
        const origSubmit = inquiryForm.onsubmit;
        inquiryForm.addEventListener('submit', () => {
            const progVal = document.getElementById('inq-program');
            if (progVal) {
                inquiryForm.dataset.pendingProgram = progVal.value;
            }
        }, true);
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


    /* ==========================================================================
       8. PROGRAM.HTML — DYNAMIC CARD RENDERING FROM FIRESTORE / LOCALSTORAGE
       ========================================================================== */
    const defaultPrograms = [
        // 어린이 프로그램 (1-1 ~ 1-5)
        { id: 'magic-balloon-show',        category: '어린이', title: '매직벌룬쇼',                              tag: 'Balloon & Magic',    shortDesc: '신기한 마술공연과 신나는 벌룬쇼가 결합된 무대로, 메가풍선 퍼포먼스를 비롯한 대형 풍선 작품 선물들이 쉴 새 없이 이어져 어린이날 등 특별한 행사에 추천하는 공연입니다.', images: ['images/program/program1-1.jpg'], order: 1 },
        { id: 'led-magic-show',            category: '어린이', title: 'LED매직쇼',                              tag: 'LED & Glow',         shortDesc: '빛과 그림자, LED, 레이저를 활용해 몽환적이고 환상적인 공간을 연출하며, 로고나 브랜드명 커스터마이징 및 특별한 메시지 전달이 가능한 미래형 시각 마술쇼입니다.', images: ['images/program/program1-2.jpg'], order: 2 },
        { id: 'magic-bubble-show',         category: '어린이', title: '매직버블쇼',                             tag: 'Bubble & Magic',     shortDesc: '클래식 마술공연과 다채로운 비눗방울 쇼의 만남! 온 가족이 함께 참여하고 즐기는 놀이터를 선사합니다.',                                                             images: ['images/program/program1-3.jpg'], order: 3 },
        { id: 'magic-bubble-balloon-show', category: '어린이', title: '매직버블벌룬쇼',                          tag: 'Bubble & Balloon',   shortDesc: '어린이들의 도파민과 아드레날린을 폭발시킬 매직벌룬쇼와 매직버블쇼의 콜라보레이션으로, 풍성한 볼거리와 역동적인 퍼포먼스를 모두 모은 인기 공연입니다.',         images: ['images/program/program1-4.jpg'], order: 4 },
        { id: 'white-magic-christmas',     category: '어린이', title: '제리 아저씨의 화이트 매직 크리스마스',     tag: 'Christmas Special',  shortDesc: '크리스마스 시즌 특별 제작 공연으로, 동심을 지켜주는 마술과 크리스마스 시즌 전용 풍선 아트 공연이 어우러져 아이들에게 잊지 못할 겨울의 추억을 선물합니다.',   images: ['images/program/program1-5.jpg'], order: 5 },
        // 극장 프로그램 (2-1 ~ 2-2)
        { id: 'magicians-room',            category: '극장',   title: '반짝반짝 빛나는 마술사의 방',              tag: 'Storytelling Show',  shortDesc: "조수 앨리스와 함께 '꿈'이라는 주제를 아름다운 이야기로 전달하는 관객 참여형 극장식 매직극입니다.",                                                           images: ['images/program/program2-1.jpg'], order: 1 },
        { id: 'magicians-room-christmas',  category: '극장',   title: '반짝반짝 빛나는 마술사의 방: 크리스마스의 비밀', tag: 'Christmas Theater', shortDesc: '설렘과 상상이 가득한 크리스마스의 기다림을 마술사의 어린 시절 꿈과 연결한 겨울 특화 쇼입니다.',                                                                 images: ['images/program/program2-2.jpg'], order: 2 },
        // 행사 프로그램 (3-1 ~ 3-2)
        { id: 'hello-stranger',            category: '행사',   title: '안녕, 낯선이 (Hello Stranger)',           tag: 'Street Performance', shortDesc: '거리 위의 평범한 시민을 영화 속 주인공으로 만들어가는 참여형 1인극으로, 에딘버러 프린지(2018)와 춘천마임축제(2019) 등 국내외 무대에서 각광받은 작품입니다.', images: ['images/program/program3-1.jpg'], order: 1 },
        { id: 'delivered-show',            category: '행사',   title: '당신 앞으로 도착한 공연',                  tag: 'Interactive Street', shortDesc: '자전거를 탄 집배원이 거리 위 관객에게 편지와 소포를 열어 마술, 풍선, 저글링 등의 짧은 환상을 배달하는 거리 퍼포먼스입니다.',                                 images: ['images/program/program3-2.jpg'], order: 2 },
        // 기업 프로그램 (4-1)
        { id: 'family-magic-festival',     category: '기업',   title: '패밀리 매직 페스티벌',                    tag: 'Premium Custom',     shortDesc: '극장식 무대 배경막, 특수 조명, 음향 장비를 직접 세팅하여 기업 패밀리 데이를 풍성하게 꾸미는 60분 간의 고품격 관객 소통 콘서트입니다.',                   images: ['images/program/program4-1.jpg'], order: 1 },
        // 부가 프로그램 (5-1 ~ 5-4)
        { id: 'bubble-experience',         category: '부가',   title: '버블 체험',                              tag: 'Experience',         shortDesc: '직접 비눗방울을 만져볼 수 있는 체험형 프로그램',                                                                                                          images: ['images/program/program5-1.jpg'], order: 1 },
        { id: 'magic-lecture',             category: '부가',   title: '마술 강의',                              tag: 'Lecture',            shortDesc: '초보자 맞춤형 마술 클래스',                                                                                                                           images: ['images/program/program5-2.jpg'], order: 2 },
        { id: 'career-lecture',            category: '부가',   title: '직업 강의',                              tag: 'Education',          shortDesc: '마술사와 무대예술기획자 진로 탐색 강연',                                                                                                               images: ['images/program/program5-3.jpg'], order: 3 },
        { id: 'equipment-rental',          category: '부가',   title: '장비 렌탈',                              tag: 'Rental Service',     shortDesc: '팝콘 기계 렌탈 서비스 및 네컷 포토부스 대여 서비스',                                                                                                   images: ['images/program/program5-4.jpg'], order: 4 },
    ];

    async function getProgramsData(category) {
        if (window.fb && window.fb.isInitialized()) {
            try {
                const list = await window.fb.getPrograms(category);
                if (list) return list;
            } catch (e) {
                console.error('Firebase getPrograms failed, using defaults:', e);
            }
        }
        const stored = localStorage.getItem('insaeng_programs');
        const all = stored ? JSON.parse(stored) : defaultPrograms;
        return category ? all.filter(p => p.category === category) : all;
    }

    function buildProgramCard(prog) {
        const container = document.createElement('div');
        container.className = 'tilt-card-container';
        const imgSrc = (prog.images && prog.images.length > 0) ? prog.images[0] : 'images/program/program1.jpg';
        container.innerHTML = `
            <div class="tilt-card glass-panel js-tilt" style="cursor:pointer;">
                <img class="card-bg-img" src="${imgSrc}" alt="${prog.title}">
                <div class="card-pattern-overlay" style="background-color: rgba(138, 43, 226, 0.05);"></div>
                <div class="card-content">
                    <span class="card-tag">${prog.tag || ''}</span>
                    <h4 class="card-title">${prog.title}</h4>
                    <p class="card-desc">${prog.shortDesc || ''}</p>
                </div>
            </div>`;
        container.addEventListener('click', () => {
            window.location.href = `program-detail.html?id=${encodeURIComponent(prog.id || prog.docId)}`;
        });
        return container;
    }

    async function renderProgramGrids() {
        const grids = document.querySelectorAll('.program-grid[data-category]');
        if (grids.length === 0) return;

        for (const grid of grids) {
            const cat = grid.getAttribute('data-category');
            const programs = await getProgramsData(cat);
            grid.innerHTML = '';
            if (programs.length === 0) {
                grid.innerHTML = `<div class="glass-panel" style="padding:30px; text-align:center; color:var(--color-text-muted); grid-column:span 3;">등록된 프로그램이 없습니다.</div>`;
                continue;
            }
            programs.sort((a, b) => (a.order || 99) - (b.order || 99));
            programs.forEach(prog => grid.appendChild(buildProgramCard(prog)));

            // Re-init tilt on new cards
            grid.querySelectorAll('.js-tilt').forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const r = card.getBoundingClientRect();
                    const mx = (e.clientX - r.left) / r.width - 0.5;
                    const my = (e.clientY - r.top) / r.height - 0.5;
                    card.style.transform = `perspective(1000px) rotateX(${-my * 15}deg) rotateY(${mx * 15}deg) scale3d(1.03,1.03,1.03)`;
                    card.style.transition = 'transform 0.1s ease';
                });
                card.addEventListener('mouseleave', () => {
                    card.style.transition = 'transform 0.5s ease';
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
                });
            });
        }
    }

    renderProgramGrids();


    /* ==========================================================================
       9. PROGRAM-DETAIL.HTML — FIRESTORE DATA RENDERING
       ========================================================================== */
    const detailHeroTitle = document.getElementById('detail-hero-title');

    if (detailHeroTitle) {
        const params = new URLSearchParams(window.location.search);
        const programId = params.get('id');

        async function loadProgramDetail() {
            let prog = null;

            if (programId) {
                if (window.fb && window.fb.isInitialized()) {
                    try { prog = await window.fb.getProgramById(programId); } catch (e) {}
                }
                if (!prog) {
                    const stored = localStorage.getItem('insaeng_programs');
                    const all = stored ? JSON.parse(stored) : defaultPrograms;
                    prog = all.find(p => p.id === programId || p.docId === programId) || null;
                }
            }

            if (!prog) {
                detailHeroTitle.textContent = '프로그램을 찾을 수 없습니다.';
                document.getElementById('detail-block-content').innerHTML = `<div class="detail-empty-state">해당 프로그램 정보가 없습니다. <a href="program.html" class="gold-glow-text">목록으로 돌아가기</a></div>`;
                document.getElementById('detail-history-grid').innerHTML = '';
                return;
            }

            // Update page title
            document.title = `인생마술 | ${prog.title}`;

            // Hero
            document.getElementById('detail-hero-tag').textContent = prog.tag || '';
            detailHeroTitle.textContent = prog.title;
            const heroImg = document.getElementById('detail-hero-img');
            if (prog.images && prog.images.length > 0) {
                heroImg.src = prog.images[0];
                heroImg.alt = prog.title;
            }

            // CTA inquiry button
            const inquiryBtn = document.getElementById('detail-inquiry-btn');
            if (inquiryBtn) inquiryBtn.href = `inquiry.html?program=${encodeURIComponent(prog.title)}`;

            // Populate program switcher dropdown
            const switcherEl = document.getElementById('detail-prog-switch');
            if (switcherEl) {
                const allProgs = await getProgramsData(null);
                allProgs.sort((a, b) => (a.order || 99) - (b.order || 99));

                const catOrder = ['어린이', '극장', '행사', '기업', '부가'];
                const grouped = {};
                allProgs.forEach(p => {
                    if (!grouped[p.category]) grouped[p.category] = [];
                    grouped[p.category].push(p);
                });

                switcherEl.innerHTML = '<option value="">— 프로그램 선택 —</option>';
                catOrder.forEach(cat => {
                    if (!grouped[cat]) return;
                    const group = document.createElement('optgroup');
                    group.label = cat;
                    grouped[cat].forEach(p => {
                        const opt = document.createElement('option');
                        opt.value = p.id || p.docId;
                        opt.textContent = p.title;
                        if ((p.id || p.docId) === programId) opt.selected = true;
                        group.appendChild(opt);
                    });
                    switcherEl.appendChild(group);
                });

                switcherEl.addEventListener('change', () => {
                    if (switcherEl.value) {
                        window.location.href = `program-detail.html?id=${encodeURIComponent(switcherEl.value)}`;
                    }
                });
            }

            // Gallery
            const galSection = document.getElementById('detail-gallery-section');
            const galGrid = document.getElementById('detail-gallery-grid');
            if (prog.images && prog.images.length > 1) {
                galSection.style.display = '';
                prog.images.forEach((src, i) => {
                    const item = document.createElement('div');
                    item.className = 'detail-gallery-item';
                    item.innerHTML = `<img src="${src}" alt="공연 이미지 ${i+1}">`;
                    item.addEventListener('click', () => openLightbox(src));
                    galGrid.appendChild(item);
                });
            }

            // Content blocks (Editor.js format)
            const blockEl = document.getElementById('detail-block-content');
            if (prog.content && prog.content.blocks && prog.content.blocks.length > 0) {
                blockEl.innerHTML = renderEditorBlocks(prog.content.blocks);
            } else if (prog.shortDesc) {
                blockEl.innerHTML = `<p>${prog.shortDesc}</p>`;
            } else {
                blockEl.innerHTML = `<div class="detail-empty-state">공연 소개가 준비 중입니다.</div>`;
            }

            // Timetable
            const ttSection = document.getElementById('detail-timetable-section');
            const ttEl = document.getElementById('detail-timetable');
            if (prog.timetable && prog.timetable.length > 0) {
                ttSection.style.display = '';
                prog.timetable.forEach(row => {
                    const r = document.createElement('div');
                    r.className = 'detail-timetable-row';
                    r.innerHTML = `
                        <div class="detail-timetable-time">${row.time}</div>
                        <div class="detail-timetable-dot"></div>
                        <div class="detail-timetable-label">${row.label}</div>`;
                    ttEl.appendChild(r);
                });
            }

            // Recent history for this program
            renderDetailHistory(prog.title);
        }

        function renderEditorBlocks(blocks) {
            return blocks.map(block => {
                if (block.type === 'header') {
                    const lvl = block.data.level || 2;
                    return `<h${lvl}>${block.data.text}</h${lvl}>`;
                }
                if (block.type === 'paragraph') {
                    return `<p>${block.data.text}</p>`;
                }
                if (block.type === 'table') {
                    const rows = block.data.content || [];
                    const hasHead = block.data.withHeadings;
                    let html = '<table>';
                    rows.forEach((row, ri) => {
                        const tag = (hasHead && ri === 0) ? 'th' : 'td';
                        html += '<tr>' + row.map(cell => `<${tag}>${cell}</${tag}>`).join('') + '</tr>';
                    });
                    html += '</table>';
                    return html;
                }
                if (block.type === 'image') {
                    return `<img src="${block.data.file?.url || block.data.url || ''}" alt="${block.data.caption || ''}">`;
                }
                return '';
            }).join('');
        }

        async function renderDetailHistory(programTitle) {
            const grid = document.getElementById('detail-history-grid');
            if (!grid) return;

            let posts = [];
            if (window.fb && window.fb.isInitialized()) {
                try { posts = await window.fb.getHistoryByProgram(programTitle, 6); } catch (e) {}
            }
            if (!posts || posts.length === 0) {
                const stored = localStorage.getItem('insaeng_history');
                const all = stored ? JSON.parse(stored) : defaultHistory;
                posts = all.filter(p => !p.hidden && p.program === programTitle).slice(0, 6);
            }

            grid.innerHTML = '';
            if (posts.length === 0) {
                grid.innerHTML = `<div class="detail-empty-state" style="grid-column:span 3;">이 공연의 등록된 공연 기록이 아직 없습니다.</div>`;
                return;
            }
            posts.forEach(post => {
                const card = document.createElement('div');
                card.className = 'detail-history-card';
                const thumb = post.image
                    ? `<img src="${post.image}" alt="">`
                    : `<div class="detail-history-thumb-placeholder">✦</div>`;
                card.innerHTML = `
                    <div class="detail-history-thumb">${thumb}</div>
                    <div class="detail-history-body">
                        <div class="detail-history-date">${post.date}</div>
                        <div class="detail-history-title">${post.title}</div>
                        <div class="detail-history-loc">📍 ${post.location}</div>
                    </div>`;
                grid.appendChild(card);
            });
        }

        // Lightbox
        const lightbox = document.getElementById('detail-lightbox');
        const lightboxImg = document.getElementById('detail-lightbox-img');
        const lightboxClose = document.getElementById('detail-lightbox-close');

        function openLightbox(src) {
            if (!lightbox) return;
            lightboxImg.src = src;
            lightbox.classList.add('active');
        }

        if (lightboxClose) lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
        if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('active'); });

        loadProgramDetail();
    }


    /* ==========================================================================
       10. ADMIN — PROGRAM MANAGEMENT (Editor.js + Firestore)
       ========================================================================== */
    const adminProgList = document.getElementById('admin-prog-list');

    if (adminProgList) {
        let editorInstance = null;
        let progImages = [];
        let editingProgId = null;

        function initProgramEditor() {
            if (editorInstance) return;
            if (typeof EditorJS === 'undefined') return;

            const tools = { header: { class: Header, inlineToolbar: true } };
            if (typeof Paragraph !== 'undefined') tools.paragraph = { class: Paragraph, inlineToolbar: true };
            if (typeof Table !== 'undefined') tools.table = Table;

            editorInstance = new EditorJS({
                holder: 'prog-editor-container',
                tools,
                placeholder: '공연 내용을 입력하세요...',
            });
        }

        // Init editor when program tab is clicked
        const btnTabProgram = document.getElementById('btn-tab-program');
        if (btnTabProgram) {
            btnTabProgram.addEventListener('click', async () => {
                setTimeout(initProgramEditor, 100);
                await renderAdminProgList();
            });
        }

        // Multi-image upload
        const progImagesInput = document.getElementById('prog-images-input');
        const progImagesPreview = document.getElementById('prog-images-preview');

        if (progImagesInput) {
            progImagesInput.addEventListener('change', (e) => {
                const files = Array.from(e.target.files);
                files.forEach(file => {
                    if (file.size > 1.2 * 1024 * 1024) { alert(`${file.name} 파일이 1MB를 초과합니다.`); return; }
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                        progImages.push(ev.target.result);
                        renderProgImagesPreview();
                    };
                    reader.readAsDataURL(file);
                });
                e.target.value = '';
            });
        }

        function renderProgImagesPreview() {
            if (!progImagesPreview) return;
            progImagesPreview.innerHTML = '';
            progImages.forEach((src, i) => {
                const thumb = document.createElement('div');
                thumb.className = 'admin-img-thumb';
                thumb.innerHTML = `<img src="${src}" alt="이미지 ${i+1}">
                    <button type="button" class="admin-img-thumb-remove" data-idx="${i}">&times;</button>`;
                thumb.querySelector('.admin-img-thumb-remove').addEventListener('click', () => {
                    progImages.splice(i, 1);
                    renderProgImagesPreview();
                });
                progImagesPreview.appendChild(thumb);
            });
        }

        // Timetable rows
        const progTimetableRows = document.getElementById('prog-timetable-rows');
        const progAddTimetableBtn = document.getElementById('prog-add-timetable-btn');
        let timetableData = [];

        function addTimetableRow(time = '', label = '') {
            timetableData.push({ time, label });
            renderTimetableRows();
        }

        function renderTimetableRows() {
            if (!progTimetableRows) return;
            progTimetableRows.innerHTML = '';
            timetableData.forEach((row, i) => {
                const div = document.createElement('div');
                div.className = 'admin-timetable-row';
                div.innerHTML = `
                    <input type="text" class="admin-input time-input" placeholder="10:00" value="${row.time}">
                    <input type="text" class="admin-input label-input" placeholder="항목 내용" value="${row.label}">
                    <button type="button" class="admin-timetable-remove" data-idx="${i}">&minus;</button>`;
                div.querySelector('.time-input').addEventListener('input', (e) => { timetableData[i].time = e.target.value; });
                div.querySelector('.label-input').addEventListener('input', (e) => { timetableData[i].label = e.target.value; });
                div.querySelector('.admin-timetable-remove').addEventListener('click', () => {
                    timetableData.splice(i, 1);
                    renderTimetableRows();
                });
                progTimetableRows.appendChild(div);
            });
        }

        if (progAddTimetableBtn) progAddTimetableBtn.addEventListener('click', () => addTimetableRow());

        // Save program
        const progSaveBtn = document.getElementById('prog-save-btn');
        if (progSaveBtn) {
            progSaveBtn.addEventListener('click', async () => {
                const title = document.getElementById('prog-title').value.trim();
                const category = document.getElementById('prog-category').value;
                if (!title) { alert('공연 제목을 입력해주세요.'); return; }

                let editorContent = null;
                if (editorInstance) {
                    try { editorContent = await editorInstance.save(); } catch (e) {}
                }

                const program = {
                    id: editingProgId || null,
                    category,
                    title,
                    tag: document.getElementById('prog-tag').value.trim(),
                    shortDesc: document.getElementById('prog-short-desc').value.trim(),
                    order: parseInt(document.getElementById('prog-order').value) || 99,
                    images: [...progImages],
                    content: editorContent,
                    timetable: [...timetableData],
                };

                progSaveBtn.disabled = true;
                progSaveBtn.textContent = '저장 중...';

                if (window.fb && window.fb.isInitialized()) {
                    try {
                        const savedId = await window.fb.saveProgram(program);
                        program.id = savedId;
                    } catch (err) {
                        alert('Firestore 저장 실패: ' + err.message);
                        progSaveBtn.disabled = false;
                        progSaveBtn.textContent = '프로그램 저장하기';
                        return;
                    }
                } else {
                    if (!program.id) program.id = 'prog-' + Date.now();
                    const stored = JSON.parse(localStorage.getItem('insaeng_programs') || 'null') || defaultPrograms;
                    const idx = stored.findIndex(p => p.id === program.id);
                    if (idx >= 0) stored[idx] = program; else stored.push(program);
                    localStorage.setItem('insaeng_programs', JSON.stringify(stored));
                }

                alert('프로그램이 저장되었습니다.');
                resetProgForm();
                await renderAdminProgList();
                progSaveBtn.disabled = false;
                progSaveBtn.textContent = '프로그램 저장하기';
            });
        }

        function resetProgForm() {
            editingProgId = null;
            progImages = [];
            timetableData = [];
            document.getElementById('prog-edit-id').value = '';
            document.getElementById('prog-title').value = '';
            document.getElementById('prog-tag').value = '';
            document.getElementById('prog-short-desc').value = '';
            document.getElementById('prog-order').value = '99';
            document.getElementById('prog-form-title').textContent = '새 프로그램 등록';
            const resetBtn = document.getElementById('prog-form-reset-btn');
            if (resetBtn) resetBtn.style.display = 'none';
            renderProgImagesPreview();
            renderTimetableRows();
            if (editorInstance) {
                editorInstance.clear();
            }
        }

        const progFormResetBtn = document.getElementById('prog-form-reset-btn');
        if (progFormResetBtn) progFormResetBtn.addEventListener('click', resetProgForm);

        async function renderAdminProgList() {
            if (!adminProgList) return;
            const programs = await getProgramsData(null);
            const countEl = document.getElementById('prog-list-count');
            if (countEl) countEl.textContent = `${programs.length}개`;

            adminProgList.innerHTML = '';
            if (programs.length === 0) {
                adminProgList.innerHTML = `<div style="text-align:center;padding:30px;color:var(--color-text-muted);">등록된 프로그램이 없습니다.</div>`;
                return;
            }

            programs.forEach(prog => {
                const item = document.createElement('div');
                item.className = 'admin-prog-list-item';
                item.innerHTML = `
                    <span class="prog-category-badge">${prog.category}</span>
                    <span class="prog-title">${prog.title}</span>
                    <div class="admin-prog-list-actions">
                        <button type="button" class="btn-edit-prog">수정</button>
                        <button type="button" class="btn-delete-prog">삭제</button>
                    </div>`;

                item.querySelector('.btn-edit-prog').addEventListener('click', () => loadProgForEdit(prog));
                item.querySelector('.btn-delete-prog').addEventListener('click', async () => {
                    if (!confirm(`"${prog.title}" 프로그램을 삭제하시겠습니까?`)) return;
                    if (window.fb && window.fb.isInitialized()) {
                        try { await window.fb.deleteProgram(prog.id || prog.docId); } catch (err) { alert('삭제 실패: ' + err.message); return; }
                    } else {
                        const stored = JSON.parse(localStorage.getItem('insaeng_programs') || 'null') || defaultPrograms;
                        const filtered = stored.filter(p => p.id !== (prog.id || prog.docId));
                        localStorage.setItem('insaeng_programs', JSON.stringify(filtered));
                    }
                    await renderAdminProgList();
                });

                adminProgList.appendChild(item);
            });
        }

        async function loadProgForEdit(prog) {
            editingProgId = prog.id || prog.docId;
            document.getElementById('prog-edit-id').value = editingProgId;
            document.getElementById('prog-category').value = prog.category || '어린이';
            document.getElementById('prog-title').value = prog.title || '';
            document.getElementById('prog-tag').value = prog.tag || '';
            document.getElementById('prog-short-desc').value = prog.shortDesc || '';
            document.getElementById('prog-order').value = prog.order || 99;
            progImages = prog.images ? [...prog.images] : [];
            timetableData = prog.timetable ? [...prog.timetable] : [];
            renderProgImagesPreview();
            renderTimetableRows();
            document.getElementById('prog-form-title').textContent = '프로그램 수정';
            const resetBtn = document.getElementById('prog-form-reset-btn');
            if (resetBtn) resetBtn.style.display = '';

            if (editorInstance && prog.content && prog.content.blocks) {
                try { await editorInstance.render(prog.content); } catch (e) {}
            }

            document.querySelector('.admin-program-grid')?.scrollIntoView({ behavior: 'smooth' });
        }
    }

});
