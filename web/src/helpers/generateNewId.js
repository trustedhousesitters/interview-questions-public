const generateNewId = (data) => {
    if(data.length>0){
        const copyArray = [...data]
        return copyArray.sort((a,b)=>b.id - a.id)[0].id + 1;
    }else{
        return 1
    }
  };
  
  export { generateNewId };