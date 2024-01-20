const Footer = () => {
  const quickShop = [
    "TCS Aptitude",
    "General Studies",
    "Placements Aptitude",
    "Reasoning",
  ];

  const information = ["About us", "Privacy", "Terms & conditions"];
  const customerService = ["FAQ's", "Pricing and Refunds", "Personal data"];

  return (
    <div className="bg-skin-on-fill">
      <div className="md:w-3/4 mx-auto mt-3 flex p-3 flex-col md:flex-row space-y-6 md:space-y-0">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3 underline">Quick Shop</h3>
          <ul className="flex flex-col text-muted gap-1 font-medium">
            {quickShop.map((link) => (
              <li key={link}>{link}</li>
            ))}
          </ul>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3 underline">Information</h3>
          <ul className="flex flex-col text-muted gap-1 font-medium">
            {information.map((link) => (
              <li key={link}>{link}</li>
            ))}
          </ul>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3 underline">Service</h3>
          <ul className="flex flex-col text-muted gap-1 font-medium">
            {customerService.map((link) => (
              <li key={link}>{link}</li>
            ))}
          </ul>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3 underline">Contact Us</h3>
          <ul className="flex flex-col text-muted gap-1 font-medium">
            <li>Phone: +91 12346586</li>
            <li>Email: xyz@xyz.com</li>
            <li>Address: Nanded, Maharastra</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
