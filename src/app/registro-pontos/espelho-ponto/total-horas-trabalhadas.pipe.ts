import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatarTotalHorasTrabalhadas'
})
export class FormatarTotalHorasTrabalhadasPipe implements PipeTransform {
  transform(totalHoras: string): string {
    const partes = totalHoras.match(/\d+/g);

    if (partes) {
      const horas = partes[0].padStart(3, '0');
      const minutos = partes[1].padStart(2, '0');
      const segundos = partes[2].padStart(2, '0');

      return `${horas}:${minutos}:${segundos}`;
    }

    return totalHoras;
  }
}