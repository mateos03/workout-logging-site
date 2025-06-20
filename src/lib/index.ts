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

export function confirmDelete(event: Event, str: string){
  if(!confirm(str)){
    event.preventDefault();
  }
}

export function formatTimestamp(date: Date) {
  // Options for date formatting
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();

  return `${day}. ${month} ${year}`;
}