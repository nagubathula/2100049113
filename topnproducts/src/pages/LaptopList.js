import { useState } from 'react';

const LaptopList = () => {
  const [accessToken, setAccessToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ minPrice: '', maxPrice: '', availability: '' });

  // Sample data
  const laptops = [
    {"productName":"Laptop 1","price":2236,"rating":4.86,"discount":63,"availability":"out-of-stock"},
    {"productName":"Laptop 10","price":7145,"rating":4.72,"discount":15,"availability":"out-of-stock"},
    {"productName":"Laptop 8","price":511,"rating":4.64,"discount":87,"availability":"yes"},
    {"productName":"Laptop 3","price":9102,"rating":4.6,"discount":98,"availability":"out-of-stock"},
    {"productName":"Laptop 10","price":4101,"rating":4.52,"discount":37,"availability":"out-of-stock"},
    {"productName":"Laptop 14","price":9254,"rating":4.23,"discount":56,"availability":"yes"},
    {"productName":"Laptop 11","price":5683,"rating":3.63,"discount":56,"availability":"out-of-stock"},
    {"productName":"Laptop 13","price":8686,"rating":3.6,"discount":24,"availability":"yes"},
    {"productName":"Laptop 13","price":1244,"rating":3.17,"discount":45,"availability":"yes"},
    {"productName":"Laptop 1","price":8521,"rating":2.32,"discount":91,"availability":"out-of-stock"}
  ];

  const handleTokenChange = (event) => {
    setAccessToken(event.target.value);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can fetch data here with the provided access token if needed
  };

  // Apply filters
  let filteredLaptops = laptops.filter(laptop => {
    if (filters.minPrice && laptop.price < filters.minPrice) return false;
    if (filters.maxPrice && laptop.price > filters.maxPrice) return false;
    if (filters.availability && laptop.availability !== filters.availability) return false;
    return true;
  });

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Laptop List</h1>
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col md:flex-row">
        <input type="text" value={accessToken} onChange={handleTokenChange} placeholder="Enter Access Token" className="border border-gray-400 rounded py-2 px-3 mr-2 mb-2 md:mb-0 focus:outline-none focus:border-blue-500" />
        <div className="flex flex-col md:flex-row">
          <input type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} placeholder="Min Price" className="border border-gray-400 rounded py-2 px-3 mr-2 mb-2 md:mb-0 focus:outline-none focus:border-blue-500" />
          <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} placeholder="Max Price" className="border border-gray-400 rounded py-2 px-3 mr-2 mb-2 md:mb-0 focus:outline-none focus:border-blue-500" />
          <select name="availability" value={filters.availability} onChange={handleFilterChange} className="border border-gray-400 rounded py-2 px-3 mb-2 md:mb-0 focus:outline-none focus:border-blue-500">
            <option value="">Select Availability</option>
            <option value="yes">Yes</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:bg-blue-600">Submit</button>
        </div>
      </form>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Rating</th>
              <th className="px-4 py-2">Discount</th>
              <th className="px-4 py-2">Availability</th>
            </tr>
          </thead>
          <tbody>
            {filteredLaptops.map((laptop, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="border px-4 py-2">{laptop.productName}</td>
                <td className="border px-4 py-2">${laptop.price}</td>
                <td className="border px-4 py-2">{laptop.rating}</td>
                <td className="border px-4 py-2">{laptop.discount}%</td>
                <td className="border px-4 py-2">{laptop.availability}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LaptopList;
