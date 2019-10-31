const template = document.createElement('template');
template.innerHTML = `
<style>
  *{
    box-sizing: border-box;
  }
  :host{
    display: flex;
    height: 50px;
    flex-direction: row;
  }
  
  input{
    color: #050000;
    border: none;
    outline: 0;
    flex: auto;
    height: 100%;
    background-color: transparent;
    font-size: medium;
    padding-left: 10px;
  }
  .additionalButton{
    height: 100%;
    width: 30px;
    /*background-size: 90%;*/
    background-color: red;
    z-index: 1;
  }
  .sendButton{
    height: 100%;
    width: 50px;
    /*background-size: 90%;*/
    /*background-color: red;*/
    z-index: 1;
    background: url(/static/images/sends.png) no-repeat center center;
  }
  .inputButton{
    height: 100%;
    width: 30px;
    margin: 0 15px;
    cursor: pointer;
    opacity: 0.85;
    transition-duration: 0.15s;
  }
</style>
<div class="inputButton">
    <div class="additionalButton"></div>
</div>
<input>
<div class="inputButton">
    <div class="sendButton"></div>
</div>
`;

class FormInput extends HTMLElement {
  constructor() {
    super();

    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$input = this.shadowRoot.querySelector('input');
    this.$sendButton = this.shadowRoot.querySelector('.sendButton');
    this.$additionalButton = this.shadowRoot.querySelector('.additionalButton');

    this.$sendButton.addEventListener('click', this.onSubmit.bind(this));
    this.$additionalButton.addEventListener('click', this.onAdditionalButton.bind(this));
    this.$input.addEventListener('keypress', this.onKeyPress.bind(this));
  }

  onSubmit() {
    this.dispatchEvent(new Event('onSubmit'));
  }

  onAdditionalButton() {
    this.dispatchEvent(new Event('clickAdditionalButton'));
  }

  onKeyPress(event) {
    if (event.keyCode === 13) this.onSubmit();
  }

  static get observedAttributes() {
    return ['name', 'value', 'placeholder', 'disabled'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'value') this.$input.value = newValue;
    this.$input.setAttribute(name, newValue);
  }

  get value() {
    return this.$input.value;
  }
}

customElements.define('form-input', FormInput);
