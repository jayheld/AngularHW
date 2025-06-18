import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Hello World Angular App';
  
  // Hardcoded data for demonstration
  users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Editor' }
  ];

  currentDate = new Date();

  onUserClick(user: User) {
    alert(`Selected user: ${user.name} (${user.role})`);
  }
}
