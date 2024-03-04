const bg = document.querySelector("html");

bg.addEventListener("mousemove", (e) => {
    bg.style.backgroundPositionX = -e.offsetX + "px";
    bg.style.backgroundPositionY = -e.offsetY + "px";
});

const firebaseConfig = {
    apiKey: "AIzaSyBFDTGaDQ36aUNOJg-_uzmsAU-uncg3kb0",
    authDomain: "jgkdbtc-chat.firebaseapp.com",
    databaseURL: "https://jgkdbtc-chat-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "jgkdbtc-chat",
    storageBucket: "jgkdbtc-chat.appspot.com",
    messagingSenderId: "819066399057",
    appId: "1:819066399057:web:38c83797cb2cc516d14b70"
  };


firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";"
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    let checkUser = getCookie("username");
    if (checkUser != "") {
        user = checkUser
        return user
    } else {
        user = prompt("Please enter your name to access: ")
        if (user != "" && user != null) {
            setCookie("username", user)
            return user
        }
    }
}

var username = checkCookie(); 
var all_messages = []

document.getElementById("send-message").addEventListener("submit", postChat);
function postChat(e) {
  e.preventDefault();
  const timestamp = Date.now();
  const chatTxt = document.getElementById("chatbox");
  const message = chatTxt.value;
  chatTxt.value = "";
  db.ref("messages/" + timestamp).set({
    usr: username,
    msg: message,
  });
}

const fetchChat = db.ref("messages/");
fetchChat.on("child_added", function (snapshot) {
    const messages = snapshot.val();
    usernamelast = messages.usr;
    usermessage = messages.msg;
    
    all_messages.push("<b>" + usernamelast + ":</b> " + usermessage)

    console.log(all_messages)

    for (var i = 1; i < 27; i++) {
        console.log(i)
        if (all_messages[all_messages.length - i]) {
            console.log(all_messages[all_messages.length - i])
            document.getElementById("chatlog" + i).innerHTML = all_messages[all_messages.length - i];
        }
    }
});