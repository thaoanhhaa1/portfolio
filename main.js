i18next
    .use(i18nextHttpBackend)
    .use(i18nextBrowserLanguageDetector)
    .init(
        {
            fallbackLng: 'en',
            debug: false,
            ns: ['translation'],
            defaultNS: 'translation',
            backend: {
                loadPath: './assets/locales/{{lng}}/{{ns}}.json',
            },
        },
        updateContent,
    );

i18next.on('languageChanged', updateContent);

// My code
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const vietnameseBtn = $('.vietnamese');
const englishBtn = $('.english');
const bannerTitle = $('.banner__title');
const bannerDescription = $('.banner__desc');
const bannerResumeBtn = $('.banner__resume-btn span');
const techStackTitle = $('.tech-stack__title');
const techStackDescription = $('.tech-stack__desc');
const techStackViewBtn = $('.tech-stack__btn span');
const educationTitle = $('.education .header__title');
const educationIuhTitle = $('.content__item__title');
const educationIuhDescription = $('.content__item__desc');
const educationIuhDuration = $('.content__item__detail--duration');
const educationIuhGrade = $('.content__item__detail--grade');
const projectTitle = $('.projects .header__title');
const footerTitle = $('.footer__title');
const projectList = $$('.project__item');

tippy('[data-tippy-content]');

vietnameseBtn.addEventListener('click', () => changeLng('vi'));
englishBtn.addEventListener('click', () => changeLng('en'));

function changeLng(lng) {
    i18next.changeLanguage(lng);
}

function updateContent() {
    if (i18next.language === 'vi') {
        vietnameseBtn.classList.add('active');
        englishBtn.classList.remove('active');
    } else {
        englishBtn.classList.add('active');
        vietnameseBtn.classList.remove('active');
    }

    bannerTitle.innerHTML = i18next.t('bannerTitle');
    bannerDescription.innerHTML = i18next.t('bannerDescription');
    bannerResumeBtn.innerHTML = i18next.t('viewResume');
    techStackTitle.innerHTML = i18next.t('techTitle');
    techStackDescription.innerHTML = i18next.t('techDescription');
    techStackViewBtn.innerHTML = i18next.t('techViewFull');
    educationTitle.innerHTML = i18next.t('educationTitle');
    educationIuhTitle.innerHTML = i18next.t('educationIuhTitle');
    educationIuhDescription.innerHTML = i18next.t('educationIuhDescription');
    educationIuhDuration.innerHTML = i18next.t('educationIuhDuration');
    educationIuhGrade.innerHTML = i18next.t('educationIuhGrade');
    projectTitle.innerHTML = i18next.t('projectTitle');
    footerTitle.innerHTML = i18next.t('footerTitle');

    projectList.forEach((project) => {
        const name = project.getAttribute('data-project');
        const titleElement = project.querySelector('.project__item__title');
        const descElement = project.querySelector('.project__item__desc');

        titleElement.innerHTML = i18next.t(`project${name}Title`);
        descElement.innerHTML = i18next.t(`project${name}Description`);
        descElement.setAttribute(
            'data-tippy-content',
            i18next.t(`project${name}Description`),
        );
    });

    tippy('[data-tippy-content]');
}

// Xử lý header khi scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Xử lý scroll to top button
const scrollToTop = document.querySelector('.scroll-to-top');

// Cập nhật HTML của nút
scrollToTop.innerHTML = `
    <div class="arrow-top">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
    </div>
`;

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTop.classList.add('visible');
    } else {
        scrollToTop.classList.remove('visible');
    }
});

scrollToTop.addEventListener('click', (e) => {
    // Tạo hiệu ứng ripple
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    scrollToTop.appendChild(ripple);

    // Xóa ripple sau khi animation hoàn thành
    setTimeout(() => {
        ripple.remove();
    }, 1000);

    // Scroll to top với animation
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});

