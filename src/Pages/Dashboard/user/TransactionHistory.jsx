

const TransactionHistory = () => {
 
  return (
   <div>
  <h1 className="text-3xl font-bold mb-6 dark:text-white">Transaction History</h1>
  
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-x-auto">
    <table className="table w-full">
      <thead>
        <tr>
          <th>Transaction ID</th>
          <th>Ticket Title</th>
          <th>Amount</th>
          <th>Payment Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>TRX123456</td>
          <td>Dhaka to Chittagong Express</td>
          <td className="font-semibold">৳1200</td>
          <td>01/18/2025</td>
        </tr>
        <tr>
          <td>TRX123457</td>
          <td>Intercity Train Service</td>
          <td className="font-semibold">৳950</td>
          <td>01/20/2025</td>
        </tr>
        <tr>
          <td>TRX123458</td>
          <td>Domestic Flight Offer</td>
          <td className="font-semibold">৳5500</td>
          <td>01/25/2025</td>
        </tr>
        <tr>
          <td>TRX123459</td>
          <td>Luxury Ship Tour</td>
          <td className="font-semibold">৳1800</td>
          <td>01/15/2025</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

  );
};

export default TransactionHistory;