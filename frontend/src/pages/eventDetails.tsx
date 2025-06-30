import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Divider, useDisclosure } from "@heroui/react";

import DetailsLayout from "@/layouts/details";
import { Persons } from "@/components/icons";
import PlaceTrade from "@/components/placeTrade";
import OrderBook from "@/components/orderBook";

const EventDetails = () => {
  const { id } = useParams();
  const [initialKind, setInitialKind] = useState<"yes" | "no">("yes");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const HandleOpenChange = (kind: "yes" | "no") => {
    setInitialKind(kind);
    onOpen();
  };

  return (
    <DetailsLayout title="Event Details">
      <div>
        <Card className="flex flex-col gap-5 mt-3 p-2">
          <div className="flex gap-5 items-center">
            <img
              alt="image_url"
              loading="lazy"
              height={50}
              src="https://cdn.pixabay.com/photo/2017/03/12/02/57/bitcoin-2136339_1280.png"
              width={50}
            />
            <div className="flex flex-col ">
              <p className="text-lg sm:text-xl">
                Exports in India to be $39 billion or more in June?
              </p>
            </div>
          </div>
          <div className="flex gap-2 justify-center">
            <Button
              className="flex-1"
              size="md"
              variant="shadow"
              onPress={() => HandleOpenChange("yes")}
            >
              Yes ₹5.0
            </Button>
            <Button
              className="flex-1"
              size="md"
              variant="shadow"
              onPress={() => HandleOpenChange("no")}
            >
              No ₹5.0
            </Button>
          </div>
          <div className="flex gap-1 items-center justify-between">
            <div className="flex gap-1 items-center">
              <Persons size={18} />
              <p>200 Traders</p>
            </div>
            <div>₹64.1L Volume</div>
          </div>
        </Card>
        <Divider className="mt-2" />
        <OrderBook />
        <Divider className="mt-2" />
        <Card className="p-2 mt-2">
          <p className="text-sm sm:text-base">
            This is a sample event description. It provides details about the
            event, including its significance and context. This is a sample
            event description. It provides details about the event, including
            its significance and context.
          </p>
        </Card>
        <PlaceTrade
          isOpen={isOpen}
          initialKind={initialKind}
          onOpenChange={onOpenChange}
        />
      </div>
    </DetailsLayout>
  );
};

export default EventDetails;
