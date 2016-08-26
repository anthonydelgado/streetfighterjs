/**
 * RPG JS Game
 * Created by Anthony Delgado on 8/25/16.
 */


var winCount = 0;
var gameOver = true;
var players = [ 'Ryu', 'Chun', 'Ken', 'Cammy', 'Blanka', 'Bison' ];

$( document ).ready(function() {

    console.log( "game is ready!" );

function startGame() {


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
}

$( "#startGame" ).click(function() {
    // alert( "Handler for .click() called." );
    startGame();
});

});