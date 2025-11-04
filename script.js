/* script.js - Versão 6.0: Revisado, corrigido e completo (Horário, Feedback, Destaques, Busca, Carrinho e Envio WhatsApp - detalhado) */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DADOS E CONSTANTES GLOBAIS ---
    const WHATSAPP_NUMBER = '73981139131';
    let localizacaoCliente = null;

    // CHAVE PARA ARMAZENAMENTO LOCAL
    const STORAGE_KEY = 'tocaDaEsfihaCarrinho';

    // Configuração de Horário (Ajuste conforme o seu horário real)
    const HORA_ABERTURA = 1; // Use 18 para 18h
    const HORA_FECHAMENTO = 23; // 23:00h

    // Função para verificar se o restaurante está aberto
    function estaAberto() {
        const agora = new Date();
        const horaAtual = agora.getHours();
        const diaSemana = agora.getDay(); // 0 = Domingo, 6 = Sábado

        // Exemplo: Abre de Segunda a Sábado. Domingo fechado.
        if (diaSemana === 0) {
            return false;
        }

        // Verifica o horário de funcionamento
        return horaAtual >= HORA_ABERTURA && horaAtual < HORA_FECHAMENTO;
    }

    // 1.1. FUNÇÃO PARA CARREGAR O CARRINHO DO LOCALSTORAGE
    function carregarCarrinho() {
        try {
            const storedCarrinho = localStorage.getItem(STORAGE_KEY);
            return storedCarrinho ? JSON.parse(storedCarrinho) : {};
        } catch (e) {
            console.error("Erro ao carregar carrinho do localStorage:", e);
            return {};
        }
    }

    // 1.2. FUNÇÃO PARA SALVAR O CARRINHO NO LOCALSTORAGE
    function salvarCarrinho() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(carrinho));
        } catch (e) {
            console.error("Erro ao salvar carrinho no localStorage:", e);
        }
    }

    // Inicializa o carrinho tentando carregar do localStorage
    let carrinho = carregarCarrinho();

    // Função auxiliar para formatar moeda
    function formatarMoeda(valor) {
        return `R$ ${parseFloat(valor || 0).toFixed(2).replace('.', ',')}`;
    }

    // --- 1.3. DADOS DO CARDÁPIO COMPLETO (Com Opções Vegetarianas Separadas) ---
    const cardapioData = {
        esfihasSalgadas: [
            { nome: "CARNE", descricao: "Carne moída temperada.", preco: 8.00, imagem: 'esfiha_carne.jpg', maisVendido: true },
            { nome: "CARNE COM QUEIJO", descricao: "Carne moída e mussarela.", preco: 9.00, imagem: 'esfiha_carne_queijo.jpg' },
            { nome: "CARNE, QUEIJO, CATUPIRY", descricao: "Carne moída, mussarela e catupiry.", preco: 10.00, imagem: 'esfiha_carne_queijo_catupiry.jpg' },
            { nome: "CARNE, QUEIJO, CATUPIRY, BACON", descricao: "Carne, queijo, catupiry e bacon.", preco: 12.00, imagem: 'esfiha_carne_bacon.jpg' },
            { nome: "CARNE SECA C/ QUEIJO, BANANA, CATUPIRY", descricao: "Carne seca desfiada, queijo, banana e catupiry.", preco: 13.00, imagem: 'esfiha_carne_seca.jpg', novidade: true },
            { nome: "CARNE SECA COM BANANA", descricao: "Carne seca desfiada com banana.", preco: 11.50, imagem: 'esfiha_carne_seca_banana.jpg' },
            { nome: "FRANGO", descricao: "Frango desfiado temperado.", preco: 8.00, imagem: 'esfiha_frango.jpg' },
            { nome: "FRANGO C/ QUEIJO", descricao: "Frango desfiado e mussarela.", preco: 9.00, imagem: 'esfiha_frango_queijo.jpg' },
            { nome: "FRANGO, QUEIJO, CATUPIRY", descricao: "Frango, mussarela e catupiry.", preco: 10.00, imagem: 'esfiha_frango_catupiry.jpg', maisVendido: true },
            { nome: "FRANGO, BACON, MILHO, CATUPIRY", descricao: "Frango, bacon, milho e catupiry.", preco: 13.00, imagem: 'esfiha_frango_bacon_milho.jpg' },
            { nome: "FRANGO, QUEIJO, MILHO, CATUPIRY", descricao: "Frango, mussarela, milho e catupiry.", preco: 12.00, imagem: 'esfiha_frango_queijo_milho.jpg' },
            { nome: "CALABRESA, QUEIJO, ORÉGANO", descricao: "Calabresa, mussarela e orégano.", preco: 9.00, imagem: 'esfiha_calabresa.jpg' },
            { nome: "CALABRESA, QUEIJO, CATUPIRY, ORÉGANO", descricao: "Calabresa, queijo, catupiry e orégano.", preco: 10.00, imagem: 'esfiha_calabresa_catupiry.jpg' },
            { nome: "QUEIJO, BACON", descricao: "Mussarela e bacon.", preco: 12.00, imagem: 'esfiha_queijo_bacon.jpg' },
            { nome: "MISTA (Queijo, Presunto, Calabresa...)", descricao: "Mussarela, presunto, calabresa, milho e catupiry.", preco: 10.00, imagem: 'esfiha_mista.jpg' },
            { nome: "SALAMINHO, QUEIJO, CATUPIRY, ORÉGANO", descricao: "Salaminho, queijo, catupiry e orégano.", preco: 12.00, imagem: 'esfiha_salaminho.jpg' },
            { nome: "ATUM, QUEIJO, ORÉGANO", descricao: "Atum, mussarela e orégano.", preco: 12.00, imagem: 'esfiha_atum.jpg' },
            { nome: "ATUM, QUEIJO, CATUPIRY, ORÉGANO", descricao: "Atum, mussarela, catupiry e orégano.", preco: 13.00, imagem: 'esfiha_atum_catupiry.jpg' },
            { nome: "CAMARÃO, QUEIJO, CATUPIRY, ORÉGANO", descricao: "Camarão, mussarela, catupiry e orégano.", preco: 15.00, imagem: 'esfiha_camarao.jpg' },
        ],
        opcoesVegetarianas: [
            { nome: "QUEIJO, ORÉGANO", descricao: "Mussarela e orégano.", preco: 8.50, imagem: 'esfiha_queijo.jpg' },
            { nome: "QUEIJO, CATUPIRY, ORÉGANO", descricao: "Mussarela, catupiry e orégano.", preco: 9.00, imagem: 'esfiha_queijo_catupiry.jpg' },
            { nome: "QUEIJO, MILHO, CATUPIRY, ORÉGANO", descricao: "Mussarela, milho, catupiry e orégano.", preco: 10.00, imagem: 'esfiha_queijo_milho_catupiry.jpg' },
            { nome: "QUEIJO, TOMATE-SECO, CATUPIRY, ORÉGANO", descricao: "Mussarela, tomate seco, catupiry e orégano.", preco: 12.00, imagem: 'esfiha_tomate_seco.jpg' },
            { nome: "QUEIJO, PALMITO, CATUPIRY, ORÉGANO", descricao: "Mussarela, palmito, catupiry e orégano.", preco: 12.00, imagem: 'esfiha_palmito.jpg' },
            { nome: "QUEIJO, ABOBRINHA, CATUPIRY, ALHO, ORÉGANO", descricao: "Mussarela, abobrinha, catupiry, alho e orégano.", preco: 12.00, imagem: 'esfiha_abobrinha.jpg' },
            { nome: "PASTEL DE QUEIJO", descricao: "Massa crocante com recheio de queijo.", preco: 12.00, imagem: 'pastel_queijo.jpg' },
            { nome: "MINI PIZZA - QUEIJO", descricao: "Mussarela, catupiry, azeitona, orégano.", preco: 23.00, imagem: 'pizza_broto_queijo.jpg' },
            { nome: "MINI PIZZA - MILHO", descricao: "Mussarela, milho, catupiry, orégano.", preco: 23.00, imagem: 'pizza_broto_milho.jpg' },
            { nome: "PIZZA GRANDE - QUEIJO", descricao: "Mussarela, catupiry, azeitona, orégano.", preco: 80.00, imagem: 'pizza_grande_queijo.jpg' },
            { nome: "PIZZA GRANDE - MILHO", descricao: "Mussarela, milho, catupiry, orégano.", preco: 80.00, imagem: 'pizza_grande_milho.jpg' },
        ],
        esfihasDoces: [
            { nome: "CHOCOLATE (AO LEITE)", descricao: "Chocolate ao leite de primeira.", preco: 10.00, imagem: 'esfiha_chocolate.jpg', maisVendido: true },
            { nome: "ROMEU E JULIETA", descricao: "Queijo e goiabada.", preco: 9.00, imagem: 'esfiha_romeu_julieta.jpg' },
            { nome: "DOCE DE LEITE", descricao: "Doce de leite cremoso.", preco: 9.50, imagem: 'esfiha_doce_leite.jpg' },
            { nome: "NUTELLA", descricao: "Creme de Avelã Nutella original.", preco: 14.00, imagem: 'esfiha_nutella.jpg' },
            { nome: "CHOCOLATE C/ GRANULADO", descricao: "Chocolate ao leite com granulado.", preco: 12.00, imagem: 'esfiha_chocolate_granulado.jpg' },
            { nome: "NUTELLA COM BANANA DA TERRA", descricao: "Nutella e banana da terra frita.", preco: 15.00, imagem: 'esfiha_nutella_banana.jpg', novidade: true }
        ],
        salgados: [
            { nome: "QUIBE TRADICIONAL", descricao: "Delicioso quibe frito.", preco: 12.00, imagem: 'quibe_tradicional.jpg' },
            { nome: "QUIBE C/ QUEIJO", descricao: "Quibe recheado com mussarela.", preco: 14.00, imagem: 'quibe_queijo.jpg' },
            { nome: "QUIBE C/ QUEIJO E CATUPIRY", descricao: "Quibe recheado com mussarela e catupiry.", preco: 15.00, imagem: 'quibe_queijo_catupiry.jpg' },
            { nome: "PASTEL DE CARNE", descricao: "Massa crocante com recheio de carne.", preco: 12.00, imagem: 'pastel_carne.jpg' },
            { nome: "PASTEL DE FRANGO", descricao: "Massa crocante com recheio de frango.", preco: 12.00, imagem: 'pastel_frango.jpg' },
            { nome: "PASTEL DE CARNE C/ QUEIJO", descricao: "Massa crocante com recheio de carne e queijo.", preco: 13.00, imagem: 'pastel_carne_queijo.jpg' },
            { nome: "PASTEL DE FRANGO C/ QUEIJO", descricao: "Massa crocante com recheio de frango e queijo.", preco: 13.00, imagem: 'pastel_frango_queijo.jpg' },
            { nome: "PASTEL DE CARNE SECA", descricao: "Carne seca, queijo, banana da terra e catupiry.", preco: 18.00, imagem: 'pastel_carne_seca.jpg' },
            { nome: "PASTEL DE NUTELLA COM BANANA DA TERRA", descricao: "Nutella e banana da terra frita.", preco: 18.00, imagem: 'pastel_nutella_banana.jpg' },
        ],
        pizzasBroto: [
            { nome: "MINI PIZZA - FRANGO", descricao: "Mussarela, milho, catupiry, orégano.", preco: 23.00, imagem: 'pizza_broto_frango.jpg' },
            { nome: "MINI PIZZA - CALABRESA", descricao: "Queijo, catupiry, cebola e orégano.", preco: 23.00, imagem: 'pizza_broto_calabresa.jpg' },
            { nome: "MINI PIZZA - MISTA", descricao: "Mussarela, presunto, calabresa, milho, cebola, catupiry, orégano.", preco: 25.00, imagem: 'pizza_broto_mista.jpg' },
            { nome: "MINI PIZZA - CARNE SECA C/ BANANA", descricao: "Mussarela e catupiry.", preco: 25.00, imagem: 'pizza_broto_carne_seca.jpg' },
            { nome: "MINI PIZZA - PORTUGUESA", descricao: "Mussarela, presunto, bacon, ovo, cebola, catupiry.", preco: 25.00, imagem: 'pizza_broto_portuguesa.jpg' },
        ],
        pizzasGrandes: [
            { nome: "PIZZA GRANDE - FRANGO", descricao: "Mussarela, milho, catupiry, orégano.", preco: 80.00, imagem: 'pizza_grande_frango.jpg' },
            { nome: "PIZZA GRANDE - MISTA", descricao: "Mussarela, presunto, calabresa, milho, cebola, catupiry, orégano.", preco: 90.00, imagem: 'pizza_grande_mista.jpg' },
            { nome: "PIZZA GRANDE - CARNE SECA C/ BANANA", descricao: "Mussarela e catupiry.", preco: 97.00, imagem: 'pizza_grande_carne_seca.jpg' },
            { nome: "PIZZA GRANDE - PORTUGUESA", descricao: "Mussarela, presunto, bacon, ovo, cebola, catupiry.", preco: 98.00, imagem: 'pizza_grande_portuguesa.jpg' },
            { nome: "PIZZA GRANDE - CALABRESA", descricao: "Queijo, catupiry, cebola e orégano.", preco: 85.00, imagem: 'pizza_grande_calabresa.jpg' },
        ],
        bebidas: [
            { 
                nome: "Refrigerante Lata", 
                descricao: "Escolha Coca-Cola, Guaraná ou Sprite.", 
                preco: 9.00,
                imagem: 'refri_lata.jpg',
                opcoes: ['Coca-Cola', 'Guaraná', 'Sprite']
            },
            { nome: "Refrigerante KS 290ml", descricao: "KS de diversos sabores.", preco: 8.00, imagem: 'refri_ks.jpg' },
            { nome: "Água Mineral sem Gás 500ml", descricao: "Água natural.", preco: 5.00, imagem: 'agua_sem_gas.jpg' },
            { nome: "Água Mineral C/Gás 500ml", descricao: "Água com gás.", preco: 6.00, imagem: 'agua_com_gas.jpg' },
            { nome: "Água Mineral Aquarius Fresh", descricao: "Refrigerante de baixa caloria.", preco: 9.00, imagem: 'agua_aquarius.jpg' },
            { 
                nome: "Suco Polpa 1L", 
                descricao: "Escolha o sabor da polpa (Graviola, Cacau, Cajá, etc.).", 
                preco: 25.00,
                imagem: 'suco_polpa_1l.jpg',
                opcoes: ['Graviola', 'Cacau', 'Cajá', 'Cupuaçu', 'Maracujá', 'Manga']
            },
            { 
                nome: "Suco Polpa 500ml", 
                descricao: "Escolha o sabor da polpa (Graviola, Cacau, Cajá, etc.).", 
                preco: 12.50,
                imagem: 'suco_polpa_500ml.jpg',
                opcoes: ['Graviola', 'Cacau', 'Cajá', 'Cupuaçu', 'Maracujá', 'Manga']
            },
            { nome: "Corona Long Neck", descricao: "Cerveja Corona 330ml.", preco: 13.00, imagem: 'corona_long_neck.jpg' },
            { nome: "Heineken 600ml", descricao: "Cerveja Heineken.", preco: 20.00, imagem: 'heineken_600ml.jpg' },
            { nome: "Heineken Long Neck", descricao: "Cerveja Heineken 330ml.", preco: 12.00, imagem: 'heineken_long_neck.jpg' },
            { nome: "Original", descricao: "Cerveja Original 600ml.", preco: 15.00, imagem: 'original.jpg' },
            { nome: "Amistel 600ml", descricao: "Cerveja Amistel.", preco: 15.00, imagem: 'amistel_600ml.jpg' },
        ],
        indisponiveis: [
             { nome: "ALCATRA", descricao: "Item temporariamente indisponível.", preco: 0.00, indisponivel: true },
             { nome: "CONTRA FILÉ", descricao: "Item temporariamente indisponível.", preco: 0.00, indisponivel: true },
             { nome: "MAMINHA", descricao: "Item temporariamente indisponível.", preco: 0.00, indisponivel: true },
             { nome: "PICANHA", descricao: "Item temporariamente indisponível.", preco: 0.00, indisponivel: true },
             { nome: "FRANGO (Carne)", descricao: "Item temporariamente indisponível.", preco: 0.00, indisponivel: true }
        ]
    };

    // Estrutura para geração do HTML do cardápio (REORDENADA)
    const cardapioEstrutura = [
        { id: "esfihas-salgadas", titulo: "1. Esfihas Salgadas", lista: cardapioData.esfihasSalgadas },
        { id: "opcoes-vegetarianas", titulo: "2. Opções Vegetarianas", lista: cardapioData.opcoesVegetarianas },
        { id: "esfihas-doces", titulo: "3. Esfihas Doces", lista: cardapioData.esfihasDoces },
        { id: "pasteis-quibes", titulo: "4. Pastel e Quibe", lista: cardapioData.salgados },
        { id: "pizzas-broto", titulo: "5. Mini Pizza", lista: cardapioData.pizzasBroto },
        { id: "pizzas-grandes", titulo: "6. Pizza Grande", lista: cardapioData.pizzasGrandes },
        { id: "bebidas", titulo: "7. Bebidas", lista: cardapioData.bebidas }
    ];

    // --- 2. GERAÇÃO DINÂMICA DO CARDÁPIO E DESTAQUES ---

    const cardapioSection = document.getElementById('cardapio-section');
    const quickMenuContainer = document.querySelector('#quick-menu .container');
    const destaquesContainer = document.getElementById('destaques-container');
    const searchInput = document.getElementById('search-input');

    function gerarItemCardapioHTML(item, index) {
        const idUnico = `${item.nome.replace(/\s/g, '_').replace(/[^a-zA-Z0-9_]/g, '')}-${index}`;

        let tagsHTML = '';
        if (item.maisVendido) {
            tagsHTML += '<span class="tag mais-vendido">🌟 MAIS VENDIDO</span>';
        }
        if (item.novidade) {
            tagsHTML += '<span class="tag novidade">✨ NOVIDADE</span>';
        }

        let selectHTML = '';
        if (item.opcoes && item.opcoes.length > 0) {
            selectHTML = `
                <select id="select-${idUnico}" class="item-select-sabor">
                    <option value="" disabled selected>Escolha o Sabor/Marca</option>
                    ${item.opcoes.map(opcao => `<option value="${opcao}">${opcao}</option>`).join('')}
                </select>
            `;
        }

        const isDisabled = !estaAberto() || !item.preco;

        return `
            <div class="item-cardapio" data-nome-base="${item.nome}" data-preco="${item.preco}" data-id="${idUnico}">
                <div class="item-imagem-container">
                    <img src="img/${item.imagem || 'default.jpg'}" alt="${item.nome}">
                    ${tagsHTML}
                </div>
                <div class="item-detalhes">
                    <h3>${item.nome}</h3>
                    <p>${item.descricao}</p>
                    ${selectHTML}
                </div>
                <div class="item-acao">
                    <span class="item-preco font-titulo">${formatarMoeda(item.preco)}</span>
                    <button class="add-cart-btn" data-id="${idUnico}" ${isDisabled ? 'disabled' : ''}>
                        ${isDisabled ? 'FECHADO' : 'Adicionar'}
                    </button>
                </div>
            </div>
        `;
    }

    function renderizarCardapio(estrutura, termoBusca = '') {
        if (!cardapioSection) return;
        cardapioSection.innerHTML = ''; // Limpa o cardápio atual
        const termo = termoBusca.toLowerCase().trim();
        let cardapioHTML = '';
        let quickMenuHTML = '';
        let itemIndex = 0; // Para garantir IDs únicos globais

        estrutura.forEach(secao => {
            const listaFiltrada = secao.lista.filter(item => 
                item.nome.toLowerCase().includes(termo) || 
                item.descricao.toLowerCase().includes(termo)
            );

            if (listaFiltrada.length > 0) {
                quickMenuHTML += `<a href="#${secao.id}">${secao.titulo.split('. ')[1]}</a>`;

                cardapioHTML += `
                    <section class="menu-section" id="${secao.id}">
                        <h2 class="font-titulo">${secao.titulo}</h2>
                `;

                listaFiltrada.forEach(item => {
                    cardapioHTML += gerarItemCardapioHTML(item, itemIndex++);
                });

                cardapioHTML += `</section>`;
            }
        });

        if (cardapioHTML === '') {
            cardapioSection.innerHTML = '<div class="aviso-vazio"><p>Nenhum item encontrado. Tente outra busca!</p></div>';
        } else {
            cardapioSection.innerHTML = cardapioHTML;
        }

        if (quickMenuContainer) quickMenuContainer.innerHTML = quickMenuHTML;

        // Re-atribui listeners após a renderização
        adicionarListenersAoCardapio();
        adicionarListenersScrollSuave();
    }

    function renderizarDestaques() {
        if (!destaquesContainer) return;
        destaquesContainer.innerHTML = '';
        let destaquesHTML = '';

        let destaqueIndex = 0;
        const todosItens = Object.values(cardapioData).flat();
        const itensDestaque = todosItens.filter(item => item.maisVendido || item.novidade);

        itensDestaque.slice(0, 4).forEach(item => {
            const idUnico = `destaque-${item.nome.replace(/\s/g, '_')}-${destaqueIndex++}`;
            const tagsHTML = item.maisVendido ? '<span class="tag mais-vendido">🌟 MAIS VENDIDO</span>' : '<span class="tag novidade">✨ NOVIDADE</span>';
            const isDisabled = !estaAberto() || !item.preco;

            destaquesHTML += `
                <div class="destaque-card" data-nome-base="${item.nome}" data-preco="${item.preco}" data-id="${idUnico}">
                    <div class="destaque-imagem-container">
                        <img src="img/${item.imagem || 'default.jpg'}" alt="${item.nome}">
                        ${tagsHTML}
                    </div>
                    <h4 class="font-corpo">${item.nome}</h4>
                    <p class="font-titulo item-preco">${formatarMoeda(item.preco)}</p>
                    <button class="add-cart-btn" data-id="${idUnico}" ${isDisabled ? 'disabled' : ''}>
                        ${isDisabled ? 'FECHADO' : 'Adicionar'}
                    </button>
                </div>
            `;
        });

        destaquesContainer.innerHTML = destaquesHTML;
    }

    // --- 3. LÓGICA DO CARRINHO (Adicionar, Remover, Atualizar) ---

    /**
     * Adiciona um item ao carrinho ou incrementa sua quantidade.
     * Agora aceita parâmetro de quantidade e lida com itens que possuem select de sabor.
     * @param {string} idUnico - ID único do item (data-id)
     * @param {string} nomeBase - Nome original do item
     * @param {number} preco - Preço do item
     * @param {string|null} selectId - ID do select (se houver)
     * @param {number} quantidade - Quantidade a adicionar (padrão 1)
     */
    function adicionarAoCarrinho(idUnico, nomeBase, preco, selectId = null, quantidade = 1) {
        // Validações básicas
        preco = parseFloat(preco) || 0;
        quantidade = parseInt(quantidade) || 1;

        let nomeFinal = nomeBase;
        let idFinal = idUnico;

        if (selectId) {
            const selectElement = document.getElementById(selectId);
            const saborSelecionado = selectElement ? selectElement.value : '';

            if (!saborSelecionado) {
                alert(`Por favor, selecione o sabor/marca para ${nomeBase}.`);
                return;
            }

            nomeFinal = `${nomeBase} (${saborSelecionado})`;
            idFinal = `${idUnico}_${saborSelecionado.replace(/\s/g, '_')}`;

            // Limpa a seleção após adicionar
            if (selectElement) selectElement.selectedIndex = 0;
        }

        const itemExistente = carrinho[idFinal];

        if (itemExistente) {
            itemExistente.quantidade += quantidade;
        } else {
            carrinho[idFinal] = {
                id: idFinal,
                nome: nomeFinal,
                preco: preco,
                quantidade: quantidade
            };
        }

        salvarCarrinho();
        atualizarVisualCarrinho();
    }

    /**
     * Remove ou diminui a quantidade de um item no carrinho.
     * @param {string} id - ID do item no carrinho.
     */
    function removerDoCarrinho(id) {
        if (!carrinho[id]) return;

        carrinho[id].quantidade -= 1;

        if (carrinho[id].quantidade <= 0) {
            delete carrinho[id];
        }

        salvarCarrinho();
        atualizarVisualCarrinho();
        if (checkoutSection && checkoutSection.style.display === 'block') {
            exibirResumoCarrinho();
        }
    }

    // Função corrigida para calcular o total do carrinho
    function calcularTotalCarrinho() {
        return Object.values(carrinho).reduce((total, item) => 
            total + (item.preco * item.quantidade), 0);
    }

    /**
     * Atualiza o contador e o valor total em todos os botões e áreas.
     */
    function atualizarVisualCarrinho() {
        const total = calcularTotalCarrinho();
        const numItens = Object.values(carrinho).reduce((count, item) => count + item.quantidade, 0);

        const cartButton = document.getElementById('cart-button');
        const cartCountSpan = document.getElementById('cart-count');
        if (cartButton) {
            cartButton.textContent = `Carrinho (${numItens})`;
        }
        if (cartCountSpan) {
            cartCountSpan.textContent = numItens;
        }

        const floatingCartTotal = document.querySelector('.floating-cart-total');
        const floatingCartButton = document.getElementById('floating-cart-button');
        const floatingCartContainer = document.getElementById('floating-cart');

        if (floatingCartTotal) {
            floatingCartTotal.textContent = formatarMoeda(total);
        }

        if (floatingCartButton && floatingCartContainer) {
            if (numItens > 0 && window.innerWidth <= 768) {
                floatingCartContainer.style.display = 'block';
                floatingCartButton.textContent = `VER CARRINHO (${numItens}) - ${formatarMoeda(total)}`;
            } else {
                floatingCartContainer.style.display = 'none';
            }

            if (window.innerWidth > 768) {
                floatingCartContainer.style.display = 'none';
            }
        }
    }

    // --- 4. LÓGICA DE VISUALIZAÇÃO (Cardápio vs. Checkout) E AVISO DE HORÁRIO ---

    const checkoutSection = document.getElementById('checkout-section');
    const resumoCarrinhoDiv = document.getElementById('resumo-carrinho');
    const clientForm = document.getElementById('client-data-form');
    const avisoHorarioDiv = document.getElementById('aviso-horario');

    function exibirCheckout() {
        if (Object.keys(carrinho).length === 0) {
            alert("Seu carrinho está vazio! Adicione itens antes de finalizar.");
            return;
        }

        if (cardapioSection) cardapioSection.style.display = 'none';
        const destaquesSection = document.getElementById('destaques-section');
        if (destaquesSection) destaquesSection.style.display = 'none';
        const quickMenu = document.getElementById('quick-menu');
        if (quickMenu) quickMenu.style.display = 'none';

        if (checkoutSection) checkoutSection.style.display = 'block';

        setTimeout(() => {
            const floatingCart = document.getElementById('floating-cart');
            if (floatingCart) {
                floatingCart.style.display = 'flex';
            }
        }, 50);

        exibirResumoCarrinho();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function exibirCardapio() {
        if (checkoutSection) checkoutSection.style.display = 'none';
        if (cardapioSection) cardapioSection.style.display = 'block';
        const destaquesSection = document.getElementById('destaques-section');
        if (destaquesSection) destaquesSection.style.display = 'block';
        const quickMenu = document.getElementById('quick-menu');
        if (quickMenu) quickMenu.style.display = 'block';

        atualizarVisualCarrinho();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function exibirResumoCarrinho() {
        if (!resumoCarrinhoDiv) return;
        let resumoHTML = '';
        let total = 0;

        if (Object.keys(carrinho).length === 0) {
            resumoHTML = '<div class="aviso-vazio"><p>Seu carrinho está vazio.</p></div>';
            resumoCarrinhoDiv.innerHTML = resumoHTML;
            exibirCardapio();
            return;
        }

        Object.keys(carrinho).forEach(id => {
            const item = carrinho[id];
            const subtotal = item.preco * item.quantidade;
            total += subtotal;

            resumoHTML += `
                <div class="item-resumo">
                    <div class="item-info">
                        <span class="quantidade">${item.quantidade}x</span>
                        <span class="nome">${item.nome}</span>
                    </div>
                    <div class="item-preco-acao">
                        <div class="precos">
                            <small>unit: ${formatarMoeda(item.preco)}</small>
                            <small>subtotal: ${formatarMoeda(subtotal)}</small>
                        </div>
                        <button class="remove-item-btn" data-id="${id}" aria-label="Remover um item">
                            <span class="remover-carrinho-icon">−</span>
                        </button>
                    </div>
                </div>
            `;
        });

        resumoHTML += `
            <div class="resumo-total">
                <span class="total-label font-titulo">TOTAL DO PEDIDO:</span>
                <span class="total-value font-titulo">${formatarMoeda(total)}</span>
            </div>
        `;

        resumoCarrinhoDiv.innerHTML = resumoHTML;

        setTimeout(() => {
            document.querySelectorAll('.remove-item-btn').forEach(button => {
                button.removeEventListener('click', onRemoveItemClick);
                button.addEventListener('click', onRemoveItemClick);
            });
        }, 0);
    }

    function onRemoveItemClick(e) {
        const id = e.currentTarget.getAttribute('data-id');
        if (!id) return;
        removerDoCarrinho(id);
    }

    function atualizarAvisoHorario() {
        if (!avisoHorarioDiv) return;
        avisoHorarioDiv.style.display = 'block';
        avisoHorarioDiv.classList.remove('open', 'closed');

        if (estaAberto()) {
            avisoHorarioDiv.classList.add('open');
            avisoHorarioDiv.textContent = '🟢 Estamos Abertos e Recebendo Pedidos!';
            document.querySelectorAll('.add-cart-btn[disabled]').forEach(btn => {
                btn.removeAttribute('disabled');
                btn.textContent = 'Adicionar';
            });
        } else {
            avisoHorarioDiv.classList.add('closed');
            avisoHorarioDiv.textContent = `🔴 Fechado. Abrimos às ${HORA_ABERTURA}:00h (de Segunda a Sábado).`;
            document.querySelectorAll('.add-cart-btn').forEach(btn => {
                btn.setAttribute('disabled', 'disabled');
                btn.textContent = 'FECHADO';
            });
        }
    }

    // --- 5. GEOLOCALIZAÇÃO ---
    const btnLocalizacao = document.getElementById('btn-localizacao');
    const statusLocalizacao = document.getElementById('status-localizacao');

    function pegarLocalizacao() {
        if (!navigator.geolocation) {
            if (statusLocalizacao) statusLocalizacao.textContent = '📍 Geolocation não é suportada pelo seu navegador.';
            return;
        }

        if (statusLocalizacao) statusLocalizacao.textContent = '📍 Localizando...';
        if (btnLocalizacao) btnLocalizacao.disabled = true;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                localizacaoCliente = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                if (statusLocalizacao) statusLocalizacao.textContent = `✅ Localização capturada! (Lat: ${localizacaoCliente.latitude.toFixed(4)}, Lon: ${localizacaoCliente.longitude.toFixed(4)})`;
                if (btnLocalizacao) btnLocalizacao.disabled = false;
            },
            (error) => {
                console.error("Erro ao obter localização:", error);
                if (statusLocalizacao) statusLocalizacao.textContent = '❌ Erro ao obter localização. Por favor, preencha o endereço manualmente.';
                localizacaoCliente = null;
                if (btnLocalizacao) btnLocalizacao.disabled = false;
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
        );
    }

    // --- 6. GERAÇÃO DA MENSAGEM WHATSAPP (DETALHADA) ---
    function gerarMensagemWhatsApp(event) {
        if (event && event.preventDefault) event.preventDefault();

        if (!estaAberto()) {
            alert("🚨 Atenção: O restaurante está fechado. Por favor, verifique nosso horário de funcionamento.");
            return;
        }

        if (Object.keys(carrinho).length === 0) {
            alert("🚨 Seu carrinho está vazio! Adicione itens antes de finalizar.");
            return;
        }

        const formData = clientForm ? new FormData(clientForm) : new FormData();
        const nome = (formData.get('nome') || '').trim();
        const telefoneCliente = (formData.get('telefone_cliente') || '').trim();
        const rua = (formData.get('rua') || '').trim();
        const numero = (formData.get('numero') || '').trim();
        const bairro = (formData.get('bairro') || '').trim();
        const pontoReferencia = (formData.get('ponto_referencia') || '').trim();
        const complemento = (formData.get('complemento') || '').trim();
        const pagamento = (formData.get('pagamento') || 'Não informado');
        const trocoPara = (formData.get('troco_para') || '').trim();

        if (!nome || !telefoneCliente || !rua || !numero || !bairro || !pagamento) {
            alert('Por favor, preencha todos os campos obrigatórios (marcados com *)!');
            return;
        }

        // Montagem da mensagem detalhada
        let mensagem = `*PEDIDO TOCA DA ESFIHA*\n`;
        mensagem += `==============================\n`;

        const totalItens = Object.values(carrinho).reduce((c, i) => c + i.quantidade, 0);
        mensagem += `*🧾 ITENS DO PEDIDO (${totalItens} itens):*\n`;

        Object.values(carrinho).forEach(item => {
            const subtotal = item.preco * item.quantidade;
            mensagem += `- ${item.quantidade}x ${item.nome} \n    (Unit: ${formatarMoeda(item.preco)}) | Subtotal: ${formatarMoeda(subtotal)}\n`;
        });

        mensagem += `\n*TOTAL: ${formatarMoeda(calcularTotalCarrinho())}*\n`;
        mensagem += `==============================\n`;

        mensagem += `*👤 DADOS DO CLIENTE:*\n`;
        mensagem += `Nome: ${nome}\n`;
        mensagem += `Tel: ${telefoneCliente}\n`;

        mensagem += `\n*🛵 ENDEREÇO DE ENTREGA:*\n`;
        mensagem += `Rua: ${rua}, Nº ${numero}\n`;
        mensagem += `Bairro: ${bairro}\n`;
        if (complemento) mensagem += `Comp.: ${complemento}\n`;
        if (pontoReferencia) mensagem += `Ref.: ${pontoReferencia}\n`;

        mensagem += `\n*💳 PAGAMENTO:*\n`;
        mensagem += `Forma: ${pagamento}\n`;
        if (pagamento.includes('Dinheiro') && trocoPara) {
            mensagem += `Troco para: ${trocoPara}\n`;
        } else if (pagamento.includes('Dinheiro')) {
            mensagem += `Troco: Valor Exato (Não Precisa)\n`;
        }

        if (localizacaoCliente) {
            const lat = localizacaoCliente.latitude;
            const lon = localizacaoCliente.longitude;
            mensagem += `\n*🗺️ LOCALIZAÇÃO GPS:*\n`;
            mensagem += `Link Google Maps: https://www.google.com/maps?q=${lat},${lon}\n`;
            mensagem += `(Lat: ${lat.toFixed(6)}, Lon: ${lon.toFixed(6)})\n`;
        }

        mensagem += `──────────────────────────────\n`;
        mensagem += `📍 Observação:\nCaso o ponto no mapa não esteja exato, envie sua localização diretamente pelo WhatsApp para confirmação. 🙏`;

        const mensagemFinal = encodeURIComponent(mensagem);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensagemFinal}`;

        window.open(whatsappUrl, '_blank');

        // Após envio limpa carrinho
        carrinho = {};
        localStorage.removeItem(STORAGE_KEY);
        localizacaoCliente = null;
        if (clientForm) clientForm.reset();
        if (statusLocalizacao) statusLocalizacao.textContent = 'Localização ainda não capturada.';

        atualizarVisualCarrinho();
        exibirCardapio();
    }

    // Lógica do campo troco
    function toggleTroco() {
        const pagamentoSelect = document.getElementById('pagamento');
        const trocoGroup = document.getElementById('troco-group');
        if (!pagamentoSelect || !trocoGroup) return;

        if (pagamentoSelect.value.includes('Dinheiro')) {
            trocoGroup.style.display = 'flex';
        } else {
            trocoGroup.style.display = 'none';
            const trocoInput = document.getElementById('troco_para');
            if (trocoInput) trocoInput.value = '';
        }
    }

    // --- 7. EVENT LISTENERS GERAIS ---
    function adicionarListenersAoCardapio() {
        document.querySelectorAll('.add-cart-btn').forEach(button => {
            button.removeEventListener('click', handleAddToCart);
            button.addEventListener('click', handleAddToCart);
        });
    }

    function handleAddToCart(e) {
        const btn = e.currentTarget;
        const idUnico = btn.getAttribute('data-id');
        const itemElement = btn.closest('.item-cardapio') || btn.closest('.destaque-card');
        if (!itemElement) return;

        const nomeBase = itemElement.getAttribute('data-nome-base');
        const preco = itemElement.getAttribute('data-preco');
        const selectElement = itemElement.querySelector('.item-select-sabor');
        const selectId = selectElement ? selectElement.id : null;

        // Ao invés de adicionar imediatamente, abrimos o modal de quantidade
        abrirModalQuantidade(idUnico, nomeBase, preco, selectId);
    }

    const cartButtonHeader = document.getElementById('cart-button');
    if (cartButtonHeader) {
        cartButtonHeader.addEventListener('click', exibirCheckout);
    }

    const floatingCartButton = document.getElementById('floating-cart-button');
    if (floatingCartButton) {
        floatingCartButton.addEventListener('click', exibirCheckout);
    }

    const voltarCardapioBtn = document.getElementById('voltar-cardapio-btn');
    if (voltarCardapioBtn) {
        voltarCardapioBtn.addEventListener('click', exibirCardapio);
    }

    if (clientForm) {
        clientForm.addEventListener('submit', gerarMensagemWhatsApp);
    }

    if (btnLocalizacao) {
        btnLocalizacao.addEventListener('click', pegarLocalizacao);
    }

    const pagamentoSelectElement = document.getElementById('pagamento');
    if (pagamentoSelectElement) {
        pagamentoSelectElement.addEventListener('change', toggleTroco);
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderizarCardapio(cardapioEstrutura, e.target.value);
        });
    }

    // --- 8. SCROLL SUAVE PARA O MENU RÁPIDO ---
    function adicionarListenersScrollSuave() {
        const quickMenu = document.getElementById('quick-menu');
        const headerElement = document.querySelector('header');

        let offset = 0;
        if (headerElement && quickMenu) {
            const headerHeight = headerElement.offsetHeight;
            const quickMenuHeight = quickMenu.offsetHeight;
            offset = headerHeight + quickMenuHeight + 20;
        }

        document.querySelectorAll('.quick-menu a').forEach(anchor => {
            anchor.removeEventListener('click', smoothScrollHandler);
            anchor.addEventListener('click', smoothScrollHandler);
        });

        function smoothScrollHandler(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({ top: targetElement.offsetTop - offset, behavior: 'smooth' });
            }
        }
    }

    // --- 9. MODAL DE QUANTIDADE (INTEGRADO) ---
    let modalState = { id: null, nome: null, preco: 0, selectId: null, quantidade: 1 };

    function abrirModalQuantidade(idUnico, nome, preco, selectId = null) {
        modalState.id = idUnico;
        modalState.nome = nome;
        modalState.preco = parseFloat(preco) || 0;
        modalState.selectId = selectId;
        modalState.quantidade = 1;

        const modal = document.getElementById('modal-quantidade');
        if (!modal) return;

        const nomeEl = document.getElementById('modal-nome-item');
        const precoEl = document.getElementById('modal-preco-item');
        const qtdEl = document.getElementById('quantidade-atual');

        if (nomeEl) nomeEl.textContent = nome;
        if (precoEl) precoEl.textContent = `R$ ${modalState.preco.toFixed(2).replace('.', ',')}`;
        if (qtdEl) qtdEl.textContent = modalState.quantidade;

        modal.style.display = 'flex';
    }

    // Botões do modal
    const btnAumentar = document.getElementById('btn-aumentar');
    const btnDiminuir = document.getElementById('btn-diminuir');
    const cancelarItemBtn = document.getElementById('cancelar-item');
    const confirmarItemBtn = document.getElementById('confirmar-item');

    if (btnAumentar) btnAumentar.addEventListener('click', () => {
        modalState.quantidade++;
        const qtdEl = document.getElementById('quantidade-atual');
        if (qtdEl) qtdEl.textContent = modalState.quantidade;
    });

    if (btnDiminuir) btnDiminuir.addEventListener('click', () => {
        if (modalState.quantidade > 1) modalState.quantidade--;
        const qtdEl = document.getElementById('quantidade-atual');
        if (qtdEl) qtdEl.textContent = modalState.quantidade;
    });

    if (cancelarItemBtn) cancelarItemBtn.addEventListener('click', () => {
        const modal = document.getElementById('modal-quantidade');
        if (modal) modal.style.display = 'none';
    });

    if (confirmarItemBtn) confirmarItemBtn.addEventListener('click', () => {
        const modal = document.getElementById('modal-quantidade');
        if (!modalState.id) return;

        adicionarAoCarrinho(modalState.id, modalState.nome, modalState.preco, modalState.selectId, modalState.quantidade);

        if (modal) modal.style.display = 'none';
    });

    // --- 10. INICIALIZAÇÃO DA PÁGINA ---
    renderizarDestaques();
    renderizarCardapio(cardapioEstrutura);
    atualizarVisualCarrinho();
    atualizarAvisoHorario();

    const telefoneElement = document.querySelector('.telefone');
    if (telefoneElement) {
        const numeroFormatado = `(73) 98113-9131`;
        telefoneElement.textContent = numeroFormatado;
    }

    window.addEventListener('resize', () => {
        atualizarVisualCarrinho();
    });

});

// FIM - Versão 6.0
