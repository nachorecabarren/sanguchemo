import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  breadTypes = ['White Bread 🥖', 'Whole Grain 🥪', 'Rye 🍞', 'Brioche 🍞'];
  vegetables = ['Lettuce 🥬', 'Tomato 🍅', 'Pickles 🥒', 'Onion 🧅'];
  sauces = ['Mayonnaise 🍶', 'Ketchup 🍅', 'Mustard 🌭', 'Salsa 🌶'];
  cheeses = ['Cheddar 🧀', 'Swiss 🧀', 'Gouda 🧀', 'Blue Cheese 🧀'];
  meats = ['Ham 🍖', 'Turkey 🦃', 'Chicken 🍗', 'Beef 🥩'];
  extras = ['Extra Patty 🍔', 'Fries 🍟', 'Cheddar 🧀', 'Egg 🥚', 'Soda 🥤', 'Water 💧'];

  selectedBread = '';
  selectedVegetables: string[] = [];
  selectedSauces: string[] = [];
  selectedCheese = '';
  selectedMeat = '';
  selectedExtras: string[] = [];

  toggleVegetable(vegetable: string): void {
    const index = this.selectedVegetables.indexOf(vegetable);
    if (index === -1) {
      this.selectedVegetables.push(vegetable);
    } else {
      this.selectedVegetables.splice(index, 1);
    }
  }

  toggleSauce(sauce: string): void {
    const index = this.selectedSauces.indexOf(sauce);
    if (index === -1) {
      this.selectedSauces.push(sauce);
    } else {
      this.selectedSauces.splice(index, 1);
    }
  }

  toggleExtra(extra: string): void {
    const index = this.selectedExtras.indexOf(extra);
    if (index === -1) {
      this.selectedExtras.push(extra);
    } else {
      this.selectedExtras.splice(index, 1);
    }
  }

  getOrderMessage(): string {
    let message = `¡Hola! Quiero pedir un sándwich con: \n`;
    message += `🍞 Pan: ${this.selectedBread}\n`;
    if (this.selectedVegetables.length > 0) {
      message += `🥬 Verduras: ${this.selectedVegetables.join(', ')}\n`;
    }
    if (this.selectedSauces.length > 0) {
      message += `🍶 Aderezos: ${this.selectedSauces.join(', ')}\n`;
    }
    message += `🧀 Queso: ${this.selectedCheese}\n`;
    message += `🍖 Carne: ${this.selectedMeat}\n`;
    if (this.selectedExtras.length > 0) {
      message += `🍔 Extras: ${this.selectedExtras.join(', ')}\n`;
    }
    return encodeURIComponent(message);
  }

  sendOrderViaWhatsApp(): void {
    const phoneNumber = '5493442507430'; // Número de WhatsApp del local
    const message = this.getOrderMessage();
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
  }
}
