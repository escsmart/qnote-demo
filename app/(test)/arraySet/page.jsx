const page = () => {
  const oldData = "*3#,*4#,*1#";
  let cutId = 1;
  cutId = cutId.toString();
  let oldArr = oldData.split(",");
  let newData = "";
  const rmShared = async () => {
    const removeItem = oldArr.filter((item) => {
      console.log(item);
      console.log(item.includes(cutId));
      return item.includes(cutId) !== true;
    });
    newData = removeItem;
    console.log(removeItem);
  };

  rmShared();
  console.log({ oldArr: oldArr, newData: newData });
  return <div>page</div>;
};
export default page;
