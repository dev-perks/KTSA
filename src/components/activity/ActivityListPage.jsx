import React, { useState } from "react";
import RegionFilterHeader from "./RegionFilterHeader";
import TabsWithFilters from "./TabsWithFilters";
import { regionOptions } from "../../utils/regions";


export default function ActivityListPage() {
  const [selectedRegion, setSelectedRegion] = useState(regionOptions[0].value);

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
