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
 }
</style>
<div class="wrap"></div>
<div class="buttonNew"></div>
`;

class DialogList extends HTMLElement {
  constructor() {
    super();

    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$content = this.shadowRoot.querySelector('.wrap');
    // this.$lastMessageManage = this.shadowRoot.querySelector('message-form');

    this.loadTest();
  }

  renderDialog(dialogBox) {
    console.log('rederDialog');
    let elem = document.createElement('dialog-box');
    elem = this.$content.appendChild(elem);

    // let lastMessage = '';
    // if (this.$lastMessageManage.lastMessage !== undefined) {
    //   lastMessage = this.$lastMessageManage.lastMessage;
    // }
    // let timeLastMessage = 0;
    // if (this.$lastMessageManage.lastTimeMessage !== undefined) {
    //   timeLastMessage = this.$lastMessageManage.lastTimeMessage;
    // }
    console.log('setAttrr');
    elem.setAttribute('dialogID', dialogBox.dialogID);
    elem.setAttribute('dialogName', dialogBox.dialogName);
    elem.setAttribute('lastMessage', dialogBox.lastMessage);
    elem.setAttribute('timeLastMessage', dialogBox.timeLastMessage);
    elem.setAttribute('messageStatus', dialogBox.messageStatus);
  }

  loadTest() {
    localStorage.clear();
    const time = new Date();

    const dialogBox1 = {
      dialogID: 0,
      dialogName: 'some',
      lastMessage: 'hello',
      timeLastMessage: time.getTime(),
      messageStatus: 'read',
    };

    const dialogBox2 = {
      dialogID: 1,
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
