import { useState, useEffect, use } from "react";
import axios from "axios";

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
            <div className="mt-5">
                {loading ? (
                    <p>Cargando usuarios...</p>
                ) : (
                    <>
                        {users.length > 0 ? (
                            <>
                                {
                                    users.map((user, index) => {
                                        return (
                                            <div className="bg-red-50" key={index}>
                                                {user.name}
                                                {user.age}
                                            </div>
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