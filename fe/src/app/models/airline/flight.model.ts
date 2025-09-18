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
    IdCompagniaAerea: number,
    NomeCompagnia: string,
    Pieno: boolean
}

export interface NewFlight {
    plane: number;
    route: number;
    schdepdate: string;
    scharrdate: string;
    pcprice: number;
    bprice: number;
    eprice: number;
    bagprice: number;
    lrprice: number;
    scprice: number;
}