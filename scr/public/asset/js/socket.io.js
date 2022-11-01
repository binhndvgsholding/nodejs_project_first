

$(document).ready( function () {
  socket.on("connect", () => {
    socket.emit("user_connect", user_id);
  });

  socket.on("updateUserStatus", (users) => {
    let useStatusIcon = $(".user-status-icon");
    let useStatusText = $(".user-status-text");
    // useStatusIcon.removeClass('online_icon');
    useStatusIcon.addClass("offline");
    useStatusText.html("<b>Offline</b>");
    $.each(users, function (key, value) {
      if (value != null && value != 0) {
        let userIcon = $(".user-icon-" + key);
        let userText = $(".user-text-" + key);
        userIcon.removeClass("offline");
        userText.html("<b>Online</b>");
      }
    });
  });

  // send mess private len serve
  $(".send-mess-user").click( async  function () {   
    var mess = $("textarea[name=messagesUser]").val();
    var receiverId = $("textarea[name=messagesUser]").data("id");
if(mess ==  ''){
  return false
}
    await socket.emit("send_message_private", {
      sender_id: user_id,
      receiver_img: user_img,
      receiver_id: receiverId,
      content: mess,
      created_at: new Date(),
    });
    socket.on("new_message_private_me", async (dataUser) => {
      var showUser = dataUser.map( (value,index)=>{
        console.log(value);
         return `<li class="active">
         <div class="d-flex bd-highlight">
        <div class="img_cont"> 
        <a href="?id_user=${value.userId}"><img src="/img/${value.img}" class="rounded-circle user_img"></a> 
          <span class="user-status-icon online_icon offline user-icon-${value.userId}"></span>
        </div>
        <div class="user_info">
          <a href="?id_user=${value.userId}"><span>${value.name}</span></a>
          
             <p>${value.content} </p>
          </div>
    
        </div>
        </li>`
       })
    
      document.querySelector('.show-list-user-mess').innerHTML= await showUser.join('')
    });
    var showMess = "";
    showMess += `<div class="d-flex justify-content-end mb-4">
     <div class="msg_cotainer_send">
         ${mess}
         <span class="msg_time_send"></span>
     </div>
     <div class="img_cont_msg">
        <img src="/img/${user_img}" class="rounded-circle user_img_msg">
     </div>
    </div>`;
    document.querySelector(".show-mess-user-private-" + receiverId).innerHTML +=
      showMess;

    $("textarea[name=messagesUser]").val("");

    return false;
  });

  //listen form serve
  socket.on("new_message_private", async (data,dataUser) => {
    var showUser = dataUser.map( (value,index)=>{
      console.log(value);
       return `<li class="active">
       <div class="d-flex bd-highlight">
      <div class="img_cont"> 
      <a href="?id_user=${value.userId}"><img src="/img/${value.img}" class="rounded-circle user_img"></a> 
        <span class="user-status-icon online_icon  user-icon-${value.userId}"></span>
      </div>
      <div class="user_info">
        <a href="?id_user=${value.userId}"><span>${value.name}</span></a>
        
           <p>${value.content} </p>
        </div>
  
      </div>
      </li>`
     })
  
    document.querySelector('.show-list-user-mess').innerHTML= await showUser.join('')
  
    var  showMess = "";
     showMess += `<div class="d-flex justify-content-start mb-4">
     <div class="img_cont_msg">
         <img src="/img/${data.receiver_img}" class="rounded-circle user_img_msg">
     </div>   
     <div class="msg_cotainer">
       ${data.content}
         <span class="msg_time"></span>
     </div>
     </div>`;
     document.querySelector(
      ".show-mess-user-private-" + data.sender_id
    ).innerHTML +=  showMess;
 

  });
});


