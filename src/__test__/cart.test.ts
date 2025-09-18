import Cart from '../Cart';
import Buyable from '../Buyable';

describe('Cart with multiple quantities', () => {
  let cart: Cart;
  const item1: Buyable = { id: 1, name: 'Book', price: 10 }; // только один экземпляр
  const item2: Buyable = { id: 2, name: 'Smartphone', price: 500 }; // многоэкземплярный

  beforeEach(() => {
    cart = new Cart();
  });

  test('добавление одного и того же элемента несколько раз не увеличивает его количество', () => {
    cart.add(item1, false); // allowMultiple = false
    cart.add(item1, false);
    expect(cart.getAll().length).toBe(1);
  });

  test('добавление элемента с несколькими экземплярами увеличивает количество', () => {
    cart.add(item2);
    cart.add(item2);
    const items = cart.getAll();
    expect(items.length).toBe(1);
    expect(items[0].quantity).toBe(2);
  });

  test('уменьшение количества уменьшает счёт или удаляет элемент', () => {
    cart.add(item2);
    cart.add(item2);
    cart.decreaseQuantity(item2.id);
    expect(cart.getAll()[0].quantity).toBe(1);
    cart.decreaseQuantity(item2.id);
    expect(cart.getAll().length).toBe(0);
  });

  test('общая стоимость рассчитана верно с учётом количества', () => {
    cart.add(item1); // quantity 1
    cart.add(item2); // quantity 1
    cart.add(item2); // now quantity 2
    expect(cart.getTotalPrice()).toBe(10 + 500 * 2); // 1010
  });

  test('расчет стоимости с учетом скидки', () => {
  cart.add(item1); // quantity 1
  cart.add(item2); // quantity 1
  cart.add(item2); // quantity 2

  const totalWithoutDiscount = cart.getTotalPrice(); // ожидается 10 + 500*2 = 1010
  const discount = 0.2; // 20%

  const totalWithDiscount = cart.getTotalPriceWithDiscount(discount);
  const expectedTotal = totalWithoutDiscount * (1 - discount); // 1010 * 0.8 = 808

  expect(totalWithDiscount).toBeCloseTo(expectedTotal);
});
});