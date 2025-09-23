export interface FlightDb {
    IdVolo: number,
    Aereo: number,
    Rotta: number,
    DataPartenzaPrev: string,
    DataArrivoPrev: string,
    DataPartenzaEff: null,
    DataArrivoEff: null,
    Stato: string,
    CostoPC: number,
    CostoB: number,
    CostoE: number,
    CostoBag: number,
    CostoLegRoom: number,
    CostoSceltaPosto: number,
    IsActive: null,
    NomePartenza: string,
    CittaPartenza: string,
    CodicePartenza: string,
    NomeArrivo: string,
    CittaArrivo: string,
    CodiceArrivo: string,
    NomeCompagnia: string,
    Pieno: boolean
}

export interface Flight {
    id: number;
    airline: string;
    from: string;
    to: string;
    departure: string;
    arrival: string;
    price: number;
    full: boolean;
}

export interface FlightStatus {
    IdVolo: number,
    Aereo: number,
    Rotta: number,
    DataPartenzaPrev: string,
    DataArrivoPrev: string,
    DataPartenzaEff: null,
    DataArrivoEff: null,
    Stato: string,
    CostoPC: number,
    CostoB: number,
    CostoE: number,
    CostoBag: number,
    CostoLegRoom: number,
    CostoSceltaPosto: number,
    IsActive: true,
    IdModello: number,
    RigheB: number,
    ColonneB: number,
    ColonneE: number,
    RigheE: number,
    PostiOccupati: string,
    PostiPc: string,
    PostiB: string,
    PostiE: string,
    PostiOccPc: string,
    PostiOccB: string,
    PostiOccE: string,
    RigheExtraLeg: [],
    Guadagno: number
}

export interface FlightGroup {
    isMultiSegment: boolean;
    segments: Flight[];
}