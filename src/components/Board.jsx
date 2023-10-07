import useQuizStore from "@/store/quizStore";

export default function Board() {
  const status = new Array(60).fill(false);
  const statusArr = useQuizStore((state) => state.statusArr);
  return (
    <div>
      <div className="flex flex-wrap gap-2 md:gap-4">
        {statusArr?.map((s, i) => (
          <button
            key={i}
            className={`w-4 h-4 cursor-pointer text-white flex items-center justify-center rounded-sm p-3 transition-colors ${
              s ? "bg-green-600" : "bg-red-600"
            } text-xl`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
