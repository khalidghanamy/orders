
const express = require('express');
const router = express.Router();
const OrderController = require('../controller/orders.controller');

router.post('/createOrder', OrderController.createOrder);
router.post('/get-orders-by-status', OrderController.getOrderbyStatus);
router.put('/update-order-status/:userId/:orderId', OrderController.updateOrderStatus);



router.get('/get-customer-orders/:userId', OrderController.getCustomerOrders);
// router.get('/get-admin-orders/:userId', OrderController.getAdminOrders);
// router.ge/t('get-order/:orderId', OrderController.getOrder);
// updates/
// router.put('/update-order-sales-status/:userId/:orderId', OrderController.updateOrderSalesStatus);

// move order to reviewer
// router.put('/move-order-to-reviewer/:userId/:orderId', OrderController.moveOrderToReviewer);

// move order to sales
// router.put('move-order-to-sales/:userId/:orderId', OrderController.moveOrderToSales);

module.exports = router;