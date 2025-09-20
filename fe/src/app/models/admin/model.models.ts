export interface NewModel{
    Name: string,
    SeatsPC: number,
    RowsB: number,
    ColumnsB: number,
    RowsE: number,
    ColumnsE: number,
    ExtraLegRows: number[]
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