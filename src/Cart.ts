import Buyable from './Buyable';

export default class Cart {
  private items: Buyable[] = [];

  add(item: Buyable, allowMultiple: boolean = true): void {
    const existingItem = this.items.find(i => i.id === item.id);

    if (existingItem) {
      // Если товар уже есть
      if (allowMultiple) {
        // Увеличиваем количество
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        // Для товаров, которые в корзине только один раз — ничего не делаем или можно обновить
        // (по сути, оставляем как есть)
      }
    } else {
      // Товар отсутствует, добавляем его
      this.items.push({ ...item, quantity: 1 });
    }
  }

  getAll(): Buyable[] {
    return [...this.items];
  }

  // Расчет общей стоимости без учета скидки (учитывает количество)
  getTotalPrice(): number {
    return this.items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  }

  // Расчет стоимости с учетом скидки
  getTotalPriceWithDiscount(discount: number): number {
    const total = this.getTotalPrice();
    return total * (1 - discount);
  }

  // Удаляет товар по id
  removeById(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
  }

   // Уменьшение количества товара
  decreaseQuantity(id: number): void {
    const item = this.items.find(i => i.id === id);
    if (item && item.quantity && item.quantity > 1) {
      item.quantity -= 1;
    } else {
      // Если quantity равно 1 или не определено — удаляем товар полностью
      this.removeById(id);
    }
  }
}