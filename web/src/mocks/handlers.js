import { http, HttpResponse } from "msw";
import { generatePets } from "./generatePets";

export const handlers = [
  http.get("/api/pets", () => {
    return HttpResponse.json(generatePets(13));
  }),
];

