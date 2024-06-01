"use client";
import UpdateCarForm from "@/components/Admin/UpdateCarForm";

export default function CarPage({ params }: { params: { id: string } }) {
  const id = params.id;

  return (
    <section className="update-car-section">
      <h1>Atualizar dados</h1>
      <UpdateCarForm params={{ id }} />
    </section>
  );
}
