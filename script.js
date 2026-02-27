document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-xmark');
        });
    });

    // Registration Form & WhatsApp Integration
    const registrationForm = document.getElementById('noorIftarSeriesForm');
    const WHATSAPP_NUMBER = '917012531842';

    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(registrationForm);
        const data = {
            name: formData.get('fullName'),
            phone: formData.get('phoneNumber'),
            email: formData.get('email'),
            attendees: formData.get('attendees'),
            message: formData.get('message') || 'No additional message'
        };

        // Construct WhatsApp Message
        const message = `*Noor Iftar Series Registration*%0A%0A` +
            `*Name:* ${data.name}%0A` +
            `*Phone:* ${data.phone}%0A` +
            `*Email:* ${data.email}%0A` +
            `*Attendees:* ${data.attendees}%0A` +
            `*Message:* ${data.message}`;

        const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

        // Create success notification
        alert('Thank you! Redirecting you to WhatsApp to confirm your registration.');

        // Open WhatsApp
        window.open(whatsappURL, '_blank');

        // Reset form
        registrationForm.reset();
    });

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.detail-card, .section-title, .about-content, .form-container').forEach(el => {
        el.classList.add('reveal-init');
        observer.observe(el);
    });
});
