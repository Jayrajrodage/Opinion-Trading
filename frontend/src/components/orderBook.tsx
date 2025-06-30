import { Card, Divider } from "@heroui/react";

const yesOrders = [
  { price: 4.5, quantity: 1232 },
  { price: 5, quantity: 1192 },
  { price: 4, quantity: 32 },
  { price: 3.5, quantity: 3 },
  { price: 5.5, quantity: 0 },
];

const noOrders = [
  { price: 6.5, quantity: 12 },
  { price: 7, quantity: 32 },
  { price: 7.5, quantity: 1231 },
  { price: 8, quantity: 1192 },
  { price: 8.5, quantity: 0 },
];

const OrderBook = () => {
  const maxYes = 1232;
  const maxNo = 1231;

  return (
    <Card className="p-2.5 mt-2">
      {/* YES Section */}
      <div className="flex justify-between">
        <h2 className=" font-bold mb-1 text-sm">Price</h2>
        <h2 className=" font-bold mb-1 text-sm">Yes</h2>
        <h2 className=" font-bold mb-1 text-sm">Quantity</h2>
      </div>
      <div className="space-y-1">
        {yesOrders.map((order, idx) => (
          <>
            {order.quantity !== 0 && (
              <div
                key={idx}
                className="relative flex justify-between py-1 rounded text-sm"
              >
                <span>{order.price}</span>
                <div className="relative w-24 text-right">
                  <div
                    className="absolute right-0 top-0 bottom-0 bg-green-400 opacity-30 rounded"
                    style={{
                      width: `${(order.quantity / maxYes) * 100 + 20}%`,
                    }}
                  />
                  <span className="relative z-10 font-medium">
                    {order.quantity}
                  </span>
                </div>
              </div>
            )}
          </>
        ))}
      </div>
      <Divider className="mt-2 mb-2" />
      {/* NO Section */}
      <div className="flex justify-between">
        <h2 className="font-bold mb-1 text-sm">Price</h2>
        <h2 className="font-bold mb-1 text-sm">No</h2>
        <h2 className="font-bold mb-1 text-sm">Quantity</h2>
      </div>
      <div className="space-y-1">
        {noOrders.map((order, idx) => (
          <>
            {order.quantity !== 0 && (
              <div
                key={idx}
                className="relative flex justify-between py-1 rounded text-sm"
              >
                <span>{order.price}</span>
                <div className="relative w-24 text-right">
                  <div
                    className="absolute right-0 top-0 bottom-0 bg-red-400 opacity-30 rounded"
                    style={{
                      width: `${(order.quantity / maxNo) * 100 + 20}%`,
                    }}
                  />
                  <span className="relative z-10 font-medium">
                    {order.quantity}
                  </span>
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </Card>
  );
};

export default OrderBook;