// Animation cho các elements khi scroll
const observerOptions = {
    threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe project items
document.querySelectorAll('.project__item').forEach((item) => {
    observer.observe(item);
});

// Observe section headers
document.querySelectorAll('.header').forEach((header) => {
    observer.observe(header);
});

// Nâng cấp hiệu ứng particles cho background
function initParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'particles-js';
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.zIndex = '-1';
    document.body.prepend(particlesContainer);

    // Tải particles.js từ CDN nếu chưa có
    if (typeof particlesJS === 'undefined') {
        const script = document.createElement('script');
        script.src =
            'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
        script.onload = () => {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 100,
                        density: { enable: true, value_area: 800 },
                    },
                    color: { value: ['#11cdef', '#1171ef', '#32325d'] },
                    shape: {
                        type: ['circle', 'triangle', 'polygon'],
                        polygon: { nb_sides: 6 },
                    },
                    opacity: {
                        value: 0.6,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false,
                        },
                    },
                    size: {
                        value: 5,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 2,
                            size_min: 0.1,
                            sync: false,
                        },
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#11cdef',
                        opacity: 0.4,
                        width: 1,
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: true,
                        straight: false,
                        out_mode: 'out',
                        bounce: false,
                        attract: { enable: true, rotateX: 600, rotateY: 1200 },
                    },
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { enable: true, mode: 'bubble' },
                        onclick: { enable: true, mode: 'push' },
                        resize: true,
                    },
                    modes: {
                        grab: { distance: 400, line_linked: { opacity: 1 } },
                        bubble: {
                            distance: 200,
                            size: 6,
                            duration: 2,
                            opacity: 0.8,
                            speed: 3,
                        },
                        repulse: { distance: 200, duration: 0.4 },
                        push: { particles_nb: 4 },
                        remove: { particles_nb: 2 },
                    },
                },
                retina_detect: true,
            });
        };
        document.body.appendChild(script);
    }
}

// Nâng cấp hiệu ứng typing cho banner title
function initTypingEffect() {
    const bannerTitle = document.querySelector('.banner__title');
    if (!bannerTitle) return;

    const originalText = bannerTitle.textContent;
    bannerTitle.innerHTML =
        '<span class="typing-text"></span><span class="typing-cursor">|</span>';
    const typingText = bannerTitle.querySelector('.typing-text');

    let i = 0;
    const typingSpeed = 80; // ms per character
    const typingEffect = setInterval(() => {
        if (i < originalText.length) {
            typingText.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(typingEffect);
            // Thêm hiệu ứng highlight cho một số từ quan trọng
            setTimeout(() => {
                const highlightWords = ['developer', 'Ha Anh Thao'];
                let newText = typingText.textContent;

                highlightWords.forEach((word) => {
                    const regex = new RegExp(word, 'gi');
                    newText = newText.replace(
                        regex,
                        `<span class="highlight-text">${word}</span>`,
                    );
                });

                typingText.innerHTML = newText;
            }, 500);
        }
    }, typingSpeed);
}

// Thêm hiệu ứng 3D tilt cho các phần tử
function initTiltEffect() {
    // Tải thư viện vanilla-tilt.js
    const tiltScript = document.createElement('script');
    tiltScript.src =
        'https://unpkg.com/vanilla-tilt@1.7.0/dist/vanilla-tilt.min.js';
    tiltScript.onload = () => {
        // Áp dụng hiệu ứng tilt cho project cards
        VanillaTilt.init(document.querySelectorAll('.project__item'), {
            max: 10,
            speed: 400,
            glare: true,
            'max-glare': 0.3,
            scale: 1.05,
        });

        // Áp dụng hiệu ứng tilt cho tech stack items
        VanillaTilt.init(document.querySelectorAll('.tech-stack__item'), {
            max: 25,
            speed: 300,
            glare: true,
            'max-glare': 0.5,
            scale: 1.1,
        });

        // Áp dụng hiệu ứng tilt cho banner image
        VanillaTilt.init(document.querySelector('.banner__img'), {
            max: 15,
            speed: 400,
            glare: false,
            scale: 1.05,
        });
    };
    document.head.appendChild(tiltScript);
}

