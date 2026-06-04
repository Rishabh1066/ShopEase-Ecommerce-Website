import ListItem from "./ListItems/ListItem";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../UI/loader";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";

const Product = () => {
    const [items, setItems] = useState([]);
    const [loader, setLoader] = useState(true);
    const params = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const queryParams = searchParams.get("search");

    useEffect(() => {
        async function fetchItems() {
            try {
                let slug = `items.json`;
                if (params.category) {
                    slug = `items-${params.category}.json`;
                }
                if (queryParams) {
                    slug += `?search=${queryParams}`;
                }
                const response = await axios.get(`https://e-commerce-react-629c3-default-rtdb.firebaseio.com/${slug}`);
                const data = response.data;

                data.forEach(product => {
                    const imageUrl = product.thumbnail; 
                    //console.log(imageUrl); 
                });

                if (!data) {
                    navigate("/404");
                    return;
                }

                const new_data = data.map((item, index) => {
                    return {
                        ...item,
                        id: index
                    };
                });
                setItems(new_data);
            } catch (error) {
                console.error("Error fetching items:", error);
            } finally {
                setLoader(false);
            }
        }

        fetchItems();

        // Cleanup function
        return () => {
            setItems([]);
            setLoader(true);
        }

    }, [params.category, navigate, queryParams]);

    return (
        <>
            <div className="productsList">
                <div className="productsList-wrapped">
                    {items.map(item => <ListItem key={item.id} data={item} />)}
                </div>
            </div>
            {loader && <Loader />}
        </>
    );
}

export default Product;
