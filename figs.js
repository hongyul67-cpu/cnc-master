/* ══════════════════════════════════════════════════════════════
   CNC·컴퓨터응용가공 마스터 — 그림 모음 (그림16 · 2026-09-30)
   공용 그리기 도우미 links/fig.js 를 쓴다. index.html(배우기) 과 lesson.js(수업 슬라이드) 가 함께 부른다.

   한 칸의 모양
     키: { cap:'캡션 한 줄', cards:['LEARN 카드 제목'…], draw:function(){ … } }
       cards — index.html 의 LEARN 카드 제목(t) 과 **똑같이**. 그 카드 제목 바로 아래에 그림이 붙는다.
     순서 = 배우기 화면에 나오는 순서.

   그림 내용은 index.html 의 LEARN 카드 본문을 옮긴 것이고, 순서·이름은 훈련교재 「CNC 공작법」
   (_작업/C3-추출/OCR_CNC공작법.txt — 서보기구 그림 1-28~1-30, G71 어드레스, 고정 사이클 6동작)과 대조했다.
   교재 그림은 따라 그리지 않았다(공공누리 제4유형 — 변경금지). 개념만 새로 그렸다.
   예시 숫자를 쓴 그림은 캡션에 「숫자는 예시」라고 적었다.
   ══════════════════════════════════════════════════════════════ */
