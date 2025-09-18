import Buyable from './Buyable';

export default class Cart {
  private items: Buyable[] = [];

  add(item: Buyable): void {
    this.items.push(item);
  }

  getAll(): Buyable[] {
    return [...this.items];
  }

  // 1. Считает суммарную стоимость без скидки
  getTotalPrice(): number {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }

  // 2. Считает суммарную стоимость с учётом скидки (параметр - скидка, например, 0.1 для 10%)
  getTotalPriceWithDiscount(discount: number): number {
    const total = this.getTotalPrice();
    return total * (1 - discount);
  }

  // 3. Удаляет товар по id
  removeById(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
  }
}