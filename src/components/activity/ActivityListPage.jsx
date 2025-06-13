import React, { useState } from "react";
import RegionFilterHeader from "./RegionFilterHeader";
import TabsWithFilters from "./TabsWithFilters";

export default function ActivityListPage() {
  const [selectedRegion, setSelectedRegion] = useState([]);

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
