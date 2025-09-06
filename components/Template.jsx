import MenuBottom from "./MenuBottom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const Template = ({ children, title }) => {
  return (
    <>
      <TopBar title={title} />
      {children}
      <MenuBottom />
      <Sidebar />
    </>
  );
};
export default Template;
