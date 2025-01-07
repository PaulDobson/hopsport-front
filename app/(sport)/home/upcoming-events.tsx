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

const exams = [
  {
    id: 1,
    date: "15 de Mayo",
    discipline: "Jiu-Jitsu",
    level: "Cinturón Azul",
  },
  {
    id: 2,
    date: "22 de Mayo",
    discipline: "Muay Thai",
    level: "Nivel Intermedio",
  },
  { id: 3, date: "1 de Junio", discipline: "Karate", level: "Cinturón Marrón" },
];

export default function UpcomingExams() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-bold">Próximos Exámenes de Grado</h2>
      </CardHeader>
      <CardBody>
        <Table aria-label="Próximos exámenes de grado">
          <TableHeader>
            <TableColumn>FECHA</TableColumn>
            <TableColumn>DISCIPLINA</TableColumn>
            <TableColumn>NIVEL</TableColumn>
          </TableHeader>
          <TableBody>
            {exams.map((exam) => (
              <TableRow key={exam.id}>
                <TableCell>{exam.date}</TableCell>
                <TableCell>{exam.discipline}</TableCell>
                <TableCell>{exam.level}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}
