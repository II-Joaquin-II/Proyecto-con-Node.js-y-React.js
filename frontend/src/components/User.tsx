import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

interface UserData {
    id: number;
    name: String;
    last_name: String;
    email: String;
    age: number;
}

interface UserProps {
    user: UserData;
    getUsers: () => Promise<void>;
}

const User = ({ user, getUsers }: UserProps) => {

    const deleteUser = async (id: number) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`/api/users/${user.id}`);
                toast.success(`Usuario eliminado con exito`, {
                    position: "top-right",
                    autoClose: 3000,
                });
                getUsers(); // refrescar la lista de usuarios despues de eliminar
            } catch (error) {
                toast.error(`Error al eliminar el usuario`, {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        };
    }

    return (
        <div className="bg-white rounded shadow-lg overflow-hidden">
            <div className="px-4 pt-2 pb-4">
                <h2 className="text font-semibold">{user.name}</h2>
                <div className="text-sm">Edad: {user.age}</div>
                <div className="text-sm">Apellido: {user.last_name}</div>
                <div className="text-sm">Email: {user.email}</div>
                <div className="mt-2 flex gap-4">
                    <Link to={`/edit/${user.id}`} className="inline-block w-full text-center shadow-md text-sm bg-gray-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-gray-600 hover:cursor-pointer">
                        Editar
                    </Link>
                    <button onClick={() => deleteUser(user.id)} className="inline-block w-full text-center shadow-md text-sm bg-red-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-red-600 hover:cursor-pointer">
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default User;