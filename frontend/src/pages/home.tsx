import DefaultLayout from "@/layouts/default";
import EventCard from "@/components/eventCard";
import { useEvents } from "@/hooks/useEvent";
import HomeLoader from "@/components/loaders/home";

export default function HomePage() {
  const { isLoading, error, data, isSuccess } = useEvents();

  if (isLoading)
    return (
      <DefaultLayout title="Opinion Trading">
        <HomeLoader />
      </DefaultLayout>
    );

  if (error)
    return (
      <DefaultLayout title="Opinion Trading">
        <h1 className="text-xl text-red-500">
          {error.message || "Something went Wrong"}
        </h1>
      </DefaultLayout>
    );

  return (
    <DefaultLayout title="Opinion Trading">
      {isSuccess && (
        <div className="flex flex-col gap-3 p-2 cursor-pointer">
          {data.map((item, idx) => (
            <EventCard
              key={idx}
              id={item.id}
              title={item.title}
              imgUrl={item.imgUrl}
              traders={item.traders}
            />
          ))}
        </div>
      )}
    </DefaultLayout>
  );
}
