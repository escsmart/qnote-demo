const page = () => {
  const friendAll = [
    {
      id: 1,
      name: "โย๊ะๆ",
      profileImage: "profile001.png",
    },
    {
      id: 3,
      name: "อิกิโน๊ะ",
      profileImage: "profile003.png",
    },
    {
      id: 4,
      name: "เฮะๆ",
      profileImage: "usernone.png",
    },
  ];

  const friendShared = "*3#,*1#";

  let sharedList = [];

  function isPrime(n) {
    let shIds = friendShared.split(",");
    for (let i = 0; i < shIds.length; i++) {
      let shId = shIds[i].replace("*", "");
      let itemId = parseInt(shId.replace("#", ""));
      if (n.id == itemId) {
        sharedList.push(n);
        return false;
      }
    }
    return true;
  }

  console.log({ READY: friendAll.filter(isPrime) });
  console.log({ SHARED: sharedList });
  return <div>page</div>;
};
export default page;
