export class AccommodationDTO {
    id: string = '';
    name: string ='';
    location: string='';
    wifi: boolean=false;
    kitchen: boolean=false;
    airCondition: boolean=false;
    freeParking: boolean=false;
    price: string='';
    totalPrice: string='';
    idHost: string = '';
  
    constructor(idHost:string, id:string, name: string, location: string, wifi: boolean, kitchen: boolean, airCondition: boolean, freeParking: boolean, price: string, totalPrice:string) {
      this.id = id;
      this.name = name;
      this.wifi = wifi;
      this.kitchen = kitchen;
      this.airCondition = airCondition;
      this.freeParking = freeParking;
      this.price = price;
      this.totalPrice = totalPrice;
      this.idHost = idHost;
    }
  }