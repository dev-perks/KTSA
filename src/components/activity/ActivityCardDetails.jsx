import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarIcon, GraduationCap, Clock } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function ActivityCardDetails({ open, onClose, activity }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [promoters, setPromoters] = useState([]);

  const [samplingPromoterId, setSamplingPromoterId] = useState("");
  const [lunchboxPromoterId, setLunchboxPromoterId] = useState("");
  const [samplingDate, setSamplingDate] = useState("");
  const [samplingTime, setSamplingTime] = useState("");
  const [lunchboxDate, setLunchboxDate] = useState("");
  const [lunchboxTime, setLunchboxTime] = useState("");

  useEffect(() => {
    if (activity) {
      setSamplingPromoterId(activity.samplingPromoterId || "");
      setLunchboxPromoterId(activity.lunchboxPromoterId || "");
      setSamplingDate(activity.samplingDate?.split("T")[0] || "");
      setSamplingTime(activity.samplingTime || "");
      setLunchboxDate(activity.lunchboxDate?.split("T")[0] || "");
      setLunchboxTime(activity.lunchboxTime || "");
    }
  }, [activity]);

  useEffect(() => {
    const fetchPromoters = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/promoter/promoters`, {
          withCredentials: true,
        });
        setPromoters(response.data.promoters);
      } catch (err) {
        setError("Failed to load promoters.");
      }
    };
    fetchPromoters();
  }, []);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await axios.put(
        `${BASE_URL}/admin/activities/${activity.id}`,
        {
          samplingPromoterId: samplingPromoterId || null,
          lunchboxPromoterId: lunchboxPromoterId || null,
          samplingDate,
          samplingTime,
          lunchboxDate,
          lunchboxTime,
        },
        { withCredentials: true }
      );
      toast.success("Activity updated successfully!");
      onClose();
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update activity.");
    } finally {
      setLoading(false);
    }
  };

  if (!activity) return null;

  const { noOfKids, region, latitude, longitude, school } = activity;
  const city = school?.address;
  const schoolName = school?.name;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-100 flex flex-col justify-center items-center max-h-[90vh] w-[95vw] sm:w-[80vw]">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Activity Details</DialogTitle>
        </DialogHeader>

        <div className="bg-white shadow rounded-lg w-full overflow-y-auto max-h-[65vh] p-4 space-y-4">
          {/* School Info */}
          <div className="border border-gray-200 rounded-md p-4 space-y-3">
            <h3 className="font-medium text-gray-900 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-700" />
              {schoolName}
            </h3>
            <div className="text-sm"><strong>Region:</strong> {region}</div>
            <div className="text-sm"><strong>City:</strong> {city}</div>
            <div className="text-sm"><strong>No of Kids:</strong> {noOfKids}</div>
            <div className="text-sm">
              <strong>Location:</strong> Latitude: {latitude}, Longitude: {longitude}
            </div>
          </div>

          {/* Sampling Activity */}
          <div className="border border-gray-200 rounded-md p-4 space-y-3">
            <div className="text-sm font-medium text-gray-800">Sampling Activity</div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-gray-500" />
              <input
                type="date"
                value={samplingDate}
                onChange={(e) => setSamplingDate(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              />
              <Clock className="w-4 h-4 text-gray-500 ml-2" />
              <input
                type="time"
                value={samplingTime}
                onChange={(e) => setSamplingTime(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              />
            </div>
            <div className="text-sm">
              <strong>Promoter:</strong>{" "}
              <select
                value={samplingPromoterId}
                onChange={(e) => setSamplingPromoterId(e.target.value)}
                className="border p-1 rounded ml-2"
              >
                <option value="">Select Promoter</option>
                {promoters.map((promoter) => (
                  <option key={promoter.id} value={promoter.id}>
                    {promoter.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Lunchbox Activity */}
          <div className="border border-gray-200 rounded-md p-4 space-y-3">
            <div className="text-sm font-medium text-gray-800">Lunchbox Activity</div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-gray-500" />
              <input
                type="date"
                value={lunchboxDate}
                onChange={(e) => setLunchboxDate(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              />
              <Clock className="w-4 h-4 text-gray-500 ml-2" />
              <input
                type="time"
                value={lunchboxTime}
                onChange={(e) => setLunchboxTime(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              />
            </div>
            <div className="text-sm">
              <strong>Promoter:</strong>{" "}
              <select
                value={lunchboxPromoterId}
                onChange={(e) => setLunchboxPromoterId(e.target.value)}
                className="border p-1 rounded ml-2"
              >
                <option value="">Select Promoter</option>
                {promoters.map((promoter) => (
                  <option key={promoter.id} value={promoter.id}>
                    {promoter.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <DialogFooter className="w-full flex flex-col sm:flex-row gap-2">
          <Button onClick={handleUpdate}  disabled={loading}>
            {loading ? "Updating..." : "Update Activity"}
          </Button>
          <Button variant="destructive" >
            Delete Activity
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
