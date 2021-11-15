'use strict';

function generateRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let productList = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'water-can.jpg',
  'wine-glass.jpg'
];

let products = [];
let leftSideImage = document.querySelector('#left-side-img');
let centerImage = document.querySelector('#center-img');
let rightSideImage = document.querySelector('#right-side-img');
let imagesSection = document.querySelector('#all-products');
let leftImageRandom, centerImageRandom, rightImageRandom;
let totalClicks = 0;
let rounds = document.getElementById('rounds');
let numberRounds = 0;
let imagesPerRound = [];

function Product(url) {
  this.imageUrl = `img/${url}`;
  this.imageName = url.split('.')[0];
  products.push(this);
  this.numberClicks = 0;
  this.numberViews = 0;
}

function randomImage() {
  leftImageRandom = products[generateRandom(0, products.length - 1)];
  centerImageRandom = products[generateRandom(0, products.length - 1)];
  rightImageRandom = products[generateRandom(0, products.length - 1)];
  while (leftImageRandom === centerImageRandom || leftImageRandom === rightImageRandom || centerImageRandom === rightImageRandom || imagesPerRound.includes(leftImageRandom) || imagesPerRound.includes(centerImageRandom) || imagesPerRound.includes(rightImageRandom)) {
    leftImageRandom = products[generateRandom(0, products.length - 1)];
    centerImageRandom = products[generateRandom(0, products.length - 1)];
    rightImageRandom = products[generateRandom(0, products.length - 1)];
  }
  imagesPerRound = [];
  imagesPerRound.push(leftImageRandom);
  imagesPerRound.push(centerImageRandom);
  imagesPerRound.push(rightImageRandom);
  leftSideImage.setAttribute('src', leftImageRandom.imageUrl);
  leftSideImage.setAttribute('alt', leftImageRandom.imageName);
  leftImageRandom.numberViews++;
  centerImage.setAttribute('src', centerImageRandom.imageUrl);
  centerImage.setAttribute('alt', centerImageRandom.imageName);
  centerImageRandom.numberViews++;
  rightSideImage.setAttribute('src', rightImageRandom.imageUrl);
  rightSideImage.setAttribute('alt', rightImageRandom.imageName);
  rightImageRandom.numberViews++;
}

for (let i = 0; i < productList.length; i++) {
  new Product(productList[i]);
}

randomImage();
numberRounds++;
rounds.textContent = ('Round :' + numberRounds);
imagesSection.addEventListener('click', clicks);
function clicks(e) {
  if (e.target.id === 'left-side-img') {
    leftImageRandom.numberClicks++;
    totalClicks++,
    randomImage();
    numberRounds++;
  }

  if (e.target.id === 'center-img') {
    centerImageRandom.numberClicks++;
    totalClicks++;
    randomImage();
    numberRounds++;
  }
  if (e.target.id === 'right-side-img') {
    rightImageRandom.numberClicks++;
    totalClicks++;
    randomImage();
    numberRounds++;
  }
  rounds.textContent = ('Round :' + numberRounds);
  if (totalClicks === 25) {
    imagesSection.removeEventListener('click', clicks);
    leftSideImage.remove();
    centerImage.remove();
    rightSideImage.remove();
    rounds.textContent = ('');

    let buttonEl = document.createElement('button');
    buttonEl.innerText = 'View results';
    buttonEl.id = 'button-id';
    document.getElementById('image-group').appendChild(buttonEl);
    document
      .getElementById('button-id')
      .addEventListener('click',
        () => { showResults(products); }
      );
  }

  function showResults(products) {
    let results = JSON.stringify(products);
    localStorage.setItem('voteResults', results);
    let voteResults = localStorage.getItem('voteResults');
    products = JSON.parse(voteResults);
    let finalReport = document.getElementById('finalReport');
    finalReport.textContent = 'Here are your results! :';
    let report = document.getElementById('report');
    for (let j = 0; j < products.length; j++) {
      let reportList = document.createElement('li');
      reportList.textContent = `${products[j].imageName} had ${products[j].numberClicks} votes and was shown ${products[j].numberViews} times`;
      report.appendChild(reportList);
    }

    let productsNames = [];
    let productsClicks = [];
    let productsViews = [];

    for (let i = 0; i < products.length; i++) {
      let currentProduct = products[i];

      productsNames.push(currentProduct.imageName);
      productsClicks.push(currentProduct.numberClicks);
      productsViews.push(currentProduct.numberViews);
    }

    renderChart(productsNames, productsClicks, productsViews);
  }
}

function storeMemory(){
    let stringItem = JSON.stringify(Product);
      localStorage.setItem('items', stringItem);
  }
    
  function getmemory(){
    let options = JSON.parse(localStorage.getItem('items'));
   if(options){
       Product=options;
     }
     console.log(Product);
     
  }

function renderChart(productsNames, productsClicks, productsViews) {

  let ctx = document.getElementById('chart').getContext('2d');

  new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: productsNames,
      datasets: [{
        label: '# of Votes',
        data: productsClicks,
        backgroundColor: 'rgba(138, 43, 226, 0.2)',
        borderColor: 'rgba(138, 43, 226, 1)',
        borderWidth: 1
      }, {
        label: '# of Views',
        data: productsViews,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
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