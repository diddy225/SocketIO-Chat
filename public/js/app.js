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
  const user = $("#user")
    .val()
    .toUpperCase();

  if (message && user !== "") {
    socket.emit("send-message", { sender: user, message: message });
    scrollBottom();
    $("#message").val("");
  } else {
    alert("Please fill in a Username & Password");
  }
};

const getMessages = function(msg) {
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

socket.on("display-message", data => {
  render(`<p><span class="chatname">${data.sender}</span></span><br/>${data.message}</p>`);
});

getMessages();
scrollBottom();
$("#send-btn").on("click", sendMessage);
