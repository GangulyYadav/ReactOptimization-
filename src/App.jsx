import React, { useEffect, useState } from "react";

function App() {
    const [categories, setCategories] = useState([]); // State to store unique categories
    const [products, setProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')

    const [isLoading, setIsLoading] = useState(false)
    const [Error, setError] = useState('')
    // Function to fetch products from the API
    const fetchProducts = async () => {
        setIsLoading(true)
        try {
            const response = await fetch("https://dummyjson.com/products");
            const data = await response.json();
            const products = data.products;
            // setProducts(prev => [...prev,products])
            setProducts(products)

            // Extract unique categories'
            //   const unique = [...new Set()]

            // const myset = new Set(['Ganguly','Yadav','Ganguly','Yadav','Ganguly','Yadav','Ganguly','Yadav'])

            // console.log('####',typeof myset)
            // const a = []
            // a = [...new Array([1,2,3,4])]

            const uniqueCategories = [...new Set(products.map((product) => product.category))];
            //   console.log('###',uniqueCategories)
            setCategories(uniqueCategories);
        } catch (error) {
            setError(error)
            console.error("Error fetching products:", error);
        }

        setIsLoading(false)

    };

    const handleCategoryChange = (cat) => {
        // fetchProducts()
        console.log('cat', cat)
        setSelectedCategory(cat)
        const newProducts = products.filter((item) => item?.category == cat.toLowerCase())

        setProducts(newProducts)


    }

    useEffect(() => {

        fetchProducts();
        // Fetch products on component mount

    }, []);

    if (Error) {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: '#FBF5E5',
                    width: "100vw",
                    height: "100vh",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <p><b>Error: {Error}</b></p>

            </div>
        )
    }
    if (isLoading) {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: '#FBF5E5',
                    width: "100vw",
                    height: "100vh",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <p><b>Loading...</b></p>

            </div>
        )
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100vw",
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <h1>Product Categories</h1>
            <select name="category" id="category-dropdown" onChange={(e) => handleCategoryChange(e.target.value)} value={selectedCategory}>
                <option value="">Select a category</option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                ))}
            </select>


            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: '5%', borderRadius: 15, backgroundColor: 'gray', width: '100%', height: '70vh', flexWrap: 'wrap', scrollBehavior: 'smooth', scrollbarColor: 'orange', overflowY: 'scroll' }} >
                {
                     products == '' && 
                    <h3>No Products Available</h3>
                }

                {
                    products?.map((item) => (
                        <div style={{ width: '23%', padding: 10, margin: '2%', backgroundColor: '#CAE0BC', borderRadius: 15 }} key={item?.id}>
                            <img src={item?.thumbnail} />
                            <h3>{item?.title ? item.title : 'Title Not Found'}</h3>
                            <p>{item?.description ? item.description : 'Description Not Found'}</p>
                            <p>{item?.category ? item.category : 'Category Not Found'}</p>
                            <h4>{item?.price ? item.price : 'FREE'}</h4>
                            Tags: <ol>
                                {item?.tags && item.tags?.map((titem, index) =>
                                    <li key={index}>{titem}</li>
                                )}

                                {/* {item?.tags && item.tags     */}
                            </ol>

                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default App;
