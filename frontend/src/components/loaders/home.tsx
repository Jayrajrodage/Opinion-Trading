import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";

const HomeLoader = () => {
  return (
    <>
      <div className="flex flex-col gap-3 p-2 cursor-pointer">
        {[1, 2, 3].map((id) => (
          <Card key={id}>
            <CardHeader className="flex gap-3" role="button">
              <div className="flex flex-col gap-2 flex-grow">
                <Skeleton className="w-24 h-4 rounded-md" />
                <Skeleton className="w-full h-4 rounded-md" />
              </div>
              <Skeleton className="w-[50px] h-[50px] rounded-full" />
            </CardHeader>
            <CardBody>
              <div className="flex gap-2 justify-center">
                <Skeleton className="flex-1 h-10 rounded-md" />
                <Skeleton className="flex-1 h-10 rounded-md" />
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  );
};

export default HomeLoader;
