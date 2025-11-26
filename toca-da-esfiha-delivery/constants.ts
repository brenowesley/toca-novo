
import { MenuItem, DeliveryZone } from './types';

export const WHATSAPP_NUMBER = '73981139131'; 

export const OPEN_HOUR = 18;
export const CLOSE_HOUR = 22;
export const CLOSE_MINUTE = 30;

export const NEIGHBORHOODS: DeliveryZone[] = [
  { name: 'Barra Grande (Centro)', fee: 'consultar' },
  { name: 'Ponta do Mutá', fee: 'consultar' },
  { name: 'Três Coqueiros', fee: 'consultar' },
  { name: 'Bombaça', fee: 'consultar' },
  { name: 'Taipu de Fora', fee: 'consultar' },
  { name: 'Campinho', fee: 'consultar' },
  { name: 'Saquaíra', fee: 'consultar' },
  { name: 'Outro (A Combinar)', fee: 'consultar' },
];

export const CATEGORIES = [
  { id: 'esfihas_salgadas', label: 'Esfihas Salgadas', icon: '🥙' },
  { id: 'esfihas_vegetarianas', label: 'Esfihas Vegetarianas', icon: '🥦' },
  { id: 'esfihas_doces', label: 'Esfihas Doces', icon: '🍫' },
  { id: 'mini_pizzas', label: 'Mini Pizzas', icon: '🍕' },
  { id: 'pizzas', label: 'Pizzas Grandes', icon: '🍕' },
  { id: 'petiscos', label: 'Pastéis e Quibes', icon: '🥟' },
  { id: 'bebidas', label: 'Bebidas', icon: '🥤' },
];

