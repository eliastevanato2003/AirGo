export interface Plane {
    IdAereo : number,
    AnnoCostruzione : number,
    IdcompagniaAerea : number,
    InServizio : boolean,
    NomeCompagnia : string,
    CodiceIdentificativo : string,
    IdModello : number,
    NomeModello : string
}

export interface NewPlane {
    model: number,
    constructionyear : number
}
