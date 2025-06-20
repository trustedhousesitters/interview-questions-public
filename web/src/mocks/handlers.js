import { http, HttpResponse } from "msw";
import { generatePets } from "./generatePets";

const handlers = [
  http.get("/api/pets", () => {
    return HttpResponse.json({
      data: generatePets(13),
    });
  }),
];

export default handlers;
