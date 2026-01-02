// 移动菜单切换
function toggleMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
    } else {
        mobileMenu.classList.add('hidden');
    }
}

// 点击菜单项后关闭菜单
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.add('hidden');
    });
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 导航栏滚动效果
const navbar = document.getElementById('navbar');
const navbarLogo = document.getElementById('navbar-logo');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const isShrunk = scrollTop > 120;

    if (!navbar) return;

    if (isShrunk) {
        navbar.classList.add('shadow-lg', 'navbar-shrink');
        navbar.classList.remove('navbar-expanded');
        navbarLogo?.classList.add('logo-shrink');
        navbarLogo?.classList.remove('logo-expanded');
    } else {
        navbar.classList.remove('shadow-lg', 'navbar-shrink');
        navbar.classList.add('navbar-expanded');
        navbarLogo?.classList.remove('logo-shrink');
        navbarLogo?.classList.add('logo-expanded');
    }
});

// 表單提交處理（當存在聯繫表單時）
const contactForm = document.querySelector('form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const project = this.querySelectorAll('input[type="text"]')[1].value;
        const message = this.querySelector('textarea').value;

        if (!name || !email || !project || !message) {
            alert('請填寫所有欄位');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('請輸入有效的電郵地址');
            return;
        }

        const submitBtn = this.querySelector('button');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '提交中...';
        submitBtn.disabled = true;

        setTimeout(() => {
            alert(`感謝您的查詢！\n\n我們已收到您的需求，將於 24 小時內與您聯繫。\n\n聯繫電郵: ${email}`);
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// 交叉观察器 - 实现元素进入视口时的动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 观察所有卡片元素
document.querySelectorAll('.group, .bg-gradient-to-br').forEach(el => {
    observer.observe(el);
});

// 统计数字动画
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// 当统计数据进入视口时触发计数动画
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counterText = entry.target.textContent;
            const numberMatch = counterText.match(/(\d+)/);
            if (numberMatch) {
                const number = parseInt(numberMatch[1]);
                animateCounter(entry.target, number);
                counterObserver.unobserve(entry.target);
            }
        }
    });
}, { threshold: 0.5 });

// 观察统计数字
document.querySelectorAll('.text-3xl.font-bold.text-cyan-400').forEach(el => {
    counterObserver.observe(el);
});

// 頁面載入完成事件
document.addEventListener('DOMContentLoaded', () => {
    console.log('頁面載入完成，網站已就緒！');
    
    // 添加加载动画类
    document.body.style.opacity = '1';
});

// 滑鼠跟蹤效果（可選）
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    document.documentElement.style.setProperty('--mouse-x', x);
    document.documentElement.style.setProperty('--mouse-y', y);
});

// 返回頂部按鈕功能
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 创建返回顶部按钮
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        if (!document.getElementById('scroll-to-top')) {
            const button = document.createElement('button');
            button.id = 'scroll-to-top';
            button.innerHTML = '↑';
            button.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: linear-gradient(135deg, #06b6d4, #3b82f6);
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                z-index: 40;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(6, 182, 212, 0.4);
            `;
            button.onclick = scrollToTop;
            document.body.appendChild(button);
        }
    } else {
        const btn = document.getElementById('scroll-to-top');
        if (btn) btn.remove();
    }
});

// 鍵盤快捷鍵
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K 打開搜尋（示例）
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        console.log('搜尋功能可在此添加');
    }
});
