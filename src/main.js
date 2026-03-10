let mainData = [], doneData = [], notEvalData = [];
let libraryData = [];
let table1, table2, table3;
let currentSelectedRoom = "";
let currentLibRoom = "";

const assessmentCriteria = [
  { title: "1. กระบวนการคิด (Thinking Process)", items: ["1.1 กิจกรรมมีการใช้คำถามกระตุ้นคิด วิเคราะห์/สังเคราะห์", "1.2 เปิดโอกาสให้ผู้เรียนระดมสมองและแลกเปลี่ยนความคิดเห็น", "1.3 ผู้เรียนได้วางแผนหรือออกแบบวิธีการทำงานด้วยตนเอง"] },
  { title: "2. การปฏิบัติจริง (Active Practice)", items: ["2.1 ผู้เรียนได้ลงมือทำ (Do) ชิ้นงาน/ภาระงานด้วยตนเอง", "2.2 สื่อ/อุปกรณ์ เอื้อให้ผู้เรียนทุกคนมีส่วนร่วมปฏิบัติ", "2.3 ครูทำหน้าที่เป็น Facilitator (โค้ช) ขณะปฏิบัติกิจกรรม"] },
  { title: "3. การประยุกต์ใช้ (Application)", items: ["3.1 ยกสถานการณ์จริง/ปัญหาในชีวิตประจำวันมาเป็นโจทย์", "3.2 มีช่วงเวลาให้สรุปแนวทางการนำความรู้ไปใช้จริง", "3.3 ชิ้นงานสุดท้ายสามารถนำไปแก้ปัญหาหรือใช้ประโยชน์ได้"] }
];

// --- SPA LANDING PAGE DATA & LOGIC ---
const levelLinks = {
  "1.1.2": { "m1": "dashboard", "m2": "dashboard", "m3": "dashboard", "m4": "dashboard", "m5": "dashboard", "m6": "dashboard" },
  "1.2.1": { "m1": "dashboard", "m2": "dashboard", "m3": "dashboard", "m4": "dashboard", "m5": "dashboard", "m6": "dashboard" },
  "1.2.2": { "m1": "dashboard", "m2": "dashboard", "m3": "dashboard", "m4": "dashboard", "m5": "dashboard", "m6": "dashboard" },
  "1.2.3": { "m1": "dashboard", "m2": "dashboard", "m3": "dashboard", "m4": "dashboard", "m5": "dashboard", "m6": "dashboard" },
  "1.2.4": { "m1": "dashboard", "m2": "dashboard", "m3": "dashboard", "m4": "dashboard", "m5": "dashboard", "m6": "dashboard" }
};

