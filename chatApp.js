var textbox = document.querySelector("#text-input");
var button = document.getElementById("button");

//Input Message event listeners
button.addEventListener("onclick", function(){
  sendMessage();  
  receiveMessage();
  scrollToBottom();
});

textbox.addEventListener("change", function(){
  sendMessage();
  receiveMessage();
  scrollToBottom();
})

function sendMessage(){
  var sentChat = document.querySelector(".outgoing-chat-container");
  var t1 = document.getElementById("target-message"); // Target arera for cloned node to be placed in the HTML
  // clone sent message
  var clone = sentChat.cloneNode(true);
  clone.classList.add("new-outgoing-chat");
  // Add the timestamp and the input from the text box into node clone
  clone.innerHTML = "<div class='outgoing-chats-img'><img src='human-icon.png'></div><div class='outgoing-chats-msg'><div class='outgoing-text-container'><p>" + textbox.value + "</p></div></div><span class='time-sent'>" + formatAMPM(new Date) + " | " + Date().substring(4, 10) + "</span></div></div>";
  //Place cloned node (new message) into target area
  t1.appendChild(clone);   
  textbox.value = '';
}

function receiveMessage(){
    var receivedChat = document.querySelector(".received-chat-container");
    var t1 = document.getElementById("target-message"); // Target arera for cloned node to be placed in the HTML
    var clone = receivedChat.cloneNode(true);
    clone.classList.add("new-received-chat");
    // Add the timestamp and the random generated reply into node clone
    clone.innerHTML = "<img id='sender-pic' src='chatBot-icon.jpg'><div id='received-msg'><div class='received-msg-inbox'><p class='received-msg-text'>" + generateComputerTalk() + "</p></div></div><span class='time-received'>" + formatAMPM(new Date) + " | " + Date().substring(4, 10) + "</span></div>";
    t1.appendChild(clone);   
}

//Create a scroll function so that when new messages appear they are visable
function scrollToBottom() {
  const messages = document.getElementById('chat-page');
  messages.scrollTop = messages.scrollHeight;
}

function generateComputerTalk(){
  var computerLanguage = ["bleep", "bloop", "blurrrb", "beep", "...Loading.."] // Array of words the computer will use to make sentences
  var sentenceLength = Math.floor(Math.random() * 8) + 1; // added one so every generated message is at least one word long
  var computerSays = ''
  //when sentance length is defined, generate random words from computerLanguage array and add to var computerSays
  for(i = 0; i < sentenceLength; i++){
      var randomWord = computerLanguage[Math.floor(Math.random() * computerLanguage.length)];
      computerSays += randomWord + " ";
  }
  return computerSays;
}

// convert 24hr to 12hr time For the time stamp on each new message
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}