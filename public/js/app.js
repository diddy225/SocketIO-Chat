const socket = io();

const user1 = sessionStorage.getItem('user');

//RENDER
const render = function(str) {
  $("#app").append(str);
};

//KEEP THE CHAT SCROLLED TO LAST MESSAGE
const scrollBottom = function() {
  $("#app").animate(
    {
      scrollTop: $("#app")[0].scrollHeight
    },
    "slow"
  );
};

const sendName = () => {
  socket.emit('new-user', {name: user1});

  socket.on('emit-users', (data) => {
    if(data){
      const $select = $('<select>');
      $select.append('<option>Select User</option>')
      data.forEach(name => $select.append(`<option>${name}</option>`));
      $('#select-container').empty();
      $('#select-container').append($select);
    }
  })
}

const sendMessage = function(event) {
  event.preventDefault();
  const message = $("#message").val();

  if ( message ) {
    socket.emit("send-message", { sender: user1, message: message });
    scrollBottom();
    $("#message").val("");
  } else {
    alert("Chat box empty!");
  }
};

const getMessages = function() {
  $("#app").empty();
  $.ajax({
    url: "/api/chat",
    method: "GET",
    dataType: "json"
  }).then(data => {
    data.forEach(ele => {
      render(`<p><span class="chatname">${ele.sender}</span></span><br/>${ele.message}</p>`);
    });
  });
};

socket.on("display-message", (data) => {
  render(`<p><span class="chatname">${data.sender}</span></span><br/>${data.message}</p>`);
});

/*-----START CHAT------*/
const startChat = (event) => {
  event.preventDefault();
  const user2 = $('select').find(':selected').text();

  if( user2 !== "Select User" ){
    window.open("./private.html", "private chat", "height=500,width=500");
    socket.emit('new-change', { user1: user1, user2: user2 });

    socket.on('emit-message', (data) => {
      console.log(data)
    })
  }
}

$(document).ready(sendName);
$("#send-btn").on("click", sendMessage);
getMessages();
scrollBottom();
$('#select-container').on('change', 'select', startChat);