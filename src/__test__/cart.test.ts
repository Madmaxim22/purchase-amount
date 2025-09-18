import Cart from '../Cart';
import Buyable from '../Buyable';

describe('Cart', () => {
  let cart: Cart;
  const item1: Buyable = { id: 1, name: 'Item 1', price: 100 };
  const item2: Buyable = { id: 2, name: 'Item 2', price: 200 };
  const item3: Buyable = { id: 3, name: 'Item 3', price: 300 };

  beforeEach(() => {
    cart = new Cart();
    cart.add(item1);
    cart.add(item2);
    cart.add(item3);
  });

  test('calculate total price without discount', () => {
    expect(cart.getTotalPrice()).toBe(600);
  });

  test('calculate total price with discount', () => {
    expect(cart.getTotalPriceWithDiscount(0.1)).toBeCloseTo(540); // 10% скидка
  });

  test('remove item by id', () => {
    cart.removeById(2);
    const remainingItems = cart.getAll();
    expect(remainingItems.length).toBe(2);
    expect(remainingItems.some(item => item.id === 2)).toBe(false);
  });

  test('getAll returns a copy of items', () => {
    const items = cart.getAll();
    items.push({ id: 999, name: 'Fake', price: 999 });
    expect(cart.getAll().length).toBe(3); // оригинальный массив не изменился
  });
});