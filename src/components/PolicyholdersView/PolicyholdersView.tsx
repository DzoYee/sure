import { Box } from "@mui/material";
import InfoTable from "../InfoTable";
import { IPolicyHolder, usePolicyHolders } from "../../api/policyHolders";
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
  let rows: TInfoTableRow[] = []


  if (policyHolderQuery.isSuccess) {
    rows = policyHolderQuery.data.policyHolders.reduce((acc: TInfoTableRow[], policyHolder: IPolicyHolder) => {
      return [...acc , ...policyHolderToRows(policyHolder)]
    }, [])
  }

  return (
      <Box sx={{ textAlign: 'center' }}>
        <InfoTable header="Test Table" rows={rows} />
      </Box>
    )
}

export default PolicyholdersView;