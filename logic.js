var config = {
    apiKey: "AIzaSyBglugZd4uAku-uYy69Py4XXNsjv8FbuzM",
    authDomain: "rock-paper-scissors-10c55.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-10c55.firebaseio.com",
    projectId: "rock-paper-scissors-10c55",
    storageBucket: "rock-paper-scissors-10c55.appspot.com",
    messagingSenderId: "561348253105"
  };
  firebase.initializeApp(config);
  var database= firebase.database();
  

  var player1
  var player2
  var username
  var password
  var passwordConfirm
  var email
  var users="users"
  var newUser
 
  var player1Set=false;
  var player2Set=false;
  var player1Rdy=false;
  var player2Rdy=false;


  $("#reg-submit").on("click", function(event){
      event.preventDefault();

      
      username=$("#reg-username").val().trim();
      password=$("#reg-password").val().trim();
      passwordConfirm=$("#reg-password-confirm").val().trim();

      

      if (password==passwordConfirm){
        
        database.ref().child("users").set(username)
        database.ref().child("users").child(username).set({password:password,dateAdded:firebase.database.ServerValue.TIMESTAMP,})
        
          
          $("#reg-username").val("");
          $("#reg-password").val("");
          $("#reg-password-confirm").val("");

          $("#login-username").val(username);
          $("#login-password").val("");

          alert("Registration complete! Please login to play!");





      }else{
          alert("Passwords do not match");

      }

      

  });
 
 
 
 
 
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
 
 
 
 
 
 
 
 
 