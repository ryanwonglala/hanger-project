document.addEventListener('DOMContentLoaded', () => {
    // --- 1. TRANSLATIONS OBJECT ---
    const translations = {
        'en': {
            title: "Hanger Usage Survey",
            introTitle: "Clothing Hanger Usage Needs and Preferences Survey",
            introP: "Your feedback will help us design a better hanger. Thank you for your participation!",
            participantText: "Already",
            participantText2: "people shared their thoughts!",
            introBtn: "Start Survey",
            backBtn: "Back",
            nextBtn: "Next",
            submitBtn: "Finish!",
            q_other_placeholder: "Please specify",
            q1_title: "Do you often encounter situations where clothes stick together after washing due to dampness?",
            q1_instruction: "If so, do you wish for a hanger that could solve this problem?",
            q1_opt1: "Yes, frequently, and I strongly desire a solution",
            q1_opt2: "Yes, but I don't think a specialized hanger is necessary",
            q1_opt3: "No, rarely or never encountered",
            q1_opt4: "Not sure",
            q2_title: "Which type of clothing hanger do you prefer?",
            q2_opt1: "Multi-functional hanger",
            q2_opt2: "Single-function hanger",
            q2_opt3: "No particular preference",
            q3a_title: "What attracts you to multi-functional hangers?",
            q3a_instruction: "(Multiple choices allowed)",
            q3a_opt1: "Saves storage space",
            q3a_opt2: "Versatile functions for different garments",
            q3a_opt3: "Clever design solving specific problems",
            q3a_opt4: "Improves drying efficiency",
            q3a_opt5: "Other (Please specify)",
            q3b_title: "What attracts you to single-function hangers?",
            q3b_instruction: "Furthermore, have you imagined any practical functions they could potentially add?",
            q3b_placeholder: "Your thoughts...",
            q4_title: "Do you think the functions of current multi-functional hangers are sufficiently comprehensive and practical?",
            q4_opt1: "Yes, functions are already quite perfect",
            q4_opt2: "No, many functions are gimmicks and not practical",
            q4_opt3: "No, functions are still insufficient",
            q4_opt4: "Not sure / Haven't used them",
            q5_title: "Imagine an \"ultimate hanger\". Besides hanging clothes, what three core functions would you most want it to have?",
            q5_placeholder: "1. ...\n2. ...\n3. ...",
            q6_title: "What is the main material of the hangers you most often use?",
            q6_opt1: "Plastic", q6_opt2: "Wood", q6_opt3: "Metal", q6_opt4: "Other",
            q7_title: "What are your expectations regarding the load-bearing capacity of a hanger?",
            q7_opt1: "Can hold lightweight clothing",
            q7_opt2: "Can hold medium-weight clothing",
            q7_opt3: "Can hold heavy clothing without deforming",
            q7_opt4: "Can hold multiple pairs of pants",
            q7_opt5: "Other",
            q8_title: "How heavy do you prefer the hanger itself to be?",
            q8_opt1: "Very lightweight", q8_opt2: "Moderate weight", q8_opt3: "Has some heft", q8_opt4: "No preference",
            q9_title: "What is your expected service life for a clothing hanger?",
            q9_opt1: "Less than 1 year", q9_opt2: "1-3 years", q9_opt3: "3-5 years", q9_opt4: "More than 5 years",
            q10_title: "What is your opinion on the current market prices of clothing hangers?",
            q10_opt1: "Relatively expensive", q10_opt2: "Reasonable", q10_opt3: "Cheap", q10_opt4: "Not sure / Haven't paid attention",
            q11_title: "How important is it to you that hangers are made from recyclable materials?",
            q11_opt1: "Very important", q11_opt2: "Somewhat important", q11_opt3: "Not very important", q11_opt4: "Indifferent",
            q12_title: "To help design a better hanger, what other thoughts or suggestions do you have?",
            q12_placeholder: "Any other ideas...",
            thanksTitle: "Thank You! 🙏",
            thanksP: "Your ideas are sparking our innovation! We're one step closer to a better design.",
        },
        'zh-CN': {
            title: "衣架使用问卷",
            introTitle: "衣架使用需求与偏好调查",
            introP: "您的反馈将帮助我们设计出更好的衣架，感谢您的参与！",
            participantText: "已有",
            participantText2: "位参与者分享了想法！",
            introBtn: "开始问卷",
            backBtn: "返回",
            nextBtn: "继续",
            submitBtn: "完成！",
            q_other_placeholder: "请具体说明",
            q1_title: "您是否经常遇到洗后衣物因潮湿而粘连的情况？",
            q1_instruction: "如果是，您是否希望有一款能解决此问题的衣架？",
            q1_opt1: "是的，经常遇到，并非常希望能有解决方案",
            q1_opt2: "是的，但我觉得没必要专门为此设计衣架",
            q1_opt3: "没有，很少或从未遇到",
            q1_opt4: "不确定",
            q2_title: "您更偏爱哪种类型的衣架？",
            q2_opt1: "多功能衣架",
            q2_opt2: "单一功能衣架",
            q2_opt3: "没有特别的偏好",
            q3a_title: "多功能衣架的哪些方面吸引您？",
            q3a_instruction: "(可多选)",
            q3a_opt1: "节省收纳空间",
            q3a_opt2: "功能多样，可应对不同衣物",
            q3a_opt3: "巧妙的设计解决了特定问题",
            q3a_opt4: "提升晾晒效率和生活品质",
            q3a_opt5: "其他 (请说明)",
            q3b_title: "单一功能衣架的哪些方面吸引您？",
            q3b_instruction: "此外，您是否想象过它们可以增加哪些实用功能？",
            q3b_placeholder: "您的想法...",
            q4_title: "您认为市面上现有的多功能衣架功能足够全面和实用吗？",
            q4_opt1: "是的，功能已经相当完善",
            q4_opt2: "不是，很多功能是噱头，不实用",
            q4_opt3: "不是，功能仍不足，有待改进",
            q4_opt4: "不确定/没用过",
            q5_title: "想象一个“终极衣架”，除了挂衣服，您最希望它具备哪三个核心功能？",
            q5_placeholder: "1. ...\n2. ...\n3. ...",
            q6_title: "您最常用的衣架主要是什么材质的？",
            q6_opt1: "塑料", q6_opt2: "木质", q6_opt3: "金属", q6_opt4: "其他",
            q7_title: "您对衣架的承重能力有何期望？",
            q7_opt1: "能轻松挂起轻薄衣物",
            q7_opt2: "能稳定挂起中等重量衣物",
            q7_opt3: "能挂起厚重衣物不变形",
            q7_opt4: "能同时挂多条裤子或裙子",
            q7_opt5: "其他",
            q8_title: "您希望衣架本身的重量如何？",
            q8_opt1: "非常轻便，易于携带和大量存放", q8_opt2: "重量适中，有质感但不过重", q8_opt3: "有一定分量，感觉更稳固耐用", q8_opt4: "无所谓",
            q9_title: "您对一个衣架的期望使用寿命是多久？",
            q9_opt1: "1年以内", q9_opt2: "1-3年", q9_opt3: "3-5年", q9_opt4: "5年以上",
            q10_title: "您对目前市场上衣架的普遍价格有何看法？",
            q10_opt1: "比较贵", q10_opt2: "价格合理", q10_opt3: "便宜", q10_opt4: "不确定/没关注过",
            q11_title: "您对衣架采用可回收材料的重视程度如何？",
            q11_opt1: "非常重要，是购买决策的关键因素", q11_opt2: "比较重要，会增加品牌好感", q11_opt3: "不太重要，更关注实用性和价格", q11_opt4: "无所谓",
            q12_title: "为了帮助设计更好的衣架，您还有什么其他的想法或建议吗？",
            q12_placeholder: "任何其他的想法...",
            thanksTitle: "感谢参与！🙏",
            thanksP: "你的想法，是我们的创新火花！我们离更好的设计又近了一步。",
        },
        'zh-TW': {
            title: "衣架使用問卷",
            introTitle: "衣架使用需求與偏好調查",
            introP: "您的回饋將幫助我們設計出更好的衣架，感謝您的參與！",
            participantText: "已有",
            participantText2: "位參與者分享了想法！",
            introBtn: "開始問卷",
            backBtn: "返回",
            nextBtn: "繼續",
            submitBtn: "完成！",
            q_other_placeholder: "請具體說明",
            q1_title: "您是否經常遇到洗後衣物因潮濕而黏連的情況？",
            q1_instruction: "如果是，您是否希望有一款能解決此問題的衣架？",
            q1_opt1: "是的，經常遇到，並非常希望能有解決方案",
            q1_opt2: "是的，但我覺得沒必要專門為此設計衣架",
            q1_opt3: "沒有，很少或從未遇到",
            q1_opt4: "不確定",
            q2_title: "您更偏愛哪種類型的衣架？",
            q2_opt1: "多功能衣架",
            q2_opt2: "單一功能衣架",
            q2_opt3: "沒有特別的偏好",
            q3a_title: "多功能衣架的哪些方面吸引您？",
            q3a_instruction: "(可多選)",
            q3a_opt1: "節省收納空間",
            q3a_opt2: "功能多樣，可應對不同衣物",
            q3a_opt3: "巧妙的設計解決了特定問題",
            q3a_opt4: "提升晾曬效率和生活品質",
            q3a_opt5: "其他 (請說明)",
            q3b_title: "單一功能衣架的哪些方面吸引您？",
            q3b_instruction: "此外，您是否想像過它們可以增加哪些實用功能？",
            q3b_placeholder: "您的想法...",
            q4_title: "您認為市面上現有的多功能衣架功能足夠全面和實用嗎？",
            q4_opt1: "是的，功能已經相當完善",
            q4_opt2: "不是，很多功能是噱頭，不實用",
            q4_opt3: "不是，功能仍不足，有待改進",
            q4_opt4: "不確定/沒用過",
            q5_title: "想像一個「終極衣架」，除了掛衣服，您最希望它具備哪三個核心功能？",
            q5_placeholder: "1. ...\n2. ...\n3. ...",
            q6_title: "您最常用的衣架主要是什麼材質的？",
            q6_opt1: "塑膠", q6_opt2: "木質", q6_opt3: "金屬", q6_opt4: "其他",
            q7_title: "您對衣架的承重能力有何期望？",
            q7_opt1: "能輕鬆掛起輕薄衣物",
            q7_opt2: "能穩定掛起中等重量衣物",
            q7_opt3: "能掛起厚重衣物不變形",
            q7_opt4: "能同時掛多條褲子或裙子",
            q7_opt5: "其他",
            q8_title: "您希望衣架本身的重量如何？",
            q8_opt1: "非常輕便，易於攜帶和大量存放", q8_opt2: "重量適中，有質感但不過重", q8_opt3: "有一定份量，感覺更穩固耐用", q8_opt4: "無所謂",
            q9_title: "您對一個衣架的期望使用壽命是多久？",
            q9_opt1: "1年以內", q9_opt2: "1-3年", q9_opt3: "3-5年", q9_opt4: "5年以上",
            q10_title: "您對目前市場上衣架的普遍價格有何看法？",
            q10_opt1: "比較貴", q10_opt2: "價格合理", q10_opt3: "便宜", q10_opt4: "不確定/沒關注過",
            q11_title: "您對衣架採用可回收材料的重視程度如何？",
            q11_opt1: "非常重要，是購買決策的關鍵因素", q11_opt2: "比較重要，會增加品牌好感", q11_opt3: "不太重要，更關注實用性和價格", q11_opt4: "無所謂",
            q12_title: "為了幫助設計更好的衣架，您還有什麼其他的想法或建議嗎？",
            q12_placeholder: "任何其他的想法...",
            thanksTitle: "感謝參與！🙏",
            thanksP: "你的想法，是我們的創新火花！我們離更好的設計又近了一步。",
        }
    };

    // --- 2. GLOBAL STATE & DOM ELEMENTS ---
    const motivationIcons = ['🚀', '✨', '💪', '🎉'];
    const slides = Array.from(document.querySelectorAll('.survey-slide'));
    const progressBar = document.getElementById('progressBar');
    const motivationIcon = document.getElementById('motivationIcon');
    const form = document.getElementById('hangerSurveyForm');
    
    let slideHistory = [0]; 
    let surveyAnswers = {};

    // --- 3. LANGUAGE & INITIALIZATION ---
    const setLanguage = (lang) => {
        localStorage.setItem('lang', lang);
        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.getAttribute('data-key');
            const translation = translations[lang]?.[key];
            if (translation) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    if (el.placeholder !== undefined) el.placeholder = translation;
                } else {
                    el.innerHTML = translation;
                }
            }
        });
        document.querySelector('.lang-switcher .active')?.classList.remove('active');
        document.querySelector(`[data-lang="${lang}"]`)?.classList.add('active');
        document.documentElement.lang = lang;
        document.title = translations[lang].title;
    };
    
    const animateCounterSmooth = (element, start, end, duration) => {
        if (start === end) { element.textContent = end; return; }
        const startTime = performance.now();
        const difference = end - start;
        
        const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + difference * easeOutCubic);
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.textContent = end;
            }
        };
        requestAnimationFrame(step);
    };

    const loadParticipantCount = async () => {
        const counterElement = document.getElementById('participantCount');
        if (!counterElement) return;
        
        try {
            counterElement.textContent = '...';
            const data = await API.getTotalParticipants();
            animateCounterSmooth(counterElement, 0, data, 1500);
        } catch (error) {
            console.error('Failed to load participant count:', error);
            counterElement.textContent = '0';
        }
    };
    
    // --- 4. CAROUSEL LOGIC ---
    const carouselSlides = document.querySelectorAll('.media-carousel .carousel-slide');
    let currentCarouselIndex = 0;
    let carouselInterval;

    const updateCarousel = () => {
        carouselSlides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentCarouselIndex);
        });
    };
    const nextCarouselSlide = () => {
        currentCarouselIndex = (currentCarouselIndex + 1) % carouselSlides.length;
        updateCarousel();
    };
    const startCarousel = () => { 
        stopCarousel();
        carouselInterval = setInterval(nextCarouselSlide, 4000); 
    }
    const stopCarousel = () => { 
        clearInterval(carouselInterval); 
        carouselInterval = null; 
    }

    // --- 5. NAVIGATION & SLIDE LOGIC ---
    const updateSlide = (newSlideIndex) => {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === newSlideIndex);
        });
        
        updateProgressBar();
        
        const newSlideId = slides[newSlideIndex].dataset.slideId;
        const mediaCarousel = document.querySelector('.media-carousel');

        if (newSlideId === 'intro' || newSlideId === 'thanks') {
            mediaCarousel.classList.remove('hidden');
            if (newSlideId === 'intro') {
                updateCarousel();
                startCarousel();
            } else {
                stopCarousel();
            }
        } else {
            mediaCarousel.classList.add('hidden');
            stopCarousel();
        }
    };
    
    const determineNextSlideIndex = () => {
        const currentSlideIndex = slideHistory[slideHistory.length - 1];
        const currentSlideId = slides[currentSlideIndex].dataset.slideId;
        
        if (currentSlideId === 'q2') {
            const preference = form.elements['q2_preference'].value;
            if (preference === 'single-function') {
                return slides.findIndex(s => s.dataset.slideId === 'q3b');
            } else {
                return slides.findIndex(s => s.dataset.slideId === 'q3a');
            }
        }
        
        if (currentSlideId === 'q3b') {
            return slides.findIndex(s => s.dataset.slideId === 'q5');
        }
        
        let nextInDOM = currentSlideIndex + 1;
        while(nextInDOM < slides.length) {
            const nextSlideId = slides[nextInDOM].dataset.slideId;
            // Skip q3b if not on single-function path
            if (nextSlideId === 'q3b' && form.elements['q2_preference'].value !== 'single-function') {
                 nextInDOM++;
                 continue;
            }
            // Skip q3a and q4 if on single-function path
            if ((nextSlideId === 'q3a' || nextSlideId === 'q4') && form.elements['q2_preference'].value === 'single-function') {
                nextInDOM++;
                continue;
            }
            return nextInDOM;
        }

        return slides.findIndex(s => s.dataset.slideId === 'thanks');
    };

    const updateProgressBar = () => {
        const totalSteps = 13; 
        const currentStep = slideHistory.length - 1;
        const progressPercentage = (currentStep / totalSteps) * 100;
        
        progressBar.style.width = `${Math.min(progressPercentage, 100)}%`;
        
        if (currentStep > 0 && currentStep <= totalSteps) {
            const randomIcon = motivationIcons[Math.floor(Math.random() * motivationIcons.length)];
            motivationIcon.textContent = randomIcon;
            motivationIcon.classList.add('animate');
            setTimeout(() => motivationIcon.classList.remove('animate'), 500);
        }

        const progressContainer = document.querySelector('.progress-container');
        const currentSlideId = slides[slideHistory[slideHistory.length-1]].dataset.slideId;
        progressContainer.style.opacity = (currentSlideId === 'intro' || currentSlideId === 'thanks') ? '0' : '1';
    };

    const handleNext = () => {
        const nextSlideIndex = determineNextSlideIndex();
        if (nextSlideIndex !== -1 && nextSlideIndex < slides.length) {
            slideHistory.push(nextSlideIndex);
            updateSlide(nextSlideIndex);
        }
    };
    
    const handleBack = () => {
        if (slideHistory.length > 1) {
            slideHistory.pop();
            const prevSlideIndex = slideHistory[slideHistory.length - 1];
            updateSlide(prevSlideIndex);
        }
    };

    // --- 6. DATA COLLECTION & SUBMISSION ---
    const collectSurveyData = () => {
        const formData = new FormData(form);
        const data = {
            answers: {},
            openEndedAnswers: [],
            language: localStorage.getItem('lang') || 'zh-CN'
        };

        const keys = [...new Set(Array.from(formData.keys()))];

        for (const key of keys) {
            const values = formData.getAll(key);
            const cleanKey = key.replace('[]', '');
             if (values.length > 1) {
                data.answers[cleanKey] = values.filter(v => v.trim() !== '');
            } else if (values[0].trim() !== ''){
                data.answers[cleanKey] = values[0];
            }
        }
        
        document.querySelectorAll('input[type="text"][name$="_other_text"]').forEach(input => {
            if(input.value.trim() !== '') {
                const baseName = input.name.replace('_other_text', '');
                if (data.answers[baseName] && (data.answers[baseName] === 'other' || data.answers[baseName].includes('other'))) {
                   data.answers[`${baseName}_other`] = input.value.trim();
                }
            }
        });

        ['q3b_ideas', 'q5_ultimate', 'q12_suggestions'].forEach(id => {
            if(data.answers[id] && data.answers[id].trim() !== '') {
                const questionTitleKey = id.replace(/_.$/, '_title');
                data.openEndedAnswers.push({
                    questionId: id,
                    questionText: translations[data.language][questionTitleKey] || id,
                    answer: data.answers[id]
                });
            }
        });
        
        surveyAnswers = data;
    };

    const handleSurveySubmit = async () => {
        collectSurveyData();
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = '...';

        try {
            await API.submitSurvey(surveyAnswers);
            createConfetti();
            showSuccessBadge();
            setTimeout(() => {
                const thanksIndex = slides.findIndex(s => s.dataset.slideId === 'thanks');
                slideHistory.push(thanksIndex);
                updateSlide(thanksIndex);
            }, 800);
        } catch (error) {
            console.error('Submission failed:', error);
            alert('Submission failed. Please try again.');
            submitBtn.disabled = false;
            submitBtn.textContent = translations[localStorage.getItem('lang') || 'zh-CN'].submitBtn;
        }
    };
    
    // --- 7. EVENT LISTENERS ---
    document.body.addEventListener('click', (e) => {
        const target = e.target;
        if (target.matches('.submit-btn')) { 
            e.preventDefault(); 
            handleSurveySubmit(); 
        } else if (target.matches('.next-btn')) { 
            e.preventDefault(); 
            handleNext(); 
        } else if (target.matches('.prev-btn')) { 
            e.preventDefault(); 
            handleBack(); 
        }
    });

    document.querySelector('.lang-switcher').addEventListener('click', (e) => {
        if(e.target.dataset.lang) {
            setLanguage(e.target.dataset.lang);
        }
    });


    // --- 8. CELEBRATION ANIMATION ---
    const celebrationContainer = document.getElementById('celebrationContainer');
    
    const createConfetti = () => {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.textContent = ['🎉', '✨', '🎊', '⭐'][Math.floor(Math.random() * 4)];
            confetti.style.cssText = `position: fixed; left: ${Math.random() * 100}vw; top: -20px; font-size: ${Math.random() * 20 + 20}px; animation: confettiFall ${Math.random() * 2 + 2}s linear forwards; pointer-events: none; z-index: 9999;`;
            celebrationContainer.appendChild(confetti);
            setTimeout(() => confetti.remove(), 4000);
        }
    };
    const showSuccessBadge = () => {
        const badge = document.createElement('div');
        badge.className = 'success-badge';
        celebrationContainer.appendChild(badge);
        setTimeout(() => badge.remove(), 2000);
    };

    if (!document.querySelector('#confetti-style')) {
        const style = document.createElement('style');
        style.id = 'confetti-style';
        style.textContent = `@keyframes confettiFall { to { transform: translateY(100vh) rotate(360deg); opacity: 0; } }`;
        document.head.appendChild(style);
    }

    // --- 9. INITIALIZE ---
    const savedLang = localStorage.getItem('lang') || 'zh-CN';
    setLanguage(savedLang);
    updateSlide(slideHistory[0]);
    loadParticipantCount();
});

