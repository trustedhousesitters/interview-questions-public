// TODO: should sit within a try catch and handle potential errors
export const requestRandomDogImage = async () => {
  const res = await fetch('https://random.dog/woof.json?include=jpg');
  const json = await res.json();

  return json.url;
};
