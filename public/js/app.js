const socket = io();

const user1 = localStorage.getItem('user');


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
    socket.emit("send-message", { sender: user1  , message: message });
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

/*-----START CHAT------*/
let user2;

const startChat = (event) => {
  event.preventDefault();
  //empty chat area
  user2 = $('select').find(':selected').text();

  if(user2){
    socket.emit('new-change', {user1: user1, user2: user2})
    socket.on('emit-message', (data) => {
      console.log(data);
    })
  }
}
$('#select-container').on('change', 'select', startChat);
$(document).ready(sendName);