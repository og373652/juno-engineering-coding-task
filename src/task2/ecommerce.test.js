import { fetchOrderById } from "../api";
import { bucketOrdersByDate, bucketOrdersByUsers, fetchAllOrders, getLast2WeeksOrders } from "./ecommerce";

const ORDER_ID = "70ef599e5eca171b2bce84d1"
const EXPECTED_AMOUNT_OF_ORDERS = 100;
const EXPECTED_PROPERTIES = [
    {key: "id", type: 'string' },
    {key: "userId", type: 'string' },
    {key: "timestamp", type: 'number' },
    {key: "title", type: 'string' },
];
const validateOrderObject = (order) => {
    EXPECTED_PROPERTIES.forEach((property) => {
        const { key, type } = property;
        expect(order).toHaveProperty(key);
        expect(typeof order[key]).toBe(type);
    });
};
const validateOrders = (orders) => {
    const ordersArray = Array.isArray(orders) ? orders : Object.values(orders);
    //if the order is actually an array we want to validate each order in the array recursively
    ordersArray.forEach((order) => Array.isArray(order) ? validateOrders(order) : validateOrderObject(order));
};
const validateOrdersBucketKeys = (ordersBucket, keyType) => {
    const keys = Object.keys(ordersBucket);
    keys.forEach((key) => expect(typeof key).toBe(keyType));
};
test("Ecommerce - fetchOrderById", async () => {
    let orders = await fetchOrderById(ORDER_ID);
    expect(orders).toBeTruthy();
});
test('Can fetch all orders', async () => {
    const allOrders = await fetchAllOrders();
    validateOrders(allOrders);
    expect(allOrders.length).toBe(EXPECTED_AMOUNT_OF_ORDERS);
})
test('Can get user order bucket, mapped by userId', async () => {
    const userToOrderMap = await bucketOrdersByUsers();
    validateOrdersBucketKeys(userToOrderMap, 'string');
    expect(userToOrderMap).toBeTruthy();
});
test('Can get orders from last 2 weeks', async () => {
    const relevantOrders = await getLast2WeeksOrders();
    validateOrders(relevantOrders);
})
test('Can get orders bucket by day', async() => {
    const orderByDateBucket = await bucketOrdersByDate();
    validateOrders(orderByDateBucket);
    validateOrdersBucketKeys(orderByDateBucket, 'string');
})