'use strict';

let allProduct = [];
let namesArr = [];
let votesArr = [];
let shownArr = [];
let numbers = [];
let maxAttempts = 25;
let userAttemptCounter = 0;

let firstImageIndex;
let secondImageIndex;
let thirdImageIndex;

let firstImageElement = document.getElementById('firstImage');
let secondImageElement = document.getElementById('secondImage');
let thirdImageElement = document.getElementById('thirdImage');


function Product(name, source) {
    this.name = name;
    this.source = source;
    this.votes = 0;
    this.shown = 0
    allProduct.push(this);
}

new Product('bag', 'images/bag.jpg');
new Product('banana', 'images/banana.jpg');
new Product('bathroom', 'images/bathroom.jpg');
new Product('boots', 'images/boots.jpg');
new Product('breakfast', 'images/breakfast.jpg');
new Product('bubblegum', 'images/bubblegum.jpg');
new Product('chair', 'images/chair.jpg');
new Product('cthulhu', 'images/cthulhu.jpg');
new Product('dog-duck', 'images/dog-duck.jpg');
new Product('dragon', 'images/dragon.jpg');
new Product('pen', 'images/pen.jpg');
new Product('pet-sweep', 'images/pet-sweep.jpg');
new Product('scissors', 'images/scissors.jpg');
new Product('shark', 'images/shark.jpg');
new Product('sweep', 'images/sweep.png');
new Product('tauntaun', 'images/tauntaun.jpg');
new Product('unicorn', 'images/unicorn.jpg');
new Product('water-can', 'images/water-can.jpg');
new Product('wine-glass', 'images/wine-glass.jpg');



function generateRandomIndex() {
    return Math.floor(Math.random() * allProduct.length);
}
let oldImages;

function render() {

    oldImages = [firstImageIndex, secondImageIndex, thirdImageIndex]


    while (firstImageIndex === secondImageIndex || secondImageIndex === thirdImageIndex || firstImageIndex === thirdImageIndex || oldImages.includes(firstImageIndex) || oldImages.includes(secondImageIndex) || oldImages.includes(thirdImageIndex)) {
        firstImageIndex = generateRandomIndex();
        secondImageIndex = generateRandomIndex();
        thirdImageIndex = generateRandomIndex();

    }

    firstImageElement.src = allProduct[firstImageIndex].source;
    secondImageElement.src = allProduct[secondImageIndex].source;
    thirdImageElement.src = allProduct[thirdImageIndex].source;


    allProduct[firstImageIndex].shown++;
    allProduct[secondImageIndex].shown++;
    allProduct[thirdImageIndex].shown++;
    
}

render();



let imagesSection = document.getElementById('images');
imagesSection.addEventListener('click', handleclick);

function handleclick(event) {

    userAttemptCounter++;
    if (userAttemptCounter <= maxAttempts) {

        if (event.target.id === 'firstImage') {
            allProduct[firstImageIndex].votes++;
        }

        else if (event.target.id === 'secondImage') {
            allProduct[secondImageIndex].votes++;
        }
        else {
            allProduct[thirdImageIndex].votes++;
        }

        render();

    }

    else {


        imagesSection.removeEventListener('click', handleclick);

    }
}


let Button = document.getElementById(`Results`)
let divResult = document.getElementById(`divResult`)
Button.addEventListener(`click`, displayResult)

function displayResult() {
    let ulElement = document.createElement("ul");
    divResult.appendChild(ulElement);

    for (let i = 0; i < allProduct.length; i++) {
        let liElement = document.createElement("li");
        ulElement.appendChild(liElement);
        liElement.textContent = `${allProduct[i].name} was clicked ${allProduct[i].votes} times and was shown ${allProduct[i].shown} times`;
        // document.getElementById("results").appendChild(listElement);
    }
    let handleclick = function(){
        displayResult();
        createChart();
        saveData();
    
    Button.removeEventListener(`click`, displayResult);
}
}

function createChart() {
    const namesArr = []
    const votesArr = []
    const shownArr = []

    for (let i = 0; i < allProduct.length; i+= 1) {
        const image = Product.all[i];

        const singleName = image.name;
        namesArr.push(singleName);

        const singleVote = image.vote;
        votesArr.push(singleVote);
}

const ctx = document.getElementById('resultsChart').getContext('2d');
    const productChart = new Chart(ctx, {
        type: 'bar',

        data: {
            labels: namesArr,
            datasets: [{
                label: 'Image Votes',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: votesArr
            }]
        },

        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

let readProductData = function() {

    let jsonData = localStorage.getItem('productData');

    let parsedData = JSON.parse(jsonData);

    return parsedData;
}

let saveProductData = function() {

    let stringifiedData = JSON.stringify(Product.lineUp);
    
    localStorage.setItem('productData',stringifiedData);

}

let saveData = readProductData();
    if (saveData.length >= Product.lineUp.length) {
        Product.lineUp = saveData;
    
    }

saveData();
