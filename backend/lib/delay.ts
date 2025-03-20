export const delay = (time = Math.random() * 5000) =>
  new Promise((resolve) => setTimeout(resolve, time));
// export const delay = () => Promise.resolve();

export default delay;
