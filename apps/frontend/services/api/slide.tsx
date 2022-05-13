import { parseData } from "lib/axios";
import http from "services/http";
import { SlideWithQuestionAndElements } from "types/slide";

export const fetchSlide = (id: string) =>
  http.get<SlideWithQuestionAndElements>(`/api/slide/${id}`).then(parseData);
