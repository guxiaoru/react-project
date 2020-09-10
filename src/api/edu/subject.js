import request from "@/utils/request";
const BASE_URL = "/admin/edu/subject";
export function reqAllSubject(a, b) {
  return request({
    url: BASE_URL,
    method: "GET",
  });
}
