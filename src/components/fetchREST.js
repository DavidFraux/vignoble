function trim(str, ch) {
  let start = 0;
  let end = str.length;
  while(start < end && str[start] === ch)
      ++start;
  while(end > start && str[end - 1] === ch)
      --end;
  return (start > 0 || end < str.length) ? str.substring(start, end) : str;
}


async function fetchAPI (collection){
  collection = trim(collection, '/');
  const response = await fetch(`${process.env.GATSBY_API_URL}/${collection}`)
  //.then((res) => res.json())
  //.then((res) => {  console.log('in', res) })
  .catch((err) => {console.log(err); alert('ERROR: API data cannot be reached');});
  const res = await response.json();
  return res;
}

export default fetchAPI