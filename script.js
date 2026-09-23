/**
 * ==============================================================
 * KONFIGURASI WEBSITE KADO ULANG TAHUN
 * Silakan ubah teks, nama, foto, dan lagu di bawah ini untuk 
 * menyesuaikan hadiah ini agar lebih personal.
 * ==============================================================
 */

const CONFIG = {
    // 1. NAMA PENERIMA: Ganti dengan nama panggilan atau nama lengkapnya
    nama: "Atika Sayang",

    // 2. UCAPAN: Teks ucapan yang muncul di halaman kedua (setelah buka kado)
    ucapan: "Selamat bertambah usia Sayang Ku! Semoga panjang umur, sehat selalu, dan semua hal indah yang kamu doakan tahun ini bisa tercapai. Ini hanya sekadar kado digital sederhana, semoga kamu suka ya!",

    // 3. SURAT: Isi surat yang akan terbuka dari amplop. 
    //    Gunakan tanda <br> jika ingin membuat enter atau baris baru.
    surat: "Hai Sayang,<br><br>Hari ini adalah hari yang sangat spesial untukmu. Aku cuma ingin bilang terima kasih karena selalu jadi versi terbaik dari dirimu sendiri.<br><br>Maaf ya kalau kado kali ini cuma berbentuk digital. Tapi ketahuilah, setiap kata disini ditulis pakai hati. Semoga kamu selalu dikelilingi kebahagiaan dan didekatkan dengan impianmu.<br><br>Jangan sering-sering begadang dan jaga kesehatan selalu, okay? Have a wonderful birthday!<br><br>Love,<br>ical ❤️",

    // 4. DAFTAR FOTO: Masukkan nama file foto yang ada di dalam folder 'assets'.
    //    Kamu bisa menambah atau mengurangi jumlah foto di bawah.
    //    Pastikan ejaan besar/kecil huruf persis sama dengan nama file aslinya!
    //    Jika fotonya belum ada, ini akan otomatis menampilkan kotak placeholder lucu.
    foto: [
        "assets/gambar1.jpg",
        "assets/gambar 2.jpg",
        "assets/gambar3.jpg",
        "assets/gambar4.jpg",
        "assets/gambar 5.jpg",
        "assets/gambar 6.jpg"
    ],

    // 5. MUSIK: Pastikan kamu sudah copy file lagu ke dalam folder 'assets'
    //    dan tulis nama lagunya di bawah ini dengan tepat (termasuk .mp3/.mpeg nya)
    musik: "assets/lagu.mpeg"
};

/**
 * ==============================================================
 * KODE SISTEM WEBSITENYA DARI SINI KE BAWAH. JANGAN DIUBAH!
 * Kecuali kamu betul-betul mengerti kodenya.
 * ==============================================================
 */

// Saat halaman HTML selesai dimuat semua
document.addEventListener("DOMContentLoaded", () => {
    // 1. Inject Teks dari Konfigurasi
    document.getElementById("nama-penerima").innerHTML = CONFIG.nama;
    document.getElementById("teks-ucapan").innerHTML = CONFIG.ucapan;
    document.getElementById("teks-surat").innerHTML = CONFIG.surat;

    // 2. Setup Audio Background
    const audio = document.getElementById("bg-music");
    audio.src = CONFIG.musik;

    // 3. Setup Galeri Foto
    const galleryContainer = document.getElementById("gallery-container");

    if (CONFIG.foto.length === 0) {
        galleryContainer.innerHTML = "<p class='text-center w-100'>Belum ada foto yang ditambahkan.</p>";
    } else {
        CONFIG.foto.forEach((src, index) => {
            const col = document.createElement("div");
            // Grid responsif: 2 kolom di HP, 3 kolom di tablet/PC
            col.className = "col-6 col-md-4";

            // Urutan urutan delay animasi css untuk estetikanya (1 sampai 4)
            const delayClass = `delay-${(index % 4) + 1}`;

            // Foto fallback placeholder romantis dari unsplash jika gambar aslinya gak ditemukan
            const placeholder = "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=400&q=80";

            col.innerHTML = `
                <img src="${src}" 
                     class="gallery-img animate-zoomIn ${delayClass}" 
                     alt="Kenangan" 
                     onclick="showModalImage(this.src)"
                     onerror="this.src='${placeholder}'">
            `;
            galleryContainer.appendChild(col);
        });
    }

    // 4. Jalankan efek partikel melayang (bintang & hati) 
    createParticles();
});

// LOGIKA MUSIK: Trik Paksa Putar & Tombol
let isPlaying = false;

function forcePlayMusic() {
    if (!isPlaying) {
        const audio = document.getElementById("bg-music");
        const icon = document.getElementById("music-icon");

        audio.play().then(() => {
            isPlaying = true;
            icon.classList.remove("paused");
            icon.classList.remove("fa-music");
            icon.classList.add("fa-compact-disc");
            document.getElementById('music-control').classList.remove('d-none');
        }).catch(e => {
            // Jika browser tetap menolak, tidak perlu error
            console.log("Browser menahan autoplay.");
        });
    }
}

// Coba putar ketika ada sedikit sentuhan atau klik dimana saja di layar
document.addEventListener('click', forcePlayMusic, { once: true });
document.addEventListener('touchstart', forcePlayMusic, { once: true });

