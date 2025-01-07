import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";

const topAttendee = {
  name: "María González",
  attendance: 20,
  image: "/placeholder.svg?height=100&width=100",
};

export default function TopAttendeeCard() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-bold">Alumno del Mes</h2>
      </CardHeader>
      <CardBody className="flex items-center">
        <Image
          alt={topAttendee.name}
          height={100}
          src={topAttendee.image}
          width={100}
          className="rounded-full mb-4"
        />
        <h3 className="text-xl font-semibold">{topAttendee.name}</h3>
        <p>Asistencias: {topAttendee.attendance}</p>
      </CardBody>
    </Card>
  );
}
