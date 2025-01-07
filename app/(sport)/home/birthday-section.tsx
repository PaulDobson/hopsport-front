import { Card, CardBody, CardHeader } from "@nextui-org/react";

const birthdays = [
  { id: 1, name: "Laura Gómez", date: "5 de Mayo" },
  { id: 2, name: "Pedro Ramírez", date: "12 de Mayo" },
  { id: 3, name: "Sofía Castro", date: "18 de Mayo" },
];

export default function BirthdaySection() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-bold">Cumpleaños del Mes</h2>
      </CardHeader>
      <CardBody>
        <ul>
          {birthdays.map((birthday) => (
            <li key={birthday.id} className="mb-2">
              <span className="font-semibold">{birthday.name}</span> -{" "}
              {birthday.date}
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}
