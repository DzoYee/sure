import { Box } from "@mui/material";
import InfoTable from "../InfoTable";
import { IPolicyHolder, usePolicyHolders } from "../../api/policyHolders";
import { TInfoTableRow } from "../InfoTable/InfoTable";

function PolicyholdersView() {
  const policyHolderQuery = usePolicyHolders()

  let rows: TInfoTableRow[] = []
  const policyHolderToRows = (policyHolder: IPolicyHolder): TInfoTableRow[] => {
    const rows = []
    for (const key in policyHolder) {
      rows.push({
        key: key.charAt(0).toUpperCase() + key.slice(1),
        value: policyHolder[key].toString()
      })
    }
    return rows
  }

  if (policyHolderQuery.isSuccess) {
    for (const policyHolder of policyHolderQuery.data.policyHolders) {
      rows = policyHolderToRows(policyHolder)
    }
  }

  return (
      <Box sx={{ textAlign: 'center' }}>
        <InfoTable header="Test Table" rows={rows} />
      </Box>
    )
}

export default PolicyholdersView;