const standardsData = [
  {
    id: 1, title: "มาตรฐานที่ 1 ด้านคุณภาพผู้เรียน", subTitle: "1.1 ผลสัมฤทธิ์ทางวิชาการ",
    items: [
      { id: "1.1.1", text: "ความสามารถในการอ่าน เขียน สื่อสาร", img: "https://img5.pic.in.th/file/secure-sv1/551ffb37f69ea1028.png", link: "INTERNAL_LEVELS" },
      { id: "1.1.2", text: "การคิดวิเคราะห์ คิดอย่างมีวิจารณญาณ", img: "https://img5.pic.in.th/file/secure-sv1/65a5f6b02800138f8.png", link: "INTERNAL_LEVELS" },
      { id: "1.1.3", text: "ความสามารถในการสร้างนวัตกรรม", img: "https://img2.pic.in.th/pic/8d66af8ec01c69959.png", link: "INTERNAL_LEVELS" },
      { id: "1.1.4", text: "การใช้เทคโนโลยีสารสนเทศ", img: "https://img2.pic.in.th/pic/7bd7c29b829d74aca.png", link: "INTERNAL_LEVELS" },
      { id: "1.1.5", text: "ผลสัมฤทธิ์ทางการเรียน", img: "https://img5.pic.in.th/file/secure-sv1/95e4506daf48abb91.png", link: "dashboard" },
      { id: "1.1.6", text: "ความพร้อมในการศึกษาต่อ", img: "https://img2.pic.in.th/pic/10250a409f1f581446.png", link: "INTERNAL_LEVELS" }
    ]
  },
  {
    id: 1.2, title: "มาตรฐานที่ 1 (ต่อ)", subTitle: "1.2 คุณลักษณะที่พึงประสงค์",
    items: [
      { id: "1.2.1", text: "คุณลักษณะและค่านิยมที่ดี", img: "https://img5.pic.in.th/file/secure-sv1/468bf0ff1bb53de56.png", link: "INTERNAL_LEVELS" },
      { id: "1.2.2", text: "ความภูมิใจในท้องถิ่น", img: "https://img2.pic.in.th/pic/1ce604008b5954229.png", link: "INTERNAL_LEVELS" },
      { id: "1.2.3", text: "การยอมรับความแตกต่าง", img: "https://img2.pic.in.th/pic/349535e14fe1d68ea.png", link: "INTERNAL_LEVELS" },
      { id: "1.2.4", text: "สุขภาวะทางร่างกาย และจิตสังคม", img: "https://img5.pic.in.th/file/secure-sv1/22ec12221aa429ec5.png", link: "INTERNAL_LEVELS" }
    ]
  },
  {
    id: 2, title: "มาตรฐานที่ 2", subTitle: "กระบวนการบริหารและการจัดการ",
    items: [
      { id: "2.1", text: "เป้าหมายวิสัยทัศน์และพันธกิจ", img: "https://cdn-icons-png.flaticon.com/512/3233/3233497.png", link: "dashboard" },
      { id: "2.2", text: "ระบบบริหารจัดการคุณภาพ", img: "https://cdn-icons-png.flaticon.com/512/2620/2620677.png", link: "dashboard" },
      { id: "2.3", text: "งานวิชาการที่เน้นผู้เรียนรอบด้าน", img: "https://cdn-icons-png.flaticon.com/512/2038/2038022.png", link: "dashboard" },
      { id: "2.4", text: "พัฒนาครูและบุคลากร", img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", link: "dashboard" },
      { id: "2.5", text: "สภาพแวดล้อมและสังคม", img: "https://cdn-icons-png.flaticon.com/512/2829/2829824.png", link: "dashboard" },
      { id: "2.6", text: "ระบบเทคโนโลยีสารสนเทศ", img: "https://cdn-icons-png.flaticon.com/512/3067/3067253.png", link: "dashboard" }
    ]
  },
  {
    id: 3, title: "มาตรฐานที่ 3", subTitle: "การจัดการเรียนการสอนที่เน้นผู้เรียนเป็นสำคัญ",
    items: [
      { id: "3.1", text: "การจัดการเรียนรู้ผ่านกระบวนการคิด", img: "https://cdn-icons-png.flaticon.com/512/2436/2436636.png", link: "dashboard" },
      { id: "3.2", text: "การใช้สื่อเทคโนโลยีและแหล่งเรียนรู้", img: "https://cdn-icons-png.flaticon.com/512/2997/2997235.png", link: "dashboard" },
      { id: "3.3", text: "การบริหารจัดการชั้นเรียน", img: "https://cdn-icons-png.flaticon.com/512/3048/3048127.png", link: "dashboard" },
      { id: "3.4", text: "ตรวจสอบและประเมินผู้เรียนอย่างเป็นระบบ และนำผลมาพัฒนาผู้เรียน", img: "https://cdn-icons-png.flaticon.com/512/3048/3048127.png", link: "dashboard" },
      { id: "3.5", text: "มีการแลกเปลี่ยนเรียนรู้และให้ข้อมูลสะท้อนกลับ", img: "https://cdn-icons-png.flaticon.com/512/3048/3048127.png", link: "dashboard" }
    ]
  }
];

const levelsData = [
  { id: "m1", name: "ม.1", img: "https://cdn-icons-png.flaticon.com/512/3405/3405898.png" },
  { id: "m2", name: "ม.2", img: "https://cdn-icons-png.flaticon.com/512/3405/3405898.png" },
  { id: "m3", name: "ม.3", img: "https://cdn-icons-png.flaticon.com/512/3405/3405898.png" },
  { id: "m4", name: "ม.4", img: "https://cdn-icons-png.flaticon.com/512/3405/3405923.png" },
  { id: "m5", name: "ม.5", img: "https://cdn-icons-png.flaticon.com/512/3405/3405923.png" },
  { id: "m6", name: "ม.6", img: "https://cdn-icons-png.flaticon.com/512/3405/3405923.png" }
];

let pageStack = [];
let currentIndicatorID = null;

function showMainMenu() {
  pageStack = [];
  currentIndicatorID = null;
  updateUI(false);

  let html = '';
  standardsData.forEach(section => {
    let cards = '';
    if (section.items && section.items.length > 0) {
      section.items.forEach(item => {
        let isInternal = item.link === 'INTERNAL_LEVELS';
        let btnClass = isInternal ? 'js-internal-link' : 'js-action-btn';
        let btnText = isInternal ? 'เลือกข้อมูลระดับชั้น' : 'เปิดเอกสาร';
        let btnIcon = isInternal ? '<i class="fas fa-layer-group"></i>' : '<i class="fas fa-external-link-alt"></i>';

        cards += `
                <div class="box">
                    <div>
                        <img src="${item.img}" alt="${item.id}" loading="lazy">
                        <h3>${item.id}</h3>
                        <p>${item.text}</p>
                    </div>
                    <button class="btn ${btnClass}" data-link="${item.link}" data-id="${item.id}">
                        ${btnText} ${btnIcon}
                    </button>
                </div>
            `;
      });

      html += `
            <div class="standard-section">
                <div class="section-header">
                    <h2>${section.title}</h2>
                    ${section.subTitle ? `<h3>${section.subTitle}</h3>` : ''}
                </div>
                <div class="box-container">${cards}</div>
            </div>
        `;
    }
  });
  $('#content-area').html(html);
}

function showLevelsPage(indicatorID) {
  pageStack.push('levels');
  currentIndicatorID = indicatorID;
  updateUI(true, `มาตรฐาน ${indicatorID} > เลือกระดับชั้น`);

  const linksForThisItem = levelLinks[indicatorID] || {};

  let html = `
    <div class="standard-section">
        <div class="section-header"><h2>ข้อมูลระดับชั้น (มาตรฐาน ${indicatorID})</h2></div>
        <div class="box-container">
            ${levelsData.map(level => {
    let targetLink = linksForThisItem[level.id] || '#';
    return `
                <div class="box">
                    <div>
                        <img src="${level.img}" alt="${level.name}">
                        <h3>${level.name}</h3>
                        <p>กดเพื่อเปิดข้อมูล ${level.name}</p>
                    </div>
                    <button class="btn js-action-btn" data-link="${targetLink}" data-id="${level.name}">
                        เปิดข้อมูล ${level.name} <i class="fas fa-folder-open"></i>
                    </button>
                </div>
                `;
  }).join('')}
        </div>
    </div>
    `;
  $('#content-area').html(html);
  window.scrollTo(0, 0);
}

function updateUI(isSubPage, text = "") {
  if (isSubPage) {
    $('#page-nav-bar').show();
    $('.nav-title').text('RS.L Active Learning');
    $('.nav-subtitle').text('ระบบนิเทศและประเมินการสอน');
  } else {
    $('#page-nav-bar').hide();
    $('.nav-title').text('Internal Quality Assurance');
    $('.nav-subtitle').text('ระบบการประกันคุณภาพภายในสถานศึกษา');
  }
  $('#breadcrumb').text(text);
}

function switchPage(targetPage) {
  $('.menu-link').removeClass('active');
  $('.menu-link[data-page="' + targetPage + '"]').addClass('active');
  $('.page-section').hide();
  $('#page-' + targetPage).fadeIn(300);

  let offcanvasEl = document.getElementById('mainMenu');
  if (offcanvasEl) {
    let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
    if (offcanvas) offcanvas.hide();
  }

  if (targetPage === 'library') {
    window.scrollTo(0, 0);
    loadLibraryData();
  } else if (targetPage === 'home') {
    window.scrollTo(0, 0);
    showMainMenu();
  } else {
    window.scrollTo(0, 0);
    updateUI(true, 'ระบบประเมิน');
  }
}

// Custom Modal Helpers
function showLoading(text) {
  $('#loadingOverlayText').text(text || 'กำลังโหลด...');
  $('#loadingOverlay').css('display', 'flex');
}
function hideLoading() {
  $('#loadingOverlay').hide();
}
function showAlert(title, text, type) {
  let icon = 'info', color = '#1a365d';
  if (type === 'error') { icon = 'error_outline'; color = '#dc2626'; }
  if (type === 'success') { icon = 'check_circle'; color = '#047857'; }
  if (type === 'warning') { icon = 'warning'; color = '#d97706'; }
  $('#alertModalIcon').text(icon).css('color', color);
  $('#alertModalTitle').text(title);
  $('#alertModalText').text(text);
  new bootstrap.Modal(document.getElementById('customAlertModal')).show();
}
function showConfirm(title, text, confirmCallback) {
  $('#confirmModalTitle').text(title);
  $('#confirmModalText').text(text);
  let myModal = new bootstrap.Modal(document.getElementById('customConfirmModal'));
  $('#btnConfirmOk').off('click').on('click', function () {
    myModal.hide();
    confirmCallback();
  });
  myModal.show();
}

$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('room')) {
    currentSelectedRoom = urlParams.get('room');
  }

  // Initialize Home
  showMainMenu();

  renderQuestions();
  loadAllData();

  // Sidebar Menu Navigation Logic
  $('.menu-link').on('click', function (e) {
    e.preventDefault();
    let targetPage = $(this).data('page');
    switchPage(targetPage);
  });

  // Home Landing Page Clicks
  $(document).on('click', '.js-back-btn', function () {
    pageStack.pop();
    showMainMenu();
  });

  $(document).on('click', '.js-internal-link', function () {
    let id = $(this).data('id');
    showLevelsPage(id);
  });

  $(document).on('click', '.js-action-btn', function () {
    let link = $(this).data('link');
    if (!link || link === '#' || link === '' || link === 'undefined') {
      showAlert('ไม่พบลิงก์ข้อมูล', 'ยังไม่ได้ใส่ลิงก์สำหรับข้อมูลนี้', 'warning');
      return;
    }

    // Check if it's an internal SPA link like 'dashboard' or '/dashboard.html'
    if (link === 'dashboard' || link === '/dashboard.html' || link.startsWith('/')) {
      switchPage('dashboard');
    } else {
      // External link
      const isLine = /Line/i.test(navigator.userAgent);
      showLoading('กำลังเปิดลิงก์...');
      setTimeout(() => {
        hideLoading();
        if (isLine) {
          let target = link.includes('?') ? link + '&openExternalBrowser=1' : link + '?openExternalBrowser=1';
          window.location.href = target;
        } else {
          window.open(link, '_blank');
        }
      }, 500);
    }
  });

  $('#navRepoLink').on('click', function () {
    loadLibraryData();
  });

  // Assess Modal Logic
  $(document).on('click', '.btn-open-modal', function () {
    let btn = $(this);
    $('#modalStdId').val(btn.data('id'));
    $('#modalStdName').val(btn.data('name'));
    $('#modalStdRoom').val(btn.data('room'));
    $('#modalStdNo').val(btn.data('no'));

    $('#displayStdName').text(btn.data('name'));
    $('#displayStdRoom').text(btn.data('room'));
    $('#displayStdNo').text(btn.data('no'));

    $('#assessForm')[0].reset();
    $('.upload-card').removeClass('active');
    $('.progress-wrapper').hide();
    $('.custom-progress-bar').css('width', '0%');
    $('.status-icon').text('chevron_right');
    $('#file66').val(''); $('#file67').val('');

    new bootstrap.Modal(document.getElementById('assessModal')).show();
  });

  // Delete Logic
  $(document).on('click', '.btn-delete', function () {
    let idToDelete = $(this).data('id');
    let nameShow = $(this).closest('tr').find('td:nth-child(2)').text();

    showConfirm('ยืนยันการลบ?', `คุณต้องการลบผลการประเมินของ: ${nameShow}`, async () => {
      showLoading('กำลังลบข้อมูล...');
      try {
        const resp = await fetch('/api/assessments/' + idToDelete, { method: 'DELETE' });
        const result = await resp.json();
        if (result.success) {
          await loadAllData(true);
          hideLoading();
          showAlert('ลบสำเร็จ', 'ข้อมูลถูกลบเรียบร้อยแล้ว', 'success');
        } else {
          hideLoading();
          showAlert('ข้อผิดพลาด', result.error, 'error');
        }
      } catch (err) {
        hideLoading();
        showAlert('ข้อผิดพลาด', err.toString(), 'error');
      }
    });
  });

  $('#roomButtonContainer').on('click', '.room-btn', function () {
    $('#roomButtonContainer .room-btn').removeClass('active'); $(this).addClass('active');
    currentSelectedRoom = $(this).data('room');
    filterTables(currentSelectedRoom);
  });

  $('#libRoomContainer').on('click', '.room-btn', function () {
    $('#libRoomContainer .room-btn').removeClass('active'); $(this).addClass('active');
    currentLibRoom = $(this).data('room');
    filterLibrary();
  });

  $('#libSearch').on('keyup', function () {
    filterLibrary();
  });

  $('#btn-upload-66').on('click', () => $('#file66').click());
  $('#btn-upload-67').on('click', () => $('#file67').click());

  $('#file66').on('change', function () { handleFileSelect(this, '66'); });
  $('#file67').on('change', function () { handleFileSelect(this, '67'); });

  $('#assessForm').on('submit', submitAssessment);

  $('#generateAIBtn').on('click', generateAIReport);
});

