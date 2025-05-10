import ProtectedRoute from "@/components/ProtectedRoute";
import CampaignList from "@/components/CampaignList";

export default function CampaignsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Campaign History</h1>
          <div className="bg-white rounded-lg shadow-md">
            <CampaignList />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}