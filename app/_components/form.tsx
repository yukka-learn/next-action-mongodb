"use client";

import { useRef } from "react";
import { create } from "../_action";

type StateForm = "new" | "edit";

const NewTodoForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  formRef.current?.reset();

  return (
    <form ref={formRef} action={create}>
      <h2 className="font-medium mb-2">Create a New Todo</h2>
      <label htmlFor="">Title</label>
      <input
        type="text"
        required
        name="title"
        className="block border border-slate-400 px-2 py-0.5 rounded text-black"
      />
      <label htmlFor="">
        Url <span className="text-xs text-gray-500">(optional)</span>
      </label>
      <input
        type="url"
        name="url"
        className="block border border-slate-400 px-2 py-0.5 rounded text-black"
      />
      <button
        type="submit"
        className="mt-4 text-sm px-2 py-1 rounded bg-slate-700 text-white disabled:bg-opacity-50"
      >
        Add
      </button>
    </form>
  );
};

export default NewTodoForm;
