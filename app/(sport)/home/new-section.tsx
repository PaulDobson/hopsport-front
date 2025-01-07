import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

const news = [
  {
    id: 1,
    title: "Nuevo entrenador de BJJ",
    content:
      "Nos complace anunciar la llegada de nuestro nuevo entrenador de Brazilian Jiu-Jitsu, Juan Pérez, cinturón negro 3er grado.",
  },
  {
    id: 2,
    title: "Torneo interno de Muay Thai",
    content:
      "Este sábado se llevará a cabo nuestro torneo interno de Muay Thai. ¡No te lo pierdas!",
  },
  {
    id: 3,
    title: "Seminario de MMA",
    content:
      "El próximo mes tendremos un seminario especial de MMA con un luchador profesional. Más detalles próximamente.",
  },
];

export default function NewsSection() {
  return (
    <Card isFooterBlurred shadow="sm">
      <CardHeader className="flex gap-3">
        <h2 className="text-2xl font-bold">Noticias</h2>
      </CardHeader>
      <Divider />
      <CardBody>
        {news.map((item) => (
          <div key={item.id} className="mb-4">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p>{item.content}</p>
          </div>
        ))}
      </CardBody>
    </Card>
  );
}
