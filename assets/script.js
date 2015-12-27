$(function () {
    var ALPHABYTE="abcdefghijklmnopqrstuvwxyz!";
    var sounds = {};
    ALPHABYTE.split("").forEach(function (letter) {
        sounds[letter]=  new Howl({
            urls: [ "media/" + letter + ".mp3","media/" + letter + ".ogg"],
            "onend":function(){
              playNextLetter();
            }
        });

     });


    function transliterate(text)
    {
        var uaToEn = {А:"A",а:"a",Б:"B",б:"b",В:"V",в:"v",Г:"H",г:"h",Ґ:"G",ґ:"g",Д:"D",д:"d",Е:"E",е:"e",Є:"Ye",є:"ye",Ж:"Zh",ж:"zh",З:"Z",з:"z",И:"Y",и:"y",І:"I",і:"i",Ї:"Yi",ї:"yi",Й:"J",й:"j",К:"K",к:"k",Л:"L",л:"l",М:"M",м:"m",Н:"N",н:"n",О:"O",о:"o",П:"P",п:"p",Р:"R",р:"r",С:"S",с:"s",Т:"T",т:"t",У:"U",у:"u",Ф:"F",ф:"f",Х:"X",х:"x",Ц:"C",ц:"c",Ч:"Ch",ч:"ch",Ш:"Sh",ш:"sh",Щ:"Shh",щ:"shh",Ю:"Yu",ю:"yu",Я:"Ya",я:"ya",Ь:"\"\"",ь:"\""};
        return text.split(" ")
            .map(function(word){
               return word.charAt(0).toUpperCase() + word.slice(1);
             }).join(" ")
             .split('')
             .map(function(letter){
                return uaToEn[letter] ? uaToEn[letter] : letter;
             })
             .join("")
             .toLowerCase();

    }
    function playNextLetter(){
        while (true) {
            var letter = window.currentWord.shift();
            if (typeof letter === 'undefined' ||  !window.currentWord)
            {
                $("#say").removeClass("pulse");
                break;
            }
            $("#translation").val( $("#translation").val() + letter);
            if(letter==" ")
                letter='~';
            if(ALPHABYTE.indexOf(letter) !=-1)
            {
                var sound = sounds[letter];
                sound.play();
                break;

            }

        }
    }
    $("form").on("submit", function (e) {

        $("#translation").val("");
        ga('send', {
            'hitType': 'event',
            'eventCategory': 'Main',
            'eventAction':'Say' ,
            'eventLabel':  $("#text").val(),
            'eventValue': 1
        });
        window.currentWord = transliterate($("#text").val()).split("");
        $("#say").addClass("pulse");
        playNextLetter();
        e.preventDefault();

    });

    setTimeout(function(){
       $("header").addClass("visible");
    },1)

})