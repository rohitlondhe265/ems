import CollapsibleComponent from "@/components/CollapsibleComponent";

const App = () => {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold text-center mt-8">
        React Collapsible Component
      </h1>
      <CollapsibleComponent
        title="Section 1"
        content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita unde, blanditiis similique atque est quo sit debitis ullam exercitationem dolor consectetur obcaecati animi libero maiores sunt laboriosam odio quibusdam totam."
      />
      <CollapsibleComponent
        title="Section 2"
        content="This is the content for Section 2."
      />
    </div>
  );
};

export default App;
