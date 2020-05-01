export const loadState = () => {
  try {
    const serializedAdvert = localStorage.getItem("state");
    if (serializedAdvert === null) {
      return undefined;
    }

    const { advert } = JSON.parse(serializedAdvert);
    return advert;
  } catch (err) {
    console.log("loadState", err);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedAdvert = JSON.stringify(state);
    localStorage.setItem("state", serializedAdvert);
  } catch (err) {
    console.log("savestate", err);
  }
};
