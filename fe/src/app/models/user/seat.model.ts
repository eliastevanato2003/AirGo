export interface Seat {
  id: string;
  row: number;
  displayRow: number;
  column: string;
  price: number;
  type: 'economy' | 'business' | 'firstclass';
  selected?: boolean;
  unavailable?: boolean;
  extraLegroom?: boolean;
}