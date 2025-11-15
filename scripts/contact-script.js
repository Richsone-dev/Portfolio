document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');

    // Assurez-vous que les deux éléments existent avant d'ajouter l'écouteur
    if (form && status) {
        form.addEventListener('submit', function(event) {
            // 1. Empêche la soumission normale du formulaire (qui provoque la redirection)
            event.preventDefault();

            const data = new FormData(form);

            // 2. Envoie la requête à Formspree en arrière-plan
            fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json' // Demande une réponse JSON pour AJAX
                }
            })
            .then(response => {
                // 3. Traite la réponse
                if (response.ok) {
                    status.style.color = 'green';
                    status.innerHTML = '✅ Merci ! Votre message a été envoyé avec succès.';
                    form.reset(); // Réinitialise les champs du formulaire
                } else {
                    // En cas d'erreur de Formspree (ex: captcha manquant)
                    response.json().then(data => {
                        status.style.color = 'red';
                        if (Object.hasOwn(data, 'errors')) {
                            // Affiche les messages d'erreur spécifiques de Formspree
                            status.innerHTML = '❌ Erreur : ' + data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            status.innerHTML = '❌ Une erreur est survenue lors de l\'envoi du formulaire.';
                        }
                    });
                }
            })
            .catch(error => {
                // En cas d'erreur réseau (ex: pas de connexion)
                status.style.color = 'red';
                status.innerHTML = '❌ Il y a eu un problème de connexion. Veuillez vérifier votre réseau.';
                console.error('Erreur Fetch:', error);
            });
        });
    }
});