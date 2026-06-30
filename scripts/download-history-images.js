/**
 * 히스토리 이미지 다운로드 스크립트
 * 실행: node scripts/download-history-images.js
 *
 * Naver CDN URL을 서버 사이드에서 다운로드해 images/history/ 에 저장하고,
 * Firestore 업데이트용 스크립트(scripts/firestore-update.js)를 자동 생성합니다.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const DATA_FILE = path.join(__dirname, '..', 'history_import.json');
const OUT_DIR = path.join(__dirname, '..', 'images', 'history');
const GITHUB_PAGES_BASE = 'https://yejee1228.github.io/인생마술/images/history';

// images/history 폴더 생성
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const posts = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
const imgPosts = posts.filter(p => p.image);

console.log(`총 ${imgPosts.length}개 이미지 다운로드 시작...\n`);

function download(url, destPath) {
    return new Promise((resolve, reject) => {
        const proto = url.startsWith('https') ? https : http;
        const options = {
            headers: {
                'Referer': 'https://blog.naver.com/',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            }
        };
        const req = proto.get(url, options, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) {
                return download(res.headers.location, destPath).then(resolve).catch(reject);
            }
            if (res.statusCode !== 200) {
                return reject(new Error(`HTTP ${res.statusCode}`));
            }
            const file = fs.createWriteStream(destPath);
            res.pipe(file);
            file.on('finish', () => file.close(resolve));
            file.on('error', reject);
        });
        req.on('error', reject);
        req.setTimeout(15000, () => { req.destroy(); reject(new Error('timeout')); });
    });
}

async function run() {
    const mapping = []; // { id, oldUrl, newUrl }

    for (const post of imgPosts) {
        const ext = post.image.includes('.png') ? 'png' : 'jpg';
        const filename = `${post.id}.${ext}`;
        const destPath = path.join(OUT_DIR, filename);
        const newUrl = `${GITHUB_PAGES_BASE}/${filename}`;

        process.stdout.write(`[${post.id}] 다운로드 중...`);
        try {
            await download(post.image, destPath);
            const size = (fs.statSync(destPath).size / 1024).toFixed(1);
            console.log(` 완료 (${size} KB) → ${filename}`);
            mapping.push({ id: post.id, oldUrl: post.image, newUrl, filename });
        } catch (e) {
            console.log(` 실패: ${e.message}`);
            mapping.push({ id: post.id, oldUrl: post.image, newUrl: null, error: e.message });
        }
    }

    // 성공한 것만 Firestore 업데이트 스크립트 생성
    const succeeded = mapping.filter(m => m.newUrl);
    const failed = mapping.filter(m => !m.newUrl);

    console.log(`\n✅ 성공: ${succeeded.length}개 / ❌ 실패: ${failed.length}개`);
    if (failed.length > 0) {
        console.log('실패 목록:');
        failed.forEach(m => console.log(`  - ${m.id}: ${m.error}`));
    }

    // Firestore 업데이트용 브라우저 콘솔 스크립트 생성
    const updates = succeeded.map(m => `  { id: '${m.id}', url: '${m.newUrl}' }`).join(',\n');
    const consoleScript = `// admin.html 페이지에서 관리자 로그인 후 브라우저 콘솔에 붙여넣고 실행하세요.
(async () => {
  const db = window.fb.getDb();
  const updates = [
${updates}
  ];
  let ok = 0, fail = 0;
  for (const u of updates) {
    try {
      await db.collection('history').doc(String(u.id)).update({ image: u.url });
      console.log('✅', u.id, u.url);
      ok++;
    } catch(e) {
      console.error('❌', u.id, e.message);
      fail++;
    }
  }
  console.log(\`완료: 성공 \${ok}개 / 실패 \${fail}개\`);
})();
`;

    const scriptPath = path.join(__dirname, 'firestore-update.js');
    fs.writeFileSync(scriptPath, consoleScript, 'utf-8');
    console.log(`\n📄 Firestore 업데이트 스크립트 생성: scripts/firestore-update.js`);
    console.log('   → admin.html에서 로그인 후 브라우저 콘솔에 내용 붙여넣기');
}

run().catch(console.error);
