const login = function (event){
  event.preventDefault();
  const user = $('#login-username').val();
  const password = $('#signup-password').val();


  //post request verify username and password .then()
  sessionStorage.setItem('user', user);
  window.location.href = '/chat';
}

$('#login-btn').on('click', login);