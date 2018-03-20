var config = {
    apiKey: "AIzaSyBglugZd4uAku-uYy69Py4XXNsjv8FbuzM",
    authDomain: "rock-paper-scissors-10c55.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-10c55.firebaseio.com",
    projectId: "rock-paper-scissors-10c55",
    storageBucket: "rock-paper-scissors-10c55.appspot.com",
    messagingSenderId: "561348253105"
};

firebase.initializeApp(config);
var database = firebase.database();

var player1 = {
    username: "none",
    currentPick: "none",
    wins: 0,
    losses: 0,
    ties: 0,
}
var player2 = {
    username: "none",
    currentPick: "none",
    wins: 0,
    losses: 0,
    ties: 0,
}
var username
var password
var passwordConfirm
var email
var newUser
var checkUsername
var checkPassword

var player1Set = false;
var player2Set = false;
var player1Rdy = false;
var player2Rdy = false;

// function results() {
//     if (player1.currentPick == "rock" && player2.currentPick == "paper") {
//         $("#game-status").text(player1.username + " throws rock and " + player2.username + " throws paper!<br>" + player1.username + "is the winner!")
//         player1.wins = (player1.wins + 1)
//         player2.losses = (player2.losses + 1)

//     }



// }





$("#player1-window").hide();
$("#player2-window").hide();
$("#gameplay-window").hide();
$("#chat-window").hide();
$("#player1-buttons").hide();
$("#player2-buttons").hide();


$("#reg-submit").on("click", function (event) {
    event.preventDefault();

    username = $("#reg-username").val().trim();
    password = $("#reg-password").val().trim();
    passwordConfirm = $("#reg-password-confirm").val().trim();

    if (password == passwordConfirm) {
        database.ref().child("users").child(username).set({ username: username, password: password, currentPick: "none", wins: 0, losses: 0, ties: 0, dateAdded: firebase.database.ServerValue.TIMESTAMP, })
        database.ref("users").child(username).once("value").then(function (snapshot) {
            console.log(snapshot.val().username)


        });

        $("#reg-username").val("");
        $("#reg-password").val("");
        $("#reg-password-confirm").val("");
        $("#login-username").val(username);
        $("#login-password").val("");

        alert("Registration complete! Please login to play!");
    } else {
        alert("Passwords do not match. Please try again");
    }
});

