

var cardapio = {};

var MEU_CARRINHO = [];

cardapio.eventos = {
    init: () => {
    cardapio.metodos.ItensCardapio();
}
}

cardapio.metodos = {
    
    // obtem a lista de itens do cardápio
    ItensCardapio: (categoria = 'burgers', vermais = false) => {
        var filtro = MENU[categoria]

        if(!vermais){
        $("#itensCardapio").html('')
        $('#btnVerMais').removeClass('hidden')
        }

        $.each(filtro, (i,e) => {

            let temp = cardapio.templates.item.replace(/\${img}/g, e.img).replace(/\${name}/g, e.name).replace(/\${preco}/g, e.price.toFixed(2).replace('.',',')).replace(/\${id}/g,e.id);

            // botão ver mais foi clicado
            if(vermais && i >= 8 && i < 12){
            $("#itensCardapio").append(temp)
            }
            //paginação inicial (8itens)
            if(!vermais && i < 8) {
            $("#itensCardapio").append(temp)
            
            }

        })

        //remove o ativo
        $('.container-menu a').removeClass('active');

        //seta o menu para ativo
        $(`#menu-${categoria}`).addClass('active');
    },

    //clique do botão de ver mais
    verMais: () => {
        let ativo = $('.container-menu a.active').attr('id').split(`menu-`)[1];
        cardapio.metodos.ItensCardapio(ativo,true);
        
        $('#btnVerMais').addClass('hidden')
    },

    diminuirQuantidade: (id) => {
        let qntdAtual = parseInt($(`#qntd-${id}`).text());
    
        if(qntdAtual > 0) {
            $(`#qntd-${id}`).text(qntdAtual - 1)
        }
    },

    aumentarQuantidade: (id) => {
        let qntdAtual = parseInt($(`#qntd-${id}`).text());
    
        if(qntdAtual >= 0) {
            $(`#qntd-${id}`).text(qntdAtual + 1)
        }
    },

    adicionarAoCarrinho: (id) => {
        let qntdAtual = parseInt($(`#qntd-${id}`).text());

        if(qntdAtual > 0) {
            // obter a categoria ativa
            var categoria = $('.container-menu a.active').attr('id').split(`menu-`)[1];

            // obtem a lista de itens
            let filtro = MENU[categoria];

            // obtem o item
            let item = $.grep(filtro, (e,i) => {return e.id == id})

            if(item.length > 0) {
                // validar se ja existe esse item no carrinho
                let existe = $.grep(MEU_CARRINHO, (elem,index) => {return elem.id == id})

                // caso ja exista, só altera a quantidade
                if(existe.length > 0) {
                    let objIndex = MEU_CARRINHO.findIndex((obj => obj.id == id))
                    MEU_CARRINHO[objIndex].qntd = MEU_CARRINHO[objIndex].qntd + qntdAtual;
                } else {
                    // caso ainda não exista no carrinho, adiciona ele

                }

                item[0].qntd = qntdAtual;
                MEU_CARRINHO.push([0])
            }
            $(`#qntd-${id}`).text(0)
        }

    }
}

    



cardapio.templates = {

    item: `
        <div class="col-3 mb-5">
            <div class="card card-item" id="\${id}">
                <div class="img-produto">
                    <img src="\${img}" alt="">
                    <p class="title-produto text-center mt-4">
                        <b>\${name}</b>
                    </p>
                    <p class="price-produto text-center">
                        <b>R$ \${preco}</b>
                    </p>
                    <div class="add-carrinho">
                        <span class="btn-menos" onclick="cardapio.metodos.diminuirQuantidade('\${id}')"><i class="fas fa-minus"></i></span>
                        <span class="add-numero-itens" id='qntd-\${id}'>0</span>
                        <span class="btn-mais" onclick="cardapio.metodos.aumentarQuantidade('\${id}')"><i class="fas fa-plus"></i></span>
                        <span class="btn btn-add" onclick="cardapio.metodos.adicionarAoCarrinho('\${id}')"><i class="fa fa-shopping-bag"></i></span>
                    </div>
                </div>
            </div>
        </div>
    `
}

$(document).ready(function () {
    cardapio.eventos.init();
    
})