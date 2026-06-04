/**
 * 인생마술 (INSAENG MASUL) - Firebase Initialization and API wrapper
 */

let app;
let db = null;
let auth = null;

try {
    // firebaseConfig가 올바르게 설정되어 있는지 체크 (기본 템플릿 값이 아니면 초기화)
    if (typeof firebaseConfig !== 'undefined' && 
        firebaseConfig.apiKey && 
        firebaseConfig.apiKey !== "YOUR_API_KEY") {
        
        app = firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        auth = firebase.auth();
        console.log("🔥 Firebase 및 Firestore/Auth가 성공적으로 연결되었습니다.");
    } else {
        console.warn("⚠️ Firebase 설정이 완료되지 않았습니다. 로컬 브라우저 저장소(localStorage) 모드로 실행됩니다.");
    }
} catch (e) {
    console.error("❌ Firebase 초기화 도중 에러가 발생했습니다:", e);
}

// 글로벌 네임스페이스 fb 객체 정의
window.fb = {
    // 상태 조회
    isInitialized: () => db !== null && auth !== null,
    getDb: () => db,
    getAuth: () => auth,

    // Firebase Auth 관련 래퍼 함수
    login: (email, password) => {
        if (!auth) throw new Error("Firebase Auth가 초기화되지 않았습니다.");
        return auth.signInWithEmailAndPassword(email, password);
    },
    logout: () => {
        if (!auth) throw new Error("Firebase Auth가 초기화되지 않았습니다.");
        return auth.signOut();
    },
    onAuthStateChanged: (callback) => {
        if (!auth) return () => {}; // 더미 언서브스크라이브 반환
        return auth.onAuthStateChanged(callback);
    },
    getCurrentUser: () => {
        return auth ? auth.currentUser : null;
    },

    // Cloud Firestore - 공연 히스토리 CRUD
    getHistory: async () => {
        if (!db) return null;
        try {
            // 날짜 최신순 정렬하여 로드
            const snapshot = await db.collection('history').orderBy('date', 'desc').get();
            const list = [];
            snapshot.forEach(doc => {
                list.push(doc.data());
            });
            return list;
        } catch (e) {
            console.error("Firestore getHistory 에러:", e);
            throw e;
        }
    },
    saveHistory: async (post) => {
        if (!db) return null;
        try {
            // post.id를 문서 ID로 지정하여 저장
            await db.collection('history').doc(post.id.toString()).set(post);
            return true;
        } catch (e) {
            console.error("Firestore saveHistory 에러:", e);
            throw e;
        }
    },
    updateHistoryHidden: async (id, hidden) => {
        if (!db) return null;
        try {
            await db.collection('history').doc(id.toString()).update({ hidden: hidden });
            return true;
        } catch (e) {
            console.error("Firestore updateHistoryHidden 에러:", e);
            throw e;
        }
    },
    deleteHistory: async (id) => {
        if (!db) return null;
        try {
            await db.collection('history').doc(id.toString()).delete();
            return true;
        } catch (e) {
            console.error("Firestore deleteHistory 에러:", e);
            throw e;
        }
    },

    // Cloud Firestore - 문의 신청/예약 CRUD
    getInquiries: async () => {
        if (!db) return null;
        try {
            // 최신 문의 순으로 정렬하여 로드
            const snapshot = await db.collection('inquiries').orderBy('id', 'desc').get();
            const list = [];
            snapshot.forEach(doc => {
                list.push(doc.data());
            });
            return list;
        } catch (e) {
            console.error("Firestore getInquiries 에러:", e);
            throw e;
        }
    },
    saveInquiry: async (inquiry) => {
        if (!db) return null;
        try {
            await db.collection('inquiries').doc(inquiry.id.toString()).set(inquiry);
            return true;
        } catch (e) {
            console.error("Firestore saveInquiry 에러:", e);
            throw e;
        }
    },
    updateInquiryRead: async (id, read) => {
        if (!db) return null;
        try {
            await db.collection('inquiries').doc(id.toString()).update({ read: read });
            return true;
        } catch (e) {
            console.error("Firestore updateInquiryRead 에러:", e);
            throw e;
        }
    },
    deleteInquiry: async (id) => {
        if (!db) return null;
        try {
            await db.collection('inquiries').doc(id.toString()).delete();
            return true;
        } catch (e) {
            console.error("Firestore deleteInquiry 에러:", e);
            throw e;
        }
    }
};