$("#login-submit").on("click", function (event) {
    event.preventDefault();

    database.ref("fbPlayer1Set").once("value").then(function (snapshot) {
        if (snapshot.val() == true) {
            player1Set = true
            console.log(player1Set)
            console.log(snapshot.val())
        } else {
            player1Set = false
            console.log(player1Set)
        }
    });

    checkUsername = $("#login-username").val().trim();
    checkPassword = $("#login-password").val().trim();
    console.log(checkUsername)

    if (checkUsername == "") {
        alert("Please enter a username")
    } else {
        database.ref('users').child(checkUsername).once("value").then(function (snapshot) {
            if (snapshot.exists() && (checkPassword == snapshot.val().password)) {
                if (player1Set == false) {
                    $("#player1-waiting").hide();
                    $("#player1-window").show();
                    $("#login-window").hide();
                    $("#gameplay-window").show();
                    $("#chat-window").show();

                    player1.username = (snapshot.val().username)
                    player1.wins = (snapshot.val().wins)
                    player1.losses = (snapshot.val().losses)
                    player1.ties = (snapshot.val().ties)
                    player1.currentPick = (snapshot.val().currentPick)
                    console.log(snapshot.val())
                    $("#player1-username").text(player1.username)
                    $("#player1-wins").text("Wins:" + player1.wins)
                    $("#player1-losses").text("Losses:" + player1.losses)
                    $("#player1-ties").text("Ties:" + player1.ties)
                    player1Set = true;
                    database.ref("fbPlayer1").set(player1)
                    database.ref("fbPlayer1Set").set(true)
                    database.ref("fbPlayer1Set").on("value", function () {
                        database.ref("fbPlayer1Set").once("value").then(function (snapshot) {
                            if (snapshot.val() == false) {
                                database.ref('fbPlayer2').once("value").then(function (snapshot) {
                                    $("#player2-waiting").hide();
                                    $("#player2-window").show();
                                    $("#player1-buttons").show();
                                    $("#player1-status").text("Please Make Your Selection");
                                    $("#game-status").text("Choose Rock, Paper or Scissors!");
                                    $("#player2-buttons").hide();
                                    $("#player2-status").hide();
                                    player2.username = (snapshot.val().username)
                                    player2.wins = (snapshot.val().wins)
                                    player2.losses = (snapshot.val().losses)
                                    player2.ties = (snapshot.val().ties)
                                    player2.currentPick = (snapshot.val().currentPick)
                                    $("#player2-username").text(player2.username)
                                    $("#player2-wins").text("Wins:" + player2.wins)
                                    $("#player2-losses").text("Losses:" + player2.losses)
                                    $("#player2-ties").text("Ties:" + player2.ties)
                                });
                            }
                        })
                    })

                } else {
                    $("#player2-waiting").hide();
                    $("#player2-window").show();
                    $("#login-window").hide();
                    $("#gameplay-window").show();
                    $("#chat-window").show();
                    console.log(snapshot.val())
                    player2.username = (snapshot.val().username)
                    player2.wins = (snapshot.val().wins)
                    player2.losses = (snapshot.val().losses)
                    player2.ties = (snapshot.val().ties)
                    player2.currentPick = (snapshot.val().currentPick)
                    console.log(player1)
                    $("#player2-username").text(player2.username)
                    $("#player2-wins").text("Wins:" + player2.wins)
                    $("#player2-losses").text("Losses:" + player2.losses)
                    $("#player2-ties").text("Ties:" + player2.ties)
                    player1Set = false;
                    database.ref("fbPlayer2").set(player2)
                    database.ref("fbPlayer1Set").set(false)
                    database.ref('fbPlayer1').once("value").then(function (snapshot) {
                        $("#player1-waiting").hide();
                        $("#player1-window").show();
                        $("#player2-buttons").show();
                        $("#player2-status").text("Please Make Your Selection");
                        $("#game-status").text("Choose Rock, Paper or Scissors!");
                        $("#player1-status").hide()
                        player1.username = (snapshot.val().username)
                        player1.wins = (snapshot.val().wins)
                        player1.losses = (snapshot.val().losses)
                        player1.ties = (snapshot.val().ties)
                        player1.currentPick = (snapshot.val().currentPick)
                        $("#player1-username").text(player1.username)
                        $("#player1-wins").text("Wins:" + player1.wins)
                        $("#player1-losses").text("Losses:" + player1.losses)
                        $("#player1-ties").text("Ties:" + player1.ties)
                    });
                }
            } else {
                alert("incorrect username or password. Please try again.")
            }
        });
    }
});


$("#player1-rock").click(function () {
    //p1 makes selection and it is set to p1 current pick
    player1.currentPick = "rock"
    console.log("1 "+currentPick)
    // p1 pick is synced to firebase
    database.ref("fbPlayer1").set(player1)
    console.log("2 "+database.ref("fbPlayer1"))
    // hide choices and update text
    $("#player1-buttons").hide();
    $("#player1-status").text("Waiting for Opponent");
    //log in firebase that p1 has made a selection
    database.ref("fbPlayer1Selected").set(true)
    //tell firebase that when p2 has made a selection to take a snapshot
    database.ref("fbPlayer2Selected").on("value", function (snapshot) {
        //once its is confirmed that p2 has made a selection take a snapshot of fb player 2 capuring thier selection
        if (snapshot.val() == true) {
            database.ref("fbPlayer2").once("value").then(function (snapshot) {
                console.log("3 "+snapshot.val())
                //set local p2 to snapshot value to svae thier selection locally
                player2.currentPick=(snapshot.val().currentPick)
                console.log("4 "+player2.currentPick)
            })
            //once picks have been made show the results and set pciks made back to false for next round
            console.log("5 "+"results")
            database.ref("fbPlayer1Selected").set(false)

            
            if (player1.currentPick == "rock" && player2.currentPick == "paper") {
                $("#game-status").text(player1.username + " throws rock and " + player2.username + " throws paper!<br>" + player1.username + "is the winner!")
                player1.wins = (player1.wins + 1)
                player2.losses = (player2.losses + 1)

            }
        }
    })

})

