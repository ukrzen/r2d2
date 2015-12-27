$(function () {
    var ALPHABYTE="abcdefghijklmnopqrstuvwxyz_";
    ALPHABYTE.split("").forEach(function (letter) {
        $("<audio id='" + letter + "Letter' ><source src='media/" + letter + ".ogg' type='audio/ogg' /> <source src='media/" + letter + ".mp3' type='audio/mpeg' />").appendTo("body");
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
                letter='_';
            if(ALPHABYTE.indexOf(letter) !=-1)
            {
                var node = $("#" + letter + "Letter");
                if (node.length > 0) {
                    node[0].play();
                    break;
                }
            }

        }
    }
    $("form").on("submit", function (e) {
        $("audio").each(function () {
           var audio =  $(this)[0];
            audio.pause();
            audio.currentTime = 0;
        });
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
    $("audio").on("ended", playNextLetter);
    setTimeout(function(){
       $("header").addClass("visible");
    },1)

})