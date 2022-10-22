import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'proposalFilter'
})
export class ProposalFilterPipe implements PipeTransform {

  transform(value: any, campo:string, ...args: any[]): any{
    console.log('value', value, 'args', args)
    if (!value) return [];
    if (!args) return value;

    return value.filter((singleItem: any) => 
      singleItem[campo].includes('CSTI')
      );
  }

}

/*console.log('singleItem', singleItem)
console.log('campo', campo)
console.log('singleItem[campo]', singleItem[campo])
console.log('args', args)
console.log('singleItem[campo].includes(args)', singleItem[campo].includes('CSTI'))*/