document.addEventListener('DOMContentLoaded', () => {
    const mediaDisplay = document.getElementById('mediaDisplay'); // Ortak ID kullanıyoruz
    const videoDisplay = document.getElementById('videoDisplay');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    // Medya dosyalarınızın yolları ve tipleri.
    // Lütfen kendi dosya yollarınızı ve tiplerini buraya ekleyin.
    const mediaSources = [
        { type: 'image', src: '../img/CSWD1.webp', alt: 'Ankara Detaylı Araç İçi Temizlik - Koltuk Yıkama' },
        { type: 'video', src: '../videos/video18.mp4' },
        { type: 'image', src: '../img/CSWD2.webp', alt: 'Araç İçi Detaylı Vakumlu Temizlik' },
        { type: 'video', src: '../videos/video21.mp4' },
        { type: 'image', src: '../img/CSWD3.webp', alt: 'Buharlı Araç Detaylı Temizlik Ankara' },
        { type: 'video', src: '../videos/video25.mp4' },
        { type: 'image', src: '../img/CSWD4.webp', alt: 'Profesyonel Oto Detaylı Temizlik Hizmeti' },
        { type: 'video', src: '../videos/video22.mp4' },
        { type: 'image', src: '../img/CSWD5.webp', alt: 'Araç Tavan ve Taban Temizliği' },
    ];

    let currentMediaIndex = 0;

    function loadMedia(index) {
        if (mediaSources.length === 0) {
            mediaDisplay.style.display = 'none';
            videoDisplay.style.display = 'none';
            return;
        }

        const currentMedia = mediaSources[index];

        if (currentMedia.type === 'image') {
            mediaDisplay.src = currentMedia.src;
            mediaDisplay.alt = currentMedia.alt || "Ankara Detaylı Araç Temizliği"; // Alt text güncelleme
            mediaDisplay.style.display = 'block';
            videoDisplay.style.display = 'none';
            videoDisplay.pause(); // Video oynuyorsa durdur
            videoDisplay.currentTime = 0; // Video başlangıca al
        } else if (currentMedia.type === 'video') {
            videoDisplay.src = currentMedia.src;
            videoDisplay.style.display = 'block';
            mediaDisplay.style.display = 'none';
            videoDisplay.load(); // Videoyu yükle
            videoDisplay.play(); // Videoyu oynat
        }
    }

    function showNextMedia() {
        currentMediaIndex = (currentMediaIndex + 1) % mediaSources.length;
        loadMedia(currentMediaIndex);
    }

    function showPrevMedia() {
        currentMediaIndex = (currentMediaIndex - 1 + mediaSources.length) % mediaSources.length;
        loadMedia(currentMediaIndex);
    }

    nextButton.addEventListener('click', showNextMedia);
    prevButton.addEventListener('click', showPrevMedia);

    // Sayfa yüklendiğinde ilk medyayı başlat
    loadMedia(currentMediaIndex);
});