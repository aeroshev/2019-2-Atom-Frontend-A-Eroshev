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
    -webkit-box-shadow: 0 0 0 0 rgba(204,169,44, 0.4);
  }
  70% {
      -webkit-box-shadow: 0 0 0 10px rgba(204,169,44, 0);
  }
  100% {
      -webkit-box-shadow: 0 0 0 0 rgba(204,169,44, 0);
  }
}
@keyframes pulse {
  0% {
    -moz-box-shadow: 0 0 0 0 rgba(204,169,44, 0.4);
    box-shadow: 0 0 0 0 rgba(204,169,44, 0.4);
  }
  70% {
      -moz-box-shadow: 0 0 0 10px rgba(204,169,44, 0);
      box-shadow: 0 0 0 10px rgba(204,169,44, 0);
  }
  100% {
      -moz-box-shadow: 0 0 0 0 rgba(204,169,44, 0);
      box-shadow: 0 0 0 0 rgba(204,169,44, 0);
  }
}
</style>
<div class="header">
  <div class="menu"></div>
  <a class="message">Сообщения</a>
</div>
<div class="wrap"></div>
<div class="buttonNew"></div>
`;

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

      const dialogBox = {
        dialogID: this.numberOfID++,
        dialogName: nameChat,
        lastMessage: '',
        timeLastMessage: '',
        messageStatus: '',
      };

      dialogArray.push(dialogBox);
      localStorage.setItem('dialogList', JSON.stringify(dialogArray));
      this.renderDialog(dialogBox);

      this.shadowRoot.dispatchEvent(new Event('addNewChat'));
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
      lastMessage: 'hello',
      timeLastMessage: time.getTime(),
      messageStatus: 'read',
    };

    const dialogBox2 = {
      dialogID: this.numberOfID++,
      dialogName: 'some',
      lastMessage: 'hello',
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
