import { useEffect, useState } from "react";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [count, setCount] = useState(0);
    const [selected, setSelected] = useState('bg-indigo-500 hover:bg-indigo-500');

    useEffect(() => {
        fetch(`http://localhost:5000/products?size=${itemsPerPage}&page=${currentPage}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            });
    }, [currentPage, itemsPerPage]);

    useEffect(() => {
        fetch('http://localhost:5000/productsCount')
            .then(res => res.json())
            .then(data => {
                setCount(data.count);
            });
    }, []);

    useEffect(() => {
        const numberOfPages = Math.ceil(count / itemsPerPage);
        setPages([...Array(numberOfPages).keys()]);
    }, [count, itemsPerPage]);

    const handleItemsPerPage = (e) => {
        const value = parseInt(e.target.value);
        setItemsPerPage(value);
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

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
                <div className="mx-4" key={product._id}>
                    <div className="mb-4">
                        <div className="card border bg-base-100 shadow-xl">
                            <img src={product.productImage} alt={product.productName} className="w-full h-48 object-cover" />
                            <div className="card-body text-left">
                                <div className="text-center mr-2">
                                    <h2 className="font-bold text-xl">{product.productName}</h2>
                                </div>
                                <p>{product.description}</p>
                                <div className="card-actions justify-between">
                                    <div className="flex gap-2">
                                        <span>Price:</span>
                                        <span>${product.price}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span>Category:</span>
                                        <span>{product.category}</span>
                                    </div>
                                </div>
                                <div className="card-actions justify-between">
                                    <div className="flex items-center gap-2">
                                        <span>Ratings:</span>
                                        <span>{product.ratings} ⭐</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span>Creation Date:</span>
                                        <span>{new Date(product.productCreationDateTime).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div className="text-center w-full mb-10 flex flex-col items-center">
                <div className="flex items-center mb-4">
                    <button className="btn mr-2" onClick={handlePrev} disabled={currentPage === 0}>Previous</button>
                    {pages.slice(Math.max(0, currentPage - 2), Math.min(pages.length, currentPage + 3)).map(page => (
                        <button
                            onClick={() => setCurrentPage(page)}
                            className={`mr-3 btn ${currentPage === page ? selected : ''}`}
                            key={page}
                        >
                            {page + 1}
                        </button>
                    ))}
                    <button className="btn" onClick={handleNext} disabled={currentPage === pages.length - 1}>Next</button>
                </div>
                <div>
                    <select value={itemsPerPage} onChange={handleItemsPerPage} className="ml-4">
                        {[8, 12, 16, 20].map(value => (
                            <option key={value} value={value}>{value}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Home;
