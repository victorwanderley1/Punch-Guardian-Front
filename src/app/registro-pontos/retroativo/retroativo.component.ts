import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { RegistroPontosApiService } from 'src/app/registro-pontos-api.service';
import { RegistroPonto } from '../registro-ponto.interface';

@Component({
  selector: 'app-retroativo',
  templateUrl: './retroativo.component.html',
  styleUrls: ['./retroativo.component.css']
})
export class RetroativoComponent {
  formPonto = new FormGroup({
    tipoPonto: new FormControl<number | null>(null),
    dataPonto: new FormControl<string | null>(null),
    horario: new FormControl<string | null>(null)
  });
  mensagem: string = '';
  idPonto: number = 0;
  constructor(private registroService: RegistroPontosApiService, private route: ActivatedRoute){ }

  ngOnInit(): void{
    this.route.paramMap.subscribe(params => {
      const pontoId = params.get('id');
      const profissionalId = 1;
      if(pontoId != null){
        this.buscarPonto(profissionalId, Number.parseInt(pontoId));          
      }
    })
  }

  baterPontoRetroativo() {
    const horarioString = this.formPonto.value.horario?.split(':');
    const dataString = this.formPonto.value.dataPonto;
    const tipoPonto = this.formPonto.value.tipoPonto;
    
    if (horarioString !== undefined && dataString !== undefined && tipoPonto !== undefined && tipoPonto !== null)  {
      const hora: number = Number.parseInt(horarioString[0]);
      const minutos: number = Number.parseInt(horarioString[1]);
      let novaData: moment.Moment = moment.utc(this.formPonto.value.dataPonto).hours(hora).minutes(minutos);
      this.formPonto.value.dataPonto = novaData.format("DD/MM/YYYY HH:mm:SS");
      if(this.idPonto == 0){
        this.registroService.baterPontoRetroativo(1, tipoPonto, this.formPonto.value.dataPonto).subscribe((mensagem: any)=>{
          this.mensagem = mensagem.mensagemRetorno;
        });
      }else{
        this.registroService.atualizarPonto(1, this.idPonto, tipoPonto, this.formPonto.value.dataPonto).subscribe((mensagem: any)=>{
          this.mensagem = mensagem.mensagemRetorno;
        });
      }
      console.log(this.formPonto.value.tipoPonto + ' - ' + this.formPonto.value.dataPonto);
    }else{
      throw new Error("Data/Hora inválida.")
    }
  }

  private buscarPonto(profissionalId: number, idPonto: number){
    this.registroService.buscarPonto(profissionalId, idPonto).subscribe((ponto: RegistroPonto)=>{
      this.atualizarCampos(ponto);
    });
  }

  private atualizarCampos(ponto: RegistroPonto){
    this.formPonto = new FormGroup({
      tipoPonto: new FormControl(this.mapTipoPontoToComboBoxValue(ponto.tipoPonto)),
      dataPonto: new FormControl(ponto.hora ? this.converterStringParaData(ponto.hora).toISOString() : null),
      horario: new FormControl(ponto.hora ? ponto.hora.split(' ')[1] : null)
    });
    this.idPonto = ponto.id;
  }

  private mapTipoPontoToComboBoxValue(tipoPonto: string): number | null{
    switch (tipoPonto) {
      case 'ENTRADA':
        return 0;
      case 'SAIDA':
        return 1;
      default:
        return null;
    }
  }

  private converterStringParaData (dataString: string): Date {
    const [dataPart, horaPart] = dataString.split(' ');
    const [dia, mes, ano] = dataPart.split('/');
    const [hora, minutos, segundos] = horaPart.split(':');

    return new Date(+ano, +mes - 1, +dia, +hora, +minutos, +segundos);
  }

}
