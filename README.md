# Automação de Modal - Bootstrap

Classe JavaScript ES6 que abstrai a utilização de uma modal bootstrap, permitindo
definir seu título, corpo, botões e suas respectivas ações.

Também há a possibilidade de automatizar o carregamento do corpo da modal
através de ajax, para trazer o html pronto de algum backend.

## Exemplo de uso - Modal normal

- Definir HTML da Modal, sem definir titulo, corpo ou botões, somente o esqueleto.
- Instanciar classe e configurar conforme a necessidade

Há um exemplo de utilização no arquivo **index.html**

```html
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header bg-danger text-white">
        <h5 class="modal-title" id="exampleModalLabel"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body"></div>
      <div class="modal-footer"></div>
    </div>
  </div>
</div>


    <div class="container">
      <h3>Modal normal</h3>
      <button class="btn btn-primary" id="open">Abrir Modal</button>
      <button class="btn btn-secondary" id="close">Fechar Modal</button>
    </div>

<script>
  /**
   * Classe responsável pelas modais
   * 1 Parâmetro: Seletor da modal
   * 2 Parâmetro(Opcional): Array de objetos com informações dos botões
   * 3 Parâmetro(Opcional): Array de objetos com os callbacks(podem ser "open" e "close")
   */
  const modal = new Modal(
    '#exampleModal',
    [
      {
        text: 'Cancelar',
        class: 'btn btn-secondary',
        callback: function (event) {
          modal.close();
        },
      },
      {
        text: 'Confirmar',
        class: 'btn btn-danger',
        callback: function (event) {
          console.log(event);
          console.log('botão de confirmar foi clicado!');
        },
      },
    ],
    {
      open: function () {
        console.log('Modal Abriu');
      },
      close: function () {
        console.log('Modal Fechou');
      },
    }
  );

  modal.setTitle('Exclusão de Registro');
  modal.setBody('Deseja excluir o registro?');

  document.querySelector('#open').addEventListener('click', function () {
    modal.open();
  });
  document.querySelector('#close').addEventListener('click', function () {
    modal.close();
  });
</script>
```


## Exemplo de uso - Modal AJAX

```html
    <div class="modal fade" id="modalajax" tabindex="-1" role="dialog" aria-labelledby="modalajax" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="modalajaxLabel"></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body"></div>
          <div class="modal-footer"></div>
        </div>
      </div>
    </div>

    <div class="container">
      <h3>Modal com ajax</h3>
      <button class="btn btn-primary" id="openAjax">Abrir Modal</button>
      <button class="btn btn-secondary" id="closeAjax">Fechar Modal</button>
    </div>

<script>
  /**
   * Classe responsável pelas modais
   * 1 Parâmetro: Seletor da modal
   * 2 Parâmetro(Opcional): Array de objetos com informações dos botões
   * 3 Parâmetro(Opcional): Array de objetos com os callbacks(podem ser "open" e "close")
   */
  const modalAjax = new Modal(
        '#modalajax',
        [
          {
            text: 'Cancelar',
            class: 'btn btn-secondary',
            callback: function (event) {
              modalAjax.close();
            },
          },
          {
            text: 'Confirmar',
            class: 'btn btn-danger',
            callback: function (event) {
              modalAjax.close();
              console.log('botão de confirmar foi clicado!');
            },
          },
        ],
        {
          open: function () {
            console.log('Modal Abriu');
          },
          close: function () {
            console.log('Modal Fechou');
          },
        },
        {
          url:'./corpo.html',
          method: 'get'
        }
      );
      modalAjax.setTitle('Modal com ajax');

      document.querySelector('#openAjax').addEventListener('click', function () {
        modalAjax.open();
      });
      document.querySelector('#closeAjax').addEventListener('click', function () {
        modalAjax.close();
      });
</script>
```

## Funcionamento

- Ao passar o array de botão, a classe cria os botões e atribui os eventos;
- Ao fechar a modal, os eventos são removidos e os botões também.

Assim é possível evitar a duplicação de eventos no DOM.