export const MENU_DATA: MenuItem[] = [
  // --- ESFIHAS SALGADAS ---
  { id: '1', category: 'esfihas_salgadas', name: '1. Carne', description: 'Carne moída temperada.', price: 8.00 },
  { id: '2', category: 'esfihas_salgadas', name: '2. Carne com Queijo', description: 'Carne moída e mussarela.', price: 9.00 },
  { id: '3', category: 'esfihas_salgadas', name: '3. Carne, Queijo, Catupiry', description: 'Carne moída, mussarela e catupiry.', price: 10.00 },
  { id: '4', category: 'esfihas_salgadas', name: '4. Carne, Queijo, Catupiry, Bacon', description: 'Carne, queijo, catupiry e bacon.', price: 12.00 },
  { id: '5', category: 'esfihas_salgadas', name: '5. Carne Seca Especial', description: 'Carne seca desfiada, queijo, banana e catupiry.', price: 13.00 },
  { id: '6', category: 'esfihas_salgadas', name: '6. Carne Seca com Banana', description: 'Carne seca desfiada com banana.', price: 11.50 },
  { id: '7', category: 'esfihas_salgadas', name: '7. Frango', description: 'Frango desfiado temperado.', price: 8.00 },
  { id: '8', category: 'esfihas_salgadas', name: '8. Frango c/ Queijo', description: 'Frango desfiado e mussarela.', price: 9.00 },
  { id: '9', category: 'esfihas_salgadas', name: '9. Frango, Queijo, Catupiry', description: 'Frango, mussarela e catupiry.', price: 10.00 },
  { id: '10', category: 'esfihas_salgadas', name: '10. Frango Especial', description: 'Frango, bacon, milho e catupiry.', price: 13.00 },
  { id: '11', category: 'esfihas_salgadas', name: '11. Frango Completa', description: 'Frango, mussarela, milho e catupiry.', price: 12.00 },
  { id: '12', category: 'esfihas_salgadas', name: '12. Calabresa, Queijo, Orégano', description: 'Calabresa, mussarela e orégano.', price: 9.00 },
  { id: '13', category: 'esfihas_salgadas', name: '13. Calabresa Especial', description: 'Calabresa, queijo, catupiry e orégano.', price: 10.00 },
  { id: '14', category: 'esfihas_salgadas', name: '14. Queijo, Orégano', description: 'Mussarela e orégano.', price: 8.50 },
  { id: '15', category: 'esfihas_salgadas', name: '15. Queijo, Catupiry, Orégano', description: 'Mussarela, catupiry e orégano.', price: 9.00 },
  { id: '16', category: 'esfihas_salgadas', name: '16. Queijo e Milho Especial', description: 'Mussarela, milho, catupiry e orégano.', price: 10.00 },
  { id: '17', category: 'esfihas_salgadas', name: '17. Queijo, Bacon', description: 'Mussarela e bacon.', price: 12.00 },
  { id: '18', category: 'esfihas_salgadas', name: '18. Mista', description: 'Mussarela, presunto, calabresa, milho e catupiry.', price: 10.00 },
  { id: '19', category: 'esfihas_salgadas', name: '19. Salaminho', description: 'Salaminho, queijo, catupiry e orégano.', price: 12.00 },
  { id: '20', category: 'esfihas_salgadas', name: '20. Atum Simples', description: 'Atum, mussarela e orégano.', price: 12.00 },
  { id: '21', category: 'esfihas_salgadas', name: '21. Atum Especial', description: 'Atum, mussarela, catupiry e orégano.', price: 13.00 },
  { id: '22', category: 'esfihas_salgadas', name: '22. Camarão', description: 'Camarão, mussarela, catupiry e orégano.', price: 15.00 },

  // --- ESFIHAS VEGETARIANAS ---
  { id: '23', category: 'esfihas_vegetarianas', name: '23. Tomate Seco', description: 'Mussarela, tomate seco, catupiry e orégano.', price: 12.00 },
  { id: '24', category: 'esfihas_vegetarianas', name: '24. Palmito', description: 'Mussarela, palmito, catupiry e orégano.', price: 12.00 },
  { id: '25', category: 'esfihas_vegetarianas', name: '25. Abobrinha', description: 'Mussarela, abobrinha, catupiry, alho e orégano.', price: 12.00 },

  // --- ESFIHAS DOCES ---
  { id: '26', category: 'esfihas_doces', name: '26. Romeu e Julieta', description: 'Queijo e goiabada.', price: 9.00 },
  { id: '27', category: 'esfihas_doces', name: '27. Doce de Leite', description: 'Doce de leite cremoso.', price: 9.50 },
  { id: '28', category: 'esfihas_doces', name: '28. Nutella', description: 'Creme de avelã Nutella.', price: 14.00 },
  { id: '29', category: 'esfihas_doces', name: '29. Chocolate', description: 'Chocolate ao leite com granulado.', price: 12.00 },
  { id: '30', category: 'esfihas_doces', name: '30. Nutella com Banana', description: 'Nutella e banana da terra frita.', price: 15.00 },

  // --- MINI PIZZAS (Antigos Beirutes) ---
  { id: 'bei_frango', category: 'mini_pizzas', name: 'Mini Pizza de Frango', description: 'Mussarela, milho, catupiry, orégano.', price: 23.00 },
  { id: 'bei_queijo', category: 'mini_pizzas', name: 'Mini Pizza de Queijo', description: 'Mussarela, catupiry, azeitona, orégano.', price: 23.00 },
  { id: 'bei_milho', category: 'mini_pizzas', name: 'Mini Pizza de Milho', description: 'Mussarela, catupiry, azeitona, orégano.', price: 23.00 },
  { id: 'bei_mista', category: 'mini_pizzas', name: 'Mini Pizza Mista', description: 'Mussarela, presunto, calabresa, milho, cebola, catupiry, orégano.', price: 25.00 },
  { id: 'bei_carne_seca', category: 'mini_pizzas', name: 'Mini Pizza Carne Seca', description: 'Carne seca, mussarela, banana e catupiry.', price: 25.00 },
  { id: 'bei_portuguesa', category: 'mini_pizzas', name: 'Mini Pizza à Portuguesa', description: 'Mussarela, presunto, bacon, ovo, cebola, catupiry.', price: 25.00 },
  { id: 'bei_calabresa', category: 'mini_pizzas', name: 'Mini Pizza de Calabresa', description: 'Queijo, catupiry, cebola e orégano.', price: 25.00 },

  // --- PIZZAS GRANDES ---
  { id: 'pizza_frango', category: 'pizzas', name: 'Pizza Frango', description: 'Mussarela, milho, catupiry, orégano.', price: 80.00 },
  { id: 'pizza_queijo', category: 'pizzas', name: 'Pizza Queijo', description: 'Mussarela, catupiry, azeitona, orégano.', price: 80.00 },
  { id: 'pizza_milho', category: 'pizzas', name: 'Pizza Milho', description: 'Mussarela, catupiry, azeitona, orégano.', price: 80.00 },
  { id: 'pizza_calabresa', category: 'pizzas', name: 'Pizza Calabresa', description: 'Queijo, catupiry, cebola e orégano.', price: 85.00 },
  { id: 'pizza_mista', category: 'pizzas', name: 'Pizza Mista', description: 'Mussarela, presunto, calabresa, milho, cebola, catupiry, orégano.', price: 90.00 },
  { id: 'pizza_carne_seca', category: 'pizzas', name: 'Pizza Carne Seca c/ Banana', description: 'Mussarela, carne seca, banana e catupiry.', price: 97.00 },
  { id: 'pizza_portuguesa', category: 'pizzas', name: 'Pizza Portuguesa', description: 'Mussarela, presunto, bacon, ovo, cebola, catupiry.', price: 98.00 },

  // --- PASTÉIS E QUIBES ---
  { id: 'quibe_trad', category: 'petiscos', name: 'Quibe Tradicional', description: 'Carne e trigo.', price: 12.00 },
  { id: 'quibe_queijo', category: 'petiscos', name: 'Quibe com Queijo', description: 'Recheado com queijo.', price: 14.00 },
  { id: 'quibe_catupiry', category: 'petiscos', name: 'Quibe Queijo e Catupiry', description: 'Recheado com queijo e catupiry.', price: 15.00 },
  { id: 'pastel_carne', category: 'petiscos', name: 'Pastel de Carne', description: 'Carne moída temperada.', price: 12.00 },
  { id: 'pastel_frango', category: 'petiscos', name: 'Pastel de Frango', description: 'Frango desfiado.', price: 12.00 },
  { id: 'pastel_queijo', category: 'petiscos', name: 'Pastel de Queijo', description: 'Queijo mussarela.', price: 12.00 },
  { id: 'pastel_carne_q', category: 'petiscos', name: 'Pastel Carne c/ Queijo', description: 'Carne e queijo.', price: 13.00 },
  { id: 'pastel_frango_q', category: 'petiscos', name: 'Pastel Frango c/ Queijo', description: 'Frango e queijo.', price: 13.00 },
  { id: 'pastel_carne_seca', category: 'petiscos', name: 'Pastel Carne Seca', description: 'Queijo, banana da terra e catupiry.', price: 18.00 },
  { id: 'pastel_nutella', category: 'petiscos', name: 'Pastel de Nutella', description: 'Nutella com banana da terra.', price: 18.00 },

  // --- BEBIDAS ---
  { 
    id: 'refri_lata', 
    category: 'bebidas', 
    name: 'Refrigerante Lata', 
    description: '350ml', 
    price: 9.00,
    options: ['Coca-Cola', 'Coca-Cola Zero', 'Guaraná Antarctica', 'Guaraná Zero', 'Fanta Laranja', 'Fanta Uva', 'Sprite']
  },
  { id: 'refri_ks', category: 'bebidas', name: 'Refrigerante KS 290ml', description: 'Garrafinha de vidro.', price: 8.00 },
  { id: 'agua_sem', category: 'bebidas', name: 'Água Mineral s/ Gás', description: '500ml', price: 5.00 },
  { id: 'agua_com', category: 'bebidas', name: 'Água Mineral c/ Gás', description: '500ml', price: 6.00 },
  { id: 'aquarius', category: 'bebidas', name: 'Aquarius Fresh', description: '500ml', price: 9.00 },
  { 
    id: 'suco_500', 
    category: 'bebidas', 
    name: 'Suco de Polpa 500ml', 
    description: 'Copo 500ml', 
    price: 12.50,
    options: ['Graviola', 'Cacau', 'Cajá', 'Cupuaçu', 'Maracujá', 'Manga', 'Acerola']
  },
  { 
    id: 'suco_1l', 
    category: 'bebidas', 
    name: 'Suco de Polpa 1L', 
    description: 'Jarra 1 Litro', 
    price: 25.00,
    options: ['Graviola', 'Cacau', 'Cajá', 'Cupuaçu', 'Maracujá', 'Manga', 'Acerola']
  },
  { id: 'corona', category: 'bebidas', name: 'Corona Long Neck', description: 'Cerveja', price: 13.00 },
  { id: 'heineken_600', category: 'bebidas', name: 'Heineken 600ml', description: 'Cerveja', price: 20.00 },
  { id: 'heineken_ln', category: 'bebidas', name: 'Heineken Long Neck', description: 'Cerveja', price: 12.00 },
  { id: 'original', category: 'bebidas', name: 'Original 600ml', description: 'Cerveja', price: 15.00 },
  { id: 'amstel', category: 'bebidas', name: 'Amstel 600ml', description: 'Cerveja', price: 15.00 },
];
