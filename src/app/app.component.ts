import { Component } from '@angular/core';
import { ChatServiceService } from './chat-service.service';


interface Message {
  sender: string;
  content: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chat-app';
  username: string = ""
  messages: Message[] = [];
  newMessage: string = "";
  isUsernameStored: boolean = false;
  constructor(private chatService: ChatServiceService){}
  async sendMessage(){
    this.messages.push({"sender": this.username, "content": this.newMessage});
    this.chatService.getBotResponse({
      'WaId': this.getUserName(),
      "Body": this.newMessage
    }).subscribe((res)=>{
      console.log(res);

      this.messages.push({"sender": res['sentBy'],"content": res['msg']})
      this.newMessage = ""
  })
  }

  saveUsername() {
    localStorage.setItem('username', this.username);
    this.isUsernameStored = true;
  }

  isUserThere(){
    if(localStorage.getItem("userName")!=""){
      return true;
    }
    return false;
  }

  getUserName(){
    if(localStorage.getItem("userName")!=""){
      return localStorage.getItem("userName")
    }
    else{
      return ""
    }
  }
  

  ngOnInit() {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      // Username already exists in local storage
      this.username = storedUsername;
      this.isUsernameStored = true;
    }
  }
}
