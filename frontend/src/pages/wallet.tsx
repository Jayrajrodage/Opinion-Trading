import { Card, CardBody, Button, useDisclosure } from "@heroui/react";

import DefaultLayout from "@/layouts/default";
import { Gift, Trophy, WalletIcon } from "@/components/icons";
import Recharge from "@/components/recharge";

const Wallet = () => {
  const { onOpen, onOpenChange, isOpen } = useDisclosure();

  return (
    <DefaultLayout>
      <div className="pt-5 flex flex-col gap-5 px-5 sm:px-10">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 font-bold text-3xl">
            <h1>₹</h1>
            <h1>15</h1>
          </div>
          <h1 className="text-gray-300 text-sm">Total Balance</h1>
        </div>
        <Card>
          <CardBody className="flex flex-row justify-between">
            <div className="flex justify-center items-center gap-3">
              <WalletIcon />
              <div className="flex flex-col">
                <p className="text-xs sm:text-sm text-default-500">Deposit</p>
                <p className="text-sm sm:text-base">₹15</p>
              </div>
            </div>
            <Button onPress={onOpen}>Recharge</Button>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="flex flex-row justify-between">
            <div className="flex justify-center items-center gap-3">
              <Trophy />
              <div className="flex flex-col">
                <p className="text-xs sm:text-sm text-default-500">Winnings</p>
                <p className="text-sm sm:text-base">₹15</p>
              </div>
            </div>
            <Button isDisabled>Withdraw</Button>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="flex flex-row justify-between">
            <div className="flex justify-center items-center gap-3">
              <Gift />
              <div className="flex flex-col">
                <p className="text-xs sm:text-sm text-default-500">
                  Promotional
                </p>
                <p className="text-sm sm:text-base">₹15</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <Recharge isOpen={isOpen} onOpenChange={onOpenChange} />
    </DefaultLayout>
  );
};

export default Wallet;
