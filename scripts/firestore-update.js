// admin.html 에서 관리자 로그인 후 브라우저 콘솔에 붙여넣고 실행하세요.
(async () => {
  const db = window.fb.getDb();
  const updates = [
  { id: '1750000000001', url: 'images/history/1750000000001.jpg' },
  { id: '1750000000002', url: 'images/history/1750000000002.jpg' },
  { id: '1750000000003', url: 'images/history/1750000000003.jpg' },
  { id: '1750000000004', url: 'images/history/1750000000004.jpg' },
  { id: '1750000000005', url: 'images/history/1750000000005.jpg' },
  { id: '1750000000006', url: 'images/history/1750000000006.jpg' },
  { id: '1750000000007', url: 'images/history/1750000000007.jpg' },
  { id: '1750000000008', url: 'images/history/1750000000008.jpg' },
  { id: '1750000000009', url: 'images/history/1750000000009.jpg' },
  { id: '1750000000010', url: 'images/history/1750000000010.jpg' },
  { id: '1750000000011', url: 'images/history/1750000000011.jpg' },
  { id: '1750000000012', url: 'images/history/1750000000012.jpg' },
  { id: '1750000000013', url: 'images/history/1750000000013.jpg' },
  { id: '1750000000014', url: 'images/history/1750000000014.jpg' },
  { id: '1750000000015', url: 'images/history/1750000000015.jpg' },
  { id: '1750000000016', url: 'images/history/1750000000016.jpg' },
  { id: '1750000000017', url: 'images/history/1750000000017.jpg' },
  { id: '1750000000018', url: 'images/history/1750000000018.jpg' },
  { id: '1750000000019', url: 'images/history/1750000000019.jpg' },
  { id: '1750000000020', url: 'images/history/1750000000020.png' },
  { id: '1750000000021', url: 'images/history/1750000000021.jpg' },
  { id: '1750000000022', url: 'images/history/1750000000022.jpg' },
  { id: '1750000000023', url: 'images/history/1750000000023.jpg' },
  { id: '1750000000024', url: 'images/history/1750000000024.jpg' }
  ];
  let ok = 0, fail = 0;
  for (const u of updates) {
    try {
      await db.collection('history').doc(String(u.id)).update({ image: u.url });
      console.log('✅', u.id);
      ok++;
    } catch(e) {
      console.error('❌', u.id, e.message);
      fail++;
    }
  }
  console.log('완료: 성공 ' + ok + '개 / 실패 ' + fail + '개');
})();
