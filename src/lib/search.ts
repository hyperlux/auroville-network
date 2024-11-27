export interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: "event" | "bazaar" | "forum" | "decision";
  link: string;
}

export const searchResults: SearchResult[] = [
  {
    id: "1",
    title: "Community Meeting",
    description: "Monthly community gathering",
    type: "event",
    link: "/events/1"
  },
  {
    id: "2",
    title: "Marketplace Discussion",
    description: "Discussion about local marketplace",
    type: "forum",
    link: "/forums/2"
  },
  {
    id: "3",
    title: "Solar Panel Installation",
    description: "Decision on new solar installation",
    type: "decision",
    link: "/decisions/3"
  },
  {
    id: "4",
    title: "Handmade Crafts",
    description: "Local artisan crafts for sale",
    type: "bazaar",
    link: "/bazaar/4"
  }
]; 