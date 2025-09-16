import TopBar from "./TopBar";

const Template = ({ children, title }) => {
  return (
    <>
      <TopBar title={title} />
      {children}
    </>
  );
};
export default Template;
