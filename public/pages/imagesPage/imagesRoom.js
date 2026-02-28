const titleText = document.getElementById('titleText');
const imagesContainer = document.getElementById('imagesContainer');

const favicon = document.getElementById('favicon');

// Buttons

const BUTTON_COLORS = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "violet"
];

const imagesButton = document.getElementById('imagesButton');
const gifsButton = document.getElementById('gifsButton');
const blinkiesButton = document.getElementById('blinkiesButton');
const _88x31sButton = document.getElementById('88x31sButton');
const stampsButton = document.getElementById('stamps');

const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

const MAX_IMAGE_WIDTH = viewportWidth / 6;
const MAX_IMAGE_HEIGHT = viewportHeight / 6;

// Image

const SPAWN_MIN_X = 0;
const SPAWN_MAX_X = document.documentElement.clientWidth / 2;

const SPAWN_MIN_Y = 0;
const SPAWN_MAX_Y = document.documentElement.clientHeight / 2;

const API_BASE = "http://127.0.0.1:3000"; // Change Later

function Init()
{
    initButtons();

    changeDisplayByType("images");

    titleText.innerText = "Cool Images";
}

function initButtons()
{
    imagesButton.addEventListener('click', function() {
        changeDisplayByType("images");
        changeButtonColor(imagesButton);
    });

    gifsButton.addEventListener('click', function() {
        changeDisplayByType("gifs");
        changeButtonColor(gifsButton);
    });

    blinkiesButton.addEventListener('click', function() {
        changeDisplayByType("blinkies");
        changeButtonColor(blinkiesButton);
    });

    _88x31sButton.addEventListener('click', function() {
        changeDisplayByType("88x31s");
        changeButtonColor(_88x31sButton);
    });

    stampsButton.addEventListener('click', function() {
        changeDisplayByType("stamps");
        changeButtonColor(stampsButton);
    });
}

function changeButtonColor(button)
{
    let index = getRandomInt(0, BUTTON_COLORS.length);

    const color = BUTTON_COLORS[index];

    button.style.background = color;
}

function changeFavicon(url)
{
    if (favicon)
    {
        favicon.href = url;
    }
}

async function changeDisplayByType(type)
{
    try
    {
        const uri = `${API_BASE}/assets/images/?id=${type}`;

        const response = await fetch(uri);
    
        if (!response.ok)
        {
            throw new Error(`Could Not Get Images Of Type ${type} Data ${response.status}`);
        }

        const linksData = await response.text();
        
        const links = linksData.split(' ');

        const text = type.slice(0, 0) + type[0].toUpperCase() + type.slice(1); // Make First Letter Uppercase
        titleText.innerText = `Cool ${text}`;

        await displayImages(links);
    }
    catch (error)
    {
        console.error('Fetch Error', error);
    }
}

async function displayImages(links)
{
    clearImages();

    let images = [];

    links.forEach(link => {
        const image = document.createElement('img');
        image.src = link;
        image.id = "image";
        image.classList.add("draggable");

        imagesContainer.appendChild(image);

        images.push(image);
    });

    setTimeout(function () {
        startScaleImages(images);

        startSpawnPositionImages(images);
    }, 100);
}

function startScaleImages(images)
{
    const imagesAmount = images.length;

    let widthSum = 0;
    let heightSum = 0;

    for (let i = 0; i < imagesAmount; i++)
    {
        let image = images[i];

        widthSum += image.width;
        heightSum += image.height;
    }

    const avgWidth = widthSum / imagesAmount;
    const avgHeight = heightSum / imagesAmount;

    let width = avgWidth;
    let height = avgHeight;

    if (avgWidth > MAX_IMAGE_WIDTH)
    {
        width = MAX_IMAGE_WIDTH;
    }

    if (avgHeight > MAX_IMAGE_HEIGHT)
    {
        height = MAX_IMAGE_HEIGHT;
    }

    for (let i = 0; i < imagesAmount; i++)
    {
        let image = images[i];

        image.width = width;
        image.height = height;
    }
}

function startSpawnPositionImages(images)
{
    const imagesAmount = images.length;

    for (let i = 0; i < imagesAmount; i++)
    {
        const image = images[i];

        const x = randomIntFromInterval(SPAWN_MIN_X, SPAWN_MAX_X);
        const y = randomIntFromInterval(SPAWN_MIN_Y, SPAWN_MAX_Y);

        imageTranslateToPosition(image, x, y);
    }
}

function clearImages()
{
    imagesContainer.innerHTML = '';
}

interact('.draggable').draggable({
  listeners: {
    start (event)
    {
      changeFavicon(event.target.src);
    },
    move (event)
    {
        var target = event.target;

        var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
        var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        imageTranslateToPosition(target, x, y);

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    },
  }
});

function imageTranslateToPosition(element, x, y)
{
    element.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
}

function randomIntFromInterval(min, max) // Inclusive
{ 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomInt(min, max) // Inclusive
{
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.addEventListener("DOMContentLoaded", Init);