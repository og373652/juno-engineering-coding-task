import { fetchOrderById } from "../api";
import { bucketOrdersByDate, bucketOrdersByUsers, fetchAllOrders, getLast2WeeksOrders } from "./ecommerce";

const ORDER_ID = "70ef599e5eca171b2bce84d1"
const EXPECTED_AMOUNT_OF_ORDERS = 100;
test("Ecommerce - fetchOrderById", async () => {
    let orders = await fetchOrderById(ORDER_ID);
    expect(orders).toBeTruthy();
});
test('Can fetch all orders', async () => {
    const allOrders = await fetchAllOrders();
    expect(allOrders.length).toBe(EXPECTED_AMOUNT_OF_ORDERS);
})
test('Can get user order bucket, mapped by userId', async () => {
    const userToOrderMap = await bucketOrdersByUsers();
    expect(userToOrderMap).toBeTruthy();
});
test('Can get orders from last 2 weeks', async () => {
    const relevantOrders = await getLast2WeeksOrders();
    expect(relevantOrders).toBeTruthy();
})
test('Can get orders bucket by day', async() => {
    const orderByDayBucket = await bucketOrdersByDate();
    console.log(orderByDayBucket);
})