function toggleMusic() {
    const audio = document.getElementById("bg-music");
    const icon = document.getElementById("music-icon");

    if (isPlaying) {
        audio.pause();
        icon.classList.add("paused");
        icon.classList.remove("fa-compact-disc");
        icon.classList.add("fa-music");
        isPlaying = false;
    } else {
        forcePlayMusic();
    }
}

// LOGIKA NAVIGASI ANTAR HALAMAN
function nextPage(currentId, nextId) {
    const current = document.getElementById(currentId);
    const next = document.getElementById(nextId);

    // Animasi fade out custom menggunakan style langsung
    current.style.animation = "fadeOutPage 0.8s ease forwards";

    // Tunggu 800ms sampai fade outnya kelar
    setTimeout(() => {
        // Reset animasi dan ganti page active
        current.classList.remove('active');
        current.style.animation = "";

        // Hapus d-none kalau ada (khusus bootstrap hidden override)
        next.classList.remove('d-none');
        next.classList.add('active');
        window.scrollTo(0, 0); // Pastikan layar kembali ke atas saat pindah halaman

        // Pengecekan Khusus pada Halaman Tertentu:
        if (nextId === 'page-galeri') {
            // Opsional kasih ledakan confetti lagi di galeri (tapi sudah ada pas buka awal)
        }
    }, 800);
}

// LOGIKA BUKA KADO PERTAMA KALI
function openGift() {
    forcePlayMusic();

    fireConfetti();
    nextPage('page-pembuka', 'page-ucapan');
}

// LOGIKA BUKA AMPLOP SURAT
let envelopeOpened = false;
function openEnvelope() {
    if (envelopeOpened) return;
    envelopeOpened = true;

    const envelope = document.getElementById('envelope');
    const letterContent = document.getElementById('letter-content');
    const tapText = document.querySelector('.tap-text');

    // Hilangkan teks bantuan
    if (tapText) tapText.style.display = 'none';

    // Buka katup amplopnya
    envelope.classList.add('open');

    // Panggil Confetti kecil pas baca surat
    setTimeout(fireLetterConfetti, 300);

    // Tampilkan isi surat (glass box)
    setTimeout(() => {
        envelope.classList.add('d-none');
        letterContent.classList.remove('d-none');
        letterContent.classList.add('animate-fadeInUp');
        // Scroll halus ke arah surat biar mudah dibaca di HP
        setTimeout(() => {
            letterContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }, 800);
}

// Tutup Web (Atau tampilkan pesan aman jika diblokir browser)
function restart() {
    // Trik agar bisa close di beberapa browser
    window.open('', '_self', '');
    window.close();

    // Fallback jika browser (seperti Chrome/Safari di HP) memblokir penutupan tab otomatis
    setTimeout(() => {
        document.body.innerHTML = "<div style='height:100vh; display:flex; flex-direction:column; justify-content:center; align-items:center; background:#1a0b1c; color:#fff0f5; font-family:Poppins, sans-serif; text-align:center; padding:20px;'><h1 style='color:#ff3366; font-family:\"Dancing Script\", cursive; font-size:3.5rem; margin-bottom:20px;'>Terima Kasih ❤️</h1><p>Kamu sudah bisa menutup halaman ini.</p></div>";
    }, 300);
}

// ============================================
// EFEK VISUAL: PARTIKEL HATI & BINTANG MELAYANG
// ============================================
function createParticles() {
    const container = document.getElementById("particles-container");
    const particleCount = 20; // Jangan terlalu banyak biar HP kentang tidak ngelag

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";

        // Pilih Bintang atau Hati secara Acak
        const isHeart = Math.random() > 0.4; // 60% probabilitas hati
        if (isHeart) {
            particle.innerHTML = '<i class="fas fa-heart" style="color: rgba(255, 75, 114, 0.6)"></i>';
        } else {
            particle.innerHTML = '<i class="fas fa-star" style="color: rgba(255, 223, 0, 0.5)"></i>';
        }

        // Random ukuran, posisi X, dan durasi animasi
        const size = Math.random() * 10 + 10;
        const leftX = Math.random() * 100;
        const animationTime = Math.random() * 12 + 10;
        const delayTime = Math.random() * 10;

        particle.style.fontSize = `${size}px`;
        particle.style.left = `${leftX}vw`;
        particle.style.animationDuration = `${animationTime}s`;
        particle.style.animationDelay = `${delayTime}s`;

        container.appendChild(particle);
    }
}

// ============================================
// EFEK VISUAL: LEDAKAN CONFETTI (DARI CANVAS-CONFETTI)
// ============================================
function fireConfetti() {
    if (window.confetti) {
        var duration = 2.5 * 1000;
        var end = Date.now() + duration;

        (function frame() {
            // Ledakan Kiri
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff4b72', '#ff8fa3', '#f9d71c', '#ffffff']
            });
            // Ledakan Kanan
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff4b72', '#ff8fa3', '#f9d71c', '#ffffff']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }
}

function fireLetterConfetti() {
    if (window.confetti) {
        confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff4b72', '#ffffff']
        });
    }
}

// MENAMPILKAN FOTO DI MODAL BOOTSTRAP KETIKA DIKLIK
function showModalImage(srcUrl) {
    document.getElementById('modalImage').src = srcUrl;
    // Panggil Modal Bootstrap
    let imgModal = new bootstrap.Modal(document.getElementById('imageModal'));
    imgModal.show();
}
