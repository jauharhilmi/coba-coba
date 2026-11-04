
// MENU HAMBURGER
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", function() {
    navMenu.classList.toggle("active");

    menuToggle.textContent =
        navMenu.classList.contains("active") ? "✕" : "☰";
});

// TUTUP MENU SAAT LINK DIKLIK
document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", function() {
        navMenu.classList.remove("active");
        menuToggle.textContent = "☰";
    });
});

// VALIDASI FORM DAN WHATSAPP
const form = document.getElementById("contactForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const hp = document.getElementById("hp").value.trim();
    const pesan = document.getElementById("pesan").value.trim();
    const message = document.getElementById("message");

    if (nama === "" || hp === "" || pesan === "") {
        message.style.color = "red";
        message.textContent = "Semua kolom wajib diisi!";
        return;
    }

    if (!/^[0-9+\\-\\s()]{8,18}$/.test(hp)) {
        message.style.color = "red";
        message.textContent = "Nomor HP tidak valid!";
        return;
    }

    const nomorWA = "6282141530354";

    const teks = `Halo Banjarejo Copy.
Nama: ${nama}
Nomor HP: ${hp}
Pesan: ${pesan}`;

    const url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(teks)}`;

    message.style.color = "green";
    message.textContent = "Membuka WhatsApp...";

    window.open(url, "_blank");

    form.reset();
});

// SLIDER TESTIMONI
const ulasan = [
    {
        text: "Pelayanannya ramah dan hasil cetaknya bagus.",
        nama: "Pelanggan Banjarejo Copy"
    },
    {
        text: "Tempat yang praktis untuk kebutuhan fotokopi dan print.",
        nama: "Pelanggan Banjarejo Copy"
    },
    {
        text: "Sangat membantu untuk kebutuhan sekolah dan kantor.",
        nama: "Pelanggan Banjarejo Copy"
    }
];

let index = 0;

function tampilkanUlasan() {
    document.getElementById("reviewText").textContent =
        '"' + ulasan[index].text + '"';

    document.getElementById("reviewName").textContent =
        ulasan[index].nama;
}

document.getElementById("next").addEventListener("click", function() {
    index = (index + 1) % ulasan.length;
    tampilkanUlasan();
});

document.getElementById("prev").addEventListener("click", function() {
    index = (index - 1 + ulasan.length) % ulasan.length;
    tampilkanUlasan();
});

// TAHUN OTOMATIS
document.getElementById("year").textContent =
    new Date().getFullYear();