// Thêm hiệu ứng parallax nâng cao
function initAdvancedParallax() {
    // Tạo các phần tử trang trí cho banner
    const createDecoElements = () => {
        const banner = document.querySelector('.banner');
        if (!banner) return;

        const decoContainer = document.createElement('div');
        decoContainer.className = 'banner-deco-container';

        // Tạo 15 phần tử trang trí với hình dạng và màu sắc khác nhau
        for (let i = 0; i < 15; i++) {
            const deco = document.createElement('div');
            deco.className = 'banner-deco';

            // Ngẫu nhiên hình dạng: circle, square, triangle
            const shapes = ['circle', 'square', 'triangle'];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            deco.classList.add(`shape-${shape}`);

            // Ngẫu nhiên kích thước
            const size = Math.floor(Math.random() * 30) + 10; // 10px to 40px
            deco.style.width = `${size}px`;
            deco.style.height = `${size}px`;

            // Ngẫu nhiên vị trí
            deco.style.left = `${Math.random() * 100}%`;
            deco.style.top = `${Math.random() * 100}%`;

            // Ngẫu nhiên màu sắc
            const colors = [
                '#11cdef',
                '#1171ef',
                '#32325d',
                'rgba(255,255,255,0.3)',
            ];
            deco.style.backgroundColor =
                colors[Math.floor(Math.random() * colors.length)];

            // Ngẫu nhiên độ trễ animation
            deco.style.animationDelay = `${Math.random() * 5}s`;

            decoContainer.appendChild(deco);
        }

        banner.appendChild(decoContainer);
    };

    createDecoElements();

    // Hiệu ứng parallax khi di chuyển chuột
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        // Parallax cho các phần tử trang trí
        document.querySelectorAll('.banner-deco').forEach((deco, index) => {
            const factor = ((index % 5) + 1) * 10;
            deco.style.transform = `translate(${x * factor - factor / 2}px, ${
                y * factor - factor / 2
            }px)`;
        });

        // Parallax cho banner image với hiệu ứng sâu hơn
        const bannerImg = document.querySelector('.banner__img img');
        if (bannerImg) {
            bannerImg.style.transform = `translate(${x * 30 - 15}px, ${
                y * 30 - 15
            }px) rotate(${x * 5}deg)`;
        }

        // Parallax cho tech stack image
        const techStackImg = document.querySelector('.tech-stack__img img');
        if (techStackImg) {
            techStackImg.style.transform = `translate(${x * 20 - 10}px, ${
                y * 20 - 10
            }px) rotate(${y * 5}deg)`;
        }
    });
}

// Thêm hiệu ứng scroll reveal nâng cao
function initAdvancedScrollReveal() {
    // Tải ScrollReveal từ CDN
    const srScript = document.createElement('script');
    srScript.src =
        'https://unpkg.com/scrollreveal@4.0.9/dist/scrollreveal.min.js';
    srScript.onload = () => {
        // Cấu hình cơ bản
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '50px',
            duration: 1000,
            delay: 200,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            reset: false,
        });

        // Áp dụng cho các phần tử khác nhau với cấu hình khác nhau
        sr.reveal('.banner__content', {
            origin: 'left',
            distance: '100px',
            duration: 1200,
            delay: 300,
        });

        sr.reveal('.banner__img', {
            origin: 'right',
            distance: '100px',
            duration: 1200,
            delay: 500,
        });

        sr.reveal('.tech-stack__content', {
            origin: 'right',
            distance: '80px',
            duration: 1000,
        });

        sr.reveal('.tech-stack__img', {
            origin: 'left',
            distance: '80px',
            duration: 1000,
        });

        sr.reveal('.header', {
            origin: 'top',
            distance: '50px',
            duration: 800,
        });

        sr.reveal('.project__item', {
            origin: 'bottom',
            distance: '50px',
            duration: 800,
            interval: 200, // Mỗi item hiện lên cách nhau 200ms
        });

        sr.reveal('.content__item', {
            origin: 'bottom',
            distance: '30px',
            duration: 800,
        });

        sr.reveal('.footer__title', {
            origin: 'bottom',
            distance: '30px',
            duration: 800,
        });

        sr.reveal('.banner__contacts', {
            origin: 'bottom',
            distance: '30px',
            duration: 800,
            delay: 400,
        });
    };
    document.head.appendChild(srScript);
}

