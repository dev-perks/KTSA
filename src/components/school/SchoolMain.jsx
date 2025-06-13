import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import AddSchool from "./AddSchool";
import axios from "axios";
import toast from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function SchoolMain() {
  const [schools, setSchools] = useState([]); // Changed from null to empty array
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/admin/schools`, { // Fixed typo in endpoint (schools)
          withCredentials: true,
        });

        
        setSchools(res.data.schools || []); // Ensure we always set an array
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Error fetching schools:", err); // Changed from "users" to "schools"
          setError(err.response?.data?.message || "Failed to load schools"); // Changed from "users" to "schools"
        }
      }
    };
    fetchData();
  }, []);

  const handleEditClick = (school) => {
    setSelectedSchool(school);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (school) => {
    setSelectedSchool(school);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/admin/schools/${selectedSchool.id}`, { // Changed from users to schools
        withCredentials: true,
      });
      setSchools(schools.filter((u) => u.id !== selectedSchool.id));
      toast.success("School deleted successfully"); // Changed from "User" to "School"
    } catch (err) {
      console.error("Error deleting school:", err); // Changed from "user" to "school"
      toast.error("Failed to delete school"); // Changed from "user" to "school"
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedSchool(null);
    }
  };

  const filteredSchools = schools.filter((s) => {
    return ( // Added return statement
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      (s.address && s.address.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold">School Management</h1>
        </div>
        <Button
          onClick={() => {
            setSelectedSchool(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-4 py-2 mt-4 md:mt-0"
        >
          <Plus size={16} /> Add School
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search schools by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10"
          />
        </div>
      </div>

      {/* Schools List */}
      <div className="space-y-4">
        {filteredSchools.length > 0 ? (
          filteredSchools.map((school) => (
            <div
              key={school.id}
              className="p-5 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {school.name}
                  </h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {school.address}
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      {school.contact}
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                        />
                      </svg>
                      {school.region}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditClick(school)}
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    <Pencil size={16} className="mr-2" /> Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteClick(school)}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 size={16} className="mr-2" /> Delete
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-5 bg-white rounded-lg shadow-sm border border-gray-100 text-center text-gray-500">
            No school found
          </div>
        )}
      </div>

      {/* Edit/Add School Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="w-full h-[590px] sm:max-w-[450px] rounded-lg">
          <DialogHeader className="h-[5px]">
            <DialogTitle className="text-xl -mb-[300px] font-semibold text-gray-800">
              {selectedSchool ? "Edit School Details" : "Add New School"}
            </DialogTitle>
          </DialogHeader>
          <div className="py-">
            <AddSchool
              initialData={selectedSchool || {}}
              onSuccess={() => {
                setIsModalOpen(false);
                setSelectedSchool(null);
                // Consider adding a refetch here to update the list
              }}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-800">
              Confirm Deletion
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{selectedSchool?.name}</span>?
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
                className="border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete School
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}