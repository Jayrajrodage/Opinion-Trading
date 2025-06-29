import { useNavigate } from "react-router-dom";

import { ArrowBack } from "@/components/icons";

export default function EventDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="relative flex flex-col h-screen max-w-xl mx-auto">
      <div className="relative flex items-center p-4 border-b">
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={handleBack}
        >
          <ArrowBack />
        </button>

        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold">
          Event Details
        </h1>
      </div>

      <main className="container overflow-y-auto px-2 pt-1">{children}</main>
    </div>
  );
}
