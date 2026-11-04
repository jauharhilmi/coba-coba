document.addEventListener('DOMContentLoaded', () => {

    /* ===================================================
       1. Menu Hamburger (Mobile Navigation Toggle)
       =================================================== */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Ubah ikon menu
        const icon = hamburger.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Tutup menu mobile ketika salah satu menu di-klik
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });


    /* ===================================================
       2. Form Validation (Validasi Form Kontak)
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

        // Reset pesan error
        nameError.textContent = '';
        phoneError.textContent = '';
        messageError.textContent = '';
        alertMessage.className = 'alert-message';
        alertMessage.textContent = '';

        // Validasi Nama
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Nama lengkap wajib diisi.';
            isValid = false;
        }

        // Validasi Nomor HP
        const phoneRegex = /^[0-9+\s-]{9,15}$/;
        if (phoneInput.value.trim() === '') {
            phoneError.textContent = 'Nomor HP/WhatsApp wajib diisi.';
            isValid = false;
        } else if (!phoneRegex.test(phoneInput.value.trim())) {
            phoneError.textContent = 'Format nomor HP tidak valid.';
            isValid = false;
        }

        // Validasi Pertanyaan/Pesan
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Pertanyaan atau pesan tidak boleh kosong.';
            isValid = false;
        }

        // Jika semua field terisi dengan benar
        if (isValid) {
            alertMessage.textContent = 'Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.';
            alertMessage.classList.add('success');
            contactForm.reset();
        }
    });


    /* ===================================================
       3. Interactive Slider / Testimonial Carousel
       =================================================== */
    const track = document.getElementById('testimonialTrack');
    const slides = Array.from(track.children);
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const dotsNav = document.getElementById('carouselNav');
    const dots = Array.from(dotsNav.children);

    let currentIndex = 0;

    const updateSlidePosition = (index) => {
        track.style.transform = `translateX(-${index * 100}%)`;
        
        // Update Dot aktif
        dots.forEach(dot => dot.classList.remove('current-slide'));
        dots[index].classList.add('current-slide');
    };

    // Tombol Selanjutnya
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
        updateSlidePosition(currentIndex);
    });

    // Tombol Sebelumnya
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
        updateSlidePosition(currentIndex);
    });

    // Klik pada indikator dot
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlidePosition(currentIndex);
        });
    });

    // Slide otomatis setiap 5 detik
    setInterval(() => {
        currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
        updateSlidePosition(currentIndex);
    }, 5000);

});