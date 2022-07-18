class Modal {
  constructor(modalSelector, buttons, callbacks, ajaxConfig) {
    this.modal = document.querySelector(modalSelector);
    this.buttons = buttons;
    this.callbacks = callbacks === undefined ? {} : callbacks;
    this.configCallbacks();

    this.ajaxConfig = ajaxConfig;

    this.cleanModal = this.cleanModal.bind(this);
  }

  validateCallback(name) {
    if (typeof this.callbacks === 'object' && this.callbacks.hasOwnProperty(name)) {
      return true;
    }
    return false;
  }

  configCallbacks() {
    if (this.validateCallback('open')) {
      this.callbacks.open = this.callbacks.open.bind(this);
    }
    if (this.validateCallback('close')) {
      this.callbacks.close = this.callbacks.close.bind(this);
    }
  }

  callbackOpen() {
    this.validateCallback('open') ? this.callbacks.open() : null;
  }

  callbackClose() {
    this.validateCallback('close') ? this.callbacks.close() : null;
  }

  setTitle(title) {
    const titleNode = this.modal.querySelector('.modal-title');
    titleNode.innerHTML = title;
    return this;
  }

  setBody(body) {
    const bodyNode = this.modal.querySelector('.modal-body');
    
    const scriptEl = document.createRange().createContextualFragment(body);
    bodyNode.innerHTML = "";
    bodyNode.append(scriptEl);

    return this;
  }

  exibeLoader(){
    let loader = `
      <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve" style="width:120px;margin:0 auto;display:block;">
        <path fill="#000" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
          <animateTransform 
            attributeName="transform" 
            attributeType="XML" 
            type="rotate"
            dur="1s" 
            from="0 50 50"
            to="360 50 50" 
            repeatCount="indefinite" />
      </path>
      </svg>
    `
    this.setBody(loader);
  }

  /**
   * Abre a Modal
   * - Adiciona eventos relacionados ao fechamento da modal
   * - Inicializa botões
   */
  open() {
    this.addCloseEvent();
    this.initButtons();
    $(this.modal).modal('show');
    this.opened = true;

    if(this.ajaxConfig) {
      let {url, method} = this.ajaxConfig;

      this.exibeLoader();
      $.ajax({
        url: url,
        method: method,
        dataType: 'html'
      }).done((response) => {
        this.setBody(response);
        this.callbackOpen();
      }).fail((error) => {
        console.log(error);
      });
    } else {
      this.callbackOpen();
    }
    
  }

  /**
   * Fecha a Modal
   */
  close() {
    $(this.modal).modal('hide');
    this.opened = false;
  }

  /**
   * Remove os eventos dos botões da Modal
   */
  removeEvents() {
    if (this.buttons.length) {
      this.buttons.forEach((btn) => {
        if (btn.element) {
          btn.element.removeEventListener('click', btn.callback);
        }
      });
    }
  }

  /**
   * Adiciona evento de limpeza da Modal ao fecha-la
   */
  addCloseEvent() {
    $(this.modal).on('hide.bs.modal', this.cleanModal);
  }

  /**
   * Inicializa a criação dos botões da Modal
   */
  initButtons() {
    if (this.buttons.length) {
      this.buttons.forEach((btn) => {
        this.createButton(btn);
      });
    }
  }

  /**
   * Cria botões da modal, atualizando e armazenando suas informações
   * Também insere os botões no DOM
   */
  createButton(buttonObj) {
    const modalFooter = this.modal.querySelector('.modal-footer');
    if (modalFooter) {
      const button = document.createElement('button');
      button.innerText = buttonObj.text ? buttonObj.text : '';
      button.className = buttonObj.class ? buttonObj.class : '';

      buttonObj.element = button;
      buttonObj.callback = buttonObj.callback.bind(buttonObj);

      button.addEventListener('click', buttonObj.callback);

      modalFooter.appendChild(button);
    }
  }

  /**
   * Remove os elementos dos botões no DOM da modal
   */
  removeButtons() {
    this.buttons.forEach((btn) => {
      if (btn.element) {
        btn.element.remove();
      }
    });
  }

  /**
   * Realiza a limpeza da Modal
   * - Remove eventos dos botões
   * - Remove botões do DOM
   */
  cleanModal() {
    this.removeEvents();
    this.removeButtons();
    this.callbackClose();
    $(this.modal).off('hide.bs.modal', this.cleanModal);
  }

  init() {
    return this;
  }
}
window.Modal = Modal;
