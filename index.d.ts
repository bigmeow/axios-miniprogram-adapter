import type { AxiosRequestConfig, AxiosPromise } from 'axios';
export default function mpAdapter(config: AxiosRequestConfig, { transformRequestOption }?: { transformRequestOption?: ((requestOption: any) => any) | undefined }): AxiosPromise;
