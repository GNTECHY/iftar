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

    // Custom Date Grid Logic
    const dateGrid = document.getElementById('dateGrid');
    const hiddenDateInput = document.getElementById('eventDate');
    const selectedDateDisplay = document.getElementById('selectedDateDisplay');

    const generateDateGrid = () => {
        if (!dateGrid) return;
        dateGrid.innerHTML = ''; // Clear existing

        const startDate = new Date(2026, 1, 19); // Feb 19 (Months are 0-indexed)
        const endDate = new Date(2026, 2, 20);   // March 20
        const availableDates = [11, 12, 14, 16]; // Specific available dates in March
        const availableMonth = 2; // March is 2 (0-indexed)
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        let currentDate = new Date(startDate);
        let ramadanDay = 1;

        while (currentDate <= endDate) {
            const dateValue = new Date(currentDate);
            const isAvailable = dateValue.getMonth() === availableMonth && availableDates.includes(dateValue.getDate());
            const dayName = daysOfWeek[dateValue.getDay()];
            const dateNum = dateValue.getDate();
            const monthName = dateValue.toLocaleString('default', { month: 'short' });
            const fullDateString = `${dateValue.getFullYear()}-${String(dateValue.getMonth() + 1).padStart(2, '0')}-${String(dateNum).padStart(2, '0')}`;

            const slot = document.createElement('div');
            slot.className = `date-slot ${isAvailable ? 'available' : 'full'}`;

            slot.innerHTML = `
                <span class="ramadan-day">Day ${ramadanDay}</span>
                <span class="slot-day">${dayName}</span>
                <span class="slot-date">${dateNum}</span>
            `;

            if (isAvailable) {
                slot.addEventListener('click', () => {
                    document.querySelectorAll('.date-slot').forEach(s => s.classList.remove('active'));
                    slot.classList.add('active');
                    hiddenDateInput.value = fullDateString;
                    selectedDateDisplay.textContent = `Selected: ${monthName} ${dateNum}, 2026 (Ramadan Day ${ramadanDay})`;
                    selectedDateDisplay.style.color = '#e51e2b';
                });
            } else {
                slot.title = "This date is fully booked";
            }

            dateGrid.appendChild(slot);

            // Increment
            currentDate.setDate(currentDate.getDate() + 1);
            ramadanDay++;
        }
    };

    generateDateGrid();

    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(registrationForm);
        const data = {
            name: formData.get('fullName'),
            phone: formData.get('phoneNumber'),
            date: formData.get('eventDate'),
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
            `*Date:* ${data.date}%0A` +
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
