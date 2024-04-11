import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const apiUrl =
  "https://script.google.com/macros/s/AKfycbz9A82aAicpqjz-rKeBPGd7d_5WE5-09j4W2b51yI88uGHFEgUptj5C6a91g9bSxkdj2g/exec";

export default function Alldata() {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sheet1, sheet2, sheet3] = await Promise.all([
          axios.get(`${apiUrl}?sheetName=Sheet1`),
          axios.get(`${apiUrl}?sheetName=Sheet2`),
          axios.get(`${apiUrl}?sheetName=Sheet3`),
        ]);

        const combinedData = sheet1.data.data.slice(1).map((row) => {
          const relatedSheet1 = {
            Asset: row[0],
            PEAUnit: row[1],
            AP: row[2],
            AcqP: row[3],
            WBS: row[4],
            AssetDescription: row[5],
            Department: row[6],
            UserStatus: row[7],
            SystemStatus: row[8],
            PEAUnit2: row[9],
            FiscalYearStart: row[10],
            TotalAUCValue: row[11],
            TotalPlanValueOfWork: row[12],
            WorkPerformance: row[13],
            Percentage: row[14],
            ClosureYearGroup: row[15],
            KPIPeriod: row[16],
            SelfConstruction: row[17],
            TotalContractorLaborCost: row[18],
            PartialContractorLaborCost: row[19],
            ContractNumber: row[20],
            Contractor: row[21],
            ContractDurationDays: row[22],
            ContractStartDate: row[23],
            CurrentOperationStatus: row[24],
            ConstructionClosurePlan: row[25],
            ProblemsObstacles: row[26],
            Remarks: row[27],
          };

          const relatedRowsSheet2 = sheet2.data.data
            .slice(1)
            .filter((row2) => row2[0] === row[4]) // Assuming the first column is WBS
            .map((relatedRow) => ({
              WBS: relatedRow[0],
              WorkName: relatedRow[1],
              TenDigitCode: relatedRow[2],
              EquipmentName: relatedRow[3],
              Required: relatedRow[4],
              Transformer: relatedRow[5],
              PoleConcrete: relatedRow[6],
              Wire: relatedRow[7],
              Equipment: relatedRow[8],
            }));
          const relatedRowsSheet3 = sheet3.data.data
            .slice(1)
            .filter((row3) => row3[0] === row[4]) // Assuming the first column is WBS
            .map((relatedRow) => ({
              WBS: relatedRow[0],
              Network: relatedRow[1],
              Description: relatedRow[2],
              Budget: relatedRow[3],
              PlannedRevenue: relatedRow[4],
              ActualRevenue: relatedRow[5],
              PlanMaterialCost: relatedRow[6],
              PlanMaterialInWorkCost: relatedRow[7],
              PlanLaborCost: relatedRow[8],
              PlanSupervisionCost: relatedRow[9],
              PlanTransportCost: relatedRow[10],
              PlanMiscellaneousCost: relatedRow[11],
              PlanOperationCost: relatedRow[12],
              PlanDmCost: relatedRow[13],
              PlanDlCost: relatedRow[14],
              PlanOpCost: relatedRow[15],
              PlanInterestLoanCost: relatedRow[16],
              PlanTcCost: relatedRow[17],
              PlanTotalCost: relatedRow[18],
              TotalWorkExpensePln: relatedRow[19],
              ActMaterialCost: relatedRow[20],
              ActMaterialInWorkCost: relatedRow[21],
              ActLaborCost: relatedRow[22],
              ActSupervisionCost: relatedRow[23],
              ActTransportCost: relatedRow[24],
              ActMiscellaneousCost: relatedRow[25],
              ActOperationCost: relatedRow[26],
              ActDmCost: relatedRow[27],
              ActDlCost: relatedRow[28],
              ActOpCost: relatedRow[29],
              ActInterestLoanCost: relatedRow[30],
              ActTcCost: relatedRow[31],
              ActTotalCost: relatedRow[32],
              TotalWorkExpenseAct: relatedRow[33],
              WorkExpensePercentage: relatedRow[34],
              WorkProgressPercentage: relatedRow[35],
              SystemStatus: relatedRow[36],
              UserStatus: relatedRow[37],
            }));
          return {
            relatedSheet1,
            relatedSheet2: relatedRowsSheet2,
            relatedSheet3: relatedRowsSheet3,
          };
        });

        setAllData(combinedData);
        console.log("Combined Data:", combinedData); // Log the combined data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>WBS</TableCell>
            <TableCell>Asset Description</TableCell>
            <TableCell>User Status</TableCell>
            <TableCell>Related Sheet2</TableCell>
            <TableCell>Network (Sheet3)</TableCell>
            <TableCell>Description (Sheet3)</TableCell>
            <TableCell>Budget (Sheet3)</TableCell>
            {/* Add more TableCell for other fields from relatedSheet3 */}
          </TableRow>
        </TableHead>
        <TableBody>
          {allData.map((data, groupIndex) => {
            const rows = data.relatedSheet3.length;
            return (
              <React.Fragment key={groupIndex}>
                {data.relatedSheet3.map((sheet3, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    sx={{
                      "&:first-of-type td": {
                        borderTop:
                          rows > 1 && rowIndex === 0 ? "2px solid" : "none",
                      },
                      "&:last-of-type td": {
                        borderBottom:
                          rows > 1 && rowIndex === rows - 1
                            ? "2px solid"
                            : "none",
                      },
                      "& td": {
                        borderLeft: "2px solid",
                        borderRight: "2px solid",
                      },
                      "& td:first-of-type": { borderLeft: "none" },
                      "& td:last-of-type": { borderRight: "none" },
                      backgroundColor:
                        groupIndex % 2 === 0 ? "rgba(0, 0, 0, 0.04)" : "white",
                    }}
                  >
                    <TableCell>
                      {rowIndex === 0 ? data.relatedSheet1.WBS : ""}
                    </TableCell>
                    <TableCell>
                      {rowIndex === 0
                        ? data.relatedSheet1.AssetDescription
                        : ""}
                    </TableCell>
                    <TableCell>
                      {rowIndex === 0 ? data.relatedSheet1.UserStatus : ""}
                    </TableCell>
                    <TableCell>
                      {rowIndex === 0 &&
                        data.relatedSheet2.map((sheet2, j) => (
                          <div key={j}>
                            {sheet2.TenDigitCode} - {sheet2.EquipmentName} (
                            {sheet2.Required})
                          </div>
                        ))}
                    </TableCell>
                    <TableCell>{sheet3.Network}</TableCell>
                    <TableCell>{sheet3.Description}</TableCell>
                    <TableCell>{sheet3.Budget}</TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
