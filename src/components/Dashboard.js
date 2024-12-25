import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getUserLinks, createLink, updateLink, deleteLink } from '../services/api';
import Swal from 'sweetalert2';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { LayoutDashboard, User2, BarChart3,Link } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user && user.id) {
      fetchLinks(user.id);
    }
  }, [user]);

  // Fetch all links
  const fetchLinks = async (userId) => {
    setIsLoading(true);
    try {
      const response = await getUserLinks(userId);
      setLinks(response.data);
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch links. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Add new link
  const handleAddLink = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Add New Link',
      html: `
        <input id="swal-title" class="swal2-input" placeholder="Title">
        <input id="swal-url" class="swal2-input" placeholder="URL">
      `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const title = document.getElementById('swal-title').value.trim();
        const url = document.getElementById('swal-url').value.trim();
        if (!title || !url) {
          Swal.showValidationMessage('Both fields are required.');
        }
        return { title, url };
      },
    });

    if (formValues) {
      try {
        await createLink(formValues);
        await fetchLinks(user.id); // Ensure user.id is passed here
        Swal.fire('Success', 'Link added successfully!', 'success');
      } catch (error) {
        Swal.fire('Error', 'Failed to add link. Please try again.', 'error');
      }
    }
  };

  // Edit existing link
  const handleEditLink = async (link) => {
    const { value: formValues } = await Swal.fire({
      title: 'Edit Link',
      html: `
        <input id="swal-title" class="swal2-input" value="${link.title}" placeholder="Title">
        <input id="swal-url" class="swal2-input" value="${link.url}" placeholder="URL">
      `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const title = document.getElementById('swal-title').value.trim();
        const url = document.getElementById('swal-url').value.trim();
        if (!title || !url) {
          Swal.showValidationMessage('Both fields are required.');
        }
        return { title, url };
      },
    });

    if (formValues) {
      try {
        await updateLink(link.id, formValues);
        await fetchLinks(user.id); // Ensure user.id is passed here
        Swal.fire('Success', 'Link updated successfully!', 'success');
      } catch (error) {
        console.error('Failed to update link:', error);
        Swal.fire('Error', 'Failed to update link. Please try again.', 'error');
      }
    }
  };

  // Delete link
  const handleDeleteLink = async (linkId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await deleteLink(linkId);
        await fetchLinks(user.id); // Ensure user.id is passed here
        Swal.fire('Deleted!', 'Link has been deleted.', 'success');
      } catch (error) {
        Swal.fire('Error', 'Failed to delete link. Please try again.', 'error');
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
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
          <RouterLink to="/:biolink" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
            <Link className="inline-block w-5 h-5 mr-2" />
            Biolink
          </RouterLink> 
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-700">Dashboard</h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddLink}
              className="bg-purple-500 text-white px-5 py-2 rounded-lg flex items-center shadow-md hover:bg-purple-600"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Add Link
            </motion.button>
          </div>

          {/* Links List */}
          {isLoading ? (
            <div className="text-center py-8 text-lg text-gray-500">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {links.map((link) => (
                <motion.div
                  key={link.id} // Ensure unique key prop
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{link.title}</h3>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-500 hover:underline mt-2 block break-words"
                    >
                      {link.url}
                    </a>
                  </div>
                  <div className="flex justify-end mt-4 space-x-2">
                    <motion.button
                      className="p-3 rounded-full bg-accent1/10 hover:bg-accent1/20 text-accent1"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEditLink(link)}
                     
                    >
                      <PencilIcon className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteLink(link.id)}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded text-red-500"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;