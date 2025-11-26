import React, { useState } from 'react';
import { MenuItem, CartItem } from '../types';
import { Plus, Minus } from 'lucide-react';

interface Props {
  item: MenuItem;
  cartItems: CartItem[]; // Pass all cart items for this ID to calculate quantity per option
  onAdd: (option?: string) => void;
  onRemove: (option?: string) => void;
}

const MenuItemCard: React.FC<Props> = ({ item, cartItems, onAdd, onRemove }) => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(item.options?.[0]);

  // Calculate quantity for the *currently selected* option (or total if no options)
  const currentQuantity = item.options 
    ? cartItems.find(c => c.selectedOption === selectedOption)?.quantity || 0
    : cartItems.reduce((acc, c) => acc + c.quantity, 0);

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border-l-4 border-l-brand-900 border-y border-r border-gray-100 p-4 flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
      <div className="mb-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-800 leading-tight pr-2">{item.name}</h3>
          <span className="font-bold text-brand-900 whitespace-nowrap">
            R$ {item.price.toFixed(2).replace('.', ',')}
          </span>
        </div>
        <p className="text-gray-500 text-sm mt-1 leading-relaxed">{item.description}</p>
      </div>
      
      <div className="mt-2 space-y-3">
        {item.options && (
          <select 
            value={selectedOption} 
            onChange={handleOptionChange}
            className="w-full text-sm p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 outline-none focus:ring-2 focus:ring-accent-500"
          >
            {item.options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        )}

        <div className="flex items-center justify-end">
          {currentQuantity === 0 ? (
            <button 
              onClick={() => onAdd(selectedOption)}
              className="text-sm bg-brand-100 text-brand-900 hover:bg-brand-900 hover:text-white border border-brand-200 px-4 py-2 rounded-md font-semibold transition-colors duration-200 flex items-center gap-2"
            >
              <Plus size={14} />
              Adicionar
            </button>
          ) : (
            <div className="flex items-center gap-3 bg-gray-50 rounded-md p-1 border border-gray-200">
              <button 
                onClick={() => onRemove(selectedOption)}
                className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm text-brand-900 hover:text-red-600 transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="font-bold text-brand-900 text-sm w-6 text-center">{currentQuantity}</span>
              <button 
                onClick={() => onAdd(selectedOption)}
                className="w-7 h-7 flex items-center justify-center bg-brand-900 rounded shadow-sm text-white hover:bg-brand-800 transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;