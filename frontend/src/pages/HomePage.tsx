import { useState, useEffect } from "react";
import axios from "axios";
import User from "../components/User";
import { Link } from "react-router-dom";

interface User {
    id: number;
    name: String;
    last_name: String;
    email: String;
    age: number;
}

const HomePage = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    const getUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/users");
            console.log(response.data);
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div>
            <div>
                <Link to="/create" className="inline-block mt-4 shadown-md bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">
                    Crear Usuario
                </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
                {loading ? (
                    <p>Cargando usuarios...</p>
                ) : (
                    <>
                        {users.length > 0 ? (
                            <>
                                {
                                    users.map((user, index) => {
                                        return (
                                            <User key={index} user={user} getUsers={getUsers} />
                                        )
                                    })
                                }
                            </>
                        ) : (
                            <div>
                                <p>No hay usuarios</p>
                            </div>
                        )
                        }
                    </>
                )}

            </div>
        </div>
    );
}

export default HomePage;