var FIGS = (function () {
  var F = window.FIG;
  if (!F) return {};
  var C = F.C;
  var t = F.t, box = F.box, line = F.line, arrow = F.arrow, callout = F.callout, route = F.route;
  var PI = Math.PI;

  /* ── 작은 도우미 ── */
  function dot(x, y, r, c) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 3.5) + '" fill="' + (c || C.ink) + '"/>'; }
  function code(x, y, s, o) { /* 고정폭 글자 — 프로그램 한 줄 */
    return '<g font-family="Consolas,\'D2Coding\',ui-monospace,monospace">' + t(x, y, s, o) + '</g>';
  }
  function divider(x, y1, y2) { return line(x, y1, x, y2, { c: C.grayM, w: 1.4, dash: '6 5' }); }
  function arcPts(cx, cy, rx, ry, a0, a1, k) {
    var p = [];
    for (var i = 0; i <= k; i++) { var a = a0 + (a1 - a0) * i / k; p.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]); }
    return p;
  }
  function arc(cx, cy, r, a0, a1, o) { return route(arcPts(cx, cy, r, r, a0, a1, 18), o || {}); }
  function origin(x, y, c) { /* 원점 기호 — 동그라미에 십자 */
    return F.circle(x, y, 8, { fill: '#fff', c: c || C.ink, w: 1.6 }) +
      F.path('M' + x + ',' + (y - 8) + ' A8,8 0 0,1 ' + (x + 8) + ',' + y + ' L' + x + ',' + y + ' Z', { fill: c || C.ink, w: 0.1 }) +
      F.path('M' + (x - 8) + ',' + y + ' A8,8 0 0,0 ' + x + ',' + (y + 8) + ' L' + x + ',' + y + ' Z', { fill: c || C.ink, w: 0.1 });
  }
  function burst(x, y, c) { /* 충돌 표시 */
    var p = [];
    for (var i = 0; i < 16; i++) { var r = i % 2 ? 5 : 12, a = i * PI / 8; p.push([x + r * Math.cos(a), y + r * Math.sin(a)]); }
    return F.poly(p, { close: 1, fill: C.redL, c: c || C.red, w: 1.4 });
  }
  function mach(x, y) { /* 작은 공작기계 아이콘 40×36 */
    return box(x, y, 40, 36, { fill: C.grayL, r: 5 }) + box(x + 6, y + 6, 16, 11, { fill: C.blueL, c: C.blue, w: 1, r: 2 }) +
      box(x + 26, y + 6, 8, 20, { fill: C.grayM, w: 1, r: 1 }) + line(x + 4, y + 30, x + 36, y + 30, { w: 1.2, c: C.sub });
  }
  function monitor(cx, y, c) {
    return box(cx - 20, y, 40, 28, { fill: C.blueL, c: c || C.blue, r: 4 }) +
      line(cx, y + 28, cx, y + 35, { w: 2 }) + line(cx - 10, y + 36, cx + 10, y + 36, { w: 2 });
  }

  return {

  /* ─────────── 1단원 CNC 공작기계의 개요 ─────────── */
  infoflow: { cards: ['가공은 어떤 순서로 이루어지는가 (정보의 흐름)'],
    cap: '정보의 흐름 — 제어장치가 내보낸 펄스를 서보모터·볼 스크루가 실제 움직임으로 바꾼다',
    draw: function () {
      var s = '', top = ['도면', 'CNC 프로그램', '제어장치'], bot = ['테이블 이동', '볼 스크루', '서보모터'], x = [16, 176, 336];
      for (var i = 0; i < 3; i++) {
        s += box(x[i], 26, 128, 52, { fill: C.blueL, c: C.blue, label: top[i] });
        s += box(x[i], 148, 128, 52, { fill: C.greenL, c: C.green, label: bot[i] });
      }
      s += arrow(146, 52, 174, 52) + arrow(306, 52, 334, 52);
      s += arrow(400, 80, 400, 146, { c: C.orange, w: 3 }) + t(390, 113, '펄스 신호', { a: 'e', b: 1, c: C.orange });
      s += arrow(334, 174, 306, 174) + arrow(174, 174, 146, 174);
      s += t(240, 224, '요구한 위치·속도로 테이블·주축헤드가 움직여 자동 가공', { a: 'm', size: 14, c: C.sub });
      return F.svg(480, 244, s);
    } },

  parts: { cards: ['CNC 공작기계의 구성'],
    cap: 'CNC 공작기계의 구성 — ①~⑥ 여섯 부분',
    draw: function () {
      var s = '';
      /* 기계 본체 */
      s += box(40, 236, 280, 24, { fill: C.grayL, r: 4 });
      s += box(230, 60, 64, 176, { fill: C.grayL, r: 4 });
      s += box(150, 84, 90, 46, { fill: C.grayM, r: 5 });
      s += box(183, 130, 22, 22, { fill: C.grayM, r: 2 });
      s += F.poly([[188, 152], [200, 152], [197, 176], [191, 176]], { close: 1, fill: C.grayM, w: 1.4 });
      s += box(150, 180, 70, 20, { fill: C.grayL, r: 2 });
      s += box(70, 200, 200, 16, { fill: C.grayL, r: 3 });
      /* 서보모터 + 볼 스크루 */
      s += box(40, 198, 30, 26, { fill: C.blueL, c: C.blue, r: 4, label: 'M', size: 14 });
      s += line(70, 226, 268, 226, { w: 4, c: C.sub });
      /* CNC 장치 · 입출력 */
      s += box(336, 36, 128, 150, { fill: C.grayL, r: 10 });
      s += box(348, 50, 104, 58, { fill: C.blueL, c: C.blue, r: 4 });
      for (var r = 0; r < 3; r++) for (var k = 0; k < 5; k++) s += box(352 + k * 20, 122 + r * 18, 14, 11, { fill: '#fff', w: 1, r: 2 });
      /* 강전 제어반 · 유압유닛 */
      s += box(400, 196, 64, 70, { fill: C.grayL, r: 4 });
      for (var v = 0; v < 4; v++) s += line(410, 210 + v * 10, 454, 210 + v * 10, { w: 1, c: C.sub });
      s += box(334, 230, 56, 36, { fill: C.grayL, r: 4 }) + F.circle(362, 224, 9, { fill: C.grayM, w: 1.2 });
      /* 번호 */
      s += F.num(446, 178, '①') + F.num(400, 80, '②') + F.num(432, 244, '③') + F.num(362, 250, '④') +
        F.num(55, 186, '⑤') + F.num(262, 150, '⑥');
      var L = ['① 정보처리회로 (CNC 장치)', '② 데이터 입·출력장치', '③ 강전 제어반', '④ 유압유닛', '⑤ 서보모터', '⑥ 기계 본체'];
      for (var i = 0; i < 6; i++) s += t(i % 2 ? 250 : 16, 296 + Math.floor(i / 2) * 24, L[i], { size: 14 });
      return F.svg(480, 360, s);
    } },

  auto3: { cards: ['자동화의 단계 — DNC · FMC · FMS'],
    cap: 'DNC · FMC · FMS — 컴퓨터 1대가 여러 기계로, 기계 1대의 셀로, 공장 전체로',
    draw: function () {
      var s = divider(162, 14, 256) + divider(318, 14, 256);
      s += t(84, 28, 'DNC', { a: 'm', b: 1, size: 18, c: C.blue }) + t(84, 50, '컴퓨터 1대 → 여러 대', { a: 'm', size: 13, c: C.sub });
      s += t(240, 28, 'FMC', { a: 'm', b: 1, size: 18, c: C.orange }) + t(240, 50, '기계 1대 + 로봇 = 셀', { a: 'm', size: 13, c: C.sub });
      s += t(396, 28, 'FMS', { a: 'm', b: 1, size: 18, c: C.green }) + t(396, 50, '중앙 컴퓨터가 전체를', { a: 'm', size: 13, c: C.sub });
      /* DNC */
      s += monitor(84, 70) + line(84, 108, 84, 150, { w: 1.6, c: C.blue }) + line(38, 150, 130, 150, { w: 1.6, c: C.blue });
      s += line(38, 150, 38, 180, { w: 1.6, c: C.blue }) + line(84, 150, 84, 180, { w: 1.6, c: C.blue }) + line(130, 150, 130, 180, { w: 1.6, c: C.blue });
      s += t(98, 136, 'LAN', { size: 13, c: C.blue, b: 1 });
      s += mach(18, 180) + mach(64, 180) + mach(110, 180);
      s += t(84, 238, '데이터를 나눠 보냄', { a: 'm', size: 13 });
      /* FMC */
      s += mach(186, 124);
      s += F.poly([[270, 200], [270, 158], [248, 140], [232, 146]], { c: C.orange, w: 4 });
      s += F.circle(270, 158, 4, { fill: '#fff', c: C.orange }) + F.circle(248, 140, 4, { fill: '#fff', c: C.orange });
      s += box(258, 200, 24, 10, { fill: C.grayM, r: 2 });
      s += t(284, 138, '로봇', { size: 13, c: C.orange, b: 1 });
      s += box(180, 218, 120, 8, { fill: C.grayM, r: 3 });
      for (var i = 0; i < 4; i++) s += box(188 + i * 26, 204, 14, 14, { fill: C.orangeL, c: C.orange, r: 2, w: 1.2 });
      s += t(240, 244, '자동 공급', { a: 'm', size: 13 });
      /* FMS */
      s += monitor(396, 64, C.green) + t(396, 114, '중앙 컴퓨터', { a: 'm', size: 13, c: C.green, b: 1 });
      s += mach(334, 130) + mach(418, 130);
      s += line(384, 102, 356, 130, { w: 1.2, c: C.green, dash: '4 3' }) + line(408, 102, 438, 130, { w: 1.2, c: C.green, dash: '4 3' });
      s += line(330, 228, 424, 228, { w: 1.2, c: C.sub, dash: '5 4' });
      s += box(356, 204, 40, 16, { fill: C.greenL, c: C.green, r: 3 }) + F.circle(364, 222, 4, { fill: C.ink }) + F.circle(388, 222, 4, { fill: C.ink });
      s += box(428, 180, 40, 48, { fill: '#fff', r: 2 });
      for (var r = 0; r < 2; r++) s += line(428, 196 + r * 16, 468, 196 + r * 16, { w: 1, c: C.sub });
      s += line(448, 180, 448, 228, { w: 1, c: C.sub });
      s += t(376, 244, 'AGV', { a: 'm', size: 13, b: 1 }) + t(448, 244, '자동창고', { a: 'm', size: 13 });
      return F.svg(480, 262, s);
    } },

  /* ─────────── 2단원 CNC 의 제어 시스템 ─────────── */
  ctrl3: { cards: ['제어방식 3가지 — 무엇을 어디에 쓰는가'],
    cap: '제어방식 3가지 — 위치만 · 축 방향 직선만 · 어떤 경로든',
    draw: function () {
      var s = divider(162, 14, 236) + divider(318, 14, 236);
      s += t(84, 26, '① 위치결정 (PTP)', { a: 'm', b: 1, size: 15 });
      s += t(240, 26, '② 직선절삭', { a: 'm', b: 1, size: 15 });
      s += t(396, 26, '③ 윤곽절삭', { a: 'm', b: 1, size: 15 });
      /* PTP */
      var P = [[36, 150], [84, 74], [132, 132]];
      s += arrow(40, 144, 80, 80, { dash: '6 4', c: C.blue, w: 1.8 }) + arrow(90, 80, 128, 126, { dash: '6 4', c: C.blue, w: 1.8 });
      for (var i = 0; i < 3; i++) s += F.circle(P[i][0], P[i][1], 7, { fill: '#fff', w: 2 });
      s += t(84, 180, '도착 위치만 제어', { a: 'm', size: 14 }) + t(84, 204, '드릴링 · 스폿 용접', { a: 'm', size: 13, c: C.sub }) +
        t(84, 222, '펀치 프레스', { a: 'm', size: 13, c: C.sub });
      /* 직선 */
      s += box(196, 90, 88, 52, { fill: C.grayL });
      s += route([[184, 154], [296, 154], [296, 78], [196, 78]], { c: C.blue, w: 2.6 });
      s += t(240, 180, '축 방향 직선만 절삭', { a: 'm', size: 14 }) + t(240, 204, '밀링 · 보링 · 선반', { a: 'm', size: 13, c: C.sub });
      /* 윤곽 */
      var q = [];
      for (var k = 0; k <= 24; k++) { var x = 336 + k * 5; q.push([x, 116 - 34 * Math.sin((x - 336) / 120 * 2 * PI)]); }
      s += route(q, { c: C.blue, w: 2.6 });
      s += t(396, 180, '2축 이상 동시 제어', { a: 'm', size: 14 }) + t(396, 204, '곡선·대각선 모두', { a: 'm', size: 13, c: C.sub }) +
        t(396, 222, '요즘 CNC 대부분', { a: 'm', size: 13, c: C.sub, b: 1 });
      return F.svg(480, 240, s);
    } },

  servo4: { cards: ['서보기구 4가지 — 어디서 되먹임(피드백)하는가'],
    cap: '서보기구 4가지 — 피드백이 있는가, 있다면 모터(엔코더)에서인가 테이블(스케일)에서인가',
    draw: function () {
      var s = t(136, 22, '제어', { a: 'm', size: 13, c: C.sub }) + t(200, 22, '모터', { a: 'm', size: 13, c: C.sub }) +
        t(300, 22, '볼 스크루 · 테이블', { a: 'm', size: 13, c: C.sub }) + t(392, 22, '특징', { size: 13, c: C.sub });
      var name = ['① 개방회로', '② 반폐쇄회로', '③ 폐쇄회로', '④ 복합회로'];
      var note = [['피드백 없음', '거의 안 씀'], ['모터에서 검출', '가장 많이 씀'], ['테이블에서 검출', '대형 기계'], ['둘을 결합', '고가 · 고정밀']];
      for (var r = 0; r < 4; r++) {
        var cy = 64 + r * 78;
        if (r) s += line(12, cy - 40, 468, cy - 40, { w: 1, c: C.edge });
        s += t(14, cy, name[r], { b: 1, size: 15 });
        if (r === 0) s += t(14, cy + 22, '스테핑 모터', { size: 13, c: C.sub });
        s += box(114, cy - 16, 44, 32, { fill: C.blueL, c: C.blue, label: 'CNC', size: 13 });
        s += arrow(158, cy, 182, cy, { w: 1.6, head: 9 });
        s += F.circle(200, cy, 16, { fill: C.grayL, label: 'M', size: 14 });
        s += line(216, cy, 372, cy, { w: 5, c: C.sub });
        s += box(262, cy - 24, 74, 14, { fill: C.grayM, r: 2 }) + box(288, cy - 10, 22, 18, { fill: C.grayL, r: 2, w: 1.2 });
        if (r === 1 || r === 3) {
          s += dot(200, cy + 16, 4, C.green);
          s += route([[200, cy + 16], [200, cy + 30], [136, cy + 30], [136, cy + 17]], { c: C.green, w: 1.8, head: 9 });
          s += t(206, cy + 30, '엔코더', { size: 13, c: C.green, b: 1 });
        }
        if (r === 2 || r === 3) {
          s += box(262, cy - 29, 74, 5, { fill: C.orange, c: C.orange, r: 1, w: 1 });
          var yy = r === 3 ? cy + 38 : cy + 30;
          s += route([[336, cy - 27], [352, cy - 27], [352, yy], [128, yy], [128, cy + 17]], { c: C.orange, w: 1.8, head: 9 });
          s += t(270, cy - 36, '스케일', { size: 13, c: C.orange, b: 1 });
        }
        s += t(384, cy - 9, note[r][0], { size: 13 }) + t(384, cy + 11, note[r][1], { size: 13, b: 1, c: r === 1 ? C.green : C.ink });
      }
      return F.svg(480, 360, s);
    } },

  ballscrew: { cards: ['이송기구 — 볼 스크루와 리니어 모터'],
    cap: '볼 스크루(강구가 굴러 움직임) 와 리니어 모터(모터를 펼쳐 직접 구동)',
    draw: function () {
      var s = t(16, 24, '볼 스크루', { b: 1, size: 15 });
      s += box(16, 58, 50, 40, { fill: C.blueL, c: C.blue, label: 'M', size: 15 }) + t(41, 114, '서보모터', { a: 'm', size: 13 });
      s += box(66, 68, 16, 20, { fill: C.grayM, r: 2 });
      s += box(82, 72, 340, 12, { fill: C.grayL, r: 2 });
      for (var x = 88; x < 418; x += 8) s += line(x, 72, x + 6, 84, { w: 1, c: C.sub });
      s += box(170, 38, 130, 22, { fill: C.grayL, r: 3, label: '테이블', size: 14 });
      s += box(200, 60, 70, 36, { fill: C.orangeL, c: C.orange, r: 4 });
      s += box(82, 72, 340, 12, { fill: 'none', c: C.ink, r: 2, w: 1 });
      for (var b = 210; b <= 262; b += 13) s += F.circle(b, 70, 4, { fill: '#fff', c: C.orange, w: 1.4 }) + F.circle(b, 86, 4, { fill: '#fff', c: C.orange, w: 1.4 });
      s += callout(74, 88, 98, 120, '커플링') + callout(236, 88, 250, 120, '강구(볼)', { c: C.orange }) +
        callout(268, 76, 330, 120, '너트', { c: C.orange }) + callout(380, 72, 396, 46, '볼 스크루');
      s += t(16, 146, '강구가 굴러 마찰이 작다 · 더블너트로 백래시를 0 가까이', { size: 13, c: C.sub });
      s += line(12, 162, 468, 162, { w: 1, c: C.edge });
      s += t(16, 184, '리니어 모터 — 회전 모터를 잘라 펼친 모양', { b: 1, size: 15 });
      for (var i = 0; i < 20; i++) {
        var n = i % 2 === 0;
        s += box(40 + i * 20, 252, 20, 18, { fill: n ? C.redL : C.blueL, c: n ? C.red : C.blue, r: 0, w: 1, label: n ? 'N' : 'S', size: 13 });
      }
      s += box(170, 222, 110, 26, { fill: C.orangeL, c: C.orange, label: '가동자(코일)', size: 13 });
      s += box(160, 200, 130, 20, { fill: C.grayL, label: '테이블', size: 13 });
      s += arrow(292, 234, 352, 234, { both: true, c: C.ink, w: 1.6, head: 9 }) + t(360, 234, '직접 구동', { size: 13, b: 1 });
      s += t(240, 290, '고정자(자석)를 길게 펼쳐 깔았다 — 볼 스크루가 없다', { a: 'm', size: 13 });
      return F.svg(480, 306, s);
    } },

  /* ─────────── 3단원 CNC 프로그램의 구성 ─────────── */
  block: { cards: ['워드 · 블록 · 전개번호'],
    cap: '블록 한 줄 — 워드(어드레스 + 수치)가 모이고 ; (EOB) 로 끝난다',
    draw: function () {
      var s = box(12, 14, 456, 44, { fill: '#fff', c: C.grayM });
      s += code(240, 36, 'N30 G01 X50.0 Z-30.0 F0.2 ;', { a: 'm', size: 21, b: 1 });
      var W = [['N30', '전개번호', 12, 66, C.grayL, C.ink], ['G01', '준비기능', 86, 66, C.blueL, C.blue],
        ['X50.0 Z-30.0', '좌표', 160, 150, C.grayL, C.ink], ['F0.2', '이송', 318, 66, C.grayL, C.ink], [';', 'EOB 블록 끝', 392, 76, C.purpleL, C.purple]];
      for (var i = 0; i < W.length; i++) {
        var w = W[i];
        s += box(w[2], 76, w[3], 58, { fill: w[4], c: w[5] });
        s += code(w[2] + w[3] / 2, 98, w[0], { a: 'm', size: 17, b: 1, c: w[5], halo: false, ans: i === 4 });
        s += t(w[2] + w[3] / 2, 121, w[1], { a: 'm', size: 13, c: C.sub, halo: false, ans: i === 1 });
      }
      s += t(16, 168, '워드 = 어드레스 + 수치', { b: 1, size: 15 });
      s += box(206, 152, 32, 30, { fill: C.blueL, c: C.blue, label: 'G', size: 17 }) + t(250, 167, '+', { a: 'm', b: 1, size: 18 }) +
        box(262, 152, 40, 30, { fill: C.blueL, c: C.blue, label: '01', size: 17 });
      s += t(314, 158, '영문자 + 숫자', { size: 13, c: C.sub }) + t(314, 176, '→ 워드 1개', { size: 13, c: C.sub });
      s += t(16, 204, '전개번호 N 은 없어도 되지만, 복합 반복 사이클(G70~G73)에는 꼭 필요', { size: 13, c: C.sub });
      return F.svg(480, 220, s);
    } },

  modal: { cards: ['준비기능 G — 1회 유효와 연속 유효'],
    cap: '모달과 원샷 — G01 은 바뀔 때까지 계속, 그룹 00 인 G04 는 그 블록에서만',
    draw: function () {
      var s = t(20, 30, '프로그램', { b: 1, size: 14, c: C.sub });
      s += t(320, 30, 'G01 · 모달', { a: 'm', b: 1, size: 14, c: C.green });
      s += t(420, 30, 'G04 · 원샷', { a: 'm', b: 1, size: 14, c: C.red }) + t(420, 204, '그룹 00', { a: 'm', b: 1, size: 13, c: C.red, ans: true });
      var L = ['N10 G01 X50.0 F0.2 ;', 'N20 X70.0 ;', 'N30 G04 P1000 ;', 'N40 X90.0 ;'];
      s += box(290, 52, 60, 144, { fill: C.greenL, c: C.green });
      s += box(390, 126, 60, 36, { fill: C.redL, c: C.red });
      for (var i = 0; i < 4; i++) {
        var y = 72 + i * 36;
        if (i) s += line(16, y - 18, 464, y - 18, { w: 1, c: C.edge });
        s += code(20, y, L[i], { size: 15 });
        s += dot(320, y, 5, C.green);
      }
      s += dot(420, 144, 5, C.red);
      s += t(20, 222, '모달 — 같은 그룹의 다른 코드가 나올 때까지 계속 살아 있다', { size: 13, c: C.green, b: 1 });
      s += t(20, 244, '원샷 — 그 블록에서만 듣고 다음 블록에는 남지 않는다', { size: 13, c: C.red, b: 1 });
      return F.svg(480, 262, s);
    } },

  spindle: { cards: ['주축기능 S — G96 과 G97'],
    cap: 'G96 은 지름에 따라 회전수가 바뀌고(절삭속도 일정), G97 은 회전수가 그대로다',
    draw: function () {
      var s = divider(240, 14, 236);
      s += t(78, 26, 'G96', { a: 'm', b: 1, size: 16, c: C.orange }) + t(104, 26, '절삭속도', { b: 1, size: 16, c: C.orange, ans: true }) +
        t(176, 26, '일정', { b: 1, size: 16, c: C.orange }) + t(120, 48, 'S 단위 =', { a: 'e', size: 14, c: C.sub }) + t(126, 48, 'm/min', { size: 14, c: C.sub, ans: true });
      s += t(318, 26, 'G97', { a: 'm', b: 1, size: 16, c: C.blue }) + t(344, 26, '회전수', { b: 1, size: 16, c: C.blue, ans: true }) +
        t(400, 26, '일정', { b: 1, size: 16, c: C.blue }) + t(360, 48, 'S 단위 =', { a: 'e', size: 14, c: C.sub }) + t(366, 48, 'rpm', { size: 14, c: C.sub, ans: true });
      /* G96 */
      s += F.circle(72, 118, 36, { fill: C.grayL }) + F.circle(176, 124, 18, { fill: C.grayL });
      s += arc(72, 118, 46, -2.6, -0.5, { c: C.orange, w: 1.6, head: 9 });
      s += arc(176, 124, 28, -2.9, -0.2, { c: C.orange, w: 3.2, head: 11 }) + arc(176, 124, 28, 0.3, 2.8, { c: C.orange, w: 3.2, head: 11 });
      s += t(72, 180, '지름 크면 느리게', { a: 'm', size: 13 }) + t(176, 180, '작으면 빠르게', { a: 'm', size: 13 });
      s += t(56, 212, '→', { size: 13, c: C.red, b: 1 }) + t(96, 212, 'G50', { a: 'm', size: 13, c: C.red, b: 1, ans: true }) +
        t(118, 212, '으로 최고 회전수 제한', { size: 13, c: C.red, b: 1 });
      /* G97 */
      s += F.circle(312, 118, 36, { fill: C.grayL }) + F.circle(416, 124, 18, { fill: C.grayL });
      s += arc(312, 118, 46, -2.6, -0.5, { c: C.blue, w: 2.2, head: 10 }) + arc(416, 124, 28, -2.6, -0.5, { c: C.blue, w: 2.2, head: 10 });
      s += t(364, 180, '지름과 상관없이 같은 rpm', { a: 'm', size: 13 });
      s += t(380, 212, '나사 가공은', { a: 'e', size: 13, c: C.sub }) + t(388, 212, 'G97', { size: 13, c: C.sub, ans: true });
      return F.svg(480, 236, s);
    } },

  feed: { cards: ['이송기능 F — 선반과 머시닝센터가 반대다'],
    cap: '회전당 이송(선반 기본)은 한 바퀴에 f mm, 분당 이송(머시닝센터 기본)은 1분에 F mm',
    draw: function () {
      var s = divider(240, 14, 236);
      s += t(120, 26, '회전당 이송 — 선반', { a: 'm', b: 1, size: 15 });
      s += t(360, 26, '분당 이송 — 머시닝센터', { a: 'm', b: 1, size: 15 });
      /* 선반 */
      s += box(14, 78, 16, 84, { fill: C.grayM, r: 2 });
      s += box(30, 92, 150, 56, { fill: C.grayL, r: 3 });
      for (var x = 150; x > 40; x -= 24) s += line(x, 92, x - 10, 148, { w: 1, c: C.sub });
      s += F.poly([[136, 62], [152, 62], [144, 90]], { close: 1, fill: '#fff', c: C.sub, w: 1.2, dash: '4 3' });
      s += F.poly([[112, 62], [128, 62], [120, 90]], { close: 1, fill: C.grayM, w: 1.4 });
      s += F.dim(120, 56, 144, 56, 'f', { size: 15 });
      s += route(arcPts(186, 120, 11, 27, -PI / 2, PI / 2, 12), { c: C.orange, w: 2, head: 9 }) + t(202, 120, '1회전', { size: 13, c: C.orange, b: 1 });
      s += t(110, 178, '1회전에 f mm', { a: 'm', b: 1 }) + t(110, 202, 'G99 · mm/rev', { a: 'm', size: 14, c: C.orange, b: 1 }) +
        t(110, 224, '선반이 전원을 넣으면 이것', { a: 'm', size: 13, c: C.sub });
      /* 머시닝센터 */
      s += box(262, 96, 200, 60, { fill: C.grayL, r: 3 });
      s += F.circle(290, 126, 16, { fill: '#fff', c: C.sub, w: 1.2, dash: '4 3' });
      s += arrow(308, 126, 390, 126, { c: C.blue, w: 2.2 });
      s += F.circle(410, 126, 16, { fill: C.blueL, c: C.blue });
      s += F.dim(290, 82, 410, 82, '1분 동안 간 거리 = F', { size: 13 });
      s += F.circle(448, 44, 12, { fill: '#fff', w: 1.4 }) + line(448, 44, 448, 36, { w: 1.4 }) + line(448, 44, 454, 47, { w: 1.4 });
      s += t(360, 178, '1분에 F mm', { a: 'm', b: 1 }) + t(360, 202, 'G94 · mm/min', { a: 'm', size: 14, c: C.blue, b: 1 }) +
        t(360, 224, '머시닝센터가 전원을 넣으면 이것', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 240, s);
    } },

  tcode: { cards: ['공구기능 T — 선반과 머시닝센터의 차이'],
    cap: '선반의 T0101 은 공구 번호 + 보정 번호, 머시닝센터는 T 로 고르고 M06 으로 바꾼다',
    draw: function () {
      var s = divider(240, 14, 236);
      s += t(120, 26, '선반 — T □□ ○○', { a: 'm', b: 1, size: 15 });
      s += code(44, 80, 'T', { size: 36, b: 1 }) + code(84, 80, '01', { size: 36, b: 1, c: C.blue }) + code(148, 80, '01', { size: 36, b: 1, c: C.orange });
      s += line(86, 104, 124, 104, { c: C.blue, w: 2 }) + line(150, 104, 188, 104, { c: C.orange, w: 2 });
      s += t(105, 124, '공구 번호', { a: 'm', size: 14, c: C.blue, b: 1 }) + t(169, 124, '보정 번호', { a: 'm', size: 14, c: C.orange, b: 1 });
      s += code(24, 164, 'T0101', { size: 15, b: 1 }) + t(84, 164, '1번 공구 · 1번 보정', { size: 13 });
      s += code(24, 194, 'T0100', { size: 15, b: 1, c: C.red }) + t(84, 194, '보정 취소 (00)', { size: 13, c: C.red });
      /* 머시닝센터 */
      s += t(360, 26, '머시닝센터 — T__ M06', { a: 'm', b: 1, size: 15 });
      s += F.circle(306, 104, 44, { fill: C.grayL });
      for (var k = 0; k < 8; k++) {
        var a = k * PI / 4, px = 306 + 32 * Math.cos(a), py = 104 + 32 * Math.sin(a);
        s += F.circle(px, py, 7, k === 0 ? { fill: C.blueL, c: C.blue, w: 2 } : { fill: '#fff', w: 1.2 });
      }
      s += t(306, 104, '매거진', { a: 'm', size: 13, c: C.sub });
      s += box(404, 58, 34, 44, { fill: C.grayM, r: 3 }) + t(421, 46, '주축', { a: 'm', size: 13, c: C.sub });
      s += F.poly([[412, 102], [430, 102], [427, 132], [415, 132]], { close: 1, fill: C.blueL, c: C.blue, w: 1.4 });
      s += route([[346, 96], [372, 70], [400, 78]], { c: C.blue, w: 2 });
      s += t(360, 176, 'T = 공구를 고르기만', { a: 'm', size: 14 });
      s += t(360, 200, 'M06 = 실제로 바꾸기', { a: 'm', size: 14, c: C.blue, b: 1 });
      s += t(360, 224, 'M06 없이 지령하면 에러', { a: 'm', size: 13, c: C.red });
      return F.svg(480, 240, s);
    } },

  subprog: { cards: ['보조기능 M — 기계의 스위치를 켜고 끈다'],
    cap: 'M98 P11 L5 — 보조프로그램 O0011 을 5번 돌리고, M99 로 주 프로그램에 돌아온다',
    draw: function () {
      var s = t(116, 26, '주 프로그램', { a: 'm', b: 1, size: 15 });
      s += box(16, 42, 200, 164, { fill: '#fff' });
      s += box(22, 88, 188, 30, { fill: C.blueL, c: C.blue, r: 4 });
      var L = ['N10 ……… ;', 'N20 M98 P11 L5 ;', 'N30 ……… ;', 'N40 M30 ;'];
      for (var i = 0; i < 4; i++) s += code(30, 68 + i * 36, L[i], { size: 15, b: i === 1, c: i === 1 ? C.blue : C.ink, halo: false });
      s += t(382, 26, '보조프로그램 O0011', { a: 'm', b: 1, size: 15 });
      s += box(300, 42, 164, 118, { fill: '#fff' });
      s += code(314, 68, '……… ;', { size: 15, halo: false }) + code(314, 98, '……… ;', { size: 15, halo: false });
      s += box(306, 118, 152, 30, { fill: C.orangeL, c: C.orange, r: 4 }) + code(314, 134, 'M99 ;', { size: 15, b: 1, c: C.orange, halo: false });
      s += route([[212, 103], [256, 103], [256, 64], [296, 64]], { c: C.blue, w: 2.2 }) + t(262, 86, '호출', { size: 13, c: C.blue, b: 1 });
      s += route([[300, 142], [262, 142], [262, 140], [214, 140]], { c: C.orange, w: 2.2 }) + t(262, 158, '돌아옴', { size: 13, c: C.orange, b: 1 });
      s += route([[438, 160], [438, 190], [330, 190], [330, 164]], { c: C.blue, w: 2 }) + t(384, 206, '× 5 번 (L5)', { a: 'm', size: 14, c: C.blue, b: 1 });
      s += t(16, 234, 'P = 보조프로그램 번호 · L = 반복 횟수(빼면 1회)', { size: 13, c: C.sub });
      return F.svg(480, 250, s);
    } },

  /* ─────────── 4단원 절삭조건 ─────────── */
  vn: { cards: ['절삭속도 V 와 회전수 N'],
    cap: '절삭속도 — 지름 D 의 둘레(πD)가 1분에 N 바퀴 지나가는 거리',
    draw: function () {
      var s = F.circle(110, 124, 62, { fill: C.grayL });
      s += F.dim(48, 124, 172, 124, 'D', { size: 16 });
      s += arc(110, 124, 76, -2.5, -0.6, { c: C.blue, w: 2.2 }) + t(110, 34, 'N (rpm)', { a: 'm', b: 1, c: C.blue });
      s += F.poly([[173, 118], [206, 104], [206, 140], [173, 128]], { close: 1, fill: C.grayM, w: 1.4 });
      s += t(110, 212, '가공물 (지름 D, mm)', { a: 'm', size: 13, c: C.sub });
      s += t(246, 50, '한 바퀴 = 둘레 πD (mm)', { b: 1, size: 15 });
      s += arrow(246, 76, 464, 76, { both: true, c: C.orange, w: 2.4 });
      s += t(246, 110, '1분에 N 바퀴 도니까', { size: 15 });
      s += t(246, 134, '1분에 πDN (mm) 지나간다', { size: 15 });
      s += box(240, 156, 228, 44, { fill: C.blueL, c: C.blue, label: 'V = πDN / 1000  (m/min)', size: 16 });
      s += t(354, 220, 'mm 를 m 로 바꾸려고 ÷ 1000', { a: 'm', size: 13, c: C.sub });
      s += t(354, 242, '거꾸로 풀면  N = 1000V / (πD)', { a: 'm', size: 14, b: 1 });
      return F.svg(480, 258, s);
    } },

  fz: { cards: ['이송속도 — 날이 여러 개일 때 (F = f<sub>z</sub> · Z · N)'],
    cap: 'F = fz × Z × N — 날 하나가 fz, 한 바퀴에 날 Z 개, 1분에 N 바퀴',
    draw: function () {
      var s = F.circle(106, 112, 46, { fill: C.blueL, c: C.blue });
      for (var k = 0; k < 4; k++) {
        var a = k * PI / 2 + PI / 4, c1 = Math.cos(a), s1 = Math.sin(a), c2 = Math.cos(a + 0.35), s2 = Math.sin(a + 0.35);
        s += F.poly([[106 + 46 * c1, 112 + 46 * s1], [106 + 58 * c1, 112 + 58 * s1], [106 + 46 * c2, 112 + 46 * s2]], { close: 1, fill: C.blue, c: C.blue, w: 1 });
        s += line(106, 112, 106 + 44 * c1, 112 + 44 * s1, { w: 1, c: C.blue });
      }
      s += arc(106, 112, 70, -2.4, -0.7, { c: C.ink, w: 1.6, head: 9 });
      s += t(106, 190, '4날 엔드밀 (Z = 4)', { a: 'm', size: 13, c: C.sub });
      s += arrow(56, 222, 150, 222, { c: C.orange, w: 2.4 }) + t(158, 222, '이송', { size: 13, c: C.orange, b: 1 });
      var R = [['날 1개가 지날 때', 'fz'], ['1회전 (날 Z 개)', 'fz × Z'], ['1분 (N 회전)', 'F = fz × Z × N']];
      for (var i = 0; i < 3; i++) {
        var y = 30 + i * 66;
        s += t(226, y + 20, R[i][0], { size: 14 });
        s += box(348, y, 120, 40, { fill: i === 2 ? C.blueL : C.grayL, c: i === 2 ? C.blue : C.ink, label: R[i][1], size: i === 2 ? 15 : 16 });
        if (i < 2) s += arrow(408, y + 42, 408, y + 64, { w: 1.6, head: 9 });
      }
      s += t(226, 240, '예) 0.1 × 4 × 796 ≒ 318 mm/min', { size: 14 });
      return F.svg(480, 258, s);
    } },

  coat: { cards: ['절삭공구 재료와 코팅'],
    cap: '공구 날 끝의 경사면(칩이 스치는 면)과 여유면 — 면마다 강한 코팅이 다르다',
    draw: function () {
      var s = '';
      s += box(16, 150, 270, 52, { fill: C.grayL, r: 2 }) + box(16, 130, 172, 20, { fill: C.grayL, r: 0 });
      s += F.path('M188,130 Q166,118 158,92 Q150,64 118,56 L114,70 Q138,76 144,98 Q152,126 176,140 Z', { fill: C.grayM, c: C.sub, w: 1.4 });
      s += t(104, 48, '칩', { size: 13, c: C.sub, b: 1 });
      s += F.poly([[196, 150], [182, 60], [282, 60], [282, 138]], { close: 1, fill: C.grayM, w: 2 });
      s += line(196, 150, 182, 60, { c: C.blue, w: 5 }) + line(196, 150, 282, 138, { c: C.green, w: 5 });
      s += F.num(176, 104, '1', { c: C.blue }) + F.num(242, 158, '2', { c: C.green });
      s += arrow(30, 180, 70, 180, { w: 1.6, head: 9, c: C.sub }) + t(78, 180, '공작물 이동', { size: 13, c: C.sub });
      s += t(300, 36, '① 경사면', { b: 1, c: C.blue }) + t(300, 58, '칩이 스치는 면', { size: 13 }) + t(300, 78, 'Al₂O₃ 가 강함', { size: 13, c: C.blue, b: 1 });
      s += t(300, 110, '② 여유면', { b: 1, c: C.green }) + t(300, 132, '깎인 면과 마주 보는 면', { size: 13 }) + t(300, 152, 'TiC 가 강함', { size: 13, c: C.green, b: 1 });
      s += t(300, 184, 'TiN — 구성인선 방지', { size: 13, b: 1 });
      s += line(12, 214, 468, 214, { w: 1, c: C.edge });
      s += t(16, 236, '코팅 온도', { b: 1, size: 14 });
      s += box(100, 226, 240, 18, { fill: C.orangeL, c: C.orange, r: 3 }) + t(348, 235, 'CVD 약 1000 ℃', { size: 13 });
      s += box(100, 252, 120, 18, { fill: C.grayL, r: 3 }) + t(228, 261, 'PVD 500 ℃ 이하', { size: 13 });
      return F.svg(480, 282, s);
    } },

  /* ─────────── 5단원 CNC 선반 — 좌표계와 원점복귀 ─────────── */
  g50: { cards: ['프로그램 원점과 좌표계 설정 (G50)'],
    cap: 'G50 — 프로그램 원점(가공물 끝면 중심)에서 본 시작점 좌표를 알려 준다 (선반의 X 는 지름값)',
    draw: function () {
      var s = code(16, 28, 'G50 X150.0 Z150.0 S1200 ;', { size: 17, b: 1 });
      s += line(16, 214, 468, 214, { dash: 'center', w: 1, c: C.sub });
      s += box(16, 150, 28, 128, { fill: C.grayM, r: 2 });
      s += box(44, 166, 196, 96, { fill: C.grayL, r: 2 });
      s += arrow(240, 214, 300, 214, { c: C.blue, w: 1.8, head: 9 }) + t(306, 226, 'Z+', { size: 13, c: C.blue, b: 1 });
      s += arrow(240, 214, 240, 150, { c: C.blue, w: 1.8, head: 9 }) + t(228, 146, 'X+', { size: 13, c: C.blue, b: 1, a: 'e' });
      s += origin(240, 214, C.blue);
      s += callout(244, 220, 286, 252, '프로그램 원점', { c: C.blue });
      /* 시작점 */
      var sx = 420, sy = 106;
      s += F.poly([[sx, sy], [sx + 30, sy - 22], [sx + 42, sy - 8], [sx + 12, sy + 10]], { close: 1, fill: C.grayM, w: 1.4 });
      s += dot(sx, sy, 5, C.orange) + t(sx - 6, sy + 22, '시작점', { a: 'e', size: 14, c: C.orange, b: 1 });
      s += line(240, 150, 240, 64, { w: 1, c: C.sub }) + line(sx, sy - 4, sx, 64, { w: 1, c: C.sub });
      s += F.dim(240, 72, sx, 72, 'Z150.0', { size: 14 });
      s += line(sx + 4, sy, 460, sy, { w: 1, c: C.sub });
      s += F.dim(452, 214, 452, sy, 'X150.0 (지름)', { size: 13 });
      s += t(16, 300, 'S1200 = 주축 최고 회전수를 1200 rpm 으로 제한', { size: 13, c: C.sub });
      return F.svg(480, 316, s);
    } },

  g28: { cards: ['기계원점과 원점복귀 (G28 · G30 · G27 · G29)'],
    cap: 'G28 은 경유점을 지나 기계원점으로 — U0 W0 는 제자리 경유, X0 Z0 는 가공물 원점 경유(충돌 위험)',
    draw: function () {
      var s = line(16, 228, 300, 228, { dash: 'center', w: 1, c: C.sub });
      s += box(16, 150, 22, 90, { fill: C.grayM, r: 2 }) + box(38, 168, 172, 60, { fill: C.grayL, r: 2 });
      s += origin(210, 228) + t(210, 252, '프로그램 원점', { a: 'm', size: 13 });
      var mx = 440, my = 52, px = 322, py = 150;
      s += origin(mx, my, C.purple) + t(mx, my + 24, '기계원점', { a: 'm', size: 13, c: C.purple, b: 1 });
      s += F.poly([[px, py], [px + 28, py - 20], [px + 40, py - 6], [px + 12, py + 10]], { close: 1, fill: C.grayM, w: 1.4 });
      s += dot(px, py, 5) + t(px - 8, py - 14, '현재 위치', { a: 'e', size: 13 });
      s += arrow(px + 6, py - 10, mx - 10, my + 8, { c: C.green, w: 2.6 });
      s += F.num(392, 104, '1', { c: C.green });
      s += arrow(px - 4, py + 6, 220, 220, { c: C.red, w: 2.2, dash: '6 4' });
      s += burst(214, 206);
      s += F.num(262, 196, '2', { c: C.red });
      s += F.num(28, 280, '1', { c: C.green }) + code(46, 280, 'G28 U0 W0', { b: 1, size: 15, c: C.green }) + t(150, 280, '현재 위치를 경유 → 안전', { size: 14, c: C.green });
      s += F.num(28, 306, '2', { c: C.red }) + code(46, 306, 'G28 X0 Z0', { b: 1, size: 15, c: C.red }) + t(150, 306, '프로그램 원점 경유 → 충돌 위험', { size: 14, c: C.red });
      s += t(16, 30, '전원을 켤 때 · 비상정지 뒤에는 반드시 원점복귀', { size: 14, b: 1 });
      s += t(16, 52, 'G28 은 지정한 점을 「거쳐서」 기계원점으로 간다', { size: 13, c: C.sub });
      return F.svg(480, 324, s);
    } },

  xzuw: { cards: ['절대지령과 증분지령 — X·Z 와 U·W'],
    cap: '선반은 절대지령 X·Z, 증분지령 U·W — U 는 지름의 차이 (숫자는 예시)',
    draw: function () {
      var s = line(40, 224, 468, 224, { dash: 'center', w: 1, c: C.sub });
      s += arrow(360, 224, 468, 224, { w: 1.4, head: 9, c: C.sub }) + t(462, 210, 'Z', { size: 14, c: C.sub, b: 1 });
      var ax = 360, ay = 164, bx = 260, by = 124;
      s += F.poly([[40, 124], [bx, by], [ax, ay], [ax, 224], [40, 224]], { close: 1, fill: C.grayL, w: 0 });
      s += arrow(ax, ay, bx + 4, by + 2, { c: C.blue, w: 2.8 });
      s += dot(ax, ay, 5, C.blue) + dot(bx, by, 5, C.blue);
      s += t(ax + 10, ay + 4, 'A (X30, Z0)', { size: 14, b: 1 });
      s += t(bx - 8, by + 18, 'B (X50, Z-20)', { size: 14, b: 1, a: 'e' });
      s += line(bx, by - 4, bx, 90, { w: 1, c: C.sub }) + line(ax, ay - 8, ax, 90, { w: 1, c: C.sub });
      s += F.dim(bx, 98, ax, 98, 'W-20.0', { size: 14, c: C.orange });
      s += line(bx + 4, ay, ax - 6, ay, { w: 1, c: C.sub, dash: '4 3' });
      s += F.dim(bx + 16, ay, bx + 16, by, 'U20.0', { size: 13, c: C.orange });
      s += code(16, 30, '절대  X50.0 Z-20.0 ;', { size: 15, b: 1 });
      s += code(16, 54, '증분  U20.0 W-20.0 ;', { size: 15, b: 1, c: C.orange });
      s += code(16, 78, '혼합  X50.0 W-20.0 ;', { size: 15, b: 1, c: C.sub });
      s += t(16, 250, 'U 는 지름의 차이 (50 − 30 = 20) · 머시닝센터는 G90 · G91 로 구분', { size: 13, c: C.sub });
      return F.svg(480, 266, s);
    } },

  /* ─────────── 6단원 CNC 선반 — 보간 · 나사 · 보정 ─────────── */
  interp: { cards: ['보간기능 — G00 · G01 · G02 · G03'],
    cap: '보간 — 급속(G00) · 직선(G01) · 시계 원호(G02) · 반시계 원호(G03), 원호는 R 또는 I·K 로',
    draw: function () {
      var s = '', cx = [60, 180, 300, 420], nm = ['급속 · F 없음', '직선 절삭', '시계방향 CW', '반시계 CCW'], cd = ['G00', 'G01', 'G02', 'G03'];
      for (var i = 0; i < 4; i++) {
        var x = cx[i];
        if (i) s += divider(x - 60, 12, 150);
        s += code(x, 22, cd[i], { a: 'm', b: 1, size: 17 }) + t(x, 42, nm[i], { a: 'm', size: 13, c: C.sub });
        s += F.circle(x - 40, 136, 5, { fill: '#fff', w: 1.6 });
      }
      s += arrow(20, 136, 100, 58, { dash: '7 5', c: C.sub, w: 2 });
      s += arrow(140, 136, 220, 58, { c: C.blue, w: 2.6 });
      s += route(arcPts(340, 136, 80, 80, PI, 1.5 * PI, 18), { c: C.blue, w: 2.6 });
      s += route(arcPts(380, 56, 80, 80, 0.5 * PI, 0, 18), { c: C.orange, w: 2.6 });
      s += line(12, 160, 468, 160, { w: 1, c: C.edge });
      /* R 과 I·K */
      var ccx = 150, ccy = 300, r = 100, a0 = 200 * PI / 180, sx = ccx + r * Math.cos(a0), sy = ccy + r * Math.sin(a0);
      s += route(arcPts(ccx, ccy, r, r, a0, 1.5 * PI, 16), { c: C.blue, w: 2.6 });
      s += F.circle(sx, sy, 5, { fill: '#fff', w: 1.6 }) + t(sx - 8, sy, '시작점', { a: 'e', size: 13 });
      s += dot(ccx, ccy, 4) + t(ccx + 8, ccy - 4, '중심', { size: 13 });
      var am = 235 * PI / 180;
      s += line(ccx, ccy, ccx + r * Math.cos(am), ccy + r * Math.sin(am), { w: 1.4 }) + t(116, 246, 'R', { size: 15, b: 1 });
      s += arrow(sx, sy, ccx - 3, sy, { c: C.orange, w: 1.8, head: 9, dash: '5 3' }) + t(100, sy + 14, 'K', { size: 14, b: 1, c: C.orange });
      s += arrow(ccx, sy, ccx, ccy - 6, { c: C.orange, w: 1.8, head: 9, dash: '5 3' }) + t(ccx + 8, 282, 'I', { size: 14, b: 1, c: C.orange });
      s += t(270, 190, '원호는 둘 중 하나로 지령', { b: 1, size: 15 });
      s += t(270, 216, '· R = 원호의 반지름', { size: 14 });
      s += t(270, 240, '· I·K = 시작점 → 중심', { size: 14, c: C.orange });
      s += t(282, 262, '(항상 증분값)', { size: 13, c: C.sub });
      s += t(270, 288, '180° 넘는 원호는 R 을 −로', { size: 13, c: C.red, b: 1 });
      return F.svg(480, 306, s);
    } },

  thread: { cards: ['나사가공 — G32 · G92 · G76'],
    cap: '나사는 여러 번 나눠 깎는다 — 그 반복을 얼마나 짧게 쓰느냐가 G32 · G92 · G76 의 차이 (개념도)',
    draw: function () {
      var s = box(20, 70, 200, 100, { fill: C.grayL, r: 2 });
      s += F.poly([[50, 70], [120, 164], [190, 70]], { close: 1, fill: '#fff', w: 1.6 });
      var ys = [92, 114, 130, 142, 152, 160];
      for (var i = 0; i < ys.length; i++) {
        var d = (ys[i] - 70) * 70 / 94;
        s += line(50 + d, ys[i], 190 - d, ys[i], { c: C.blue, w: 1.6 });
      }
      s += F.poly([[104, 26], [136, 26], [120, 60]], { close: 1, fill: C.grayM, w: 1.4 });
      s += t(120, 190, '여러 번 나눠 깎는다', { a: 'm', size: 14, b: 1 });
      s += t(120, 212, '갈수록 조금씩 얕게', { a: 'm', size: 13, c: C.sub });
      s += t(120, 236, '회전수 일정 G97 로', { a: 'm', size: 13, c: C.red, b: 1 });
      s += divider(240, 14, 246);
      s += t(256, 26, '프로그램 줄 수로 비교', { b: 1, size: 14 });
      var R = [['G32', 14, '깎을 때마다 직접 지령'], ['G92', 6, '사이클 한 줄 = 한 번'], ['G76', 2, '한 번 지령으로 끝']];
      for (var k = 0; k < 3; k++) {
        var y = 52 + k * 66;
        s += code(256, y + 12, R[k][0], { b: 1, size: 17, c: k === 2 ? C.blue : C.ink });
        for (var b = 0; b < R[k][1]; b++) s += box(306 + b * 11, y, 7, 24, { fill: k === 2 ? C.blueL : C.grayM, c: k === 2 ? C.blue : C.sub, r: 1, w: 1 });
        s += t(306, y + 40, R[k][2], { size: 13, c: C.sub });
      }
      return F.svg(480, 252, s);
    } },

  g41: { cards: ['공구인선 반지름 보정 — G40 · G41 · G42'],
    cap: '진행 방향을 보고 공구가 왼쪽이면 G41, 오른쪽이면 G42 — 같은 자리도 방향이 바뀌면 코드가 바뀐다',
    draw: function () {
      var s = divider(240, 14, 210);
      s += t(120, 26, 'G41 — 공구가 왼쪽', { a: 'm', b: 1, size: 16, c: C.blue });
      s += t(360, 26, 'G42 — 공구가 오른쪽', { a: 'm', b: 1, size: 16, c: C.orange });
      s += box(20, 130, 200, 70, { fill: C.grayL, label: '가공물', size: 14, lc: C.sub });
      s += box(260, 130, 200, 70, { fill: C.grayL, label: '가공물', size: 14, lc: C.sub });
      for (var i = 0; i < 3; i++) {
        s += F.circle(56 + i * 60, 114, 16, i === 2 ? { fill: C.blueL, c: C.blue } : { fill: '#fff', c: C.blue, w: 1.2, dash: '4 3' });
        s += F.circle(424 - i * 60, 114, 16, i === 2 ? { fill: C.orangeL, c: C.orange } : { fill: '#fff', c: C.orange, w: 1.2, dash: '4 3' });
      }
      s += arrow(40, 74, 200, 74, { c: C.blue, w: 2.4 }) + t(120, 58, '진행 방향 →', { a: 'm', size: 13, c: C.blue });
      s += arrow(440, 74, 280, 74, { c: C.orange, w: 2.4 }) + t(360, 58, '← 진행 방향', { a: 'm', size: 13, c: C.orange });
      s += t(240, 226, '보정이 끝나면 반드시 G40 으로 취소', { a: 'm', size: 14, c: C.red, b: 1 });
      return F.svg(480, 242, s);
    } },

  nose: { cards: ['가상인선이란 무엇인가'],
    cap: '인선 R 이 있는데 프로그램은 뾰족한 가상인선으로 짠다 → 테이퍼·원호에서 덜 깎인다(과소절삭)',
    draw: function () {
      var s = t(16, 26, '인선 R 과 가상인선', { b: 1, size: 15 });
      s += F.path('M226,170 L110,170 A40,40 0 0,1 70,130 L70,50 L226,50 Z', { fill: C.grayM, w: 2 });
      s += line(70, 130, 70, 190, { dash: '5 4', w: 1.2, c: C.orange }) + line(110, 170, 48, 170, { dash: '5 4', w: 1.2, c: C.orange });
      s += dot(70, 170, 5, C.orange);
      s += line(110, 130, 81.7, 158.3, { w: 1.4 }) + t(104, 150, 'R', { size: 15, b: 1 });
      s += dot(110, 130, 3);
      s += callout(70, 170, 92, 208, '가상인선', { c: C.orange, tc: C.orange, b: 1 });
      s += t(98, 230, '프로그램이 보는 점', { size: 13, c: C.sub });
      s += divider(244, 14, 246);
      s += t(256, 26, '테이퍼에서 생기는 오차', { b: 1, size: 15 });
      s += F.poly([[256, 80], [320, 80], [440, 180], [468, 180], [468, 214], [256, 214]], { close: 1, fill: C.grayL, w: 0 });
      s += F.poly([[320, 80], [335.6, 80], [455.6, 180], [440, 180]], { close: 1, fill: C.redL, c: C.red, w: 1 });
      s += F.poly([[256, 80], [335.6, 80], [455.6, 180], [468, 180]], { c: C.red, w: 1.6, dash: '5 4' });
      s += F.poly([[256, 80], [320, 80], [440, 180], [468, 180]], { c: C.blue, w: 2.4 });
      s += callout(392, 132, 420, 110, '덜 깎임', { c: C.red, tc: C.red, b: 1 });
      s += t(266, 66, '─ 프로그램 경로', { size: 13, c: C.blue }) + t(266, 232, '직선(축 방향)은 괜찮다', { size: 13, c: C.sub });
      s += t(362, 254, '→ G41 · G42 로 보정', { a: 'm', size: 14, b: 1 });
      return F.svg(480, 268, s);
    } },

  /* ─────────── 7단원 CNC 선반 — 사이클 가공 ─────────── */
  g90cyc: { cards: ['왜 사이클을 쓰는가 · 단일형 (G90 · G94)'],
    cap: 'G90 — ①급속 ②절삭 ③절삭(빠짐) ④급속 복귀의 네모를, 다음 줄에 X 만 바꿔 반복 (숫자는 예시)',
    draw: function () {
      var s = line(16, 226, 468, 226, { dash: 'center', w: 1, c: C.sub });
      s += box(16, 100, 22, 140, { fill: C.grayM, r: 2 }) + box(38, 112, 302, 114, { fill: C.grayL, r: 2 });
      var ax = 390, ay = 98, zx = 160, lv = [134, 154, 174];
      for (var i = 2; i >= 0; i--) {
        var op = i === 0 ? 1 : 0.4, y = lv[i];
        var g = arrow(ax, ay, ax, y, { dash: '6 4', c: C.sub, w: 1.8, head: 9 }) + arrow(ax, y, zx, y, { c: C.blue, w: 2.4, head: 10 }) +
          arrow(zx, y, zx, ay, { c: C.blue, w: 2.4, head: 10 }) + arrow(zx, ay, ax, ay, { dash: '6 4', c: C.sub, w: 1.8, head: 9 });
        s += F.g(g, { op: op });
      }
      s += dot(ax, ay, 5) + t(ax + 8, ay - 12, '시작점', { size: 13 });
      s += F.num(404, 120, '①', { c: C.sub }) + F.num(280, 124, '②') + F.num(146, 120, '③') + F.num(280, 86, '④', { c: C.sub });
      s += code(16, 26, 'G90 X56.0 Z-30.0 F0.2 ;', { size: 15, b: 1 });
      s += code(16, 48, 'X52.0 ;', { size: 15, b: 1, c: C.blue }) + code(16, 70, 'X48.0 ;', { size: 15, b: 1, c: C.blue });
      s += line(292, 26, 322, 26, { dash: '6 4', c: C.sub }) + t(330, 26, '급속', { size: 13 });
      s += line(292, 48, 322, 48, { c: C.blue, w: 2.4 }) + t(330, 48, '절삭 (F 속도)', { size: 13 });
      s += t(16, 256, '다음 줄부터 X 만 바꾸면 같은 네모를 반복 · G94 는 단면 방향', { size: 13, c: C.sub });
      return F.svg(480, 272, s);
    } },

  g71: { cards: ['복합형 반복 사이클 (G70 ~ G76)'],
    cap: 'G71 — 다듬 형상(ns~nf)에 여유(Δu/2 · Δw)를 남기고 Δd 씩 깎은 뒤 e 만큼 빠진다',
    draw: function () {
      var s = code(16, 22, 'G71 U(Δd) R(e) ;', { size: 14, b: 1 });
      s += code(16, 44, 'G71 P(ns) Q(nf) U(Δu) W(Δw) F ;', { size: 14, b: 1 });
      s += line(16, 262, 468, 262, { dash: 'center', w: 1, c: C.sub });
      s += box(16, 70, 22, 200, { fill: C.grayM, r: 2 }) + box(38, 80, 342, 182, { fill: C.grayL, r: 2 });
      /* 다듬 형상 아래는 남는 부분 — 더 진하게 */
      var prof = [[100, 80], [100, 120], [180, 120], [180, 160], [290, 160], [290, 200], [380, 200], [380, 262], [38, 262], [38, 80]];
      s += F.poly(prof, { close: 1, fill: C.grayM, w: 0 });
      s += F.poly([[380, 200], [290, 200], [290, 160], [180, 160], [180, 120], [100, 120], [100, 80]], { c: C.blue, w: 3 });
      s += F.poly([[392, 188], [302, 188], [302, 148], [192, 148], [192, 108], [112, 108], [112, 80]], { c: C.orange, w: 1.8, dash: '6 4' });
      /* 거친 절삭 */
      var P = [[100, 112], [120, 192], [140, 192], [160, 302], [180, 302]];
      for (var i = 0; i < P.length; i++) {
        var y = P[i][0], ex = P[i][1];
        s += line(412, y, ex, y, { w: 1.6 }) + line(ex, y, ex + 8, y - 8, { w: 1.6, c: C.red });
      }
      s += dot(420, 80, 5) + t(426, 70, '시작점', { size: 13 });
      s += F.dim(440, 100, 440, 120, '', {}) + t(450, 110, 'Δd', { size: 15, b: 1 });
      s += callout(196, 132, 222, 128, 'e (빠짐)', { c: C.red, tc: C.red });
      s += callout(340, 194, 350, 234, 'Δu/2 · X 여유', { c: C.orange, tc: C.orange });
      s += callout(296, 176, 238, 184, 'Δw · Z 여유', { c: C.orange, tc: C.orange, a: 'e' });
      s += callout(380, 200, 420, 214, 'ns', { c: C.blue, tc: C.blue, b: 1 });
      s += callout(100, 80, 64, 60, 'nf', { c: C.blue, tc: C.blue, b: 1 });
      s += t(118, 240, '다듬 형상 (ns ~ nf)', { size: 14, c: C.blue, b: 1 });
      return F.svg(480, 282, s);
    } },

  /* ─────────── 8단원 머시닝센터 ─────────── */
  mct: { cards: ['머시닝센터란 · 절삭조건'],
    cap: '수직형 머시닝센터 — 공구 매거진(ATC)에서 공구를 바꿔 가며 한 번 설치로 가공',
    draw: function () {
      var s = box(70, 250, 300, 24, { fill: C.grayL, r: 4 }) + box(266, 40, 70, 210, { fill: C.grayL, r: 4 });
      s += box(180, 70, 110, 54, { fill: C.grayM, r: 5 }) + box(216, 124, 26, 24, { fill: C.grayM, r: 2 });
      s += F.poly([[221, 148], [237, 148], [234, 184], [224, 184]], { close: 1, fill: C.blueL, c: C.blue, w: 1.4 });
      s += box(120, 230, 170, 20, { fill: C.grayM, r: 2 }) + box(100, 214, 210, 16, { fill: C.grayL, r: 2 });
      s += box(180, 190, 76, 24, { fill: C.orangeL, c: C.orange, r: 2 });
      s += F.circle(374, 78, 32, { fill: '#fff' });
      for (var k = 0; k < 8; k++) { var a = k * PI / 4; s += F.circle(374 + 22 * Math.cos(a), 78 + 22 * Math.sin(a), 5, { fill: C.grayL, w: 1 }); }
      s += line(346, 102, 256, 112, { w: 4, c: C.sub });
      s += t(374, 28, '공구 매거진 (ATC)', { a: 'm', size: 13, b: 1 });
      s += callout(216, 136, 130, 110, '주축 (수직)', { a: 'e' }) + callout(224, 170, 130, 160, '공구', { a: 'e', c: C.blue }) +
        callout(182, 202, 130, 196, '공작물', { a: 'e', c: C.orange }) + callout(102, 222, 66, 238, '테이블', { a: 'e' });
      var ox = 422, oy = 238;
      s += arrow(ox, oy, ox + 44, oy, { w: 1.8, head: 9 }) + arrow(ox, oy, ox, oy - 48, { w: 1.8, head: 9 }) + arrow(ox, oy, ox + 28, oy - 22, { w: 1.8, head: 9 });
      s += t(ox + 40, oy + 14, 'X', { size: 14, b: 1 }) + t(ox - 12, oy - 46, 'Z', { size: 14, b: 1 }) + t(ox + 32, oy - 32, 'Y', { size: 14, b: 1 });
      s += t(16, 296, '기본 설정 — 평면 G17 (X-Y) · 이송 G94 (분당)', { size: 13, c: C.sub });
      return F.svg(480, 312, s);
    } },

  planes: { cards: ['평면 선택 — G17 · G18 · G19'],
    cap: '평면 선택 — G17(X-Y) · G18(Z-X) · G19(Y-Z). 수직형 머시닝센터는 G17 이 기본',
    draw: function () {
      var s = '', cx = [80, 240, 400], nm = [['G17', 'X-Y 평면', C.blue, C.blueL], ['G18', 'Z-X 평면', C.orange, C.orangeL], ['G19', 'Y-Z 평면', C.green, C.greenL]];
      for (var i = 0; i < 3; i++) {
        if (i) s += divider(cx[i] - 80, 12, 250);
        var ox = cx[i] - 44, oy = 180, X = [80, 0], Y = [40, -32], Z = [0, -100];
        var P = function (a, b, c) { return [ox + a * X[0] + b * Y[0] + c * Z[0], oy + a * X[1] + b * Y[1] + c * Z[1]]; };
        var pl = i === 0 ? [P(0, 0, 0), P(1, 0, 0), P(1, 1, 0), P(0, 1, 0)] : (i === 1 ? [P(0, 0, 0), P(1, 0, 0), P(1, 0, 1), P(0, 0, 1)] : [P(0, 0, 0), P(0, 1, 0), P(0, 1, 1), P(0, 0, 1)]);
        s += F.poly(pl, { close: 1, fill: nm[i][3], c: nm[i][2], w: 1.8 });
        var ex = P(1.35, 0, 0), ey = P(0, 1.45, 0), ez = P(0, 0, 1.25);
        s += arrow(ox, oy, ex[0], ex[1], { w: 1.6, head: 9 }) + arrow(ox, oy, ey[0], ey[1], { w: 1.6, head: 9 }) + arrow(ox, oy, ez[0], ez[1], { w: 1.6, head: 9 });
        s += t(ex[0] + 2, ex[1] + 14, 'X', { size: 14, b: 1 }) + t(ey[0] + 6, ey[1], 'Y', { size: 14, b: 1 }) + t(ez[0] + 10, ez[1] + 4, 'Z', { size: 14, b: 1 });
        s += code(cx[i], 214, nm[i][0], { a: 'm', b: 1, size: 18, c: nm[i][2] }) + t(cx[i], 238, nm[i][1], { a: 'm', size: 14 });
      }
      s += t(240, 272, 'G02 · G03 의 방향은 그 평면에 수직인 축의 + 쪽에서 내려다보고 정한다', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 290, s);
    } },

  /* ─────────── 9단원 머시닝센터 프로그래밍 ─────────── */
  g54: { cards: ['공작물 좌표계 — G54 ~ G59'],
    cap: '공작물 좌표계 — 테이블 위 공작물마다 원점을 등록해 두고 G54~G59 로 골라 쓴다',
    draw: function () {
      var s = box(20, 70, 440, 150, { fill: C.grayL, r: 6 });
      for (var y = 110; y < 220; y += 40) s += line(24, y, 456, y, { w: 1, c: C.grayM });
      var W = [[50, 120, 90, 70, 'G54'], [190, 110, 90, 80, 'G55'], [330, 130, 90, 60, 'G56']];
      var mx = 452, my = 36;
      s += origin(mx, my, C.purple) + t(mx - 14, my, '기계원점', { a: 'e', size: 13, c: C.purple, b: 1 });
      for (var i = 0; i < 3; i++) {
        var w = W[i], ox = w[0], oy = w[1] + w[3];
        s += box(w[0], w[1], w[2], w[3], { fill: C.orangeL, c: C.orange, r: 3 });
        s += line(mx - 6, my + 6, ox + 4, oy - 4, { w: 1, c: C.purple, dash: '4 4' });
        s += arrow(ox, oy, ox + 28, oy, { c: C.blue, w: 1.8, head: 8 }) + arrow(ox, oy, ox, oy - 28, { c: C.blue, w: 1.8, head: 8 });
        s += dot(ox, oy, 4, C.blue);
        s += code(ox + w[2] / 2 + 6, w[1] + w[3] / 2 - 4, w[4], { a: 'm', b: 1, size: 17, c: C.blue });
      }
      s += t(20, 244, 'G54 ~ G59 — 여섯 개까지 등록 · 선반 G50 = 머시닝센터 G92', { size: 13, c: C.sub });
      return F.svg(480, 260, s);
    } },

  g90g91: { cards: ['절대·증분지령 — G90 과 G91'],
    cap: 'A(−30, −30) 에서 B(30, −15) 로 — 절대(G90)는 B 의 좌표, 증분(G91)은 움직인 양',
    draw: function () {
      var O = [140, 140], k = 3, s = '';
      for (var v = -40; v <= 40; v += 10) {
        s += line(O[0] + v * k, 20, O[0] + v * k, 260, { w: 1, c: C.edge }) + line(20, O[1] - v * k, 260, O[1] - v * k, { w: 1, c: C.edge });
      }
      s += arrow(20, O[1], 270, O[1], { w: 1.6, head: 9 }) + t(262, O[1] - 14, 'X', { size: 14, b: 1 });
      s += arrow(O[0], 260, O[0], 12, { w: 1.6, head: 9 }) + t(O[0] + 12, 18, 'Y', { size: 14, b: 1 });
      var A = [O[0] - 30 * k, O[1] + 30 * k], B = [O[0] + 30 * k, O[1] + 15 * k];
      s += line(A[0], A[1], B[0], A[1], { dash: '5 4', w: 1.2, c: C.orange }) + line(B[0], A[1], B[0], B[1], { dash: '5 4', w: 1.2, c: C.orange });
      s += t((A[0] + B[0]) / 2, A[1] + 14, '60', { a: 'm', size: 14, b: 1, c: C.orange });
      s += t(B[0] + 8, (A[1] + B[1]) / 2, '15', { size: 14, b: 1, c: C.orange });
      s += arrow(A[0], A[1], B[0] - 3, B[1] + 1, { c: C.blue, w: 2.8 });
      s += dot(A[0], A[1], 5, C.blue) + dot(B[0], B[1], 5, C.blue);
      s += t(A[0] - 4, A[1] - 16, 'A', { size: 15, b: 1 }) + t(B[0] + 2, B[1] - 16, 'B', { size: 15, b: 1 });
      s += t(290, 36, '절대 G90', { b: 1, size: 16, c: C.blue }) + code(290, 62, 'X30.0 Y-15.0', { size: 16, b: 1 }) +
        t(290, 84, '원점에서 본 B 의 좌표', { size: 13, c: C.sub });
      s += t(290, 126, '증분 G91', { b: 1, size: 16, c: C.orange }) + code(290, 152, 'X60.0 Y15.0', { size: 16, b: 1 }) +
        t(290, 174, 'A 에서 B 까지 움직인 양', { size: 13, c: C.sub });
      s += t(290, 214, '30 − (−30) = 60', { size: 14 }) + t(290, 238, '−15 − (−30) = 15', { size: 14 });
      return F.svg(480, 276, s);
    } },

  dh: { cards: ['공구경 보정과 공구길이 보정 — D 와 H'],
    cap: '공구경 보정(D) 은 옆으로 반지름만큼, 공구길이 보정(H) 은 공구마다 다른 길이만큼',
    draw: function () {
      var s = divider(240, 14, 256);
      s += t(120, 26, '공구경 보정 — D', { a: 'm', b: 1, size: 16, c: C.blue });
      s += t(360, 26, '공구길이 보정 — H', { a: 'm', b: 1, size: 16, c: C.orange });
      s += box(52, 90, 136, 90, { fill: C.grayL, r: 0, w: 2.2 });
      s += box(36, 74, 168, 122, { fill: 'none', c: C.blue, w: 1.4, r: 16, dash: '6 4' });
      s += F.circle(84, 74, 16, { fill: C.blueL, c: C.blue }) + F.circle(150, 74, 16, { fill: '#fff', c: C.blue, w: 1.2, dash: '4 3' });
      s += line(84, 74, 84, 90, { w: 1.4 }) + t(90, 84, 'r', { size: 14, b: 1 });
      s += t(120, 140, '가공 형상', { a: 'm', size: 13, c: C.sub });
      s += t(120, 216, '공구 중심은 반지름만큼 비켜 간다', { a: 'm', size: 13 });
      s += t(120, 240, 'G41 · G42 + D 번호 · G40 취소', { a: 'm', size: 13, b: 1, c: C.blue });
      /* 길이 */
      s += box(284, 40, 32, 30, { fill: C.grayM, r: 3 }) + box(384, 40, 32, 30, { fill: C.grayM, r: 3 });
      s += box(292, 70, 16, 80, { fill: C.grayL, r: 1 }) + box(392, 70, 16, 116, { fill: C.grayL, r: 1 });
      s += box(256, 196, 212, 14, { fill: C.grayL, r: 1 });
      s += F.dim(276, 70, 276, 150, 'H01', { size: 13, c: C.orange }) + F.dim(430, 70, 430, 186, 'H02', { size: 13, c: C.orange, side: -1 });
      s += t(360, 230, 'H 번호에 공구 길이를 저장', { a: 'm', size: 13 });
      s += t(360, 250, 'G43 켜기 · G49 취소', { a: 'm', size: 13, b: 1, c: C.orange });
      return F.svg(480, 266, s);
    } },

  /* ─────────── 10단원 머시닝센터 고정 사이클 ─────────── */
  drill: { cards: ['구멍 가공 고정 사이클 (G73 ~ G89)'],
    cap: '구멍 가공 고정 사이클의 6동작 — 빠르게 접근 → 천천히 절삭 → 빠지기',
    draw: function () {
      var s = box(100, 140, 200, 110, { fill: C.grayL, r: 2 }) + box(188, 140, 24, 90, { fill: '#fff', r: 0, w: 1.2 });
      s += line(20, 50, 250, 50, { w: 1, c: C.sub, dash: '3 4' }) + line(20, 120, 250, 120, { w: 1, c: C.sub, dash: '3 4' });
      s += t(256, 50, '초기점', { size: 14, b: 1 }) + t(256, 120, 'R점', { size: 14, b: 1 });
      s += arrow(40, 50, 190, 50, { dash: '6 4', c: C.sub, w: 2, head: 9 });
      s += arrow(194, 54, 194, 118, { dash: '6 4', c: C.sub, w: 2, head: 9 });
      s += arrow(194, 122, 194, 226, { c: C.blue, w: 2.8, head: 10 });
      s += dot(200, 230, 5, C.orange);
      s += arrow(206, 226, 206, 124, { dash: '6 4', c: C.sub, w: 2, head: 9 });
      s += arrow(206, 116, 206, 56, { dash: '6 4', c: C.sub, w: 2, head: 9 });
      s += F.num(110, 36, '①', { c: C.sub }) + F.num(176, 86, '②', { c: C.sub }) + F.num(176, 186, '③') +
        F.num(226, 244, '④', { c: C.orange }) + F.num(226, 180, '⑤', { c: C.sub }) + F.num(226, 86, '⑥', { c: C.sub });
      var L = ['① X·Y 위치결정', '② R점까지 급속', '③ 구멍 가공 (절삭)', '④ 바닥에서의 동작', '⑤ R점까지 복귀', '⑥ 초기점까지 복귀'];
      for (var i = 0; i < 6; i++) s += t(318, 36 + i * 24, L[i], { size: 14, b: i === 2, c: i === 2 ? C.blue : C.ink });
      s += line(318, 196, 350, 196, { dash: '6 4', c: C.sub, w: 2 }) + t(358, 196, '급속', { size: 13 });
      s += line(318, 218, 350, 218, { c: C.blue, w: 2.8 }) + t(358, 218, '절삭', { size: 13 });
      s += t(318, 246, 'G99 면 ⑤ 에서 멈춘다', { size: 13, c: C.sub });
      s += t(40, 270, '다 쓰면 G80 으로 취소', { size: 13, c: C.red, b: 1 });
      return F.svg(480, 286, s);
    } },

  g98g99: { cards: ['구멍 가공 뒤 어디로 돌아오는가 — G98 · G99'],
    cap: 'G98 은 초기점까지 올라가 클램프를 넘고, G99 는 R점까지만 올라와 빠르지만 걸릴 수 있다',
    draw: function () {
      var s = box(40, 160, 400, 70, { fill: C.grayL, r: 2 });
      s += box(206, 104, 68, 56, { fill: C.grayM, r: 4 }) + t(240, 122, '클램프', { a: 'm', size: 13, halo: false });
      s += box(112, 160, 16, 50, { fill: '#fff', r: 0, w: 1.2 }) + box(352, 160, 16, 50, { fill: '#fff', r: 0, w: 1.2 });
      s += line(40, 50, 440, 50, { w: 1, c: C.sub, dash: '3 4' }) + line(40, 140, 440, 140, { w: 1, c: C.sub, dash: '3 4' });
      s += t(16, 50, '초기점', { size: 13, b: 1 }) + t(16, 140, 'R점', { size: 13, b: 1 });
      s += route([[116, 204], [116, 56], [356, 56], [356, 132]], { c: C.blue, w: 2.4, dash: '7 4' });
      s += route([[124, 204], [124, 146], [200, 146]], { c: C.red, w: 2.4, dash: '7 4' });
      s += burst(206, 146);
      s += t(240, 34, 'G98 — 초기점 복귀 → 클램프를 넘는다', { a: 'm', size: 14, b: 1, c: C.blue });
      s += t(196, 120, 'G99 — R점 복귀', { a: 'e', size: 14, b: 1, c: C.red });
      s += t(240, 252, '장애물이 없으면 G99 가 더 빠르다', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 268, s);
    } },

  /* ─────────── 11단원 CAD/CAM 과 DNC ─────────── */
  post: { cards: ['CAM 이 만든 툴패스는 그대로 못 쓴다 — 포스트 프로세서'],
    cap: '포스트 프로세서 — CAM 의 툴패스를 그 기계가 읽는 G코드로 바꾼다. 기계마다 다르다',
    draw: function () {
      var s = box(12, 88, 74, 54, { fill: C.grayL, label: 'CAD\n형상', size: 14 });
      s += box(104, 88, 84, 54, { fill: C.blueL, c: C.blue, label: 'CAM\n툴패스', size: 14 });
      s += arrow(86, 115, 102, 115, { head: 9 });
      s += box(222, 38, 112, 50, { fill: C.orangeL, c: C.orange, label: '포스트\n(선반용)', size: 14 });
      s += box(222, 142, 112, 50, { fill: C.orangeL, c: C.orange, label: '포스트\n(MC용)', size: 14 });
      s += route([[188, 104], [204, 104], [204, 63], [220, 63]], { head: 9 }) + route([[188, 126], [204, 126], [204, 167], [220, 167]], { head: 9 });
      s += box(366, 38, 102, 50, { fill: C.grayL, label: 'CNC 선반\nG코드', size: 14 });
      s += box(366, 142, 102, 50, { fill: C.grayL, label: '머시닝센터\nG코드', size: 14 });
      s += arrow(334, 63, 364, 63, { head: 9 }) + arrow(334, 167, 364, 167, { head: 9 });
      s += t(146, 162, '기계가 못 읽음', { a: 'm', size: 13, c: C.red, b: 1 });
      s += t(278, 214, '같은 형상이라도 기계마다 포스트가 다르다', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 230, s);
    } },

  leadin: { cards: ['리드인 · 리드아웃 과 가공 조건문'],
    cap: '리드인·리드아웃 — 툴패스가 부드럽게 들어가고 나오게 해 찍힘·공구 파손을 막는다',
    draw: function () {
      var s = divider(240, 14, 214);
      s += t(120, 26, '바로 들어가면', { a: 'm', b: 1, size: 15, c: C.red });
      s += t(360, 26, '리드인 · 리드아웃', { a: 'm', b: 1, size: 15, c: C.green });
      s += box(24, 120, 196, 80, { fill: C.grayL, r: 2 });
      s += route([[64, 46], [64, 108], [200, 108]], { w: 2.4 });
      s += F.circle(64, 108, 12, { fill: C.grayM, w: 1.2 });
      s += burst(64, 122) + t(84, 150, '찍힘 · 공구 파손 위험', { size: 13, c: C.red, b: 1 });
      s += box(260, 120, 196, 80, { fill: C.grayL, r: 2 });
      var inA = arcPts(304, 68, 40, 40, PI, PI / 2, 10), outA = arcPts(412, 68, 40, 40, PI / 2, 0, 10);
      s += F.poly(inA, { c: C.green, w: 2.6 }) + line(304, 108, 412, 108, { c: C.green, w: 2.6 }) + route(outA, { c: C.green, w: 2.6 });
      s += F.circle(356, 108, 12, { fill: C.grayM, w: 1.2 });
      s += t(270, 50, '리드인', { a: 'm', size: 13, c: C.green, b: 1 }) + t(446, 50, '리드아웃', { a: 'm', size: 13, c: C.green, b: 1 });
      s += t(240, 232, '가공 조건문 = CAM 에서 공구 · 절삭 조건을 정하는 것', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 248, s);
    } },

  /* ─────────── 12단원 측정과 검사 ─────────── */
  vernier: { cards: ['버니어캘리퍼스의 부척 — 0.05 mm 는 어떻게 나오는가'],
    cap: '어미자 19 mm 를 아들자 20 칸으로 — 한 칸 0.95 mm, 차이 0.05 mm 가 읽는 단위',
    draw: function () {
      var s = box(20, 48, 440, 44, { fill: C.grayL, r: 2 });
      for (var i = 0; i <= 21; i++) {
        var x = 30 + i * 20, h = i % 10 === 0 ? 24 : (i % 5 === 0 ? 17 : 11);
        s += line(x, 92, x, 92 - h, { w: 1.4 });
        if (i % 10 === 0) s += t(x, 58, String(i), { a: 'm', size: 14, b: 1 });
      }
      s += box(24, 92, 420, 40, { fill: C.blueL, c: C.blue, r: 2 });
      for (var j = 0; j <= 20; j++) {
        var vx = 30 + j * 19, vh = j % 10 === 0 ? 20 : (j % 5 === 0 ? 15 : 9);
        s += line(vx, 92, vx, 92 + vh, { w: 1.4, c: C.blue });
      }
      s += F.dim(30, 30, 410, 30, '어미자 19 mm', { size: 14 });
      s += F.dim(30, 150, 410, 150, '아들자 20 칸', { size: 14, c: C.blue, side: -1 });
      s += t(240, 186, '아들자 한 칸 = 19 ÷ 20 = 0.95 mm', { a: 'm', size: 15 });
      s += t(240, 212, '차이  1 − 0.95 = 0.05 mm  → 읽을 수 있는 최소 눈금', { a: 'm', size: 15, b: 1, c: C.blue });
      return F.svg(480, 230, s);
    } },

  abbe: { cards: ['외워 둘 측정 원리 — 아베 · 테일러 · 측정불확도'],
    cap: '아베의 원리 — 측정하는 길이와 눈금이 일직선이면 오차가 작고, 떨어져 있으면 기울 때 오차가 커진다',
    draw: function () {
      var s = divider(240, 14, 206);
      s += t(120, 26, '일직선 (마이크로미터)', { a: 'm', b: 1, size: 15, c: C.green });
      s += t(360, 26, '떨어짐 (버니어캘리퍼스)', { a: 'm', b: 1, size: 15, c: C.red });
      s += box(30, 104, 18, 52, { fill: C.grayM, r: 2 }) + box(48, 108, 50, 44, { fill: C.orangeL, c: C.orange, r: 2 });
      s += box(98, 122, 64, 16, { fill: C.grayM, r: 2 }) + box(162, 112, 44, 36, { fill: C.grayL, r: 4 });
      for (var i = 0; i < 5; i++) s += line(168 + i * 8, 112, 168 + i * 8, 122, { w: 1 });
      s += line(20, 130, 224, 130, { dash: 'center', w: 1.2, c: C.green });
      s += t(120, 176, '눈금이 측정 축 위에 있다', { a: 'm', size: 13 }) + t(120, 196, '→ 오차가 작다', { a: 'm', size: 13, b: 1, c: C.green });
      /* 캘리퍼스 */
      s += box(264, 60, 196, 18, { fill: C.grayL, r: 2 });
      for (var k = 0; k < 16; k++) s += line(272 + k * 11, 60, 272 + k * 11, 66, { w: 1 });
      s += box(280, 78, 16, 76, { fill: C.grayM, r: 2 });
      s += '<g transform="rotate(5 380 78)">' + box(372, 78, 16, 76, { fill: C.grayM, r: 2 }) + '</g>';
      s += box(296, 112, 74, 36, { fill: C.orangeL, c: C.orange, r: 2 });
      s += line(254, 69, 460, 69, { dash: 'center', w: 1.2, c: C.red }) + line(254, 130, 440, 130, { dash: 'center', w: 1.2, c: C.red });
      s += F.dim(446, 69, 446, 130, 'h', { size: 14, c: C.red, side: -1 });
      s += t(360, 176, '눈금과 측정 축이 h 만큼 떨어짐', { a: 'm', size: 13 }) + t(360, 196, '→ 조가 기울면 오차가 커진다', { a: 'm', size: 13, b: 1, c: C.red });
      return F.svg(480, 214, s);
    } },

  taylor: { cards: ['외워 둘 측정 원리 — 아베 · 테일러 · 측정불확도'],
    cap: '테일러의 원리 — 한계게이지의 통과측은 모든 치수를 동시에, 정지측은 치수 하나씩 따로 검사',
    draw: function () {
      var s = t(16, 26, '한계게이지 (플러그 게이지)', { b: 1, size: 15 });
      s += box(180, 100, 120, 30, { fill: C.grayM, r: 6 });
      s += box(56, 94, 124, 42, { fill: C.greenL, c: C.green, r: 3 });
      s += box(300, 94, 40, 42, { fill: C.redL, c: C.red, r: 3 });
      s += t(118, 72, '통과측 (GO)', { a: 'm', b: 1, c: C.green }) + t(320, 72, '정지측 (NOT GO)', { a: 'm', b: 1, c: C.red });
      s += t(118, 160, '들어가야 합격', { a: 'm', size: 14 }) + t(118, 182, '모든 치수를 동시에', { a: 'm', size: 13, c: C.sub });
      s += t(320, 160, '안 들어가야 합격', { a: 'm', size: 14 }) + t(320, 182, '치수 하나씩 따로', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 200, s);
    } },

  /* ─────────── 13단원 판금 가공 ─────────── */
  sheet3: { cards: ['전단 · 굽힘 · 성형 — 판금 가공의 큰 갈래'],
    cap: '판금 가공의 세 갈래 — 자르는 전단, 구부리는 굽힘, 입체로 만드는 성형',
    draw: function () {
      var s = divider(160, 14, 220) + divider(320, 14, 220);
      s += t(80, 26, '① 전단 — 자른다', { a: 'm', b: 1, size: 14 });
      s += t(240, 26, '② 굽힘 — 구부린다', { a: 'm', b: 1, size: 14 });
      s += t(400, 26, '③ 성형 — 입체로', { a: 'm', b: 1, size: 14 });
      /* 전단 */
      s += box(58, 48, 44, 70, { fill: C.grayM, r: 2, label: '펀치', size: 13 });
      s += box(18, 132, 36, 60, { fill: C.grayM, r: 2, label: '다이', size: 13 }) + box(106, 132, 36, 60, { fill: C.grayM, r: 2 });
      s += box(18, 122, 40, 10, { fill: C.blueL, c: C.blue, r: 0 }) + box(102, 122, 40, 10, { fill: C.blueL, c: C.blue, r: 0 });
      s += box(58, 136, 44, 10, { fill: C.blueL, c: C.blue, r: 0 });
      s += t(80, 210, '판을 잘라 낸다', { a: 'm', size: 13, c: C.sub });
      /* 굽힘 */
      s += F.poly([[228, 52], [252, 52], [252, 118], [240, 156], [228, 118]], { close: 1, fill: C.grayM, w: 1.6 }) + t(240, 84, '펀치', { a: 'm', size: 13 });
      s += box(186, 150, 108, 44, { fill: C.grayM, r: 2 }) + F.poly([[216, 150], [240, 176], [264, 150]], { close: 1, fill: '#fff', w: 1.6 }) + t(240, 184, '다이', { a: 'm', size: 13 });
      s += F.poly([[180, 128], [240, 170], [300, 128]], { c: C.blue, w: 4 });
      s += t(240, 210, '판을 구부린다', { a: 'm', size: 13, c: C.sub });
      /* 성형 */
      s += box(340, 132, 34, 60, { fill: C.grayM, r: 2 }) + box(426, 132, 34, 60, { fill: C.grayM, r: 2 });
      s += box(380, 46, 40, 118, { fill: C.grayM, r: 3, label: '펀치', size: 13 });
      s += F.poly([[334, 128], [376, 128], [376, 168], [424, 168], [424, 128], [466, 128]], { c: C.blue, w: 4 });
      s += t(400, 210, '컵 모양으로 (드로잉)', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 228, s);
    } },

  brake: { cards: ['프레스 브레이크의 특징'],
    cap: '프레스 브레이크 — 램에 단 상형(펀치)이 내려와 하형(다이) 위의 긴 판재를 굽힌다',
    draw: function () {
      var s = box(60, 36, 360, 40, { fill: C.grayM, r: 4, label: '램', size: 15 });
      s += F.poly([[210, 76], [270, 76], [270, 150], [240, 204], [210, 150]], { close: 1, fill: C.grayL, w: 1.8 });
      s += box(170, 190, 140, 40, { fill: C.grayM, r: 2 }) + F.poly([[212, 190], [240, 218], [268, 190]], { close: 1, fill: '#fff', w: 1.6 });
      s += box(60, 230, 360, 26, { fill: C.grayL, r: 4, label: '베드', size: 14 });
      s += F.poly([[70, 164], [240, 210], [410, 164]], { c: C.blue, w: 5 });
      s += t(110, 160, '판재', { b: 1, c: C.blue });
      s += callout(268, 116, 312, 116, '상형 (펀치)') + callout(180, 214, 120, 214, '하형 (다이)', { a: 'e' });
      s += arrow(446, 44, 446, 104, { both: true, c: C.orange, w: 2 }) + t(446, 122, '행정', { a: 'm', size: 13, c: C.orange, b: 1 });
      s += t(240, 280, '작업면이 길다 · 강한 압력으로 굽힘 정도가 좋다 · 유압식은 행정 조정', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 296, s);
    } },

  seam: { cards: ['판재를 잇는 법 — 심(seam) 이음'],
    cap: '심 이음 — 판 끝을 접어 서로 걸어 잇는다 (단면 개념도)',
    draw: function () {
      var s = divider(160, 14, 206) + divider(320, 14, 206);
      var o1 = { c: C.blue, w: 3.5 }, o2 = { c: C.orange, w: 3.5 };
      s += t(80, 26, '그루브 심', { a: 'm', b: 1, size: 15 }) + t(240, 26, '스탠딩 심', { a: 'm', b: 1, size: 15 }) + t(400, 26, '더블 심', { a: 'm', b: 1, size: 15 });
      s += F.g(F.poly([[10, 124], [96, 124], [96, 104], [58, 104]], o1) + F.poly([[150, 100], [54, 100], [54, 114], [92, 114]], o2), { x: 0, y: 0 });
      s += F.g(F.poly([[10, 150], [70, 150], [70, 106], [84, 106], [84, 122]], o1) + F.poly([[150, 150], [77, 150], [77, 112]], o2), { x: 160 });
      s += F.g(F.poly([[98, 40], [98, 112], [110, 112], [110, 92]], o2) + F.poly([[10, 132], [118, 132], [118, 84], [104, 84], [104, 104]], o1), { x: 320 });
      s += t(80, 176, '가장 많이 씀', { a: 'm', size: 13 }) + t(80, 196, '두께 1.2 mm 이하', { a: 'm', size: 13, c: C.sub });
      s += t(240, 176, '이음부를 세워 둔다', { a: 'm', size: 13 });
      s += t(400, 176, '원통 그릇의 바닥', { a: 'm', size: 13 });
      s += t(390, 50, '옆면', { size: 13, c: C.orange, b: 1, a: 'e' }) + t(340, 150, '바닥', { size: 13, c: C.blue, b: 1 });
      s += t(240, 228, '심 여유 = 3 × 심 나비 (두께 0.64 mm 이상이면 + 5 × 판 두께)', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 244, s);
    } },

  rolls: { cards: ['성형용 기계와 특수 가공'],
    cap: '비딩 머신(볼록·오목 롤러로 비드) 과 포밍 머신(롤러 3개로 원통)',
    draw: function () {
      var s = divider(240, 14, 206);
      s += t(120, 26, '비딩 머신', { a: 'm', b: 1, size: 15 });
      s += t(360, 26, '포밍 머신 (롤러 3개)', { a: 'm', b: 1, size: 15 });
      s += F.path('M40,42 H200 V90 H134 Q120,114 106,90 H40 Z', { fill: C.grayM, w: 1.6 });
      s += F.path('M40,160 H200 V112 H136 Q120,132 104,112 H40 Z', { fill: C.grayM, w: 1.6 });
      s += F.path('M24,101 H104 Q120,124 136,101 H216', { c: C.blue, w: 3.5 });
      s += t(120, 182, '비드를 낸다 → 보강 · 장식', { a: 'm', size: 13 });
      s += F.circle(318, 146, 22, { fill: C.grayM }) + F.circle(402, 146, 22, { fill: C.grayM }) + F.circle(360, 102, 26, { fill: C.grayM });
      s += F.poly(arcPts(360, 70, 64, 64, 160 * PI / 180, 20 * PI / 180, 30), { c: C.blue, w: 3.5 });
      s += F.poly(arcPts(360, 70, 64, 64, 20 * PI / 180, -35 * PI / 180, 10), { c: C.blue, w: 1.4, dash: '5 5' }) +
        F.poly(arcPts(360, 70, 64, 64, 160 * PI / 180, 215 * PI / 180, 10), { c: C.blue, w: 1.4, dash: '5 5' });
      s += t(360, 182, '판을 원통 · 원뿔로 굽힌다', { a: 'm', size: 13 });
      return F.svg(480, 200, s);
    } }

  };
})();
