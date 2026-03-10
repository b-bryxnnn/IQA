// ============================================================
// 1. CHAT SYSTEM CONFIGURATION
// ============================================================
const CHAT_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxSIdVUxOtEG4XC3uaX7Mrrx-t3nl560eD9jWE5e9PTI8vF906xvaaj2mA3SD1n4FCM/exec";

const chatContainer = document.getElementById('chatContainer');
const chatBtn = document.getElementById('chatBtn');
const chatIcon = document.getElementById('chatIcon');
const chatIframe = document.getElementById('chatIframe');
const chatLoading = document.getElementById('chat-loading');
const chatCloseBtn = document.getElementById('chatCloseBtn');

let isChatLoaded = false;

function toggleChat() {
    if (chatContainer.style.display === 'flex') {
        closeChat();
    } else {
        openChat();
    }
}

function openChat() {
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

function closeChat() {
    chatContainer.style.display = 'none';
    chatBtn.classList.remove('active');
    chatIcon.className = 'fas fa-comment-dots';
}

chatBtn.addEventListener('click', toggleChat);
if (chatCloseBtn) chatCloseBtn.addEventListener('click', closeChat);

// ============================================================
// 2. CONFIG: ลิงก์ของแต่ละระดับชั้น (LINK DATABASE)
// ============================================================
const levelLinks = {
    // ใส่ลิงก์จริงของแต่ละห้อง/ระดับชั้นตรงนี้
     "1.1.2": {
        "m1": "https://script.google.com/macros/s/AKfycbw0ji6dGNResfHsg1dsmHxAL5W2-GAPSR7iUF4a6XgUIKYEJG_VLoHe5lhJF_gfLwtB/exec",
        "m2": "https://script.google.com/macros/s/AKfycbxozdUHFy1IDaAmuLRHazixWJZjM28hseRX8TxJ5IPIzj7TIy0fTTkQWsVI7hwrj5pD/exec",
        "m3": "https://script.google.com/macros/s/AKfycbxYp6y9wm lJq16uxXS9vyRJCW8gZqnsXu6JgI8L2v--TBzEm5xifg_4QPyRwIOC5AkmXw/exec",
        "m4": "https://script.google.com/macros/s/AKfycbwOSZ6wXtZJyVscLmct8aMnO6PEv4grhgyxpQWy06k8fM78Tjp9UhKOAy_iM-1pgYB3/exec",
        "m5": "https://script.google.com/macros/s/AKfycbxnkTfyeVfA5zlj9SKDTCy3nTrEMkbrApXxV5UrUgEhqpYP0MqHyhRcvMTSDj-fQpLj/exec",
        "m6": "https://script.google.com/macros/s/AKfycbyH0PRDVShPtB6e3bOg4CYGHV-yDAlEY6_h6Ndkc63psh-Yv17gR_tUZ3AjaNe7EWSH/exec"
    },
    "1.2.1": {
        "m1": "https://script.google.com/macros/s/AKfycbwQoaVPW7NXsn4DmOKWLxRDBO-a_v9VJnc_B5YdzjQk_q_ueH6SdNcGjdOfzQoc32-A/exec",
        "m2": "https://script.google.com/macros/s/AKfycbxtguW5m-VIFvkTi8neYLTS-zTWhtkvsY5izQ8dT0pPDzBpKUET3WMjVvgTRq2si_V3Rw/exec",
        "m3": "https://script.google.com/macros/s/AKfycbyRvN76bY_9gSBgsI_3PSXPXqNc1VgnP7rLBB5_xTaRbYa8OBib2qzOjLBIozZ2oJ__ig/exec",
        "m4": "https://script.google.com/macros/s/AKfycby5yVkNCKhcyuU360Q3cycLShObMLIg6V-z-IsOGRJNgzGFafBLfs_UG44NJvZY9Dc/exec",
        "m5": "https://script.google.com/macros/s/AKfycbyDqyMV8KXTtAYwi49dVi70Z5a6ETAeMZj1iI0vK7fxpWd0qVHV65D8uQhlcW_fcsr2QA/exec",
        "m6": "https://script.google.com/macros/s/AKfycbznAcPHQ3XSMP3ymM0oPGd6_axBAgT9WJwFHi-gJN9A-GYYdjYolDfdmU8JW0jguBw2/exec"
    },
    "1.2.2": {
        "m1": "https://script.google.com/macros/s/AKfycbxDXvr7VkayqFU_WKBo-xmLSPH1Ya7_4YIpR8YJ9oIUa1pwGfqxA3KMuArP6-IXf3Ls/exec",
        "m2": "https://script.google.com/macros/s/AKfycbxnF2bUs8KK4AKNorAgVwC_WIjJfRxzB3qO6yZWX1Ij4Btn8u3O1RP6Y5fmwITtptsvmQ/exec",
        "m3": "https://script.google.com/macros/s/AKfycbw-mvAuM2XwOOFbhp87pBxOxDhm2qAR3wNn8HWwM4i0cWAXyQFWVze15BDzoZxTP6P7/exec",
        "m4": "https://script.google.com/macros/s/AKfycbzwVn4xungzPJ0OT4vvR_5hrXc--x2fdbuqqaD5BdzpTgNjcQ--3tuoqnKgfXzJpbIy/exec",
        "m5": "https://script.google.com/macros/s/AKfycbwH8m1rVB8_NzLjogm2d7-xLcxWlS728KBWfKIJDpRBThzAJtNqLTvX6-R7jlAm3nu7/exec",
        "m6": "https://script.google.com/macros/s/AKfycbyBIWKuUosCEkjQnSJuZu5FpeobL4Qcpog2CUKpFsROPxxHJR9fa0nZZ5yKqc9PXowe/exec"
    },
    "1.2.3": {
        "m1": "https://script.google.com/macros/s/AKfycbynmJVPtF5ql9sEUH-JjcthD7f9BGir_OVRcBDh0a7ODBjhh-jHoYwWBo6QOZ-VXGsc/exec",
        "m2": "https://script.google.com/macros/s/AKfycbzcPtLQmrmkNph5AqQc2WQCGVgbXR3-YJkh-ff67sH6Y3rINdU93ZsWlCtWV8-I8ef2jw/exec",
        "m3": "https://script.google.com/macros/s/AKfycbysb67wb6GsKguYzCrooIMBA5gVgusc6zuMqL_dGc2ksGydmj39zFIDbPAxmUpEyIph/exec",
        "m4": "https://script.google.com/macros/s/AKfycbwABRA0bbG6irnr-MXm2i6Sm4kWpXoKQVtFhW0qfVvmDeTDqbEw40JWy9f4jB_BunLw/exec",
        "m5": "https://script.google.com/macros/s/AKfycbzpn7Fawz2o-I0QgJ3LsPWDVZgoRKldSrcbsGONGJCC84f93UokH4zRm2YIordj7hQ0/exec",
        "m6": "https://script.google.com/macros/s/AKfycbyS4afylyOrvNHMWa1OBYKCpoZqP0CxoZ4KmgKbvaqzRIIiKUAfKOYflYJQwbOekqRM/exec"
    },
    "1.2.4": {
        "m1": "/dashboard.html",
        "m2": "/dashboard.html",
        "m3": "https://script.google.com/macros/s/AKfycbzmO56_4FYI23MbOk1Ynt3Vp54o8vvfMJHkQV1OVOBaNdgoi5832MAhVB8O3jm7y94Hyg/exec",
        "m4": "https://script.google.com/macros/s/AKfycbw76VNaXOXGbZXCaBrXaWUdMD0u8TgALlB3VibtealtUYv_ST-i6icqITxBgjIjSmTZ/exec",
        "m5": "https://script.google.com/macros/s/AKfycby13nRJ04NJoGJ8VmJHoYBJrtkeOBk2Qu7Fkq9vXFmG0OR2-deAD4gZjk9_xK2NwthQCQ/exec",
        "m6": "https://script.google.com/macros/s/AKfycbxZkhKAUAMZEsQM5lAdnnNhINGb6eZ4xLQaY0hZDUW-jWo8zMLvz-Fo6EBbbCyu2zr0/exec"
    }
};

// ============================================================
// 3. CONFIG: ข้อมูลมาตรฐาน (MAIN DATA)
// ============================================================
const standardsData = [
    {
        id: 1, title: "มาตรฐานที่ 1 ด้านคุณภาพผู้เรียน", subTitle: "1.1 ผลสัมฤทธิ์ทางวิชาการ",
        items: [
            { id: "1.1.1", text: "ความสามารถในการอ่าน เขียน สื่อสาร", img: "https://img5.pic.in.th/file/secure-sv1/551ffb37f69ea1028.png", link: "INTERNAL_LEVELS" },
            { id: "1.1.2", text: "การคิดวิเคราะห์ คิดอย่างมีวิจารณญาณ", img: "https://img5.pic.in.th/file/secure-sv1/65a5f6b02800138f8.png", link: "INTERNAL_LEVELS" },
            { id: "1.1.3", text: "ความสามารถในการสร้างนวัตกรรม", img: "https://img2.pic.in.th/pic/8d66af8ec01c69959.png", link: "INTERNAL_LEVELS" },
            { id: "1.1.4", text: "การใช้เทคโนโลยีสารสนเทศ", img: "https://img2.pic.in.th/pic/7bd7c29b829d74aca.png", link: "INTERNAL_LEVELS" },
            { id: "1.1.5", text: "ผลสัมฤทธิ์ทางการเรียน", img: "https://img5.pic.in.th/file/secure-sv1/95e4506daf48abb91.png", link: "https://script.google.com/macros/s/AKfycbyqKkoCV_BFOdnrsZJnybtQ8Qoc2041dQaAxB7OLMbfWpQ-vfwMeEzA8c0tTjR0NcC9/exec" },
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
            { id: "2.1", text: "เป้าหมายวิสัยทัศน์และพันธกิจ", img: "https://cdn-icons-png.flaticon.com/512/3233/3233497.png", link: "https://script.google.com/macros/s/AKfycbytm3cd54gXqY57U_xNixLhHftYoN0ClVN-6e7XE7oYk9-Z0_gWLjmHb0Zx2eH-hPva/exec" },
            { id: "2.2", text: "ระบบบริหารจัดการคุณภาพ", img: "https://cdn-icons-png.flaticon.com/512/2620/2620677.png", link: "https://script.google.com/macros/s/AKfycbxBqglUl0RIxFhjg2ynQRH6ecWMoEptc1fjCnAehgVBkBDIs23Kb9B-SFlZW3-RnFsI/exec" },
            { id: "2.3", text: "งานวิชาการที่เน้นผู้เรียนรอบด้าน", img: "https://cdn-icons-png.flaticon.com/512/2038/2038022.png", link: "https://script.google.com/macros/s/AKfycbz20PLqyfmp_kT7fsEka8Aaw0663w6_yBkOpGJW7SLGcC4YJFHiO8z0-PZUorQ9Ojhz/exec" },
            { id: "2.4", text: "พัฒนาครูและบุคลากร", img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", link: "https://script.google.com/macros/s/AKfycbyvCYh720jzMSzjQZaBGPMDLVYSiE7nEw11J8WPZwubJvzfV6rNAQ7q8KgWgGwSjkOx/exec" },
            { id: "2.5", text: "สภาพแวดล้อมและสังคม", img: "https://cdn-icons-png.flaticon.com/512/2829/2829824.png", link: "https://script.google.com/macros/s/AKfycbxLqCdcAk80eqITmnF7sT3lq5rHyRZzIGejnPw7Rso6_TiQPPrl2q4BMpHsAeSyHI5e3Q/exec" },
            { id: "2.6", text: "ระบบเทคโนโลยีสารสนเทศ", img: "https://cdn-icons-png.flaticon.com/512/3067/3067253.png", link: "https://script.google.com/macros/s/AKfycbyW9pt1ZydCP8S-PuFikTkrNs9O54wuvYbTgOiNkTcXsDt9eUnzCyc9OGTOTFf2AVt4MQ/exec" }
        ]
    },
    {
        id: 3, title: "มาตรฐานที่ 3", subTitle: "การจัดการเรียนการสอนที่เน้นผู้เรียนเป็นสำคัญ",
        items: [
            { id: "3.1", text: "การจัดการเรียนรู้ผ่านกระบวนการคิด", img: "https://cdn-icons-png.flaticon.com/512/2436/2436636.png", link: "https://script.google.com/macros/s/AKfycbz-6MYSztPLqHxi-fV0IsCrm-3T9VVq0OA-Cz6gnluUtsKvN8YQtP_IWw_34DkPgdw/exec" },
            { id: "3.2", text: "การใช้สื่อเทคโนโลยีและแหล่งเรียนรู้", img: "https://cdn-icons-png.flaticon.com/512/2997/2997235.png", link: "https://script.google.com/macros/s/AKfycbxWkn4HR6TkxxDiEqqs1pq8Fy05RaTE2QwN9u624xD2vwoavXSFHkmZHIHmHFMpi-ENuQ/exec" },
            { id: "3.3", text: "การบริหารจัดการชั้นเรียน", img: "https://cdn-icons-png.flaticon.com/512/3048/3048127.png", link: "https://script.google.com/macros/s/AKfycbwMGKkkRcjve-vyBtK2lVOfxRuWyqStj6Gv8FYhzQj_OVvBaoyaXFX0Xbr4fderynOKHQ/exec" },
            { id: "3.4", text: "ตรวจสอบและประเมินผู้เรียนอย่างเป็นระบบ และนำผลมาพัฒนาผู้เรียน", img: "https://cdn-icons-png.flaticon.com/512/3048/3048127.png", link: "https://script.google.com/macros/s/AKfycbwMPTkFXe_kP48MPNeHBPLpDl4lYAfNGHhnf6jpKtuenCzP1iQH_3ZA8WuEbVQzfYX6iQ/exec" }
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

// ============================================================
// 4. LOGIC: การทำงานของระบบ
// ============================================================
const contentArea = document.getElementById('content-area');
const navBar = document.getElementById('nav-bar');
const breadcrumb = document.getElementById('breadcrumb');
const mainHeader = document.getElementById('main-header');

let pageStack = [];
let currentIndicatorID = null;

document.addEventListener('DOMContentLoaded', () => {
    // Show a small skeleton loading first for premium feel
    setTimeout(() => { showMainMenu(); }, 600);
});

function showMainMenu() {
    pageStack = [];
    currentIndicatorID = null;
    updateUI(false);
    
    let html = '';
    standardsData.forEach((section, index) => {
        let cards = '';
        if(section.items && section.items.length > 0) {
            section.items.forEach(item => {
                let isInternal = item.link === 'INTERNAL_LEVELS';
                let btnClass = isInternal ? 'js-internal-link' : 'js-action-btn';
                let btnText = isInternal ? 'เลือกระดับชั้น' : 'เปิดดูข้อมูล';
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
    contentArea.innerHTML = html;
}

function showLevelsPage(indicatorID) {
    pageStack.push('levels');
    currentIndicatorID = indicatorID;
    updateUI(true, `มาตรฐาน ${indicatorID} > เลือกระดับชั้น`);

    const linksForThisItem = levelLinks[indicatorID] || {};

    let html = `
        <div class="standard-section">
            <div class="section-header">
                <h2>ข้อมูลระดับชั้น</h2>
                <h3>มาตรฐาน ${indicatorID}</h3>
            </div>
            <div class="box-container">
                ${levelsData.map(level => {
                    let targetLink = linksForThisItem[level.id] || '#'; 
                    return `
                    <div class="box">
                        <div>
                            <img src="${level.img}" alt="${level.name}">
                            <h3>${level.name}</h3>
                            <p>รายละเอียดการประเมินและข้อมูลสนับสนุนของนักเรียนระดับชั้น ${level.name}</p>
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
    contentArea.innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateUI(isSubPage, text = "") {
    navBar.style.display = isSubPage ? 'flex' : 'none';
    mainHeader.style.display = isSubPage ? 'none' : 'block';
    breadcrumb.innerText = text;
}

document.body.addEventListener('click', function(e) {
    // ปุ่มย้อนกลับ
    if (e.target.closest('.js-back-btn')) {
        pageStack.pop();
        showMainMenu(); 
        return;
    }

    // ปุ่ม Link (ภายนอก)
    let actionBtn = e.target.closest('.js-action-btn');
    if (actionBtn) {
        handleExternalLink(actionBtn.dataset.link, actionBtn.dataset.id);
        return;
    }

    // ปุ่ม Link (ภายใน - เลือกระดับ)
    let internalBtn = e.target.closest('.js-internal-link');
    if (internalBtn) {
        let id = internalBtn.dataset.id;
        showLevelsPage(id);
        return;
    }
});

function handleExternalLink(url, id) {
    if (!url || url === '#' || url === '' || url === 'undefined') {
        Swal.fire({ 
            icon: 'warning', 
            title: 'ไม่พบลิงก์ข้อมูล', 
            text: `ยังไม่ได้ลงนามหรือใส่ลิงก์สำหรับ ${id} (หรือระบบอยู่ระหว่างตรวจสอบ)`, 
            confirmButtonColor: '#6366f1' 
        });
        return;
    }
    
    Swal.fire({ 
        title: 'กำลังเตรียมข้อมูล...', 
        text: 'โปรดรอกำลังเปิดเอกสาร',
        allowOutsideClick: false,
        timer: 1200, 
        didOpen: () => Swal.showLoading() 
    });

    const isLine = /Line/i.test(navigator.userAgent);
    setTimeout(() => {
        if (isLine) {
            let target = url.includes('?') ? url + '&openExternalBrowser=1' : url + '?openExternalBrowser=1';
            window.location.href = target;
        } else {
            window.open(url, '_blank');
        }
    }, 800);
}
