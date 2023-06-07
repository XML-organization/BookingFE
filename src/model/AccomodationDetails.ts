export class AccommodationDetails {
  id: string = "";
  name: string = "";
  location: string = "";
  wifi: boolean = false;
  kitchen: boolean = false;
  airCondition: boolean = false;
  freeParking: boolean = false;
  autoApproval: boolean = false;
  photos: string = "";
  minGuests: number = 0;
  maxGuests: number = 0;
  idHost: string = "";
  pricePerGuest: boolean = false;

  constructor(
    id: string,
    name: string,
    location: string,
    wifi: boolean,
    kitchen: boolean,
    airCondition: boolean,
    freeParking: boolean,
    autoApproval: boolean,
    photos: string,
    minGuests: number,
    maxGuests: number,
    idHost: string,
    pricePerGuest: boolean
  ) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.wifi = wifi;
    this.kitchen = kitchen;
    this.airCondition = airCondition;
    this.freeParking = freeParking;
    this.autoApproval = autoApproval;
    this.photos = photos;
    this.minGuests = minGuests;
    this.maxGuests = maxGuests;
    this.idHost = idHost;
    this.pricePerGuest = pricePerGuest;
  }
}
