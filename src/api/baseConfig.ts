import { BaseConfig } from '@/types/config';
import { POST, GET, DELETE, PATCH } from '@/api/http';

export const getBaseConfig =()=>{
  return GET<BaseConfig>('/config/base')
}