"use client";
import { useEffect, useState } from "react";
import CarCard from "@/components/Cars/CarCard";
import { CarsAdminServices } from "@/lib/services/CarsAdminServices";
import { CarsPublicService } from "@/lib/services/CarsPublicService";
import { TCarInfo } from "@/lib/types";

const carServices = new CarsPublicService();
const carAdminServices = new CarsAdminServices();

export default function AdminHome() {
  const [cars, setCars] = useState<TCarInfo[]>([]);

  const getCars = async () => {
    try {
      const result = await carServices.getCars();

      if (result) {
        setCars(result);
      }
    } catch (error) {
      console.error(`Erro ao exibir os módulos: ${error}`);
    }
  };

  useEffect(() => {
    getCars();
  }, []);

  const handleDeleteCar = async (carId: string) => {
    try {
      await carAdminServices.deleteCar(carId);

      getCars();
    } catch (error) {
      console.error(`Erro ao excluir o veículo: ${error}`);
    }
  };

  return (
    <main>
      <section className="admin-page-container">
        <div className="car-showcase admin">
          {cars
            .slice()
            .sort((a, b) => a.price - b.price)
            .map((car) => (
              <CarCard
                key={car._id}
                make={car.make}
                photo={car.photo}
                model={car.model}
                year={car.year!}
                price={car.price}
                version={car.version!}
                href={`admin/carros/${car._id}`}
                onClick={() => handleDeleteCar(car._id)}
              />
            ))}
        </div>
      </section>
    </main>
  );
}
