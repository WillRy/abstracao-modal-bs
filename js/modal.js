class Modal {
  constructor(modalSelector, buttons) {
    this.modal = document.querySelector(modalSelector);
    this.buttons = buttons;

    this.cleanModal = this.cleanModal.bind(this);
  }

  setTitle(title) {
    const titleNode = this.modal.querySelector('.modal-title');
    titleNode.innerHTML = title;
    return this;
  }

  setBody(body) {
    const bodyNode = this.modal.querySelector('.modal-body');
    bodyNode.innerHTML = body;
    return this;
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
      buttonObj.callback = buttonObj.callback.bind(buttonObj, modal);

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

    $(this.modal).off('hide.bs.modal', this.cleanModal);
  }

  init() {
    return this;
  }
}
window.Modal = Modal;
