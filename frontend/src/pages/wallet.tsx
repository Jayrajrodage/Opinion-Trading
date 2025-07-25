import { Card, CardBody, Button, useDisclosure } from "@heroui/react";

import DefaultLayout from "@/layouts/default";
import { LockedIcon, WalletIcon } from "@/components/icons";
import Recharge from "@/components/recharge";
import { useBalance } from "@/hooks/useBalance";
import WalletSkeleton from "@/components/loaders/wallet";

const Wallet = () => {
  const { onOpen, onClose, onOpenChange, isOpen } = useDisclosure();
  const { data, isLoading, error, isSuccess } = useBalance();

  if (isLoading)
    return (
      <DefaultLayout title="Opinion Trading">
        <WalletSkeleton />
      </DefaultLayout>
    );

  if (error)
    return (
      <DefaultLayout title="Opinion Trading">
        <h1 className="text-xl text-red-500">
          {error.message || "Something went Wrong"}
        </h1>
      </DefaultLayout>
    );

  return (
    <DefaultLayout title="Wallet">
      {isSuccess && (
        <>
          <div className="pt-5 flex flex-col gap-5 px-5 sm:px-10">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 font-bold text-3xl">
                <h1>₹</h1>
                <h1>{data.availableBalance + data.lockedBalance}</h1>
              </div>
              <h1 className="text-gray-300 text-sm">Total Balance</h1>
            </div>
            <Card>
              <CardBody className="flex flex-row justify-between">
                <div className="flex justify-center items-center gap-3">
                  <WalletIcon />
                  <div className="flex flex-col">
                    <p className="text-xs sm:text-sm text-default-500">
                      Available
                    </p>
                    <p className="text-sm sm:text-base">
                      ₹{data.availableBalance}
                    </p>
                  </div>
                </div>
                <Button onPress={onOpen}>Recharge</Button>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="flex flex-row justify-between">
                <div className="flex justify-center items-center gap-3">
                  <LockedIcon />
                  <div className="flex flex-col">
                    <p className="text-xs sm:text-sm text-default-500">
                      Locked
                    </p>
                    <p className="text-sm sm:text-base">
                      ₹{data.lockedBalance}
                    </p>
                  </div>
                </div>
                <Button isDisabled>Locked</Button>
              </CardBody>
            </Card>
          </div>
        </>
      )}
      <Recharge isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} />
    </DefaultLayout>
  );
};

export default Wallet;
