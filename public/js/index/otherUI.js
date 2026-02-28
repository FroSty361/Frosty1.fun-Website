const titleElement = document.title;
const title = "FroSty1.fun   Enjoy Your Stay!";

const SUBSTRING_LENGTH = 12;
const TITLE_CHANGE_TIME = 500;

let currentIndex = 0;

export function initOtherUI()
{
    setInterval(titleChange, TITLE_CHANGE_TIME);
}

function titleChange()
{
    if (currentIndex >= title.length)
    {
        currentIndex = 0;
    }

    let endIndex = currentIndex + SUBSTRING_LENGTH;

    if (endIndex >= title.length)
    {
        endIndex = endIndex - title.length;
    }

    if (currentIndex <= endIndex)
    {
        document.title = title.substring(currentIndex, endIndex);
    }
    else
    {
        document.title = title.substring(endIndex, endIndex + SUBSTRING_LENGTH);
    }

    currentIndex++;
}