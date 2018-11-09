// const socket = io();
const socket = io({ transports: ['websocket'] });

const postMessage = function(message) {
  // console.log('data', message);
  $.post('http://localhost:5000/api', message);
};
/*
const scrollToBottom = function() {
  // Selectors
  const messages = $('#messages');
  console.log('messages', messages);
  const newMessage = messages.children('li:last-child');
  // Heights
  const clientHeight = messages.prop('clientHeight');
  const scrollTop = messages.prop('scrollTop');
  const scrollHeight = messages.prop('scrollHeight');
  const newMessageHeight = newMessage.innerHeight();
  const lastMessageHeight = newMessage.prev().innerHeight();

  if (
    clientHeight + scrollTop + newMessageHeight + lastMessageHeight + 100 >=
    scrollHeight
  ) {
    messages.scrollTop(scrollHeight);
  }
};
*/
const getMessage = function() {
  $.get('/api', data => {
    console.log(data);
    data.map(d => {
      const formattedTime = moment(d.time).format('h:mm:ss a');
      d.time = formattedTime;
    });
    const template = $('#get-message-template').html();
    const html = Mustache.render(template, data);
    $('#messages').append(html);
  });
};

const sendMessage = function(event) {
  event.preventDefault();

  // const formattedTime = moment(data.time).format('h:mm:ss a');
  const param = jQuery.deparam(window.location.search);
  const message = {
    from: param.name,
    text: $('#message').val()
    // time: formattedTime
  };
  console.log('sendmessage');
  postMessage(message);
  socket.emit('new-message', message);
};

socket.on('connect', () => {
  console.log('Connected to server -- msg from client');
  const params = jQuery.deparam(window.location.search);
  socket.emit('join', params, err => {
    console.log('join error', err);
  });
  $('#room-name-display').html(`<h4>${params.room}</h4>`);
});

socket.on('emit-message', data => {
  const template = $('#message-template').html();
  const formattedTime = moment(data.time).format('h:mm:ss a');
  const html = Mustache.render(template, {
    from: data.from,
    text: data.text,
    time: formattedTime
  });
  $('#messages').append(html);
  console.log('data', data);
  // scrollToBottom();
});

socket.on('userList', users => {
  console.log('users', users);
  const ol = $('<ol></ol>');
  users.forEach(user => {
    ol.append($('<li></li>').text(user));
  });
  $('#users').html(ol);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server -- msg from client');
});

$(() => {
  getMessage();
  $('#send-msg').on('click', sendMessage);
});
