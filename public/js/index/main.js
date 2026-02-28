import { initUpdateLogs } from "./updateLogs.js";
import { initNotifications } from "./notifications.js";
import { initOtherUI } from "./otherui.js";

// Init

function init()
{
    initUpdateLogs();

    initNotifications();

    initOtherUI();
}

window.addEventListener("DOMContentLoaded", init);