import React, { useState } from "react";
import RegionFilterHeader from "./RegionFilterHeader";
import TabsWithFilters from "./TabsWithFilters";
import { regionOptions } from "../../utils/regions";


export default function ActivityListPage() {
  const [selectedRegion, setSelectedRegion] = useState(regionOptions[0].value);

  return (
    <div className="p-4">
      <RegionFilterHeader
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
      />
      <TabsWithFilters selectedRegion={selectedRegion} />
    </div>
  );
}
