const template = document.createElement('template');
template.innerHTML = `
<style>

 message-form {
    z-index: 1;
    display: none;
    animation-duration: 0.5s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
 }
  
 *{
    box-sizing: border-box;
  }
 :host {
    width: 100%;
    height: 100%;
    background-size: 50px;
    display: flex;
    flex-direction: column;
 }
 .header{
    position: fixed;
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
  
</style>
<div class="header">
  <div class="menu"></div>
  <a class="message">Сообщения</a>
</div>
<message-form></message-form>
<dialog-list></dialog-list>
`;

class GetDialog extends HTMLElement {
  constructor() {
    super();

    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$dialogList = this.shadowRoot.querySelector('dialog-list');
    this.$chatForm = this.shadowRoot.querySelector('message-form');

    this.addEventOpenDialog()
  }

  addEventOpenDialog() {
    if (this.addedEvent === undefined) { this.addedEvent = []; }

    let dialogList = [];
    const json = localStorage.getItem('dialogList');
    try {
      dialogList = JSON.parse(json);
    } catch (SyntaxError) {
      alert("Can't unpacked storage");
    }

    dialogList.forEach((dialogID) => {
      if (!(dialogID in this.addedEvent)) {
        const elem = this.$dialogList.$content.querySelector(`dialog-box[dialogid="${dialogID}"]`);
        elem.addEventListener('click', () => this.openChat(dialogID));
        this.addedEvent.push(dialogID);
      }
    });
  }

  openChat(dialogID) {
    this.openedDialogID = dialogID;

    this.$chatForm.style.display = 'block';
    this.$dialogList.style.display = 'none';

    this.$chatForm.clearChat();
    this.$chatForm.setId(dialogID);
    this.$chatForm.messageLoader(dialogID);

    this.$chatForm.$toolBar.addEventListener('pressExit', () => this.closeChat());
    this.$chatForm.$toolBar.addEventListener('clickBackButton', () => this.closeChat());
  }

  closeChat() {
    this.$chatForm.style.display = 'none';
    this.$dialogList.style.display = 'block';
  }
}

customElements.define('get-dialog', GetDialog);
