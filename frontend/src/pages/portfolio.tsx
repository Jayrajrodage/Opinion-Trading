import { Tabs, Tab, Card, CardHeader, Divider, CardBody } from "@heroui/react";

import DefaultLayout from "@/layouts/default";
import NoData from "@/components/no-data";
import { useNavigate } from "react-router-dom";

const Portfolio = () => {
  const navigate = useNavigate();

  return (
    <DefaultLayout>
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options" variant="underlined">
          <Tab key="live_trades" title="Live Trades">
            <div className="flex justify-center">
              <Card fullWidth>
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
                  <div className="flex justify-between">
                    <h1 className="text-sm sm:text-base">Invested: 1.5</h1>
                    <div
                      className="text-sm sm:text-base cursor-pointer hover:underline"
                      role="button"
                    >
                      Exit
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Tab>
          <Tab key="closed_trades" title="Closed Trades">
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
    </DefaultLayout>
  );
};

export default Portfolio;
