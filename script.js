/* script.js - Versão Final 3.4: Correção Definitiva do Scroll Suave e IDs */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DADOS E CONSTANTES GLOBAIS ---
    const WHATSAPP_NUMBER = '73981139131'; 
    let carrinho = {}; 
    let localizacaoCliente = null; 

    // Função auxiliar para formatar moeda
    function formatarMoeda(valor) {
        return `R$ ${parseFloat(valor).toFixed(2).replace('.', ',')}`;
    }

    // --- 1.1. DADOS DO CARDÁPIO COMPLETO (Seu Cardápio Original) ---
    const cardapioData = {
        esfihasSalgadas: [
            { nome: "CARNE", descricao: "Carne moída temperada.", preco: 8.00 },
            { nome: "CARNE COM QUEIJO", descricao: "Carne moída e mussarela.", preco: 9.00 },
            { nome: "CARNE, QUEIJO, CATUPIRY", descricao: "Carne moída, mussarela e catupiry.", preco: 10.00 },
            { nome: "CARNE, QUEIJO, CATUPIRY, BACON", descricao: "Carne, queijo, catupiry e bacon.", preco: 12.00 },
            { nome: "CARNE SECA C/ QUEIJO, BANANA, CATUPIRY", descricao: "Carne seca desfiada, queijo, banana e catupiry.", preco: 13.00 },
            { nome: "CARNE SECA COM BANANA", descricao: "Carne seca desfiada com banana.", preco: 11.50 },
            { nome: "FRANGO", descricao: "Frango desfiado temperado.", preco: 8.00 },
            { nome: "FRANGO C/ QUEIJO", descricao: "Frango desfiado e mussarela.", preco: 9.00 },
            { nome: "FRANGO, QUEIJO, CATUPIRY", descricao: "Frango, mussarela e catupiry.", preco: 10.00 },
            { nome: "FRANGO, BACON, MILHO, CATUPIRY", descricao: "Frango, bacon, milho e catupiry.", preco: 13.00 },
            { nome: "FRANGO, QUEIJO, MILHO, CATUPIRY", descricao: "Frango, mussarela, milho e catupiry.", preco: 12.00 },
            { nome: "CALABRESA, QUEIJO, ORÉGANO", descricao: "Calabresa, mussarela e orégano.", preco: 9.00 },
            { nome: "CALABRESA, QUEIJO, CATUPIRY, ORÉGANO", descricao: "Calabresa, queijo, catupiry e orégano.", preco: 10.00 },
            { nome: "QUEIJO, ORÉGANO", descricao: "Mussarela e orégano.", preco: 8.50 },
            { nome: "QUEIJO, CATUPIRY, ORÉGANO", descricao: "Mussarela, catupiry e orégano.", preco: 9.00 },
            { nome: "QUEIJO, MILHO, CATUPIRY, ORÉGANO", descricao: "Mussarela, milho, catupiry e orégano.", preco: 10.00 },
            { nome: "QUEIJO, BACON", descricao: "Mussarela e bacon.", preco: 12.00 },
            { nome: "MISTA (Queijo, Presunto, Calabresa...)", descricao: "Mussarela, presunto, calabresa, milho e catupiry.", preco: 10.00 },
            { nome: "SALAMINHO, QUEIJO, CATUPIRY, ORÉGANO", descricao: "Salaminho, queijo, catupiry e orégano.", preco: 12.00 },
            { nome: "ATUM, QUEIJO, ORÉGANO", descricao: "Atum, mussarela e orégano.", preco: 12.00 },
            { nome: "ATUM, QUEIJO, CATUPIRY, ORÉGANO", descricao: "Atum, mussarela, catupiry e orégano.", preco: 13.00 },
            { nome: "CAMARÃO, QUEIJO, CATUPIRY, ORÉGANO", descricao: "Camarão, mussarela, catupiry e orégano.", preco: 15.00 },
            { nome: "QUEIJO, TOMATE-SECO, CATUPIRY, ORÉGANO", descricao: "Mussarela, tomate seco, catupiry e orégano.", preco: 12.00 },
            { nome: "QUEIJO, PALMITO, CATUPIRY, ORÉGANO", descricao: "Mussarela, palmito, catupiry e orégano.", preco: 12.00 },
            { nome: "QUEIJO, ABOBRINHA, CATUPIRY, ALHO, ORÉGANO", descricao: "Mussarela, abobrinha, catupiry, alho e orégano.", preco: 12.00 }
        ],
        esfihasDoces: [
            { nome: "ROMEU E JULIETA", descricao: "Queijo e goiabada.", preco: 9.00 },
            { nome: "DOCE DE LEITE", descricao: "Doce de leite cremoso.", preco: 9.50 },
            { nome: "NUTELLA", descricao: "Creme de avelã Nutella.", preco: 14.00 },
            { nome: "CHOCOLATE C/ GRANULADO", descricao: "Chocolate ao leite com granulado.", preco: 12.00 },
            { nome: "NUTELLA COM BANANA DA TERRA", descricao: "Nutella e banana da terra frita.", preco: 15.00 }
        ],
        pizzasBroto: [ 
            { nome: "PIZZA BROTO - FRANGO", descricao: "Mussarela, milho, catupiry, orégano.", preco: 23.00 },
            { nome: "PIZZA BROTO - QUEIJO", descricao: "Mussarela, catupiry, azeitona, orégano.", preco: 23.00 },
            { nome: "PIZZA BROTO - MISTA", descricao: "Mussarela, presunto, calabresa, milho, cebola, catupiry, orégano.", preco: 25.00 },
            { nome: "PIZZA BROTO - CARNE SECA C/ BANANA", descricao: "Mussarela e catupiry.", preco: 25.00 },
            { nome: "PIZZA BROTO - PORTUGUESA", descricao: "Mussarela, presunto, bacon, ovo, cebola, catupiry.", preco: 25.00 },
        ],
        pizzasGrandes: [ 
            { nome: "PIZZA GRANDE - FRANGO", descricao: "Mussarela, milho, catupiry, orégano.", preco: 80.00 },
            { nome: "PIZZA GRANDE - QUEIJO", descricao: "Mussarela, catupiry, azeitona, orégano.", preco: 80.00 },
            { nome: "PIZZA GRANDE - MISTA", descricao: "Mussarela, presunto, calabresa, milho, cebola, catupiry, orégano.", preco: 90.00 },
            { nome: "PIZZA GRANDE - CARNE SECA C/ BANANA", descricao: "Mussarela e catupiry.", preco: 97.00 },
            { nome: "PIZZA GRANDE - PORTUGUESA", descricao: "Mussarela, presunto, bacon, ovo, cebola, catupiry.", preco: 98.00 },
            { nome: "PIZZA GRANDE - CALABRESA", descricao: "Queijo, catupiry, cebola e orégano.", preco: 85.00 },
        ],
        salgados: [
            { nome: "QUIBE TRADICIONAL", descricao: "", preco: 12.00 },
            { nome: "QUIBE C/ QUEIJO", descricao: "", preco: 14.00 },
            { nome: "QUIBE C/ QUEIJO E CATUPIRY", descricao: "", preco: 15.00 },
            { nome: "PASTEL DE CARNE", descricao: "", preco: 12.00 },
            { nome: "PASTEL DE FRANGO", descricao: "", preco: 12.00 },
            { nome: "PASTEL DE QUEIJO", descricao: "", preco: 12.00 },
            { nome: "PASTEL DE CARNE C/ QUEIJO", descricao: "", preco: 13.00 },
            { nome: "PASTEL DE FRANGO C/ QUEIJO", descricao: "", preco: 13.00 },
            { nome: "PASTEL DE CARNE SECA", descricao: "Queijo, banana da terra e catupiry.", preco: 18.00 },
            { nome: "PASTEL DE NUTELLA COM BANANA DA TERRA", descricao: "", preco: 18.00 },
        ],
        bebidas: [
            { 
                nome: "Refrigerante Lata", 
                descricao: "Escolha Coca-Cola, Guaraná ou Sprite.", 
                preco: 9.00,
                opcoes: ['Coca-Cola', 'Guaraná', 'Sprite']
            },
            { nome: "Refrigerante KS 290ml", descricao: "", preco: 8.00 },
            { nome: "Água Mineral sem Gás 500ml", descricao: "", preco: 5.00 },
            { nome: "Água Mineral C/Gás 500ml", descricao: "", preco: 6.00 },
            { nome: "Água Mineral Aquarius Fresh", descricao: "", preco: 9.00 },
            { 
                nome: "Suco Polpa 1L", 
                descricao: "Escolha o sabor da polpa.", 
                preco: 25.00,
                opcoes: ['Graviola', 'Cacau', 'Cajá', 'Cupuaçu', 'Maracujá', 'Manga']
            },
            { 
                nome: "Suco Polpa 500ml", 
                descricao: "Escolha o sabor da polpa.", 
                preco: 12.50,
                opcoes: ['Graviola', 'Cacau', 'Cajá', 'Cupuaçu', 'Maracujá', 'Manga']
            },
            { nome: "Corona Long Neck", descricao: "", preco: 13.00 },
            { nome: "Heineken 600ml", descricao: "", preco: 20.00 },
            { nome: "Heineken Long Neck", descricao: "", preco: 12.00 },
            { nome: "Original", descricao: "Cerveja 600ml.", preco: 15.00 },
            { nome: "Amistel 600ml", descricao: "Cerveja.", preco: 15.00 },
        ],
        indisponiveis: [
            { nome: "ALCATRA", descricao: "Item temporariamente indisponível.", preco: 0.00, indisponivel: true },
            { nome: "CONTRA FILÉ", descricao: "Item temporariamente indisponível.", preco: 0.00, indisponivel: true },
            { nome: "MAMINHA", descricao: "Item temporariamente indisponível.", preco: 0.00, indisponivel: true },
            { nome: "PICANHA", descricao: "Item temporariamente indisponível.", preco: 0.00, indisponivel: true },
            { nome: "FRANGO (Carne)", descricao: "Item temporariamente indisponível.", preco: 0.00, indisponivel: true }
        ]
    };

    const cardapioCompleto = [
        { titulo: "1. Esfihas Salgadas", lista: cardapioData.esfihasSalgadas },
        { titulo: "2. Esfihas Doces", lista: cardapioData.esfihasDoces },
        { titulo: "3. Salgados (Kibes e Pastéis)", lista: cardapioData.salgados },
        { titulo: "4. Pizzas Broto (R$ 23-25)", lista: cardapioData.pizzasBroto },
        { titulo: "5. Pizzas Grandes (R$ 80-98)", lista: cardapioData.pizzasGrandes },
        { titulo: "6. Bebidas", lista: cardapioData.bebidas },
        { titulo: "Itens Não Disponíveis", lista: cardapioData.indisponiveis }
    ];
    
    // --- 2. GESTÃO DO CARRINHO ---

    function calcularTotalCarrinho() {
        return Object.values(carrinho).reduce((sum, item) => sum + item.total, 0);
    }

    function atualizarBotaoCarrinho() {
        const totalItens = Object.values(carrinho).reduce((sum, item) => sum + item.quantidade, 0);
        const totalValor = calcularTotalCarrinho();
        const botaoCarrinho = document.getElementById('cart-button');
        botaoCarrinho.textContent = `Carrinho (${totalItens}) Total: ${formatarMoeda(totalValor)}`;
    }

    function getContagemBaseProduto(baseNome) {
        let total = 0;
        for (const key in carrinho) {
            if (key.startsWith(baseNome)) {
                total += carrinho[key].quantidade;
            }
        }
        return total;
    }

    function atualizarContadorItemVisual(produtoNomeBase) {
        const spanContador = document.querySelector(`.contador-item[data-item="${produtoNomeBase.replace(/"/g, '\\"')}"]`);
        
        if (spanContador) {
            const quantidade = getContagemBaseProduto(produtoNomeBase);
            
            if (quantidade > 0) {
                spanContador.textContent = `(${quantidade} no carrinho)`;
                spanContador.style.display = 'block';
            } else {
                spanContador.style.display = 'none';
            }
        }
    }

    function adicionarAoCarrinho(produto) {
        if (carrinho[produto.nome]) {
            carrinho[produto.nome].quantidade++;
            carrinho[produto.nome].total += produto.preco;
        } else {
            carrinho[produto.nome] = {
                produto: produto,
                quantidade: 1,
                total: produto.preco
            };
        }
        
        atualizarBotaoCarrinho();
    }
    
    // --- 3. LÓGICA DE VISUALIZAÇÃO ---

    const cardapioSection = document.getElementById('cardapio-section');
    const checkoutSection = document.getElementById('checkout-section');
    const resumoCarrinhoDiv = document.getElementById('resumo-carrinho');
    const clientForm = document.getElementById('client-data-form');

    function exibirCheckout() {
        if (Object.keys(carrinho).length === 0) {
            alert("Seu carrinho está vazio! Adicione itens antes de finalizar.");
            return;
        }
        
        cardapioSection.style.display = 'none';
        checkoutSection.style.display = 'block';

        let htmlResumo = '<h4>Itens Selecionados:</h4>';
        
        Object.values(carrinho).forEach(item => {
            htmlResumo += `
                <div class="item-resumo">
                    <span>${item.quantidade}x ${item.produto.nome}</span>
                    <span>${formatarMoeda(item.total)}</span>
                </div>
            `;
        });
        
        const total = calcularTotalCarrinho();
        htmlResumo += `
            <div class="total-resumo">
                <span>TOTAL DO PEDIDO:</span>
                <span>${formatarMoeda(total)}</span>
            </div>
        `;
        
        resumoCarrinhoDiv.innerHTML = htmlResumo;
    }

    function exibirCardapio() {
        cardapioSection.style.display = 'block';
        checkoutSection.style.display = 'none';
    }

    // --- Capturar localização GPS ---
    function obterLocalizacaoClienteManual() {
        const status = document.getElementById('status-localizacao');
        if (!status) return;
        status.textContent = "📡 Obtendo localização...";
        status.style.color = "#555";

        if (!navigator.geolocation) {
            status.textContent = "❌ Seu navegador não suporta geolocalização.";
            status.style.color = "red";
            return;
        }

    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const lat = pos.coords.latitude.toFixed(8);
            const lon = pos.coords.longitude.toFixed(8);
            localizacaoCliente = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
            console.log(`📍 Localização precisa: ${lat}, ${lon}`);
            status.textContent = "✅ Localização capturada! (Pronto para enviar)";
            status.style.color = "green";
        },
            
        (err) => {
            console.error("Erro ao capturar localização:", err);
            if (err.code === 1) {
                status.textContent = "❌ Permissão de localização negada.";
            } else if (err.code === 2) {
                status.textContent = "❌ Localização indisponível.";
            } else if (err.code === 3) {
                status.textContent = "⚠️ Tempo limite para capturar localização.";
            } else {
                status.textContent = "❌ Erro desconhecido ao obter localização.";
            }
            status.style.color = "red";
            localizacaoCliente = "Não capturada";
        },
        {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        }
    );
    }


    // --- 4. GERAÇÃO DA MENSAGEM WHATSAPP ---

    function gerarMensagemWhatsApp(event) {
        event.preventDefault();

        const formData = new FormData(clientForm);
        const nome = formData.get('nome') || 'Não Informado';
        const telefoneCliente = formData.get('telefone_cliente') || 'Não Informado'; 
        const rua = formData.get('rua') || 'Não Informado';
        const numero = formData.get('numero') || 'S/N';
        const bairro = formData.get('bairro') || 'Não Informado';
        const complemento = formData.get('complemento') || 'Não informado';
        const pagamento = formData.get('pagamento') || 'A Definir'; 
        
        const subtotal = calcularTotalCarrinho();
        const taxaTextoExibicao = 'A consultar';
        const localizacaoLink = localizacaoCliente || 'Não capturada';

        // --- Lista de Itens com valores individuais ---
        let listaItensTexto = "";
        Object.values(carrinho).forEach(item => {
            listaItensTexto += `✅ ${item.quantidade}x *${item.produto.nome}* (${formatarMoeda(item.total)})\n`; 
        });

        // --- Montagem da Mensagem ---
        let mensagem = `*🍽️ TOCA DA ESFIHA - NOVO PEDIDO*\n`;
        mensagem += `──────────────────────────────\n`;
        mensagem += `👤 *Cliente:* ${nome}\n`;
        mensagem += `📞 *Telefone:* ${telefoneCliente}\n\n`;
        mensagem += `🏠 *Endereço:*\n`;
        mensagem += `• Bairro: ${bairro}\n`;
        mensagem += `• Rua/Nº: ${rua}, ${numero}\n`;
        mensagem += `• Referência: ${complemento}\n`;
        mensagem += `• Localização GPS: ${localizacaoLink}\n`;
        mensagem += `──────────────────────────────\n`;
        mensagem += `🛍️ *Itens do Pedido:*\n\n`;
        mensagem += listaItensTexto;
        mensagem += `──────────────────────────────\n`;
        mensagem += `💰 *Resumo:*\n`;
        mensagem += `Subtotal: ${formatarMoeda(subtotal)}\n`;
        mensagem += `Taxa de Entrega: ${taxaTextoExibicao} (${bairro})\n`;
        mensagem += `💵 *TOTAL:* ${formatarMoeda(subtotal)}\n`;
        mensagem += `──────────────────────────────\n`;
        mensagem += `💳 *Pagamento:* ${pagamento}\n`;
        mensagem += `⚠️ *Taxa será confirmada via WhatsApp*\n`;
        mensagem += `──────────────────────────────\n`;
        mensagem += `📦 Obrigado por pedir com a *Toca da Esfiha*! 😋\n`;
        mensagem += `──────────────────────────────\n`;
        mensagem += `📍 *Observação:*\n`;
        mensagem += `Caso o ponto no mapa não esteja exato,\n`;
        mensagem += `envie sua localização diretamente pelo WhatsApp para confirmação. 🙏`;

        const mensagemFinal = encodeURIComponent(mensagem);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensagemFinal}`;
        window.open(whatsappUrl, '_blank');

        // Resetar e Voltar ao Cardápio
        carrinho = {};
        localizacaoCliente = null;
        if (clientForm) clientForm.reset();
        atualizarBotaoCarrinho();
        
        // Atualiza a contagem visual de todos os itens para 0
        cardapioCompleto.forEach(secao => {
            secao.lista.forEach(produto => atualizarContadorItemVisual(produto.nome));
        });
        
        exibirCardapio();
    }


    // --- 5. RENDERIZAÇÃO E INICIALIZAÇÃO DO CARDÁPIO (MODIFICADA PARA SIMPLIFICAR O ID E ACEITAR EXCEÇÃO) ---
    
    function renderizarSecao(titulo, listaProdutos, containerGeral) {
        
        // Lógica simplificada para criar IDs mais limpos
        const nomeBase = titulo.replace(/^\d+\.\s*/, '').trim(); // Remove "1. "
        let sectionId = nomeBase.split('(')[0] // Pega o que está antes de '('
                                  .trim()
                                  .toLowerCase()
                                  .replace(/[^a-z0-9\s]/g, '')
                                  .replace(/\s+/g, '-'); 
        
        // NOVO: FORÇA O ID PARA 'mini-pizza' (SOLUÇÃO)
        if (sectionId === 'pizzas-broto') {
            sectionId = 'mini-pizza'; // O ID que o cliente deseja
        }
        
        // NOVO: Força o ID para 'salgados' (caso o link seja o simplificado)
        if (sectionId === 'salgados-kibes-e-pasteis') {
            sectionId = 'salgados'; // ID simplificado
        }
        
        const secaoDiv = document.createElement('section');
        secaoDiv.className = 'secao-cardapio';
        secaoDiv.id = sectionId; // ADICIONA O ID FINAL (ex: 'mini-pizza', 'pizzas-grandes')
        
        const tituloH2 = document.createElement('h2');
        tituloH2.className = 'font-titulo';
        tituloH2.textContent = titulo;
        secaoDiv.appendChild(tituloH2);

        listaProdutos.forEach(produto => {
            const indisponivel = produto.indisponivel || produto.preco === 0.00; 
            const nomeBase = produto.nome; 
            const temOpcoes = produto.opcoes && produto.opcoes.length > 0;
            
            const itemDiv = document.createElement('div');
            itemDiv.className = `item-cardapio ${indisponivel ? 'indisponivel' : ''}`;
            
            const precoFormatado = indisponivel ? 'N/D' : formatarMoeda(produto.preco);
            
            // Constrói o HTML da caixa de seleção se houver opções
            let selectHtml = '';
            if (temOpcoes) {
                const idSelect = `select-${nomeBase.replace(/\s/g, '-')}`;
                selectHtml = `
                    <div style="margin-top: 5px;">
                        <select id="${idSelect}" class="select-sabor" required>
                            <option value="" disabled selected>Escolha o sabor/marca</option>
                            ${produto.opcoes.map(opcao => `<option value="${opcao}">${opcao}</option>`).join('')}
                        </select>
                    </div>
                `;
            }
        
            itemDiv.innerHTML = `
                <div class="item-detalhes">
                    <h3>${produto.nome}</h3>
                    <p>${produto.descricao || ''}</p>
                    ${selectHtml} 
                </div>
                <div class="item-acao">
                    <span class="item-preco">${precoFormatado}</span>
                    <span class="contador-item" data-item="${nomeBase}" style="display: none;"></span> 
                    <button class="item-botao-add">
                        ${indisponivel ? 'Indisponível' : '+ Adicionar'}
                    </button>
                </div>
            `;
            
            if (!indisponivel) {
                const botaoAdicionar = itemDiv.querySelector('.item-botao-add');
                botaoAdicionar.addEventListener('click', () => {
                    let produtoParaCarrinho = produto; 
                    
                    if (temOpcoes) {
                        const selectElement = itemDiv.querySelector('.select-sabor');
                        const saborSelecionado = selectElement ? selectElement.value : '';

                        if (!saborSelecionado) {
                            alert(`Por favor, selecione o sabor/marca para ${produto.nome}.`);
                            return; 
                        }
                        
                        produtoParaCarrinho = {
                            ...produto,
                            nome: `${nomeBase} (${saborSelecionado})`
                        };
                        
                        selectElement.selectedIndex = 0;
                    }

                    adicionarAoCarrinho(produtoParaCarrinho);
                    atualizarContadorItemVisual(nomeBase); 
                });
            }

            secaoDiv.appendChild(itemDiv);
        });

        containerGeral.appendChild(secaoDiv);
    }
    
    // Execução da renderização do cardápio
    const containerGeral = document.getElementById('cardapio-container');
    if (containerGeral) {
        cardapioCompleto.forEach(secao => {
            renderizarSecao(secao.titulo, secao.lista, containerGeral);
        });
        
        // Inicializa os contadores para todos os produtos
        cardapioCompleto.forEach(secao => {
            secao.lista.forEach(produto => {
                if (!produto.indisponivel) {
                    atualizarContadorItemVisual(produto.nome);
                }
            });
        });
    }

    // --- 6. ATRIBUIÇÃO DE EVENTOS PARA CHECKOUT E SCROLL SUAVE ---
    
    const cartButton = document.getElementById('cart-button');
    if (cartButton) cartButton.addEventListener('click', exibirCheckout);
    const voltarBtnElement = document.getElementById('voltar-cardapio-btn'); 
    if (voltarBtnElement) voltarBtnElement.addEventListener('click', exibirCardapio); 
    if (clientForm) clientForm.addEventListener('submit', gerarMensagemWhatsApp);

    const btnLocalizacao = document.getElementById("btn-localizacao");
    if (btnLocalizacao) {
        btnLocalizacao.addEventListener("click", obterLocalizacaoClienteManual);
    }
    
    // --- Lógica de Scroll Suave para o Menu Rápido ---
    const quickMenu = document.getElementById('quick-menu');
    const headerElement = document.querySelector('header');
    
    // Calcula o offset (Altura do Header + Altura do Menu Rápido + Padding)
    let offset = 0;
    if (headerElement && quickMenu) {
        offset = headerElement.offsetHeight + quickMenu.offsetHeight + 10; 
    }

    document.querySelectorAll('.quick-menu a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    // Subtrai o offset para que o topo da seção fique visível abaixo dos menus fixos
                    top: targetElement.offsetTop - offset, 
                    behavior: 'smooth'
                });
            }
        });
    });
    // --- FIM Scroll Suave ---
});