$(document).ready(function(){ 
  socket.on('connect', ()=>{
      socket.emit('user_connect',user_id);
  })

   socket.on('updateUserStatus', (users)=>{
    let useStatusIcon = $('.user-status-icon');
    let useStatusText = $('.user-status-text');
    // useStatusIcon.removeClass('online_icon');
      useStatusIcon.addClass('offline')
      useStatusText.html('<b>Offline</b>')
      $.each(users, function(key, value){
        if(value !=null && value != 0){
          let userIcon = $('.user-icon-'+key)
          let userText = $('.user-text-'+key)
            userIcon.removeClass('offline');
            userText.html('<b>Online</b>')
        }
      })
  })

  // send mess private len serve
  $('.send-mess-user').click(function(){
    var mess = $('textarea[name=messagesUser]').val();

    socket.emit('send_message_private',
     {
        sender_id : user_id,
        receiver_id:82,
        content: mess,
        created_at: new Date()
     })
     var showMess = "";
     showMess += 
     `<div class="d-flex justify-content-end mb-4">
     <div class="msg_cotainer_send">
         ${mess}
         <span class="msg_time_send">8:55 AM, Today</span>
     </div>
     <div class="img_cont_msg">
        <img src="" class="rounded-circle user_img_msg">
     </div>
 </div>`;
     document.querySelector('.show-mess-user-private').innerHTML +=showMess
    
     $('textarea[name=messagesUser]').val('');

     return false
    })
  
    //listen form serve
    socket.on('new_message_private',(data)=>{
        var showMess = "";
     showMess += 
     `<div class="d-flex justify-content-start mb-4">
     <div class="img_cont_msg">
         <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg">
     </div>   
     <div class="msg_cotainer">
       ${data.content}
         <span class="msg_time">8:40 AM, Today</span>
     </div>
     </div>`;
     document.querySelector('.show-mess-user-private').innerHTML +=showMess
    })
  
 
})