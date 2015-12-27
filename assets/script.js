$(function () {
    var ALPHABYTE="abcdefghijklmnopqrstuvwxyz$";
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
        var uaToEn = {А:"A",а:"a",Б:"B",б:"b",В:"V",в:"v",Г:"H",г:"h",Ґ:"G",ґ:"g",Д:"D",д:"d",Е:"E",е:"e",Є:"Ye",є:"ie",Ж:"Zh",ж:"zh",З:"Z",з:"z",И:"Y",и:"y",І:"I",і:"i",Ї:"Yi",ї:"i",Й:"Y",й:"i",К:"K",к:"k",Л:"L",л:"l",М:"M",м:"m",Н:"N",н:"n",О:"O",о:"o",П:"P",п:"p",Р:"R",р:"r",С:"S",с:"s",Т:"T",т:"t",У:"U",у:"u",Ф:"F",ф:"f",Х:"Kh",х:"kh",Ц:"Ts",ц:"ts",Ч:"Ch",ч:"ch",Ш:"Sh",ш:"sh",Щ:"Shch",щ:"shch",Ю:"Yu",ю:"iu",Я:"Ya",я:"ia",Ь:"\"\"",ь:"\""};
        text = text.toLowerCase().replace(/зг/g,"zgh");
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
                letter='$';
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
        location.hash = $("#text").val();
        $("#say").addClass("pulse");
        playNextLetter();
        e.preventDefault();

    });
    if(location.hash)
    {
        $("#text").val(location.hash.slice(1));
    }
    setTimeout(function(){
       $("header").addClass("visible");
    },1)

})