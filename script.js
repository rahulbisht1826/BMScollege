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

    // --- Shuffle Stack Video Gallery Logic ---
    const videoStack = document.getElementById('videoStack');
    const cards = document.querySelectorAll('.video-card');
    const nextShuffleBtn = document.getElementById('nextShuffle');
    const prevShuffleBtn = document.getElementById('prevShuffle');

    if (videoStack && cards.length > 0) {
        let currentIndex = 0;
        let shuffleInterval;

        const updateStack = () => {
            cards.forEach((card, index) => {
                // Calculate position relative to top card
                let pos = (index - currentIndex + cards.length) % cards.length;

                // Assign positions: 0 is top, 1, 2, 3 are visible stack, others are hidden
                if (pos >= 4) pos = -1; // Cards beyond 3 layers are hidden

                card.setAttribute('data-pos', pos);

                // Manage active state (overlay visibility)
                if (pos === 0) {
                    card.classList.add('active');
                    const video = card.querySelector('video');
                    if (video) {
                        video.muted = true; // Ensure it's muted
                        video.controls = true; // Show controls
                        video.play().catch(e => console.warn("Autoplay blocked", e));
                    }
                } else {
                    card.classList.remove('active');
                    const video = card.querySelector('video');
                    if (video) {
                        video.controls = false; // Hide controls
                        video.pause();
                    }
                }
            });
        };

        const shuffleNext = () => {
            const topCard = document.querySelector('.video-card[data-pos="0"]');
            if (topCard) {
                topCard.classList.add('shuffling-left');

                setTimeout(() => {
                    currentIndex = (currentIndex + 1) % cards.length;
                    updateStack();
                    topCard.classList.remove('shuffling-left');
                }, 400); // Wait for transition out
            }
        };

        const shufflePrev = () => {
            // To shuffle back, we bring the "last" card to the front
            // We animate the current top card to the right first
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            const newTop = cards[currentIndex];
            newTop.classList.add('shuffling-right');

            updateStack();

            setTimeout(() => {
                newTop.classList.remove('shuffling-right');
            }, 50);
        };

        // Auto Shuffle every 2 seconds
        const startAutoShuffle = () => {
            shuffleInterval = setInterval(shuffleNext, 2000);
        };

        const stopAutoShuffle = () => {
            clearInterval(shuffleInterval);
        };

        // Event Listeners
        if (nextShuffleBtn) {
            nextShuffleBtn.addEventListener('click', () => {
                stopAutoShuffle();
                shuffleNext();
                startAutoShuffle();
            });
        }

        if (prevShuffleBtn) {
            prevShuffleBtn.addEventListener('click', () => {
                stopAutoShuffle();
                shufflePrev();
                startAutoShuffle();
            });
        }

        // Initialize
        updateStack();
        startAutoShuffle();

        // Pause on hover
        videoStack.addEventListener('mouseenter', stopAutoShuffle);
        videoStack.addEventListener('mouseleave', startAutoShuffle);
    }
});
