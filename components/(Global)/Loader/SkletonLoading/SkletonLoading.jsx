import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SkletonLoading = () => {
  return (
    <div className="flex items-center space-x-4 ">
      <Skeleton className="h-12 w-12 xl:w-36 xl:h-36 rounded-full" />
      <div className="space-y-2 md:h-20 md:w-20 lg:w-24 lg:h-24 xl:h-36 xl:w-36">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export default SkletonLoading;
