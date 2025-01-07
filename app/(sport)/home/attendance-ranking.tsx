"use client";
import {
  Card,
  CardBody,
  CardHeader,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

const attendanceData = [
  { id: 1, name: "María González", attendance: 20 },
  { id: 2, name: "Carlos Rodríguez", attendance: 18 },
  { id: 3, name: "Ana Martínez", attendance: 17 },
  { id: 4, name: "Luis Sánchez", attendance: 15 },
  { id: 5, name: "Elena Torres", attendance: 14 },
];

export default function AttendanceRanking() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-bold">Ranking de Asistencias</h2>
      </CardHeader>
      <CardBody>
        <Table aria-label="Ranking de asistencias">
          <TableHeader>
            <TableColumn>POSICIÓN</TableColumn>
            <TableColumn>NOMBRE</TableColumn>
            <TableColumn>ASISTENCIAS</TableColumn>
          </TableHeader>
          <TableBody>
            {attendanceData.map((student, index) => (
              <TableRow key={student.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.attendance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}
