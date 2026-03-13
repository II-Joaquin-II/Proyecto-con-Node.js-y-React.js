import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface UserState {
    name: string;
    last_name?: string;
    email?: string;
    age: number | "";
}

const EditPage = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<UserState>({
        name: "",
        last_name: "",
        email: "",
        age: "",
    });

    const getUser = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/users/${id}`);
            setUser({
                name: response.data.name,
                last_name: response.data.last_name,
                email: response.data.email,
                age: response.data.age,
            });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(`Error al cargar el usuario`, {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    const UpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //setLoading(true);
        try {
            setLoading(true);
            await axios.put(`/api/users/${id}`, user);
            toast.success(`Usuario editado con exito`, {
                position: "top-right",
                autoClose: 3000,
            });
            setLoading(false);
            navigate("/");

        } catch (error) {
            setLoading(false);
            toast.error(`Error al editar el usuario`, {
                position: "top-right",
                autoClose: 3000,
            });

        }

    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
            <h2 className="font-semibold text-2xl mb-4 block text-center">
                Editar Usuario - {user.name}
            </h2>
            {
                loading ? ("Cargando...") : (
                    <>
                        <form onSubmit={UpdateUser}>
                            <div className="space-y-2">
                                <div>
                                    <label>Nombre</label>
                                    <input type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} id="name" className="w-full border p-3 text-gray-700 rounded focus:outline-none focus:shadow-outline focus:border-blue-500 placeholder:text-gray-500 placeholder-gray-400" placeholder="Ingrese el nombre" />
                                </div>

                                <div>
                                    <label>Apellido</label>
                                    <input type="text" value={user.last_name} onChange={(e) => setUser({ ...user, last_name: e.target.value })} id="last_name" className="w-full border p-3 text-gray-700 rounded focus:outline-none focus:shadow-outline focus:border-blue-500 placeholder:text-gray-500 placeholder-gray-400" placeholder="Ingrese el apellido" />
                                </div>

                                <div>
                                    <label>Email</label>
                                    <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} id="email" className="w-full border p-3 text-gray-700 rounded focus:outline-none focus:shadow-outline focus:border-blue-500 placeholder:text-gray-500 placeholder-gray-400" placeholder="Ingrese el email" />
                                </div>

                                <div>
                                    <label>Edad</label>
                                    <input type="number" value={user.age} onChange={(e) => setUser({ ...user, age: Number(e.target.value) })} id="age" className="w-full border p-3 text-gray-700 rounded focus:outline-none focus:shadow-outline focus:border-blue-500 placeholder:text-gray-500 placeholder-gray-400" placeholder="Ingrese la edad" />
                                </div>

                                <div>
                                    {!loading && (
                                        <button className="block w-full text-center shadow-md text-sm bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">
                                            Editar
                                        </button>
                                    )}
                                </div>

                            </div>
                        </form>
                    </>
                )
            }

        </div>
    );
};

export default EditPage;