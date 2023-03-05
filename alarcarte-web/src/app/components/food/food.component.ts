import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from 'src/app/models/Food';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { SyncService } from 'src/app/services/sync.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {

  food!: Food;
  constructor(private syncService: SyncService, private foodService: FoodService,
    private router: Router, activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe((params:any) => {
      if (params.id)
        this.food = foodService.getFoodById(params.id);
    })
  }

  ngOnInit(): void {
  }

  addToCart() {
    this.syncService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }

}
