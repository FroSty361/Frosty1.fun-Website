const onOpenUIContainer = document.getElementById('onOpenUIContainer');
const videos = document.getElementsByTagName('iframe');
const _closeUpdatesLogsButton = document.getElementById('closeUpdatesLogsButton');
_closeUpdatesLogsButton.onclick = closeUpdatesLogsButton;

const logReadArea = document.getElementById('updatesLogsList');

const updateLogButtons = document.getElementsByClassName('updateLogButton');

const updatesLogElement = 'updatesLogElement';

const API_BASE = "http://127.0.0.1:3000"; // Change Later

export function initUpdateLogs()
{
    for (let i = 0; i < updateLogButtons.length; i++)
    {
        updateLogButtons[i].addEventListener("click", function(event) {
            updateLogButtonClick(event.target);
        });
    }
}

async function updateLogButtonClick(button)
{
    const id =  button.getAttribute("data-arg1");

    let html = "Undefined";

    try
    {
        const uri = `${API_BASE}/data/updateLogData?id=${id}`;

        const response = await fetch(uri);
    
        if (!response.ok)
        {
            throw new Error(`Could Not Get Update Log Data ${response.status}`);
        }
    
        html = await response.text;

        logReadArea.innerHTML = html;
    }
    catch (error)
    {
        console.error('Fetch Error', error);
    }
}

function closeUpdatesLogsButton()
{
    onOpenUIContainer.style.display = 'none';

    for (let i = 0; i < videos.length; i++)
    {
        let video = videos[i];

        if (video.classList.contains(updatesLogElement))
        {
            video.src = null;
        }
    }
}