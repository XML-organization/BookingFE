export class Booking {
    id: string ='';
    accomodationID: string='';
    userID: string='';
    startDate: string ='';
    endDate:  string ='';
    guestNumber: string = '';
    status:  string ='';
  
    constructor(id: string, accomodationID: string, userID: string, startDate: string, endDate: string, guestNumber: string, status: string) {
      this.id = id;
      this.accomodationID = accomodationID;
      this.userID = userID;
      this.startDate = startDate;
      this.endDate = endDate;
      this.guestNumber = guestNumber;
      this.status = status;
    }
  }