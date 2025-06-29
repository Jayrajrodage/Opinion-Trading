import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Divider,
  Tabs,
  Tab,
  Slider,
} from "@heroui/react";

import { placeTradeProps } from "@/types";

const PlaceTrade = ({ isOpen, onOpenChange, initialKind }: placeTradeProps) => {
  const [kind, setKind] = useState<"yes" | "no">(initialKind);

  useEffect(() => {
    setKind(initialKind);
  }, [initialKind]);

  return (
    <Drawer
      className="w-full max-w-xl left-1/2 transform -translate-x-1/2 bottom-0 rounded-t-xl"
      placement="bottom"
      size="lg"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DrawerContent className="max-w-xl w-full mx-auto rounded-t-xl justify-center">
        {(onClose) => (
          <>
            <DrawerHeader>
              <div className="flex gap-2 items-center justify-center">
                <img
                  alt="Trade Icon"
                  src="https://cdn.pixabay.com/photo/2017/03/12/02/57/bitcoin-2136339_1280.png"
                  className="w-10 h-10 rounded-full mx-auto"
                />
                <h2 className="text-sm sm:text-base text-center">
                  Place Your Trade
                </h2>
              </div>
            </DrawerHeader>
            <Divider />
            <DrawerBody>
              <Tabs
                fullWidth
                size="lg"
                selectedKey={kind}
                aria-label="Options"
                color={kind === "yes" ? "success" : "danger"}
                className="-mb-2"
                onSelectionChange={(key) => setKind(key as "yes" | "no")}
              >
                <Tab key="yes" title="Yes">
                  <div>
                    <Tabs aria-label="Options">
                      <Tab key="market" title="Market">
                        <Slider
                          color="foreground"
                          defaultValue={1}
                          label="Quantity"
                          maxValue={50}
                          minValue={1}
                          size="md"
                          step={1}
                        />
                      </Tab>
                      <Tab key="limit" title="Limit">
                        <div className="flex flex-col gap-6 w-full">
                          <Slider
                            color="foreground"
                            defaultValue={5}
                            label="Quantity"
                            maxValue={50}
                            minValue={1}
                            size="md"
                            step={1}
                          />
                          <Slider
                            color="foreground"
                            defaultValue={5}
                            label="Price"
                            maxValue={10}
                            minValue={1}
                            size="md"
                            step={1}
                          />
                        </div>
                      </Tab>
                    </Tabs>
                    <div className="flex justify-center items-center gap-[10rem] px-10">
                      <div className="flex flex-col gap-0.5 items-center">
                        <h1 className="text-2xl sm:text-xl">₹5.0</h1>
                        <p className="text-gray-400 text-xs">You put</p>
                      </div>
                      <div className="flex flex-col gap-0.5 items-center">
                        <h1 className="text-2xl sm:text-xl text-green-500">
                          ₹10.0
                        </h1>
                        <p className="text-gray-400 text-xs">You get</p>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab key="no" title="No">
                  <div>
                    <Tabs aria-label="Options">
                      <Tab key="market" title="Market">
                        <Slider
                          color="foreground"
                          defaultValue={1}
                          label="Quantity"
                          maxValue={50}
                          minValue={1}
                          size="md"
                          step={1}
                        />
                      </Tab>
                      <Tab key="limit" title="Limit">
                        <div className="flex flex-col gap-6 w-full">
                          <Slider
                            color="foreground"
                            defaultValue={5}
                            label="Quantity"
                            maxValue={50}
                            minValue={1}
                            size="md"
                            step={1}
                          />
                          <Slider
                            color="foreground"
                            defaultValue={5}
                            label="Price"
                            maxValue={10}
                            minValue={1}
                            size="md"
                            step={1}
                          />
                        </div>
                      </Tab>
                    </Tabs>
                    <div className="flex justify-center items-center gap-[10rem] px-10">
                      <div className="flex flex-col gap-0.5 items-center">
                        <h1 className="text-2xl sm:text-xl">₹5.0</h1>
                        <p className="text-gray-400 text-xs">You put</p>
                      </div>
                      <div className="flex flex-col gap-0.5 items-center">
                        <h1 className="text-2xl sm:text-xl text-green-500">
                          ₹10.0
                        </h1>
                        <p className="text-gray-400 text-xs">You get</p>
                      </div>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </DrawerBody>

            <DrawerFooter className="flex flex-col justify-center">
              <Button
                fullWidth
                size="lg"
                color={kind === "yes" ? "success" : "danger"}
                onPress={onClose}
              >
                Place Order
              </Button>
              <div className="text-sm text-center">
                Available Balance: ₹15.00
              </div>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default PlaceTrade;
