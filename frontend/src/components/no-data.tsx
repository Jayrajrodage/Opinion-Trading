import { Image } from "@heroui/react";

import no_Image from "@/assets/no-data.png";
const NoData = () => {
  return (
    <div className="">
      <Image alt="no data" height={150} src={no_Image} width={150} />
      <p className="text-gray-400 text-center pt-4">No live trades</p>
    </div>
  );
};

export default NoData;
