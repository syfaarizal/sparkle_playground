const body = document.body;
const customCursor = document.getElementById('custom-cursor');
const pageTitle = document.getElementById('page-title');
const themeButtons = document.querySelectorAll('.theme-button');

// Konfigurasi awal untuk partikel dan kursor
let currentSparkleConfig = {
    color: '#00ffcc',
    shadow: '0 0 5px #00ffcc, 0 0 10px #00ffcc, 0 0 20px #00ffcc',
    shape: 'circle'
};

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle', `sparkle-${currentSparkleConfig.shape}`);
    sparkle.style.position = 'absolute';
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.background = currentSparkleConfig.color;
    sparkle.style.boxShadow = currentSparkleConfig.shadow;
    body.appendChild(sparkle);

    // Animate the sparkle
    setTimeout(() => {
        const randomX = (Math.random() - 0.5) * 300;
        const randomY = (Math.random() - 0.5) * 300;
        sparkle.style.transform = `translate(${randomX}px, ${randomY}px) scale(0)`;
        sparkle.style.opacity = '0';
    }, 10);

    // Remove the sparkle after the animation
    setTimeout(() => {
        sparkle.remove();
            }, 500);
}

// Fungsi untuk memperbarui kursor kustom
function updateCustomCursor(color, shadow, shape) {
    // Menghapus kelas bentuk sebelumnya
    customCursor.classList.remove('cursor-circle', 'cursor-star', 'cursor-heart');
    // Menambahkan kelas bentuk yang baru
    customCursor.classList.add(`cursor-${shape}`);
    // Mengubah warna dan bayangan kursor
    customCursor.style.backgroundColor = color;
    customCursor.style.boxShadow = shadow;
}

// Event listener untuk tombol tema
themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Hapus kelas 'active' dari semua tombol
        themeButtons.forEach(btn => btn.classList.remove('active'));
        
        // Tambahkan kelas 'active' ke tombol yang diklik
        button.classList.add('active');

        // Perbarui konfigurasi percikan
        currentSparkleConfig.color = button.dataset.color;
        currentSparkleConfig.shadow = button.dataset.shadow;
        currentSparkleConfig.shape = button.dataset.shape;

        // Perbarui kursor kustom
        updateCustomCursor(currentSparkleConfig.color, currentSparkleConfig.shadow, currentSparkleConfig.shape);

        // Perbarui warna dan bayangan teks judul
        pageTitle.style.color = currentSparkleConfig.color;
        pageTitle.style.textShadow = currentSparkleConfig.shadow;
    });
});

document.addEventListener('mousemove', (event) => {
    // Memperbarui posisi kursor khusus
    customCursor.style.left = `${event.clientX}px`;
    customCursor.style.top = `${event.clientY}px`;
    
    // Membuat partikel
    createSparkle(event.clientX, event.clientY);
});

// Set kursor kustom awal saat halaman dimuat
window.onload = function() {
    updateCustomCursor(currentSparkleConfig.color, currentSparkleConfig.shadow, currentSparkleConfig.shape);
    pageTitle.style.color = currentSparkleConfig.color;
    pageTitle.style.textShadow = currentSparkleConfig.shadow;
};