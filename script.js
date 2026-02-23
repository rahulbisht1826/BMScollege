document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.scroll-reveal');
    scrollElements.forEach(el => observer.observe(el));

    // Sticky Header Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Faculty Slider Logic
    const facultySlider = document.querySelector('.faculty-slider');
    const facultyCards = document.querySelectorAll('.faculty-card-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (facultySlider && facultyCards.length > 0) {
        let currentIndex = 0;
        const totalCards = facultyCards.length;
        let slideInterval;

        // Shuffle cards initially for the "auto shuffling" effect
        const cardsArray = Array.from(facultyCards);
        cardsArray.sort(() => Math.random() - 0.5);
        facultySlider.innerHTML = '';
        cardsArray.forEach(card => facultySlider.appendChild(card));

        // Re-calculate after shuffle
        const updatedCards = document.querySelectorAll('.faculty-card-slider');

        function getVisibleCards() {
            if (window.innerWidth <= 600) return 1;
            if (window.innerWidth <= 992) return 2;
            return 3;
        }

        function updateSlider() {
            const visibleCards = getVisibleCards();
            const cardWidth = updatedCards[0].offsetWidth + 30; // card + gap

            if (currentIndex > totalCards - visibleCards) {
                currentIndex = 0;
            } else if (currentIndex < 0) {
                currentIndex = totalCards - visibleCards;
            }

            facultySlider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }

        function startAutoSlide() {
            slideInterval = setInterval(() => {
                currentIndex++;
                updateSlider();
            }, 2000);
        }

        function stopAutoSlide() {
            clearInterval(slideInterval);
        }

        // Initialize
        startAutoSlide();

        // Navigation controls
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                stopAutoSlide();
                currentIndex--;
                updateSlider();
                startAutoSlide();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                stopAutoSlide();
                currentIndex++;
                updateSlider();
                startAutoSlide();
            });
        }

        // Pause on hover
        updatedCards.forEach(card => {
            card.addEventListener('mouseenter', stopAutoSlide);
            card.addEventListener('mouseleave', startAutoSlide);
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            currentIndex = 0;
            updateSlider();
        });

        // --- Know More / Modal Logic ---
        const modal = document.getElementById('facultyModal');
        const closeModal = document.querySelector('.close-modal');
        const knowMoreBtns = document.querySelectorAll('.btn-know-more');

        knowMoreBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const name = btn.getAttribute('data-name');
                const field = btn.getAttribute('data-field');
                const extra = btn.getAttribute('data-extra');

                document.getElementById('modalName').textContent = name;
                document.getElementById('modalField').textContent = field;
                document.getElementById('modalExtra').textContent = extra;

                modal.style.display = 'flex';
                stopAutoSlide();
            });
        });

        if (closeModal) {
            closeModal.addEventListener('click', () => {
                modal.style.display = 'none';
                startAutoSlide();
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target == modal) {
                modal.style.display = 'none';
                startAutoSlide();
            }
        });
    }

    // Expanding Gallery Logic
    const galleryOptions = document.querySelectorAll('.gallery-option');
    if (galleryOptions.length > 0) {
        galleryOptions.forEach(option => {
            option.addEventListener('click', () => {
                galleryOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
            });
        });
    }


});
