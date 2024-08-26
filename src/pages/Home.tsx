import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      {/* Main Content */}
      <div className="flex-1 md:ml-56 p-4 pt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Users Card */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700">
              Total Users Signed Up
            </h2>
            <p className="text-3xl font-bold text-gray-900 mt-4">1,234</p>
          </div>

          {/* Total Sales Card */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700">Total Sales</h2>
            <p className="text-3xl font-bold text-gray-900 mt-4">$12,345</p>
          </div>

          {/* Total Orders Card */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700">
              Total Orders
            </h2>
            <p className="text-3xl font-bold text-gray-900 mt-4">567</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;
