var fenetreBoule = document.getElementById("myCanvas").getContext("2d");

var population = 1000;
var nombreinfectionInitiale = 5;
var nbJourRecup = 10;
var canvas_Largeur = fenetreBoule.canvas.width;
var canvas_Hauteur = fenetreBoule.canvas.height;
var perimetreInfections = 5;

function start() {
    document.getElementById("PopulationInitial").value = Math.floor(document.getElementById("PopulationInitial").value)
    document.getElementById("InfectionInitial").value = Math.floor(document.getElementById("InfectionInitial").value)
    population = document.getElementById("PopulationInitial").value;
    nombreinfectionInitiale = document.getElementById("InfectionInitial").value;
    particlePositionX = [];
    particlePositionY = [];
    particleMotionX = [];
    particleMotionY = [];
    particleSIR = [];
    particleILifeSpan = [];
    particleAnimation = [];
    for (var i = 0; i < population; i++) {
        particlePositionX[i] = Math.random() * 400 + 2;
        particlePositionY[i] = Math.random() * 400 + 2;
        particleMotionX[i] = Math.random() * 4 - 2;
        particleMotionY[i] = Math.random() * 4 - 2;
        if (i < nombreinfectionInitiale) {
            particleSIR[i] = 1;
            particleILifeSpan[i] = 250;
            particleAnimation[i] = 0;
        } else {
            particleSIR[i] = 0;
        }
    }
    repeat()
}

function motion() {
    fenetreBoule.clearRect(0, 0, canvas_Largeur, canvas_Hauteur);
    fenetreBoule.fillStyle = "Black";
    fenetreBoule.fillRect(0, 0, canvas_Largeur, canvas_Hauteur);
    motionmultiplier = 0.6;
    for (var i = 0; i < particlePositionX.length; i++) {
        if (particleSIR[i] == 0) { fenetreBoule.fillStyle = "#60E4F0" } else if (particleSIR[i] == 1) { fenetreBoule.fillStyle = "#EC4444" } else if (particleSIR[i] == 2) { fenetreBoule.fillStyle = "#6D6D6D" }
        particleMotionX[i] *= 0.98;
        particleMotionY[i] *= 0.98;
        fenetreBoule.beginPath();
        fenetreBoule.arc(particlePositionX[i], particlePositionY[i], 1.1, 0, Math.PI * 2);
        particlePositionX[i] += particleMotionX[i] * motionmultiplier;
        particlePositionY[i] += particleMotionY[i] * motionmultiplier;
        fenetreBoule.fill();
        if (particlePositionX[i] < 10) { particleMotionX[i] += (particlePositionX[i] - 5) / -7.5 + 2 } else if (particlePositionX[i] > 390) { particleMotionX[i] -= (particlePositionX[i] - 390) / 7.5 } else { particleMotionX[i] += Math.random() - 0.5 }
        if (particlePositionY[i] < 10) { particleMotionY[i] += (particlePositionY[i] - 5) / -7.5 + 2 } else if (particlePositionY[i] > 390) { particleMotionY[i] -= (particlePositionY[i] - 390) / 7.5 } else { particleMotionY[i] += Math.random() - 0.5 }
    }
}

function repeat() {
    motion();
    animation();
    infectionCheck();
    fenetreBoule.beginPath();
    window.setTimeout(repeat, 25);
}

function infectionCheck() {

}

//Animation des particules infectes
function animation() {
    for (var i = 0; i < particleSIR.length; i++) {
        if (particleSIR[i] == 1) { fenetreBoule.strokeStyle = "#EC4444" }
        if (particleSIR[i] == 3) { cInf.strokeStyle = "#D6EA50" }
        if (particleSIR[i] != 0 && particleSIR[i] != 2) {
            fenetreBoule.beginPath();
            if (particleAnimation[i] > 0 && particleAnimation[i] <= 3 * perimetreInfections) {
                fenetreBoule.lineWidth = 1.5;
                fenetreBoule.arc(particlePositionX[i], particlePositionY[i], particleAnimation[i] / 1.5, 0, Math.PI * 2);
            }
        } else if (particleAnimation[i] > 1.5 * perimetreInfections && particleAnimation[i] < 2 * perimetreInfections) {
            animationConstant = (particleAnimation[i] - 1.5 * perimetreInfections) / perimetreInfections
            fenetreBoule.lineWidth = 1.5 - animationConstant * 6;
            fenetreBoule.arc(particlePositionX[i], particlePositionY[i], perimetreInfections + animationConstant * 4, 0, Math.PI * 2);
        }
        fenetreBoule.stroke();
        particleAnimation[i]++
            if (particleAnimation[i] > perimetreInfections * 2 && particleILifeSpan[i] > particleAnimation[i] * 4) {
                particleAnimation[i] = -10;
            }
    }
}