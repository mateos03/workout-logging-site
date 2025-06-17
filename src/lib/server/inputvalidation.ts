
export function isNameUnique(arr: any[], name: string, changeId: number | undefined = -1){
  return (
    !arr.filter((x) => x.id != changeId).map((y) => y.name.toLowerCase()).includes(name.toLowerCase())
  );
}

export function generalizeString(input: any){
  return(input.toString().trim());
}