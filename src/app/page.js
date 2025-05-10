// 'use client';

// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { ArrowRight, BarChart3, Users, ShoppingCart, Filter, MailCheck } from "lucide-react";
// import Link from "next/link";
// import Navbar from "@/components/Navbar"; // Import the Navbar component

// export default function LandingPage() {
//   const { status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     // Only redirect if unauthenticated, keep on landing page if authenticated
//     if (status === "unauthenticated") {
//       router.push("/login");
//     }
//     // No redirection for authenticated users - they stay on the landing page
//   }, [status, router]);

//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Navbar */}
//       <Navbar />
      
//       {/* Hero Section */}
//       <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
//         <div className="container mx-auto px-4 py-16 md:py-24">
//           <div className="max-w-3xl mx-auto text-center">
//             <h1 className="text-4xl md:text-5xl font-bold mb-6">
//               Smart Customer Relationship Management
//             </h1>
//             <p className="text-xl md:text-2xl mb-8 text-blue-100">
//               Segment your audience, create targeted campaigns, and grow your business with our powerful CRM platform.
//             </p>
//             <div className="flex flex-wrap justify-center gap-4">
//               <Link href="/home" passHref>
//                 <button className="bg-white text-blue-700 hover:bg-blue-50 flex px-4 py-3 rounded-lg justify-center text-lg items-center">
//                   Get Started <ArrowRight className="ml-2 h-5 w-5" />
//                 </button>
//               </Link>
//               <Link href="#features" passHref>
//                 <button variant="outline" className="border border-white px-4.5 py-3 rounded-lg text-lg text-white hover:bg-blue-600">
//                   Learn More
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Features Section */}
//       <section id="features" className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12 text-black">Platform Features</h2>
          
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {/* Feature 1 */}
//             <div className="bg-white p-8 rounded-lg shadow-md transition-all hover:shadow-lg">
//               <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
//                 <Filter className="h-6 w-6 text-blue-600" />
//               </div>
//               <h3 className="text-xl font-semibold mb-3 text-black">Flexible Audience Segmentation</h3>
//               <p className="text-gray-600">
//                 Define audience segments using flexible rule logic with conditions like spending amount, visit frequency, or inactivity periods.
//               </p>
//             </div>
            
//             {/* Feature 2 */}
//             <div className="bg-white p-8 rounded-lg shadow-md transition-all hover:shadow-lg">
//               <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
//                 <BarChart3 className="h-6 w-6 text-blue-600" />
//               </div>
//               <h3 className="text-xl font-semibold mb-3 text-black">Dynamic Rule Builder</h3>
//               <p className="text-gray-600">
//                 Combine conditions using AND/OR logic with an intuitive interface. Preview audience size before saving your segment.
//               </p>
//             </div>
            
//             {/* Feature 3 */}
//             <div className="bg-white p-8 rounded-lg shadow-md transition-all hover:shadow-lg">
//               <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
//                 <MailCheck className="h-6 w-6 text-blue-600" />
//               </div>
//               <h3 className="text-xl font-semibold mb-3 text-black">Campaign Management</h3>
//               <p className="text-gray-600">
//                 Track your campaigns with detailed delivery statistics including sent, failed, and audience size metrics.
//               </p>
//             </div>
            
//             {/* Feature 4 */}
//             <div className="bg-white p-8 rounded-lg shadow-md transition-all hover:shadow-lg">
//               <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
//                 <Users className="h-6 w-6 text-blue-600" />
//               </div>
//               <h3 className="text-xl font-semibold mb-3 text-black">Customer Management</h3>
//               <p className="text-gray-600">
//                 Keep track of all your customers, add new ones, and access detailed customer information in one place.
//               </p>
//             </div>
            
//             {/* Feature 5 */}
//             <div className="bg-white p-8 rounded-lg shadow-md transition-all hover:shadow-lg">
//               <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
//                 <ShoppingCart className="h-6 w-6 text-blue-600" />
//               </div>
//               <h3 className="text-xl font-semibold mb-3 text-black">Order Tracking</h3>
//               <p className="text-gray-600">
//                 Monitor all orders, add new ones, and keep your sales data organized for better business insights.
//               </p>
//             </div>
            
