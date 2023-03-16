
var newDirection;
var imageFond = new Image();
imageFond.src = "img/fond3.jpg";
var imageSerpent = new Image();
imageSerpent.src = "img/bille.png";
var imageSerpent2 = new Image();
imageSerpent2.src = "img/bille3.png";
var imagePomme = new Image();
var imageTete = new Image();
imageTete.src = "img/tete.png";

var imagesTetes = [];
imagesTetes[0] = new Image();
imagesTetes[1] = new Image();
imagesTetes[2] = new Image();
imagesTetes[3] = new Image();
imagesTetes[0].src = "img/teteD.png";
imagesTetes[1].src = "img/teteB.png";
imagesTetes[2].src = "img/teteG.png";
imagesTetes[3].src = "img/teteH.png";

imagePomme.src = "img/pomme.png";

var isMobile = false;
var meilleurScore = 0;
var pseudoMeilleurScore = "";
function startup() {
    var el = document.getElementsByTagName("canvas")[0];
    el.addEventListener("touchstart", handleStart, false);
    el.addEventListener("touchend", handleEnd, false);
    el.addEventListener("touchcancel", handleCancel, false);
    el.addEventListener("touchleave", handleLeave, false);
    el.addEventListener("touchmove", handleMove, false);
}

var blockSize;
var blockSizeBoutons = 0;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true;
    blockSize = (window.innerWidth * 0.95) / 25;
    blockSizeBoutons = (window.innerWidth / 2) / 3;
}
else {
    blockSize = (window.innerHeight * 0.7) / 25;

}

var ctx;
var ctxDirection;
var delay = 120;
var niveau = 3;
var textWidth = 0;
var textHeight = 0;
var snakee = new Snake([[6, 4], [5, 4], [4, 4], [3, 4], [2, 4]], "right");
var score = 0;
var idUserSauvegarde = 0;
var niveauDifficile = false;
var widthInBlocks = 25;
var heightInBlocks = 25;
var canvasWidth = blockSize * widthInBlocks;
var canvasHeight = blockSize * heightInBlocks;
var canvasDirectionWidth = blockSizeBoutons * 3;
var canvasDirectionHeight = blockSizeBoutons * 3;
var tailleBorderWidth = 5;
var defBorder = tailleBorderWidth.toString() + "px solid";
var applee = new Apple([entierAleatoire(1, widthInBlocks - 1), entierAleatoire(1, heightInBlocks) - 1]);

var canvas;
var canvasDirection;
imagePomme.width = blockSize;
imagePomme.height = blockSize;
var gameStarted = false;
var isGameOver = false;


var textJouer = "APPUYER SUR ESPACE OU CLIQUER ICI POUR JOUER";
var textJouerWidth = 0;

var posXTextJouer = 0;
var posYTextJouer = 0;
var tailleScore;




var posXCursor = 0;
var posYCursor = 0;
var btnInfoGameOver = document.getElementById("btnInfoGameOver");


