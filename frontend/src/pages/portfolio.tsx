import { useLocation, useNavigate } from "react-router-dom";
import {
  Tabs,
  Tab,
  Card,
  CardHeader,
  Divider,
  CardBody,
  useDisclosure,
  Button,
} from "@heroui/react";

import DefaultLayout from "@/layouts/default";
import ExitTrade from "@/components/exitTrade";
import { ExitDoor } from "@/components/icons";

const Portfolio = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();

  return (
    <DefaultLayout title="Portfolio">
      <div className="flex w-full flex-col">
        <Tabs
          selectedKey={`${pathname + hash}`}
          aria-label="Options"
          variant="underlined"
        >
          <Tab key="/portfolio" title="Live Trades" href="/portfolio">
            <div className="flex justify-center">
              <Card fullWidth>
                <CardHeader
                  role="button"
                  onClick={() => navigate("/event-details/1")}
                >
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
                  <div className="flex justify-between">
                    <h1 className="text-sm sm:text-base">Invested: 1.5</h1>
                    <h1 className="text-sm sm:text-base">Returns: 9</h1>
                  </div>
                  <Button
                    className="mt-2"
                    startContent={<ExitDoor />}
                    onPress={onOpen}
                  >
                    Exit Trade
                  </Button>
                </CardBody>
              </Card>
            </div>
          </Tab>
          <Tab
            key="/portfolio#closed"
            title="Closed Trades"
            href="/portfolio#closed"
          >
            <div>
              <Card fullWidth>
                <CardHeader
                  role="button"
                  onClick={() => navigate("/trade-details/1")}
                >
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
                  <div className="flex justify-between">
                    <h1 className="text-sm sm:text-base">Investment: ₹1.5</h1>
                    <h1 className="text-sm sm:text-base">Returns: ₹1.5</h1>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Tab>
        </Tabs>
      </div>
      <ExitTrade isOpen={isOpen} onOpenChange={onOpenChange} />
    </DefaultLayout>
  );
};

export default Portfolio;
