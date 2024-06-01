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
