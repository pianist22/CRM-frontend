
'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Package, User, Calendar, DollarSign, ShoppingBag, Clock } from 'lucide-react';
import { orderService } from '@/services/api';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await orderService.getAllOrders();
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return 'Invalid date';
    }
  };

  const getOrderStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate some summary stats
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.amount || 0), 0);

  const getLatestOrderDate = () => {
  if (!orders.length) return 'N/A';

  const latestOrder = orders.reduce((latest, order) => {
    const currentOrderDate = new Date(order.orderDate);
    const latestDate = new Date(latest.orderDate);
    return currentOrderDate > latestDate ? order : latest;
  });

  return formatDate(latestOrder.orderDate);
  };


  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Management</h1>
        <p className="text-gray-500">Track and manage all customer orders</p>
      </div>

      {!loading && orders.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 font-medium">Total Orders</p>
                  <h3 className="text-2xl font-bold text-gray-800">{totalOrders}</h3>
                </div>
                <div className="bg-blue-200 p-3 rounded-full">
                  <ShoppingBag className="h-6 w-6 text-blue-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 font-medium">Total Revenue</p>
                  <h3 className="text-2xl font-bold text-gray-800">₹{totalRevenue.toLocaleString()}</h3>
                </div>
                <div className="bg-green-200 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-green-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 font-medium">Latest Order</p>
                  <h3 className="text-lg font-bold text-gray-800 truncate">
                    {getLatestOrderDate()}
                  </h3>
                </div>
                <div className="bg-purple-200 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-purple-700" />
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
          <p className="text-gray-500 font-medium">Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No orders found</h3>
          <p className="text-gray-500">When customers place orders, they'll appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <Card key={order._id} className="overflow-hidden border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2" />
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Order ID</p>
                    <h2 className="text-lg font-semibold text-gray-800">{order._id.substring(0, 8)}</h2>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}>
                    {order.status || 'Processing'}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-indigo-500 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Customer</p>
                      <p className="text-gray-800 font-medium">{order.customerId?.name || 'Unknown'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Amount</p>
                      <p className="text-gray-800 font-medium">₹{order.amount?.toLocaleString() || '0'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Order Date</p>
                      <p className="text-gray-800">{formatDate(order.orderDate)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
                    View Details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewOrders;
