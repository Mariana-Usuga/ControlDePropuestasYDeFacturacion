import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'proposalFilter'
})
export class ProposalFilterPipe implements PipeTransform {

  transform(value: any, campos:any, ...args: string[]): any{
    console.log('value', value, 'campos', campos)
    if (!value) return [];
    if (!args) return value;
    const list: any[] = []
    const cam = ['cliente', 'clienteReferencia', 'tipoDeServicio', 'empresa', 'anio', 'mes',
    'moneda', 'estado']

    for(const item of value){
      for(const c of cam){
          if(item[c] === campos[c]){
            if(c === 'tipoDeServicio' || c === 'empresa' || c === 'anio' || c === 'mes'
             || c === 'moneda' || c === 'estado'){
              list.push(item)
            }
          }else{
              console.log('no igual')
              console.log('NO iguales', item[c], campos[c])
              break;

          }
      }
    }

    console.log('list', list)
    return list
}
}
