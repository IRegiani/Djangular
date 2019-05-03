import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // template: `
  // <expandable-list>
  //   <expandable-list-item>
  //     <span title>My List</span>
  //     <a item href="http://www.goo.gl">Google</a>
  //     <a item href="http://www.goo.gl">Google</a>
  //     <expandable-list-divider></expandable-list-divider>
  //     <a item href="http://www.goo.gl">Google</a>
  //   </expandable-list-item>
  // </expandable-list>
  // `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
}
