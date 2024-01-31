const timeDisplay = document.querySelector("#timeDisplay");
const startBtn = document.querySelector("#startBtn");
const lapBtn = document.querySelector("#lapBtn");
const resetBtn = document.querySelector("#resetBtn");
//Init
let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let displayOrLap = true;  //get time to display=true, gat lap time = false
let lapCtr = 0;
let intervalId;
let hrs = 0;
let mins = 0;
let secs = 0;
let mSec = 0;


//Event listeners
//Start/Pause
startBtn.addEventListener("click", () => {
    if(paused){ //to start
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 50); //update every #N millisec
    
        //change button text to Pause
        document.getElementById("startBtn").textContent = "Pause"
        //lapbtn color
        document.getElementById("lapBtn").style.backgroundColor = "darkcyan";
    
    }else{ // to pause
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);

        //change button to Resume
        document.getElementById("startBtn").textContent = "Resume"
        //lapbtn color
        document.getElementById("lapBtn").style.backgroundColor = "dimgrey";
    }
});
//Lap
lapBtn.addEventListener("click", () => {
    if(!paused){
        displayOrLap = false;
        updateTime();
        displayOrLap = true;
        lapCtr++;
    }
});
//Reset
resetBtn.addEventListener("click", () => {
    paused = true;
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    currentTime = 0;
    hrs = 0;
    mins = 0;
    secs = 0;
    timeDisplay.textContent = "00:00:00.00";
    document.getElementById("startBtn").textContent = "Start"
    document.getElementById("lapBtn").style.backgroundColor = "dimgrey";

    lapCtr = 0;
    document.getElementById("lapTime1").textContent = ""
    document.getElementById("lapTime2").textContent = ""
    document.getElementById("lapTime3").textContent = ""
    document.getElementById("lapTime4").textContent = ""
    document.getElementById("lapTime5").textContent = ""
});

function updateTime(){
    elapsedTime = Date.now() - startTime;

    mSec = Math.floor(elapsedTime / 10) % 100;
    secs = Math.floor(elapsedTime / 1000 % 60);
    mins = Math.floor(elapsedTime / (1000 * 60) % 60);
    hrs = Math.floor(elapsedTime / (1000 * 60 * 60) % 60);

    mSec = pad(mSec);
    secs = pad(secs);
    mins = pad(mins);
    hrs = pad(hrs);
    
    if(displayOrLap){
        timeDisplay.textContent = `${hrs}:${mins}:${secs}.${mSec}`;
    }else{
        //update lap
        updateLaps();
    }
    
    //in functions-----
    function pad(unit){
        return (("0") + unit).length > 2 ? unit : "0" + unit;   
    }
    
    function updateLaps(){
        let str;
        let lapModulo = lapCtr % 5;;


        switch(lapModulo){
            case 0:
                //copy to lapTime1
                if(lapCtr > 4){
                    lapTime5.textContent = lapTime4.textContent;
                    lapTime4.textContent = lapTime3.textContent;
                    lapTime3.textContent = lapTime2.textContent;
                    lapTime2.textContent = lapTime1.textContent;
                }
                break;
            case 1:
                //jump to lapTime2
                if(lapCtr > 4){
                    lapTime5.textContent = lapTime4.textContent;
                    lapTime4.textContent = lapTime3.textContent;
                    lapTime3.textContent = lapTime2.textContent;
                }
                lapTime2.textContent = lapTime1.textContent;
                break;
            case 2:
                //jump to lapTime3
                if(lapCtr > 4){
                    lapTime5.textContent = lapTime4.textContent;
                    lapTime4.textContent = lapTime3.textContent;
                }
                lapTime3.textContent = lapTime2.textContent;
                lapTime2.textContent = lapTime1.textContent;
                break;
            case 3:
                //jump to lapTime4
                if(lapCtr > 4){
                    lapTime5.textContent = lapTime4.textContent;
                }
                lapTime4.textContent = lapTime3.textContent;
                lapTime3.textContent = lapTime2.textContent;
                lapTime2.textContent = lapTime1.textContent;
                break;
            case 4:
                //jump to lapTime5
                lapTime5.textContent = lapTime4.textContent;
                lapTime4.textContent = lapTime3.textContent;
                lapTime3.textContent = lapTime2.textContent;
                lapTime2.textContent = lapTime1.textContent;
                break;
            default:
                break;
        }
             
        lapTime1.textContent = `Lap ${lapCtr+1}: [ ${hrs}:${mins}:${secs}.${mSec} ]`;
    }

}

//Clock
const dateLabel =  document.getElementById("currentClockDate");
const clockLabel = document.getElementById("currentClockTime");

updateDateTime();
setInterval(updateDateTime,1000);

function updateDateTime(){

    let date = new Date();
    clockLabel.innerHTML = timeFormat(date);
    dateLabel.innerHTML = dateFormat(date);

    function timeFormat(date){
        let hr = date.getHours();
        let min = date.getMinutes();
        let secs = date.getSeconds();
        
        let amPm = hr >= 12 ? "pm" : "am";
        hr = (hr % 12) || 12;

        hr = formatTimeZero(hr);
        min = formatTimeZero(min);
        secs = formatTimeZero(secs);

        return `${hr}:${min}:${secs} ${amPm}`
    }

    function dateFormat(date){
        let dayMonth = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        return `${dayMonth}/${month}/${year}`
    }
    
    function formatTimeZero(time){
        time = time.toString();
        return time.length < 2 ? "0" + time : time;
    }
}
