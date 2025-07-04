document.addEventListener('DOMContentLoaded', () => {
    const commentGrid = document.getElementById('commentGrid');

    // /data/comments.json dosyasını okuyun
    fetch('/data/comments.json') // BURAYI DİKKATlice kontrol edin!
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(comments => {
            // Yorumlar yüklendikten sonra modal işlevselliğini başlatın
            // (Önceki modal JavaScript kodunuzu buraya entegre edeceğiz)
            comments.forEach(comment => {
                const gridItem = document.createElement('div');
                gridItem.className = 'Commentgrid-item';

                const img = document.createElement('img');
                img.className = 'Commentgrid-item-img';
                // Resim yolu, config.yml'deki public_folder ayarınızla eşleşmeli
                img.src = comment.image;
                img.alt = comment.altText;

                gridItem.appendChild(img);
                commentGrid.appendChild(gridItem);
            });
            initializeModal(); // Resimler DOM'a eklendikten sonra modalı başlat
        })
        .catch(error => console.error('Yorumlar yüklenirken hata oluştu:', error));
});

// Önceki modal JavaScript kodunuzu buraya veya ayrı bir fonksiyona taşıyın
function initializeModal() {
    var modal = document.getElementById("myModal");
    var images = document.querySelectorAll(".Commentgrid-item-img"); // Dinamik olarak yüklenen resimleri seçin
    var modalImg = document.getElementById("img01");
    var spanClose = document.getElementsByClassName("close")[0];
    var body = document.body;

    var prevBtn = document.querySelector(".prev");
    var nextBtn = document.querySelector(".next");
    var currentImageIndex = 0;

    images.forEach((img, index) => {
        img.onclick = function () {
            modal.style.display = "flex";
            modalImg.src = this.src;
            body.classList.add("no-scroll");
            currentImageIndex = index;
        }
    });

    spanClose.onclick = function () {
        modal.style.display = "none";
        body.classList.remove("no-scroll");
    }

    modal.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            body.classList.remove("no-scroll");
        }
    }

    nextBtn.onclick = function (e) {
        e.stopPropagation();
        currentImageIndex++;
        if (currentImageIndex >= images.length) {
            currentImageIndex = 0;
        }
        modalImg.src = images[currentImageIndex].src;
    };

    prevBtn.onclick = function (e) {
        e.stopPropagation();
        currentImageIndex--;
        if (currentImageIndex < 0) {
            currentImageIndex = images.length - 1;
        }
        modalImg.src = images[currentImageIndex].src;
    };

    document.addEventListener('keydown', function (e) {
        if (modal.style.display === "flex") {
            if (e.key === "ArrowRight") {
                nextBtn.click();
            } else if (e.key === "ArrowLeft") {
                prevBtn.click();
            } else if (e.key === "Escape") {
                spanClose.click();
            }
        }
    });
}