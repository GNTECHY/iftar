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
    const WHATSAPP_NUMBER = '916383360375';
    const attendeesInput = document.getElementById('attendees');
    const packageSelect = document.getElementById('package');
    const package399Option = packageSelect.querySelector('option[value="399"]');

    // Real-time Package Validation
    const updatePackageOptions = () => {
        const attendeesCount = parseInt(attendeesInput.value) || 0;
        if (attendeesCount < 30) {
            package399Option.disabled = true;
            if (packageSelect.value === '399') {
                packageSelect.value = ''; // Reset selection if it's now invalid
            }
        } else {
            package399Option.disabled = false;
        }
    };

    attendeesInput.addEventListener('input', updatePackageOptions);
    updatePackageOptions(); // Initial check

    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(registrationForm);
        const data = {
            name: formData.get('fullName'),
            phone: formData.get('phoneNumber'),
            email: formData.get('email'),
            package: formData.get('package'),
            attendees: parseInt(formData.get('attendees')),
            message: formData.get('message') || 'No additional message'
        };

        // Final Validation (Double check)
        if (data.package === '399' && data.attendees < 30) {
            alert('The 399 package is only available for groups of 30 or more attendees.');
            return;
        }

        // Construct WhatsApp Message
        const message = `*Noor Iftar Series Registration*%0A%0A` +
            `*Name:* ${data.name}%0A` +
            `*Phone:* ${data.phone}%0A` +
            `*Email:* ${data.email}%0A` +
            `*Package:* ${data.package}%0A` +
            `*Attendees:* ${data.attendees}%0A` +
            `*Message:* ${data.message}`;

        const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

        // Create success notification
        alert('Thank you! Redirecting you to WhatsApp to confirm your registration.');

        // Open WhatsApp
        window.open(whatsappURL, '_blank');

        // Reset form
        registrationForm.reset();
        updatePackageOptions(); // Reset package availability
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