// --- MAIN DATA LOADING ---
async function loadAllData(restoreFilter = false) {
  if (!document.getElementById('customAlertModal').classList.contains('show')) showLoading('โปรดรอสักครู่...');

  try {
    const [resData, resAdd, resPie, resBar] = await Promise.all([
      fetch('/api/teachers').then(r => r.json()),
      fetch('/api/assessments').then(r => r.json()),
      fetch('/api/dashboard/pie').then(r => r.json()),
      fetch('/api/dashboard/bar').then(r => r.json())
    ]);

    mainData = resData || [];
    doneData = resAdd || [];
    let doneSet = new Set(doneData.map(r => String(r[0]).trim()));
    notEvalData = mainData.filter(r => !doneSet.has(String(r[0]).trim()));

    updateCards();
    renderTables(doneSet);
    initRoomButtons();
    renderCharts(resPie, resBar);

    if (currentSelectedRoom) filterTables(currentSelectedRoom);
    if (!restoreFilter) hideLoading();
  } catch (error) {
    hideLoading();
    showAlert('เกิดข้อผิดพลาด', 'ไม่สามารถเชื่อมต่อฐานข้อมูลได้', 'error');
  }
}

// --- LIBRARY FUNCTIONS ---
async function loadLibraryData() {
  if (libraryData.length > 0) return;

  $('#lib-loading').show();
  $('#repo-grid-container').empty();
  $('#lib-empty').hide();

  try {
    const resp = await fetch('/api/repository');
    libraryData = await resp.json();
    $('#lib-loading').hide();
    initLibRoomButtons();
    renderLibrary(libraryData);
  } catch (err) {
    $('#lib-loading').hide();
    showAlert('ข้อผิดพลาด', 'ไม่สามารถโหลดข้อมูลคลังผลงานได้', 'error');
  }
}

