import { RequestMethodEnum } from '../enums/request-method.enum';

export interface IFetchProps {
  url: string;
  method?: RequestMethodEnum;
  body?: any;
  isFormData?: boolean;
}

function mapFormData(body: any) {
  const formData = new FormData();

  Object.entries(body).forEach(([key, value]) => {
    return formData.append(key, value as any);
  });

  return formData;
}

export async function alterData({
  url,
  method = RequestMethodEnum.GET,
  body,
  isFormData = false,
}: IFetchProps) {
  const token = localStorage.getItem('accessToken');
  const headers = {};
  let newBody: any = undefined;

  if (token) {
    Object.assign(headers, { Authorization: `Bearer ${token}` });
  }

  if (body && Object.entries(body)?.length) {
    if (isFormData) {
      newBody = mapFormData(body);
      Object.assign(headers, { 'Content-Type': 'multipart/form-data' });
    } else {
      newBody = JSON.stringify(body);
      Object.assign(headers, { 'Content-Type': 'application/json' });
    }
  }

  const resRaw = await fetch(url, {
    method,
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, *same-origin, omit
    headers,
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: newBody,
  });

  const res = await resRaw.json();

  if (!resRaw.ok) {
    return Promise.reject(res.message);
  }

  return res;
}

export async function fetchData<T>(url: string): Promise<T> {
  return alterData({ url });
}
