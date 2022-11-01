

$(document).ready( function () {
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

    //listen data image from serve

    socket.on('receivePhoto', function(data){
		document.getElementById("showPhoto").src = data.path
	});
  });
  
  
  