import { useQuery } from "react-query";

interface PolicyHolderResponse {
  policyHolders: IPolicyHolder[]
}

interface IObjectKeys {
  [key: string]: any;
}

export interface IPolicyHolder extends IObjectKeys {
  name: string,
  age: number,
  address: {
    line1: string,
    line2: string | undefined,
    city: string,
    state: string,
    postalCode: string,
  },
  phoneNumber: string,
  isPrimary: boolean,
}

const fetchPolicyHolder = async (): Promise<PolicyHolderResponse> => {
  const res = await fetch('https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders')
  return res.json()
}

export function usePolicyHolders() {
  return useQuery(['policyholder'], fetchPolicyHolder)
}