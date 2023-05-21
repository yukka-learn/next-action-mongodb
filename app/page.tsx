import NewTodoForm from "./_components/form";
import Photo from "./_components/photo";
import { getAllTodos } from "~/lib/mongodb/client";
import { Data } from "~/types/data";

export default async function Home() {
  const { todos } = await getAllTodos<Data>();
  const login = true;
  return (
    <div>
      {login ? <NewTodoForm /> : <h1 className="text-red-300">Not logged in</h1>}
      <div className="flex flex-wrap gap-4 mt-2 relative">
        {todos
          ?.filter((item) => item.url)
          .map((item) => (
            <Photo key={item._id} {...item} />
          ))}
      </div>
    </div>
  );
}
