import { commercialProposal } from "../models/interfaces/commercialProposal.interfaces";

export const PROPOSAL: commercialProposal[] = [
  {
    empresa: "CST",
    clienteReferencia: "COLSUBSIDIO",
    anio: 2020,
    conceptoDeServicio: "descarga documento", 
    tipoDeServicio: "tipo de servicio",
    estado: "aprobado",
    garantia: "30dias",
    moneda: "dolares",
    montoBase: 413,
    montoTotal: 344
  },
  {
    empresa: "CSTI",
    clienteReferencia: "COLSUBSIDIO",
    anio: 2020,
    conceptoDeServicio: "descarga documento", 
    tipoDeServicio: "tipo de servicio",
    estado: "rechazado",
    garantia: "30dias",
    moneda: "dolares",
    montoBase: 413,
    montoTotal: 344
  },
  {
    empresa: "CSTI",
    clienteReferencia: "COLSUBSIDIO",
    anio: 2020,
    conceptoDeServicio: "descarga documento", 
    tipoDeServicio: "tipo de servicio",
    estado: "pendiente",
    garantia: "30dias",
    moneda: "dolares",
    montoBase: 413,
    montoTotal: 344
  }
]