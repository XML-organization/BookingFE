export class Grade {
 id: string  ='';
 accomodationId: string  ='';
 userId: string  ='';
 userName: string  ='';
 userSurname: string  ='';
 grade: string  ='';
 date: string  ='';

 constructor(
  id: string, accomodationId: string, userId: string, userName: string, userSurname: string, grade: string, date: string,){
  this.id =id;
  this.accomodationId = accomodationId;
  this.userId = userId;
  this.userName = userName;
  this.userSurname= userSurname;
  this.grade =grade;
  this.date = date;
 } 
}