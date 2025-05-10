
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { campaignService } from '@/services/api'; // Assuming this service exists
import Link from 'next/link';
import { 
  ChevronRight, 
  PlusCircle, 
  Users, 
  Mail, 
  AlertCircle, 
  Loader2,
  Clock
} from 'lucide-react'; // Make sure lucide-react is installed

// Helper function for consistent button styling
const StyledButton = ({ href, children, className = '', ...props }) => {
  const baseClasses = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors";
  const combinedClasses = `${baseClasses} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};


export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [deliveryLogs,setDeliveryLogs] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setIsLoading(true);
        const data = await campaignService.getAllCampaigns();
        console.log("Fetched campaigns data:", data); // Log the data to inspect IDs

        // Ensure data is an array before setting state
        if (Array.isArray(data)) {
          setCampaigns(data);
        } else {
          console.error("Fetched data is not an array:", data);
          setCampaigns([]); // Fallback to empty array if data is not as expected
          setError("Failed to load campaigns: Invalid data format received.");
        }
      } catch (err) {
        console.error("Failed to fetch campaigns:", err);
        setError("Failed to load campaigns. Please try again later.");
        
        if (process.env.NODE_ENV === 'development') {
          console.log("Falling back to mock data for campaigns.");
          const mockData = [
            {
              id: '1',
              name: 'Win-back inactive customers',
              description: 'Target customers who haven\'t made a purchase in 90 days',
              createdAt: '2025-05-01T10:30:00Z',
              audienceSize: 532,
              sent: 489,
              failed: 43
            },
            {
              id: '2',
              name: 'New product launch',
              description: 'Announce our latest product to all customers',
              createdAt: '2025-04-28T14:15:00Z',
              audienceSize: 1245,
              sent: 1200,
              failed: 45
            },
            {
              id: '3',
              name: 'Seasonal promotion',
              description: 'Summer sale for high-value customers',
              createdAt: '2025-04-25T09:00:00Z',
              audienceSize: 876,
              sent: 850,
              failed: 26
            }
          ];
          setCampaigns(mockData);
          setError(null); // Clear error if falling back to mock data successfully
        } else {
          setCampaigns([]); 
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-gray-600">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
        <p className="text-lg">Loading campaigns...</p>
      </div>
    );
  }

  if (error && campaigns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <p className="text-xl font-semibold text-red-600 mb-2">Something went wrong</p>
        <p className="text-gray-600 max-w-md">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Campaigns</h1>
        <StyledButton href="/home">
          <PlusCircle className="mr-2 h-5 w-5" />
          Create Campaign
        </StyledButton>
      </div>

      {campaigns.length === 0 && !error ? ( // Added !error to ensure this doesn't show if there was a load error
        <div className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <Mail className="h-16 w-16 text-gray-400 mb-6" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-3">No campaigns yet</h3>
            <p className="text-gray-500 max-w-sm mb-6">
              It looks like you haven't created any campaigns. Get started by creating your first one!
            </p>
            <StyledButton href="/campaigns/create">
              <PlusCircle className="mr-2 h-5 w-5" />
              Create First Campaign
            </StyledButton>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign, index) => {
            // --- Start of added diagnostic and robust key logic ---
            let key = campaign?.id; // Use optional chaining in case campaign itself is null/undefined

            if (key === undefined || key === null || typeof key === 'object') {
              console.warn(
                `Campaign at index ${index} has a problematic ID: ${key}. Using index as fallback key. Campaign data:`,
                campaign
              );
              key = `campaign-fallback-${index}`;
            }
            // --- End of added diagnostic and robust key logic ---

            // It's also good to check if campaign object itself is valid
            if (!campaign || typeof campaign !== 'object') {
                console.warn(`Invalid campaign data at index ${index}:`, campaign);
                return null; // Skip rendering this item
            }

            // Determine if this is the first campaign to highlight
            const isFirstCampaign = index === 0;

            return (
              <motion.div
                key={key} // Use the determined key
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="h-full"
              >
                <Link href={`/campaigns/${campaign.id}`} className="block h-full group">
                  <div 
                    className={`h-full flex flex-col rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border ${
                      isFirstCampaign 
                        ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300' 
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    {isFirstCampaign && (
                      <div className="bg-blue-600 text-white px-4 py-1.5 flex items-center justify-center text-sm font-medium">
                        <Clock className="h-4 w-4 mr-1.5" />
                        Most Recent Campaign
                      </div>
                    )}
                    
                    <div className={`p-5 border-b ${isFirstCampaign ? 'border-blue-200' : 'border-gray-200'}`}>
                      <div className="flex justify-between items-start">
                        <h2 className={`text-lg font-semibold ${
                          isFirstCampaign 
                            ? 'text-blue-800 group-hover:text-blue-600' 
                            : 'text-gray-800 group-hover:text-blue-600'
                          } transition-colors`}
                        >
                          {campaign.name || 'Unnamed Campaign'}
                        </h2>
                        <ChevronRight className={`h-5 w-5 ${
                          isFirstCampaign 
                            ? 'text-blue-500 group-hover:text-blue-700' 
                            : 'text-gray-400 group-hover:text-blue-600'
                          } transition-colors`} 
                        />
                      </div>
                      <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                        {campaign.message || 'No description.'}
                      </p>
                    </div>
                    
                    <div className="p-5 flex-grow space-y-3">
                      <div className="flex items-center text-sm text-gray-700">
                        <Users className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                        <span>{campaign.audienceSize === undefined ? 'N/A' : campaign.audienceSize} recipients</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className={`px-2.5 py-1 text-xs font-medium ${
                          isFirstCampaign 
                            ? 'text-blue-700 bg-blue-100 border-blue-300'
                            : 'text-gray-700 bg-gray-100 border-gray-300'
                          } border rounded-full`}
                        >
                          Created: {formatDate(campaign.createdAt)}
                        </span>
                      </div>
                    </div>

                    <div className={`p-5 border-t ${
                      isFirstCampaign 
                        ? 'border-blue-200 bg-blue-50' 
                        : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-center w-full text-sm">
                        <div className="flex items-center text-green-600 font-medium">
                          <Mail className="h-4 w-4 mr-1.5" />
                          {campaign.deliveryStats.sent === undefined ? '0' : campaign.deliveryStats.sent} sent
                        </div>
                        <div className="flex items-center text-red-600 font-medium">
                          <AlertCircle className="h-4 w-4 mr-1.5" />
                          {campaign.deliveryStats.failed === undefined ? '0' : campaign.deliveryStats.failed} failed
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}