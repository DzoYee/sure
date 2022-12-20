import { Box, Button } from "@mui/material";
import InfoTable from "../InfoTable";
import { IPolicyHolder, useAddPolicyHolders, usePolicyHolders } from "../../api/policyHolders";
import { TInfoTableRow } from "../InfoTable/InfoTable";

const policyHolderToRows = (policyHolder: IPolicyHolder): TInfoTableRow[] => {
  return Object.keys(policyHolder).map((key) => {
    return {
      key: key.charAt(0).toUpperCase() + key.slice(1),
      value: policyHolder[key as keyof IPolicyHolder].toString()
    }
  })
}

function PolicyholdersView() {
  const policyHolderQuery = usePolicyHolders()
  const addPolicyHolderQuery = useAddPolicyHolders()
  let rows: TInfoTableRow[] = []


  if (policyHolderQuery.isSuccess) {
    rows = policyHolderQuery.data.policyHolders.reduce((acc: TInfoTableRow[], policyHolder: IPolicyHolder) => {
      return [...acc , ...policyHolderToRows(policyHolder)]
    }, [])
  }

  return (
      <Box sx={{ textAlign: 'center' }}>
        <InfoTable header="Test Table" rows={rows} />
        <Box
          sx={{
            paddingTop: '16px',
            textAlign: 'center',
          }}
        >
          <Button
            onClick={() => addPolicyHolderQuery.mutate({
              name: 'John Doe',
              age: 30,
              address: {
                line1: '555 Five Street',
                line2: undefined,
                city: 'Los Five',
                state: 'CA',
                postalCode: '91210'
              },
              phoneNumber: '555-555-5555',
              isPrimary: false
            })}
            variant="contained"
            color="primary"
            size="large"
          >
            Add a policyholder
          </Button>
        </Box>
      </Box>
    )
}

export default PolicyholdersView;