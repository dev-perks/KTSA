import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import AddSchool from "./AddSchool";

const initialSchools = [
  { id: 1, name: "MARATOPELE PRIMARY SCHOOL", region: "Limpopo", address: "123 Education St, Polokwane", contact: "015 123 4567" },
  { id: 2, name: "MANGAKANE LERATE PRIMARY SCHOOL", region: "Limpopo", address: "456 Learning Ave, Mankweng", contact: "015 234 5678" },
  { id: 3, name: "BOKGOBELO MPHAKANYANE PRIMARY SCHOOL", region: "Limpopo", address: "789 Knowledge Rd, Seshego", contact: "015 345 6789" },
  { id: 4, name: "NNATILE PRIMARY SCHOOL", region: "Limpopo", address: "101 Wisdom Blvd, Tzaneen", contact: "015 456 7890" },
  { id: 5, name: "VENUS PRIMARY SCHOOL", region: "Limpopo", address: "202 Scholar Lane, Bela-Bela", contact: "015 567 8901" },
  { id: 6, name: "RANTSHU PRIMARY SCHOOL", region: "Limpopo", address: "303 Campus Dr, Thohoyandou", contact: "015 678 9012" },
  { id: 7, name: "HIGHBERRY PRIMARY SCHOOL", region: "Limpopo", address: "404 Academy St, Modimolle", contact: "015 789 0123" },
];

export default function SchoolMain() {
  const [schools, setSchools] = useState(initialSchools);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // --- ADD ---
  const openAdd = () => {
    setSelectedSchool(null);
    setIsAddOpen(true);
  };
  const handleAdd = (newSchool) => {
    const nextId = Math.max(0, ...schools.map(s => s.id)) + 1;
    setSchools([...schools, { ...newSchool, id: nextId }]);
    setIsAddOpen(false);
  };

  // --- EDIT ---
  const openEdit = (school) => {
    setSelectedSchool(school);
    setIsEditOpen(true);
  };
  const handleEditSuccess = (updates) => {
    setSchools(schools.map(s =>
      s.id === selectedSchool.id ? { ...s, ...updates } : s
    ));
    setIsEditOpen(false);
    setSelectedSchool(null);
  };

  // --- DELETE ---
  const openDelete = (school) => {
    setSelectedSchool(school);
    setIsDeleteOpen(true);
  };
  const confirmDelete = () => {
    setSchools(s => s.filter(x => x.id !== selectedSchool.id));
    setIsDeleteOpen(false);
    setSelectedSchool(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto ">
      {/* Header */}
      <div className="flex flex-col justify-center sm:flex-row sm:items-center sm:justify-between mb-6 bg-blue-50 p-4 rounded-md sm:min-h-[92px] min-h-[140px] gap-y-4 sm:gap-y-0">
        <h1 className="text-2xl font-semibold">School Management</h1>
        <Button
          onClick={openAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-4 py-2"
        >
          <Plus size={16} /> Add School
        </Button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-md shadow-sm mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search schools by name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10"
          />
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {schools
          .filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
          .map(school => (
            <div
              key={school.id}
              className="p-4 bg-white rounded-md shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                {/* Details */}
                <div className="mb-4 md:mb-0">
                  <h3 className="font-semibold">{school.name}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-600">
                    {/* Address */}
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {school.address}
                    </div>
                    {/* Contact */}
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {school.contact}
                    </div>
                    {/* Region */}
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      {school.region}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEdit(school)}
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    <Pencil size={16} className="mr-2" /> Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openDelete(school)}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 size={16} className="mr-2" /> Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Add Modal */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-[450px] rounded-md bg-gray-100 flex flex-col justify-center items-center max-h-[90vh] sm:rounded-lg w-[95vw] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw] 2xl:w-[40vw]">
          <DialogHeader>
            <DialogTitle className="text-center text-lg sm:text-xl">Add New School</DialogTitle>
          </DialogHeader>
          <AddSchool initialData={selectedSchool} onSuccess={handleAdd} />
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[450px] rounded-md bg-gray-100 flex flex-col justify-center items-center max-h-[90vh] sm:rounded-lg w-[95vw] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw] 2xl:w-[40vw]">
          <DialogHeader>
            <DialogTitle className="text-center text-lg sm:text-xl">Edit School Details</DialogTitle>
          </DialogHeader>
          <AddSchool
            initialData={selectedSchool}
            onSuccess={handleEditSuccess}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{selectedSchool?.name}</span>?
            </p>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete School
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
