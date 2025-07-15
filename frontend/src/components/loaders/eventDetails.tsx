import { Card, Skeleton, Divider } from "@heroui/react";

import { Persons } from "../icons";

const EventDetailsSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <Card className="flex flex-col gap-5 mt-3 p-2">
        {/* Image + Title */}
        <div className="flex gap-5 items-center">
          <Skeleton className="rounded-lg w-[50px] h-[50px]" />
          <div className="flex flex-col gap-2">
            <Skeleton className="w-60 h-6 rounded-lg" />
            <Skeleton className="w-48 h-4 rounded-lg" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 justify-center">
          <Skeleton className="flex-1 h-10 rounded-lg" />
          <Skeleton className="flex-1 h-10 rounded-lg" />
        </div>

        {/* Traders and Volume */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Persons size={18} className="text-default-400" />
            <Skeleton className="w-24 h-4 rounded-lg" />
          </div>
          <Skeleton className="w-20 h-4 rounded-lg" />
        </div>
      </Card>

      <Divider />

      {/* Order Book */}
      <h1>Order Book</h1>
      <Card className="p-2">
        <Skeleton className="h-[15rem] rounded-lg" />
      </Card>

      <Divider />

      {/* Event Overview */}
      <h1>Event Overview</h1>
      <Card className="p-2 space-y-2">
        <Skeleton className="h-4 w-full rounded-lg" />
        <Skeleton className="h-4 w-11/12 rounded-lg" />
        <Skeleton className="h-4 w-3/4 rounded-lg" />
      </Card>
    </div>
  );
};

export default EventDetailsSkeleton;
