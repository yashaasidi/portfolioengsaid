document.addEventListener('DOMContentLoaded', () => {

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'var(--nav-bg)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'var(--nav-bg)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Form Submission Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const type = document.getElementById('project-type').value;
            const message = document.getElementById('message').value;

            // Prepare the Email Data
            const subject = `Project Inquiry: ${type}`;
            const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
            const mailtoLink = `mailto:smustafahmed@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            Swal.fire({
                title: 'Sending to Said...',
                html: '<b>Preparing your message</b><br>Opening your secure email client',
                icon: 'info',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                background: document.body.classList.contains('light-theme') ? '#ffffff' : '#1c2333',
                color: document.body.classList.contains('light-theme') ? '#0f172a' : '#ffffff',
                didOpen: () => {
                    Swal.showLoading();
                }
            }).then(() => {
                // Open the mail client
                window.location.href = mailtoLink;

                // Show success message
                Swal.fire({
                    title: 'Redirected!',
                    text: 'Your email app should be open with the message ready. Just click SEND!',
                    icon: 'success',
                    confirmButtonColor: '#3B82F6',
                    background: document.body.classList.contains('light-theme') ? '#ffffff' : '#1c2333',
                    color: document.body.classList.contains('light-theme') ? '#0f172a' : '#ffffff'
                });
                contactForm.reset();
            });
        });
    }

    // Mobile Menu Toggle (Basic implementation)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check for saved user preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        body.classList.add('light-theme');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-theme');

            if (body.classList.contains('light-theme')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                localStorage.setItem('theme', 'light');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.project-card, .detail-image, .detail-content, .hero-content, .about-card');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

});
