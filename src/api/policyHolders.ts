import { useQuery } from "react-query";

interface PolicyHolderResponse {
  policyHolders: IPolicyHolder[]
}

export interface IPolicyHolderAddress {
  line1: string,
  line2: string | undefined,
  city: string,
  state: string,
  postalCode: string,
}

export interface IPolicyHolder {
  name: string,
  age: number,
  address: IPolicyHolderAddress,
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