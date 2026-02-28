const socket = io();

const userJoinNotification = document.getElementById('userJoinNotification');
const usernameTextField = document.getElementById('usernameTextField');
const usernameInput = document.getElementById('closeUpdatesLogsButton');
usernameInput.addEventListener('click', join);

const MAX_USERNAME_LENGTH = 16;

const DEFAULT_DISPLAY_TIME = 128;

export function initNotifications()
{
    // Init
}

// Input

function join()
{
    let username = usernameTextField.value;

    if (!checkInput(username, "custom", /^[a-zA-Z][a-zA-Z0-9_]+$/))
    {
        username = `Anonymous${getRandomInt(0, 100000)}`;
    }

    if (username.length > MAX_USERNAME_LENGTH)
    {
        username = username.substring(0, MAX_USERNAME_LENGTH);
    }

    socket.emit('join', username);
}

// Output

socket.on('user joined', (username) => {
    const text = `${username} Has Joined!`;
    displayNotification(userJoinNotification, text, "popup");
});

// UI Output

function displayNotification(element, text, displayType)
{
    element.innerText = text;

    switch (displayType)
    {
        case "popup":
            popup(element, 128);
            break;
        case "fadeOut":
            fadeOut(element, 128);
            break;
        default:
            fadeOut(element, DEFAULT_DISPLAY_TIME);
            break;
    }
}

// DisplayTypes

function popup(element, time)
{
    element.style.opacity = 1; // 100%
    element.style.filter = 'alpha(opacity=' + 1 * 100 + ")";

    let timing = 1;

    var timer = setInterval(function () {
        if (timing <= 0.1)
        {
            clearInterval(timer);
            element.style.display = 'none';
        }

        timing -= timing * 0.1;
    }, time);
}

function fadeOut(element, time)
{
    var op = 1;

    var timer = setInterval(function () {
        if (op <= 0.1)
        {
            clearInterval(timer);
            element.style.display = 'none';
        }

        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, time);
}

// Helpers

function checkInput(input, type, customRegex)
{
    var regex;

    switch (type)
    {
        case "number":
            regex = /^[\d]+$/;
            break;
        case "string":
            regex = /^[^0-9*\\\^\/<>_#']+$/;
            break;
        case "email":
            regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,7})+$/;
            break;
        case "custom":
            regex = customRegex;
            break;
    }
    
    if (regex.test(input))
    {
        return true;
    }

    return false;
}

function getRandomInt(min, max)
{ 
  return Math.floor(Math.random() * (max - min + 1) + min);
}