var playing= false;
var score;
var action;
var timeremaining;
var correctanswer;
document.getElementById("startreset").onclick= function(){
if(playing == true){
    location.reload();
}
else{
    playing = true;
    score = 0;
    document.getElementById("scorevalue").innerHTML = score;
    document.getElementById("timeremaining").style.display = "block";
    timeremaining = 60;
    document.getElementById("timevalue").innerHTML= timeremaining;
    document.getElementById("gameover").style.display = "none";
    document.getElementById("startreset").innerHTML = "Reset Game";
    startcountdown();
    generate();
}
}

for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick = function(){
        if(playing == true){
            if(this.innerHTML == correctanswer){
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                document.getElementById("wrong").style.display = "none";
                document.getElementById("correct").style.display = "block";
                setTimeout(function(){
                    document.getElementById("correct").style.display = "none";
                }, 1000);
    
                generate();
            }else{
                document.getElementById("correct").style.display = "none";
                document.getElementById("wrong").style.display = "block";
                setTimeout(function(){
                    document.getElementById("wrong").style.display = "none";
                }, 1000);
            }
        }
    }
}

function startcountdown(){
    action = setInterval( function(){
        timeremaining-=1;
        document.getElementById("timevalue").innerHTML= timeremaining;
        if(timeremaining==0){
            stopcountdown();
        document.getElementById("gameover").style.display = "block";
        document.getElementById("gameover").innerHTML = "<p>Game over!<p><p>Your score is " + score + ".</p>";
        document.getElementById("timeremaining").style.display = "none";
        document.getElementById("correct").style.display = "none";
        document.getElementById("wrong").style.display = "none";
        playing = false;
        document.getElementById("startreset").innerHTML = "Start Game";
        }
    } , 2000);
}

function stopcountdown(){
    clearInterval(action);
}

function generate(){
    var x = 1 + Math.round(9*Math.random());
    var y = 1 + Math.round(9*Math.random());
    correctanswer = x*y;
    document.getElementById("question").innerHTML = x + "X" + y;
    var correctposition = 1 + Math.round(3*Math.random());
    document.getElementById("box"+ correctposition).innerHTML = correctanswer;

    var answers = [correctanswer];
    for(i=1 ; i<5 ; i++){
        if(i!=correctposition){
            var wronganswer;
            do{
                wronganswer = (1 + Math.round(9*Math.random()))*(1 + Math.round(9*Math.random()));
            }while(answers.indexOf(wronganswer)>-1)
            document.getElementById("box"+i).innerHTML = wronganswer;
            answers.push(wronganswer);
         }
    }

}