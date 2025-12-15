import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

const MyAddedTickets = () => {
  const queryClient = useQueryClient();
  const [editingTicket, setEditingTicket] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const { register, handleSubmit, reset, setValue } = useForm();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ['vendorTickets'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/vendor/tickets`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/vendor/tickets/${id}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success('Ticket updated successfully!');
      queryClient.invalidateQueries(['vendorTickets']);
      setShowEditModal(false);
      reset();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update ticket');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const token = localStorage.getItem('token');
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/vendor/tickets/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: () => {
      toast.success('Ticket deleted successfully!');
      queryClient.invalidateQueries(['vendorTickets']);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete ticket');
    },
  });

  const handleEdit = (ticket) => {
    setEditingTicket(ticket);
    setValue('ticketTitle', ticket.ticketTitle);
    setValue('fromLocation', ticket.fromLocation);
    setValue('toLocation', ticket.toLocation);
    setValue('transportType', ticket.transportType);
    setValue('price', ticket.price);
    setValue('ticketQuantity', ticket.ticketQuantity);
    setValue('departureDateTime', ticket.departureDateTime?.slice(0, 16));
    setValue('perks', ticket.perks?.join(', ') || '');
    setShowEditModal(true);
  };

  const handleDelete = async (id, status) => {
    if (status === 'rejected') {
      toast.error('Cannot delete rejected ticket');
      return;
    }

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3B82F6',
      cancelButtonColor: '#EF4444',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      deleteMutation.mutate(id);
    }
  };

  const onSubmit = (data) => {
    const updatedData = {
      ...data,
      price: parseFloat(data.price),
      ticketQuantity: parseInt(data.ticketQuantity),
      perks: data.perks ? data.perks.split(',').map(p => p.trim()) : [],
    };

    updateMutation.mutate({ id: editingTicket._id, data: updatedData });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return (
          <span className="flex items-center space-x-1 px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
            <FaCheckCircle />
            <span>Approved</span>
          </span>
        );
      case 'rejected':
        return (
          <span className="flex items-center space-x-1 px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full text-sm">
            <FaTimesCircle />
            <span>Rejected</span>
          </span>
        );
      default:
        return (
          <span className="flex items-center space-x-1 px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-sm">
            <FaClock />
            <span>Pending</span>
          </span>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>My Tickets - TicketBari</title>
      </Helmet>

      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        My Added Tickets
      </h1>

      {tickets.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            You haven't added any tickets yet
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={ticket.image}
                alt={ticket.ticketTitle}
                className="w-full h-48 object-cover"
              />

              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {ticket.ticketTitle}
                  </h3>
                  {getStatusBadge(ticket.verificationStatus)}
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {ticket.fromLocation} → {ticket.toLocation}
                </p>

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-2xl font-bold text-[#1FA0D6]">৳{ticket.price}</p>
                    <p className="text-sm text-gray-500">per ticket</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">{ticket.ticketQuantity}</p>
                    <p className="text-sm text-gray-500">available</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(ticket)}
                    disabled={ticket.verificationStatus === 'rejected'}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaEdit />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(ticket._id, ticket.verificationStatus)}
                    disabled={ticket.verificationStatus === 'rejected'}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaTrash />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Update Ticket
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                  Ticket Title
                </label>
                <input
                  {...register('ticketTitle')}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                    From Location
                  </label>
                  <input
                    {...register('fromLocation')}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                    To Location
                  </label>
                  <input
                    {...register('toLocation')}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                    Price
                  </label>
                  <input
                    type="number"
                    {...register('price')}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                    Quantity
                  </label>
                  <input
                    type="number"
                    {...register('ticketQuantity')}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                  Departure Date & Time
                </label>
                <input
                  type="datetime-local"
                  {...register('departureDateTime')}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    reset();
                  }}
                  className="flex-1 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="flex-1 px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
                >
                  {updateMutation.isPending ? 'Updating...' : 'Update Ticket'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAddedTickets;