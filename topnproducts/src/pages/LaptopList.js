import { useState, useEffect } from 'react';

const LaptopList = () => {
  const [accessToken, setAccessToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [laptops, setLaptops] = useState([]);
  const [filters, setFilters] = useState({ minPrice: '', maxPrice: '', availability: '' });

  const handleTokenChange = (event) => {
    setAccessToken(event.target.value);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  useEffect(() => {
    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const data = await response.json();
      setLaptops(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
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
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">Loading...</td>
              </tr>
            ) : (
              filteredLaptops.map((laptop, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                  <td className="border px-4 py-2">{laptop.productName}</td>
                  <td className="border px-4 py-2">${laptop.price}</td>
                  <td className="border px-4 py-2">{laptop.rating}</td>
                  <td className="border px-4 py-2">{laptop.discount}%</td>
                  <td className="border px-4 py-2">{laptop.availability}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LaptopList;
