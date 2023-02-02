import { Injectable } from '@angular/core';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {
  socket;

  constructor() { 
  this.socket = io('http://localhost:3000');
  this.socket.on("connect", () => {
    console.log(this.socket.id);
  });

  this.socket.on("disconnect", () => {
    console.log(this.socket.connected);
  });

  this.socket.emit("joinRoom")
  }

}
