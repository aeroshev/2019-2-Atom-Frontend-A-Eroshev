const template = document.createElement('template');
template.innerHTML = `
<style>
  *{
    margin: 0;
    padding: 0;
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
    position: fixed;
    left: 0; top: 0;
    background-color: #760db2;
    width: 100%;
    z-index: 1;
  }
  .content{
    width: 100%;
    padding: 20px;
    display: flex;
    flex: auto;
    flex-wrap: wrap;
    flex-direction: column-reverse;
    align-content: flex-end;
    z-index: 0;
    overflow-y: auto;
  }
  ::-webkit-scrollbar {
    width: 0px;
  }
  .messageWrap{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-end;
  }
  message-box{
    box-sizing: border-box;
    width: 100%;
    padding: 0 10px 10px 10px;
  }
  .footer{
    position: fixed;
    left: 0; bottom: 0;
    width: 100%;
    background-color: #f8fff9;
    outline: 1px solid rgba(5,0,0,0.94);
    z-index: 1;
  }
</style>
<div class="header">
  <dialog-info></dialog-info>
</div>
<div class="content">
  <div class="messageWrap">
    <date-marker></date-marker>
  </div>
</div>
<div class="footer">
  <form-input placeholder="Cообщение"></form-input>
</div>
`;

class MessageForm extends HTMLElement {
  constructor() {
    super();

    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$input = this.shadowRoot.querySelector('form-input');
    this.$messages = this.shadowRoot.querySelector('.messageWrap');

    this.$input.addEventListener('onSubmit', this.onSubmit.bind(this));

    this.messageLoader();
  }

  // при обновлении страницы эта функция выгружает из localStorage историю сообщений
  messageLoader() {
    const lsLen = localStorage.length;
    if (lsLen > 0) {
      for (let i = 0; i < lsLen; i++) {
        const messageBox = JSON.parse(localStorage.getItem(`${i}`));
        if (messageBox != null) this.renderMessage(messageBox);
      }
    }
  }

  // рендеринг объекта времени
  renderDate(time) {
    let elem = document.createElement('date-marker');
    elem = this.$messages.appendChild(elem);
    elem.setAttribute('time', time);
  }

  // рендеринг объекта сообщения
  renderMessage(messageBox) {
    this.renderDate(messageBox.time);

    let elem = document.createElement('message-box');
    elem = this.$messages.appendChild(elem);

    elem.setAttribute('messageID', messageBox.messageID);
    elem.setAttribute('owner', messageBox.owner);
    elem.setAttribute('text', messageBox.message);
    elem.setAttribute('time', messageBox.time);
  }

  // создание новго сообщения
  newMessage(owner, text, additions = null) {
    // полуаем текущее время
    const time = new Date();
    // задаём атрибуты messageBox
    const messageBox = {
      messageID: localStorage.length,
      owner: ((owner) ? 'opposide' : 'self'),
      message: text,
      additions,
      time: time.getTime(),
    };
    // сохраняем в localStorage в виде JSON
    localStorage.setItem(`${messageBox.messageID}`, JSON.stringify(messageBox));
    this.renderMessage(messageBox);
  }

  onSubmit() {
    if (this.$input.value !== '') {
      this.newMessage(0, this.$input.value);
      // очистка поля ввода
      this.$input.setAttribute('value', '');
    }
  }
}

customElements.define('message-form', MessageForm);
