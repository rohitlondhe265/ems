"use client";
import SelectOptions from "./SelectOptions";

export default function Page() {
  return (
    <div className="min-h-[33rem] flex flex-col items-center space-y-6 px-2 mt-9">
      <h1 className="text-4xl text-center md:text-5xl font-bold">
        Start the Examination
      </h1>

      <div className="flex flex-col md:flex-row w-full justify-center gap-9">
        <ol className="text-skin-muted md:w-1/3">
          <li>You will be asked 10 questions one after another.</li>
          <li>10 points is awarded for the correct answer.</li>
          <li>
            Each question has three options. You can choose only one options.
          </li>
          <li>You can review and change answers before the quiz finish.</li>
          <li>The result will be declared at the end of the quiz.</li>
        </ol>
        <div className="flex flex-col md:w-1/3 space-y-3">
          <input
            // ref={nameRef}
            className="shadow border-none rounded-md w-full py-3 px-4 focus:outline-none focus:shadow-outline bg-skin-on-fill placeholder:text-skin-muted"
            type="text"
            placeholder="Display Name"
          />

          <SelectOptions />
        </div>
      </div>
    </div>
  );
}
