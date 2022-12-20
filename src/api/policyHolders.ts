import { useMutation, useQuery, useQueryClient } from "react-query";

const policyHoldersPath = 'https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders'
const queryKey = ['policyholder']

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
  const res = await fetch(policyHoldersPath)
  return res.json()
}

const addPolicyHolder = async (policyHolder: IPolicyHolder): Promise<PolicyHolderResponse> => {
  const res = await fetch(policyHoldersPath, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(policyHolder)
  })
  return res.json()
}

export function usePolicyHolders() {
  return useQuery(queryKey, fetchPolicyHolder)
}

export function useAddPolicyHolders() {
  const queryClient = useQueryClient()
  return useMutation(addPolicyHolder, {
    onSuccess: (data) => {
      queryClient.setQueryData(queryKey, () => {
        return data
      })
    }
  })
}