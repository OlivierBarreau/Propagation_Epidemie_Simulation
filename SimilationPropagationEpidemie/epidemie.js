var fenetreBoule = document.getElementById("myCanvas").getContext("2d");
var ctxGraphe = document.getElementById("grapheTest").getContext('2d');

var population = 1000;
var nombreinfectionInitiale = 5;
var nombreinfection = nombreinfectionInitiale;
var nbJourRecup = 10;
var canvas_Largeur = fenetreBoule.canvas.width;
var canvas_Hauteur = fenetreBoule.canvas.height;
var rayonInfection = 7;
var infectionP = 0.2;
var time = 0;
var nombreTest = document.getElementById("NbTest").value;
var valTest = [];
var bolTest = false;
var bolGraphe = false;
var nombreTestEffectue = 0;

function start() {
    document.getElementById("PopulationInitial").value = Math.floor(document.getElementById("PopulationInitial").value)
    document.getElementById("InfectionInitial").value = Math.floor(document.getElementById("InfectionInitial").value)
    population = document.getElementById("PopulationInitial").value;
    nombreTest = document.getElementById("NbTest").value;
    nombreinfectionInitiale = document.getElementById("InfectionInitial").value;
    particlePositionX = [];
    particlePositionY = [];
    particleMotionX = [];
    particleMotionY = [];
    particleSIR = [];
    particleILifeSpan = [];
    particleAnimation = [];
    infectionRecord = [];
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
    repeat();
}

function motion() {
    // fenetreBoule.clearRect(0, 0, canvas_Largeur, canvas_Hauteur);
    fenetreBoule.fillStyle = "Black";
    fenetreBoule.fillRect(0, 0, canvas_Largeur, canvas_Hauteur);
    motionmultiplier = 0.2;
    for (var i = 0; i < particlePositionX.length; i++) {
        if (particleSIR[i] == 0) { fenetreBoule.fillStyle = "#60E4F0" } else if (particleSIR[i] == 1) { fenetreBoule.fillStyle = "#EC4444" } else if (particleSIR[i] == 2) { fenetreBoule.fillStyle = "#6D6D6D" }
        particleMotionX[i] *= 0.98;
        particleMotionY[i] *= 0.98;
        fenetreBoule.beginPath();
        fenetreBoule.arc(particlePositionX[i], particlePositionY[i], 1.1, 0, Math.PI * 2);
        particlePositionX[i] += particleMotionX[i] * motionmultiplier;
        particlePositionY[i] += particleMotionY[i] * motionmultiplier;
        fenetreBoule.fill();
        if (particlePositionX[i] < 5) { particleMotionX[i] += (particlePositionX[i] - 5) / -7.5 + 2 } else if (particlePositionX[i] > 395) { particleMotionX[i] -= (particlePositionX[i] - 395) / 7.5 } else { particleMotionX[i] += Math.random() - 0.5 }
        if (particlePositionY[i] < 5) { particleMotionY[i] += (particlePositionY[i] - 5) / -7.5 + 2 } else if (particlePositionY[i] > 395) { particleMotionY[i] -= (particlePositionY[i] - 395) / 7.5 } else { particleMotionY[i] += Math.random() - 0.5 }
    }
}

function repeat() {
    motion();
    animation();
    infectionCheck();
    checkNumber();
    if (bolTest == true) {
        test();
    }
    grapheTest();
    fenetreBoule.beginPath();

    document.getElementById("popSaine").innerHTML = infectionRecord[time - 1][0];
    document.getElementById("popInf").innerHTML = population - infectionRecord[time - 1][0] - infectionRecord[time - 1][2];
    document.getElementById("popGuer").innerHTML = infectionRecord[time - 1][2];
    document.getElementById("nbTest").innerHTML = nombreTestEffectue;
    window.setTimeout(repeat, 33);
}

function infectionCheck() {
    for (var i = 0; i < particlePositionX.length; i++) {
        if (particleSIR[i] == 1) {
            for (j = 0; j < particlePositionX.length; j++) {
                if (particleSIR[j] == 0) {
                    if (Math.pow(particlePositionX[i] - particlePositionX[j], 2) + Math.pow(particlePositionY[i] - particlePositionY[j], 2) <
                        Math.pow(rayonInfection, 2) && Math.random() < 1 - Math.pow(1 - infectionP, 0.2)) {
                        particleSIR[j] = 1;
                    }
                    particleILifeSpan[j] = Math.random() * (10 * nbJourRecup) + 150;
                    particleAnimation[j] = 0;
                }
            }
        }
        if (particleILifeSpan[i] < 0) { particleSIR[i] = 2 }
        if (particleSIR[i] != 2 && particleSIR[i] != 0) {
            particleILifeSpan[i] -= 1;
        }
    }
}

