import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Button,
  useDisclosure,
} from "@heroui/react";

import { Persons } from "./icons";
import PlaceTrade from "./placeTrade";

import { event } from "@/types";

const EventCard = ({ id, traders, title, imgUrl }: event) => {
  const [initialKind, setInitialKind] = useState<"yes" | "no">("yes");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();
  const HandleOpenChange = (kind: "yes" | "no") => {
    setInitialKind(kind);
    onOpen();
  };

  return (
    <Card>
      <CardHeader
        className="flex justify-between  gap-3"
        role="button"
        onClick={() => navigate(`/event-details/${id}`)}
      >
        <div className="flex flex-col gap-2">
          <p className="flex gap-1 text-xs sm:text-sm text-default-500 items-center ">
            <Persons size={18} />
            <p>{traders}</p>
            <p>Traders</p>
          </p>
          <p className="text-sm sm:text-base">{title}</p>
        </div>
        <img
          alt="image_url"
          loading="lazy"
          height={50}
          src={imgUrl}
          width={50}
        />
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex gap-2 justify-center">
          <Button
            className="flex-1"
            size="md"
            variant="shadow"
            onPress={() => HandleOpenChange("yes")}
          >
            Yes
          </Button>
          <Button
            className="flex-1"
            size="md"
            variant="shadow"
            onPress={() => HandleOpenChange("no")}
          >
            No
          </Button>
        </div>
      </CardBody>
      <PlaceTrade
        isOpen={isOpen}
        initialKind={initialKind}
        onOpenChange={onOpenChange}
      />
    </Card>
  );
};

export default EventCard;
