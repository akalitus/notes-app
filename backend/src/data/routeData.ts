interface IRouteData {
    notes: string;
    noteId: string;
  }
  
  const routeData: IRouteData = {
    notes: "/api/notes",
    noteId: "/api/notes/:id",
  };
  
  export default routeData;
  