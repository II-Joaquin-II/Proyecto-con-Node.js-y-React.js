import { useState, useEffect, use } from "react";
import axios from "axios";
import User from "../User";
import { Link } from "react-router-dom";

interface User {
    id: number;
    name: String;
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
                                            <User key={index} user={user} />
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