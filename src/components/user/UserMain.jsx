import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { User, Plus, Search, Pencil, Trash2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../ui/dialog";
import AddUser from "./AddUser";

const usersData = [
  { id: 1, name: "Mkululi Clifford Dumile", role: "Promoter" },
  { id: 2, name: "Lubabalo Mnweba", role: "Promoter" },
  { id: 3, name: "Masonwabe Mlatha", role: "Promoter" },
  { id: 4, name: "Sesthu Dumil", role: "Promoter" },
  { id: 5, name: "Vusumzi Mjandana", role: "Promoter" },
  { id: 6, name: "Ashley Thambiran", role: "Manager" },
  { id: 7, name: "Sivatho", role: "Promoter" },
  { id: 8, name: "Sihle Sikontya", role: "Promoter" },
];

export default function UserMain() {
  const [users, setUsers] = useState(usersData);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    setUsers(users.filter((u) => u.id !== selectedUser.id));
    setIsDeleteOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Users</h1>
        </div>
        <Button
          onClick={() => {
            setSelectedUser(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-4 py-2 mt-4 md:mt-0"
        >
          <Plus size={16} /> Add User
        </Button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10"
          />
        </div>
      </div>

      {/* User List */}
      <div className="space-y-4">
        {users
          .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()))
          .map((user) => (
            <div
              key={user.id}
              className="p-5 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                {/* user info */}
                <div className="flex-1 flex items-center space-x-3">
                  <User size={24} className="text-gray-400" />
                  <div>
                    <h3 className="font-semibold text-sm md:text-lg text-gray-800 truncate">
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-600">{user.role}</p>
                  </div>
                </div>
                {/* actions */}
                <div className="mt-4 md:mt-0 flex space-x-2 ml-9">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(user)}
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    <Pencil size={16} className="mr-2" /> Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(user)}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 size={16} className="mr-2" /> Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Add/Edit User Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="w-full sm:max-w-[450px] mx-auto my-4 sm:my-8 max-h-[90vh] overflow-y-auto rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-xl -mb-[300px] font-semibold  text-gray-800">
              {selectedUser ? "Edit User Details" : "Add New User"}
            </DialogTitle>
            <DialogClose asChild></DialogClose>
          </DialogHeader>
          <div className="py-4">
            <AddUser
              initialData={selectedUser || {}}
              onSuccess={() => {
                setIsModalOpen(false);
                setSelectedUser(null);
              }}
              onDelete={confirmDelete}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="w-full max-w-sm sm:max-w-[425px] mx-auto my-4 sm:my-8 max-h-[90vh] overflow-y-auto rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-800">
              Confirm Deletion
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{selectedUser?.name}</span>? This
              action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsDeleteOpen(false)}
                className="border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete User
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
