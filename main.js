/**
 * SVD TEMİZLİK - Main JavaScript
 * Handles navigation, animations, modals, and FAQs
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. NAVIGATION & MOBILE MENU
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    const header = document.querySelector('.header');

    // Toggle menu
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');
            navToggle.classList.toggle('show-icon');
            
            // Toggle body scroll
            if (navMenu.classList.contains('show-menu')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Close menu when clicking outside or on a link
    document.addEventListener('click', (e) => {
        if (navMenu && navToggle) {
            // Click outside
            if (navMenu.classList.contains('show-menu') && 
                !navMenu.contains(e.target) && 
                !navToggle.contains(e.target)) {
                
                navMenu.classList.remove('show-menu');
                navToggle.classList.remove('show-icon');
                document.body.style.overflow = '';
            }
        }
    });

    // Close menu when window resizes back to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && navMenu && navMenu.classList.contains('show-menu')) {
            navMenu.classList.remove('show-menu');
            navToggle.classList.remove('show-icon');
            document.body.style.overflow = '';
        }
    });

    // Mobile Dropdown Toggle
    const dropdownItems = document.querySelectorAll('.dropdown__item');
    
    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav__link');
        
        if (link) {
            link.addEventListener('click', (e) => {
                if (window.innerWidth < 768) {
                    e.preventDefault();
                    
                    // Close others
                    dropdownItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('show-dropdown')) {
                            otherItem.classList.remove('show-dropdown');
                        }
                    });
                    
                    // Toggle current
                    item.classList.toggle('show-dropdown');
                }
            });
        }
    });

    // Header scroll effect
    const scrollHeader = () => {
        if (window.scrollY >= 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', scrollHeader);

    // 2. SCROLL REVEAL ANIMATIONS
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    const revealOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. FAQ ACCORDION
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            if (question && answer) {
                question.addEventListener('click', () => {
                    const isOpen = item.classList.contains('active');
                    
                    // Close all
                    faqItems.forEach(otherItem => {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) otherAnswer.style.maxHeight = null;
                    });
                    
                    // Toggle current
                    if (!isOpen) {
                        item.classList.add('active');
                        answer.style.maxHeight = answer.scrollHeight + "px";
                    }
                });
            }
        });
        
        // Open first FAQ by default
        const firstFaq = faqItems[0];
        if (firstFaq) {
            firstFaq.classList.add('active');
            const firstAnswer = firstFaq.querySelector('.faq-answer');
            if (firstAnswer) firstAnswer.style.maxHeight = firstAnswer.scrollHeight + "px";
        }
    }

    // 4. LIGHTBOX/MODAL FOR COMMENTS
    const commentItems = document.querySelectorAll('.comment-item img');
    
    if (commentItems.length > 0) {
        // Create modal DOM structure
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        
        const modalImg = document.createElement('img');
        
        const modalClose = document.createElement('div');
        modalClose.className = 'modal-close';
        modalClose.innerHTML = '&times;';
        
        const modalPrev = document.createElement('div');
        modalPrev.className = 'modal-nav modal-prev';
        modalPrev.innerHTML = '&#10094;';
        
        const modalNext = document.createElement('div');
        modalNext.className = 'modal-nav modal-next';
        modalNext.innerHTML = '&#10095;';
        
        modalOverlay.appendChild(modalClose);
        modalOverlay.appendChild(modalPrev);
        modalOverlay.appendChild(modalImg);
        modalOverlay.appendChild(modalNext);
        document.body.appendChild(modalOverlay);
        
        let currentIndex = 0;
        
        const openModal = (index) => {
            currentIndex = index;
            modalImg.src = commentItems[currentIndex].src;
            modalOverlay.classList.add('active');
            document.body.classList.add('no-scroll');
        };
        
        const closeModal = () => {
            modalOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        };
        
        const showNext = (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % commentItems.length;
            modalImg.src = commentItems[currentIndex].src;
        };
        
        const showPrev = (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + commentItems.length) % commentItems.length;
            modalImg.src = commentItems[currentIndex].src;
        };
        
        // Event listeners
        commentItems.forEach((img, index) => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => openModal(index));
        });
        
        modalClose.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
        modalNext.addEventListener('click', showNext);
        modalPrev.addEventListener('click', showPrev);
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!modalOverlay.classList.contains('active')) return;
            
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowRight') showNext(e);
            if (e.key === 'ArrowLeft') showPrev(e);
        });
        
        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        modalOverlay.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        modalOverlay.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});
        
        const handleSwipe = () => {
            const threshold = 50;
            if (touchEndX < touchStartX - threshold) showNext({stopPropagation: () => {}}); // Swipe left -> Next
            if (touchEndX > touchStartX + threshold) showPrev({stopPropagation: () => {}}); // Swipe right -> Prev
        };
    }

    // 5. SERVICE SLIDER (Used in service detail pages)
    const setupServiceSlider = () => {
        const displayImg = document.getElementById('mediaDisplay');
        const displayVideo = document.getElementById('videoDisplay');
        const prevBtn = document.querySelector('.prev-button');
        const nextBtn = document.querySelector('.next-button');
        
        if (!displayImg && !displayVideo) return; // Not a service page with slider
        
        // We look for a global 'mediaArray' in the page
        // Usually, the page will define window.serviceMedia = [...urls]
        if (!window.serviceMedia || window.serviceMedia.length === 0) return;
        
        let currentIndex = 0;
        
        const updateDisplay = () => {
            const currentMedia = window.serviceMedia[currentIndex];
            const isVideo = currentMedia.includes('.mp4');
            
            if (isVideo) {
                if (displayImg) displayImg.style.display = 'none';
                if (displayVideo) {
                    displayVideo.style.display = 'block';
                    // Sadece ilk Source elementini bul ve güncelle
                    const source = displayVideo.querySelector('source');
                    if (source) {
                        source.src = currentMedia;
                        displayVideo.load();
                        displayVideo.play().catch(e => console.log("Auto-play prevented"));
                    }
                }
            } else {
                if (displayVideo) {
                    displayVideo.style.display = 'none';
                    displayVideo.pause();
                }
                if (displayImg) {
                    displayImg.style.display = 'block';
                    displayImg.src = currentMedia;
                }
            }
        };
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + window.serviceMedia.length) % window.serviceMedia.length;
                updateDisplay();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % window.serviceMedia.length;
                updateDisplay();
            });
        }
    };
    
    // Call slider setup (will safely return early if no slider exists)
    setupServiceSlider();
});