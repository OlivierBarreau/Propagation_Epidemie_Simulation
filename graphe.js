var ctx = document.getElementById("grapheTest").getContext('2d');
ctx.fillStyle = "Black";
var label = [];
GameObject.Find()
for (var i = 0; i < 100; i++) {
    label[i] = i;
}

var data = {
    labels: label,
    datasets: [{
        data: valTest,
    }],
};

var config = {
    type: 'bar',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Graphique du test'
            }
        }
    },
};

var grapheTest = new Chart(ctx, config);