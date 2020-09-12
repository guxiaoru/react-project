//所有分类相关的请求都在此发出
import request from "@/utils/request";

const BASE_URL = "/admin/edu/subject";

export function reqAllNo1Subject() {
  return request({
    url: BASE_URL,
    method: "GET",
  });
}

export function reqNo1SubjectPagination(page,pageSize) {
  return request({
    url: `${BASE_URL}/${page}/${pageSize}`,
    method: "GET",
  });
}

export function reqAllNo2SubjectByNo1Id(no1SubjectId) {
  return request({
    url: `${BASE_URL}/get/${no1SubjectId}`,
    method: "GET",
  });
}

export function reqUpdateSubject(id,title) {
  return request({
    url: `${BASE_URL}/update`,
		method: "PUT",
		data:{id,title}
  });
}