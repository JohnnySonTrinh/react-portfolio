import ContactMenu from "./ContactMenu";
import "../../styles/contact.css";
import useMetaTitle from "../../hooks/useMetaTitle";
import pageTitles from "../../data/pageTitles";

const Contact = () => {
  // Set the meta title for the page
  useMetaTitle(pageTitles.contact);

  return (
    <>
      <ContactMenu />
    </>
  );
};

// Exporting the Contact component
export default Contact;
