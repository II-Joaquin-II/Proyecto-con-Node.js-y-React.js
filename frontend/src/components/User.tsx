import { Link } from "react-router-dom";

interface UserData {
    id: number;
    name: String;
    age: number;
}

interface UserProps {
    user: UserData;
}

const User = ({ user }: UserProps) => {
    return (
        <div className="bg-white rounded shadow-lg overflow-hidden">
            <div className="px-4 pt-2 pb-4">
                <h2 className="text font-semibold">{user.name}</h2>
                <div className="text-sm">Edad: {user.age}</div>
                <div className="mt-2 flex gap-4">
                    <Link to={`/edit/${user.id}`} className="inline-block w-full text-center shadow-md text-sm bg-gray-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-gray-600 hover:cursor-pointer">
                        Editar
                    </Link>
                    <Link to={`/delete/${user.id}`} className="inline-block w-full text-center shadow-md text-sm bg-red-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-red-600 hover:cursor-pointer">
                        Eliminar
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default User;