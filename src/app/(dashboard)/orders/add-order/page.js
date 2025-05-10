'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { customerService, orderService } from '@/services/api';
import { getSession } from 'next-auth/react';

const AddOrder = () => {
  const [form, setForm] = useState({
    customerId: '',
    amount: '',
    orderDate: '',
    userId: '',
  });
  const [customers, setCustomers] = useState([]);

  // ✅ Get session on mount
  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (session?.user?.id) {
        setForm((prev) => ({ ...prev, userId: session.user.id }));
      }
    };
    fetchSession();
  }, []);

  // ✅ Fetch customers
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await customerService.getAllCustomers();
        if (res.data.success) {
          const cleanCustomers = res.data.customers.map((c) => ({
            _id: c._id,
            name: c.name,
          }));
          setCustomers(cleanCustomers);
        }
      } catch (error) {
        toast.error('Failed to load customers');
      }
    };
    fetchCustomers();
  }, []);

  // ✅ Submit form
  const handleSubmit = async () => {
    if (!form.customerId || !form.amount || !form.orderDate) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      const payload = {
        ...form,
        amount: Number(form.amount),
      };
      await orderService.addOrder(payload);
      toast.success('Order added successfully!');
      setForm({
        customerId: '',
        amount: '',
        orderDate: '',
        userId: form.userId, // retain userId
      });
    } catch (err) {
      toast.error('Failed to add order!');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card className="shadow-xl border">
        <CardContent className="space-y-6 p-8">
          <h1 className="text-3xl font-bold text-center text-indigo-700">Add New Order</h1>

          <div>
            <Label>Select Customer</Label>
            <Select
              value={form.customerId}
              onValueChange={(value) => setForm({ ...form, customerId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a customer" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((customer) => (
                  <SelectItem key={customer._id} value={customer._id}>
                    {customer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Amount (₹)</Label>
            <Input
              name="amount"
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              placeholder="Enter amount"
            />
          </div>

          <div>
            <Label>Order Date</Label>
            <Input
              name="orderDate"
              type="datetime-local"
              value={form.orderDate}
              onChange={(e) => setForm({ ...form, orderDate: e.target.value })}
            />
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Add Order
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddOrder;
