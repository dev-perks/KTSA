import React, { useEffect, useState } from "react";
import RegionFilterHeader from "./RegionFilterHeader";
import TabsWithFilters from "./TabsWithFilters";
import { regionOptions } from "../../utils/regions";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function ActivityListPage() {
  const [selectedRegion, setSelectedRegion] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/schools`,{
          withCredentials: true,
        });
        const data = response.data;
        console.log("Data : ", data);
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

  return (
    <div className="overflow-auto pb-24 px-4 pt-4">
      <RegionFilterHeader
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
      />
      <TabsWithFilters selectedRegion={selectedRegion} />
    </div>
  );
}
