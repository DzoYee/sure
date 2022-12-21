import { Box, Button, Typography } from "@mui/material";
import InfoTable from "../InfoTable";
import { IPolicyHolder, useAddPolicyHolders, usePolicyHolders } from "../../api/policyHolders";
import { TInfoTableRow } from "../InfoTable/InfoTable";

const policyHolderToDisplayRows = (policyHolder: IPolicyHolder): TInfoTableRow[] => {
  const keyValuePairs : TInfoTableRow[] = []

  keyValuePairs.push({ key: 'Name', value: policyHolder.name})
  keyValuePairs.push({ key: 'Age', value: policyHolder.age})
  keyValuePairs.push({
    key: 'Address',
    value: `${policyHolder.address.line1}${policyHolder.address.line2 ? ' ' + policyHolder.address.line2: ''}, ${policyHolder.address.city}, ${policyHolder.address.state} ${policyHolder.address.postalCode}`
  })
  keyValuePairs.push({ key: 'Phone Number', value: policyHolder.phoneNumber})
  keyValuePairs.push({ key: 'Primary Policy Holder', value: policyHolder.isPrimary ? 'Yes': 'No'})

  return keyValuePairs
}

function PolicyholdersView() {
  const policyHolderQuery = usePolicyHolders()
  const addPolicyHolderMutation = useAddPolicyHolders()
  let policyHolders: TInfoTableRow[][] = []

  if (policyHolderQuery.isSuccess) {
    policyHolders = policyHolderQuery.data.policyHolders.map((policyHolder: IPolicyHolder) => {
      return policyHolderToDisplayRows(policyHolder)
    })
  }

  return (
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h5" textAlign="left" marginBottom="16px">
          Policy Holders
        </Typography>
        {policyHolders.map((policyHolder) => (
          <InfoTable rows={policyHolder} />
        ))}
        <Box
          sx={{
            paddingTop: '16px',
            textAlign: 'center',
          }}
        >
          <Button
            onClick={() => addPolicyHolderMutation.mutate({
              name: 'John Doe',
              age: 30,
              address: {
                line1: '55555 Five Street',
                line2: undefined,
                city: 'Los Fiveland',
                state: 'CA',
                postalCode: '91210'
              },
              phoneNumber: '1-555-555-5555',
              isPrimary: false
            })}
            variant="contained"
            color="primary"
            size="large"
          >
            Add a policyholder
          </Button>
          <Typography variant="body1" textAlign="left" marginBottom="16px">
            - Add cases to handle the sad path states for policy holder queries. What happens with empty, loading, failing states?
            - Add testing for api layer
            - Add testing coverage for interactive paths (component/cypress unit/integration)
            - Fix policy holders get and post to invalidate get cache instead of populating get cache with post response
            - Make the application responsive
            - Handle CI/CD pipeline with testing and staging environments
            - Potentially redesign the core functions handling the translation of backend models to frontend models
          </Typography>
        </Box>
      </Box>
    )
}

export default PolicyholdersView;