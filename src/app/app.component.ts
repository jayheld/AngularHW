import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Hello World Angular App';
  
  users: User[] = [];
  newUser: User = { id: 0, name: '', email: '', role: '' };

  currentDate = new Date();

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  addUser() {
    // A real app would have more robust validation
    if (!this.newUser.name || !this.newUser.email || !this.newUser.role) {
      alert('Please fill out all fields.');
      return;
    }
    
    // We don't send an ID, json-server will create it
    const userToAdd = {
      name: this.newUser.name,
      email: this.newUser.email,
      role: this.newUser.role
    };

    this.userService.addUser(userToAdd as User).subscribe(() => {
      this.loadUsers(); // Refresh the list
      this.newUser = { id: 0, name: '', email: '', role: '' }; // Reset the form
    });
  }

  onUserClick(user: User) {
    alert(`Selected user: ${user.name} (${user.role})`);
  }
}
