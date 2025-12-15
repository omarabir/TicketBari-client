import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../../Providers/AuthProvider";
import { FaUpload } from "react-icons/fa";

const AddTicket = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const addTicketMutation = useMutation({
    mutationFn: async (ticketData) => {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/vendor/tickets`,
        ticketData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Ticket added successfully! Waiting for admin approval.");
      queryClient.invalidateQueries(["vendorTickets"]);
      reset();
      setImageUrl("");
      navigate("/dashboard/vendor/my-tickets");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to add ticket");
    },
  });

  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );
      setImageUrl(response.data.data.display_url);
      toast.success("Image uploaded successfully!");
      return response.data.data.display_url;
    } catch (error) {
      toast.error("Failed to upload image");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await uploadToImgBB(file);
    }
  };

  const onSubmit = async (data) => {
    if (!imageUrl) {
      toast.error("Please upload an image");
      return;
    }

    const ticketData = {
      ...data,
      image: imageUrl,
      price: parseFloat(data.price),
      ticketQuantity: parseInt(data.ticketQuantity),
      perks: data.perks ? data.perks.split(",").map((p) => p.trim()) : [],
      vendorName: user.displayName,
      vendorEmail: user.email,
    };

    addTicketMutation.mutate(ticketData);
  };

  return (
    <div>
      <Helmet>
        <title>Add Ticket - TicketBari</title>
      </Helmet>

      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        Add New Ticket
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ticket Title *
            </label>
            <input
              type="text"
              {...register("ticketTitle", { required: "Title is required" })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="e.g., Dhaka to Chittagong Express Bus"
            />
            {errors.ticketTitle && (
              <p className="text-red-500 text-sm mt-1">
                {errors.ticketTitle.message}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                From Location *
              </label>
              <input
                type="text"
                {...register("fromLocation", {
                  required: "From location is required",
                })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                placeholder="e.g., Dhaka"
              />
              {errors.fromLocation && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fromLocation.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                To Location *
              </label>
              <input
                type="text"
                {...register("toLocation", {
                  required: "To location is required",
                })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                placeholder="e.g., Chittagong"
              />
              {errors.toLocation && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.toLocation.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Transport Type *
            </label>
            <select
              {...register("transportType", {
                required: "Transport type is required",
              })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Transport Type</option>
              <option value="Bus">Bus</option>
              <option value="Train">Train</option>
              <option value="Launch">Launch</option>
              <option value="Plane">Plane</option>
            </select>
            {errors.transportType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.transportType.message}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price (per unit) *
              </label>
              <input
                type="number"
                step="0.01"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 1, message: "Price must be at least 1" },
                })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                placeholder="500"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ticket Quantity *
              </label>
              <input
                type="number"
                {...register("ticketQuantity", {
                  required: "Quantity is required",
                  min: { value: 1, message: "Quantity must be at least 1" },
                })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                placeholder="50"
              />
              {errors.ticketQuantity && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.ticketQuantity.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Departure Date & Time *
            </label>
            <input
              type="datetime-local"
              {...register("departureDateTime", {
                required: "Departure date & time is required",
              })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            />
            {errors.departureDateTime && (
              <p className="text-red-500 text-sm mt-1">
                {errors.departureDateTime.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Perks (comma separated)
            </label>
            <input
              type="text"
              {...register("perks")}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              placeholder="AC, WiFi, Breakfast, Reclining Seats"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Example: AC, WiFi, Breakfast
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ticket Image *
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 px-6 py-3 bg-[#09335B] text-white rounded-lg cursor-pointer hover:bg-blue-600 transition">
                <FaUpload />
                <span>{uploading ? "Uploading..." : "Upload Image"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
              {imageUrl && (
                <span className="text-green-500 text-sm">✓ Image uploaded</span>
              )}
            </div>
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Preview"
                className="mt-4 w-full max-w-md h-48 object-cover rounded-lg"
              />
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Vendor Name
              </label>
              <input
                type="text"
                value={user?.displayName}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Vendor Email
              </label>
              <input
                type="email"
                value={user?.email}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={addTicketMutation.isPending || uploading}
            className="w-full bg-[#09335B] text-white py-4 rounded-lg text-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {addTicketMutation.isPending ? "Adding Ticket..." : "Add Ticket"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTicket;
