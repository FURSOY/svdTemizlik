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

    // Yeni eklenen kısım: Boşluğa tıklanınca menüyü kapat
    document.addEventListener('click', (event) => {
        // Eğer menü açıksa (show-menu sınıfı varsa) VE tıklanan alan menünün veya toggle butonunun içinde değilse
        if (nav.classList.contains('show-menu') && !nav.contains(event.target) && !toggle.contains(event.target)) {
            nav.classList.remove('show-menu');
            toggle.classList.remove('show-icon');
        }
    });
}

showMenu('nav-toggle', 'nav-menu')

/*=============== DROPDOWN MENU INTERACTION FOR MOBILE ===============*/
document.addEventListener('DOMContentLoaded', () => {
    const dropdownItems = document.querySelectorAll('.dropdown__item');

    const isMobile = () => window.innerWidth <= 1118; // CSS medya sorgunuzla aynı kırılım noktası

    dropdownItems.forEach(item => {
        const dropdownLink = item.querySelector('.nav__link');
        const dropdownMenu = item.querySelector('.dropdown__menu');

        if (dropdownLink) {
            dropdownLink.addEventListener('click', (event) => {
                if (isMobile()) {
                    event.preventDefault();

                    if (item.classList.contains('show-dropdown')) {
                        item.classList.remove('show-dropdown');
                        if (dropdownMenu) {
                            dropdownMenu.style.maxHeight = '0';
                        }
                    } else {
                        dropdownItems.forEach(dItem => {
                            if (dItem !== item) {
                                dItem.classList.remove('show-dropdown');
                                const dMenu = dItem.querySelector('.dropdown__menu');
                                if (dMenu) {
                                    dMenu.style.maxHeight = '0';
                                }
                            }
                        });

                        item.classList.add('show-dropdown');
                        if (dropdownMenu) {
                            dropdownMenu.style.maxHeight = 'fit-content';
                            const scrollHeight = dropdownMenu.scrollHeight;
                            dropdownMenu.style.maxHeight = '0';
                            requestAnimationFrame(() => {
                                dropdownMenu.style.maxHeight = scrollHeight + 'px';
                            });
                        }
                    }
                }
            });
        }
    });

    // Bu kısım artık ana `showMenu` fonksiyonunun içinde genel menü kapanışı için ele alınıyor,
    // ama dropdownları kapatma mantığı burada kalsın.
    document.addEventListener('click', (event) => {
        if (isMobile() && !event.target.closest('.dropdown__item') && !event.target.closest('.nav__toggle')) { // `.nav__toggle` ekledim
            dropdownItems.forEach(item => {
                item.classList.remove('show-dropdown');
                const dropdownMenu = item.querySelector('.dropdown__menu');
                if (dropdownMenu) {
                    dropdownMenu.style.maxHeight = '0';
                }
            });
        }
    });


    window.addEventListener('resize', () => {
        if (!isMobile()) {
            dropdownItems.forEach(item => {
                item.classList.remove('show-dropdown');
                const dropdownMenu = item.querySelector('.dropdown__menu');
                if (dropdownMenu) {
                    dropdownMenu.style.maxHeight = '';
                }
            });
            // Geniş ekrana geçildiğinde ana menüyü de kapat (açık kalmışsa)
            const nav = document.getElementById('nav-menu');
            const toggle = document.getElementById('nav-toggle');
            if (nav.classList.contains('show-menu')) {
                nav.classList.remove('show-menu');
                toggle.classList.remove('show-icon');
            }
        }
    });
});