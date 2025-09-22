export interface TicketDB {
  IdBiglietto: number;
  Utente: number;
  Volo: number;
  Nome: string;
  Cognome: string;
  DoB: string; // ISO date string
  Classe: string;
  NBagagliExtra: number;
  IsActive: boolean;
  ColPosto: string;
  NPosto: number | null;
  SceltaPosto: boolean;
  Costo: number;
  RigPosto: number;

  // info volo
  IdVolo: number;
  Aereo: number;
  Rotta: number;
  DataPartenzaPrev: string; // ISO date
  DataArrivoPrev: string;   // ISO date
  DataPartenzaEff: string | null;
  DataArrivoEff: string | null;
  Stato: string;

  // costi
  CostoPC: number;
  CostoB: number;
  CostoE: number;
  CostoBag: number;
  CostoLegRoom: number;
  CostoSceltaPosto: number;

  // info rotta
  IdRotta: number;
  Partenza: number;
  Destinazione: number;
  CodicePartenza: string,
  CodiceDestinazione: string,
  CompagniaAerea: number;
}
