let handlers: any = {};

handlers._history = [];

handlers["ring-ring"] = async () => {
  console.log("picking up the phone");
  return "BE respose here!";
};

module.exports = handlers;
