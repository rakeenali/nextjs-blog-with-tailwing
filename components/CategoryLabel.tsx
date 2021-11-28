import Link from "next/link";

type Props = {
  category: string;
};

const CategoryLabel: React.FC<Props> = ({ category }) => {
  const colorKey: Record<string, string> = {
    JavaScript: "yellow",
    CSS: "blue",
    Python: "green",
    PHP: "purple",
    Ruby: "Red",
  };

  const selectedColor = colorKey[category];

  return (
    <div
      className={`px-2 py-1 bg-${selectedColor}-600 text-gray-100 font-bold rounded`}
    >
      <Link href={`/blog/category/${category.toLowerCase()}`}>
        <a>{category}</a>
      </Link>
    </div>
  );
};

export default CategoryLabel;
