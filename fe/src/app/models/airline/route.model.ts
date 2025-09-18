export interface Route {
  IdRotta: number;
  IdPartenza: number;
  NomePartenza: string;
  CittaPartenza: string;
  NazionePartenza: string;
  CodicePartenza: string;
  IdDestinazione: number;
  NomeDestinazione: string;
  CittaDestinazione: string;
  NazioneDestinazione: string;
  CodiceDestinazione: string;
  IdCompagniaAerea: number;
  NomeCompagnia: string;
  CodiceCompagnia: string;
}

export interface NewRoute {
    departureAirportId: number;
    destinationAirportId: number;
}