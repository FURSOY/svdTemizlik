// loadComments.js
document.addEventListener('DOMContentLoaded', () => {
    const commentGrid = document.getElementById('commentGrid');

    // Burada gerçek bir CMS'ten veri çekme mantığı olacak.
    // Şimdilik sadece örnek olarak göstereceğim.
    // Gerçekte Netlify CMS için API veya önceden oluşturulmuş JSON dosyalarını kullanırız.

    // Varsayımsal olarak yorum verileriniz bir JSON dosyasından geliyor gibi düşünelim.
    // Netlify CMS, bu dosyayı sizin için oluşturacak.
    fetch('/admin/data/comments.json') // Netlify CMS, bu tür bir JSON dosyası oluşturabilir
        .then(response => response.json())
        .then(comments => {
            comments.forEach(comment => {
                const gridItem = document.createElement('div');
                gridItem.className = 'Commentgrid-item';

                const img = document.createElement('img');
                img.className = 'Commentgrid-item-img';
                img.src = comment.image; // CMS'ten gelen resim yolu
                img.alt = comment.altText; // CMS'ten gelen alt metin

                gridItem.appendChild(img);
                // Eğer yorum metni de varsa, buraya ekleyebilirsiniz:
                // const p = document.createElement('p');
                // p.textContent = comment.text;
                // gridItem.appendChild(p);

                commentGrid.appendChild(gridItem);
            });

            // Resimler yüklendikten sonra modal işlevselliğini başlatın
            // (Önceki modal JavaScript kodunuzu buraya entegre edeceğiz)
            initializeModal();
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