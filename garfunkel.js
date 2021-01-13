

let gameOrder = [];
let playerOrder = [];


let playerTurn = false;
let compTurn = false;
let level = 0;
let buttonFlash;//number of button flashes
let intevalID;

let isGood = true;//while player does not make a mistake it is still good
let isStrict = false;
let sound = true;
let isOn = false;//allows player to click on buttons
let playerWins = false;

const levelTitle = $("#level-title");
const greenBtn = $("#green");
const redBtn = $("#red");
const yellowBtn = $("#yellow");
const blueBtn = $("#blue");

const startBtn = $("#start");
const strictBtn = $("#strict");
const onBtn = $("#on");
const offBtn = $("#off");


//strict button pressed
strictBtn.click(strictBtnPressed);

function strictBtnPressed()
{
    if (isStrict == false)
    {
        isStrict = true;
        strictBtn.val("Strict: ON")
    }
    else
    {
        isStrict = false;
        strictBtn.val("Strict: OFF")
    }
   
    // console.log(isStrict);
};


//On button pressed
onBtn.click(onBtnPressed);
function onBtnPressed()
{
    if (isOn == false)
    {
        isOn = true;
        showColor();
        var audioYellow = new Audio("sounds/sound1.mp3").play();  
        levelTitle.text("--");
        
    }
    // console.log("isOn: " + isOn);
    // console.log("compTurn: " + compTurn);
};

offBtn.click(offBtnPressed);
function offBtnPressed()
{
    {
        isOn = false;
        levelTitle.text(" ");
        
        greyColors();
        // clearInterval(IntervalID);

    }
    // console.log(isOn);
};


function clearColor()
{
    
    $("#blue").removeClass("pressed");
    $("#green").removeClass("pressed");
    $("#red").removeClass("pressed");
    $("#yellow").removeClass("pressed");
    $("#blue").removeClass("pressed");
    
};

function greyColors()
{
    //for OFF
    $("#green").addClass("gameOff");
    $("#red").addClass("gameOff");
    $("#yellow").addClass("gameOff");
    $("#blue").addClass("gameOff");
    
};

function showColor()
{
    $("#green").removeClass("gameOff");
    $("#red").removeClass("gameOff");
    $("#yellow").removeClass("gameOff");
    $("#blue").removeClass("gameOff");
};


startBtn.click(startBtnPressed);
function startBtnPressed()
{
    if (isOn == true)
    {
        play();
        
    }
    else
    {
        alert('Click the "On" button before starting a new game.');
    }
    // console.log("compTurn: " + compTurn);
};


function play()
{
    playerWins = false;
    gameArray = [];
    playerArray = [];
    buttonFlash = 0
    level = 1;
    
    levelTitle.text("Score:" + level);
    
    isGood = true;
    createGameArray();

     //Game begins with the computer going first.
     compTurn = true;

    intevalID = setInterval(gameTurn, 500);

    // console.log(gameArray);
};

function createGameArray()
{
    //Fills a random gameArray of 20 random numbers from 1 - 4.
    for (var i = 0; i < 20; i++)
    {
        var randomNumber = Math.floor(Math.random() * 4 ) + 1;
        gameArray.push(randomNumber);
    }
};

function gameTurn()
{
    // console.log("gameTurnActivated");
    // console.log("buttonFlash: " + buttonFlash);
    // console.log("level: " + level);
    isOn = false; 

    //This determines if the number of buttonFlashes equals the score number
    if (buttonFlash == level)//I don't really understand this part
    {
        clearInterval(intevalID);
        compTurn = false;
        clearColor();
        isOn = true;
    }

    if (compTurn == true)
    {
        clearColor();
        setTimeout(function()
        {
            if (gameArray[buttonFlash] == 1)
            {
                greenPressed();
            }
            if (gameArray[buttonFlash] == 2)
            {
                redPressed();
            }
            if (gameArray[buttonFlash] == 3)
            {
                yellowPressed();
            }
            if (gameArray[buttonFlash] == 4)
            {
                bluePressed();
            }
            
            buttonFlash++;


        }, 200);
    }

};

function greenPressed()
{
    if (sound == true){
    var audioGreen = new Audio("sounds/green.mp3").play();  

    }
    sound = true;
    $(".green").addClass("pressed");
};

function redPressed()
{
    if (sound == true){
    var audioRed = new Audio("sounds/red.mp3").play();  

    }
    sound = true;
    $(".red").addClass("pressed");
};

function yellowPressed()
{
    if (sound == true){
    var audioYellow = new Audio("sounds/yellow.mp3").play();  

    }
    sound = true;
    $(".yellow").addClass("pressed");
};

function bluePressed()
{
    if (sound == true){
    var audioBlue = new Audio("sounds/blue.mp3").play();  

    }
    sound = true;
    $(".blue").addClass("pressed");
};


$("#green").click(function() 

    {
        if (isOn == true)
        {
            playerArray.push(1);
            check();
            greenPressed();

                if (!playerWins)
                {
                    setTimeout(function()
                    {
                        clearColor();
                    }, 300);
                }
        }
    })

    $("#red").click(function() 

    {
        if (isOn == true)
        {
            playerArray.push(2);
            check();
            redPressed();

                if (!playerWins)
                {
                    setTimeout(function()
                    {
                        clearColor();
                    }, 300);
                }
        }
    })

    $("#yellow").click(function() 

    {
        if (isOn == true)
        {
            playerArray.push(3);
            check();
            yellowPressed();

                if (!playerWins)
                {
                    setTimeout(function()
                    {
                        clearColor();
                    }, 300);
                }
        }
    })

    $("#blue").click(function() 

    {
        if (isOn == true)
        {
            playerArray.push(4);
            check();
            bluePressed();

                if (!playerWins)
                {
                    setTimeout(function()
                    {
                        clearColor();
                    }, 300);
                }
        }
    })



    function check()
    {

        if (playerArray[playerArray.length - 1] !== gameArray[playerArray.length - 1])
        {
            isGood = false;
            
        }
        if (playerArray.length == 20 && isGood == true)
        {
            winGame();
        }

        if (isGood == false)
        {
            // console.log("flashColor");
            levelTitle.text("GAME OVER!");

            var audioNo = new Audio("sounds/wrong.mp3").play();  
            // setTimeout(function()
            // {
            //     levelTitle.text(level);
            //     clearColor();

            //     if (isStrict == true)
            //     {
            //         play();
            //     }
            //     else
            //     {
            //         compTurn = true;
            //         buttonFlash = 0;
            //         playerArray = [];
            //         isGood = true;
            //         intevalID = setInterval(gameTurn, 800);
                    
            //     }
            // }, 800);

            // sound = false;

        }

        if (level == playerArray.length && isGood == true && playerWins === false)
        {
            level++;
            playerArray = [];
            compTurn = true;
            buttonFlash = 0;
            levelTitle.text("Score:" + level);
            intevalID = setInterval(gameTurn, 800);
        }
        // console.log("isStrict:" + isStrict);
        // console.log("checking...");
        // console.log("isGood:" + isGood);
        // console.log("compTurn:" + compTurn);
        console.log("gameArray: " + gameArray);
        console.log("playerArray: " + playerArray);
        // console.log("level: " + level);
        // console.log("playerArray.length: " + playerArray.length);
    };

    function winGame()
    {
        //flashColor();
        levelTitle.text("WIN!");
        isOn = true;
        playerWins = true;
    };

