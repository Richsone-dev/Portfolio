document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    let currentSlide = 0; // Cet index sera mis à jour après chaque choix aléatoire

    const nextButton = document.querySelector('.next-arrow');
    const prevButton = document.querySelector('.prev-arrow');

    // Fonction pour afficher une slide spécifique par index
    function showSlide(index) {
        // Cache toutes les slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Assurez-vous que l'index est valide (nécessaire si l'utilisateur clique sur les flèches)
        if (index >= totalSlides) {
            index = 0;
        } else if (index < 0) {
            index = totalSlides - 1;
        }

        currentSlide = index; // Met à jour l'index courant
        
        // Affiche la slide active
        slides[currentSlide].classList.add('active');
    }
    
    // NOUVELLE FONCTION : Sélectionne la prochaine slide au hasard
    function showRandomSlide() {
        let randomIndex;
        
        // Boucle pour s'assurer que l'image suivante est différente de l'image actuelle
        do {
            // Math.floor(Math.random() * totalSlides) génère un entier entre 0 et totalSlides - 1
            randomIndex = Math.floor(Math.random() * totalSlides);
        } while (randomIndex === currentSlide); // Continue tant que l'index est le même

        showSlide(randomIndex);
    }
    
    // =========================================================
    // Défilement automatique ALÉATOIRE toutes les 5 secondes
    // =========================================================
    const autoSlideInterval = setInterval(showRandomSlide, 5000);

    // Les boutons de flèches (Précédent/Suivant) peuvent désormais :
    // 1. Soit continuer à faire défiler séquentiellement (plus intuitif pour les flèches).
    // 2. Soit aussi déclencher un changement aléatoire.
    
    // Nous conservons un comportement séquentiel pour les flèches utilisateur
    nextButton.addEventListener('click', () => {
        showSlide(currentSlide + 1);
        // Optionnel : Réinitialiser le compteur après une interaction utilisateur
        // clearInterval(autoSlideInterval);
        // autoSlideInterval = setInterval(showRandomSlide, 5000);
    });

    prevButton.addEventListener('click', () => {
        showSlide(currentSlide - 1);
        // Optionnel : Réinitialiser le compteur
        // clearInterval(autoSlideInterval);
        // autoSlideInterval = setInterval(showRandomSlide, 5000);
    });

    // Assurez-vous que la première image est visible au chargement
    showSlide(0); 
});