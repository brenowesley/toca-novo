import React, { useState } from 'react';
import { CartItem, CustomerData } from '../types';
import { NEIGHBORHOODS, WHATSAPP_NUMBER } from '../constants';
import { X, MapPin, Send, DollarSign, CreditCard, Banknote, Bike, ShoppingBag } from 'lucide-react';

interface Props {
  cart: CartItem[];
  total: number;
  isOpen: boolean;
  onClose: () => void;
  onClearCart: () => void;
}

type OrderType = 'delivery' | 'pickup';

const CheckoutModal: React.FC<Props> = ({ cart, total, isOpen, onClose, onClearCart }) => {
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [formData, setFormData] = useState<CustomerData>({
    name: '',
    phone: '',
    street: '',
    number: '',
    complement: '',
    district: '',
    paymentMethod: '',
    changeFor: '',
    locationLink: ''
  });

  const [loadingLocation, setLoadingLocation] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGetLocation = () => {
    setLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const link = `https://www.google.com/maps/place/${position.coords.latitude},${position.coords.longitude}`;
          setFormData(prev => ({ ...prev, locationLink: link }));
          setLoadingLocation(false);
          alert('Localização capturada com sucesso!');
        },
        () => {
          alert('Não foi possível obter a localização. Por favor, digite o endereço.');
          setLoadingLocation(false);
        }
      );
    } else {
      alert('Geolocalização não suportada.');
      setLoadingLocation(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct the message
    let message = `🍽️ *NOVO PEDIDO - TOCA DA ESFIHA*\n`;
    message += `────────────────────────\n\n`;
    
    if (orderType === 'pickup') {
       message += `📍 *RETIRADA NO BALCÃO*\n\n`;
    } else {
       message += `🛵 *SOLICITAÇÃO DE ENTREGA*\n\n`;
    }

    message += `👤 *Cliente:* ${formData.name}\n`;
    message += `📞 *Tel:* ${formData.phone}\n\n`;

    message += `🛒 *PEDIDO:*\n`;
    cart.forEach(item => {
      message += `• ${item.quantity}x ${item.name}`;
      if (item.selectedOption) message += ` (${item.selectedOption})`;
      message += `\n`;
    });
    
    message += `\n💰 *Subtotal:* R$ ${total.toFixed(2).replace('.', ',')}\n`;
    
    if (orderType === 'delivery') {
      message += `🛵 *Taxa de Entrega:* A COMBINAR\n`;
      message += `🏁 *TOTAL APROX:* R$ ${total.toFixed(2).replace('.', ',')} + Entrega\n`;
    } else {
      message += `🏁 *TOTAL FINAL:* R$ ${total.toFixed(2).replace('.', ',')}\n`;
    }
    
    message += `────────────────────────\n\n`;

    if (orderType === 'delivery') {
      message += `📍 *DADOS DA ENTREGA:*\n`;
      message += `Bairro: ${formData.district}\n`;
      message += `Rua: ${formData.street}, Nº ${formData.number}\n`;
      if (formData.complement) message += `Comp: ${formData.complement}\n`;
      if (formData.locationLink) message += `🗺️ GPS: ${formData.locationLink}\n`;
    }

    message += `\n💳 *PAGAMENTO:* ${formData.paymentMethod}\n`;
    if (formData.paymentMethod === 'Dinheiro' && formData.changeFor) {
      message += `Troco para: R$ ${formData.changeFor}\n`;
    }

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(url, '_blank');
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-white sm:rounded-2xl rounded-t-2xl shadow-2xl max-h-[90vh] overflow-y-auto flex flex-col animate-in slide-in-from-bottom-10 duration-300">
        
        <div className="sticky top-0 bg-brand-900 text-white p-4 flex justify-between items-center z-10 shadow-md border-b-4 border-accent-500">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="bg-accent-500 text-brand-900 w-8 h-8 flex items-center justify-center rounded-full text-sm font-black">✓</span>
            Finalizar Pedido
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-brand-800 rounded-full transition-colors text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Order Type Toggle */}
          <div className="bg-gray-100 p-1 rounded-xl flex">
            <button
              type="button"
              onClick={() => setOrderType('delivery')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 ${orderType === 'delivery' ? 'bg-white text-brand-900 shadow-sm ring-1 ring-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Bike size={18} />
              Entrega
            </button>
            <button
              type="button"
              onClick={() => setOrderType('pickup')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 ${orderType === 'pickup' ? 'bg-white text-brand-900 shadow-sm ring-1 ring-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <ShoppingBag size={18} />
              Retirada
            </button>
          </div>

          {/* Cart Summary */}
          <div className="bg-brand-100 p-4 rounded-lg border border-brand-200">
            <h3 className="font-semibold text-brand-900 mb-2 text-sm uppercase tracking-wide">Resumo do Pedido</h3>
            <ul className="space-y-2 text-sm text-gray-800 mb-3 max-h-32 overflow-y-auto pr-2">
              {cart.map((item, idx) => (
                <li key={`${item.id}-${idx}`} className="flex justify-between items-start border-b border-brand-200 pb-1 last:border-0">
                  <div className="flex flex-col">
                    <span className="font-medium">{item.quantity}x {item.name}</span>
                    {item.selectedOption && <span className="text-xs text-gray-600 ml-1">• {item.selectedOption}</span>}
                  </div>
                  <span className="font-bold text-brand-900 whitespace-nowrap">R$ {(item.price * item.quantity).toFixed(2).replace('.',',')}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center pt-3 border-t border-brand-200">
              <span className="font-bold text-gray-800">Subtotal</span>
              <span className="font-bold text-brand-900 text-lg">R$ {total.toFixed(2).replace('.', ',')}</span>
            </div>
            
            {orderType === 'delivery' ? (
              <div className="text-xs text-brand-800 mt-2 flex items-center gap-1 bg-white/50 p-2 rounded">
                 ⚠️ Taxa de entrega a combinar no WhatsApp.
              </div>
            ) : (
              <div className="text-xs text-green-700 mt-2 flex items-center gap-1 bg-white/50 p-2 rounded border border-green-200">
                 ✅ Sem taxa de entrega (Retirada no Balcão).
              </div>
            )}
          </div>

          {/* Personal Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 border-b pb-2">Seus Dados</h3>
            <div className="grid grid-cols-1 gap-4">
              <input
                required
                name="name"
                placeholder="Seu Nome Completo"
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-accent-500 focus:border-brand-900 outline-none transition-shadow"
                onChange={handleChange}
              />
              <input
                required
                name="phone"
                type="tel"
                placeholder="Telefone / WhatsApp (com DDD)"
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-accent-500 focus:border-brand-900 outline-none transition-shadow"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Address - Only show if Delivery is selected */}
          {orderType === 'delivery' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-4">
              <h3 className="font-bold text-gray-800 border-b pb-2 flex justify-between items-center">
                Endereço de Entrega
                <button 
                  type="button" 
                  onClick={handleGetLocation}
                  disabled={loadingLocation}
                  className="text-xs bg-accent-500 text-brand-900 font-bold px-3 py-1 rounded-full flex items-center gap-1 hover:bg-accent-600 transition-colors shadow-sm"
                >
                  <MapPin size={12} />
                  {loadingLocation ? 'Buscando...' : 'Usar GPS'}
                </button>
              </h3>
              
              <div className="space-y-3">
                <select 
                  name="district" 
                  required={orderType === 'delivery'}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-accent-500 outline-none"
                  onChange={handleChange}
                  value={formData.district}
                >
                  <option value="">Selecione o Bairro...</option>
                  {NEIGHBORHOODS.map(hood => (
                    <option key={hood.name} value={hood.name}>{hood.name}</option>
                  ))}
                </select>

                <div className="flex gap-3">
                  <input
                    required={orderType === 'delivery'}
                    name="street"
                    placeholder="Rua / Avenida"
                    className="flex-1 p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-accent-500 outline-none"
                    onChange={handleChange}
                  />
                  <input
                    required={orderType === 'delivery'}
                    name="number"
                    placeholder="Nº"
                    className="w-24 p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-accent-500 outline-none"
                    onChange={handleChange}
                  />
                </div>

                <input
                  name="complement"
                  placeholder="Complemento / Ponto de Referência"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-accent-500 outline-none"
                  onChange={handleChange}
                />
                
                {formData.locationLink && (
                   <div className="text-xs text-green-700 flex items-center gap-1 bg-green-50 p-2 rounded border border-green-200">
                      <MapPin size={12} /> Localização GPS anexada ao pedido.
                   </div>
                )}
              </div>
            </div>
          )}

          {/* Payment */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 border-b pb-2">Pagamento</h3>
            
            <div className="grid grid-cols-3 gap-2">
              <label className={`cursor-pointer border rounded-lg p-3 flex flex-col items-center gap-2 transition-all ${formData.paymentMethod === 'Pix' ? 'bg-brand-50 border-brand-900 text-brand-900 ring-1 ring-brand-900' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                <input type="radio" name="paymentMethod" value="Pix" className="hidden" onChange={handleChange} required />
                <DollarSign size={20} />
                <span className="text-xs font-semibold">Pix</span>
              </label>
              <label className={`cursor-pointer border rounded-lg p-3 flex flex-col items-center gap-2 transition-all ${formData.paymentMethod === 'Cartao' ? 'bg-brand-50 border-brand-900 text-brand-900 ring-1 ring-brand-900' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                <input type="radio" name="paymentMethod" value="Cartao" className="hidden" onChange={handleChange} />
                <CreditCard size={20} />
                <span className="text-xs font-semibold">Cartão</span>
              </label>
              <label className={`cursor-pointer border rounded-lg p-3 flex flex-col items-center gap-2 transition-all ${formData.paymentMethod === 'Dinheiro' ? 'bg-brand-50 border-brand-900 text-brand-900 ring-1 ring-brand-900' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                <input type="radio" name="paymentMethod" value="Dinheiro" className="hidden" onChange={handleChange} />
                <Banknote size={20} />
                <span className="text-xs font-semibold">Dinheiro</span>
              </label>
            </div>

            {formData.paymentMethod === 'Dinheiro' && (
              <div className="animate-in fade-in slide-in-from-top-2">
                <label className="text-sm text-gray-600 mb-1 block">Precisa de troco para quanto?</label>
                <input
                  name="changeFor"
                  placeholder="Ex: 50,00"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-accent-500 outline-none"
                  onChange={handleChange}
                />
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className="w-full bg-brand-green text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-green-700 active:transform active:scale-[0.98] transition-all flex items-center justify-center gap-2 border-b-4 border-green-800"
          >
            <Send size={20} />
            Enviar Pedido pelo WhatsApp
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;