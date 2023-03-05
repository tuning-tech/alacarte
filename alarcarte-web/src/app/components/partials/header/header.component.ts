import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { SyncService } from 'src/app/services/sync.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartQuantity = 0;
  constructor(syncService: SyncService) {
    syncService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    })
  }

  ngOnInit(): void {
  }

}
