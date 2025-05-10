'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Users, Mail, Phone, CreditCard, Calendar, ShoppingBag } from 'lucide-react';
import { customerService } from '@/services/api';

const ViewCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      const response = await customerService.getAllCustomers();
      setCustomers(response.data.customers || []);
    } catch (err) {
      console.error('Failed to fetch customers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
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

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Customer Directory</h1>
        <div className="bg-blue-100 rounded-full px-4 py-1 text-blue-800 font-medium flex items-center">
          <Users className="h-4 w-4 mr-2" />
          {loading ? '...' : `${customers.length} Customers`}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
          <p className="text-gray-500 font-medium">Loading customer data...</p>
        </div>
      ) : customers.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No customers found</h3>
          <p className="text-gray-500">Your customer list is currently empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customers.map((customer) => (
            <Card key={customer.id || customer._id || customer.email} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-gray-200">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2" />
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{customer.name}</h3>
                
                <div className="space-y-3 mt-4">
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-3 text-blue-500 flex-shrink-0" />
                    <span className="truncate">{customer.email}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-3 text-blue-500 flex-shrink-0" />
                    <span>{customer.phone}</span>
                  </div>
                  
                  <div className="pt-4 mt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center text-gray-700">
                        <CreditCard className="h-4 w-4 mr-2 text-green-500" />
                        <span className="font-medium">Total Spend</span>
                      </div>
                      <span className="font-bold text-green-600">₹{customer.totalSpend}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center text-gray-700">
                        <ShoppingBag className="h-4 w-4 mr-2 text-orange-500" />
                        <span className="font-medium">Visits</span>
                      </div>
                      <span className="font-bold text-gray-800">{customer.visitCount}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-700">
                        <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="font-medium">Last Active</span>
                      </div>
                      <span className="text-gray-800">{formatDate(customer.lastActiveDate)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewCustomers;
