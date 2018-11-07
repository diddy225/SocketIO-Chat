const socket = io();

const render = function(str) {
  $("#app").append(str);
};

const scrollBottom = function() {
  $("#app").animate(
    {
      scrollTop: $("#app")[0].scrollHeight
    },
    "slow"
  );
};

const sendMessage = function(event) {
  event.preventDefault();
  const message = $("#message").val();

  if (message) {
    socket.emit("send-message", { sender: name  , message: message });
    scrollBottom();
    $("#message").val("");
  } else {
    alert("Please fill a message!");
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

getMessages();
scrollBottom();
$("#send-btn").on("click", sendMessage);

/*------REGISTER NAME-------*/

let name;
let user2;

const sendName = (event) => {
  event.preventDefault();
  name = $('#user').val();
  socket.emit('new-user', {name: name});

  socket.on('emit-users', (data) => {
    if(name){
      const $select = $('<select>');
      $select.append('<option>Select User</option>')
      data.forEach(name => $select.append(`<option>${name}</option>`));
      $('#select-container').empty();
      $('#select-container').append($select);
    }
  })
}

$('#login-btn').on('click', sendName);

/*-----START CHAT------*/

const startChat = (event) => {
  event.preventDefault();
  //empty chat area
  user2 = $('select').find(':selected').text();
  if(user2){
    let chat = {
      user1: name,
      user2: user2,
      message: 
    }
    $.ajax({
      url: 'api/chat',
      method: 'POST',
      data: chat
    })
  }
}
$('#select-container').on('change', 'select', startChat);
