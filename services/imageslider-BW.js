document.addEventListener('DOMContentLoaded', () => {
    const mediaDisplay = document.getElementById('mediaDisplay'); // Ortak ID kullanıyoruz
    const videoDisplay = document.getElementById('videoDisplay');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    // Medya dosyalarınızın yolları ve tipleri.
    // Lütfen kendi dosya yollarınızı ve tiplerini buraya ekleyin.
    const mediaSources = [
        { type: 'video', src: '/videos/video9.mp4' },
        { type: 'image', src: '/img/BW1.jpg' },
        { type: 'image', src: '/img/BW2.jpg' },
        { type: 'image', src: '/img/BW3.jpg' },
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