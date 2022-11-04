
export interface commercialProposal  {
  cliente: string,
  empresa: string | null,
  mes: string | null,
  clienteReferencia: string | null,
  year: number | null,
  conceptoServicio: string | null,
  tipoDeServicio: string | null,
  estado: string | null,
  garantia: string | null,
  moneda: string | null,
  montoBase: string | null,
  montoTotal: string| null,
  version: number | null,
  idVersionMismaPropuesta: number | null
}
