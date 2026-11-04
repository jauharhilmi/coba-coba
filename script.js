document.addEventListener('DOMContentLoaded', () => {

    /* ===================================================
       1. Dark / Light Mode Toggle
       =================================================== */
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');

    // Cek preferensi tersimpan di LocalStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });


    /* ===================================================
       2. Scroll Reveal Animation (Animasi saat di-scroll)
       =================================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        revealElements.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger saat halaman pertama kali dimuat


    /* ===================================================
       3. Menu Hamburger (Mobile Navigation Toggle)
       =================================================== */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });


    /* ===================================================
       4. Form Validation (Validasi Form Kontak)
       =================================================== */
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    
    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');
    const messageError = document.getElementById('messageError');
    const alertMessage = document.getElementById('alertMessage');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        nameError.textContent = '';
        phoneError.textContent = '';
        messageError.textContent = '';
        alertMessage.className = 'alert-message';
        alertMessage.textContent = '';

        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Nama lengkap wajib diisi.';
            isValid = false;
        }

        const phoneRegex = /^[0-9+\s-]{9,15}$/;
        if (phoneInput.value.trim() === '') {
            phoneError.textContent = 'Nomor HP/WhatsApp wajib diisi.';
            isValid = false;
        } else if (!phoneRegex.test(phoneInput.value.trim())) {
            phoneError.textContent = 'Format nomor HP tidak valid.';
            isValid = false;
        }

        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Pertanyaan atau pesan tidak boleh kosong.';
            isValid = false;
        }

        if (isValid) {
            alertMessage.textContent = 'Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.';
            alertMessage.classList.add('success');
            contactForm.reset();
        }
    });


    /* ===================================================
       5. Interactive Slider / Testimonial Carousel
       =================================================== */
    const track = document.getElementById('testimonialTrack');
    let slides = Array.from(track.children);
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const dotsNav = document.getElementById('carouselNav');
    let dots = Array.from(dotsNav.children);

    let currentIndex = 0;

    const updateSlidePosition = (index) => {
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(dot => dot.classList.remove('current-slide'));
        if (dots[index]) {
            dots[index].classList.add('current-slide');
        }
    };

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
        updateSlidePosition(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
        updateSlidePosition(currentIndex);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlidePosition(currentIndex);
        });
    });

    setInterval(() => {
        slides = Array.from(track.children);
        currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
        updateSlidePosition(currentIndex);
    }, 5000);


    /* ===================================================
       6. Form Tambah Ulasan Mandiri (User Review Form)
       =================================================== */
    const reviewForm = document.getElementById('reviewForm');
    const reviewAlert = document.getElementById('reviewAlert');

    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('reviewName').value.trim();
        const role = document.getElementById('reviewRole').value.trim() || 'Pelanggan';
        const rating = parseInt(document.getElementById('reviewRating').value);
        const photo = document.getElementById('reviewPhoto').value.trim() || 'https://via.placeholder.com/80';
        const comment = document.getElementById('reviewComment').value.trim();

        let starsHtml = '';
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                starsHtml += '<i class="fa-solid fa-star"></i>';
            } else {
                starsHtml += '<i class="fa-regular fa-star"></i>';
            }
        }

        const newSlide = document.createElement('li');
        newSlide.className = 'carousel-slide';
        newSlide.innerHTML = `
            <div class="testimonial-card">
                <div class="testimonial-avatar">
                    <img src="${photo}" alt="${name}">
                </div>
                <div class="stars">${starsHtml}</div>
                <p>"${comment}"</p>
                <h4>${name}</h4>
                <span>${role}</span>
            </div>
        `;

        track.appendChild(newSlide);

        const newDot = document.createElement('button');
        newDot.className = 'carousel-indicator';
        const newIndex = slides.length;
        newDot.addEventListener('click', () => {
            currentIndex = newIndex;
            updateSlidePosition(currentIndex);
        });
        dotsNav.appendChild(newDot);

        slides = Array.from(track.children);
        dots = Array.from(dotsNav.children);

        reviewAlert.textContent = 'Ulasan Anda berhasil ditambahkan! Terima kasih atas kepercayaannya.';
        reviewAlert.classList.add('success');
        reviewForm.reset();

        currentIndex = slides.length - 1;
        updateSlidePosition(currentIndex);
    });

});