import React, { useEffect, useState } from "react";
import {
  MapPin,
  Home,
  Calendar as CalendarIcon,
  ListTodo,
  Clock,
} from "lucide-react";
import { regionOptions } from "../../utils/regions";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import toast from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function AddActivity({ initialRegion, onSave }) {
  const [formData, setFormData] = useState({
    region: initialRegion || "",
    schoolId: "",
    activityType: "",
    samplingDate: "",
    samplingTime: "",
    lunchboxDate: "",
    lunchboxTime: "",
    address: "",
    noOfKids: "",
    latitude: "",
    longitude: "",
    noOfSampleIssued: "",
    noOfLunchboxesIssued: "",
    samplingPromoterId: null,
    lunchboxPromoterId: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [schools, setSchool] = useState([]);
  const [promoters, setPromoters] = useState([]);
  const [error, setError] = useState("");

  const showSampling =
    formData.activityType === "SCHOOL_SAMPLING" ||
    formData.activityType === "BOTH";
  const showLunch =
    formData.activityType === "LUNCHBOX_CHECK" ||
    formData.activityType === "BOTH";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/schools`, {
          withCredentials: true,
        });
        const response1 = await axios.get(`${BASE_URL}/promoter/promoters`, {
          withCredentials: true,
        });

        setSchool(response.data.schools);
        setPromoters(response1.data.promoters);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError("Invalid credentials. Please try again.");
        } else {
          setError("An error occurred during login.");
        }
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Prepare the request data
      const requestData = {
        activityType: formData.activityType,
        region: formData.region,
        schoolId: formData.schoolId,
        address: formData.address,
        noOfKids: Number(formData.noOfKids),
        latitude: formData.latitude ? Number(formData.latitude) : undefined,
        longitude: formData.longitude ? Number(formData.longitude) : undefined,
        noOfSampleIssued: formData.noOfSampleIssued,
        noOfLunchboxesIssued: formData.noOfLunchboxesIssued,
        samplingPromoterId: formData.samplingPromoterId,
        lunchboxPromoterId: formData.lunchboxPromoterId,
        samplingDate: showSampling ? formData.samplingDate : undefined,
        samplingTime: showSampling
          ? `${formData.samplingHour}:${formData.samplingMinute}`
          : undefined,
        lunchboxDate: showLunch ? formData.lunchboxDate : undefined,
        lunchboxTime: showLunch
          ? `${formData.lunchboxHour}:${formData.lunchboxMinute}`
          : undefined,
      };

      const response = await axios.post(`${BASE_URL}/admin/activities`, requestData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success(response.data.message || "Activity created successfully");
      onSave(response.data.activity);
    } catch (error) {
      console.error("Error creating activity:", error);
      //toast.error(error.response?.data?.message || "Failed to create activity");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 flex items-center">
          + Add Activity
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-gray-100 flex flex-col justify-center items-center max-h-[90vh] sm:rounded-lg w-[95vw] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw] 2xl:w-[40vw]">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Add Activity</DialogTitle>
        </DialogHeader>

        <div className="bg-white shadow rounded-lg mx-0 sm:mx-0">
          <div className="px-4 pt-4 pb-4 max-h-[60vh] sm:max-h-[65vh] overflow-y-auto">
            <form
              id="activityForm"
              onSubmit={handleSubmit}
              className="grid gap-4"
            >
              {/* Region */}
              <div className="grid gap-1">
                <Label htmlFor="region-select">Region</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 z-10" />
                  <Select
                    value={formData.region}
                    onValueChange={(value) =>
                      handleSelectChange("region", value)
                    }
                  >
                    <SelectTrigger className="pl-9 pr-8 py-2 border rounded-md bg-white text-sm text-gray-700 w-full focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regionOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* School Name */}
              <div className="grid gap-1">
                <Label htmlFor="school-select">School Name</Label>
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 z-10" />
                  <Select
                    value={formData.schoolId}
                    onValueChange={(value) =>
                      handleSelectChange("schoolId", value)
                    }
                  >
                    <SelectTrigger className="pl-9 pr-8 py-2 border rounded-md bg-white text-sm text-gray-700 w-full focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Select school" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* You'll need to fetch schools based on selected region */}
                      {schools?.map((school) => (
                        <SelectItem key={school.id} value={String(school.id)}>
                          {school.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Activity Type Card */}
              <div className="border border-gray-200 rounded-md p-4 space-y-4">
                <div className="grid gap-1">
                  <Label htmlFor="activity-type">Activity Type</Label>
                  <div className="relative">
                    <ListTodo className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 z-10" />
                    <Select
                      value={formData.activityType}
                      onValueChange={(value) =>
                        handleSelectChange("activityType", value)
                      }
                    >
                      <SelectTrigger className="pl-9 pr-8 py-2 border rounded-md bg-white text-sm text-gray-700 w-full focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="Select activity type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SCHOOL_SAMPLING">
                          School Sampling
                        </SelectItem>
                        <SelectItem value="LUNCHBOX_CHECK">
                          Lunch Box Check
                        </SelectItem>
                        <SelectItem value="BOTH">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* School Sampling Section */}
                {showSampling && (
                  <div className="border border-gray-200 rounded-md p-3">
                    <div className="text-sm font-medium text-gray-800 mb-2">
                      School Sampling
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <CalendarIcon className="w-4 h-4 text-gray-500" />
                      <Input
                        type="date"
                        name="samplingDate"
                        value={formData.samplingDate}
                        onChange={handleChange}
                        className="flex-1 min-w-[120px]"
                      />
                      <Clock className="w-4 h-4 text-gray-500" />
                      <div className="flex items-center gap-1">
                        <Input
                          type="text"
                          name="samplingHour"
                          value={formData.samplingHour}
                          onChange={handleChange}
                          maxLength={2}
                          placeholder="HH"
                          className="w-12 text-center"
                        />
                        <span>:</span>
                        <Input
                          type="text"
                          name="samplingMinute"
                          value={formData.samplingMinute}
                          onChange={handleChange}
                          maxLength={2}
                          placeholder="MM"
                          className="w-12 text-center"
                        />
                      </div>
                    </div>
                    <div className="grid gap-1">
                      <Label>No of Samples Issued</Label>
                      <Input
                        type="text"
                        name="noOfSampleIssued"
                        value={formData.noOfSampleIssued}
                        onChange={handleChange}
                        placeholder="Enter number of samples"
                      />
                    </div>
                    <div className="grid gap-1 mt-2">
                      <Label>Sampling Promoter</Label>
                      <Select
                        value={formData.samplingPromoterId}
                        onValueChange={(value) =>
                          handleSelectChange("samplingPromoterId", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select promoter" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* Fetch and map promoters here */}
                          {promoters.length === 0 ? (
                            <SelectItem disabled value="">
                              No promoters available
                            </SelectItem>
                          ) : (
                            promoters.map((promoter) => (
                              <SelectItem
                                key={promoter.id}
                                value={String(promoter.id)}
                              >
                                {promoter.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Lunch Box Check Section */}
                {showLunch && (
                  <div className="border border-gray-200 rounded-md p-3">
                    <div className="text-sm font-medium text-gray-800 mb-2">
                      Lunch Box Check
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <CalendarIcon className="w-4 h-4 text-gray-500" />
                      <Input
                        type="date"
                        name="lunchboxDate"
                        value={formData.lunchboxDate}
                        onChange={handleChange}
                        className="flex-1 min-w-[120px]"
                      />
                      <Clock className="w-4 h-4 text-gray-500" />
                      <div className="flex items-center gap-1">
                        <Input
                          type="text"
                          name="lunchboxHour"
                          value={formData.lunchboxHour}
                          onChange={handleChange}
                          maxLength={2}
                          placeholder="HH"
                          className="w-12 text-center"
                        />
                        <span>:</span>
                        <Input
                          type="text"
                          name="lunchboxMinute"
                          value={formData.lunchboxMinute}
                          onChange={handleChange}
                          maxLength={2}
                          placeholder="MM"
                          className="w-12 text-center"
                        />
                      </div>
                    </div>
                    <div className="grid gap-1">
                      <Label>No of Lunchboxes Issued</Label>
                      <Input
                        type="text"
                        name="noOfLunchboxesIssued"
                        value={formData.noOfLunchboxesIssued}
                        onChange={handleChange}
                        placeholder="Enter number of lunchboxes"
                      />
                    </div>
                    <div className="grid gap-1 mt-2">
                      <Label>Lunchbox Promoter</Label>
                      <Select
                        value={formData.lunchboxPromoterId}
                        onValueChange={(value) =>
                          handleSelectChange("lunchboxPromoterId", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select promoter" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* Fetch and map promoters here */}
                          {promoters.length === 0 ? (
                            <SelectItem disabled value="">
                              No promoters available
                            </SelectItem>
                          ) : (
                            promoters.map((promoter) => (
                              <SelectItem
                                key={promoter.id}
                                value={String(promoter.id)}
                              >
                                {promoter.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>

              {/* No of Kids */}
              <div className="grid gap-1">
                <Label htmlFor="noOfKids">No of Kids</Label>
                <Input
                  type="number"
                  name="noOfKids"
                  value={formData.noOfKids}
                  onChange={handleChange}
                  min={0}
                  className="w-full"
                />
              </div>

              {/* Address */}
              <div className="grid gap-1">
                <Label htmlFor="address">Address</Label>
                <Input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                  className="w-full"
                />
              </div>

              {/* Location Coordinates */}
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    type="text"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    placeholder="Enter latitude"
                  />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    type="text"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    placeholder="Enter longitude"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 md:gap-4 sm:gap-0 sm:px-4 w-full">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="activityForm" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
