import { useState, useEffect } from "react";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [count, setCount] = useState(0);
    const [sortOrder, setSortOrder] = useState('priceLowToHigh');
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(`http://localhost:5000/products?size=${itemsPerPage}&page=${currentPage}&sort=${sortOrder}&search=${searchValue}`);
            const data = await response.json();
            setProducts(data);
        };
        fetchProducts();
    }, [currentPage, itemsPerPage, sortOrder, searchValue]);

    useEffect(() => {
        const fetchCount = async () => {
            const response = await fetch('http://localhost:5000/productsCount');
            const data = await response.json();
            setCount(data.count);
            const numberOfPages = Math.ceil(data.count / itemsPerPage);
            setPages([...Array(numberOfPages).keys()]);
        };
        fetchCount();
    }, [itemsPerPage]);

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

    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-4">
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
                    <label htmlFor="sort" className="mr-2">Sort by:</label>
                    <select id="sort" onChange={handleSort} className="select select-bordered">
                        <option value="priceLowToHigh">Price: Low to High</option>
                        <option value="priceHighToLow">Price: High to Low</option>
                        <option value="dateNewestFirst">Date Added: Newest first</option>
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
                    {[8, 12, 16, 20].map(value => (
                        <option key={value} value={value}>{value} per page</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Home;
