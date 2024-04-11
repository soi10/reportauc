import { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function Home() {
  const [data, setData] = useState([]);
  const [groupedData, setGroupedData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://script.google.com/macros/s/AKfycbz9A82aAicpqjz-rKeBPGd7d_5WE5-09j4W2b51yI88uGHFEgUptj5C6a91g9bSxkdj2g/exec?sheetName=Sheet1"
      )
      .then((response) => {
        setData(response.data.data);
        const grouped = groupData(response.data.data);
        setGroupedData(
          grouped.sort((a, b) => {
            return a.groupKey.split("-")[1] - b.groupKey.split("-")[1];
          })
        );
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const groupData = (data) => {
    return data.slice(1).reduce((acc, item) => {
      const wbsPrefix = item[4].slice(0, 14);
      const year = item[10];
      const key = `ปี ${year} : ${wbsPrefix}`;
      if (!acc.find((group) => group.groupKey === key)) {
        acc.push({ groupKey: key, items: [item] });
      } else {
        acc.find((group) => group.groupKey === key).items.push(item);
      }
      return acc;
    }, []);
  };

  const calculatePercentage = (items) => {
    const totalCount = items.reduce((sum) => sum + 1, 0); // นับรวมทุกรายการเพื่อหาผลรวม
    const f4Count = items.reduce(
      (count, item) => count + (item[7] === "F4" ? 1 : 0),
      0
    ); // นับจำนวนสถานะ 'F4'
    return totalCount > 0 ? (f4Count / totalCount) * 100 : 0; // คำนวณเปอร์เซ็นต์
  };

  const statusColumns = [
    "A0",
    "B2",
    "C1",
    "C3",
    "C9",
    "D1",
    "D2",
    "E2",
    "F2",
    "F4",
  ];

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>
        ข้อมูลสินทรัพย์
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Group Key</TableCell>
              {statusColumns.map((status) => (
                <TableCell key={status}>{status}</TableCell>
              ))}
              <TableCell>Total</TableCell>
              <TableCell>Percentage (%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupedData.map((group, index) => {
              const total = group.items.reduce((sum) => sum + 1, 0); // นับรวมทุกรายการเพื่อหาผลรวม
              const percentage = calculatePercentage(group.items); // คำนวณเปอร์เซ็นต์
              return (
                <TableRow key={index}>
                  <TableCell>{group.groupKey}</TableCell>
                  {statusColumns.map((status) => (
                    <TableCell key={status}>
                      {group.items.reduce(
                        (count, item) => count + (item[7] === status ? 1 : 0),
                        0
                      )}
                    </TableCell>
                  ))}
                  <TableCell>{total}</TableCell>
                  <TableCell>{percentage.toFixed(2)}%</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
