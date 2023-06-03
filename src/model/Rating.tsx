export class Rating {
    id: string = '';
    rating: number = 0;
    date: string = '';
    raterId: string = '';
    raterName: string = '';
    raterSurname: string = '';
    userId: string = '';
  
    constructor(
      id: string,
      rating: number,
      date: string,
      raterId: string,
      raterName: string,
      raterSurname: string,
      userId: string
    ) {
      this.id = id;
      this.rating = rating;
      this.date = date;
      this.raterId = raterId;
      this.raterName = raterName;
      this.raterSurname = raterSurname;
      this.userId = userId;
    }
  }
  