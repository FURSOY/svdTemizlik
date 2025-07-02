/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    toggle.addEventListener('click', () => {
        // Add show-menu class to nav menu
        nav.classList.toggle('show-menu')

        // Add show-icon to show and hide the menu icon
        toggle.classList.toggle('show-icon')
    })
}

showMenu('nav-toggle', 'nav-menu')

/*=============== DROPDOWN MENU INTERACTION FOR MOBILE ===============*/
document.addEventListener('DOMContentLoaded', () => {
    const dropdownItems = document.querySelectorAll('.dropdown__item');
    // dropdownSubitems artık gerekmiyor, çünkü "Reports" kaldırıldı.
    // const dropdownSubitems = document.querySelectorAll('.dropdown__subitem'); 

    // Pencere genişliğini kontrol eden yardımcı fonksiyon
    const isMobile = () => window.innerWidth <= 1118; // CSS medya sorgunuzla aynı kırılım noktası

    // Ana dropdown menüleri için olay dinleyicisi
    dropdownItems.forEach(item => {
        const dropdownLink = item.querySelector('.nav__link'); // Analytics gibi başlık
        const dropdownMenu = item.querySelector('.dropdown__menu');

        if (dropdownLink) {
            dropdownLink.addEventListener('click', (event) => {
                // Sadece mobil cihazlarda çalışmasını sağla
                if (isMobile()) {
                    event.preventDefault(); // Varsayılan bağlantı davranışını engelle (varsa)

                    // Tıklanan öğe zaten açıksa kapat
                    if (item.classList.contains('show-dropdown')) {
                        item.classList.remove('show-dropdown');
                        if (dropdownMenu) {
                            dropdownMenu.style.maxHeight = '0';
                        }
                    } else {
                        // Diğer tüm ana dropdownları kapat
                        dropdownItems.forEach(dItem => {
                            if (dItem !== item) {
                                dItem.classList.remove('show-dropdown');
                                const dMenu = dItem.querySelector('.dropdown__menu');
                                if (dMenu) {
                                    dMenu.style.maxHeight = '0';
                                }
                            }
                        });

                        // Tıklanan dropdown'ı aç
                        item.classList.add('show-dropdown');
                        if (dropdownMenu) {
                            // Menüyü açmadan önce display özelliğini geçici olarak ayarla
                            dropdownMenu.style.maxHeight = 'fit-content';
                            const scrollHeight = dropdownMenu.scrollHeight;
                            dropdownMenu.style.maxHeight = '0'; // Tekrar sıfırla
                            // Küçük bir gecikme ile (reflow için) max-height'ı ayarla
                            requestAnimationFrame(() => {
                                dropdownMenu.style.maxHeight = scrollHeight + 'px';
                            });
                        }
                    }
                }
            });
        }
    });
    document.addEventListener('click', (event) => {
        if (isMobile() && !event.target.closest('.nav__menu')) {
            dropdownItems.forEach(item => {
                item.classList.remove('show-dropdown');
                const dropdownMenu = item.querySelector('.dropdown__menu');
                if (dropdownMenu) {
                    dropdownMenu.style.maxHeight = '0';
                }
            });
        }
    });

    // Pencere yeniden boyutlandırıldığında (mobil'den PC'ye veya tersi) menüleri sıfırla
    window.addEventListener('resize', () => {
        if (!isMobile()) { // PC moduna geçildiğinde
            dropdownItems.forEach(item => {
                item.classList.remove('show-dropdown'); // Mobil sınıflarını kaldır
                const dropdownMenu = item.querySelector('.dropdown__menu');
                if (dropdownMenu) {
                    dropdownMenu.style.maxHeight = ''; // CSS'in kontrolüne bırak
                }
            });
        }
    });
});