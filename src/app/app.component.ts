import { Component } from '@angular/core';


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
  nameInput: string = ""
  messages: Message[] = [];
  newMessage: string = "";

  sendMessage(){
    this.messages.push({"sender": "Sudhir", "content": "How are you"})
  }

  saveUsername(){
    localStorage.setItem("userName", this.nameInput)
  }

  isUserThere(){
    if(localStorage.getItem("userName")!=""){
      return true;
    }
    return false;
  }
}
