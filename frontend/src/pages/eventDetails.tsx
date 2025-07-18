import { useParams } from "react-router-dom";
import { Button, Card, Divider, useDisclosure } from "@heroui/react";

import DefaultLayout from "@/layouts/default";
import { Persons } from "@/components/icons";
import PlaceTrade from "@/components/placeTrade";
import OrderBook from "@/components/orderBook";
import EventDetailsSkeleton from "@/components/loaders/eventDetails";
import { useEventDetails } from "@/hooks/useEventDetails";

const EventDetails = () => {
  const { id } = useParams();
  const { isLoading, error, data, isSuccess } = useEventDetails(id);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const HandleOpenChange = () => {
    onOpen();
  };

  if (isLoading) {
    return (
      <DefaultLayout title="Event Details" showBackButton={true}>
        <EventDetailsSkeleton />
      </DefaultLayout>
    );
  }
  if (error)
    return (
      <DefaultLayout title="Event Details">
        <h1 className="text-xl text-red-500">
          {error.message || "Something went Wrong"}
        </h1>
      </DefaultLayout>
    );

  return (
    <DefaultLayout title="Event Details" showBackButton={true}>
      {isSuccess && data ? (
        <div className="flex flex-col gap-2">
          <Card className="flex flex-col gap-5 mt-3 p-2">
            <div className="flex gap-5 items-center">
              <img
                alt="image_url"
                loading="lazy"
                height={50}
                src={data.imgUrl}
                width={50}
              />
              <div className="flex flex-col ">
                <p className="text-lg sm:text-xl">{data.title}</p>
              </div>
            </div>
            <div className="flex gap-2 justify-center">
              <Button
                className="flex-1"
                size="md"
                variant="shadow"
                onPress={() => HandleOpenChange()}
              >
                Yes ₹5.0
              </Button>
              <Button
                className="flex-1"
                size="md"
                variant="shadow"
                onPress={() => HandleOpenChange()}
              >
                No ₹5.0
              </Button>
            </div>
            <div className="flex gap-1 items-center justify-between">
              <div className="flex gap-1 items-center">
                <Persons size={18} />
                <p>{data.traders} Traders</p>
              </div>
              <div>₹64.1L Volume</div>
            </div>
          </Card>
          <Divider />
          <h1>Order Book</h1>
          <OrderBook />
          <Divider />
          <h1>Event Overview</h1>
          <Card className="p-2">
            <p className="text-sm sm:text-base">{data?.description}</p>
          </Card>
          <PlaceTrade isOpen={isOpen} id={id!} onOpenChange={onOpenChange} />
        </div>
      ) : (
        <div className="text-center text-red-500">Event not found!</div>
      )}
    </DefaultLayout>
  );
};

export default EventDetails;
