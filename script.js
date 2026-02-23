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

    // Modern Faculty Modal Logic
    const modernModal = document.getElementById('facultyDetailModal');
    const closeModernModal = document.getElementById('closeFacultyModal');
    const knowMoreModernBtns = document.querySelectorAll('.btn-know-more-modern');

    if (modernModal && knowMoreModernBtns.length > 0) {
        knowMoreModernBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const name = btn.getAttribute('data-name');
                const field = btn.getAttribute('data-field');
                const subject = btn.getAttribute('data-subject');
                const details = btn.getAttribute('data-details');
                const imgSrc = btn.closest('.faculty-profile-card').querySelector('img').src;

                document.getElementById('modalName').textContent = name;
                document.getElementById('modalFieldTag').textContent = field;
                document.getElementById('modalSubject').textContent = subject;
                document.getElementById('modalBio').textContent = details;
                document.getElementById('modalImg').src = imgSrc;

                modernModal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Prevent scroll
            });
        });

        const closeModalFunc = () => {
            modernModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };

        if (closeModernModal) {
            closeModernModal.addEventListener('click', closeModalFunc);
        }

        // Close on backdrop click
        modernModal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-backdrop')) {
                closeModalFunc();
            }
        });
    }
});
