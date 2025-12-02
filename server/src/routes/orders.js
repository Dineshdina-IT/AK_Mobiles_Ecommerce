const express = require('express');
const { getOrders, getUserOrders, getOrder, createOrder, updateOrder, deleteOrder } = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, authorize('admin'), getOrders);
router.get('/user/my-orders', protect, getUserOrders);
router.get('/:id', protect, getOrder);
router.post('/', protect, createOrder);
router.put('/:id', protect, authorize('admin'), updateOrder);
router.delete('/:id', protect, authorize('admin'), deleteOrder);

module.exports = router;
