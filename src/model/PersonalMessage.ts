export class PersonalMessage {
    id = '';
    text = '';
    notificationTime = '';
    userID = '';
    status = '';
    category = '';

    constructor(id: string, text: string, notificationTime: string, userID: string, status: string, category: string) {
      this.id = id;
      this.text = text;
      this.notificationTime = notificationTime;
      this.userID = userID;
      this.status = status;
      this.category = category;
    }
  }
