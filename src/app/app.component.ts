import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true, // Asegúrate de que sea standalone
  imports: [FormsModule, CommonModule], // Añade FormsModule aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  customerName: string = '';  // Nombre del usuario
  selectedOrderType: string = '';  // Sándwich o ensalada
  orders: string[] = [];  // Lista de pedidos
  isPickup: boolean = true; // Estado de si el pedido es para retirar
  shippingAddress: string = ''; // Dirección de envío
  isModalOpen: boolean = false;

  // Ingredientes para Sandwich
  breadTypes = ['Pan Blanco 🥖', 'Integral 🥪', 'Centeno 🍞', 'Brioche 🍞'];
  vegetables = ['Tomate 🍅', 'Lechuga 🥬', 'Rúcula 🥗', 'Zanahoria 🥕', 'Pepino 🥒', 'Huevo 🥚', 'Aceitunas 🫒', 'Salsa Criolla 🌶', 'Cebolla 🧅', 'Cebolla Morada 🧅'];
  sauces = ['Mayonesa 🍶', 'Ketchup 🍅', 'Mostaza 🌭', 'Salsa 🌶'];
  cheeses = ['Cheddar 🧀', 'Suizo 🧀', 'Gouda 🧀', 'Queso Azul 🧀'];
  meats = ['Jamón 🍖', 'Pavo 🦃', 'Pollo 🍗', 'Res 🥩'];
  extras = ['Medallón Extra 🍔', 'Medallón Extra X2 🍔','Papas Fritas 🍟', 'Extra Queso 🧀', 'Huevo 🥚'];
  toDrink = ['Gaseosa 🥤', 'Agua Saborizada 🥤','Agua 💧', 'Cerveza 🍺'];

  // Ingredientes para Ensaladas
  saladBases = ['Lechuga Romana 🥬', 'Espinaca 🥗', 'Kale 🥬'];
  saladIngredients = ['Tomate 🍅', 'Lechuga 🥬', 'Rúcula 🥗', 'Zanahoria 🥕', 'Pepino 🥒', 'Huevo 🥚', 'Aceitunas 🫒', 'Salsa Criolla 🌶', 'Cebolla 🧅', 'Cebolla Morada 🧅'];
  dressings = ['Aderezo César 🥣', 'Aceite de Oliva 🫒', 'Vinagreta 🍶'];

  selectedBread = '';
  selectedMeat = '';
  selectedCheese = '';
  selectedBase = '';
  selectedVegetables: string[] = [];
  selectedSaladIngredients: string[] = [];
  selectedSauces: string[] = [];
  selectedExtras: string[] = [];
  selectedDressings: string[] = [];
  selectedDrink: string[] = [];

    showFooter = true;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const container = document.querySelector('.container');
    if (container) {
      const { scrollTop, clientHeight, scrollHeight } = container as HTMLElement;
      this.showFooter = scrollTop + clientHeight >= scrollHeight;
    }
  }

  toggleVegetable(veg: string) {
    this.toggleItem(veg, this.selectedVegetables);
  }

  toggleSaladIngredient(ingredient: string) {
    this.toggleItem(ingredient, this.selectedSaladIngredients);
  }

  toggleSauce(sauce: string) {
    this.toggleItem(sauce, this.selectedSauces);
  }

  toggleExtra(extra: string) {
    this.toggleItem(extra, this.selectedExtras);
  }

  toggleDressing(dressing: string) {
    this.toggleItem(dressing, this.selectedDressings);
  }

  toggleDrink(drink: string) {
    this.toggleItem(drink, this.selectedDrink)
  }

  toggleItem(item: string, list: string[]) {
    const index = list.indexOf(item);
    if (index === -1) {
      list.push(item);
    } else {
      list.splice(index, 1);
    }
  }

  // Agregar el pedido a la lista
  addToOrder(orderType: string) {
    let orderSummary = '';

    if (orderType === 'sandwich') {
      orderSummary = `Sándwich de ${this.selectedBread}`;
      if (this.selectedMeat) orderSummary += ` con ${this.selectedMeat}`;
      if (this.selectedCheese) orderSummary += `, Queso ${this.selectedCheese}`;
      if (this.selectedVegetables.length > 0) orderSummary += `, Verduras: ${this.selectedVegetables.join(', ')}`;
      if (this.selectedSauces.length > 0) orderSummary += `, Aderezos: ${this.selectedSauces.join(', ')}`;
      if (this.selectedExtras.length > 0) orderSummary += `, Extras: ${this.selectedExtras.join(', ')}`;
      if (this.selectedDrink.length > 0) orderSummary += `, Bebida: ${this.selectedDrink.join(', ')}`;

    } else if (orderType === 'ensalada') {
      orderSummary = `Ensalada de ${this.selectedBase}`;
      if (this.selectedSaladIngredients.length > 0) orderSummary += ` con ingredientes: ${this.selectedSaladIngredients.join(', ')}`;
      if (this.selectedDressings.length > 0) orderSummary += `, Aderezos: ${this.selectedDressings.join(', ')}`;
      if (this.selectedDrink.length > 0) orderSummary += `, Bebida: ${this.selectedDrink.join(', ')}`;
    }


    this.orders.push(orderSummary);
    this.resetSelections();
  }

  // Eliminar un pedido
  removeOrder(order: string) {
    const index = this.orders.indexOf(order);
    if (index > -1) {
      this.orders.splice(index, 1);
    }
  }

  // Resetear las selecciones después de agregar al pedido
  resetSelections() {
    this.selectedBread = '';
    this.selectedMeat = '';
    this.selectedCheese = '';
    this.selectedBase = '';
    this.selectedVegetables = [];
    this.selectedSaladIngredients = [];
    this.selectedSauces = [];
    this.selectedExtras = [];
    this.selectedDressings = [];
    this.selectedDrink = [];
    this.selectedOrderType = ''; // Resetear tipo de pedido
    //this.shippingAddress = ''; // Limpiar dirección de envío
  }

  updateOrderType(value: boolean) {
    this.isPickup = value;
  }

  // Enviar el pedido por WhatsApp
  sendOrderViaWhatsApp() {
    if (!this.isPickup && !this.shippingAddress) {
      this.openModal();
    } else {
      const dirección = this.isPickup ? ' *PARA RETIRAR*' : ` *ENVÍO A DOMICILIO ${this.shippingAddress.toUpperCase()}*`;
      const message = encodeURIComponent(`¡Hola! Soy ${this.customerName} y quiero hacer el siguiente pedido ${dirección}: \n\n${this.orders.join('\n\n')}`);
      const phoneNumber = '5493442507430'; // Cambia por el número de WhatsApp del local
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  // Cierra el modal
  closeModal() {
    this.isModalOpen = false;
  }
}
