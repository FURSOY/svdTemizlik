document.addEventListener('DOMContentLoaded', () => {
    const videoPlayer = document.getElementById('videoPlayer');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    const videoSources = [
        'videos/video1.mp4',
        'videos/video2.mp4',
        'videos/video3.mp4',
        'videos/video28.mp4',
    ];

    let currentVideoIndex = 0;

    // İlk videoyu yükle
    function loadVideo(index) {
        if (videoSources.length === 0) {
            console.warn("Video kaynakları tanımlanmamış. Lütfen 'videoSources' dizisine video yollarını ekleyin.");
            videoPlayer.src = ''; // Kaynak yoksa video oynatıcıyı boş bırak
            return;
        }
        videoPlayer.src = videoSources[index];
        videoPlayer.load(); // Videoyu yükle
        videoPlayer.play().catch(error => {
            console.log("Video otomatik oynatılamadı:", error);
            // Kullanıcı etkileşimi gerektiğinde bilgilendirme yapılabilir
            // Örneğin, video oynatma butonu gösterilebilir
        });
    }

    // Sonraki videoyu oynat
    function playNextVideo() {
        currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
        loadVideo(currentVideoIndex);
    }

    // Önceki videoyu oynat
    function playPrevVideo() {
        currentVideoIndex = (currentVideoIndex - 1 + videoSources.length) % videoSources.length;
        loadVideo(currentVideoIndex);
    }

    // Butonlara tıklama olayları ekle
    nextButton.addEventListener('click', playNextVideo);
    prevButton.addEventListener('click', playPrevVideo);

    // Sayfa yüklendiğinde ilk videoyu başlat
    loadVideo(currentVideoIndex);
});