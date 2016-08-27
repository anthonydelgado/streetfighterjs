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


    console.log("game is ready!");

    // Adds a source element, and appends it to the audio element, represented
    // by elem.
    function addSource(elem, path) {
        $('<source />').attr('src', path).appendTo(elem);
    }

    function soundEffect(filename, filetype = 'wav') {
      // use jQuery to insert an HTML5 audio element into the DOM
    // <audio autoplay>
    // <source src="horse.ogg" type="audio/wav">
    // </audio>
        var player = $('<audio />', {
            autoPlay : 'autoplay'
        });
        addSource(player, '/assets/sounds/' + filename + '.' + filetype);
        $(player).appendTo("#arena");
    }

    function startGame() {

        // When the game starts, the player will choose a character by clicking on the fighter's picture. The player will fight as that character for the rest of the game.

        console.log("loading players!");

        for (var i = 0; i < players.length; i++) {
            console.log(players[i]);
            var player = $('<div>');
            player.addClass('col-sm-4 playerSelect');
            player.attr('data-player', players[i]);
            player.attr('id', players[i]);
            player.text(players[i]);

            //create playerAvatar
            var playerAvatar = $('<img>');
            playerAvatar.addClass('img-responsive');
            playerAvatar.attr('data-player', players[i]);
            playerAvatar.attr('src', 'assets/images/players/' + players[i] + '.png');
            playerAvatar.text(players[i]);

            //add playerAvatar to the player container
            $(playerAvatar).appendTo(player);
            // print players to the div with ID arena
            $(player).appendTo("#arena");
        }
        gameOver = false;

        $('.playerSelect').on('click', function () {
            /*
             When you click on a playerSelect div
             */

            // the first select is your character
            if ((playerCharacter === null )) {
                playerCharacter = $(this).data('player');
                $('#playerCharacterText').text(playerCharacter);
                console.log('You are now playing as ' + playerCharacter);
                $(this).addClass('col-sm-6');
                $(this).removeClass('col-sm-2 playerSelect');
            } else if ((playerOpponent === null)) {
                // the next selection is your opponent
                // The player chooses an opponent by clicking on an enemy's picture.
                playerOpponent = $(this).data('player');
                $('#playerOpponentText').text(playerOpponent);
                console.log('You are now playing against ' + playerOpponent);
                $(this).addClass('col-sm-6');
                $(this).removeClass('col-sm-2 playerSelect');
                $('.playerSelect').fadeOut();
                soundEffect('fight');
            }
        });

    }

    function startAttack() {

        var damageOpponent = Math.floor((Math.random() * 20) + 1);

        playerOpponentHealth = playerOpponentHealth - damageOpponent;

        console.log(playerOpponent + 's health is now ' + playerOpponentHealth + ' reduced by ' + damageOpponent);

        $("#playerOpponentHealthBar").css('width', playerOpponentHealth + "%");

        // if your Opponents Health is less than 1 after this attack you win!
        if (playerOpponentHealth < 1) {
            swal('You Win!');
            winCount++;
            gameOver = true;
        } else {

            // if the Opponent is still alive damage the other player after 1 second
            setTimeout(function () {


                var damageCharacter = Math.floor((Math.random() * 20) + 1);

                playerCharacterHealth = playerCharacterHealth - damageCharacter;

                console.log(playerCharacter + 's health is now ' + playerCharacterHealth + ' reduced by ' + damageCharacter);

                $("#playerCharacterHealthBar").css('width', playerCharacterHealth + "%");
                if (playerCharacterHealth < 1) {
                    swal('You lose!');
                    loseCount++;
                    gameOver = true;
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