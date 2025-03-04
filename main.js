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
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTop.classList.add('visible');
    } else {
        scrollToTop.classList.remove('visible');
    }
});

scrollToTop.addEventListener('click', () => {
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

// Thêm hiệu ứng particles cho background
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
                        value: 80,
                        density: { enable: true, value_area: 800 },
                    },
                    color: { value: '#11cdef' },
                    shape: { type: 'circle' },
                    opacity: { value: 0.5, random: false },
                    size: { value: 3, random: true },
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
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false,
                    },
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { enable: true, mode: 'grab' },
                        onclick: { enable: true, mode: 'push' },
                        resize: true,
                    },
                    modes: {
                        grab: { distance: 140, line_linked: { opacity: 1 } },
                        push: { particles_nb: 4 },
                    },
                },
                retina_detect: true,
            });
        };
        document.body.appendChild(script);
    } else {
        particlesJS('particles-js', {
            // Cấu hình tương tự như trên
        });
    }
}

// Thêm hiệu ứng typing cho banner title
function initTypingEffect() {
    const bannerTitle = document.querySelector('.banner__title');
    const originalText = bannerTitle.textContent;
    bannerTitle.textContent = '';

    let i = 0;
    const typingEffect = setInterval(() => {
        if (i < originalText.length) {
            bannerTitle.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(typingEffect);
            // Thêm cursor nhấp nháy
            const cursor = document.createElement('span');
            cursor.className = 'typing-cursor';
            cursor.textContent = '|';
            bannerTitle.appendChild(cursor);
        }
    }, 100);
}

// Thêm hiệu ứng parallax cho các phần tử
function initParallaxEffect() {
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        // Parallax cho banner image
        const bannerImg = document.querySelector('.banner__img img');
        if (bannerImg) {
            bannerImg.style.transform = `translate(${x * 20 - 10}px, ${
                y * 20 - 10
            }px)`;
        }

        // Parallax cho tech stack image
        const techStackImg = document.querySelector('.tech-stack__img img');
        if (techStackImg) {
            techStackImg.style.transform = `translate(${x * 15 - 7.5}px, ${
                y * 15 - 7.5
            }px)`;
        }

        // Parallax cho các shape trong banner
        document
            .querySelectorAll('.banner__shape span')
            .forEach((span, index) => {
                const factor = ((index % 3) + 1) * 5;
                span.style.transform = `translate(${
                    x * factor - factor / 2
                }px, ${y * factor - factor / 2}px)`;
            });
    });
}

// Thêm hiệu ứng hover 3D cho project cards
function init3DCardEffect() {
    document.querySelectorAll('.project__item').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = 'transform 0.1s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform =
                'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s ease';
        });
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
window.addEventListener('load', () => {
    initParticles();
    initTypingEffect();
    initParallaxEffect();
    init3DCardEffect();
    initProgressBar();
    initSkillBars();
    // initCounters();

    // Thêm animation cho các phần tử khi scroll
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
    });
});

// Thêm AOS library
const aosScript = document.createElement('script');
aosScript.src = 'https://unpkg.com/aos@next/dist/aos.js';
document.head.appendChild(aosScript);

const aosStyles = document.createElement('link');
aosStyles.rel = 'stylesheet';
aosStyles.href = 'https://unpkg.com/aos@next/dist/aos.css';
document.head.appendChild(aosStyles);
