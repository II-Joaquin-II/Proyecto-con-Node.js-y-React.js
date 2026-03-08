import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreatePage = () => {

    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const saveUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (name === "" || age === 0) {
            //alert("Por favor, complete todos los campos");
            toast.error(`Por favor, complete todos los campos`, {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }
        try {
            setLoading(true);
            const response= await axios.post("/api/users", {name: name, age: age})
            //alert(`Guardado ${response.data.name} Exito`);
            toast.success(`Guardado ${response.data.name} Exito`, {
                position: "top-right",
                autoClose: 3000,
            });
            setLoading(false);
            navigate("/");
        } catch (error) {
            toast.error(`Error al guardar el usuario`, {
                position: "top-right",
                autoClose: 3000,
            });
            //console.log(error);
            setLoading(false);
        }
        
    }

    return (
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
            <h2 className="font-semibold text-2xl mb-4 block text-center">
                Crear Usuario
            </h2>
            <form onSubmit={saveUser}>
                <div className="space-y-2">
                    <div>
                        <label>Nombre</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="name" className="w-full border p-3 text-gray-700 rounded focus:outline-none focus:shadow-outline focus:border-blue-500 placeholder:text-gray-500 placeholder-gray-400" placeholder="Ingrese el nombre" />
                    </div>

                    <div>
                        <label>Edad</label>
                        <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} id="age" className="w-full border p-3 text-gray-700 rounded focus:outline-none focus:shadow-outline focus:border-blue-500 placeholder:text-gray-500 placeholder-gray-400" placeholder="Ingrese la edad" />
                    </div> 

                    <div>
                        { !loading && (
                            <button className="block w-full text-center shadow-md text-sm bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">
                                GUARDA
                            </button>
                        )}
                    </div>

                </div>

            </form>
        </div>
    );
}

export default CreatePage;