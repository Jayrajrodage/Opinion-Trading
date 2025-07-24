import { Card, CardBody, Skeleton } from "@heroui/react";

import { WalletIcon, LockedIcon } from "@/components/icons";

export default function WalletSkeleton() {
  return (
    <div className="pt-5 flex flex-col gap-5 px-5 sm:px-10">
      {/* Total Balance */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 font-bold text-3xl items-center">
          <h1>₹</h1>
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
        <Skeleton className="h-4 w-24 rounded-md" />
      </div>

      {/* Available Balance Card */}
      <Card>
        <CardBody className="flex flex-row justify-between">
          <div className="flex justify-center items-center gap-3">
            <WalletIcon />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-3 w-16 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
            </div>
          </div>
          <Skeleton className="h-9 w-24 rounded-md" />
        </CardBody>
      </Card>

      {/* Locked Balance Card */}
      <Card>
        <CardBody className="flex flex-row justify-between">
          <div className="flex justify-center items-center gap-3">
            <LockedIcon />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-3 w-16 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
            </div>
          </div>
          <Skeleton className="h-9 w-24 rounded-md" />
        </CardBody>
      </Card>
    </div>
  );
}
