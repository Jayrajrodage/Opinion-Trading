import {
  Button,
  Divider,
  Drawer,
  DrawerContent,
  DrawerHeader,
  Slider,
  Switch,
  Tooltip,
} from "@heroui/react";

import { ExitDoor, InfoCircle } from "./icons";

import { exitTradeProps } from "@/types";

const ExitTrade = ({ isOpen, onOpenChange }: exitTradeProps) => {
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
                <ExitDoor />
                <h2 className="text-sm sm:text-base text-center">Exit Trade</h2>
              </div>
            </DrawerHeader>
            <Divider />
            <div className="flex flex-col gap-4 p-4">
              <div className="flex justify-between items-center">
                <Switch defaultSelected color="default">
                  Instant Exit
                </Switch>
                <Tooltip content="Market Order">
                  <Button isIconOnly variant="faded" size="sm">
                    <InfoCircle />
                  </Button>
                </Tooltip>
              </div>
              <Slider
                color="foreground"
                label="Price"
                aria-label="Exit"
                defaultValue={5}
                maxValue={10}
                minValue={1}
                step={1}
              />
              <div className="flex justify-center items-center gap-[10rem] px-10">
                <div className="flex flex-col gap-0.5 items-center">
                  <h1 className="text-2xl sm:text-xl">₹5.0</h1>
                  <p className="text-gray-400 text-xs">Invested</p>
                </div>
                <div className="flex flex-col gap-0.5 items-center">
                  <h1 className="text-2xl sm:text-xl text-green-500">₹10.0</h1>
                  <p className="text-gray-400 text-xs">Returns</p>
                </div>
              </div>
              <Button>Exit</Button>
            </div>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default ExitTrade;
