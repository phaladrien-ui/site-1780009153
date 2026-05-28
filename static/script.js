Voici le fichier `static/script.js` pour une landing page e-commerce de montres de luxe avec animations et scroll :

// static/script.js - Landing page e-commerce montres de luxe

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ============================================
    // 1. SMOOTH SCROLL NAVIGATION
    // ============================================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // 2. SCROLL ANIMATIONS (Intersection Observer)
    // ============================================
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionnel : arrêter d'observer une fois visible
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => observer.observe(el));

    // ============================================
    // 3. PARALLAX EFFECT ON HERO
    // ============================================
    const heroSection = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroSection && heroContent) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            const heroHeight = heroSection.offsetHeight;
            
            if (scrollPosition <= heroHeight) {
                const translateY = scrollPosition * 0.4;
                const opacity = 1 - (scrollPosition / heroHeight) * 0.5;
                
                heroContent.style.transform = `translateY(${translateY}px)`;
                heroContent.style.opacity = Math.max(opacity, 0.3);
            }
        });
    }

    // ============================================
    // 4. PRODUCT CARD HOVER EFFECTS
    // ============================================
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const overlay = card.querySelector('.product-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
                overlay.style.transform = 'translateY(0)';
            }
        });

        card.addEventListener('mouseleave', () => {
            const overlay = card.querySelector('.product-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
                overlay.style.transform = 'translateY(20px)';
            }
        });
    });

    // ============================================
    // 5. COUNTER ANIMATION (statistiques)
    // ============================================
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = parseInt(target.getAttribute('data-target'));
                const duration = 2000;
                const step = Math.ceil(targetValue / (duration / 16));
                let currentValue = 0;

                const updateCounter = () => {
                    currentValue += step;
                    if (currentValue >= targetValue) {
                        target.textContent = targetValue;
                        return;
                    }
                    target.textContent = currentValue;
                    requestAnimationFrame(updateCounter);
                };

                updateCounter();
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ============================================
    // 6. NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    if (navbar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove shadow class
            if (scrollTop > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }

            // Hide/show navbar on scroll down/up
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // ============================================
    // 7. IMAGE ZOOM ON HOVER (gallery)
    // ============================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * -10;
                const rotateY = (x - centerX) / centerX * 10;
                
                img.style.transform = `scale(1.1) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            item.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1) rotateX(0) rotateY(0)';
            });
        }
    });

    // ============================================
    // 8. TESTIMONIALS CAROUSEL (auto-play)
    // ============================================
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    let testimonialInterval;

    const showTestimonial = (index) => {
        testimonials.forEach((t, i) => {
            t.classList.remove('active');
            if (i === index) {
                t.classList.add('active');
            }
        });
    };

    const nextTestimonial = () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    };

    if (testimonials.length > 1) {
        showTestimonial(0);
        testimonialInterval = setInterval(nextTestimonial, 5000);

        // Pause on hover
        const testimonialContainer = document.querySelector('.testimonials-container');
        if (testimonialContainer) {
            testimonialContainer.addEventListener('mouseenter', () => {
                clearInterval(testimonialInterval);
            });
            testimonialContainer.addEventListener('mouseleave', () => {
                testimonialInterval = setInterval(nextTestimonial, 5000);
            });
        }
    }

    // ============================================
    // 9. BACK TO TOP BUTTON
    // ============================================
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Retour en haut');
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ============================================
    // 10. LOADING ANIMATION
    // ============================================
    const loader = document.querySelector('.loader');
    if (loader) {
        window.addEventListener('load', () => {
            loader.classList.add('loader-hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        });
    }

    // ============================================
    // 11. WATCH 3D TILT EFFECT
    // ============================================
    const watchImages = document.querySelectorAll('.watch-3d');
    
    watchImages.forEach(watch => {
        watch.addEventListener('mousemove', (e) => {
            const rect = watch.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -15;
            const rotateY = (x - centerX) / centerX * 15;
            
            watch.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        watch.addEventListener('mouseleave', () => {
            watch.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // ============================================
    // 12. PRICE FILTER (range slider)
    // ============================================
    const priceRange = document.querySelector('.price-range');
    const priceValue = document.querySelector('.price-value');
    
    if (priceRange && priceValue) {
        priceRange.addEventListener('input', () => {
            priceValue.textContent = `${priceRange.value} €`;
            
            // Filter products (simulation)
            const products = document.querySelectorAll('.product-card');
            const maxPrice = parseInt(priceRange.value);
            
            products.forEach(product => {
                const productPrice = parseInt(product.getAttribute('data-price'));
                if (productPrice <= maxPrice) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    }

    // ============================================
    // 13. ADD TO CART ANIMATION
    // ============================================
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Animation feedback
            button.classList.add('added');
            button.textContent = '✓ Ajouté';
            
            setTimeout(() => {
                button.classList.remove('added');
                button.textContent = 'Ajouter au panier';
            }, 2000);

            // Cart counter update
            const cartCounter = document.querySelector('.cart-counter');
            if (cartCounter) {
                const currentCount = parseInt(cartCounter.textContent);
                cartCounter.textContent = currentCount + 1;
                cartCounter.classList.add('bounce');
                
                setTimeout(() => {
                    cartCounter.classList.remove('bounce');
                }, 300);
            }
        });
    });

    // ============================================
    // 14. NEWSLETTER FORM
    // ============================================
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Success animation
                const successMessage = document.createElement('p');
                successMessage.className = 'newsletter-success';
                successMessage.textContent = 'Merci pour votre inscription !';
                
                newsletterForm.innerHTML = '';
                newsletterForm.appendChild(successMessage);
                
                // Reset after 3 seconds
                setTimeout(() => {
                    successMessage.textContent = 'Inscription réussie ✓';
                }, 3000);
            }
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // ============================================
    // 15. RESPONSIVE MENU TOGGLE
    // ============================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });

        // Close menu on link click
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // ============================================
    // 16. SCROLL PROGRESS BAR
    // ============================================
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = `${scrollPercent}%`;
    });

    // ============================================
    // 17. PRODUCT QUICK VIEW (modal simulation)
    // ============================================
    const quickViewButtons = document.querySelectorAll('.quick-view');
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'quick-view-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="modal-close">&times;</span>
                    <h3>${productName}</h3>
                    <p class="modal-price">${productPrice}</p>
                    <p class="modal-description">Montre de luxe avec mouvement automatique suisse, boîtier en acier inoxydable et bracelet en cuir véritable.</p>
                    <button class="btn btn-primary add-to-cart">Ajouter au panier</button>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Show modal with animation
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            
            // Close modal
            const closeBtn = modal.querySelector('.modal-close');
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
                setTimeout(() => {
                    modal.remove();
                }, 300);
            });
            
            // Close on click outside
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    setTimeout(() => {
                        modal.remove();
                    }, 300);
                }
            });
        });
    });

    // ============================================
    // 18. LAZY LOADING IMAGES
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    }, { rootMargin: '100px' });

    lazyImages.forEach(img => imageObserver.observe(img));

    // ============================================
    // 19. COLOR SWATCH SELECTION
    // ============================================
    const colorSwatches = document.querySelectorAll('.color-swatch');
    
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            const parent = swatch.closest('.product-colors');
            parent.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
            swatch.classList.add('selected');
            
            // Update product image (simulation)
            const productCard = swatch.closest('.product-card');
            const productImage = productCard.querySelector('.product-image');
            const color = swatch.getAttribute('data-color');
            
            if (productImage && color) {
                productImage.style.borderColor = color;
                // In real scenario: productImage.src = `images/watch-${color}.jpg`;
            }
        });
    });

    // ============================================
    // 20. PERFORMANCE OPTIMIZATION
    // ============================================
    // Debounce scroll events
    let isScrolling;
    window.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            // Execute after scroll ends
        }, 66);
    }, false);

    // Throttle resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        if (!resizeTimeout) {
            resizeTimeout = setTimeout(() => {
                resizeTimeout = null;
                // Execute resize logic here
            }, 200);
        }
    });

    console.log('✓ Landing page animations initialized');
});

Ce fichier JavaScript inclut :

1. **Navigation smooth scroll** - Défilement fluide vers les sections
2. **Animations au scroll** - Utilisation d'Intersection Observer
3. **Effet parallax** - Sur la