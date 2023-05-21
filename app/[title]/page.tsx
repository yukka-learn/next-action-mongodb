import { getNameTodo, getNameTodoV2, getTodoById } from "~/lib/mongodb/client";
import { Data } from "~/types/data";
import { formatWordsInParentheses } from "~/utils/regex";
import NewTodoForm from "../_components/form";

export const fetchCache = "force-no-store";

export default async function CharacterDetailsPage({
  params: { title },
}: {
  params: { title: string };
}) {
  const first = title.replace(/%20/g, " ");
  const manipulasi = title.replace(/-/g, "%20");
  const a = formatWordsInParentheses(title);
  // const a = first.replace(/-(\w)(\w*)/g, " $1$2").replace(/^(.+)\s(.+)$/, "$1 ($2)");
  // const a = first
  //   .replace(/-(\w+)(-\w+)?/g, " ($1$2)")
  //   .replace(/\((\w+)\)/g, "($1 )")
  //   .trim();
  // const a = first.replace(/-(\w+)(-\w+)?/g, " ($1$2)").replace(/\(\s*(\w+)\s*\)/g, "($1)");
  //1. const a = first.replace(/-(\w+)(-\w+)?/g, " ($1$2)").replace(/-(\w+)\s/g, " ($1 )");
  // const a = first
  //   .replace(/-(\w+)(-\w+)?/g, " $1$2")
  //   .replace(/\((\w+)\)/g, "$1")
  //   .trim();Haruka (New Year)
  // const todos = await getNameTodoV2<Data>("Aru (New Year)");
  const todos = await getNameTodoV2<Data>(a);
  const todo2 = await getNameTodoV2<Data>(manipulasi);

  // ()
  const kurungRegex = title.replace(/(.+)-(.+)/, "$1 ($2)");

  console.log(todos);
  console.log(todo2);
  console.log(title.replace(/-/g, "%20"));

  return (
    <div>
      <h1>
        Hello Page CharacterDetails -{" "}
        <span className="capitalize italic underline">
          {title.replace(/\s/g, "-").replace(/\(|\)/g, "").replace(/%20/g, " ")}
        </span>
      </h1>
      <h1>
        First - {first} - {a}
      </h1>
      <pre>
        <code>{JSON.stringify(todos, null, 2)}</code>
      </pre>
      <h1>Manipulasi - {manipulasi}</h1>
      <pre>
        <code>{JSON.stringify(todo2, null, 2)}</code>
      </pre>
    </div>
  );
}
