export interface Airport {
    IdAeroporto: number,
    Citta: string,
    Nazione: string,
    Nome: string,
    CodiceIdentificativo: string,
    IsActive: boolean
}

export interface NewAirport {
    city: string,
    country: string,
    name: string,
    identificationcode: string
}