export class Accomodation {
    name: string ='';
    location: string='';
    wifi: boolean=false;
    kitchen: boolean=false;
    airCondition: boolean=false;
    freeParking: boolean=false;
    price: string='';
  
    constructor(name: string, location: string, wifi: boolean, kitchen: boolean, airCondition: boolean, freeParking: boolean, price: string) {
      this.name = name;
      this.wifi = wifi;
      this.kitchen = kitchen;
      this.airCondition = airCondition;
      this.freeParking = freeParking;
      this.price = price;
    }
  }