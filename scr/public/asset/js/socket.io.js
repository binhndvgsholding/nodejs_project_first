$(document).ready(function () {
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
  $(".send-mess-user").click(function () {
    var mess = $("textarea[name=messagesUser]").val();
    var receiverId = $("textarea[name=messagesUser]").data("id");
    socket.emit("send_message_private", {
      sender_id: user_id,
      receiver_img: user_img,
      receiver_id: receiverId,
      content: mess,
      created_at: new Date(),
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
  socket.on("new_message_private", (data) => {
    var showMess = "";
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
    ).innerHTML += showMess;
  });
});
