var apis4librarians_wordnikofdaySimple = function() {function reqListener() {
    vardata = JSON.parse(this.responseText);
    console.log(data);

    var d1 = document.getElementById("wordnik-wordofday");
    d1.insertAdjacentHTML("beforeend", `<span class="wordnik-word"><a href="https://www.wordnik.com/words/${data.word}">${ data.word } </a></span><span class="wordnik-word-partofspeech"> ${ data.definitions[0].partOfSpeech }</span> <br><span class="wordnik-word-definition">${ data.definitions[0].text }</span>`);
    }
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open(
        "GET",
        "http://api.wordnik.com:80/v4/words.json/wordOfTheDay?api_key=YOUR_API_KEY_HERE"
    );

    oReq.send();
}();