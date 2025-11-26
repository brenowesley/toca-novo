export interface MenuItem {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  options?: string[];
}

export interface CartItem extends MenuItem {
  quantity: number;
  selectedOption?: string;
  notes?: string;
}

export interface DeliveryZone {
  name: string;
  fee: number | 'consultar';
}

export interface CustomerData {
  name: string;
  phone: string;
  street: string;
  number: string;
  complement: string;
  district: string;
  paymentMethod: string;
  changeFor?: string;
  locationLink?: string;
}

export type PaymentMethod = 'Pix' | 'Cartao' | 'Dinheiro';