init();
function entierAleatoire(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function init() {

    canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    canvas.style.border = defBorder;
    canvas.style.display = "block";

    document.getElementById("canvas").appendChild(canvas);
    ctx = canvas.getContext('2d');
    ctx.font = textHeight.toString() + "px buba_demooutline";

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(imageFond, 0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    snakee = new Snake([[6, 4], [5, 4], [4, 4], [3, 4], [2, 4]], "right");
    applee = new Apple([entierAleatoire(1, widthInBlocks - 1), entierAleatoire(1, heightInBlocks - 1)]);
    if (gameStarted) {

        refreshCanvas();


    }
    else {
        affichageMenu();
    }

}
function affichageMenu() {
    retourneMeilleurScore();

    gameStarted = false;
    snakee = new Snake([[6, 4], [5, 4], [4, 4], [3, 4], [2, 4]], "right");
    canvasWidth = blockSize * widthInBlocks;
    canvasHeight = blockSize * heightInBlocks;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    defBorder = tailleBorderWidth.toString() + "px solid";
    canvas.style.border = defBorder;
    canvas.style.margin = "auto";
    tailleScore = (canvas.width / 12).toString() + "px";

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "#0076a8";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);


    textHeight = canvas.width / 30;
    ctx.font = textHeight.toString() + "px buba_demooutline";
    ctx.strokeStyle = "rgb(255, 255, 255)";
    ctx.fillStyle = "rgb(255, 17, 0)";
    ctx.textAlign = "center";
    ctx.fillText("SUPER SNAKE", canvasWidth / 2, 2 * blockSize);



    textJouerWidth = ctx.measureText(textJouer).width;

    posXTextJouer = (canvas.width / 2) - (textJouerWidth / 2);
    posYTextJouer = textHeight * 8;


    ctx.fillText(textJouer, canvasWidth / 2, posYTextJouer + blockSize * 1.5);



    switch (niveau) {
        case 1:

            delay = 200;
            break;

        case 2:

            delay = 150;
            break;

        case 3:

            delay = 100;
            break;


    }


}


function refreshCanvas() {

    canvasWidth = blockSize * widthInBlocks;
    canvasHeight = blockSize * heightInBlocks;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    defBorder = tailleBorderWidth.toString() + "px solid";
    canvas.style.border = defBorder;
    canvas.style.margin = "auto";

    tailleScore = (canvas.width / 10).toString() + "px";
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "#0076a8";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    snakee.advance();
    textHeight = canvas.width / 10;
    ctx.font = textHeight.toString() + "px buba_demooutline";
    ctx.strokeStyle = "rgb(255, 255, 255)";
    ctx.fillStyle = "rgb(255, 17, 0)";
    ctx.textAlign = "center";
    ctx.fillText("SCORE : " + score, canvasWidth / 2, 4 * blockSize);
    if (snakee.checkCollisions()) {
        snakee = new Snake([[6, 4], [5, 4], [4, 4]], "right");
        applee = new Apple([entierAleatoire(1, widthInBlocks - 2), entierAleatoire(1, heightInBlocks - 2)]);

        widthInBlocks = 25;
        heightInBlocks = 25;
        tailleBorderWidth = 5;
        delay = 150;
        if (meilleurScore < score) {
            $('#formMeilleurScore').modal('toggle');
            $('#meilleurScore').text("SCORE : " + score);

        }
        else {
            $('#exampleModalCenter').modal('toggle');
            $('#score').text("SCORE : " + score);
        }

        affichageMenu();
    }
    else {

        ctx.lineWidth = 2;

        ctx.fillStyle = "rgba(250,0,0,0.6)";
        ctx.beginPath();
        ctx.moveTo((canvasWidth / 2), ctx.lineWidth);
        ctx.lineTo((canvasWidth / 2) + (blockSize * 2) - ctx.lineWidth, (blockSize * 2) - ctx.lineWidth);
        ctx.lineTo((canvasWidth / 2) - (blockSize * 2) + ctx.lineWidth, (blockSize * 2) - ctx.lineWidth);
        ctx.fill();
        ctx.closePath();
        ctx.strokeStyle = "rgb(250,250,0)";
        ctx.beginPath();
        ctx.moveTo((canvasWidth / 2), ctx.lineWidth);
        ctx.lineTo((canvasWidth / 2) + (blockSize * 2) - ctx.lineWidth, (blockSize * 2) - ctx.lineWidth);
        ctx.lineTo((canvasWidth / 2) - (blockSize * 2) + ctx.lineWidth, (blockSize * 2) - ctx.lineWidth);
        ctx.closePath();
        ctx.stroke();


        ctx.beginPath();
        ctx.moveTo(canvasWidth - ctx.lineWidth, canvasHeight / 2);
        ctx.lineTo((canvasWidth - (blockSize * 2)) + ctx.lineWidth, (canvasHeight / 2) - (blockSize * 2) + ctx.lineWidth);
        ctx.lineTo((canvasWidth - (blockSize * 2)) + ctx.lineWidth, (canvasHeight / 2) + (blockSize * 2) - ctx.lineWidth);
        ctx.fill();
        ctx.closePath();
        ctx.strokeStyle = "rgb(250,250,0)";
        ctx.beginPath();
        ctx.moveTo(canvasWidth - ctx.lineWidth, canvasHeight / 2);
        ctx.lineTo((canvasWidth - (blockSize * 2)) + ctx.lineWidth, (canvasHeight / 2) - (blockSize * 2) + ctx.lineWidth);
        ctx.lineTo((canvasWidth - (blockSize * 2)) + ctx.lineWidth, (canvasHeight / 2) + (blockSize * 2) - ctx.lineWidth);
        ctx.closePath();
        ctx.stroke();



        ctx.beginPath();
        ctx.moveTo(canvasWidth / 2, canvasHeight - ctx.lineWidth);
        ctx.lineTo((canvasWidth / 2) - (blockSize * 2) + ctx.lineWidth, canvasHeight + ctx.lineWidth - (blockSize * 2));
        ctx.lineTo((canvasWidth / 2) + (blockSize * 2) - ctx.lineWidth, canvasHeight + ctx.lineWidth - (blockSize * 2));
        ctx.fill();
        ctx.closePath();
        ctx.strokeStyle = "rgb(250,250,0)";
        ctx.beginPath();
        ctx.moveTo(canvasWidth / 2, canvasHeight - ctx.lineWidth);
        ctx.lineTo((canvasWidth / 2) - (blockSize * 2) + ctx.lineWidth, canvasHeight + ctx.lineWidth - (blockSize * 2));
        ctx.lineTo((canvasWidth / 2) + (blockSize * 2) - ctx.lineWidth, canvasHeight + ctx.lineWidth - (blockSize * 2));
        ctx.closePath();
        ctx.stroke();


        ctx.beginPath();
        ctx.moveTo(ctx.lineWidth, canvasHeight / 2);
        ctx.lineTo((blockSize * 2) - ctx.lineWidth, (canvasHeight / 2) - (blockSize * 2) + ctx.lineWidth);
        ctx.lineTo((blockSize * 2) - ctx.lineWidth, (canvasHeight / 2) + (blockSize * 2) - ctx.lineWidth);
        ctx.fill();
        ctx.closePath();
        ctx.strokeStyle = "rgb(250,250,0)";
        ctx.beginPath();
        ctx.moveTo(ctx.lineWidth, canvasHeight / 2);
        ctx.lineTo((blockSize * 2) - ctx.lineWidth, (canvasHeight / 2) - (blockSize * 2) + ctx.lineWidth);
        ctx.lineTo((blockSize * 2) - ctx.lineWidth, (canvasHeight / 2) + (blockSize * 2) - ctx.lineWidth);
        ctx.closePath();
        ctx.stroke();
        snakee.draw();
        applee.draw();
        snakee.appleIsEaten();

        setTimeout(refreshCanvas, delay);
    }
}

btnInfoGameOver.addEventListener("click", function (e) {
    e.preventDefault();
    $('#exampleModalCenter').modal('toggle');
});

function drawBlock(ctx, position, num) {
    var x = position[0] * blockSize;
    var y = position[1] * blockSize;


    switch (num) {

        case 0:
            ctx.drawImage(imageSerpent, x, y, blockSize, blockSize);
            break;

        case 1:
            switch (snakee.direction) {
                case "right":
                    ctx.drawImage(imagesTetes[0], x + (blockSize / 2) - ((blockSize * 1.4) / 2), y + (blockSize / 2) - ((blockSize * 1.4) / 2), blockSize * 1.4, blockSize * 1.4);
                    break;

                case "down":
                    ctx.drawImage(imagesTetes[1], x + (blockSize / 2) - ((blockSize * 1.4) / 2), y + (blockSize / 2) - ((blockSize * 1.4) / 2), blockSize * 1.4, blockSize * 1.4);
                    break;

                case "left":
                    ctx.drawImage(imagesTetes[2], x + (blockSize / 2) - ((blockSize * 1.4) / 2), y + (blockSize / 2) - ((blockSize * 1.4) / 2), blockSize * 1.4, blockSize * 1.4);
                    break;

                case "up":
                    ctx.drawImage(imagesTetes[3], x + (blockSize / 2) - ((blockSize * 1.4) / 2), y + (blockSize / 2) - ((blockSize * 1.4) / 2), blockSize * 1.4, blockSize * 1.4);
                    break;
            }

            break;

        default:
            ctx.drawImage(imageSerpent, x, y, blockSize, blockSize);
            break;

    }



}
function Apple(position) {
    this.position = position;
    this.draw = function () {
        ctx.save();
        //ctx.clearRect(position[0]*blockSize,position[1]*blockSize,blockSize,blockSize);
        ctx.drawImage(imagePomme, position[0] * blockSize, position[1] * blockSize, blockSize, blockSize);
        ctx.restore();
    };
}
function Snake(body, direction) {
    this.body = body;
    this.direction = direction;
    this.draw = function () {
        ctx.save();
        ctx.fillStyle = "#ff0000";
        for (var i = 0; i < this.body.length; i++) {
            drawBlock(ctx, this.body[i], i);
        }

        ctx.restore();
    };

    this.drawHead = function () {
        ctx.save();
        var headToDraw;
        switch (this.direction) {
            case "right":
                headToDraw = [[this.body[0][0] - 1, [this.body[0][1] - 1]], [this.body[0][0] - 1, [this.body[0][1] + 1]]];
                break;
            case "left":
                headToDraw = [[this.body[0][0] + 1, [this.body[0][1] - 1]], [this.body[0][0] + 1, [this.body[0][1] + 1]]];
                break;
            case "up":
                headToDraw = [[this.body[0][0] + 1, [this.body[0][1] + 1]], [this.body[0][0] - 1, [this.body[0][1] + 1]]];
                break;

            case "down":
                headToDraw = [[this.body[0][0] - 1, [this.body[0][1] - 1]], [this.body[0][0] - 1, [this.body[0][1] + 1]]];
                break;
        }
        for (var i = 0; i < headToDraw.length; i++) {
            drawBlock(ctx, headToDraw[i]);
        }
    }
    this.advance = function () {
        var nextPosition = this.body[0].slice();

        switch (this.direction) {

            case "right":
                nextPosition[0] += 1;
                break;
            case "left":
                nextPosition[0] -= 1;
                break;

            case "up":
                nextPosition[1] -= 1;
                break;

            case "down":
                nextPosition[1] += 1;
                break;
        }





        this.body.unshift(nextPosition);
        this.body.pop();

    };
    this.setDirection = function (newDirection) {
        var allowedDirections;
        switch (this.direction) {
            case "right":

            case "left":
                allowedDirections = ["up", "down"];
                break;

            case "up":

            case "down":
                allowedDirections = ["right", "left"];
                break;
        }

        if (allowedDirections.indexOf(newDirection) > -1) {
            this.direction = newDirection;
        }
    };
    this.checkCollisions = function () {
        var wallCollision = false;
        var snakeCollision = false;
        var head = this.body[0];
        var headX = head[0];
        var headY = head[1];
        var reste = this.body.slice(1);
        var minX = 0;
        var minY = 0;
        var maxX = widthInBlocks - 1;
        var maxY = heightInBlocks - 1;
        var isNotBetweenHorizontalWall = headX < minX || headX > maxX;
        var isNotBetweenVerticalWall = headY < minY || headY > maxY;
        if (isNotBetweenHorizontalWall || isNotBetweenVerticalWall)
            wallCollision = true;


        for (var i = 0; i < reste.length; i++) {

            if (headX === reste[i][0] && headY === reste[i][1])
                snakeCollision = true;

        }
        return wallCollision || snakeCollision;


    };

    this.appleIsEaten = function () {

        var posAppleX = applee.position[0];
        var posAppleY = applee.position[1];
        var head = this.body[0];
        var headX = head[0];
        var headY = head[1];
        var tail = this.body[this.body.length - 1];
        if (headX === posAppleX && headY === posAppleY) {
            score++;
            if (delay > 50)
                delay--;
            if (niveauDifficile) {
                widthInBlocks -= 1;
                heightInBlocks -= 1;
            }

            do {
                applee.position[0] = entierAleatoire(1, widthInBlocks - 2);
                applee.position[1] = entierAleatoire(1, heightInBlocks - 2);
            } while (testPositionPommeImpossible(applee.position[0], applee.position[1]));
            this.body.push([tail[0] - 1, tail[1]]);

        }
    };

}
function testPositionPommeImpossible(newPositionPommeX, newPositionPommeY) {
    var posImpossible = false;
    for (var i = 0; i < snakee.body.length; i++) {
        var posCorpsX = snakee.body[i][0];
        var posCorpsY = snakee.body[i][1];
        if (newPositionPommeX === posCorpsX && newPositionPommeY === posCorpsY)
            posImpossible = true;

    }
    return posImpossible;
}
$("#validerScore").click(function (event) {
    event.preventDefault();
    if ($("#pseudo").val().length == 0)
        alert("Tapez votre pseudo");
    else {
        $.post(
            'https://bonnardwebeditions.com/addBestScore',
            {
                jeu: "snake",
                score: score,
                pseudo: $("#pseudo").val()

            },

            function (data) {





            },
            'text'
        );
        meilleurScore = score;
        pseudoMeilleurScore = $("#pseudo").val();
        $("#formMeilleurScore").modal('toggle');
    }
});
function retourneMeilleurScore() {

    $.post(
        'https://bonnardwebeditions.com/getBestScore',
        {
            jeu: "snake"


        },
        function (data) {


            meilleurScore = data.score;
            pseudoMeilleurScore = data.pseudo;


        },
        'json'
    );
}
document.onkeydown = function handleKeyDown(e) {

    var key = e.keyCode;
    if (!gameStarted)
        retourneMeilleurScore();
    switch (key) {

        case 37:
            if (gameStarted)
                newDirection = "left";

            break;

        case 38:
            if (gameStarted)
                newDirection = "up";
            else {
                if (niveau > 1)
                    niveau--;
                affichageMenu();
            }
            break;

        case 39:
            if (gameStarted)
                newDirection = "right";
            break;

        case 40:
            if (gameStarted)
                newDirection = "down";

            break;

        case 32:
            if (!gameStarted) {
                gameStarted = true;
                isGameOver = false;
                score = 0;
                refreshCanvas();
            }
            break;
    }
    snakee.setDirection(newDirection);
}

canvas.addEventListener("click", function (e) {
    e.preventDefault();

    var canvasPosition = canvas.getBoundingClientRect();
    var posXClick = (e.clientX - canvasPosition.left) / blockSize;
    var posYClick = (e.clientY - canvasPosition.top) / blockSize;
    if (gameStarted) {
        if (posXClick > 4 && posXClick < 20 && posYClick < 5) {
            newDirection = "up";

        }
        else if (posXClick < 5 && (posYClick > 4 && posYClick < 20)) {
            newDirection = "left";

        }
        else if (posXClick > 19 && posYClick > 4 && posYClick < 20) {
            newDirection = "right";

        }
        else if (posXClick > 4 && posXClick < 20 && posYClick > 19) {
            newDirection = "down";

        }
    }
    if (!gameStarted) {

        gameStarted = true;
        isGameOver = false;
        score = 0;

        refreshCanvas();


    }
    snakee.setDirection(newDirection);
});
canvas.addEventListener("click", function (e) {
    var canvasPosition = canvas.getBoundingClientRect();
    var posXClick = e.clientX - canvasPosition.left;
    var posYClick = e.clientY - canvasPosition.top;
    if (!gameStarted) {
        retourneMeilleurScore();

        affichageMenu();
    }


});