function initLibRoomButtons() {
  let container = $('#libRoomContainer');
  container.empty();
  container.append(`<button class="btn room-btn active shadow-sm" data-room="">ทั้งหมด</button>`);

  let rooms = [...new Set(libraryData.map(r => r.room))].filter(r => r).sort();
  rooms.forEach(r => {
    container.append(`<button class="btn room-btn shadow-sm" data-room="${r}">${r}</button>`);
  });
}

function renderLibrary(data) {
  let container = $('#repo-grid-container');
  container.empty();

  if (data.length === 0) {
    $('#lib-empty').show();
    return;
  } else {
    $('#lib-empty').hide();
  }

  data.forEach(item => {
    let link66Btn = item.link66 ? `<a href="${item.link66}" target="_blank" class="btn-file-link shadow-sm"><span><i class="material-icons-round fs-6 align-middle text-primary me-2">description</i>ปี 2568/1</span><i class="material-icons-round fs-6 text-muted">open_in_new</i></a>` : `<span class="btn-file-link disabled shadow-sm"><span><i class="material-icons-round fs-6 align-middle text-muted me-2">description</i>ปี 2568/1</span><small>(ไม่มีไฟล์)</small></span>`;

    let link67Btn = item.link67 ? `<a href="${item.link67}" target="_blank" class="btn-file-link shadow-sm"><span><i class="material-icons-round fs-6 align-middle text-success me-2">description</i>ปี 2568/2</span><i class="material-icons-round fs-6 text-muted">open_in_new</i></a>` : `<span class="btn-file-link disabled shadow-sm"><span><i class="material-icons-round fs-6 align-middle text-muted me-2">description</i>ปี 2568/2</span><small>(ไม่มีไฟล์)</small></span>`;

    let html = `
        <div class="repo-card shadow-sm">
            <span class="repo-badge shadow-sm">${item.room}</span>
            <div class="repo-header">
                <h5 class="fw-bold mb-1 text-primary text-truncate">${item.name}</h5>
                <small class="text-muted fw-bold"><i class="material-icons-round fs-6 align-middle text-secondary">event</i> ${new Date(item.timestamp).toLocaleDateString('th-TH')}</small>
            </div>
            <div class="repo-body">
                ${link66Btn}
                ${link67Btn}
            </div>
        </div>`;
    container.append(html);
  });
}

