const template = document.createElement('template');
template.innerHTML = `
<style>
  *{
    box-sizing: border-box;
  }
  li{
    list-style: none;
  }
  :host{
    width: 100%;
    height: 100%;
    background-color: #373338;
    background-size: 50px;
    display: flex;
    flex-direction: column;
  }
  
 .header{
    position: absolute;
    left: 0; top: 0;
    background-color: #8E24AA;
    width: 100%;
    height: 60px;
    z-index: 1;
 }
  
  .header .message {
    padding-left: 50px;
    line-height: 60px;
    float: left;
    color: #f8fff9;
    font-weight: bold;
 } 
  .wrap{
    margin-top: 60px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-end;
  }
    dialog-box{
      box-sizing: border-box;
      border: 1px solid black;
      width: 100%;
      height: 100px;
      padding: 10px;
      background-color: #f8fff4;
  }
  
   .buttonNew{
      position: absolute;
      bottom: 30px;
      right: 30px;
      width: 60px;
      height: 60px;
      opacity: 0.6;
      background-color: #fff91e;
      border-radius: 30px;
      transition-duration: 0.4s;
      cursor: pointer;
      animation: pulse 2s infinite;
      box-shadow: 0 0 0 rgba(204,169,44, 0.4);
 }
 
    .pulse:hover {
    animation: none;
   }

@-webkit-keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(204,169,44, 0.4);
  }
  70% {
      box-shadow: 0 0 0 10px rgba(204,169,44, 0);
  }
  100% {
      box-shadow: 0 0 0 0 rgba(204,169,44, 0);
  }
}
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(204,169,44, 0.4);
  }
  70% {
      box-shadow: 0 0 0 10px rgba(204,169,44, 0);
  }
  100% {
      box-shadow: 0 0 0 0 rgba(204,169,44, 0);
  }
  
     .header #nav-icon1 {
  width: 60px;
  height: 45px;
  position: relative;
  
  margin: 50px auto;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .5s ease-in-out;
  -moz-transition: .5s ease-in-out;
  -o-transition: .5s ease-in-out;
  transition: .5s ease-in-out;
  cursor: pointer;
}

  #nav-icon1 span {
  display: block;
  position: absolute;
  height: 9px;
  width: 100%;
  background: #d3531a;
  border-radius: 9px;
  opacity: 1;
  left: 0;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .25s ease-in-out;
  -moz-transition: .25s ease-in-out;
  -o-transition: .25s ease-in-out;
  transition: .25s ease-in-out;
}

#nav-icon1 span:nth-child(1) {
  top: 0px;
}

#nav-icon1 span:nth-child(2) {
  top: 18px;
}

#nav-icon1 span:nth-child(3) {
  top: 36px;
}

#nav-icon1.open span:nth-child(1) {
  top: 18px;
  -webkit-transform: rotate(135deg);
  -moz-transform: rotate(135deg);
  -o-transform: rotate(135deg);
  transform: rotate(135deg);
}

#nav-icon1.open span:nth-child(2) {
  opacity: 0;
  left: -60px;
}

#nav-icon1.open span:nth-child(3) {
  top: 18px;
  -webkit-transform: rotate(-135deg);
  -moz-transform: rotate(-135deg);
  -o-transform: rotate(-135deg);
  transform: rotate(-135deg);
}
}
</style>
<div class="header">
  <div id="nav-icon1">
  <span></span>
  <span></span>
  <span></span>
    </div>
  <a class="message">Сообщения</a>
</div>
<div class="wrap"></div>
<div class="buttonNew"></div>
`;
/*
  $(document).ready(function(){
    $('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
      $(this).toggleClass('open');
    });
  });
 */

class DialogList extends HTMLElement {
  constructor() {
    super();

    this.numberOfID = 0;

    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$content = this.shadowRoot.querySelector('.wrap');
    this.$newChat = this.shadowRoot.querySelector('.buttonNew');

    this.$newChat.addEventListener('click', this.createNewChat.bind(this));

    this.loadTest();
  }

  createNewChat() {
    const nameChat = prompt('Name new chat', 'NewChat');

    if (nameChat !== null) {
      const json = localStorage.getItem('dialogList');

      let dialogArray;
      try {
        dialogArray = JSON.parse(json);
      } catch (SyntaxError) {
        alert('Error storage');
      }

      const time = new Date();
      const dialogBox = {
        dialogID: this.numberOfID++,
        dialogName: nameChat,
        lastMessage: '',
        timeLastMessage: time.getTime(),
        messageStatus: '',
      };

      dialogArray.push(dialogBox);
      localStorage.setItem('dialogList', JSON.stringify(dialogArray));
      this.renderDialog(dialogBox);

      this.dispatchEvent(new Event('addNewChat'));
    }
  }

  renderDialog(dialogBox) {
    let elem = document.createElement('dialog-box');
    elem = this.$content.appendChild(elem);

    elem.setAttribute('dialogid', dialogBox.dialogID);
    elem.setAttribute('dialogname', dialogBox.dialogName);
    elem.setAttribute('lastmessage', dialogBox.lastMessage);
    elem.setAttribute('timelastmessage', dialogBox.timeLastMessage);
    elem.setAttribute('messagestatus', dialogBox.messageStatus);
  }

  loadTest() {
    localStorage.clear();
    const time = new Date();

    const dialogBox1 = {
      dialogID: this.numberOfID++,
      dialogName: 'some',
      lastMessage: '',
      timeLastMessage: time.getTime(),
      messageStatus: 'read',
    };

    const dialogBox2 = {
      dialogID: this.numberOfID++,
      dialogName: 'some',
      lastMessage: '',
      timeLastMessage: time.getTime(),
      messageStatus: 'read',
    };

    const array = [0, 1];
    localStorage.setItem('dialogList', JSON.stringify(array));

    this.renderDialog(dialogBox1);
    this.renderDialog(dialogBox2);
  }
}

customElements.define('dialog-list', DialogList);
