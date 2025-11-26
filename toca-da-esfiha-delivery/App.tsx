import React, { useState, useMemo } from 'react';
import { MENU_DATA, CATEGORIES } from './constants';
import { CartItem, MenuItem } from './types';
import StoreStatus from './components/StoreStatus';
import MenuItemCard from './components/MenuItemCard';
import CheckoutModal from './components/CheckoutModal';
import { ChevronRight, Phone, MapPin } from 'lucide-react';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);

  const addToCart = (item: MenuItem, selectedOption?: string) => {
    setCart(prev => {
      // Find item with same ID AND same selected option
      const existing = prev.find(i => i.id === item.id && i.selectedOption === selectedOption);
      if (existing) {
        return prev.map(i => (i.id === item.id && i.selectedOption === selectedOption) 
          ? { ...i, quantity: i.quantity + 1 } 
          : i
        );
      }
      return [...prev, { ...item, quantity: 1, selectedOption }];
    });
  };

  const removeFromCart = (itemId: string, selectedOption?: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === itemId && i.selectedOption === selectedOption);
      if (existing && existing.quantity > 1) {
        return prev.map(i => (i.id === itemId && i.selectedOption === selectedOption) 
          ? { ...i, quantity: i.quantity - 1 } 
          : i
        );
      }
      return prev.filter(i => !(i.id === itemId && i.selectedOption === selectedOption));
    });
  };

  const clearCart = () => setCart([]);

  const total = useMemo(() => {
    return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [cart]);

  const totalItems = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const scrollToCategory = (catId: string) => {
    setActiveCategory(catId);
    const element = document.getElementById(catId);
    if (element) {
      const headerOffset = 130;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen pb-24 bg-gray-50">
      
      {/* Top Banner Status */}
      <StoreStatus />

      {/* Header */}
      <header className="bg-brand-900 text-white shadow-xl sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
             <div className="flex flex-col">
               <h1 className="text-2xl font-bold leading-none tracking-tight text-accent-500 drop-shadow-sm">Toca da Esfiha</h1>
               <p className="text-sm text-white/90 font-medium mt-1 flex items-center gap-1">
                 <MapPin size={14} className="text-accent-500" /> Barra Grande - Península de Maraú
               </p>
             </div>
             <a href="tel:73981139131" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors border border-white/20">
                <Phone size={20} className="text-accent-500" />
             </a>
          </div>
        </div>

        {/* Categories Navigation */}
        <nav className="bg-white text-brand-900 shadow-md border-b border-gray-100 overflow-x-auto hide-scrollbar">
          <div className="max-w-4xl mx-auto px-2 flex whitespace-nowrap gap-1 py-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-all duration-300 ${activeCategory === cat.id ? 'border-brand-900 text-brand-900 bg-brand-50' : 'border-transparent text-gray-500 hover:text-brand-900'}`}
              >
                <span className="text-lg">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 pt-8 space-y-10">
        {CATEGORIES.map(cat => (
          <section key={cat.id} id={cat.id} className="scroll-mt-40">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-brand-900 text-accent-500 p-2 rounded-lg shadow-sm">
                <span className="text-xl">{cat.icon}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-accent-500 pb-1 pr-4">{cat.label}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MENU_DATA.filter(item => item.category === cat.id).map(item => {
                // Pass all cart items matching this ID (so card can calculate quantity per flavor)
                const cartItems = cart.filter(c => c.id === item.id);
                return (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    cartItems={cartItems}
                    onAdd={(opt) => addToCart(item, opt)}
                    onRemove={(opt) => removeFromCart(item.id, opt)}
                  />
                );
              })}
            </div>
          </section>
        ))}
      </main>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full p-4 z-40 bg-gradient-to-t from-gray-100 via-gray-100 to-transparent pointer-events-none">
          <button 
            onClick={() => setIsCheckoutOpen(true)}
            className="w-full max-w-lg mx-auto bg-brand-900 text-white rounded-xl shadow-2xl p-4 flex items-center justify-between pointer-events-auto transform transition-all hover:scale-[1.02] active:scale-95 group border-2 border-accent-500"
          >
            <div className="flex items-center gap-4">
              <div className="bg-accent-500 text-brand-900 w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg border border-brand-900">
                {totalItems}
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs text-white/80 uppercase font-bold tracking-wider">Total sem entrega</span>
                <span className="font-bold text-xl text-white">R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 font-bold text-accent-500 group-hover:text-white transition-colors">
              Ver Carrinho
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      )}

      {/* Checkout Modal */}
      <CheckoutModal 
        cart={cart}
        total={total}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onClearCart={clearCart}
      />

      {/* Footer */}
      <footer className="mt-20 bg-brand-900 text-white text-center py-12 px-4 border-t-4 border-accent-500">
        <div className="max-w-4xl mx-auto">
          <p className="font-bold text-2xl mb-2 text-accent-500">Toca da Esfiha</p>
          <p className="text-sm opacity-90 mb-6">A Melhor Esfiha Aberta da Região</p>
          <div className="border-t border-brand-800 pt-6">
            <p className="text-xs">Barra Grande - Península de Maraú, BA</p>
            <p className="text-xs mt-1">&copy; {new Date().getFullYear()} Delivery App</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;