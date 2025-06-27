import DefaultLayout from "@/layouts/default";
import EventCard from "@/components/eventCard";

export default function HomePage() {
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-3 p-2 pb-16 cursor-pointer">
        {[1, 2, 3].map((item, idx) => (
          <EventCard
            key={idx}
            id={item}
            title="Bitcoin is forecasted to reach at 106998.54 USDT or more at
                03:30 PM ?"
            imageUrl="https://cdn.pixabay.com/photo/2017/03/12/02/57/bitcoin-2136339_1280.png"
            traders={200}
          />
        ))}
      </div>
    </DefaultLayout>
  );
}
