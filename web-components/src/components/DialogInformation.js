const template = document.createElement('template');
template.innerHTML = `
<style>
  *{
    box-sizing: border-box;
  }
  :host{
    height: 60px;
    display: flex;
    flex-direction: row;
  }
  .headerButton{
    height: 100%;
    width: 30px;
    margin: 0 15px;
    cursor: pointer;
  }
  .statusConteiner{
    flex: auto;
    height: 100%;
    padding: 5px 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .statusConteiner .userName{
    height: 100%;
    padding-top: 5px;
  }
  .userName .name{
    font-size: medium;
    color: #fbfbff;
  }
  .userName .status{
    font-size: medium;
    color: #fbfbff;
  }

  .headerButton .backButton{
    background-size: 100%;
    width: 40px;
    height: 40px;
    margin: 10px;
    background-color: red;
  }

</style>
<div class="headerButton">
    <div class="backButton"></div>
</div>
<div class="statusConteiner">
  <div class="userName">
    <div class="name">Eroshev Artem</div>
    <div class="status">в сети</div>
  </div>
</div>
<div class="headerButton">
    <div class="searchButton"></div>
    <div class="optionsButton"></div>
</div>
`;

class DialogInformation extends HTMLElement {
  constructor() {
    super();

    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$backButton = this.shadowRoot.querySelector('.backButton');
    this.$searchButton = this.shadowRoot.querySelector('.searchButton');
    this.$optionsButton = this.shadowRoot.querySelector('.optionsButton');

    this.$backButton.addEventListener('keypress', this.escPress.bind(this));
    this.$backButton.addEventListener('click', this.backButton.bind(this));
    this.$searchButton.addEventListener('click', this.searchButton.bind(this));
  }

  escPress(event) {
    if (event.keyCode === 27) this.escape();
  }

  escape() {
    this.dispatchEvent(new Event('pressExit'));
  }

  backButton() {
    this.dispatchEvent(new Event('clickBackButton'));
  }

  searchButton() {
    this.dispatchEvent(new Event('clickSearchButton'));
  }
}

customElements.define('dialog-info', DialogInformation);
