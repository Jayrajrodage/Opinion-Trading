import { useNavigate } from "react-router-dom";
import { Card, CardHeader, Divider, CardBody, Button } from "@heroui/react";

import DetailsLayout from "@/layouts/details";
import { BriefCase, Rupees } from "@/components/icons";

const TradeDetails = () => {
  const navigation = useNavigate();

  return (
    <DetailsLayout title="Trade Details">
      <Card fullWidth className="mt-2">
        <CardHeader>
          <div className="flex gap-5 items-center">
            <img
              alt="image_url"
              loading="lazy"
              height={50}
              src="https://cdn.pixabay.com/photo/2017/03/12/02/57/bitcoin-2136339_1280.png"
              width={50}
            />
            <div className="flex flex-col ">
              <p className="text-base sm:text-lg">
                Exports in India to be $39 billion or more in June?
              </p>
            </div>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex justify-between items-center">
            <Button>Closed</Button>
            <Button onPress={() => navigation("/event-details/1")}>
              View Event
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card fullWidth className="mt-2">
        <CardHeader>
          <div className="flex gap-2 items-center">
            <BriefCase />
            <p className="text-base sm:text-lg">Portfolio</p>
          </div>
        </CardHeader>
        <CardBody>
          <div className="flex justify-center items-center gap-[10rem] px-10">
            <div className="flex flex-col gap-0.5 items-center">
              <h1 className="text-2xl sm:text-xl">₹5.0</h1>
              <p className="text-gray-400 text-xs">Investment</p>
            </div>
            <div className="flex flex-col gap-0.5 items-center">
              <h1 className="text-2xl sm:text-xl text-green-500">₹10.0</h1>
              <p className="text-gray-400 text-xs">Returns</p>
            </div>
          </div>
          <h1 className="text-end mt-1 text-sm hover:underline cursor-pointer">
            View Transaction
          </h1>
        </CardBody>
      </Card>
      <Card fullWidth className="mt-2">
        <CardHeader>
          <div className="flex gap-2 items-center">
            <Rupees />
            <p className="text-base sm:text-lg">Order Type</p>
          </div>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col gap-1">
            <h1 className="text-green-500 text-lg">Yes</h1>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="text-sm">Investment</p>
                <p className="text-sm">1.5 RS.</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm">Quantity</p>
                <p className="text-sm text-end">2</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </DetailsLayout>
  );
};

export default TradeDetails;
