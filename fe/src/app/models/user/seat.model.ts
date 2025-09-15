export interface Seat {
  id: string;
  row: number;
  column: string;
  price: number;
  type: 'economy' | 'business' | 'firstclass';
  selected?: boolean;
  unavailable?: boolean;
}