import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import UserCards from "./components/UserCards";
import HomePage from "./components/pages/HomePage";
import CreatePage from "./components/pages/CreatePage";
import EditPage from "./components/pages/EditPage";

/*
interface User {
    id: number;
    name: String;
    age: number;
}
*/

const App = () => {

    /*
    const [users, setUsers] = useState<User[] | null>(null);

    useEffect(() => {
        fetch("/api/users")
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error(error));
    }, []);

    if (users === null) {
        return <div>No hay usuarios</div>;
    }
    */

    return (
        /*
        <div className="app">
            {users.map((user) => {
                return <UserCards key={user.id} name={user.name} age={user.age} />;
            })}
        </div>
        */
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
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="/edit" element={<EditPage />} />

            </Routes>
        </div>
    );
};

export default App;