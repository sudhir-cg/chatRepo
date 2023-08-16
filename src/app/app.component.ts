import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ChatServiceService } from './chat-service.service';

interface Message {
  sender: string;
  content: string;
  timestamp: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('msgContainer', { static: false })
  container!: ElementRef<HTMLElement>;

  title = 'chat-app';
  currentTime: any;
  username: string = '';
  messages: Message[] = [];
  newMessage: string = '';
  isUsernameStored: boolean = false;

  constructor(private chatService: ChatServiceService) {}
  async sendMessage() {
    this.messages.push({
      sender: this.username,
      content: this.newMessage,
      timestamp: this.currentTime,
    });
    this.chatService
      .getBotResponse({
        WaId: this.username,
        Body: this.newMessage,
      })
      .subscribe((res) => {
        console.log(res);

        this.messages.push({
          sender: res['sentBy'],
          content: res['msg'],
          timestamp: this.currentTime,
        });
        console.log(this.messages);
      });
    this.newMessage = '';
  }

  saveUsername() {
    localStorage.setItem('username', this.username);
    this.isUsernameStored = true;
  }

  isUserThere() {
    if (localStorage.getItem('userName') != '') {
      return true;
    }
    return false;
  }

  getUserName() {
    if (localStorage.getItem('userName') != '') {
      return localStorage.getItem('userName');
    } else {
      return '';
    }
  }

  ngOnInit() {
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      // Username already exists in local storage
      this.username = storedUsername;
      this.isUsernameStored = true;
    }
  }

  ngAfterViewInit() {
    if (this.container) {
      this.container.nativeElement.scrollTop =
        this.container.nativeElement.scrollHeight;
    }
  }
}
