export interface NewModel{
    name: string,
    seatspc: number,
    rowsb: number,
    columnsb: number,
    rowse: number,
    columnse: number,
    extralegrows: number[]
}

export interface Model{
    IdModello: number,
    Nome: string,
    PostiPc: number,
    RigheB: number,
    ColonneB: number,
    RigheE: number,
    ColonneE: number,
    RigheExtraLeg: ExtraLegRow[]
}

export interface ExtraLegRow {
  IdRiga: number;
  Modello: number;   
  NRiga: number;    
  IsActive: boolean;
}