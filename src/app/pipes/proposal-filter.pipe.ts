import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'proposalFilter'
})
export class ProposalFilterPipe implements PipeTransform {

  transform(value: any, campo:string, ...args: any[]): any{
    console.log('value', value, 'args', args)
    return value.filter((singleItem: any) => {
      console.log('singleItem', singleItem, 'campo', campo, 'singleItem[campo]', singleItem[campo])
      console.log('singleItem[campo].includes(args)', singleItem[campo].includes(args))
      singleItem[campo].includes(args)
    }
      );
  }

}
