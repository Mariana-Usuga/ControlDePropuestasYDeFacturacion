import { commercialProposal } from "../models/interfaces/commercialProposal.interfaces";

export const PROPOSAL: commercialProposal[] = [
  {
    empresa: "e1",
    cliente: "C1",
    clienteReferencia: "R1",
    anio: '2022',
    mes: 'oct',
    conceptoDeServicio: "descarga documento",
    tipoDeServicio: "t1",
    estado: "aprobado",
    garantia: "30dias",
    moneda: "dolares",
    montoBase: '413',
    montoTotal: '344'
  },
  {
    empresa: 'e1',
    cliente: "C1",
    clienteReferencia: "R1",
    anio: '2022',
    mes: 'oct',
    conceptoDeServicio: "descarga documento",
    tipoDeServicio: "t1",
    estado: "pendiente",
    garantia: "15dias",
    moneda: "dolares",
    montoBase: '413',
    montoTotal: '344'
  },
  {
    empresa: 'e1',
    cliente: "C2",
    clienteReferencia: "R2",
    anio: '2020',
    mes: 'oct',
    conceptoDeServicio: "descarga documento",
    tipoDeServicio: "t1",
    estado: "pendiente",
    garantia: "30dias",
    moneda: "dolares",
    montoBase: '413',
    montoTotal: '344'
  }
]
