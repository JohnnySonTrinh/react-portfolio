import ContactMenu from "./ContactMenu";
import useMetaTitle from "../../hooks/useMetaTitle";
import pageTitles from "../../data/pageTitles";
import useContactPage from "../../hooks/achievements/useContactPage";
import "../../styles/contact.css";

const Contact = () => {
  // Set the meta title for the page
  useMetaTitle(pageTitles.contact);
  
  // Handle contact page logic (achievements, etc.)
  useContactPage();

  return (
    <>
      <ContactMenu />
    </>
  );
};

// Exporting the Contact component
export default Contact;
