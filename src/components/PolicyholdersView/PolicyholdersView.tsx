import { Box, Button, List, ListItemText, Typography } from "@mui/material";
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
        {policyHolders.map((policyHolder,index) => (
          <InfoTable key={index} rows={policyHolder} />
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
          <List sx={{ textAlign: 'left' }}>
            <ListItemText primary='- Add cases to handle the sad path states for policy holder queries. What happens with empty, loading, failing states?'/>
            <ListItemText primary='- Add testing for api layer'/>
            <ListItemText primary='- Add testing coverage for interactive paths (component/cypress unit/integration)'/>
            <ListItemText primary='- Fix policy holders get and post to invalidate get cache instead of populating get cache with post response'/>
            <ListItemText primary='- Make the application responsive for different devices'/>
            <ListItemText primary='- Create/Configure CI/CD pipeline with testing and staging environments'/>
            <ListItemText primary='- Provide a truly unique ID for mapped values in PolicyHolderView'/>
            <ListItemText primary='- Potentially redesign the core functions handling the translation of backend models to frontend models'/>
          </List>
        </Box>
      </Box>
    )
}

export default PolicyholdersView;