function filterLibrary() {
  let search = $('#libSearch').val().toLowerCase();
  let room = currentLibRoom;

  let filtered = libraryData.filter(item => {
    let matchRoom = room === "" || item.room === room;
    let matchName = item.name.toLowerCase().includes(search);
    return matchRoom && matchName;
  });
  renderLibrary(filtered);
}

// -------------------------------
function renderQuestions() {
  let html = ''; let qIndex = 1;
  assessmentCriteria.forEach(cat => {
    html += `<h5 class="fw-bold text-primary mt-3 mb-3 border-bottom pb-2" style="font-size:1.05rem;">${cat.title}</h5>`;
    cat.items.forEach(item => {
      let qName = "q" + qIndex;
      html += `
              <div class="mb-5 pb-3 border-bottom border-light">
                <label class="d-block mb-3 text-dark fw-bold fs-6">${item} <span class="text-danger">*</span></label>
                <div class="likert-container">
                  ${[5, 4, 3, 2, 1].map(s => `
                    <div class="likert-option">
                      <input type="radio" id="${qName}_${s}" name="${qName}" value="${s}" class="likert-input" required>
                      <label for="${qName}_${s}" class="likert-label">
                        ${s}<span class="rating-desc">${['น้อยที่สุด', 'น้อย', 'ปานกลาง', 'มาก', 'มากที่สุด'][s - 1]}</span>
                      </label>
                    </div>`).join('')}
                </div>
              </div>`;
      qIndex++;
    });
  });
  $('#questions-container').html(html);
}

