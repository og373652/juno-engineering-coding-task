////////////////////////////////////////////// Helper code, do not edit /////////////////////////////////////////
import { allIds, fetchOrderById } from "../api";

////////////////////////////////// Your code tasks is below //////////////////////////////////////////////////////
const DAYS_RANGE = 14;
const MS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

const safeAddToMap = (map, key, value) => {
    if (!map[key]) {
        map[key] = [];
    } 
    map[key].push(value);
}
const getAmountOfDaysFromNowToDate = (date) => {
    const today = new Date();
    const dateToCheck = new Date(date);
    const timeDiffInMs = today - dateToCheck;
    const daysDiff = timeDiffInMs / MS_IN_SECOND / SECONDS_IN_MINUTE / MINUTES_IN_HOUR / HOURS_IN_DAY;
    const roundedDaysDiff = Math.ceil(daysDiff);
    return roundedDaysDiff;
}

export const fetchAllOrders = async() => {
    const ids = allIds;
    const allOrdersData = await Promise.all(ids.map((id) => fetchOrderById(id)));
    return allOrdersData;
};

export const bucketOrdersByUsers = async() => {
    //   2. TODO: using the function from section 1 you should now bucket the orders by user.
    // each key in the object (ordersByUsers) represents a userId and each value is an array of the orders of that user.
    let ordersByUsers = {};
    const allOrders = await fetchAllOrders();
    allOrders.forEach((order) => {
        const { userId }  = order;
        safeAddToMap(ordersByUsers, userId, order);
    });
    return ordersByUsers;
};

export const getLast2WeeksOrders = async() => {
    const allOrders = await fetchAllOrders();
    const ordersFromLastTwoWeeks = allOrders.filter((order) => {
        const { timestamp } = order;
        const daysDiff = getAmountOfDaysFromNowToDate(timestamp);
        return daysDiff <= DAYS_RANGE;
    });
    return ordersFromLastTwoWeeks;
};

export const bucketOrdersByDate = async() => {
    let ordersByDate = {};
    //   4. TODO: using the function from section 3 bucket the orders by date.
    // each key in the object (ordersByDate) represents a day and each value is an array of the orders in that date.
    const lastTwoWeeksOrders = await getLast2WeeksOrders();
    lastTwoWeeksOrders.forEach((order) => {
        const { timestamp } = order;
        const daysFromNow = getAmountOfDaysFromNowToDate(timestamp);
        safeAddToMap(ordersByDate, daysFromNow, order);
    });
    return ordersByDate;
};

fetchAllOrders();
// .then(console.log);

bucketOrdersByUsers();
// .then(console.log);

getLast2WeeksOrders();
// .then(console.log);

bucketOrdersByDate();

// .then(console.log);

////////////////////////////////////////
