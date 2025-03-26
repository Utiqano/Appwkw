document.addEventListener("DOMContentLoaded", function () {

    // Fonction pour afficher le pourcentage avec un effet de transition
    function showPercentage(name, percentage) {
        const percentageTitle = document.getElementById('percentageTitle');
        const percentageValue = document.getElementById('percentageValue');
        const percentageResult = document.getElementById('percentageResult');

        if (percentageTitle && percentageValue && percentageResult) {
            percentageTitle.innerHTML = name;
            percentageValue.innerHTML = `Taux: ${percentage}`;

            // Effet d'animation
            percentageResult.style.opacity = "0";
            percentageResult.style.transform = "translateY(-10px)";
            percentageResult.style.display = "block";

            setTimeout(() => {
                percentageResult.style.opacity = "1";
                percentageResult.style.transform = "translateY(0)";
            }, 200);
        }
    }

    // Gestion du modal vidéo avec correction des liens YouTube
    var videoModal = document.getElementById('videoModal');
    if (videoModal) {
        videoModal.addEventListener('show.bs.modal', function (event) {
            var button = event.relatedTarget;
            var videoUrl = button.getAttribute('data-video');

            // Correction automatique des liens YouTube
            if (videoUrl) {
                if (videoUrl.includes("m.youtube.com")) {
                    videoUrl = videoUrl.replace("m.youtube.com", "www.youtube.com");
                }
                if (videoUrl.includes("watch?v=")) {
                    videoUrl = videoUrl.replace("watch?v=", "embed/");
                }
                if (videoUrl.includes("&feature=youtu.be")) {
                    videoUrl = videoUrl.replace("&feature=youtu.be", "");
                }

                // Mise à jour de l'URL de la vidéo dans le modal
                var videoPlayer = document.getElementById('videoPlayer');
                if (videoPlayer) {
                    videoPlayer.src = videoUrl + "?autoplay=1"; // Lecture automatique
                }
            }
        });

        // Arrêter la vidéo quand le modal est fermé
        videoModal.addEventListener('hidden.bs.modal', function () {
            var videoPlayer = document.getElementById('videoPlayer');
            if (videoPlayer) {
                videoPlayer.src = ""; // Arrêter la vidéo lorsque le modal se ferme
            }
        });
    }

    // Ajout dynamique des événements pour afficher les pourcentages
    document.querySelectorAll(".dropdown-item").forEach(item => {
        item.addEventListener("click", function () {
            let name = this.textContent;
            let percentageMatch = this.getAttribute("onclick").match(/'(\d+%)'/);
            let percentage = percentageMatch ? percentageMatch[1] : "N/A";
            showPercentage(name, percentage);
        });
    });

});