function handleFileSelect(input, yearId) {
  if (input.files && input.files[0]) {
    let file = input.files[0];
    if (file.size > 5 * 1024 * 1024) { showAlert('ขนาดไฟล์เกิน', 'กรุณาอัปโหลดไม่เกิน 5MB', 'warning'); input.value = ''; return; }
    let card = $(input).closest('.upload-card'); card.addClass('active');
    $(`#progress-wrap-${yearId}`).fadeIn(); $(`#filename-${yearId}`).text(file.name);
    $(`#icon-status-${yearId}`).text('check_circle');
    let bar = $(`#bar-${yearId}`); bar.css('width', '0%'); setTimeout(() => { bar.css('width', '100%'); }, 500);
  }
}

async function submitAssessment(e) {
  e.preventDefault();
  const fileInput66 = document.getElementById('file66');
  const fileInput67 = document.getElementById('file67');

  if (!fileInput66.files[0] || !fileInput67.files[0]) {
    showAlert('กรุณาแนบไฟล์ให้ครบ', 'จำเป็นต้องอัปโหลดหลักฐานทั้งปี 2566 และ 2567', 'error');
    return;
  }

  showLoading('โปรดอย่าปิดหน้าจอนี้...');

  const formData = new FormData();
  formData.append('stdId', $('#modalStdId').val());
  formData.append('stdName', $('#modalStdName').val());
  formData.append('stdRoom', $('#modalStdRoom').val());
  formData.append('stdNo', $('#modalStdNo').val());
  formData.append('comment', $('textarea[name="comment"]').val());

  for (let i = 1; i <= 9; i++) {
    formData.append('q' + i, $(`input[name="q${i}"]:checked`).val());
  }

  formData.append('file66', fileInput66.files[0]);
  formData.append('file67', fileInput67.files[0]);

  try {
    const resp = await fetch('/api/assessments', {
      method: 'POST',
      body: formData
    });
    const result = await resp.json();

    if (result.success) {
      await loadAllData(true);
      hideLoading();
      showAlert('บันทึกเรียบร้อย', 'ข้อมูลของท่านถูกจัดเก็บเข้าระบบแล้ว', 'success');
      $('#assessModal').modal('hide');
    } else {
      hideLoading();
      showAlert('เกิดข้อผิดพลาด', result.error || 'Server Error', 'error');
    }
  } catch (err) {
    hideLoading();
    showAlert('ข้อผิดพลาดการเชื่อมต่อ', err.toString(), 'error');
  }
}

