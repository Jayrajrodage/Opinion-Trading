import { Tabs, Tab } from "@heroui/react";

import DefaultLayout from "@/layouts/default";
import NoData from "@/components/no-data";

const Portfolio = () => {
  return (
    <DefaultLayout>
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options" variant="underlined">
          <Tab key="live_trades" title="Live Trades">
            <div className="flex justify-center pt-10">
              <NoData />
            </div>
          </Tab>
          <Tab key="closed_trades" title="Closed Trades">
            <div className="flex justify-center pt-10">
              <NoData />
            </div>
          </Tab>
        </Tabs>
      </div>
    </DefaultLayout>
  );
};

export default Portfolio;
