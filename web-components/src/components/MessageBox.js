const template = document.createElement('template');
template.innerHTML = `
<style>
  *{
    box-sizing: border-box;
  }
  li{
    margin-top: 10px;
    padding-bottom: 100px;
    list-style: none;
  }
  .messageBox{
    display: inline-block;
    border-radius: 5px;
    padding: 10px;
    text-align: justify;
    max-width: 60%;
    word-break: break-all;
  }
  .messageBox .time{
    width: 100%;
    text-align: right;
    font-size: small;
    margin-top: 5px;
  }
  .self{
    float: right;
    background-color: #f4d3ee;
    color: #727272;
  }
  .self .time{
    color: #727272;
    font-size: small;
  }

</style>
<li>
  <div class="messageBox">
    <div class="text"></div>
    <div class="time"></div>
  </div>
</li>
`;

class MessageBox extends HTMLElement {
  constructor() {
    super();

    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$wrap = this.shadowRoot.querySelector('.messageBox');
    this.$text = this.shadowRoot.querySelector('.text');
    this.$time = this.shadowRoot.querySelector('.time');
  }

  static get observedAttributes() {
    return ['messageID', 'owner', 'text', 'time'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'messageID':
        this.$wrap.attr('messageID', newValue);
        break;

      case 'owner':
        this.$wrap.classList.add(newValue);
        break;

      case 'text':
        this.$text.innerText = newValue;
        break;

      case 'time':
        let date = new Date(parseInt(newValue, 10));
        date = date.toString().split(' ')[4].split(':');
        this.$time.innerText = date[0] + ':' + date[1];
        break;
    }
  }
}

customElements.define('message-box', MessageBox);
