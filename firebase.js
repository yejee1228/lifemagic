/**
 * 인생마술 (INSAENG MASUL) - Firebase Initialization and API wrapper
 */

let app;
let db = null;
let auth = null;

try {
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
    isInitialized: () => db !== null && auth !== null,
    getDb: () => db,
    getAuth: () => auth,

    // =========================================================================
    // Firebase Auth
    // =========================================================================
    login: (email, password) => {
        if (!auth) throw new Error("Firebase Auth가 초기화되지 않았습니다.");
        return auth.signInWithEmailAndPassword(email, password);
    },
    logout: () => {
        if (!auth) throw new Error("Firebase Auth가 초기화되지 않았습니다.");
        return auth.signOut();
    },
    onAuthStateChanged: (callback) => {
        if (!auth) return () => {};
        return auth.onAuthStateChanged(callback);
    },
    getCurrentUser: () => auth ? auth.currentUser : null,

    // =========================================================================
    // 공연 히스토리 CRUD
    // =========================================================================
    getHistory: async () => {
        if (!db) return null;
        try {
            const snapshot = await db.collection('history').orderBy('date', 'desc').get();
            const list = [];
            snapshot.forEach(doc => list.push(doc.data()));
            return list;
        } catch (e) {
            console.error("Firestore getHistory 에러:", e);
            throw e;
        }
    },
    saveHistory: async (post) => {
        if (!db) return null;
        try {
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
            await db.collection('history').doc(id.toString()).update({ hidden });
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

    // 특정 프로그램의 최근 히스토리 게시글 조회 (program 필드 매칭)
    getHistoryByProgram: async (programTitle, limitCount = 6) => {
        if (!db) return null;
        try {
            const snapshot = await db.collection('history')
                .where('program', '==', programTitle)
                .where('hidden', '==', false)
                .orderBy('date', 'desc')
                .limit(limitCount)
                .get();
            const list = [];
            snapshot.forEach(doc => list.push(doc.data()));
            return list;
        } catch (e) {
            console.error("Firestore getHistoryByProgram 에러:", e);
            // 복합 쿼리 인덱스 미생성 시 폴백: hidden 필터 없이 재시도
            try {
                const snapshot2 = await db.collection('history')
                    .where('program', '==', programTitle)
                    .orderBy('date', 'desc')
                    .limit(limitCount)
                    .get();
                const list2 = [];
                snapshot2.forEach(doc => {
                    const d = doc.data();
                    if (!d.hidden) list2.push(d);
                });
                return list2;
            } catch (e2) {
                console.error("Firestore getHistoryByProgram 폴백 에러:", e2);
                return [];
            }
        }
    },

    // =========================================================================
    // 문의 신청/예약 CRUD
    // =========================================================================
    getInquiries: async () => {
        if (!db) return null;
        try {
            const snapshot = await db.collection('inquiries').orderBy('id', 'desc').get();
            const list = [];
            snapshot.forEach(doc => list.push(doc.data()));
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
            await db.collection('inquiries').doc(id.toString()).update({ read });
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
    },

    // =========================================================================
    // 프로그램 CRUD
    // =========================================================================

    // 카테고리별 프로그램 목록 조회 (null이면 전체)
    getPrograms: async (category = null) => {
        if (!db) return null;
        try {
            let snapshot;
            if (category) {
                snapshot = await db.collection('programs')
                    .where('category', '==', category)
                    .orderBy('order', 'asc')
                    .get();
            } else {
                snapshot = await db.collection('programs')
                    .orderBy('order', 'asc')
                    .get();
            }
            const list = [];
            snapshot.forEach(doc => list.push({ docId: doc.id, ...doc.data() }));
            return list;
        } catch (e) {
            console.error("Firestore getPrograms 에러:", e);
            throw e;
        }
    },

    // 단일 프로그램 조회
    getProgramById: async (id) => {
        if (!db) return null;
        try {
            const doc = await db.collection('programs').doc(id).get();
            if (doc.exists) return { docId: doc.id, ...doc.data() };
            return null;
        } catch (e) {
            console.error("Firestore getProgramById 에러:", e);
            throw e;
        }
    },

    // 프로그램 저장 (등록/수정)
    saveProgram: async (program) => {
        if (!db) return null;
        try {
            const docId = program.id || db.collection('programs').doc().id;
            program.id = docId;
            program.updatedAt = new Date().toISOString();
            if (!program.createdAt) program.createdAt = program.updatedAt;
            await db.collection('programs').doc(docId).set(program);
            return docId;
        } catch (e) {
            console.error("Firestore saveProgram 에러:", e);
            throw e;
        }
    },

    // 프로그램 삭제
    deleteProgram: async (id) => {
        if (!db) return null;
        try {
            await db.collection('programs').doc(id).delete();
            return true;
        } catch (e) {
            console.error("Firestore deleteProgram 에러:", e);
            throw e;
        }
    }
};
