import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonButton,
  IonSearchbar,
  IonItem, IonLabel,
  IonSelect, IonSelectOption,
  IonList, IonAvatar,
  IonIcon
} from '@ionic/angular/standalone';

import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonButton,
    IonSearchbar,
    IonItem, IonLabel,
    IonSelect, IonSelectOption,
    IonList, IonAvatar,
    IonIcon
  ]
})
export class ProductsPage implements OnInit {

  products: any[] = [];
  filtered: any[] = [];

  searchTerm = '';
  category = 'all';

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.loadAllClothing();
  }

  loadAllClothing() {
    this.productsService.getAllClothing().subscribe((responses: any[]) => {
      this.products = [];
      responses.forEach((res: any) => {
        this.products = this.products.concat(res.products);
      });

      this.filtered = this.products;
    });
  }

  filterChanged() {
    const term = this.searchTerm.toLowerCase().trim();

    this.filtered = this.products.filter(p => {
      const matchesSearch =
        term === '' || (p.title && p.title.toLowerCase().includes(term));

      const matchesCategory =
        this.category === 'all' || p.category === this.category;

      return matchesSearch && matchesCategory;
    });
  }
}
