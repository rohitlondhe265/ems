import Link from "next/link";

const Card = ({ categories }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:mx-36 flex-wrap gap-9 mb-12">
      {categories.map((item) => {
        return (
          <div
            className="md:w-72 w-11/12 mx-auto rounded-xl bg-skin-on-fill shadow-md shadow-muted"
            key={`${item._id}`}
          >
            <Link href={`/examination/?category=${item._id}`}>
              <div className="rounded-xl overflow-hidden mb-2">
                <img
                  src={item.banner}
                  className="w-full h-full object-contain"
                  alt="banner"
                />
              </div>
              <div className="px-3 pb-3 flex flex-col justify-start">
                <h3 className="uppercase font-semibold text-xl overflow-hidden whitespace-nowrap text-ellipsis m-0">
                  {item.title}
                </h3>
                <p className="w-full text-md text-muted">
                  {item.description.substring(0,60)} 
                </p>
                <h4 className='mt-2 text-center bg-transparent hover:bg-skin-button-accent font-semibold hover:text-skin-btn-text py-2 px-4 border border-blue-500 hover:border-transparent rounded duration-500'>Take Test</h4>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
