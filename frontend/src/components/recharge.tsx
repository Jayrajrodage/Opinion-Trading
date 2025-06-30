import {
  Button,
  Divider,
  Drawer,
  DrawerContent,
  DrawerHeader,
  NumberInput,
} from "@heroui/react";

import { WalletIcon } from "./icons";

import { rechargeProps } from "@/types";

const Recharge = ({ isOpen, onOpenChange }: rechargeProps) => {
  return (
    <Drawer
      className="w-full max-w-xl left-1/2 transform -translate-x-1/2 bottom-0 rounded-t-xl"
      placement="bottom"
      size="lg"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DrawerContent>
        {(_onClose) => (
          <>
            <DrawerHeader>
              <div className="flex gap-2 items-center justify-center">
                <WalletIcon />
                <h2 className="text-sm sm:text-base text-center">
                  Top Up Your Wallet
                </h2>
              </div>
            </DrawerHeader>
            <Divider />
            <div className="flex flex-col gap-4 p-4">
              <NumberInput
                readOnly
                hideStepper
                defaultValue={50}
                label="Amount"
                placeholder="Enter the amount"
                radius="full"
              />
              <Button>Recharge</Button>
            </div>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default Recharge;
