import '../ExempleSimulation/epidemic-simulator-main/chocolate.js';



var nombreSimulation = 1000;
var valPopSaine = [];

function startT() {
    for (let index = 0; index < nombreSimulation; index++) {
        start();
        while (population - infectionRecord[time - 1][0] - infectionRecord[time - 1][2] != 0) {}
        valPopSaine[index] = infectionRecord[time - 1][0];
        console.log(valPopSaine);
    }

}