//             {/* Feature 6 */}
//             <div className="bg-white p-8 rounded-lg shadow-md transition-all hover:shadow-lg">
//               <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
//                 <BarChart3 className="h-6 w-6 text-blue-600" />
//               </div>
//               <h3 className="text-xl font-semibold mb-3 text-black">Performance Analytics</h3>
//               <p className="text-gray-600">
//                 Gain insights into campaign performance, customer engagement, and overall business metrics.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 bg-blue-600 text-white">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold mb-6">Ready to grow your business?</h2>
//           <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
//             Start creating targeted campaigns and managing your customer relationships more effectively today.
//           </p>
//           <div className="flex justify-center">
//             <Link href="/home" passHref>
//               <button className="bg-white text-blue-700 hover:bg-blue-50 flex items-center justify-center px-6 py-3 rounded-md transition-colors">
//                 Get Started <ArrowRight className="ml-2 h-5 w-5" />
//               </button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-gray-300 py-8">
//         <div className="container mx-auto px-4">
//           <div className="text-center">
//             <p className="mb-4">CRM Platform © {new Date().getFullYear()}</p>
//             <div className="flex justify-center space-x-4">
//               <Link href="#" className="hover:text-white transition-colors">Terms</Link>
//               <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
//               <Link href="#" className="hover:text-white transition-colors">Contact</Link>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ArrowRight, BarChart3, Users, ShoppingCart, Filter, MailCheck } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar"; // Import the Navbar component

export default function LandingPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if unauthenticated, keep on landing page if authenticated
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Smart Customer Relationship Management
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Segment your audience, create targeted campaigns, and grow your business with our powerful CRM platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/home" passHref>
                <button className="bg-white text-blue-700 hover:bg-blue-50 flex px-4 py-3 rounded-lg justify-center text-lg items-center">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
              <Link href="#features" passHref>
                <button className="border border-white px-4.5 py-3 rounded-lg text-lg text-white hover:bg-blue-600">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">Platform Features</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Link href="/campaigns" passHref>
              <div className="cursor-pointer bg-white p-8 rounded-lg shadow-md transition-all hover:shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Filter className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-black">Flexible Audience Segmentation</h3>
                <p className="text-gray-600">
                  Define audience segments using flexible rule logic with conditions like spending amount, visit frequency, or inactivity periods.
                </p>
              </div>
            </Link>

            {/* Feature 2 */}
            <Link href="/home" passHref>
              <div className="cursor-pointer bg-white p-8 rounded-lg shadow-md transition-all hover:shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-black">Dynamic Rule Builder</h3>
                <p className="text-gray-600">
                  Combine conditions using AND/OR logic with an intuitive interface. Preview audience size before saving your segment.
                </p>
              </div>
            </Link>

            {/* Feature 3 */}
            <Link href="/home" passHref>
              <div className="cursor-pointer bg-white p-8 rounded-lg shadow-md transition-all hover:shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <MailCheck className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-black">Campaign Management</h3>
                <p className="text-gray-600">
                  Track your campaigns with detailed delivery statistics including sent, failed, and audience size metrics.
                </p>
              </div>
            </Link>

            {/* Feature 4 */}
            <Link href="/customers/view-customers" passHref>
              <div className="cursor-pointer bg-white p-8 rounded-lg shadow-md transition-all hover:shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-black">Customer Management</h3>
                <p className="text-gray-600">
                  Keep track of all your customers, add new ones, and access detailed customer information in one place.
                </p>
              </div>
            </Link>

            {/* Feature 5 */}
            <Link href="/orders/view-orders" passHref>
              <div className="cursor-pointer bg-white p-8 rounded-lg shadow-md transition-all hover:shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <ShoppingCart className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-black">Order Tracking</h3>
                <p className="text-gray-600">
                  Monitor all orders, add new ones, and keep your sales data organized for better business insights.
                </p>
              </div>
            </Link>

            {/* Feature 6 */}
            <Link href="/orders/view-orders" passHref>
              <div className="cursor-pointer bg-white p-8 rounded-lg shadow-md transition-all hover:shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-black">Performance Analytics</h3>
                <p className="text-gray-600">
                  Gain insights into campaign performance, customer engagement, and overall business metrics.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to grow your business?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Start creating targeted campaigns and managing your customer relationships more effectively today.
          </p>
          <div className="flex justify-center">
            <Link href="/home" passHref>
              <button className="bg-white text-blue-700 hover:bg-blue-50 flex items-center justify-center px-6 py-3 rounded-md transition-colors">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="mb-4">CRM Platform © {new Date().getFullYear()}</p>
            <div className="flex justify-center space-x-4">
              <Link href="#" className="hover:text-white transition-colors">Terms</Link>
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
