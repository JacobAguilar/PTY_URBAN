import { Component } from '@angular/core';
// import { MicroserviciorestService } from '../servicios/microserviciorest.service';
// import { LoadingController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { AlertController } from '@ionic/angular';
import { Platform, IonRouterOutlet } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public numeroTarjeta: number = 0;
  private url: string = '';
  public Tarjeta: any = {
    no_tarjeta: '0',
    estadoContrato: '',
    saldo: '0.00',
    fechaSaldo: '00/00/0000 00:00'
  };
  public data: boolean;
  constructor(
    // public loadingController: LoadingController,
    // private Microservicio: MicroserviciorestService,
    private http: HTTP,
    public alertController: AlertController,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet
  ) {
    this.numeroTarjeta = 30674983;
    this.url = 'https://microservicio01.herokuapp.com/consultatarjeta/'+this.numeroTarjeta;
    this.data = false;

    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });

  }

  ngOnInit() {
    this.getSaldos();
  }

  public getSaldos(){
    // this.presentLoading();
    console.log("Realizando Peticion get  ..... ");
    this.data = false;
    this.http.get(this.url, {}, {})
    .then(res => {
      console.log('v5');
      res.data = JSON.parse(res.data);
      console.log("Estatus: ", res.status);
      console.log("Data: ", res.data.data.estadoContrato); // data received by server
      console.log("Header: ", res.headers);

      let datos = res.data.data;
      // this.Tarjeta.no_tarjeta = datos.data.no_tarjeta;
      // this.Tarjeta.estadoContrato = res.data.data.estadoContrato;
      // this.Tarjeta.saldo = res.data.data.saldo;
      // this.Tarjeta.fechaSaldo = res.data.data.fechaSaldo;


      this.Tarjeta.no_tarjeta = res.data.data.no_tarjeta;
      this.Tarjeta.estadoContrato = res.data.data.estadoContrato;
      this.Tarjeta.saldo = res.data.data.saldo;
      this.Tarjeta.fechaSaldo = res.data.data.fechaSaldo;
      this.data = true;

    })
    .catch(error => {
      this.presentAlert();
      this.data = true;
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
    }); 
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atención',
      subHeader: '',
      message: 'Verifíque su conexión a internet.',
      buttons: ['OK']
    });

    await alert.present();
  }

  

}
