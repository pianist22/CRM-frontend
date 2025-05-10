
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { customerService } from '@/services/api';
import { getSession } from 'next-auth/react';
import { CheckCircle, UserPlus, Mail, Phone, Calendar, DollarSign, UserCheck } from 'lucide-react';

export default function AddCustomer() {
  const [userId, setUserId] = useState(null);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', totalSpend: '', visitCount: '', lastActiveDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (session?.user) {
        setUserId(session.user.id);
        console.log("User ID:", session.user.id);
      }
    };
    fetchSession();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      console.log(userId);
      const payload = {
        ...form,
        totalSpend: Number(form.totalSpend),
        visitCount: Number(form.visitCount),
        userId,
      };
      await customerService.addCustomer(payload);
      setMessage('Customer added successfully!');
      setShowSuccess(true);
      setForm({ name: '', email: '', phone: '', totalSpend: '', visitCount: '', lastActiveDate: '' });
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (err) {
      setMessage('Error adding customer');
    } finally {
      setLoading(false);
    }
  };

  // Field configuration with icons and labels
  const fields = [
    { name: 'name', label: 'Customer Name', type: 'text', icon: <UserPlus className="w-4 h-4 text-gray-500" /> },
    { name: 'email', label: 'Email Address', type: 'email', icon: <Mail className="w-4 h-4 text-gray-500" /> },
    { name: 'phone', label: 'Phone Number', type: 'text', icon: <Phone className="w-4 h-4 text-gray-500" /> },
    { name: 'totalSpend', label: 'Total Spend ($)', type: 'number', icon: <DollarSign className="w-4 h-4 text-gray-500" /> },
    { name: 'visitCount', label: 'Visit Count', type: 'number', icon: <UserCheck className="w-4 h-4 text-gray-500" /> },
    { name: 'lastActiveDate', label: 'Last Active Date', type: 'datetime-local', icon: <Calendar className="w-4 h-4 text-gray-500" /> }
  ];

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fieldVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-none shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
              <UserPlus className="mr-2 h-6 w-6 text-blue-600" />
              Add New Customer
            </CardTitle>
            <CardDescription className="text-gray-600">
              Enter customer information to add them to your CRM
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <motion.div
              variants={formVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-6"
            >
              {fields.map((field) => (
                <motion.div key={field.name} variants={fieldVariants} className="space-y-2">
                  <Label 
                    htmlFor={field.name}
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    {field.icon}
                    {field.label}
                  </Label>
                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      value={form[field.name]}
                      onChange={handleChange}
                      className="pl-3 py-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm transition-all duration-200"
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  </div>
                </motion.div>
              ))}

              <motion.div 
                variants={fieldVariants}
                className="pt-4"
              >
                <Button 
                  onClick={handleSubmit} 
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5" />
                      Add Customer
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.div>

            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2 p-3 rounded-md bg-green-50 text-green-700 border border-green-200 mt-4"
              >
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium">{message}</span>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}