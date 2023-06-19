export class PersonalMessage {
    id = '';
    text = '';
    notificationTime = '';
    userID = '';
    status = '';
  
    constructor(id: string, text: string, notificationTime: string, userID: string, status: string) {
      this.id = id;
      this.text = text;
      this.notificationTime = notificationTime;
      this.userID = userID;
      this.status = status;
    }
  }
