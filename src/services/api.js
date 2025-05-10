import axios from "axios";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

const NEXT_API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000/api/v1";

const api = axios.create({
  baseURL: NEXT_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.user) {
      config.headers.Authorization = `Bearer ${session.user.id}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const campaignService = {
  getAllCampaigns: async () => {
    const session = await getSession();
    const userId = session?.user?.id;
    const response = await api.get("campaigns/campaigns",{
      params:{userId},
    });
    return response.data;
  },
  createCampaign: async (campaignData) => {
    const response = await api.post("campaigns/create-campaign", campaignData);
    return response.data;
  },
  getAudienceSize: async (rules) => {
    const response = await api.post("campaigns/audience-size", { rules });
    return response.data;
  },
};

export const customerService = {

  getAllCustomers: async () => {
    const session = await getSession();
    const userId = session?.user?.id;
    const response = await api.get("customers/view-customers",{
      params:{userId},
    });
    return response;
  },
  addCustomer: async (customerData) => {
    const response = await api.post("customers/add-customers", customerData);
    return response;
  },
};

export const orderService = {
  getAllOrders: async () => {
    const session = await getSession();
    const userId = session?.user?.id;
    const response = await api.get("orders/view-orders",{
      params:{userId},
    });
    return response;
  },
  addOrder: async (orderData) => {
    const response = await api.post("orders/add-orders", orderData);
    return response;
  },
};

export default api;