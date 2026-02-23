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

    // Mobile Menu Toggle — with stagger animation reset
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = navLinks ? navLinks.querySelectorAll('li') : [];

    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navLinks.classList.contains('active');

            if (!isOpen) {
                // Reset each item's animation so it replays
                navItems.forEach(li => {
                    li.style.animation = 'none';
                    li.offsetHeight; // force reflow
                    li.style.animation = '';
                });
                navLinks.classList.add('active');
                hamburger.setAttribute('aria-expanded', 'true');
            } else {
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu when clicking anywhere outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu when a nav link is clicked
        navItems.forEach(li => {
            li.querySelector('a')?.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
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

    // Faculty Modal Logic
    const facultyModal = document.getElementById('facultyModal');
    const modalClose = document.getElementById('modalClose');
    const knowMoreBtns = document.querySelectorAll('.btn-know-more-card');

    const modalImg = document.getElementById('modalImg');
    const modalName = document.getElementById('modalName');
    const modalTag = document.getElementById('modalTag');
    const modalExp = document.getElementById('modalExp');
    const modalEdu = document.getElementById('modalEdu');
    const modalBio = document.getElementById('modalBio');

    if (facultyModal && knowMoreBtns.length > 0) {
        knowMoreBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Populate Modal Data
                modalImg.src = btn.getAttribute('data-img');
                modalImg.alt = btn.getAttribute('data-name');
                modalName.textContent = btn.getAttribute('data-name');
                modalTag.textContent = btn.getAttribute('data-tag');
                modalExp.textContent = btn.getAttribute('data-exp');
                modalEdu.textContent = btn.getAttribute('data-edu');
                modalBio.textContent = btn.getAttribute('data-bio');

                // Show Modal
                facultyModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        // Close Modal
        const closeModal = () => {
            facultyModal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        };

        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        // Close on clicking outside
        facultyModal.addEventListener('click', (e) => {
            if (e.target === facultyModal) {
                closeModal();
            }
        });
    }


});