function checkNumber() {
    infectioncount = [0, 0, 0, 0, 0];
    for (var i = 0; i < particleSIR.length; i++) {
        infectioncount[particleSIR[i]]++;
    }
    infectionRecord[time] = infectioncount;
    time++;
}

//Animation des particules infectes
function animation() {
    fenetreBoule.beginPath();
    for (var i = 0; i < particleSIR.length; i++) {
        if (particleSIR[i] == 1) { fenetreBoule.strokeStyle = "#EC4444" }
        if (particleSIR[i] == 2) { fenetreBoule.strokeStyle = "#0F7F25" }
        if (particleSIR[i] != 0 && particleSIR[i] != 2) {
            fenetreBoule.beginPath();
            if (particleAnimation[i] > 0 && particleAnimation[i] <= 3 * rayonInfection) {
                fenetreBoule.lineWidth = 1.5;
                fenetreBoule.arc(particlePositionX[i], particlePositionY[i], particleAnimation[i] / 3, 0, Math.PI * 2);
            } else if (particleSIR[i] == 1 && particleAnimation[i] > 3 * rayonInfection && particleAnimation[i] < 3.5 * rayonInfection) {
                animationConstant = (particleAnimation[i] - 3 * rayonInfection) / rayonInfection
                fenetreBoule.lineWidth = 3 - animationConstant * 6;
                fenetreBoule.arc(particlePositionX[i], particlePositionY[i], rayonInfection + animationConstant * 4, 0, Math.PI * 2);
            }
            fenetreBoule.stroke();
            particleAnimation[i]++;
            if (particleAnimation[i] > rayonInfection * 3.5 && particleILifeSpan[i] > particleAnimation[i] * 4) {
                particleAnimation[i] = -10;
            }
        }
    }
}

function test() {
    bolTest = true;
    if (nombreTestEffectue == 0) {
        nombreTestEffectue++;
        start();
    }
    if ((nombreTestEffectue <= nombreTest) && (time > 20) && (population - infectionRecord[time - 1][0] - infectionRecord[time - 1][2]) == 0) {
        valTest[nombreTestEffectue - 1] = Math.floor(infectionRecord[time - 1][0]);
        start();
        nombreTestEffectue++;
        var nombreTestTemp = Math.floor(nombreTest) + 1;
        if (nombreTestEffectue == nombreTestTemp) {
            bolTest = false;
            bolGraphe = true;
        }
    }
}

function grapheTest() {
    if (bolGraphe == true) {
        bolGraphe = false;
        var label = [];
        for (var i = 0; i < nombreTest; i++) {
            label[i] = i + 1;
        }

        var data = {
            labels: label,
            datasets: [{
                data: valTest,
                backgroundColor: "#9D0407",
            }],
            hoverBorderWidth: 3,
        };

        var config = {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: 'Graphique du test'
                    }
                }
            },
        };
        var grapheTest = new Chart(ctxGraphe, config);
        var moyenne = 0;
        var somme = 0;
        for (let index = 0; index < valTest.length; index++) {
            somme += valTest[index];
        }
        moyenne = somme / valTest.length;

        var sommeCarre = 0;
        var moyenneCarre = 0;
        for (let index = 0; index < valTest.length; index++) {
            sommeCarre += Math.pow(valTest[index], 2);
        }
        moyenneCarre = sommeCarre / valTest.length;

        var variance = moyenneCarre - Math.pow(moyenne, 2);
        var ecartType = Math.sqrt(variance);

        //Minimun
        var min = 0;
        for (let index = 0; index < valTest.length; index++) {
            if (index == 0) {
                min = valTest[index];
            }
            if (index > 0) {
                if (valTest[index] < min) {
                    min = valTest[index];
                }
            }
        }

        //Maximun
        var max = 0;
        for (let index = 0; index < valTest.length; index++) {
            if (index == 0) {
                max = valTest[index];
            }
            if (index > 0) {
                if (valTest[index] > max) {
                    max = valTest[index];
                }
            }
        }

        document.getElementById("minPS").innerHTML = min;
        document.getElementById("maxPS").innerHTML = max;
        document.getElementById("moyPS").innerHTML = moyenne;
        document.getElementById("varPS").innerHTML = variance;
        document.getElementById("ecartTPS").innerHTML = ecartType;
        console.log(valTest);
    }

}