const messageSuccess = "Bravo ! ";
const messageErrorWrongClick = "Ce n'est pas le bon clic";
const messageErrorClickOutside = "Clic au mauvais endroit"
const backgroundColorSuccess = "#4CAF50";
const backgroundColorError = "red"

const main = document.getElementById('main');
let score = 0;

// Gestion des notifications
let notificationContainerSuccess = document.getElementById('notifications-success');
let notificationContainerError = document.getElementById('notifications-error');

function showFeedback(message, success) {
    let notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
   
    // On définit la couleur de fond de la notification selon qu'on a un succès ou une erreur
    // On l'ajoute à gauche (succès) ou à droite (erreur)

    // On supprime les notifications erreurs si on a un succès (et réciproquement)
    // pour ne pas troubler l'affichage
    if (success) {
        notification.style.backgroundColor = backgroundColorSuccess;
        notificationContainerSuccess.appendChild(notification);
        notificationContainerError.innerHTML="";
    } else {
        notification.style.backgroundColor = backgroundColorError;
        notificationContainerError.appendChild(notification);
        notificationContainerSuccess.innerHTML="";
    }
  
    // Déclenche la transition CSS en forçant une réparation de style
    // (reflow) avant d'ajouter la classe 'show'.
    void notification.offsetWidth;
  
    notification.classList.add('show');
  
    // Masque la notification après un certain délai
    setTimeout(() => {
      notification.classList.remove('show');
      // Supprime la notification du DOM après la transition
      notification.addEventListener('transitionend', () => {
        notification.remove();
      });
    }, 2000);
  }


function createRandomCircle() {
    // Crée un élément div pour le cercle
    const circle = document.createElement('div');

    // Détermine aléatoirement la couleur et le texte du cercle
    const isRed = Math.random() < 0.5;
    circle.className = 'circle ' + (isRed ? 'red' : 'blue');
    circle.innerText = isRed ? 'Clic gauche' : 'Clic droit';

    // Positionne le cercle de manière aléatoire à l'intérieur de l'élément main
    const maxX = main.clientWidth - circle.clientWidth;
    const maxY = main.clientHeight - circle.clientHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    circle.style.left = randomX + 'px';
    circle.style.top = randomY + 'px';

    // Détection des clics
    // Clic droit
    circle.addEventListener('contextmenu', function (event) {
        event.preventDefault();
        if ((!isRed)) {    
            score++;
            showFeedback(messageSuccess, true)
        } else {
            showFeedback(messageErrorWrongClick, false)
        }
        refresh(circle, score)
    });
    // Clic gauche
    circle.addEventListener('click', function (event) {
        if (
            (isRed && event.button === 0) 
        ) {
            showFeedback(messageSuccess, true)
            score++;
        } else {
            showFeedback(messageErrorWrongClick, false)
        }
        refresh(circle, score)
    });
    // Ajoute le cercle à l'élément main
    main.appendChild(circle);
}


function refresh(circle, score) {
    // Met à jour le score affiché
    if (score) {document.getElementById('score').innerText = 'Score: ' + score;}

    // Supprime le cercle actuel
    circle.remove();

    // Crée un nouveau cercle
    createRandomCircle();
}

// Gestion des clics hors du cercle
function clickOutside() {
    const childElement = main.firstChild;
    if (event.target.tagName != "DIV") {
        showFeedback(messageErrorClickOutside, false)
    }
    refresh(childElement, false)
    childElement.remove();
}

document.addEventListener('click', function (event) {
    clickOutside();
})
document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    clickOutside();
})



createRandomCircle();


