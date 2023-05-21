import clientPromise from "./mongodb";
import { ObjectId, MongoClient, Collection } from "mongodb";
import { Data } from "~/types/data";

let client: MongoClient;
let db: any;
let todos: Collection<any>;

type Form = FormDataEntryValue | string

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = await client.db();
    todos = await db.collection("todos");
  } catch (error) {
    throw new Error("Failed to connect to the database.");
  }
}

(async () => {
  await init();
})();

function isNotEmpty(value: string): boolean {
  return value.trim() !== "";
}

function validateMultipleValues(values: string[], message: string | Error): boolean {
  const value = values.every((value) => isNotEmpty(value));

  if (!value) {
    console.error(message);
  }

  return value;
}

//////////////
/// TODOS ///
/////////////

export async function getAllTodos<T>() {
  try {
    if (!todos) await init();

    const result = await todos
      ?.find({})
      ?.map((todo: any) => ({ ...todo, _id: todo._id.toString() }))
      .toArray();
    return { todos: result as T[] };
  } catch (error) {
    return { error: "Failed to fetch todos!" };
  }
}

export async function getNameTodo<T>(title: string) {
  try {
    if (!todos) await init();

    const result = await todos.findOne({ title });
    return {
      todos: {
        ...result,
        title,
      },
    };
  } catch (error) {
    return { error: "Failed to fetch todos!" };
  }
}

export async function getNameTodoV2<T>(title: string) {
  try {
    if (!todos) await init();

    const result = await todos.findOne({ title: title });
    return {
      result: result as T,
    };
  } catch (error) {
    return { error: "Failed to fetch todos!" };
  }
}

export async function getTodoById(id: any) {
  try {
    if (!todos) await init();

    const todo = await todos.findOne({ _id: new ObjectId(id) });
    if (!todo) throw new Error();
    return { todo: { ...todo, _id: todo._id.toString() } };
  } catch (error) {
    return { error: "Failed to get todo!" };
  }
}

export async function createData({
  title,
  url,
}: {
  title: Form;
  url: Form;
}) {
  try {
    if (!todos) await init();

    if (validateMultipleValues([title as string, url as string], "Title and URL are required."))
      return await todos.insertOne({ title, url, isCompleted: false });
  } catch (error) {
    return { error: "Failed to create todo!" };
  }
}

export async function updateData({
  _id,
  title,
  url,
}: {
  _id: Form;
  title: Form;
  url: Form;
}) {
  try {
    if (!todos) await init();

    if (validateMultipleValues([String(title), String(url)], "Title and URL are required."))
      return await todos.updateOne(
        { _id: new ObjectId(_id as string) },
        {
          $set: {
            title,
            url,
          },
        }
      );
  } catch (error) {
    return { error: "Failed to update todo!" };
  }
}

export async function deleteTodo(id: any) {}

export async function completeTodo(id: any) {}
