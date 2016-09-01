/**
 * RPG JS Game
 * Created by Anthony Delgado on 8/25/16.
 */

$(document).ready(function () {

    var winCount = 0;
    var loseCount = 0;
    var gameOver = true;
    var playerCharacter = null;
    var playerCharacterHealth = 100;
    var playerOpponent = null;
    var playerOpponentHealth = 100;
    var players = ['Ryu', 'Chun', 'Ken', 'Cammy', 'Blanka', 'Bison'];

    var opponentSelectDiv = $('.opponentSelect');
    var playerSelectDiv = $('.playerSelect');

    console.log("game is ready!");

    // Adds a source element, and appends it to the audio element, represented
    // by elem.
    function addSource(elem, path) {
        $('<source />').attr('src', path).appendTo(elem);
    }

    function soundEffect(filename, filetype = 'wav') {
      // use jQuery to insert an HTML5 audio element into the DOM
        var player = $('<audio />', {
            autoPlay : 'autoplay'
        });
        addSource(player, '/assets/sounds/' + filename + '.' + filetype);
        $(player).appendTo("body");
    }

    function fightNow(playerFighter, opponentFighter) {

        $("#defenderArea").empty();
        // fightNow(playerCharacter, playerOpponent);
        // playerCharacter
        //
        // playerOpponent
        //
        // defenderArea
        //
        //

        console.log(playerFighter + ' vs ' + opponentFighter);

        //create player #1
        var player = $('<div>');
        player.addClass('col-xs-6');
        player.attr('data-player', playerFighter);
        player.attr('id', playerFighter);
        // player.text(players[i]);

        //create playerAvatar
        var playerAvatar = $(document.createElement('img'));
        playerAvatar.addClass('fighterAvatar');
        playerAvatar.addClass('fighterAvatarPlayer');

        playerAvatar.attr('data-player', playerFighter);
        playerAvatar.attr('alt', playerFighter);
        playerAvatar.attr('src', 'assets/images/players/' + playerFighter + '.gif');
        // playerAvatar.text(players[i]);

        //add playerAvatar to the player container
        $(playerAvatar).appendTo(player);
        // print players to the div with ID arena
        $(player).appendTo("#defenderArea");

        //create player #2 (Opponent)


        //create player #1
        var opponent = $('<div>');
        opponent.addClass('col-xs-6');
        opponent.attr('data-player', opponentFighter);
        opponent.attr('id', opponentFighter);
        // player.text(players[i]);

        //create playerAvatar
        var opponentAvatar = $(document.createElement('img'));
        opponentAvatar.addClass('fighterAvatar');
        opponentAvatar.addClass('fighterAvatarOpponent');
        opponentAvatar.attr('data-player', opponentFighter);
        opponentAvatar.attr('alt', opponentFighter);
        opponentAvatar.attr('src', 'assets/images/players/' + opponentFighter + '.gif');
        // playerAvatar.text(players[i]);

        //add playerAvatar to the player container
        $(opponentAvatar).appendTo(opponent);
        // print players to the div with ID arena
        $(opponent).appendTo("#defenderArea");

        soundEffect('fight');

    }


    function startGame() {

        // When the game starts, the player will choose a character by clicking on the fighter's picture. The player will fight as that character for the rest of the game.

        console.log("loading players!");

        soundEffect('matchBegin');

        $('.startScreen').fadeOut();
        for (var i = 0; i < players.length; i++) {
            console.log(players[i]);
            var player = $('<div>');
            player.addClass('col-xs-4 text-center playerSelect playerSelector');
            player.attr('data-player', players[i]);
            player.attr('id', players[i]);
            // player.text(players[i]);

            //create playerAvatar
            var playerAvatar = $(document.createElement('img'));
            playerAvatar.addClass('playerAvatar');
            playerAvatar.attr('data-player', players[i]);
            playerAvatar.attr('alt', players[i]);
            playerAvatar.attr('src', 'assets/images/players/avatar/' + players[i] + '.png');
            // playerAvatar.text(players[i]);

            //add playerAvatar to the player container
            $(playerAvatar).appendTo(player);
            // print players to the div with ID arena
            $(player).appendTo("#arena");
        }
        gameOver = false;

        $('.playerSelector').on('click', function () {
            /*
             When you click on a playerSelect div
             */

            // the first select is your character
            if ((playerCharacter === null )) {
                playerCharacter = $(this).data('player');
                $('#playerCharacterText').text(playerCharacter);
                console.log('You are now playing as ' + playerCharacter); 
                $(this).addClass('playerSelected');
                $(this).removeClass('playerSelect');

                $('.playerSelect').addClass('opponentSelect');
                $('.playerSelect').removeClass('playerSelect');
                opponentSelectDiv = $('.opponentSelect');
                soundEffect('playerSelect');
            }else{
                // the next selection is your opponent
                // The player chooses an opponent by clicking on an enemy's picture.
                playerOpponent = $(this).data('player');
                $('#playerOpponentText').text(playerOpponent);
                console.log('You are now playing against ' + playerOpponent);
                $(this).addClass('opponentSelected');
                $(this).removeClass('opponentSelect');
                $('.playerScreen').fadeOut();

                fightNow(playerCharacter, playerOpponent);
                $('.fightScreen').fadeIn();
            }

        });


    }

    function resetGame() {

        gameOver = true;
        playerCharacter = null;
        playerCharacterHealth = 100;
        playerOpponent = null;
        playerOpponentHealth = 100;

        //reset health bars tp 100%
        $("#playerOpponentHealthBar").css('width', "100%");
        $("#playerCharacterHealthBar").css('width', "100%");

        // empty players from player select screen
        $('#arena').empty();

        // wait 2 sec before playering intro to restart game
        setTimeout(function () {
            startGame();
        }, 2000);

    }

    function startAttack() {

        var damageOpponent = Math.floor((Math.random() * 40) + 1);

        playerOpponentHealth = playerOpponentHealth - damageOpponent;

        console.log(playerOpponent + 's health is now ' + playerOpponentHealth + ' reduced by ' + damageOpponent);

        $("#playerOpponentHealthBar").css('width', playerOpponentHealth + "%");

        if(damageOpponent > 30){

            soundEffect('hardPunch');

        }else if(damageOpponent < 12){

            soundEffect('punch');

        }else if(playerCharacter === 'Ryu'){

            soundEffect('hadouken');

        }else if(playerCharacter === 'Ken') {

            soundEffect('shoryuken');

        }else if(damageOpponent > 25){

            soundEffect('hardPunch');

        }else{

            soundEffect('punch');
        }

        // if your Opponents Health is less than 1 after this attack you win!
        if (playerOpponentHealth < 1) {
            swal('You Win!');
            winCount++;
            gameOver = true;

            soundEffect('you');
            setTimeout(function () {
                soundEffect('win');
            }, 1000);
            $('.fightScreen').fadeOut();
            $('.playerScreen').fadeIn();
            resetGame();
        } else {

            // if the Opponent is still alive damage the other player after 1 second
            setTimeout(function () {


                var damageCharacter = Math.floor((Math.random() * 45) + 1);

                playerCharacterHealth = playerCharacterHealth - damageCharacter;

                console.log(playerCharacter + 's health is now ' + playerCharacterHealth + ' reduced by ' + damageCharacter);

                if(playerOpponent === 'Ryu'){

                    soundEffect('hadouken');

                }else if(playerOpponent === 'Ken') {

                    soundEffect('shoryuken');

                }else if(damageCharacter > 15){

                    soundEffect('hardPunch');

                }else{

                    soundEffect('punch');
                }

                $("#playerCharacterHealthBar").css('width', playerCharacterHealth + "%");
                if (playerCharacterHealth < 1) {
                    swal('You lose!');
                    loseCount++;
                    gameOver = true;

                    soundEffect('you');
                    setTimeout(function () {
                    soundEffect('loose');
                    }, 1000);
                    $('.fightScreen').fadeOut();
                    $('.playerScreen').fadeIn();
                    resetGame();

                }
            }, 1000);

        }


    }

    // #playerOpponentHealthBar

// Click functions below

    $("#startGame").click(function () {
        //  gameOver = false;
        if (gameOver === true) {
            startGame();
        }
    });
    // fire when user clicks Attack button

    $("#startAttack").click(function () {
        //  gameOver = false;
        startAttack();
    });


});