async function generateAIReport() {
  $('#ai-result').hide(); $('#ai-loader').fadeIn();
  try {
    const resp = await fetch('/api/ai/analysis', { method: 'POST' });
    const resText = await resp.text();
    $('#ai-loader').hide();
    let html = resText.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>').replace(/- /g, '• ');
    $('#ai-result').html(html).fadeIn();
  } catch (error) {
    $('#ai-loader').hide();
    showAlert('ข้อผิดพลาด', 'ไม่สามารถเชื่อมต่อ AI ได้', 'error');
  }
}

function renderTables(doneSet) {
  const dtOption = { destroy: true, responsive: true, paging: true, pageLength: 20, lengthChange: false, language: { url: "//cdn.datatables.net/plug-ins/1.10.24/i18n/Thai.json" }, dom: 'rtip' };
  const cols = (type) => [
    { title: "ลำดับ", className: "align-middle", render: (d, t, r) => `<span class="fw-bold text-muted">${r[0]}</span>` },
    { title: "ชื่อ-สกุล", className: "align-middle", render: (d, t, r) => type === 'done' ? `<span class="fw-bold text-primary">${r[1]}</span>` : `<span class="fw-bold text-primary">${r[1]}${r[2]} ${r[3]}</span>` },
    { title: "กลุ่มสาระ", className: "align-middle", render: (d, t, r) => `<span class="badge bg-light text-primary border border-primary rounded-pill px-3 shadow-sm py-2">${type === 'done' ? (r[2] || '-') : (r[4] || '-')}</span>` },
    { title: "ตำแหน่ง", className: "align-middle", render: (d, t, r) => type === 'done' ? (r[3] ? `<span class="fw-bold text-secondary">${r[3]}</span>` : '-') : (r[5] ? `<span class="fw-bold text-secondary">${r[5]}</span>` : '-') },
    {
      title: "จัดการ", className: "text-center align-middle", render: (d, t, r) => {
        if (type === 'done') return `<button class="btn btn-sm btn-outline-danger btn-delete shadow-sm rounded-circle p-2" data-id="${r[0]}"><i class="material-icons-round fs-5">delete</i></button>`;
        if (doneSet.has(String(r[0]).trim())) return `<span class="badge bg-success rounded-pill shadow-sm px-3 py-2 fw-bold"><i class="material-icons-round align-middle me-1" style="font-size:16px">check_circle</i> สำเร็จ</span>`;
        let cleanName = (r[1] + r[2] + ' ' + r[3]).replace(/'/g, "");
        return `<button class="btn btn-action-orange btn-sm px-4 py-2 fw-bold shadow-sm btn-open-modal" data-id="${r[0]}" data-name="${cleanName}" data-room="${r[4]}" data-no="${r[5]}">ประเมิน</button>`;
      }
    }
  ];
  table1 = $('#tableAll').DataTable({ ...dtOption, data: mainData, columns: cols('all') });
  table2 = $('#tableNotEval').DataTable({ ...dtOption, data: notEvalData, columns: cols('not') });
  table3 = $('#tableDone').DataTable({ ...dtOption, data: doneData, columns: cols('done') });
}

function initRoomButtons() {
  let container = $('#roomButtonContainer'); container.empty();
  let allActive = (currentSelectedRoom === "") ? "active" : "";
  container.append(`<button class="btn room-btn shadow-sm ${allActive}" data-room="">ทั้งหมด</button>`);
  let rooms = [...new Set(mainData.map(r => r[4]))].filter(r => r).sort();
  rooms.forEach(r => { let isActive = (String(r) === String(currentSelectedRoom)) ? "active" : ""; container.append(`<button class="btn room-btn shadow-sm ${isActive}" data-room="${r}">${r}</button>`); });
}

function updateCards() {
  let total = mainData.length; let done = doneData.length;
  $('#kpi-total').text(total); $('#kpi-done').text(done); $('#kpi-pending').text(total - done);
  $('#kpi-percent').text(total > 0 ? ((done / total) * 100).toFixed(0) + '%' : '0%');
}

function renderCharts(pieD, barD) {
  if (window.cPie) window.cPie.destroy(); if (window.cBar) window.cBar.destroy();
  window.cPie = new Chart(document.getElementById('myPieChart'), {
    type: 'doughnut',
    data: { labels: ['เสร็จ', 'ค้าง'], datasets: [{ data: [pieD[0][1], pieD[0][2]], backgroundColor: ['#10b981', '#e2e8f0'], hoverOffset: 4, borderWidth: 0 }] },
    options: { maintainAspectRatio: false, cutout: '75%', plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20, font: { family: 'Prompt', size: 14 } } }, datalabels: { color: '#1e293b', font: { family: 'Prompt', weight: 'bold', size: 16 }, formatter: (v, c) => { let sum = c.chart.data.datasets[0].data.reduce((a, b) => a + b, 0); return sum > 0 ? ((v / sum) * 100).toFixed(0) + '%' : ''; } } } },
    plugins: [ChartDataLabels]
  });
  window.cBar = new Chart(document.getElementById('myBarChart'), {
    type: 'bar',
    data: { labels: barD.map(r => r[0]), datasets: [{ label: 'เสร็จ', data: barD.map(r => r[3]), backgroundColor: '#3b82f6', borderRadius: 6 }, { label: 'ค้าง', data: barD.map(r => r[4]), backgroundColor: '#c5a880', borderRadius: 6 }] },
    options: { maintainAspectRatio: false, scales: { x: { grid: { display: false }, ticks: { font: { family: 'Prompt' } } }, y: { beginAtZero: true, grid: { borderDash: [5, 5] }, ticks: { font: { family: 'Prompt' } } } }, plugins: { legend: { labels: { usePointStyle: true, font: { family: 'Prompt' } } } } }
  });
}

function filterTables(room) {
  let search = room ? `^${room}$` : '';
  [table1, table2, table3].forEach(t => t.column(2).search(search, true, false).draw());
}

// Chat functions
const CHAT_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxSIdVUxOtEG4XC3uaX7Mrrx-t3nl560eD9jWE5e9PTI8vF906xvaaj2mA3SD1n4FCM/exec";
let isChatLoaded = false;
window.toggleChat = function () {
  const chatContainer = document.getElementById('chatContainer');
  const chatBtn = document.getElementById('chatBtn');
  const chatIcon = document.getElementById('chatIcon');
  const chatIframe = document.getElementById('chatIframe');
  const chatLoading = document.getElementById('chat-loading');

  if (chatContainer.style.display === 'flex') {
    chatContainer.style.display = 'none';
    chatBtn.classList.remove('active');
    chatIcon.className = 'fas fa-comment-dots';
  } else {
    chatContainer.style.display = 'flex';
    chatBtn.classList.add('active');
    chatIcon.className = 'fas fa-times';

    if (!isChatLoaded) {
      chatIframe.src = CHAT_WEB_APP_URL;
      chatIframe.onload = () => {
        chatLoading.style.display = 'none';
      };
      isChatLoaded = true;
    }
  }
}