$("#player1-paper").click(function () {
    player1.currentPick = "paper"
    database.ref("fbPlayer1").set(player1)
    $("#player1-buttons").hide();
    $("#player1-status").text("Waiting for Opponent");
    database.ref("fbPlayer1Selected").set(true)
    database.ref("fbPlayer2Selected").on("value", function (snapshot) {
        if (snapshot.val() == true) {
            console.log("go")
        }
    })
})

$("#player1-scissors").click(function () {
    player1.currentPick = "scissors"
    database.ref("fbPlayer1").set(player1)
    $("#player1-buttons").hide();
    $("#player1-status").text("Waiting for Opponent");
    database.ref("fbPlayer1Selected").set(true)
    database.ref("fbPlayer2Selected").on("value", function (snapshot) {
        if (snapshot.val() == true) {
            console.log("go")
        }
    })
})

$("#player2-rock").click(function () {
    player2.currentPick = "rock"
    database.ref("fbPlayer2").set(player2)
    $("#player2-buttons").hide();
    $("#player2-status").text("Waiting for Opponent");
    database.ref("fbPlayer2Selected").set(true)
    database.ref("fbPlayer1Selected").on("value", function (snapshot) {
        if (snapshot.val() == true) {
            console.log("go")
        }
    })
})

$("#player2-paper").click(function () {
    //p2 makes selection and it is set to p2 current pick
    player2.currentPick = "paper"
    console.log("1 "+currentPick)
    // p2 pick is synced to firebase
    database.ref("fbPlayer2").set(player2)
    console.log("2 "+database.ref("fbPlayer2"))
    // hide choices and update text
    $("#player2-buttons").hide();
    $("#player2-status").text("Waiting for Opponent");
    //log in firebase that p1 has made a selection
    database.ref("fbPlayer2Selected").set(true)
     //tell firebase that when p2 has made a selection to take a snapshot
    database.ref("fbPlayer1Selected").on("value", function (snapshot) {
        //once its is confirmed that p1 has made a selection take a snapshot of fb player 1 capuring thier selection
        if (snapshot.val() == true) {
            database.ref("fbPlayer1").once("value").then(function (snapshot) {
                console.log("3 "+snapshot.val())
                //set local p1 to snapshot value to svae thier selection locally
                player1.currentPick=(snapshot.val().currentPick)
                console.log("4 "+player1.currentPick)
            })
            //once picks have been made show the results and set pciks made back to false for next round
            console.log("5 "+"results")
            database.ref("fbPlayer2Selected").set(false)
            
            
            
            if (player1.currentPick == "rock" && player2.currentPick == "paper") {
                $("#game-status").text(player1.username + " throws rock and " + player2.username + " throws paper!<br>" + player1.username + "is the winner!")
                player1.wins = (player1.wins + 1)
                player2.losses = (player2.losses + 1)

            }

        }
    })

})

$("#player2-scissors").click(function () {
    player2.currentPick = "scissors"
    database.ref("fbPlayer2").set(player2)
    $("#player2-buttons").hide();
    $("#player2-status").text("Waiting for Opponent");
    database.ref("fbPlayer2Selected").set(true)
    database.ref("fbPlayer1Selected").on("value", function (snapshot) {
        if (snapshot.val() == true) {
            console.log("go")
        }
    })
})










//  $(".btn").on("click", function(event) {
//      event.preventDefault();


//  name=$("#name").val().trim();
//  role=$("#role").val().trim();
//  start=$("#startdate").val().trim();
//  rate=$("#monthlyrate").val().trim();

//  parsedStart=moment(start, "YYYY-MM-DD");
//  worked=moment().diff(parsedStart, "months")

//  currentEmp={
//      name: name,
//      role: role,
//      start: start,
//      rate: rate,
//      worked: worked,
//      dateAdded: firebase.database.ServerValue.TIMESTAMP
//  }



//  $("#name").val("");
//  $("#role").val("");
//  $("#startdate").val("");
//  $("#monthlyrate").val("");

//  database.ref().push(currentEmp);

//  console.log(currentEmp);












//  })

//  database.ref().on("child_added", function(childSnapshot){
//      console.log(childSnapshot.val().name);


//      $("#table-body").append("<tr><td>"+childSnapshot.val().name+"</td><td>"+childSnapshot.val().role+"</td><td>"+childSnapshot.val().start+"</td><td>"+childSnapshot.val().worked+"</td><td>"+childSnapshot.val().rate+"</td><td>"+billed+"</td></tr>");

//  });








