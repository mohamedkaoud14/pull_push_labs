const postData = async (url ='', data={})=>{
  const response = await fetch(url ,{
    method:'POST',
    headers:{
        'Content-Type':'application/json',
    },
    body:JSON.stringify(data),
  
  });
  if(response.status===200)  return response.json();
  return undefined;
  
  };
  
  export default postData