// Thêm hiệu ứng gradient text và button
function initGradientEffects() {
    // Thêm class gradient-text cho các tiêu đề
    document
        .querySelectorAll(
            '.header__title, .banner__title, .tech-stack__title, .footer__title',
        )
        .forEach((el) => {
            el.classList.add('gradient-text');
        });

    // Thêm class gradient-button cho các nút
    document
        .querySelectorAll(
            '.banner__resume-btn, .tech-stack__btn, .project__item__view--demo',
        )
        .forEach((el) => {
            el.classList.add('gradient-button');
        });
}

// Thêm hiệu ứng hover nâng cao cho các liên kết
function initAdvancedHoverEffects() {
    // Thêm hiệu ứng hover cho các liên kết mạng xã hội
    document.querySelectorAll('.banner__contact__item').forEach((item) => {
        item.addEventListener('mouseenter', function () {
            this.classList.add('contact-hover');

            // Tạo hiệu ứng ripple
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });

        item.addEventListener('mouseleave', function () {
            this.classList.remove('contact-hover');
        });
    });
}

// Thêm hiệu ứng preloader
function initPreloader() {
    // Tạo preloader
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-spinner"></div>
            <div class="preloader-text">Loading<span class="dot-animation">.</span><span class="dot-animation">.</span><span class="dot-animation">.</span></div>
        </div>
    `;
    document.body.prepend(preloader);

    // Ẩn preloader sau khi trang đã tải xong
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('preloader-hidden');
            setTimeout(() => {
                preloader.remove();
            }, 1000);
        }, 1000);
    });
}

// Thêm hiệu ứng neon glow cho các phần tử
function initNeonEffect() {
    // Thêm class neon-glow cho các phần tử cần hiệu ứng
    document
        .querySelectorAll('.tech-stack__item, .project__item__tech')
        .forEach((el) => {
            el.classList.add('neon-glow');
        });
}

// Thêm hiệu ứng background wave
function initBackgroundWave() {
    const waveContainer = document.createElement('div');
    waveContainer.className = 'wave-container';
    waveContainer.innerHTML = `
        <div class="wave wave1"></div>
        <div class="wave wave2"></div>
        <div class="wave wave3"></div>
        <div class="wave wave4"></div>
    `;

    // Thêm vào các phần có background gradient
    document.querySelectorAll('.liner-bg').forEach((el, index) => {
        // if (!index) return;

        const waveClone = waveContainer.cloneNode(true);
        el.appendChild(waveClone);
    });
}

// Thêm hiệu ứng loading progress bar
function initProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'page-progress-bar';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight =
            document.documentElement.scrollHeight || document.body.scrollHeight;
        const clientHeight =
            document.documentElement.clientHeight || window.innerHeight;
        const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;

        progressBar.style.width = scrolled + '%';
    });
}

// Thêm hiệu ứng skill progress bars
function initSkillBars() {
    const skillsSection = document.createElement('div');
    skillsSection.className = 'skills-section container';
    skillsSection.innerHTML = `
        <div class="header">
            <div class="header__img">
                <img src="./assets/images/skills.webp" alt="Skills">
            </div>
            <h2 class="header__title">${
                i18next.t('skillsTitle') || 'Skills'
            }</h2>
        </div>
        <div class="skills-container">
            <div class="skill-item">
                <div class="skill-info">
                    <span>Frontend Development</span>
                    <span>90%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" data-progress="90"></div>
                </div>
            </div>
            <div class="skill-item">
                <div class="skill-info">
                    <span>Backend Development</span>
                    <span>85%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" data-progress="85"></div>
                </div>
            </div>
            <div class="skill-item">
                <div class="skill-info">
                    <span>UI/UX Design</span>
                    <span>75%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" data-progress="75"></div>
                </div>
            </div>
            <div class="skill-item">
                <div class="skill-info">
                    <span>Cloud Technologies</span>
                    <span>80%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" data-progress="80"></div>
                </div>
            </div>
        </div>
    `;

    // Chèn vào trước phần projects
    const projectsSection = document.querySelector('.projects');
    if (projectsSection) {
        projectsSection.parentNode.insertBefore(skillsSection, projectsSection);
    }

    // Animate skill bars khi scroll đến
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target
                        .querySelectorAll('.skill-progress')
                        .forEach((progress) => {
                            const value =
                                progress.getAttribute('data-progress');
                            progress.style.width = value + '%';
                        });
                }
            });
        },
        { threshold: 0.5 },
    );

    observer.observe(skillsSection);
}

// Thêm hiệu ứng counter cho số liệu thống kê
function initCounters() {
    const statsSection = document.createElement('div');
    statsSection.className = 'stats-section liner-bg';
    statsSection.innerHTML = `
        <div class="container">
            <div class="stats-container">
                <div class="stat-item">
                    <div class="stat-icon">
                        <img src="./assets/svgs/project-icon.svg" alt="Projects">
                    </div>
                    <div class="stat-number" data-count="15">0</div>
                    <div class="stat-title">Projects Completed</div>
                </div>
                <div class="stat-item">
                    <div class="stat-icon">
                        <img src="./assets/svgs/client-icon.svg" alt="Clients">
                    </div>
                    <div class="stat-number" data-count="10">0</div>
                    <div class="stat-title">Happy Clients</div>
                </div>
                <div class="stat-item">
                    <div class="stat-icon">
                        <img src="./assets/svgs/code-icon.svg" alt="Code">
                    </div>
                    <div class="stat-number" data-count="10000">0</div>
                    <div class="stat-title">Lines of Code</div>
                </div>
                <div class="stat-item">
                    <div class="stat-icon">
                        <img src="./assets/svgs/coffee-icon.svg" alt="Coffee">
                    </div>
                    <div class="stat-number" data-count="500">0</div>
                    <div class="stat-title">Cups of Coffee</div>
                </div>
            </div>
        </div>
    `;

    // Chèn vào sau phần education
    const educationSection = document.querySelector('.education');
    if (educationSection) {
        educationSection.parentNode.insertBefore(
            statsSection,
            educationSection.nextSibling,
        );
    }

    // Animate counters khi scroll đến
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target
                        .querySelectorAll('.stat-number')
                        .forEach((counter) => {
                            const target = parseInt(
                                counter.getAttribute('data-count'),
                            );
                            const duration = 2000; // 2 seconds
                            const step = target / (duration / 16); // 60fps

                            let current = 0;
                            const updateCounter = () => {
                                current += step;
                                if (current < target) {
                                    counter.textContent = Math.floor(current);
                                    requestAnimationFrame(updateCounter);
                                } else {
                                    counter.textContent = target;
                                }
                            };

                            updateCounter();
                        });
                }
            });
        },
        { threshold: 0.5 },
    );

    observer.observe(statsSection);
}

// Khởi tạo tất cả hiệu ứng khi trang đã tải xong
window.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initParticles();
    initTypingEffect();
    initTiltEffect();
    initAdvancedParallax();
    initAdvancedScrollReveal();
    initGradientEffects();
    initAdvancedHoverEffects();
    initNeonEffect();
    initBackgroundWave();
    initProgressBar();
    initSkillBars();
    // initCounters();
});

// Thêm AOS library
const aosScript = document.createElement('script');
aosScript.src = 'https://unpkg.com/aos@next/dist/aos.js';
document.head.appendChild(aosScript);

const aosStyles = document.createElement('link');
aosStyles.rel = 'stylesheet';
aosStyles.href = 'https://unpkg.com/aos@next/dist/aos.css';
document.head.appendChild(aosStyles);
