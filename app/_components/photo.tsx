import Link from "next/link";

interface Data {
  _id: string;
  title: string;
  url: string;
}

export default function Photo(item: Data) {
  return (
    <div key={item._id}>
      <img src={item.url} alt="" width={150} height={150} />
      <h1 className="my-2">
        <Link href={`/${item.title}`}>{item.title}</Link>
      </h1>
      <small>
        <Link href={`/${item.title.replace(/\s/g, "-").replace(/\(|\)/g, "")}`}>
          {item.title} / Manipulasi
        </Link>
      </small>
    </div>
  );
}
