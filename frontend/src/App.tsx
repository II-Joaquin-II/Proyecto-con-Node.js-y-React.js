import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import CreatePage from "./components/pages/CreatePage";
import EditPage from "./components/pages/EditPage";
import { ToastContainer, toast } from 'react-toastify';



const App = () => {

    return (
        <div>
            <nav className="bg-gray-800">
                <div className="container mx-auto p-2">
                    <Link to="/">
                        <h2 className="text-white text-2xl font-bold">
                            CRUD con React y Node
                        </h2>
                    </Link>
                </div>
            </nav>

            <div className="container mx-auto p-2 h-full">
                <Routes>
                    <Route index element={<HomePage />} />
                    <Route path="/create" element={<CreatePage />} />
                    <Route path="/edit" element={<EditPage />} />
                </Routes>
            </div>
            <ToastContainer />


        </div>
    );
};

export default App;