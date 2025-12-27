// Main JavaScript for Blog Site

document.addEventListener('DOMContentLoaded', function() {

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all blog cards
    document.querySelectorAll('.blog-card').forEach(card => {
        observer.observe(card);
    });

    // Observe other animated elements
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });

    // Contact form handling
    const contactForm = document.querySelector('#contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            // Show loading state
            submitBtn.innerHTML = '<span class="loading"></span> Sending...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual form handling)
            setTimeout(function() {
                // Get form data
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData);

                // You can integrate with services like Formspree, Netlify Forms, or your own backend
                console.log('Form data:', data);

                // Show success message
                showAlert('Message sent successfully! I\'ll get back to you soon.', 'success');

                // Reset form
                contactForm.reset();

                // Restore button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Alert function
    function showAlert(message, type = 'info') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="close" data-dismiss="alert">
                <span>&times;</span>
            </button>
        `;

        document.body.appendChild(alertDiv);

        setTimeout(function() {
            alertDiv.remove();
        }, 5000);
    }

    // Search functionality (if search box exists)
    const searchInput = document.querySelector('#search-input');

    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const blogCards = document.querySelectorAll('.blog-card');

            blogCards.forEach(card => {
                const title = card.querySelector('.card-title').textContent.toLowerCase();
                const text = card.querySelector('.card-text').textContent.toLowerCase();

                if (title.includes(searchTerm) || text.includes(searchTerm)) {
                    card.closest('.col-md-4').style.display = '';
                } else {
                    card.closest('.col-md-4').style.display = 'none';
                }
            });
        });
    }

    // Reading time calculator for blog posts
    const postContent = document.querySelector('.post-content');

    if (postContent) {
        const text = postContent.textContent;
        const wordsPerMinute = 200;
        const wordCount = text.trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / wordsPerMinute);

        const readingTimeElement = document.querySelector('.reading-time');
        if (readingTimeElement) {
            readingTimeElement.textContent = `${readingTime} min read`;
        }
    }

    // Mobile menu close on link click
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                document.querySelector('.navbar-toggler').click();
            }
        });
    });

    // Copy code blocks to clipboard
    const codeBlocks = document.querySelectorAll('pre code');

    codeBlocks.forEach(block => {
        const button = document.createElement('button');
        button.className = 'btn btn-sm btn-outline-light copy-code-btn';
        button.textContent = 'Copy';
        button.style.cssText = 'position: absolute; top: 10px; right: 10px;';

        const pre = block.parentElement;
        pre.style.position = 'relative';
        pre.appendChild(button);

        button.addEventListener('click', function() {
            const code = block.textContent;
            navigator.clipboard.writeText(code).then(function() {
                button.textContent = 'Copied!';
                setTimeout(function() {
                    button.textContent = 'Copy';
                }, 2000);
            });
        });
    });

    // Dark mode toggle (optional feature)
    const darkModeToggle = document.querySelector('#dark-mode-toggle');

    if (darkModeToggle) {
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);

        darkModeToggle.addEventListener('click', function() {
            const theme = document.documentElement.getAttribute('data-theme');
            const newTheme = theme === 'light' ? 'dark' : 'light';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Lazy loading images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add animation classes to elements
    const addAnimationClass = (element, animationClass, delay = 0) => {
        setTimeout(() => {
            element.classList.add(animationClass);
        }, delay);
    };

    // Animate elements on page load
    const elementsToAnimate = document.querySelectorAll('.animate-on-load');
    elementsToAnimate.forEach((element, index) => {
        addAnimationClass(element, 'fade-in', index * 100);
    });

});

// Utility function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Utility function to truncate text
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}
