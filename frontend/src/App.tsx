import { useState, useEffect } from "react";
import UserCards from "./components/UserCards";

interface User {
    id: number;
    name: String;
    age: number;
}

const App = () => {

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

    return (
        <div className="app">
            {users.map((user) => {
                return <UserCards key={user.id} name={user.name} age={user.age} />;
            })}
        </div>
    );
};

export default App;