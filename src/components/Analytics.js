import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, ArrowUpRight, Users, Link as LinkIcon, LayoutDashboard, User2, Settings } from 'lucide-react';
import { getUserAnalytics, getLinkAnalytics } from '../services/api';
import Swal from 'sweetalert2';
import { Link as RouterLink } from 'react-router-dom';

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({
    totalViews: 0,
    totalClicks: 0,
    linkStats: []
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const userStats = await getUserAnalytics();
      const linkStats = await getLinkAnalytics();
      setAnalytics({
        totalViews: userStats.data.totalViews,
        totalClicks: userStats.data.totalClicks,
        linkStats: linkStats.data.map(link => ({
          ...link,
          ctr: userStats.data.totalViews ? ((link.click_count / userStats.data.totalViews) * 100).toFixed(1) : 0
        }))
      });
      setLoading(false);
    } catch (error) {
      Swal.fire('Error', 'Failed to load analytics data', 'error');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent4"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white/90 backdrop-blur-sm shadow-xl">
        <div className="p-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-accent1 to-accent4 bg-clip-text text-transparent">
            Dashboard
          </h2>
        </div>
        <nav className="mt-4">
          <RouterLink to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
            <LayoutDashboard className="inline-block w-5 h-5 mr-2" />
            Dashboard
          </RouterLink>
          <RouterLink to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
            <User2 className="inline-block w-5 h-5 mr-2" />
            Profile
          </RouterLink>
          <RouterLink to="/analytics" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
            <BarChart3 className="inline-block w-5 h-5 mr-2" />
            Analytics
          </RouterLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800">Analytics</h1>
            <div className="flex items-center space-x-4">
              <select className="px-4 py-2 border border-gray-200 rounded-lg">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 3 months</option>
                <option>All time</option>
              </select>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          <div className="max-w-6xl mx-auto">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Views</p>
                    <h3 className="text-2xl font-bold mt-1">{analytics.totalViews}</h3>
                  </div>
                  <div className="p-3 bg-accent1/10 rounded-full">
                    <Users className="w-6 h-6 text-accent1" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-accent1 to-accent4 bg-clip-text text-transparent">
                    {analytics.totalViews}
                  </h3>
                  </div>
                  <div className="p-3 bg-accent2/10 rounded-full">
                    <LinkIcon className="w-6 h-6 text-accent2" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Click Rate</p>
                    <h3 className="text-2xl font-bold mt-1">
                      {analytics.totalViews ? ((analytics.totalClicks / analytics.totalViews) * 100).toFixed(1) : 0}%
                    </h3>
                  </div>
                  <div className="p-3 bg-accent3/10 rounded-full">
                    <ArrowUpRight className="w-6 h-6 text-accent3" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Links Performance */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Links Performance</h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {analytics.linkStats.map((link, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-gray-100 rounded">
                          <LinkIcon className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{link.title}</h4>
                          <p className="text-sm text-gray-600">{link.url}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-8">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Clicks</p>
                          <p className="font-medium">{link.click_count}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">CTR</p>
                          <p className="font-medium">{link.ctr}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;