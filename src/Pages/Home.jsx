/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    // eslint-disable-next-line no-unused-vars
    const [count, setCount] = useState(0);
    const [sortOrder, setSortOrder] = useState('priceLowToHigh');
    const [searchValue, setSearchValue] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState([50, 300]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(`https://ph-server-nu.vercel.app/products?size=${itemsPerPage}&page=${currentPage}&sort=${sortOrder}&search=${searchValue}&brand=${brand}&category=${category}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`);
            const data = await response.json();
            setProducts(data);
        };
        fetchProducts();
    }, [currentPage, itemsPerPage, sortOrder, searchValue, brand, category, priceRange]);

    useEffect(() => {
        const fetchCount = async () => {
            const response = await fetch(`https://ph-server-nu.vercel.app/productsCount?search=${searchValue}&brand=${brand}&category=${category}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`);
            const data = await response.json();
            setCount(data.count);
            const numberOfPages = Math.ceil(data.count / itemsPerPage);
            setPages([...Array(numberOfPages).keys()]);
        };
        fetchCount();
    }, [itemsPerPage, priceRange, brand, category]);

    const handleItemsPerPage = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(0);
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleSort = (e) => {
        setSortOrder(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchValue(e.target.searchField.value);
    };

    const handlePriceRangeChange = (range) => {
        setPriceRange(range);
    };

    return (
        <div className="container mx-auto px-4">
            <div className="lg:flex justify-between items-center mb-4">
                <form onSubmit={handleSearch} className="flex items-center">
                    <input
                        name="searchField"
                        type="text"
                        placeholder="Search"
                        className="input input-bordered"
                    />
                    <button type="submit" className="btn btn-primary ml-2">Search</button>
                </form>
                <div>
                    <label className="block text-sm font-medium w-96 text-gray-700">Price Range:</label>
                    <Slider
                        range
                        min={50}
                        max={300}
                        defaultValue={priceRange}
                        value={priceRange}
                        onChange={handlePriceRangeChange}
                        trackStyle={[{ backgroundColor: '#007bff', height: 6 }]}
                        handleStyle={[{ borderColor: '#007bff', height: 20, width: 20 }]}
                        railStyle={{ backgroundColor: '#ddd', height: 6 }}
                        style={{ marginBottom: '10px', width: '100%', maxWidth: '500px' }}
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                        <span>{priceRange[0]}</span>
                        <span>{priceRange[1]}</span>
                    </div>
                </div>
                <div>
                    <label htmlFor="sort" className="mr-2">Sort by:</label>
                    <select id="sort" onChange={handleSort} className="select select-bordered">
                        <option value="priceLowToHigh">Price: Low to High</option>
                        <option value="priceHighToLow">Price: High to Low</option>
                        <option value="dateNewestFirst">Date Added: Newest first</option>
                    </select>
                </div>
            </div>



            <div className="mb-4 flex space-x-4">
                <div className="w-1/2">
                    <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand:</label>
                    <select id="brand" onChange={(e) => setBrand(e.target.value)} className="select select-bordered">
                        <option value="">All Brands</option>
                        <option value="Vans">Vans</option>
                        <option value="Converse">Converse</option>
                        <option value="Nike">Nike</option>
                        <option value="Adidas">Adidas</option>
                        <option value="puma">Puma</option>
                    </select>
                </div>
                <div className="w-1/2">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
                    <select id="category" onChange={(e) => setCategory(e.target.value)} className="select select-bordered">
                        <option value="">All Categories</option>
                        <option value="Unisex Sneaker">Unisex Sneaker</option>
                        <option value="Men's Running Shoe">Men's Running Shoe</option>
                        <option value="Men's Sneaker">Men's Sneaker</option>
                        <option value="Women's Sneaker">Women's Sneaker</option>
                        <option value="Men's Training Shoe">Men's Training Shoe</option>
                        <option value="Unisex Slide">Unisex Slide</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                {products.map(product => (
                    <div className="card border bg-base-100 shadow-xl" key={product._id}>
                        <img src={product.productImage} alt={product.productName} className="w-full h-48 object-cover" />
                        <div className="card-body">
                            <h2 className="font-bold text-xl">{product.productName}</h2>
                            <p>{product.description}</p>
                            <div className="flex justify-between">
                                <span>Price: ${product.price}</span>
                                <span>Category: {product.category}</span>
                                <span>Brand: {product.Brand}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Ratings: {product.ratings} ⭐</span>
                                <span>Creation Date: {new Date(product.productCreationDateTime).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center items-center mb-10">
                <button onClick={handlePrev} disabled={currentPage === 0} className="btn btn-secondary mr-2">Previous</button>
                {pages.slice(Math.max(0, currentPage - 2), Math.min(pages.length, currentPage + 3)).map(page => (
                    <button
                        onClick={() => setCurrentPage(page)}
                        className={`btn ${currentPage === page ? 'btn-primary' : 'btn-secondary'} mr-2`}
                        key={page}
                    >
                        {page + 1}
                    </button>
                ))}
                <button onClick={handleNext} disabled={currentPage === pages.length - 1} className="btn btn-secondary ml-2">Next</button>
                <select value={itemsPerPage} onChange={handleItemsPerPage} className="ml-4">
                    {[9, 12, 16, 20].map(value => (
                        <option key={value} value={value}>{value} per page</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Home;
