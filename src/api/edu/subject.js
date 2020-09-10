import request from "@/utils/request";
const BASE_URL = "/admin/edu/subject";
export function reqAllSubject(a, b) {
  return request({
    url: BASE_URL,
    method: "GET",
  });
}
export function reqNo1SubjectPagination(page, pageSize) {
  return request({
    url: `${BASE_URL}/${page}/${pageSize}`,
    method: "GET",
  });
}
