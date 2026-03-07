import UserCards from "./components/UserCards";

const App = () => {

    const users = [
        {
            id: 0,
            name: "Alex",
            age: 30,
        },
        {
            id: 1,
            name: "Maria",
            age: 25,
        }
    ];

    return (
        <div className="app">
            {users.map((user) => {
                return <UserCards name={user.name} age={user.age} />;
            })}
        </div>
    );
};

export default App;