const Order = require('../models/order.js');
const User = require('../models/user.js');
class OrderController {

    static async createOrder(req, res, next) {
        try {
            // push userId to users array
            // create order

            const order = await new Order({
                title: req.body.title,
                price: req.body.price,
                ownerId: req.body.ownerId,
            })
            const savedOrder = await order.save();
            // push order id to user
            const user = await User.findByIdAndUpdate
                (req.body.ownerId, { $push: { orders: savedOrder._id } }, { new: true });
            return res.status(201).json({
                message: "Order created successfully",
                order: savedOrder,
                result:true
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateOrderPreviewStatus(req, res, next) {
        try {
            const { orderId, userId } = req.params;
            const status = req.body.status;

            const order = await Order.findById(orderId);
            if (!order) {
                return res.status(404).json({
                    message: "Order not found",
                    result: false
                });
            }
            const updatedOrder = await Order.findByIdAndUpdate(orderId, { status: status }, { new: true });
            if (updatedOrder.status === "reviewed") {
                // find user with id and update order status
                const user = await User.findByIdAndUpdate(userId, { $push: { orders: { id: orderId, status: "reviewed" } } }, { new: true });
            }
            if (updatedOrder.status === "rejected") {
                // find user with id and update order status
                const user = await User.findByIdAndUpdate(userId, { $push: { orders: { id: orderId, status: "rejected" } } }, { new: true });
                // find user with id and update order status
            }
            return res.status(200).json({
                message: "Order updated successfully",
                order: updatedOrder,
                result: true
            });
        }
        catch (error) {
            next(error);
        }
    }

    static async updateOrderStatus(req, res, next) {
        try {
            const { orderId, userId } = req.params;
            const status = req.body.status;

            const order = await Order.findById(orderId);
            if (!order) {
                return res.status(404).json({
                    message: "Order not found",
                    result: false
                });
            }
            const user = await User.findById(userId);
            let updatedOrder;
            if (user.roles.includes("sales")) {
                updatedOrder = await Order.findByIdAndUpdate(orderId, { status: status, salesId: userId }, { new: true });

            }
            else if (user.roles.includes("reviewer")) {
                updatedOrder = await Order.findByIdAndUpdate(orderId, { status: status, reviewerId: userId }, { new: true });
            }
            if (updatedOrder) {
                return res.status(200).json({
                    message: "Order updated successfully",
                    order: updatedOrder,
                });
            }
            else {
                return res.status(401).json({
                    message: "order not updated",
                    result: false
                });
            }

        }
        catch (error) {
            next(error);
        }
    }


    // static async getOrders(req, res, next) {
    //     try {
    //         // get orders based on status
    //         const orders = await Order.find({ status: req.params.status });
    //         return res.status(200).json({
    //             message: "Orders fetched successfully",
    //             orders: orders,
    //             result: true
    //         });
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    static async getOrderbyStatus(req, res, next) {
        try {
            const orders = await Order.find({ status: req.body.status });
            return res.status(200).json({
                message: "Orders fetched successfully",
                orders: orders,
                result: true
            });
        } catch (error) {
            next(error);
        }
    }
    static async getCustomerOrders(req, res, next) {

        try {
            const userId = req.params.userId;
            const orders = await Order.find({ ownerId: userId });
            // create dictionary of orders based on status
            const ordersDictionary = orders.reduce((acc, order) => {
                if (acc[order.status]) {
                    acc[order.status].push(order);
                } else {
                    acc[order.status] = [order];
                }
                return acc;
            }, {});

            return res.status(200).json({
                message: "Orders fetched successfully",
                orders: ordersDictionary,
                result: true
            });
        } catch (error) {

        }
    }

    static async getAdminOrders(req, res, next) {
        try {
            const userId = req.params.userId;
            const ordersdata = await User.findById(userId).populate("orders");
            // create dictionary of orders based on status
            const ordersDictionary = ordersdata.orders.reduce((acc, order) => {
                if (acc[order.status]) {
                    acc[order.status].push(order);
                } else {
                    acc[order.status] = [order];
                }
                return acc;
            }, {});

            return res.status(200).json({
                message: "Orders fetched successfully",
                orders: ordersDictionary,
                result: true
            });
        } catch (error) {
            next(error);
        }

    }

    static async moveOrderToReviewer(req, res, next) {
        try {
            const { orderId, userId } = req.params;
            const status = req.body.status;
            const order = await Order.findByIdAndUpdate(orderId, {
                reviewerId: userId
            }, { new: true });
            // find user with id and update order status
            const user = await User.findByIdAndUpdate
                (userId, { order: { id: orderId, status: "under review" } }, { new: true });
            return res.status(200).json({
                message: "Order moved to reviewer successfully",
                order: order,
                result: true
            });
        } catch (error) {
            next(error);
        }

    }

    static async moveOrderToSales(req, res, next) {
        try {
            const { orderId, userId } = req.params;
            const status = req.body.status;
            const order = await Order.findByIdAndUpdate

                (orderId, {
                    salesId: userId
                }, { new: true });
            // find user with id and update order status
            const user = await User.findByIdAndUpdate(userId, { order: { id: orderId, status: "under review" } }, { new: true });
            return res.status(200).json({
                message: "Order moved to sales successfully",
                order: order,
                result: true
            });
        } catch (error) {
            next(error);
        }

    }
}

module.exports = OrderController;