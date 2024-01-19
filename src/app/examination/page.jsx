import SelectOptions from "./SelectOptions";

export default function Page() {
  return (
    <div className="flex flex-col items-center mx-auto space-y-6 px-2 mt-9">
      <h1 className="text-4xl text-center md:text-5xl font-bold">
        Start the Examination
      </h1>
      <SelectOptions />
    </div>
  );
}
