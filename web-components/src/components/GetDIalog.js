const template = document.createElement('template');
template.innerHTML = `
<style>

 message-form {
    position: absolute;
    display: none;
    overflow: hidden;
    /*right: -100%;*/
    z-index: 1;
    animation-name: smoothOpen;
    animation-duration: 0.5s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
 }
 
  @keyframes smoothOpen {
    from {
        -webkit-transform: translate(-100%) scaleX(0);
        transform: translate(-100%) scaleX(0)
    }

    to {
        -webkit-transform: translate(0) scaleX(1);
        transform: translate(0) scaleX(1)
    }

    /*to {*/
    /*    -webkit-transform: translate(50%) scaleX(0);*/
    /*    transform: translate(50%) scaleX(0)*/
    /*}*/
}

 dialog-list {
    position: absolute;
    /*display: none;*/
    overflow: visible;
    /*right: -100%;*/
    z-index: 1;
    animation-name: smoothClose;
    animation-duration: 0.5s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
 }
   @keyframes smoothClose {
    from {
        -webkit-transform: translate(-100%) scaleX(0);
        transform: translate(-100%) scaleX(0)
    }

    to {
        -webkit-transform: translate(0) scaleX(1);
        transform: translate(0) scaleX(1)
    }

}

  
</style>
<dialog-list></dialog-list>
<message-form></message-form>
`;

class GetDialog extends HTMLElement {
  constructor() {
    super();

    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$dialogList = this.shadowRoot.querySelector('dialog-list');
    this.$chatForm = this.shadowRoot.querySelector('message-form');

    this.shadowRoot.addEventListener('addNewChat', () => this.addEventOpenDialog());

    this.addEventOpenDialog();
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

    // this.updateDialogList();
  }

  updateDialogList() {
    // debugger;
    // let dialogList = [];
    // const json = localStorage.getItem('dialogList');
    // try {
    //   dialogList = JSON.parse(json);
    // } catch (SyntaxError) {
    //   alert("Can't unpacked storage");
    // }
    //
    // for (let i = 0; i < dialogList.length; i++) {
    //   let elem = this.$dialogList.$content.querySelector(`dialog-box[dialogid="${i}"]`);
    //
    // }
  }

  /*
  @keyframes theme__linear-indeterminate-bar___3vY69 {
    0% {
        -webkit-transform: translate(-50%) scaleX(0);
        transform: translate(-50%) scaleX(0)
    }

    50% {
        -webkit-transform: translate(0) scaleX(.3);
        transform: translate(0) scaleX(.3)
    }

    to {
        -webkit-transform: translate(50%) scaleX(0);
        transform: translate(50%) scaleX(0)
    }
}
   */
}

customElements.define('get-dialog', GetDialog);
