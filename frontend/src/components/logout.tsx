import React from "react";
import { useNavigate } from "react-router-dom";
import {
  addToast,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";

import { ExitDoor } from "./icons";

import { useLogout } from "@/hooks/useLogout";

const Logout = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const mutation = useLogout();
  const HandleLogout = React.useCallback(() => {
    mutation.mutate(undefined, {
      onSuccess: (res) => {
        navigate("/", { replace: true });
        addToast({
          title: res.message,
          color: "success",
        });
        setIsOpen(false);
        localStorage.removeItem("auth");
      },
      onError: (err) => {
        addToast({
          title: err.message || "Logout failed",
          color: "danger",
        });
      },
    });
  }, []);

  return (
    <Popover
      isOpen={isOpen}
      placement="left"
      backdrop="blur"
      onOpenChange={(open) => setIsOpen(open)}
    >
      <PopoverTrigger>
        <Button isIconOnly variant="faded">
          <ExitDoor className="text-default-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-3 px-1 py-2">
          <div className="text-small font-bold">Want to Logout ?</div>
          <div className="flex gap-2 justify-center">
            <Button
              className="flex-1"
              size="md"
              color="danger"
              onPress={HandleLogout}
            >
              Yes
            </Button>
            <Button
              className="flex-1"
              size="md"
              onPress={() => setIsOpen(false)}
            >
              No
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Logout;
