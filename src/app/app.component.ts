import { Component, HostListener } from '@angular/core';
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
breadTypes = ['Pan Blanco 🥖', 'Integral 🥪', 'Centeno 🍞', 'Brioche 🍞'];
vegetables = ['Lechuga 🥬', 'Tomate 🍅', 'Pickles 🥒', 'Cebolla 🧅'];
sauces = ['Mayonesa 🍶', 'Ketchup 🍅', 'Mostaza 🌭', 'Salsa 🌶'];
cheeses = ['Cheddar 🧀', 'Suizo 🧀', 'Gouda 🧀', 'Queso Azul 🧀'];
meats = ['Jamón 🍖', 'Pavo 🦃', 'Pollo 🍗', 'Res 🥩'];
extras = ['Medallón Extra 🍔', 'Medallón Extra X2 🍔','Papas Fritas 🍟', 'Extra Queso 🧀', 'Huevo 🥚'];
toDrink = ['Gaseosa 🥤', 'Agua Saborizada 🥤','Agua 💧', 'Cerveza 🍺'];



  selectedBread = '';
  selectedVegetables: string[] = [];
  selectedSauces: string[] = [];
  selectedCheese = '';
  selectedMeat = '';
  selectedExtras: string[] = [];
  selectedDrinks: string[] = [];
  customerName: string = ''; // Inicializa el nombre como una cadena vacía
  showFooter = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const container = document.querySelector('.container');
    if (container) {
      const { scrollTop, clientHeight, scrollHeight } = container as HTMLElement;
      this.showFooter = scrollTop + clientHeight >= scrollHeight;
    }
  }

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

  toggleDrink(drink: string): void {
    const index = this.selectedDrinks.indexOf(drink);
    if (index === -1) {
      this.selectedDrinks.push(drink);
    } else {
      this.selectedDrinks.splice(index, 1);
    }
  }

  getOrderMessage(): string {
    let message = `¡Hola! Soy ${this.customerName} y quiero pedir un sándwich con:\n\n`;
    message += ` • Pan: ${this.selectedBread}\n\n`;

    if (this.selectedVegetables.length > 0) {
      message += ` • Verduras: ${this.selectedVegetables.join(', ')}\n\n`;
    }

    if (this.selectedSauces.length > 0) {
      message += ` • Aderezos: ${this.selectedSauces.join(', ')}\n\n`;
    }

    message += ` • Queso: ${this.selectedCheese}\n\n`;
    message += ` • Carne: ${this.selectedMeat}\n\n`;

    if (this.selectedExtras.length > 0) {
      message += ` • Extras: ${this.selectedExtras.join(', ')}\n\n`;
    }

    if (this.selectedDrinks.length > 0) {
      message += ` • Bebidas: ${this.selectedDrinks.join(', ')}\n\n`;
    }

    // Codifica el mensaje completo para que se envíe correctamente a WhatsApp
    return encodeURIComponent(message);
  }


  sendOrderViaWhatsApp(): void {
    const phoneNumber = '5493442507430'; // Número de WhatsApp del local
    const message = this.getOrderMessage();
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
  }
}
