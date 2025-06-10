// AddPromoters.jsx
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Phone, MapPin } from "lucide-react";

export default function AddPromoters({
  isOpen,
  type, // "sampling" | "lunch"
  onClose, // () => void
  onSelect, // (selected: Promoter[], type) => void
  alreadySelected = [], // Promoter[]
  allPromoters = [], // Promoter[]
}) {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState(
    alreadySelected.map((p) => p.id)
  );

  useEffect(() => {
    // jab parent se alreadySelected change ho
    setSelectedIds(alreadySelected.map((p) => p.id));
  }, [alreadySelected]);

  const toggle = (id) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const filtered = allPromoters.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  const selectedPromoters = allPromoters.filter((p) =>
    selectedIds.includes(p.id)
  );

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        className="
        bg-gray-100 flex flex-col justify-center items-center max-h-[90vh] sm:rounded-lg w-[95vw] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw] 2xl:w-[40vw]
      "
      >
        {/* Header with close‐icon */}
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            Add {type === "sampling" ? "Sampling" : "Lunch Box"} Promoters
          </DialogTitle>
        </DialogHeader>

        {/* Inner white card */}
        <div className="bg-white shadow rounded-lg w-full py-5 sm:py-0">
          <div className="px-4 py-4 max-h-[60vh] sm:max-h-[65vh] overflow-y-auto space-y-4">
            {/* Search */}
            <Input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* Selected Promoters */}
            <div>
              <div className="text-sm font-medium text-gray-600">
                Selected Promoters
              </div>
              <div className="mt-2 h-24 overflow-y-auto rounded border border-gray-200 p-2">
                {selectedPromoters.length === 0 ? (
                  <div className="text-gray-400 text-sm">No one selected</div>
                ) : (
                  selectedPromoters.map((p) => (
                    <div key={p.id} className="text-gray-800 text-sm">
                      {p.name}
                    </div>
                  ))
                )}
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Promoters List */}
            <div>
              <div className="text-sm font-medium text-gray-600">
                Promoters List
              </div>
              <div className="mt-2 h-64 overflow-y-auto rounded border border-gray-200">
                {filtered.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center border-b last:border-none p-2"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600"
                      checked={selectedIds.includes(p.id)}
                      onChange={() => toggle(p.id)}
                    />
                    <div className="ml-3 flex-1">
                      <div className="font-medium text-gray-800">{p.name}</div>
                      <div className="mt-1 flex items-center text-gray-500 text-xs gap-4">
                        <Phone className="w-3 h-3" /> {p.phone}
                        <MapPin className="w-3 h-3" /> {p.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter >
          <Button
            className="w-full"
            onClick={() => onSelect(selectedPromoters, type)}
          >
            Add promoters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
