document.addEventListener('DOMContentLoaded', () => {
    // --- 1. TRANSLATIONS OBJECT ---
    const translations = {
        'en': { 
            title: "Hanger Troubles? Let's Fix Them!", 
            introTitle: "Ever feel like your hangers are failing you?", 
            introP: "Your favorite sweater gets shoulder bumps. Your silky shirt slips off. We've all been there. Let's find a better way, together.", 
            participantText: "Already", 
            participantText2: "people shared their thoughts!", 
            introBtn: "Let's Complain!", 
            q1Title: "What's your biggest hanger headache? 🤕", 
            q1Instruction: "Drag your biggest frustration into the bin!", 
            q1Opt1: "😩<br>Deformation", 
            q1Opt2: "😒<br>Slipping Off", 
            q1Opt3: "😠<br>Breaking", 
            q1Opt4: "😵<br>Takes Space", 
            q1DropZone: "Drop Here", 
            backBtn: "Back", 
            nextBtn: "Next", 
            q2Title: "Btw, what kind of hanger do you use most? 🤔", 
            q2Opt1: "Plastic", 
            q2Opt2: "Wood", 
            q2Opt3: "Velvet", 
            q2Opt4: "Wire", 
            q2Opt5: "Other ✏️", 
            closeBtn: "✕", 
            blackboardTitle: "Tell us more!", 
            blackboardPlaceholder: "What type of hanger do you use?", 
            blackboardSubmit: "Done", 
            statsTitle: "What others chose:", 
            backBtn2: "Back", 
            nextBtn2: "Next", 
            q3Title: "If a new multi-functional hanger appeared, would you buy it?", 
            backBtn3: "Back", 
            submitBtn: "Finish!", 
            thanksTitle: "Thank You! 🙏", 
            thanksP: "Your ideas are sparking our innovation! We're one step closer to a better design.",
            feedbackWallTitle: "Great Ideas from Others:",
            loadingStats: "Loading statistics...",
            chartLabels: {
                deformation: "Deformation",
                slipping: "Slipping Off",
                breaking: "Breaking",
                space: "Takes Space",
                plastic: "Plastic",
                wood: "Wood",
                velvet: "Velvet",
                wire: "Wire",
                custom: "Other"
            },
            noData: "No data available yet",
            noFeedback: "No great ideas featured yet. Be the first!",
            errorMessage: "Failed to load. Please try again later."
        },
        'zh-CN': { 
            title: "衣架的烦恼？我们来解决！", 
            introTitle: "有没有感觉，你的衣架总在'掉链子'？", 
            introP: "心爱的毛衣被撑出将军肩，丝滑的衬衫总在玩滑滑梯。这些我们都懂。一起来，找个更好的办法吧！", 
            participantText: "已有", 
            participantText2: "位小伙伴分享了想法！", 
            introBtn: "吐槽一下！", 
            q1Title: "哪个是你最大的衣架'头痛'？🤕", 
            q1Instruction: "把你最大的烦恼拖进垃圾桶！", 
            q1Opt1: "😩<br>衣服变形", 
            q1Opt2: "😒<br>总是滑落", 
            q1Opt3: "😠<br>容易断裂", 
            q1Opt4: "😵<br>太占空间", 
            q1DropZone: "拖到此处", 
            backBtn: "返回", 
            nextBtn: "继续", 
            q2Title: "顺便问下，你最常用哪种衣架？🤔", 
            q2Opt1: "塑料", 
            q2Opt2: "木质", 
            q2Opt3: "丝绒", 
            q2Opt4: "金属", 
            q2Opt5: "其他 ✏️", 
            closeBtn: "✕", 
            blackboardTitle: "告诉我们更多！", 
            blackboardPlaceholder: "你常用什么类型的衣架？", 
            blackboardSubmit: "完成", 
            statsTitle: "其他人的选择：", 
            backBtn2: "返回", 
            nextBtn2: "继续", 
            q3Title: "如果出现一种新的多功能衣架，你会买吗？", 
            backBtn3: "返回", 
            submitBtn: "完成！", 
            thanksTitle: "感谢参与！🙏", 
            thanksP: "你的想法，是我们的创新火花！我们离更好的设计又近了一步。",
            feedbackWallTitle: "大家留下的好点子:",
            loadingStats: "加载统计中...",
            chartLabels: {
                deformation: "变形",
                slipping: "滑落",
                breaking: "断裂",
                space: "占空间",
                plastic: "塑料",
                wood: "木质",
                velvet: "丝绒",
                wire: "金属",
                custom: "其他"
            },
            noData: "暂无统计数据",
            noFeedback: "暂时还没有精选点子，快来第一个分享吧！",
            errorMessage: "加载失败，请稍后重试"
        },
        'zh-TW': { 
            title: "衣架的煩惱？我們來解決！", 
            introTitle: "有沒有感覺，你的衣架總在'掉鏈子'？", 
            introP: "心愛的毛衣被撐出將軍肩，絲滑的襯衫總在玩溜滑梯。這些我們都懂。一起來，找個更好的辦法吧！", 
            participantText: "已有", 
            participantText2: "位小夥伴分享了想法！", 
            introBtn: "吐槽一下！", 
            q1Title: "哪個是你最大的衣架'頭痛'？🤕", 
            q1Instruction: "把你最大的煩惱拖進垃圾桶！", 
            q1Opt1: "😩<br>衣服變形", 
            q1Opt2: "😒<br>總是滑落", 
            q1Opt3: "😠<br>容易斷裂", 
            q1Opt4: "😵<br>太佔空間", 
            q1DropZone: "拖到此處", 
            backBtn: "返回", 
            nextBtn: "繼續", 
            q2Title: "順便問下，你最常用哪種衣架？🤔", 
            q2Opt1: "塑膠", 
            q2Opt2: "木質", 
            q2Opt3: "絲絨", 
            q2Opt4: "金屬", 
            q2Opt5: "其他 ✏️", 
            closeBtn: "✕", 
            blackboardTitle: "告訴我們更多！", 
            blackboardPlaceholder: "你常用什麼類型的衣架？", 
            blackboardSubmit: "完成", 
            statsTitle: "其他人的選擇：", 
            backBtn2: "返回", 
            nextBtn2: "繼續", 
            q3Title: "如果出現一種新的多功能衣架，你會買嗎？", 
            backBtn3: "返回", 
            submitBtn: "完成！", 
            thanksTitle: "感謝參與！🙏", 
            thanksP: "你的想法，是我們的創新火花！我們離更好的設計又近了一步。",
            feedbackWallTitle: "大家留下的好點子:",
            loadingStats: "載入統計中...",
            chartLabels: {
                deformation: "變形",
                slipping: "滑落",
                breaking: "斷裂",
                space: "佔空間",
                plastic: "塑膠",
                wood: "木質",
                velvet: "絲絨",
                wire: "金屬",
                custom: "其他"
            },
            noData: "暫無統計資料",
            noFeedback: "暫時還沒有精選點子，快來第一個分享吧！",
            errorMessage: "載入失敗，請稍後重試"
        }
    };

    // --- 2. GLOBAL VARIABLES ---
    const motivationIcons = ['🚀', '✨', '💪', '🎉'];
    const slides = document.querySelectorAll('.survey-slide');
    const progressBar = document.getElementById('progressBar');
    const motivationIcon = document.getElementById('motivationIcon');
    let currentSlide = 0;
    const totalDataSlides = slides.length - 2;

    const surveyAnswers = {
        demographics: {
            gender: '男', age: '26-30', occupation: '其他'
        },
        answers: {},
        openEndedAnswers: [],
        language: ''
    };

    const loadParticipantCount = async () => {
        const counterElement = document.getElementById('participantCount');
        if (!counterElement) return;
        
        try {
            counterElement.style.opacity = '0.5'; counterElement.textContent = '...';
            const count = await API.getTotalParticipants();
            counterElement.style.opacity = '1';
            animateCounterSmooth(counterElement, 0, count, 1500);
        } catch (error) {
            console.error('加载参与人数失败:', error);
            counterElement.style.opacity = '1'; counterElement.textContent = '0';
        }
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
                element.style.transform = (Math.floor(elapsed / 50) % 2 === 0) ? 'scale(1.05)' : 'scale(1)';
                requestAnimationFrame(step);
            } else {
                element.textContent = end;
                element.style.transform = 'scale(1)';
            }
        };
        requestAnimationFrame(step);
    };

    const setLanguage = (lang) => {
        localStorage.setItem('lang', lang);
        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.getAttribute('data-key');
            if (translations[lang]?.[key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translations[lang][key];
                } else {
                    el.innerHTML = translations[lang][key];
                }
            }
        });
        document.querySelector('.lang-switcher .active')?.classList.remove('active');
        document.querySelector(`[data-lang="${lang}"]`)?.classList.add('active');
        document.documentElement.lang = lang;
        document.title = translations[lang].title;
    };

    document.querySelector('.lang-switcher').addEventListener('click', (e) => {
        if (e.target.hasAttribute('data-lang')) { setLanguage(e.target.getAttribute('data-lang')); }
    });

    const carouselSlides = document.querySelectorAll('.carousel-slide');
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
    const startCarousel = () => { if (!carouselInterval) carouselInterval = setInterval(nextCarouselSlide, 4000); }
    const stopCarousel = () => { clearInterval(carouselInterval); carouselInterval = null; }

    const mediaCarousel = document.querySelector('.media-carousel');
    const slideThemes = ['default', 'theme-plastic', 'theme-metal', 'theme-velvet', 'theme-wood'];

    const updateSlide = (newSlideIndex, direction = 'forward') => {
        if (newSlideIndex < 0 || newSlideIndex >= slides.length) return;

        slides[currentSlide].classList.remove('active');
        slides[newSlideIndex].classList.add('active');
        currentSlide = newSlideIndex;

        updateBackgroundTheme(currentSlide);
        updateProgressBar(direction);

        const isThankYouSlide = currentSlide === slides.length - 1;
        const isIntroSlide = currentSlide === 0;

        if (isThankYouSlide) {
            mediaCarousel.classList.add('show-feedback');
            loadPublicFeedback();
            stopCarousel();
        } else {
            mediaCarousel.classList.remove('show-feedback');
            if(isIntroSlide) startCarousel(); else stopCarousel();
        }

        if (isIntroSlide) {
            mediaCarousel.classList.remove('hidden');
        } else if (isThankYouSlide) {
            mediaCarousel.classList.remove('hidden');
        } else {
            mediaCarousel.classList.add('hidden');
        }

        if (currentSlide === 2 && document.getElementById('biggestProblem').value) { showQ1Stats(); }
        if (currentSlide === 3 && document.querySelector('input[name="hanger_type"]:checked')) { showQ2Stats(); }
    };

    const updateBackgroundTheme = (slideIndex) => {
        document.body.className = '';
        const themeIndex = Math.min(slideIndex, slideThemes.length - 1);
        if (slideThemes[themeIndex] !== 'default') document.body.classList.add(slideThemes[themeIndex]);
    };

    const updateProgressBar = (direction) => {
        const progressPercentage = ((currentSlide) / totalDataSlides) * 100;
        progressBar.style.width = `${Math.min(progressPercentage, 100)}%`;

        if (direction === 'forward' && currentSlide > 0) {
            const randomIcon = motivationIcons[Math.floor(Math.random() * motivationIcons.length)];
            motivationIcon.textContent = randomIcon;
            motivationIcon.classList.add('animate');
            setTimeout(() => motivationIcon.classList.remove('animate'), 500);
        }

        const progressContainer = document.querySelector('.progress-container');
        progressContainer.style.opacity = (currentSlide === 0 || currentSlide === slides.length - 1) ? '0' : '1';
    };

    const handleSurveySubmit = async () => {
        collectSurveyData();
        if (!validateSurveyData()) { alert('请完整填写所有问题'); return; }

        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = '提交中...';

        try {
            await API.submitSurvey(surveyAnswers);
            createConfetti();
            showSuccessBadge();
            setTimeout(() => {
                updateSlide(currentSlide + 1, 'forward');
                setTimeout(loadParticipantCount, 500);
            }, 800);
        } catch (error) {
            alert('提交失败，请稍后重试');
            submitBtn.disabled = false;
            submitBtn.textContent = translations[localStorage.getItem('lang') || 'zh-CN'].submitBtn;
        }
    };

    const collectSurveyData = () => {
        surveyAnswers.answers.biggest_problem = document.getElementById('biggestProblem').value;
        const hangerType = document.querySelector('input[name="hanger_type"]:checked');
        if (hangerType) {
            surveyAnswers.answers.hanger_type = hangerType.value;
            if (hangerType.value === 'custom') {
                const customInput = document.getElementById('customInput').value.trim();
                if (customInput) surveyAnswers.openEndedAnswers.push({ questionId: 'hanger_type_custom', questionText: '您使用的其他类型衣架', answer: customInput });
            }
        }
        surveyAnswers.answers.buy_interest = parseInt(document.getElementById('interestSlider').value);
        surveyAnswers.language = localStorage.getItem('lang') || 'zh-CN';
    };

    const validateSurveyData = () => !!(surveyAnswers.answers.biggest_problem && surveyAnswers.answers.hanger_type && surveyAnswers.answers.buy_interest);

    document.body.addEventListener('click', async (e) => {
        if (e.target.matches('.submit-btn')) { e.preventDefault(); await handleSurveySubmit(); }
        else if (e.target.matches('.next-btn')) { e.preventDefault(); updateSlide(currentSlide + 1, 'forward'); }
        else if (e.target.matches('.prev-btn')) { e.preventDefault(); updateSlide(currentSlide - 1, 'backward'); }
    });

    const problems = document.querySelectorAll('.problem-card');
    const dropZone = document.getElementById('dropZone');
    const hiddenInput = document.getElementById('biggestProblem');
    const nextBtnSlide2 = document.querySelector('[data-slide="2"] .next-btn');

    let draggedItem = null, offsetX = 0, offsetY = 0, isDragging = false;
    
    const onDragStart = (e) => {
        if (isDragging || hiddenInput.value) return;
        draggedItem = e.target.closest('.problem-card');
        if (!draggedItem) return;

        isDragging = true;
        const rect = draggedItem.getBoundingClientRect();
        const touch = e.type === 'touchstart' ? e.touches[0] : e;
        offsetX = touch.clientX - rect.left;
        offsetY = touch.clientY - rect.top;

        draggedItem.classList.add('dragging');
        Object.assign(draggedItem.style, { width: `${rect.width}px`, height: `${rect.height}px` });
        
        moveElement(e);
        document.addEventListener('mousemove', onDragMove);
        document.addEventListener('touchmove', onDragMove, { passive: false });
        document.addEventListener('mouseup', onDragEnd);
        document.addEventListener('touchend', onDragEnd);
    };

    const onDragMove = (e) => {
        e.preventDefault();
        requestAnimationFrame(() => moveElement(e));
    };

    const moveElement = (e) => {
        if (!isDragging || !draggedItem) return;
        const touch = e.type.includes('touch') ? e.touches[0] : e;
        draggedItem.style.left = `${touch.clientX - offsetX}px`;
        draggedItem.style.top = `${touch.clientY - offsetY}px`;
        dropZone.classList.toggle('drag-over', isOverDropZone(touch));
    };
    
    const isOverDropZone = ({ clientX, clientY }) => {
        const rect = dropZone.getBoundingClientRect();
        return clientX > rect.left && clientX < rect.right && clientY > rect.top && clientY < rect.bottom;
    };

    const onDragEnd = (e) => {
        if (!isDragging || !draggedItem) return;
        const touch = e.type.includes('touch') ? e.changedTouches[0] : e;
        
        if (isOverDropZone(touch)) {
            hiddenInput.value = draggedItem.dataset.value;
            dropZone.innerHTML = `<div class="dropped-item">${draggedItem.innerHTML}</div>`;
            dropZone.classList.add('dropped');
            nextBtnSlide2.classList.remove('hidden');
            problems.forEach(p => { if (p !== draggedItem) p.style.opacity = '0.4'; });
            draggedItem.remove();
            showQ1Stats();
        } else {
            draggedItem.classList.remove('dragging');
            Object.assign(draggedItem.style, { left: '', top: '', width: '', height: '' });
        }
        
        dropZone.classList.remove('drag-over');
        isDragging = false;
        draggedItem = null;
        document.removeEventListener('mousemove', onDragMove);
        document.removeEventListener('touchmove', onDragMove);
        document.removeEventListener('mouseup', onDragEnd);
        document.removeEventListener('touchend', onDragEnd);
    };
    
    problems.forEach(p => { p.addEventListener('mousedown', onDragStart); p.addEventListener('touchstart', onDragStart); });
    
    const customOption = document.getElementById('customOption');
    const blackboardModal = document.getElementById('blackboardModal');
    const blackboardInput = document.getElementById('customInput');
    document.querySelectorAll('input[name="hanger_type"]').forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'custom') { blackboardModal.classList.add('active'); blackboardInput.focus(); }
            else { showQ2Stats(); }
        });
    });
    
    const closeBlackboard = () => {
        blackboardModal.classList.remove('active');
        if (!blackboardInput.value.trim()) customOption.checked = false;
    };
    document.querySelector('.blackboard-close').addEventListener('click', closeBlackboard);
    blackboardModal.addEventListener('click', (e) => { if (e.target === blackboardModal) closeBlackboard(); });
    document.querySelector('.blackboard-submit').addEventListener('click', () => {
        if (blackboardInput.value.trim()) {
            customOption.checked = true;
            showQ2Stats();
        }
        closeBlackboard();
    });

    const interestSlider = document.getElementById('interestSlider');
    const sliderDisplay = document.getElementById('sliderValue');
    const sliderEmojis = ['🤧', '😕', '🤔', '😊', '😍'];
    if (interestSlider) {
        interestSlider.addEventListener('input', (e) => {
            sliderDisplay.textContent = sliderEmojis[parseInt(e.target.value) - 1];
            sliderDisplay.style.transform = 'scale(1.2)';
            setTimeout(() => sliderDisplay.style.transform = 'scale(1)', 200);
        });
    }
    
    const renderChart = (containerId, questionId) => {
        const chartContainer = document.getElementById(containerId);
        const statsContainer = chartContainer.parentElement;
        if (!statsContainer || !chartContainer) return;

        const currentLang = localStorage.getItem('lang') || 'zh-CN';
        statsContainer.classList.remove('hidden');
        chartContainer.innerHTML = `<div class="loading-stats"><div class="loading-spinner"></div><p>${translations[currentLang].loadingStats}</p></div>`;

        API.getQuestionResults(questionId)
            .then(results => {
                chartContainer.innerHTML = '';
                if (Object.keys(results).length === 0) {
                    chartContainer.innerHTML = `<p class="no-data">${translations[currentLang].noData}</p>`;
                    return;
                }
                Object.entries(results).forEach(([key, data]) => {
                    const label = translations[currentLang].chartLabels[key] || key;
                    const percentage = parseFloat(data.percentage);
                    const bar = document.createElement('div');
                    bar.className = 'chart-bar';
                    bar.innerHTML = `<div class="chart-label">${label}</div><div class="chart-bar-wrapper"><div class="chart-bar-fill" style="--bar-width: ${percentage}%"><span class="chart-percentage">${percentage}%</span></div></div>`;
                    chartContainer.appendChild(bar);
                });
                setTimeout(() => { chartContainer.querySelectorAll('.chart-bar-fill').forEach(fill => fill.classList.add('animate')); }, 100);
            })
            .catch(error => {
                chartContainer.innerHTML = `<p class="error-message">${translations[currentLang].errorMessage}</p>`;
            });
    };
    const showQ1Stats = () => renderChart('q1ChartContainer', 'biggest_problem');
    const showQ2Stats = () => renderChart('q2ChartContainer', 'hanger_type');

    const loadPublicFeedback = async () => {
        const feedbackContainer = document.getElementById('feedback-wall-container');
        if (!feedbackContainer) return;

        const currentLang = localStorage.getItem('lang') || 'zh-CN';
        feedbackContainer.innerHTML = `<div class="loading-stats"><div class="loading-spinner"></div></div>`;
        
        try {
            const { feedbacks } = await API.getPublicFeedback(10, currentLang);
            
            if (!feedbacks || feedbacks.length === 0) {
                feedbackContainer.innerHTML = `<h3 data-key="feedbackWallTitle">${translations[currentLang].feedbackWallTitle}</h3><p class="no-feedback">${translations[currentLang].noFeedback}</p>`;
                return;
            }

            feedbackContainer.innerHTML = `
                <h3 data-key="feedbackWallTitle">${translations[currentLang].feedbackWallTitle}</h3>
                <div class="feedback-grid">
                    ${feedbacks.map((fb, i) => `<div class="feedback-note" style="animation-delay: ${i * 0.1}s">${fb.content}</div>`).join('')}
                </div>`;
        } catch (error) {
            feedbackContainer.innerHTML = `<h3 data-key="feedbackWallTitle">${translations[currentLang].feedbackWallTitle}</h3><p class="no-feedback error-message">${translations[currentLang].errorMessage}</p>`;
        }
    };
    
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

    const savedLang = localStorage.getItem('lang') || 'zh-CN';
    setLanguage(savedLang);
    updateSlide(0);
    updateCarousel();
    loadParticipantCount();
});

