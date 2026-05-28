/**
 * 인생마술 (INSAENG MASUL) Official Website
 * Main JavaScript Controller
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. NAVIGATION & RESPONSIVE MOBILE DRAWER
       ========================================================================== */
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
            program: "인생마술 극장: The Moment",
            title: "서울 마포아트센터 오리지널 정기 매직 콘서트 성황리 성료!",
            date: "2026-05-15",
            location: "서울 마포아트센터 대극장",
            description: "인생마술 크루의 혼이 듬뿍 실린 오리지널 극장 매직 쇼 'The Moment'가 1,200석 전석 매진을 기록하며 막을 내렸습니다. 마포아트센터에 참석해주신 수많은 연인, 가족 관객 여러분께서 매 무대마다 뜨거운 기립 박수를 보내주셨습니다. 특히 오성민 대표 마술사의 모토가 흘러나온 피날레 일루전 퍼포먼스에서는 눈시울을 붉힌 관객분들도 계셨을 정도로 진심과 감동이 가득했던 최고의 밤이었습니다.",
            image: "" // Placeholder magic visual
        },
        {
            id: 1716499200000,
            program: "상상나래 키즈 매직쇼",
            title: "대전 월드컵 어린이회관 초청 - 꿈과 상상을 전파한 키즈 축제",
            date: "2026-05-10",
            location: "대전 월드컵 어린이회관",
            description: "가정의 달을 맞아 대전 월드컵 어린이회관의 메인 무대에 올랐습니다. 300여 명의 어린이 친구들과 학부모님들이 객석을 꽉 메워주셨습니다. 무대로 직접 올라와 꼬마 마술사가 되어 마법 주문을 외치며 비둘기와 꽃가루를 피우는 참여형 스테이지는 아이들에게 단연 인기 최고였습니다. 어린이들의 함성과 미소 덕분에 마술사들도 마술 같은 하루를 보냈습니다.",
            image: ""
        },
        {
            id: 1715808000000,
            program: "스트리트 매직 카니발",
            title: "부산 해운대 모래축제 거리 버스킹 - 열광의 스트리트 피버!",
            date: "2026-05-02",
            location: "부산 해운대 백사장 광장",
            description: "파란 바다를 등지고 펼쳐진 즉흥 야외 버스킹! 해운대 백사장을 지나가던 500여 명의 행인들이 인생마술의 서커스 링과 로프 마술, 심장을 쫄깃하게 만드는 멘탈 매직에 빠져들어 거대한 광장을 꽉 채웠습니다. 해변의 시원한 파도 소리와 함께 관객분들의 함성이 한데 어우러진, 최고의 날것 그대로의 소통 무대였습니다.",
            image: ""
        }
    ];

    function getHistoryData() {
        let data = localStorage.getItem('insaeng_history');
        if (!data) {
            localStorage.setItem('insaeng_history', JSON.stringify(defaultHistory));
            return defaultHistory;
        }
        return JSON.parse(data);
    }

    function renderHistoryBoard() {
        if (!historyGrid) return;
        const allPosts = getHistoryData();
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
       6. CLIENT-SIDE LOCAL ADMIN MANAGEMENT (admin.html)
       ========================================================================== */
    const adminLockscreen = document.getElementById('admin-lockscreen');
    const adminDashboard = document.getElementById('admin-dashboard');
    const passcodeBtn = document.getElementById('lock-submit-btn');
    const passcodeField = document.getElementById('passcode-input');

    // Admin authorization logic
    if (passcodeBtn && passcodeField) {
        passcodeBtn.addEventListener('click', handleAuth);
        passcodeField.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') handleAuth();
        });
    }

    function handleAuth() {
        if (passcodeField.value === 'magic123') {
            adminLockscreen.style.display = 'none';
            adminDashboard.style.display = 'block';
            renderAdminList();
        } else {
            alert('비밀번호가 올바르지 않습니다. 다시 입력해주세요.');
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
        adminForm.addEventListener('submit', (e) => {
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
                image: loadedBase64
            };

            const currentList = getHistoryData();
            currentList.unshift(newPost); // Add to beginning
            localStorage.setItem('insaeng_history', JSON.stringify(currentList));

            alert('공연 히스토리가 성공적으로 등록되었습니다.');
            
            // Reset form
            adminForm.reset();
            loadedBase64 = '';
            if (fileLabelText) fileLabelText.innerText = '여기를 눌러 사진 선택';
            if (imgPreviewBox) imgPreviewBox.style.display = 'none';
            if (imgPreview) imgPreview.src = '';

            renderAdminList();
        });
    }

    // Render list for delete inside admin
    const adminListBox = document.getElementById('admin-list-box');
    const postsCount = document.getElementById('posts-count');

    function renderAdminList() {
        if (!adminListBox) return;
        const posts = getHistoryData();
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

    function togglePostVisibility(id) {
        const posts = getHistoryData();
        const updated = posts.map(p => {
            if (p.id === id) {
                p.hidden = !p.hidden;
            }
            return p;
        });
        localStorage.setItem('insaeng_history', JSON.stringify(updated));
        renderAdminList();
    }

    function deletePost(id) {
        const posts = getHistoryData();
        const filtered = posts.filter(p => p.id !== id);
        localStorage.setItem('insaeng_history', JSON.stringify(filtered));
        renderAdminList();
    }

    // Data Export/Import
    const exportBtn = document.getElementById('admin-export-btn');
    const importInput = document.getElementById('admin-import-file');

    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const dataStr = localStorage.getItem('insaeng_history') || JSON.stringify(defaultHistory);
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

            const exportFileDefaultName = 'insaeng_masul_history_backup.json';

            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
        });
    }

    if (importInput) {
        importInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const parsed = JSON.parse(event.target.result);
                    if (Array.isArray(parsed)) {
                        localStorage.setItem('insaeng_history', JSON.stringify(parsed));
                        alert('데이터 복원이 성공적으로 완료되었습니다.');
                        renderAdminList();
                    } else {
                        alert('올바른 백업 파일 포맷이 아닙니다.');
                    }
                } catch (err) {
                    alert('파일 해석 중 오류가 발생했습니다.');
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
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();

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
