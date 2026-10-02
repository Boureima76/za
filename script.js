// Menu responsive
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Fermer le menu au clic sur un lien
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Détails des produits (Modal)
    const produitsData = {
        poussin: {
            icon: '🐣',
            titre: 'Nos Poussins',
            description: 'Des poussins vigoureux et en bonne santé, disponibles dès leur premier jour de vie. Nos poussins sont issus de souches locales sélectionnées pour leur robustesse et leur adaptation au climat de Banfora.',
            caracteristiques: [
                'Âge : 1 jour à 3 semaines',
                'Origine : Souches locales sélectionnées',
                'Vaccination : Suivi vétérinaire complet',
                'Alimentation : Naturelle et équilibrée',
                'Mortalité réduite : Taux de survie élevé'
            ],
            prix: 'À partir de 500 FCFA / poussin',
            conseil: 'Idéal pour démarrer ou agrandir votre élevage. Nous fournissons des conseils pour l\'élevage des poussins.'
        },
        poulette: {
            icon: '🐓',
            titre: 'Nos Poulettes',
            description: 'Poulettes prêtes à pondre ou en phase de croissance avancée. Élevées dans des conditions optimales, elles sont vigoureuses et productives.',
            caracteristiques: [
                'Âge : 3 à 5 mois',
                'Prêtes à pondre : 5 à 6 mois',
                'Race : Poule locale de Banfora',
                'Ponte : Excellente productivité',
                'Santé : Suivi vétérinaire régulier'
            ],
            prix: 'À partir de 2 500 FCFA / poulette',
            conseil: 'Parfaites pour produire des œufs frais et savoureux. Nos poulettes s\'adaptent facilement à leur nouvel environnement.'
        },
        poule: {
            icon: '🐔',
            titre: 'Nos Poules',
            description: 'Poules locales adultes, idéales pour la reproduction ou la consommation. Chair ferme, savoureuse et riche en goût, très appréciée dans la cuisine burkinabè.',
            caracteristiques: [
                'Âge : 6 mois et plus',
                'Race : Poule locale du Burkina Faso',
                'Poids : 1,5 à 2,5 kg',
                'Chair : Ferme et savoureuse',
                'Utilisation : Cuisine traditionnelle'
            ],
            prix: 'À partir de 3 500 FCFA / poule',
            conseil: 'La poule locale est parfaite pour vos plats traditionnels. Réservez votre commande à l\'avance pour les grandes quantités.'
        }
    };

    const modal = document.getElementById('modalProduit');
    const modalBody = document.getElementById('modalBody');

    if (modal) {
        document.querySelectorAll('.produit-card').forEach(card => {
            card.addEventListener('click', function() {
                const produitKey = this.getAttribute('data-produit');
                const data = produitsData[produitKey];
                
                if (data) {
                    modalBody.innerHTML = `
                        <div class="modal-produit">
                            <div class="modal-icon">${data.icon}</div>
                            <h2>${data.titre}</h2>
                            <p>${data.description}</p>
                            <h3 style="color: var(--primary); margin: 20px 0 10px;">Caractéristiques :</h3>
                            <ul>
                                ${data.caracteristiques.map(c => `<li>${c}</li>`).join('')}
                            </ul>
                            <div class="prix">
                                <strong>💰 Prix :</strong> ${data.prix}
                            </div>
                            <p style="font-style: italic; color: var(--gray);">
                                <strong>💡 Conseil :</strong> ${data.conseil}
                            </p>
                            <div style="text-align: center; margin-top: 25px;">
                                <a href="contact.html" class="btn btn-primary">Commander maintenant</a>
                            </div>
                        </div>
                    `;
                    modal.classList.add('show');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Fermer le modal
        const closeModal = modal.querySelector('.close-modal');
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            });
        }

        // Fermer au clic en dehors
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });

        // Fermer avec Échap
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }

    // Formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nom = document.getElementById('nom').value.trim();
            const telephone = document.getElementById('telephone').value.trim();
            const sujet = document.getElementById('sujet').value;
            const message = document.getElementById('message').value.trim();
            const formMessage = document.getElementById('formMessage');

            // Validation simple
            if (!nom || !telephone || !sujet || !message) {
                formMessage.textContent = '⚠️ Veuillez remplir tous les champs obligatoires.';
                formMessage.className = 'form-message error';
                return;
            }

            // Validation du téléphone (8 chiffres pour le Burkina)
            const phoneRegex = /^[0-9\s]{8,}$/;
            if (!phoneRegex.test(telephone)) {
                formMessage.textContent = '⚠️ Veuillez entrer un numéro de téléphone valide.';
                formMessage.className = 'form-message error';
                return;
            }

            // Simulation d'envoi réussi
            formMessage.textContent = '✅ Merci ' + nom + ' ! Votre message a bien été envoyé. Nous vous contacterons rapidement au ' + telephone + '.';
            formMessage.className = 'form-message success';
            
            contactForm.reset();

            // Masquer le message après 6 secondes
            setTimeout(() => {
                formMessage.className = 'form-message';
                formMessage.textContent = '';
            }, 6000);
        });
    }

    // Animation au défilement (fade-in)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Appliquer l'animation aux cartes produits, galerie et chiffres
    document.querySelectorAll('.produit-card, .galerie-item, .chiffre-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Défilement fluide pour les liens internes
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});