export interface Airline {
    IdCompagniaAerea: number,
    Nome: string,
    CodiceIdentificativo: string,
    Email: string,
    Password: string
}

export interface NewAirline {
    name: string,
    code: string,
    email: string,
    password: string
}