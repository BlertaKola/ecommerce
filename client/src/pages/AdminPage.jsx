import { Outlet, useNavigate } from "react-router-dom";
import '../styles/admin.css';
import Nav from "../components/Nav";

const AdminPage = () => {
    const navigate = useNavigate();

    const handleNavItemSelect = (navItem) => {
        navigate(`/admin/${navItem}`);
    };

    return (
        <div className="admin-dashboard">
            <Nav/>
            <div className="side-nav">
                <ul>
                    <li>
                        <button onClick={() => handleNavItemSelect('overview')}>
                            Overview
                        </button>
                    </li>
                    <li>
                        <button onClick={() => handleNavItemSelect('customers')}>
                            Customers
                        </button>
                    </li>
                    <li>
                        <button onClick={() => handleNavItemSelect('products')}>
                            Products
                        </button>
                    </li>
                    <li>
                        <button onClick={() => handleNavItemSelect('categories')}>
                            Categories
                        </button>
                    </li>
                    <li>
                        <button onClick={() => handleNavItemSelect('orders')}>
                            Orders
                        </button>
                    </li>
                    <li>
                        <button onClick={() => handleNavItemSelect('account')}>
                            Account
                        </button>
                    </li>
                </ul>
            </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}

export default AdminPage;
    