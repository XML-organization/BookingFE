export class AccommodationDTO {
    id: string = '';
    name: string ='';
    location: string='';
    wifi: boolean=false;
    kitchen: boolean=false;
    airCondition: boolean=false;
    freeParking: boolean=false;
    pricePerGuest: string='';
    totalPrice: string='';
  
    constructor(id:string, name: string, location: string, wifi: boolean, kitchen: boolean, airCondition: boolean, freeParking: boolean, pricePerGuest: string, totalPrice:string) {
      this.id = id;
      this.name = name;
      this.wifi = wifi;
      this.kitchen = kitchen;
      this.airCondition = airCondition;
      this.freeParking = freeParking;
      this.pricePerGuest = pricePerGuest;
      this.totalPrice = totalPrice;
    }
  }