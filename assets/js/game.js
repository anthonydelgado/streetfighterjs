/**
 * RPG JS Game
 * Created by Anthony Delgado on 8/25/16.
 */


var winCount = 0;
var gameOver = true;
var playerCharacter = null;
var playerOpponent = null;
var players = [ 'Ryu', 'Chun', 'Ken', 'Cammy', 'Blanka', 'Bison' ];

$( document ).ready(function() {

    console.log( "game is ready!" );

function startGame() {

    // When the game starts, the player will choose a character by clicking on the fighter's picture. The player will fight as that character for the rest of the game.

    console.log( "loading players!" );

    for(var i = 0; i < players.length; i++ ) {
        console.log(players[i]);
        var player = $('<div>');
        player.addClass('col-sm-2 playerSelect');
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

    $('.playerSelect').on('click', function() {
        /*
         When you click on a playerSelect div
         */
        if((playerCharacter === null ) ){
            playerCharacter = $(this).data('player');
            console.log('You are now playing as ' + playerCharacter);
            $(this).addClass('col-sm-6');
            $(this).removeClass('col-sm-2 playerSelect');
        }else if ((playerOpponent === null)){
            // The player chooses an opponent by clicking on an enemy's picture.
            playerOpponent = $(this).data('player');
            console.log('You are now playing against ' + playerOpponent);
            $(this).addClass('col-sm-6');
            $(this).removeClass('col-sm-2 playerSelect');
        }
    });

}


// Click functions below

$( "#startGame" ).click(function() {
    // alert( "Handler for .click() called." );
    startGame();
});




});