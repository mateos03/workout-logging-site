// place files you want to import through the `$lib` alias in this folder.

export function isNameUnique(arr: any[], name: string, changeId: number | undefined = -1){
  return (
    !arr.filter((x) => x.id != changeId).map((y) => y.name.toLowerCase()).includes(name.toLowerCase())
  );
}

export function generalizeString(input: any){
  return(input.toString().trim());
}

export function capitalize(input: string){
  if (input.length === 0) {
    return "";
  }
  return input.charAt(0).toUpperCase() + input.slice(1);
}