import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'proposalFilter'
})
export class ProposalFilterPipe implements PipeTransform {

  transform(value: any, campos:string[], ...args: string[]): any{
    console.log('value', value, 'args', args, 'campos', campos)
    console.log('VALUE', value[0].client, value[0].clienteReferencia, value[0])
    if (!value) return [];
    if (!args) return value;
    const list = []
    const data = []
    //for(const item of value){
      data.push(value[0].client)
      data.push(value[0].clienteReferencia)
      data.push(value[0].anio)
    //}
    console.log('data', data, 'args', args)
    let encuentra = false;

    for(var i =0; i < data.length;i++){
      encuentra = false;
      for(var j =0; j < args.length;j++){
        if(data[i] == args[j]){
          encuentra = true;
          break;
        }
      }
      if(!encuentra){
        console.log('no son iguales')
        break;
      }
    }
    if(encuentra){
      list.push({
        client: data[0],
        clienteReferencia: data[1],
        anio: data[2]
      })
      console.log('value[0', list)
      return list;
    }
  }
}
/*for(let i=0; i < o.length; i++){
  console.log('args', args[arg], 'item', item[o[i]])
  if(args[arg] === item[o[i]]){
    console.log('IGUALES args', args[arg], 'item', item[o[i]])
  list.push(args[arg])
  }
}*/
/*for(const item of value){
  console.log('item', item)
  for(const arg of args){
    console.log('args', arg)
    if(item.client.indexOf(arg) > -1){
      console.log('entra en iff', item.client.indexOf(arg))
      list.push(item)
    }
  }
}*/
