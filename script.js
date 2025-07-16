// Navigation menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    document.querySelector('.menu-toggle').classList.remove('active');
                }
            }
        });
    });

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Newsletter Signup Form Handler
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const emailInput = document.getElementById('signup-email');
            const submitButton = signupForm.querySelector('button[type="submit"]');
            const email = emailInput.value;
            
            if (!email) {
                return;
            }

            // Disable form while submitting
            emailInput.disabled = true;
            submitButton.disabled = true;
            
            const SHEETDB_API = 'https://sheetdb.io/api/v1/c7rmfhqyqyhkg';
            const data = {
                data: {
                    email: email
                }
            };

            try {
                const res = await fetch(SHEETDB_API, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (res.ok) {
                    alert('Thank you! You\'re on the early access list.');
                    signupForm.reset();
                } else {
                    alert('There was a problem. Please try again.');
                }
            } catch (err) {
                console.error('Newsletter signup error:', err);
                alert('There was a problem. Please try again.');
            } finally {
                // Re-enable form
                emailInput.disabled = false;
                submitButton.disabled = false;
            }
        });
    }

    // Helper function to show form messages
    function showFormMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        // Remove any existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Add new message after the form
        signupForm.insertAdjacentElement('afterend', messageDiv);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    // Add active class to nav links based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a');
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                const id = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('text-[var(--primary-color)]');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('text-[var(--primary-color)]');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
});

// Analytics tracking
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Cookie consent
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Initialize cookie consent if not already accepted
if (!getCookie('cookieConsent')) {
    const cookieConsent = document.createElement('div');
    cookieConsent.className = 'cookie-consent';
    cookieConsent.innerHTML = `
        <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
        <button onclick="acceptCookies()">Accept</button>
    `;
    document.body.appendChild(cookieConsent);
}

function acceptCookies() {
    setCookie('cookieConsent', 'accepted', 365);
    document.querySelector('.cookie-consent').remove();
}

// Demo Modal Functions
function openDemoModal() {
    const modal = document.getElementById('demoModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeDemoModal() {
    const modal = document.getElementById('demoModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Close modal when clicking outside
document.getElementById('demoModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeDemoModal();
    }
});

// Demo Form Submission
document.getElementById('demo-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        company: document.getElementById('company').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // Use your SheetDB API endpoint for demo requests
    const SHEETDB_API = 'https://sheetdb.io/api/v1/c7rmfhqyqyhkg';
    const data = { data: formData };

    try {
        const res = await fetch(SHEETDB_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            alert('Thank you for your interest! We\'ll be in touch soon.');
            this.reset();
            closeDemoModal();
        } else {
            alert('There was a problem submitting your request. Please try again.');
        }
    } catch (err) {
        console.error('Demo request error:', err);
        alert('There was a problem submitting your request. Please try again.');
    }
}); 