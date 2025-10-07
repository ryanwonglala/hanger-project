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
            loadingStats: "Loading statistics...",
            // 🔧 新增：图表标签翻译
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
            loadingStats: "加载统计中...",
            // 🔧 新增：图表标签翻译
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
            loadingStats: "載入統計中...",
            // 🔧 新增：图表标签翻译
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
            gender: '',
            age: '',
            occupation: ''
        },
        answers: {},
        openEndedAnswers: []
    };

    // ====== 第一步：加载实时参与人数 ======
    const loadParticipantCount = async () => {
        const counterElement = document.getElementById('participantCount');
        if (!counterElement) return;
        
        try {
            counterElement.style.opacity = '0.5';
            counterElement.textContent = '...';
            
            const count = await API.getTotalParticipants();
            
            counterElement.style.opacity = '1';
            animateCounterSmooth(counterElement, 0, count, 1500);
        } catch (error) {
            console.error('加载参与人数失败:', error);
            counterElement.style.opacity = '1';
            counterElement.textContent = '0';
        }
    };

    const animateCounterSmooth = (element, start, end, duration) => {
        if (start === end) {
            element.textContent = end;
            return;
        }

        const startTime = performance.now();
        const difference = end - start;
        
        const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + difference * easeOutCubic);
            
            element.textContent = current;
            
            if (progress < 1) {
                if (Math.floor(elapsed / 50) % 2 === 0) {
                    element.style.transform = 'scale(1.05)';
                } else {
                    element.style.transform = 'scale(1)';
                }
                requestAnimationFrame(step);
            } else {
                element.textContent = end;
                element.style.transform = 'scale(1)';
            }
        };
        
        requestAnimationFrame(step);
    };

    // --- 3. LANGUAGE FUNCTIONALITY ---
    const setLanguage = (lang) => {
        localStorage.setItem('lang', lang);
        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
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
        if (e.target.hasAttribute('data-lang')) {
            setLanguage(e.target.getAttribute('data-lang'));
        }
    });

    // --- 4. IMAGE CAROUSEL LOGIC ---
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    let currentCarouselIndex = 0;

    const updateCarousel = () => {
        carouselSlides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentCarouselIndex);
        });
    };

    const nextCarouselSlide = () => {
        currentCarouselIndex = (currentCarouselIndex + 1) % carouselSlides.length;
        updateCarousel();
    };

    setInterval(nextCarouselSlide, 4000);

    // --- 5. CORE NAVIGATION ---
    const mediaCarousel = document.querySelector('.media-carousel');
    const slideThemes = ['default', 'theme-plastic', 'theme-metal', 'theme-velvet', 'theme-wood'];

    const updateSlide = (newSlideIndex, direction = 'forward') => {
        if (newSlideIndex < 0 || newSlideIndex >= slides.length) return;

        slides[currentSlide].classList.remove('active');
        slides[newSlideIndex].classList.add('active');
        currentSlide = newSlideIndex;

        updateBackgroundTheme(currentSlide);
        updateProgressBar(direction);

        if (currentSlide >= 2 && currentSlide <= 4) {
            mediaCarousel.classList.add('hidden');
        } else {
            mediaCarousel.classList.remove('hidden');
        }

        // ====== 🆕 第三步：进入页面时自动显示统计 ======
        if (currentSlide === 2 && document.getElementById('biggestProblem').value) {
            showQ1Stats();
        }

        if (currentSlide === 3) {
            const selectedHangerType = document.querySelector('input[name="hanger_type"]:checked');
            if (selectedHangerType) {
                showQ2Stats();
            }
        }
        // ====== 结束第三步 ======
    };

    const updateBackgroundTheme = (slideIndex) => {
        document.body.className = '';
        const themeIndex = Math.min(slideIndex, slideThemes.length - 1);
        if (slideThemes[themeIndex] !== 'default') {
            document.body.classList.add(slideThemes[themeIndex]);
        }
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
        if (currentSlide === 0 || currentSlide === slides.length - 1) {
            progressContainer.style.opacity = '0';
        } else {
            progressContainer.style.opacity = '1';
        }
    };

    const handleNavigation = async (e) => {
        const target = e.target;
        
        if (target.classList.contains('submit-btn')) {
            e.preventDefault();
            await handleSurveySubmit();
            return;
        }
        
        if (target.classList.contains('next-btn')) {
            e.preventDefault();
            updateSlide(currentSlide + 1, 'forward');
        } 
        else if (target.classList.contains('prev-btn')) {
            e.preventDefault();
            updateSlide(currentSlide - 1, 'backward');
        }
    };

    const handleSurveySubmit = async () => {
        try {
            collectSurveyData();

            if (!validateSurveyData()) {
                alert('请完整填写所有问题');
                return;
            }

            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = '提交中...';

            console.log('📤 提交数据:', surveyAnswers);
            const response = await API.submitSurvey(surveyAnswers);
            console.log('✅ 提交成功:', response);

            createConfetti();
            showSuccessBadge();

            setTimeout(() => {
                updateSlide(currentSlide + 1, 'forward');
                setTimeout(loadParticipantCount, 500);
            }, 800);

        } catch (error) {
            console.error('❌ 提交失败:', error);
            alert('提交失败，请稍后重试');
            
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.disabled = false;
            submitBtn.textContent = translations[localStorage.getItem('lang') || 'zh-CN'].submitBtn;
        }
    };

    const collectSurveyData = () => {
        surveyAnswers.demographics = {
            gender: '男',
            age: '26-30',
            occupation: '其他'
        };

        const biggestProblem = document.getElementById('biggestProblem').value;
        if (biggestProblem) {
            surveyAnswers.answers.biggest_problem = biggestProblem;
        }

        const hangerType = document.querySelector('input[name="hanger_type"]:checked');
        if (hangerType) {
            surveyAnswers.answers.hanger_type = hangerType.value;
            
            if (hangerType.value === 'custom') {
                const customInput = document.getElementById('customInput').value;
                if (customInput.trim()) {
                    surveyAnswers.openEndedAnswers.push({
                        questionId: 'hanger_type_custom',
                        questionText: '您使用的其他类型衣架',
                        answer: customInput.trim()
                    });
                }
            }
        }

        const buyInterest = document.getElementById('interestSlider').value;
        if (buyInterest) {
            surveyAnswers.answers.buy_interest = parseInt(buyInterest);
        }

        console.log('📋 收集到的数据:', surveyAnswers);
    };

    const validateSurveyData = () => {
        if (!surveyAnswers.answers.biggest_problem) {
            console.warn('❌ 缺少：最大的衣架问题');
            return false;
        }
        
        if (!surveyAnswers.answers.hanger_type) {
            console.warn('❌ 缺少：衣架类型');
            return false;
        }
        
        if (!surveyAnswers.answers.buy_interest) {
            console.warn('❌ 缺少：购买意愿');
            return false;
        }

        console.log('✅ 数据验证通过');
        return true;
    };

    document.body.addEventListener('click', handleNavigation);
    document.body.addEventListener('touchend', handleNavigation);

    // --- 6. INTERACTIVE QUESTIONS ---
    const problems = document.querySelectorAll('.problem-card');
    const dropZone = document.getElementById('dropZone');
    const hiddenInput = document.getElementById('biggestProblem');
    const nextBtnSlide2 = document.querySelector('[data-slide="2"] .next-btn');

    let draggedItem = null;
    let offsetX = 0, offsetY = 0;
    let isDragging = false;
    let animationFrameId = null;

    const onDragStart = (e) => {
        if (isDragging || hiddenInput.value) return;

        draggedItem = e.target.closest('.problem-card');
        if (!draggedItem) return;

        isDragging = true;
        const rect = draggedItem.getBoundingClientRect();

        if (e.type === 'touchstart') {
            const touch = e.touches[0];
            offsetX = touch.clientX - rect.left;
            offsetY = touch.clientY - rect.top;
        } else {
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
        }

        draggedItem.classList.add('dragging');
        draggedItem.style.width = `${rect.width}px`;
        draggedItem.style.height = `${rect.height}px`;

        moveElement(e);
        document.addEventListener('mousemove', onDragMove);
        document.addEventListener('touchmove', onDragMove, { passive: false });
        document.addEventListener('mouseup', onDragEnd);
        document.addEventListener('touchend', onDragEnd);
    };

    const onDragMove = (e) => {
        e.preventDefault();
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(() => moveElement(e));
    };

    const moveElement = (e) => {
        if (!isDragging || !draggedItem) return;

        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

        const x = clientX - offsetX;
        const y = clientY - offsetY;

        draggedItem.style.left = `${x}px`;
        draggedItem.style.top = `${y}px`;

        const dropZoneRect = dropZone.getBoundingClientRect();
        if (clientX > dropZoneRect.left && clientX < dropZoneRect.right &&
            clientY > dropZoneRect.top && clientY < dropZoneRect.bottom) {
            dropZone.classList.add('drag-over');
        } else {
            dropZone.classList.remove('drag-over');
        }
    };

    const onDragEnd = (e) => {
        if (!isDragging || !draggedItem) return;

        const clientX = e.type.includes('touch') ? e.changedTouches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.changedTouches[0].clientY : e.clientY;

        const dropZoneRect = dropZone.getBoundingClientRect();
        if (clientX > dropZoneRect.left && clientX < dropZoneRect.right &&
            clientY > dropZoneRect.top && clientY < dropZoneRect.bottom) {
            hiddenInput.value = draggedItem.dataset.value;
            dropZone.innerHTML = `<div class="dropped-item">${draggedItem.innerHTML}</div>`;
            dropZone.classList.add('dropped');
            nextBtnSlide2.classList.remove('hidden');
            problems.forEach(p => { if (p !== draggedItem) p.style.opacity = '0.4'; });
            draggedItem.remove();
            
            // ====== 🆕 第三步：拖拽完成后自动显示统计 ======
            showQ1Stats();
            // ====== 结束第三步 ======
        } else {
            draggedItem.classList.remove('dragging');
            draggedItem.style.left = '';
            draggedItem.style.top = '';
            draggedItem.style.width = '';
            draggedItem.style.height = '';
        }

        dropZone.classList.remove('drag-over');
        isDragging = false;
        draggedItem = null;
        document.removeEventListener('mousemove', onDragMove);
        document.removeEventListener('touchmove', onDragMove);
        document.removeEventListener('mouseup', onDragEnd);
        document.removeEventListener('touchend', onDragEnd);
    };

    problems.forEach(problem => {
        problem.addEventListener('mousedown', onDragStart);
        problem.addEventListener('touchstart', onDragStart);
    });

    // Q2: Radio button interaction
    const hangerTypeRadios = document.querySelectorAll('input[name="hanger_type"]');
    const customOption = document.getElementById('customOption');
    const blackboardModal = document.getElementById('blackboardModal');
    const blackboardInput = document.getElementById('customInput');
    const blackboardSubmit = document.querySelector('.blackboard-submit');
    const blackboardClose = document.querySelector('.blackboard-close');

    hangerTypeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'custom') {
                blackboardModal.classList.add('active');
                blackboardInput.focus();
            } else {
                // ====== 🆕 第三步：选择选项后自动显示统计 ======
                showQ2Stats();
                // ====== 结束第三步 ======
            }
        });
    });

    const closeBlackboard = () => {
        blackboardModal.classList.remove('active');
        blackboardInput.value = '';
        customOption.checked = false;
    };

    blackboardClose.addEventListener('click', closeBlackboard);
    blackboardModal.addEventListener('click', (e) => {
        if (e.target === blackboardModal) closeBlackboard();
    });

    blackboardSubmit.addEventListener('click', () => {
        if (blackboardInput.value.trim()) {
            customOption.checked = true;
            blackboardModal.classList.remove('active');
            // ====== 🆕 第三步：自定义输入后也显示统计 ======
            showQ2Stats();
            // ====== 结束第三步 ======
        }
    });

    // Q3: Emoji Slider
    const interestSlider = document.getElementById('interestSlider');
    const sliderDisplay = document.getElementById('sliderValue');
    const sliderEmojis = ['🤧', '😕', '🤔', '😊', '😍'];

    if (interestSlider) {
        interestSlider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            sliderDisplay.textContent = sliderEmojis[value - 1];
            sliderDisplay.style.transform = 'scale(1.2)';
            setTimeout(() => sliderDisplay.style.transform = 'scale(1)', 200);
        });
    }

    // ====== 🆕 第三步：从API获取统计数据 ======
    
    // 问题1的统计显示 - 从API获取真实数据
    const showQ1Stats = async () => {
        const statsContainer = document.getElementById('q1Stats');
        const chartContainer = document.getElementById('q1ChartContainer');
        if (!statsContainer || !chartContainer) return;

        try {
            // 🔧 获取当前语言
            const currentLang = localStorage.getItem('lang') || 'zh-CN';
            
            // 显示加载状态
            statsContainer.classList.remove('hidden');
            chartContainer.innerHTML = `
                <div class="loading-stats">
                    <div class="loading-spinner"></div>
                    <p>${translations[currentLang].loadingStats}</p>
                </div>
            `;

            console.log('📊 获取问题1统计数据...');
            
            // 从API获取真实数据
            const results = await API.getQuestionResults('biggest_problem');
            console.log('✅ 问题1统计数据:', results);

            // 清空容器并生成图表
            chartContainer.innerHTML = '';
            
            if (Object.keys(results).length === 0) {
                chartContainer.innerHTML = `<p class="no-data">${translations[currentLang].noData}</p>`;
                return;
            }

            Object.entries(results).forEach(([key, data]) => {
                // 🔧 使用当前语言的标签
                const label = translations[currentLang].chartLabels[key] || key;
                const percentage = parseFloat(data.percentage);
                
                const bar = document.createElement('div');
                bar.className = 'chart-bar';
                bar.innerHTML = `
                    <div class="chart-label">${label}</div>
                    <div class="chart-bar-wrapper">
                        <div class="chart-bar-fill" style="--bar-width: ${percentage}%">
                            <span class="chart-percentage">${percentage}%</span>
                        </div>
                    </div>
                `;
                chartContainer.appendChild(bar);
            });

            // 触发动画
            setTimeout(() => {
                chartContainer.querySelectorAll('.chart-bar-fill').forEach(fill => {
                    fill.classList.add('animate');
                });
            }, 100);

        } catch (error) {
            console.error('❌ 获取问题1统计失败:', error);
            const currentLang = localStorage.getItem('lang') || 'zh-CN';
            chartContainer.innerHTML = `<p class="error-message">${translations[currentLang].errorMessage}</p>`;
        }
    };

    // 问题2的统计显示 - 从API获取真实数据
    const showQ2Stats = async () => {
        const statsContainer = document.getElementById('q2Stats');
        const chartContainer = document.getElementById('q2ChartContainer');
        if (!statsContainer || !chartContainer) return;

        try {
            // 🔧 获取当前语言
            const currentLang = localStorage.getItem('lang') || 'zh-CN';
            
            // 显示加载状态
            statsContainer.classList.remove('hidden');
            chartContainer.innerHTML = `
                <div class="loading-stats">
                    <div class="loading-spinner"></div>
                    <p>${translations[currentLang].loadingStats}</p>
                </div>
            `;

            console.log('📊 获取问题2统计数据...');
            
            // 从API获取真实数据
            const results = await API.getQuestionResults('hanger_type');
            console.log('✅ 问题2统计数据:', results);

            // 清空容器并生成图表
            chartContainer.innerHTML = '';
            
            if (Object.keys(results).length === 0) {
                chartContainer.innerHTML = `<p class="no-data">${translations[currentLang].noData}</p>`;
                return;
            }

            Object.entries(results).forEach(([key, data]) => {
                // 🔧 使用当前语言的标签
                const label = translations[currentLang].chartLabels[key] || key;
                const percentage = parseFloat(data.percentage);
                
                const bar = document.createElement('div');
                bar.className = 'chart-bar';
                bar.innerHTML = `
                    <div class="chart-label">${label}</div>
                    <div class="chart-bar-wrapper">
                        <div class="chart-bar-fill" style="--bar-width: ${percentage}%">
                            <span class="chart-percentage">${percentage}%</span>
                        </div>
                    </div>
                `;
                chartContainer.appendChild(bar);
            });

            // 触发动画
            setTimeout(() => {
                chartContainer.querySelectorAll('.chart-bar-fill').forEach(fill => {
                    fill.classList.add('animate');
                });
            }, 100);

        } catch (error) {
            console.error('❌ 获取问题2统计失败:', error);
            const currentLang = localStorage.getItem('lang') || 'zh-CN';
            chartContainer.innerHTML = `<p class="error-message">${translations[currentLang].errorMessage}</p>`;
        }
    };
    // ====== 结束第三步 ======

    // --- 9. CELEBRATION ANIMATION ---
    const celebrationContainer = document.getElementById('celebrationContainer');

    const createConfetti = () => {
        console.log('🎉 触发彩带动画');
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.textContent = ['🎉', '✨', '🎊', '⭐'][Math.floor(Math.random() * 4)];
            confetti.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}vw;
                top: -20px;
                font-size: ${Math.random() * 20 + 20}px;
                animation: confettiFall ${Math.random() * 2 + 2}s linear forwards;
                pointer-events: none;
                z-index: 9999;
            `;
            celebrationContainer.appendChild(confetti);
            setTimeout(() => confetti.remove(), 4000);
        }
    };

    const showSuccessBadge = () => {
        console.log('✅ 显示成功徽章');
        const badge = document.createElement('div');
        badge.className = 'success-badge';
        celebrationContainer.appendChild(badge);
        setTimeout(() => badge.remove(), 2000);
    };

    if (!document.querySelector('#confetti-style')) {
        const style = document.createElement('style');
        style.id = 'confetti-style';
        style.textContent = `
            @keyframes confettiFall {
                to { 
                    transform: translateY(100vh) rotate(360deg); 
                    opacity: 0; 
                }
            }
        `;
        document.head.appendChild(style);
    }

    // --- 10. INITIALIZE ---
    const savedLang = localStorage.getItem('lang') || 'zh-CN';
    setLanguage(savedLang);
    updateSlide(0);
    updateCarousel();
    loadParticipantCount();
});