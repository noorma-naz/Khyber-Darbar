document.addEventListener("DOMContentLoaded", function() {
    
    
    setTimeout(() => { 
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.pointerEvents = 'none';
        }
    }, 600);

    
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navbarMenu = document.querySelector('.navbar__menu');
    const navbarLinks = document.querySelectorAll('.navbar__link');

    if (mobileMenuBtn && navbarMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navbarMenu.classList.toggle('mobile-active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    navbarLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarMenu) {
                navbarMenu.classList.remove('mobile-active');
            }
        });
    });

   
    const container = document.getElementById('featuredDishesContainer');
    const prevBtn = document.getElementById('slidePrev');
    const nextBtn = document.getElementById('slideNext');
    
    if (container && prevBtn && nextBtn) {
        let scrollPosition = 0;
        
        nextBtn.addEventListener('click', () => {
            const cardWidth = container.querySelector('.food-card').offsetWidth + 32; // card size + gap
            const maxScroll = container.scrollWidth - container.parentElement.offsetWidth;
            
            if (scrollPosition < maxScroll) {
                scrollPosition += cardWidth;
                if (scrollPosition > maxScroll) scrollPosition = maxScroll;
                container.style.transform = `translateX(-${scrollPosition}px)`;
            } else {
                // Bounce edge effect or loop back to start
                scrollPosition = 0;
                container.style.transform = `translateX(0px)`;
            }
        });

        prevBtn.addEventListener('click', () => {
            const cardWidth = container.querySelector('.food-card').offsetWidth + 32;
            
            if (scrollPosition > 0) {
                scrollPosition -= cardWidth;
                if (scrollPosition < 0) scrollPosition = 0;
                container.style.transform = `translateX(-${scrollPosition}px)`;
            } else {
                // Loop to end if pressed at start
                const maxScroll = container.scrollWidth - container.parentElement.offsetWidth;
                scrollPosition = maxScroll > 0 ? maxScroll : 0;
                container.style.transform = `translateX(-${scrollPosition}px)`;
            }
        });

        // Responsive handling to reset on viewport resize
        window.addEventListener('resize', () => {
            scrollPosition = 0;
            container.style.transform = `translateX(0px)`;
        });
    }

    
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            // Pehle se majood active class ko sab cards se remove karo
            featureCards.forEach(c => c.classList.remove('feature-card--active'));
            // Sirf current clicked card par active class lagao
            this.classList.add('feature-card--active');
        });
    });
});